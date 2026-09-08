import { useState } from "react";
import { submissionScreens } from "./config.js";
import {
  getSubmissionIdleMessage,
  submitIssueSubmission,
  validateSubmissionInput,
} from "./api.js";
import RouteLink from "../../components/RouteLink.jsx";
import { LINK_SUBMISSION_PATH, SHOWCASE_SUBMISSION_PATH } from "../../app/constants.js";

function getInitialValues(fields) {
  return Object.fromEntries(fields.map((field) => [field.name, ""]));
}

export default function SubmissionScreen({ kind, target, onBack, onOpenRoute }) {
  const screen = submissionScreens[kind];
  const [values, setValues] = useState(() => getInitialValues(screen.fields));
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const pageUrl = window.location.href;

  const setValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    if (!target?.slug || !target?.event) {
      setStatus("error");
      setErrorMessage("No upcoming meetup or meetup slot is configured yet.");
      return;
    }

    const validationError = validateSubmissionInput(kind, values);
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitIssueSubmission({ kind, values, website, pageUrl });
      setStatus("success");
      setValues(getInitialValues(screen.fields));
      setWebsite("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Submission failed.");
    }
  };

  return (
    <main tabIndex={-1} className="submission-screen" aria-label={screen.title}>
      <header className="submission-header">
        <div>
          <h1>{screen.title}</h1>
          {screen.description ? <p className="submission-blurb">{screen.description}</p> : null}
        </div>
        <div className="screen-header-actions">
          <button className="calendar-close-btn" onClick={onBack}>
            back to meetup page
          </button>
        </div>
      </header>

      <div className="submission-layout">
        <form className="submission-form" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
          <input
            type="text"
            name="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            style={{ display: "none" }}
          />

          {screen.fields.map((field) => (
            <label key={field.name} className="submission-field">
              <span>{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  required={field.required}
                  disabled={status === "submitting"}
                  rows={field.rows ?? 5}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={(event) => setValue(field.name, event.target.value)}
                  required={field.required}
                  disabled={status === "submitting"}
                  inputMode={field.inputMode}
                />
              )}
            </label>
          ))}

          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "submitting..." : "send to github"}
          </button>

          <p className="submission-status" data-status={status} role="status" aria-live="polite" aria-atomic="true">
            {status === "success"
              ? "Issue created. It should now be in the repo with the correct label."
              : status === "error"
                ? errorMessage
                : getSubmissionIdleMessage(kind, target)}
          </p>

          <div className="submission-form-switch">
            {kind === "link" ? (
              <RouteLink to={SHOWCASE_SUBMISSION_PATH} onOpenRoute={onOpenRoute}>
                or propose a showcase instead →
              </RouteLink>
            ) : (
              <RouteLink to={LINK_SUBMISSION_PATH} onOpenRoute={onOpenRoute}>
                or submit a link instead →
              </RouteLink>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
