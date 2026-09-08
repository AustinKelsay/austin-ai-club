import { buildWikiPath } from "../../app/routes.js";
import {
  COMMUNITY_SLOT_LABEL,
  LINK_SUBMISSION_PATH,
  SHOWCASE_SUBMISSION_PATH,
  TRACK_CATEGORY,
} from "../../app/constants.js";
import RouteLink from "../../components/RouteLink.jsx";
import {
  buildGoogleCalendarUrl,
  buildIcsHref,
  formatEventTime,
  formatEventWeekday,
  getLocationLabel,
  slugify,
} from "../../lib/meetup-ui.js";
import { Topic } from "../presentation/content.jsx";
import {
  buildTopicExplorerSearch,
  getMeetupTopicLookupKey,
  getTopicWikiPages,
} from "../wiki/wikiTopicEntryPoints.js";

export function shouldShowCommunitySlot(meetup, acceptsSubmissions = false) {
  return Boolean((meetup.showcases?.length ?? 0) || acceptsSubmissions);
}

export function getMeetupCounts(meetup, options = {}) {
  const { acceptsSubmissions = false } = options;
  const topicCount = meetup.tracks.reduce((sum, track) => sum + track.items.length, 0);
  const showcaseCount = meetup.showcases?.length ?? 0;
  const communitySlotCount = shouldShowCommunitySlot(meetup, acceptsSubmissions) ? 1 : 0;

  return {
    topicCount,
    showcaseCount,
    totalTopicCount: topicCount + showcaseCount,
    totalTrackCount: meetup.tracks.length + communitySlotCount,
  };
}

/**
 * Formats "N topics · M tracks" for a meetup header, or "" when nothing has
 * been published yet so an empty board does not advertise "0 topics".
 * @param {{ totalTopicCount: number, totalTrackCount: number }} counts
 */
export function formatMeetupCounts({ totalTopicCount, totalTrackCount }) {
  if (totalTopicCount === 0) {
    return "";
  }

  const topics = `${totalTopicCount} topic${totalTopicCount === 1 ? "" : "s"}`;
  const tracks = `${totalTrackCount} track${totalTrackCount === 1 ? "" : "s"}`;
  return `${topics} · ${tracks}`;
}

export function getShowcaseId(meetupId) {
  return `showcase-${meetupId}`;
}

export function getTopicId(sectionId, item, itemIndex) {
  return `${sectionId}-${slugify(item.title)}-${itemIndex}`;
}

export function MeetupEventBar({ meetup }) {
  if (!meetup.event) {
    return null;
  }

  const event = meetup.event;

  return (
    <div className="meetup-event">
      <div className="meetup-event-meta">
        <span>
          {formatEventWeekday(event)} &middot; {formatEventTime(event)}
        </span>
        <span>{getLocationLabel(event)}</span>
      </div>
      <div className="meetup-event-actions">
        <a href={buildGoogleCalendarUrl(meetup)} target="_blank" rel="noreferrer">
          add to Google Calendar
        </a>
        <a href={buildIcsHref(meetup)}>download ICS</a>
      </div>
    </div>
  );
}

function TopicWikiEntryPoints({ topic, pagesById, onOpenRoute }) {
  const pages = getTopicWikiPages(topic, pagesById);

  if (pages.length === 0) {
    return null;
  }

  const relatedSearch = buildTopicExplorerSearch(topic, pagesById);

  return (
    <div className="topic-wiki-entry-points" aria-label={`${topic.title} wiki entry points`}>
      <div className="topic-wiki-chip-row">
        {pages.map((page) => (
          <RouteLink
            key={page.id}
            to={buildWikiPath(page.id)}
            onOpenRoute={onOpenRoute}
            className="topic-wiki-chip"
          >
            {page.title}
          </RouteLink>
        ))}
      </div>
      {relatedSearch ? (
        <RouteLink
          to={buildWikiPath(null, relatedSearch)}
          onOpenRoute={onOpenRoute}
          className="topic-wiki-related-link"
        >
          related Topics
        </RouteLink>
      ) : null}
    </div>
  );
}

export function StaticTrackSection({
  track,
  index,
  meetupSlug,
  wikiTopicLookup,
  wikiPagesById,
  onOpenRoute,
  onOpenTopic,
}) {
  return (
    <section className="track track--static" id={track.id} data-track={TRACK_CATEGORY[track.title]}>
      <div className="track-header track-header--static">
        <h3>
          <span className="track-num">{String(index + 1).padStart(2, "0")}</span> {track.title}
        </h3>
        <span className="track-count">
          {track.items.length} topic{track.items.length !== 1 ? "s" : ""}
        </span>
      </div>
      <ul className="topic-list">
        {track.items.map((item, itemIndex) => {
          const topicId = getTopicId(track.id, item, itemIndex);
          const wikiTopic = wikiTopicLookup?.get(getMeetupTopicLookupKey(meetupSlug, item.title));

          return (
            <Topic
              key={topicId}
              id={topicId}
              item={item}
              onActivate={onOpenTopic ? () => onOpenTopic(item, topicId) : undefined}
            >
              {wikiTopic ? (
                <TopicWikiEntryPoints
                  topic={wikiTopic}
                  pagesById={wikiPagesById}
                  onOpenRoute={onOpenRoute}
                />
              ) : null}
            </Topic>
          );
        })}
      </ul>
    </section>
  );
}

export function StaticShowcaseSection({
  index,
  meetupId,
  items = [],
  acceptsSubmissions,
  onOpenRoute,
  onOpenTopic,
}) {
  const showcaseSectionId = getShowcaseId(meetupId);

  return (
    <section className="track track--static" id={showcaseSectionId} data-track="community">
      <div className="track-header track-header--static">
        <h3>
          <span className="track-num">{String(index + 1).padStart(2, "0")}</span>{" "}
          {COMMUNITY_SLOT_LABEL}
        </h3>
        <span className="track-count">
          {items.length ? `${items.length} slot${items.length !== 1 ? "s" : ""}` : "open"}
        </span>
      </div>
      <div className="community-track-body">
        {items.length ? (
          <ul className="topic-list community-topic-list">
            {items.map((item, itemIndex) => {
              const topicId = getTopicId(showcaseSectionId, item, itemIndex);

              return (
                <Topic
                  key={topicId}
                  id={topicId}
                  item={item}
                  onActivate={onOpenTopic ? () => onOpenTopic(item, topicId) : undefined}
                />
              );
            })}
          </ul>
        ) : (
          <p className="community-slot-blurb">
            Got a short demo or topic? Add it to the end-of-meetup showcase.
          </p>
        )}
        <div className="community-track-footer">
          {acceptsSubmissions ? (
            <>
              <RouteLink to={SHOWCASE_SUBMISSION_PATH} onOpenRoute={onOpenRoute}>
                submit a showcase
              </RouteLink>
              <RouteLink to={LINK_SUBMISSION_PATH} onOpenRoute={onOpenRoute}>
                submit a regular link
              </RouteLink>
            </>
          ) : (
            <span>Submissions are closed for this meetup.</span>
          )}
        </div>
      </div>
    </section>
  );
}
