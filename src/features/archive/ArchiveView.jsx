import { buildMeetupPath } from "../../app/routes.js";
import RouteLink from "../../components/RouteLink.jsx";
import {
  formatEventTime,
  formatEventWeekday,
  getLocationLabel,
  isUpcomingMeetup,
} from "../../lib/meetup-ui.js";
import ArchiveShell from "./ArchiveShell.jsx";
import { formatMeetupCounts, getMeetupCounts } from "./meetupSections.jsx";

/**
 * One meetup on the index. The whole card is the link; the heading carries the
 * date, so event chips only add the weekday, time, and venue.
 */
function MeetupCard({ meetup, nextMeetupId, onOpenRoute }) {
  const isUpcoming = isUpcomingMeetup(meetup);
  const countsLabel = formatMeetupCounts(
    getMeetupCounts(meetup, { acceptsSubmissions: meetup.id === nextMeetupId }),
  );

  return (
    <article className={`meetup meetup-card ${isUpcoming ? "meetup--upcoming" : "meetup--past"}`}>
      <RouteLink
        to={buildMeetupPath(meetup.slug)}
        onOpenRoute={onOpenRoute}
        className="meetup-card-link"
      >
        <div className="meetup-header meetup-card-header">
          <div className="meetup-card-heading">
            <div>
              {isUpcoming ? <p className="eyebrow meetup-card-eyebrow">Upcoming meetup</p> : null}
              <h2>{meetup.date}</h2>
            </div>
          </div>
          {countsLabel ? <p className="meetup-meta meetup-card-meta">{countsLabel}</p> : null}
          {meetup.event ? (
            <div className="meetup-event-meta meetup-card-event">
              <span>
                {formatEventWeekday(meetup.event)} &middot; {formatEventTime(meetup.event)}
              </span>
              <span>{getLocationLabel(meetup.event)}</span>
            </div>
          ) : null}
        </div>
      </RouteLink>
    </article>
  );
}

export default function ArchiveView({ meetups, nextMeetupId, onOpenRoute }) {
  const upcomingMeetups = meetups.filter(isUpcomingMeetup);
  const pastMeetups = meetups.filter((meetup) => !isUpcomingMeetup(meetup));

  return (
    <ArchiveShell onOpenRoute={onOpenRoute}>
      <main id="main-content" tabIndex={-1} className="archive archive--index">
        <section className="brand-hero" aria-labelledby="brand-hero-title">
          <div className="brand-hero-copy">
            <p className="eyebrow">Austin, TX</p>
            <h2 id="brand-hero-title">Own your AI.</h2>
            <p>A Socratic meetup about the latest AI news, with a focus on local and sovereign AI. We examine the claims, ask questions, and discuss what matters across the broader AI field.</p>
          </div>
          <img
            src="/brand/hero.jpg?v=80b7d8a11070"
            alt="A wireframe hand meets a human hand at a starburst, the Sovereign AI Club poster mark."
            width="1545"
            height="1999"
          />
        </section>
        {upcomingMeetups.map((meetup) => (
          <MeetupCard
            key={meetup.id}
            meetup={meetup}
            nextMeetupId={nextMeetupId}
            onOpenRoute={onOpenRoute}
          />
        ))}
        {upcomingMeetups.length > 0 && pastMeetups.length > 0 ? (
          <div className="meetup-divider" aria-hidden="true">
            <span>Past meetups</span>
          </div>
        ) : null}
        {pastMeetups.map((meetup) => (
          <MeetupCard
            key={meetup.id}
            meetup={meetup}
            nextMeetupId={nextMeetupId}
            onOpenRoute={onOpenRoute}
          />
        ))}
      </main>
    </ArchiveShell>
  );
}
