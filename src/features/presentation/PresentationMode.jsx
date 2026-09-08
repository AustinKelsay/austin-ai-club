import { useEffect, useMemo, useRef } from "react";
import { COMMUNITY_SLOT_LABEL, TRACK_CATEGORY } from "../../app/constants.js";
import { useModalFocus } from "../../lib/useModalFocus.js";
import SovereignWallpaper from "../brand/SovereignWallpaper.jsx";
import { buildSlides } from "./slides.js";
import { TopicMedia } from "./content.jsx";

function PresentationSlide({ slide, isFinale }) {
  const trackSlug = slide.type === "meetup-intro"
    ? "local-builds"
    : slide.type.startsWith("community")
      ? "community"
      : TRACK_CATEGORY[slide.track.title];

  if (slide.type === "meetup-intro") {
    return (
      <div className="pres-slide pres-slide--meetup-intro" data-track={trackSlug}>
        {slide.intro.eyebrow && slide.intro.eyebrow !== slide.intro.title ? (
          <span className="pres-intro-eyebrow">{slide.intro.eyebrow}</span>
        ) : null}
        <h2 className="pres-intro-title">{slide.intro.title}</h2>
        {slide.intro.blurb ? <p className="pres-intro-blurb">{slide.intro.blurb}</p> : null}
        {slide.intro.ctaHref && slide.intro.ctaLabel ? (
          <a className="pres-intro-link" href={slide.intro.ctaHref} target="_blank" rel="noreferrer">
            {slide.intro.ctaLabel}
          </a>
        ) : null}
        <ul className="pres-intro-list">
          {slide.intro.bullets.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        {slide.intro.hostNote ? <p className="pres-intro-note">{slide.intro.hostNote}</p> : null}
      </div>
    );
  }

  if (slide.type === "track-title") {
    return (
      <div className="pres-slide pres-slide--track" data-track={trackSlug}>
        <h2 className="pres-track-title">{slide.track.title}</h2>
        {slide.track.purpose ? <p className="pres-track-purpose">{slide.track.purpose}</p> : null}
        {slide.track.sectionNote ? <p className="pres-notes">{slide.track.sectionNote}</p> : null}
        <span className="pres-topic-badge">
          {slide.track.items.length} topic{slide.track.items.length !== 1 ? "s" : ""}
        </span>
      </div>
    );
  }

  if (slide.type === "track-outro") {
    return (
      <div className="pres-slide pres-slide--track pres-slide--outro" data-track={trackSlug}>
        <h2 className="pres-track-title">{slide.outro.title}</h2>
        <p className="pres-track-purpose">{slide.outro.body}</p>
        <span className="pres-topic-badge">discussion prompt</span>
      </div>
    );
  }

  if (slide.type === "community-title") {
    return (
      <div className="pres-slide pres-slide--track" data-track="community">
        <h2 className="pres-track-title">{COMMUNITY_SLOT_LABEL}</h2>
        <p className="pres-track-purpose">
          Short three to five minute shares at the end of the meetup.
        </p>
        <span className="pres-topic-badge">
          {slide.itemTotal ? `${slide.itemTotal} slot${slide.itemTotal !== 1 ? "s" : ""}` : "open"}
        </span>
      </div>
    );
  }

  const isReleaseRoundup = Boolean(slide.item.releaseRoundup);

  return (
    <div
      className={`pres-slide pres-slide--topic${isReleaseRoundup ? " pres-slide--release-roundup" : ""}${isFinale ? " pres-slide--finale" : ""}`}
      data-track={trackSlug}
    >
      <h3 className="pres-topic-title">
        {slide.item.href ? (
          <a href={slide.item.href} target="_blank" rel="noreferrer">
            {slide.item.title}
          </a>
        ) : (
          slide.item.title
        )}
      </h3>
      <p className="pres-topic-desc">
        {slide.item.presentationDescription ?? slide.item.description}
      </p>
      {(slide.item.presentationNotes ?? slide.item.notes) ? (
        <p className="pres-notes">{slide.item.presentationNotes ?? slide.item.notes}</p>
      ) : null}
      <TopicMedia item={slide.item} />
    </div>
  );
}

function PresentationProgress({ currentIndex, totalSlides, slideLabel, trackSlug }) {
  const pct = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <div className="pres-bottom" data-track={trackSlug}>
      <span className="pres-bottom-label">{slideLabel}</span>
      <div className="pres-progress-track">
        <div className="pres-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="pres-bottom-counter" role="status" aria-live="polite" aria-atomic="true">
        {currentIndex + 1} / {totalSlides}
      </span>
    </div>
  );
}

export default function PresentationMode({
  meetup,
  currentIndex,
  includeOpenCommunitySlot = false,
  onNavigate,
  onExit,
}) {
  const slides = useMemo(
    () => buildSlides(meetup, { includeOpenCommunitySlot }),
    [includeOpenCommunitySlot, meetup],
  );
  const visitedRef = useRef(new Set());
  const touchStartRef = useRef(null);
  const overlayRef = useRef(null);
  const slide = slides[currentIndex];

  useModalFocus(overlayRef, Boolean(slide), onExit);

  const isFirstVisit = !visitedRef.current.has(currentIndex);
  visitedRef.current.add(currentIndex);

  const isFinale =
    isFirstVisit &&
    slide?.isLastInTrack &&
    slide.trackIndex === slide.trackTotal - 1;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;

  const goNext = () => {
    if (!isLast) {
      onNavigate(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;

    if (!start || !touch) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
      return;
    }

    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  useEffect(() => {
    const handler = (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey ||
          event.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      // Space activates a focused control; only the slide surface advances with it.
      if (event.key === " " && event.target.closest?.("button, a[href]")) return;
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, isFirst, isLast, onExit, onNavigate]);

  useEffect(() => {
    if (window.twttr?.widgets?.load) {
      const twitterWidgetRefreshTimeout = setTimeout(() => window.twttr.widgets.load(), 50);
      return () => clearTimeout(twitterWidgetRefreshTimeout);
    }
  }, [currentIndex]);

  if (!slide) return null;

  // Where we are (date › track); the bottom bar's slide label carries "n of m".
  const breadcrumb = slide.type === "meetup-intro"
    ? `${meetup.date} › Welcome`
    : slide.type === "community-title" || slide.type === "community-topic"
      ? `${meetup.date} › ${COMMUNITY_SLOT_LABEL}`
      : `${meetup.date} › ${slide.track.title}`;

  const slideLabel = slide.type === "meetup-intro"
    ? "Welcome"
    : slide.type === "topic"
      ? `Topic ${slide.itemIndex + 1} of ${slide.itemTotal}`
      : slide.type === "community-topic"
        ? `${COMMUNITY_SLOT_LABEL} ${slide.itemIndex + 1} of ${slide.itemTotal}`
        : slide.type === "community-title"
          ? `Track ${meetup.tracks.length + 1} of ${meetup.tracks.length + 1}`
          : `Track ${slide.trackIndex + 1} of ${slide.trackTotal}`;

  const trackSlug = slide.type === "meetup-intro"
    ? "local-builds"
    : slide.type === "community-title" || slide.type === "community-topic"
      ? "community"
      : TRACK_CATEGORY[slide.track.title];

  const isReleaseRoundup =
    slide.type === "topic" && Boolean(slide.item.releaseRoundup);

  return (
    <div ref={overlayRef} className="pres-overlay" data-track={trackSlug}
      role="dialog" aria-modal="true" aria-label="Presentation Mode" tabIndex={-1}>
      <SovereignWallpaper />
      <div className="pres-topbar">
        <span className="pres-breadcrumb">{breadcrumb}</span>
        <div className="pres-topbar-actions">
          <button className="pres-exit-btn" onClick={onExit}>
            esc exit
          </button>
        </div>
      </div>

      <div className="pres-content">
        <button
          className="pres-nav pres-nav--prev"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div
          className={`pres-stage${isReleaseRoundup ? " pres-stage--release-roundup" : ""}`}
          key={currentIndex}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <PresentationSlide
            slide={slide}
            isFinale={isFinale}
          />
        </div>

        <button
          className="pres-nav pres-nav--next"
          onClick={goNext}
          disabled={isLast}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <PresentationProgress
        currentIndex={currentIndex}
        totalSlides={slides.length}
        slideLabel={slideLabel}
        trackSlug={trackSlug}
      />
      <div className="pres-mobile-controls" data-track={trackSlug}>
        <button
          className="pres-mobile-btn"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous slide"
        >
          Prev
        </button>
        <span className="pres-mobile-hint">swipe or tap to navigate</span>
        <button
          className="pres-mobile-btn"
          onClick={goNext}
          disabled={isLast}
          aria-label="Next slide"
        >
          Next
        </button>
      </div>
    </div>
  );
}
