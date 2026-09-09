import { useEffect, useRef, useState } from "react";
import {
  REMINDER_IFRAME_NAME,
  REMINDER_SIGNUP_URL,
} from "../../app/constants.js";
import {
  formatEventDate,
  formatEventTime,
  isValidEmail,
} from "../../lib/meetup-ui.js";

const REMINDER_SIGNUP_MESSAGE_SOURCE = "austin-ai-reminder-signup";
const SIGNUP_RESPONSE_TIMEOUT_MS = 8000;

export default function ReminderSignup({ nextMeetup, variant = "default" }) {
  const submitRef = useRef(false);
  const fallbackTimerRef = useRef(null);
  const iframeRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const pageUrl = window.location.href;

  const nextEvent = nextMeetup?.event ?? null;
  const nextLabel = nextEvent
    ? `${formatEventDate(nextEvent)} · ${formatEventTime(nextEvent)}`
    : "We will email you when the next meetup is posted.";
  const formConfigured = Boolean(REMINDER_SIGNUP_URL);

  const finishSignup = (nextStatus, message = "") => {
    submitRef.current = false;
    clearTimeout(fallbackTimerRef.current);

    if (nextStatus === "success") {
      setEmail("");
      setErrorMessage("");
      setStatus("success");
      return;
    }

    setErrorMessage(message);
    setStatus("error");
  };

  const handleSubmit = (event) => {
    if (!formConfigured) {
      event.preventDefault();
      setStatus("offline");
      return;
    }

    if (!isValidEmail(email)) {
      event.preventDefault();
      setStatus("invalid");
      return;
    }

    submitRef.current = true;
    setErrorMessage("");
    setStatus("submitting");
    clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = window.setTimeout(() => {
      finishSignup(
        "error",
        "We could not confirm that signup. Try again in a moment.",
      );
    }, SIGNUP_RESPONSE_TIMEOUT_MS);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data && typeof event.data === "object" ? event.data : null;
      const isReminderFrame = event.source === iframeRef.current?.contentWindow;
      const isGoogleScriptOrigin = /^https:\/\/(?:script\.google\.com|.+\.googleusercontent\.com)$/.test(event.origin);

      if (
        !submitRef.current ||
        data?.source !== REMINDER_SIGNUP_MESSAGE_SOURCE ||
        (!isReminderFrame && !isGoogleScriptOrigin)
      ) {
        return;
      }

      finishSignup(
        data.status === "success" ? "success" : "error",
        data.message || "We could not confirm that signup. Try again in a moment.",
      );
    };

    window.addEventListener("message", handleMessage);

    return () => {
      clearTimeout(fallbackTimerRef.current);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <section className={`reminder-panel reminder-panel--${variant}`} aria-label="Meetup reminders">
      <div className="reminder-copy">
        <h2>Get meetup reminders.</h2>
        <p className="reminder-blurb">
          One email on meetup days, around 10:00 AM CT.
        </p>
        <p className="reminder-next">
          <span>Next up</span>
          {nextLabel}
        </p>
      </div>

      {status === "success" ? (
        <div className="reminder-success" role="status" aria-live="polite">
          <h3>You&apos;re subscribed.</h3>
          <p>We&apos;ll send a reminder on meetup days around 10:00 AM CT.</p>
          <button
            type="button"
            className="reminder-reset-btn"
            onClick={() => {
              setStatus("idle");
              setEmail("");
              setErrorMessage("");
            }}
          >
            add another email
          </button>
        </div>
      ) : (
        <>
          <form
            className="reminder-form"
            action={REMINDER_SIGNUP_URL || undefined}
            method="post"
            target={REMINDER_IFRAME_NAME}
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="reminder-email">
              Email address
            </label>
            <input
              id="reminder-email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "idle") {
                  setStatus("idle");
                  setErrorMessage("");
                }
              }}
              required
            />
            <input type="hidden" name="source" value="sovereignai.club" />
            <input type="hidden" name="pageUrl" value={pageUrl} />
            <button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "submitting..." : "notify me"}
            </button>
          </form>

          <p className="reminder-help">
            {status === "submitting"
              ? "Submitting your reminder signup..."
              : status === "invalid"
                ? "Enter a valid email address first."
                : status === "error"
                  ? errorMessage || "We could not confirm that signup. Try again in a moment."
                : status === "offline"
                  ? import.meta.env.DEV
                    ? "Set VITE_REMINDER_SIGNUP_URL to connect the form to Apps Script."
                    : "Reminder signup is temporarily offline."
                  : "Unsubscribe any time from the email."}
          </p>
        </>
      )}
      <iframe
        ref={iframeRef}
        title="Reminder signup"
        name={REMINDER_IFRAME_NAME}
        className="reminder-transport"
      />
    </section>
  );
}
