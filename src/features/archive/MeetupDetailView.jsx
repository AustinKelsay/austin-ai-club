import { COMMUNITY_SLOT_LABEL, TRACK_CATEGORY } from "../../app/constants.js";
import RouteLink from "../../components/RouteLink.jsx";
import { isUpcomingMeetup } from "../../lib/meetup-ui.js";
import ArchiveShell from "./ArchiveShell.jsx";
import {
  formatMeetupCounts,
  getMeetupCounts,
  getShowcaseId,
  MeetupEventBar,
  shouldShowCommunitySlot,
  StaticShowcaseSection,
  StaticTrackSection,
} from "./meetupSections.jsx";

/**
 * In-page jump links, one per track. A single destination is not worth a nav.
 */
function TrackJumpNav({ meetup, showCommunitySlot }) {
  if (meetup.tracks.length + (showCommunitySlot ? 1 : 0) < 2) {
    return null;
  }

  return (
    <nav className="track-nav" aria-label={`${meetup.date} tracks`}>
      {meetup.tracks.map((track) => (
        <a key={track.id} href={`#${track.id}`} data-track={TRACK_CATEGORY[track.title]}>
          {track.title.toLowerCase()}
        </a>
      ))}
      {showCommunitySlot ? (
        <a href={`#${getShowcaseId(meetup.id)}`} data-track="community">
          {COMMUNITY_SLOT_LABEL.toLowerCase()}
        </a>
      ) : null}
    </nav>
  );
}

function MeetupNotFound({ meetupSlug, onOpenRoute }) {
  return (
    <ArchiveShell onOpenRoute={onOpenRoute}>
      <main id="main-content" tabIndex={-1} className="archive archive--detail">
        <section className="meetup meetup-state">
          <div className="meetup-header meetup-detail-header meetup-state-header">
            <p className="eyebrow">Meetup not found</p>
            <h2>{meetupSlug}</h2>
            <p className="submission-blurb">
              That meetup slug does not match any published meetup in this archive.
            </p>
            <RouteLink to="/" onOpenRoute={onOpenRoute} className="calendar-close-btn meetup-back-link">
              back to all meetups
            </RouteLink>
          </div>
        </section>
      </main>
    </ArchiveShell>
  );
}

export default function MeetupDetailView({
  meetup,
  meetupSlug,
  nextMeetupId,
  wikiTopicLookup,
  wikiPagesById,
  onOpenRoute,
  onOpenPresentation,
  onOpenTopicPresentation,
}) {
  if (!meetup) {
    return <MeetupNotFound meetupSlug={meetupSlug} onOpenRoute={onOpenRoute} />;
  }

  const isUpcoming = isUpcomingMeetup(meetup);
  const acceptsShowcaseSubmissions = meetup.id === nextMeetupId;
  const showCommunitySlot = shouldShowCommunitySlot(meetup, acceptsShowcaseSubmissions);
  const countsLabel = formatMeetupCounts(
    getMeetupCounts(meetup, { acceptsSubmissions: acceptsShowcaseSubmissions }),
  );

  return (
    <ArchiveShell onOpenRoute={onOpenRoute}>
      <main id="main-content" tabIndex={-1} className="archive archive--detail">
        <article className={`meetup meetup--detail ${isUpcoming ? "meetup--upcoming" : "meetup--past"}`}>
          <div className="meetup-header meetup-detail-header">
            <div className="meetup-detail-toolbar">
              <RouteLink
                to="/"
                onOpenRoute={onOpenRoute}
                className="calendar-close-btn meetup-back-link"
              >
                back to all meetups
              </RouteLink>
              <button className="pres-enter-btn" onClick={() => onOpenPresentation(meetup)}>
                ▶ Presentation Mode
              </button>
            </div>
            <div className="meetup-detail-heading">
              <div>
                {isUpcoming ? <p className="eyebrow">Upcoming meetup</p> : null}
                <h2>{meetup.date}</h2>
                {countsLabel ? <p className="meetup-meta">{countsLabel}</p> : null}
              </div>
            </div>
            <TrackJumpNav meetup={meetup} showCommunitySlot={showCommunitySlot} />
          </div>

          <div className="meetup-body meetup-body--detail">
            <MeetupEventBar meetup={meetup} />
            {meetup.tracks.map((track, index) => (
              <StaticTrackSection
                key={track.id}
                track={track}
                index={index}
                meetupSlug={meetup.slug}
                wikiTopicLookup={wikiTopicLookup}
                wikiPagesById={wikiPagesById}
                onOpenRoute={onOpenRoute}
                onOpenTopic={onOpenTopicPresentation}
              />
            ))}
            {showCommunitySlot ? (
              <StaticShowcaseSection
                index={meetup.tracks.length}
                meetupId={meetup.id}
                items={meetup.showcases}
                acceptsSubmissions={acceptsShowcaseSubmissions}
                onOpenRoute={onOpenRoute}
                onOpenTopic={onOpenTopicPresentation}
              />
            ) : null}
          </div>
        </article>
      </main>
    </ArchiveShell>
  );
}
