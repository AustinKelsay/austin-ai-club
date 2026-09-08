import { useEffect, useMemo, useState } from "react";
import { meetups } from "./data.js";
import { APP_ROUTE } from "./app/constants.js";
import { buildMeetupPath, getAppRoute, setPathname } from "./app/routes.js";
import ArchiveView from "./features/archive/ArchiveView.jsx";
import MeetupDetailView from "./features/archive/MeetupDetailView.jsx";
import {
  buildCalendarTimelineEntries,
  getNextSubmissionTarget,
} from "./features/calendar/calendar.js";
import CalendarView from "./features/calendar/CalendarView.jsx";
import PresentationMode from "./features/presentation/PresentationMode.jsx";
import {
  buildSlideHash,
  buildSlides,
  findTopicSlideIndex,
  resolvePresentationHash,
} from "./features/presentation/slides.js";
import SubmissionScreen from "./features/submissions/SubmissionScreen.jsx";
import WikiExplorer from "./features/wiki/WikiExplorer.jsx";
import { buildMeetupTopicLookup } from "./features/wiki/wikiTopicEntryPoints.js";

const PRESENTATION_ENTRY_MODE = {
  FULL: "full",
  ITEM: "item",
};

export default function App() {
  const nextSubmissionTarget = getNextSubmissionTarget(meetups);
  const nextMeetup = meetups.find((meetup) => meetup.id === nextSubmissionTarget?.id) ?? null;
  const [presentationState, setPresentationState] = useState(() =>
    resolvePresentationHash(meetups, window.location.hash, {
      includeOpenCommunitySlotForMeetupId: nextMeetup?.id ?? null,
    }),
  );
  const [route, setRoute] = useState(() => getAppRoute(window.location.pathname));
  const [wikiManifest, setWikiManifest] = useState(null);
  const [wikiError, setWikiError] = useState(false);
  const [wikiLoadAttempt, setWikiLoadAttempt] = useState(0);
  const calendarEntries = buildCalendarTimelineEntries(meetups);
  const wikiTopicLookup = useMemo(() => buildMeetupTopicLookup(wikiManifest), [wikiManifest]);

  const syncLocationState = (
    pathname = `${window.location.pathname}${window.location.search}`,
    hash = window.location.hash,
  ) => {
    let nextRoute = getAppRoute(pathname);

    const next = resolvePresentationHash(meetups, hash, {
      includeOpenCommunitySlotForMeetupId: nextMeetup?.id ?? null,
    });
    if (next?.invalidHash !== undefined) {
      setRoute(nextRoute);
      setPresentationState(null);
      if (hash !== next.invalidHash) {
        setPathname(pathname, { replace: true, hash: next.invalidHash });
      }
      return;
    }

    if (
      next &&
      nextRoute.name === APP_ROUTE.MEETUP &&
      nextRoute.meetupSlug !== next.meetup.slug
    ) {
      const normalizedPath = buildMeetupPath(next.meetup.slug);
      setPathname(normalizedPath, { replace: true, hash });
      nextRoute = getAppRoute(normalizedPath);
    }

    setRoute(nextRoute);
    setPresentationState(next);
  };

  const openRoute = (pathname, options = {}) => {
    const nextRoute = getAppRoute(pathname);
    const changesPage = nextRoute.name !== route.name ||
      nextRoute.meetupSlug !== route.meetupSlug;
    setPathname(pathname, { hash: "", ...options });
    syncLocationState();
    if (changesPage && !options.hash) {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.querySelector("main")?.focus({ preventScroll: true });
      });
    }
  };

  const goHome = (options = {}) => {
    openRoute("/", options);
  };

  const goToMeetup = (meetup, options = {}) => {
    if (!meetup?.slug) {
      goHome(options);
      return;
    }

    openRoute(buildMeetupPath(meetup.slug), options);
  };

  const goToNextMeetupOrHome = (options = {}) => {
    if (nextMeetup) {
      goToMeetup(nextMeetup, options);
      return;
    }

    goHome(options);
  };

  const getPresentationHistoryState = () => window.history.state?.presentation ?? null;

  useEffect(() => {
    const existing = window.twttr;
    if (existing?.widgets?.load) {
      existing.widgets.load();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();
    setWikiError(false);

    fetch("/wiki-manifest.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load wiki manifest: ${response.status}`);
        }

        return response.json();
      })
      .then((manifest) => {
        if (isActive) {
          setWikiManifest(manifest);
        }
      })
      .catch(() => {
        if (isActive) {
          setWikiError(true);
          setWikiManifest(null);
        }
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [wikiLoadAttempt]);

  useEffect(() => {
    const syncFromLocation = () => {
      syncLocationState(
        `${window.location.pathname}${window.location.search}`,
        window.location.hash,
      );
    };

    syncFromLocation();
    window.addEventListener("hashchange", syncFromLocation);
    window.addEventListener("popstate", syncFromLocation);

    return () => {
      window.removeEventListener("hashchange", syncFromLocation);
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, []);

  useEffect(() => {
    if (route.name === APP_ROUTE.HOME || route.name === APP_ROUTE.MEETUP) {
      return undefined;
    }

    const handleKeydown = (event) => {
      if (event.key === "Escape" && !event.defaultPrevented) {
        goToNextMeetupOrHome({ replace: true });
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [route, nextMeetup]);

  const openPresentation = (meetup, slideIndex = 0, options = {}) => {
    const includeOpenCommunitySlot = meetup.id === nextMeetup?.id;
    const slides = buildSlides(meetup, { includeOpenCommunitySlot });
    const slide = slides[slideIndex];
    if (!slide) {
      return;
    }

    const {
      entryMode = PRESENTATION_ENTRY_MODE.FULL,
      hasReturnEntry = false,
      replace = false,
      returnHash = "",
    } = options;
    const returnPath = buildMeetupPath(meetup.slug);
    const currentPresentationState = getPresentationHistoryState();
    const isAlreadyInPresentation = window.location.hash.startsWith("#/slides/");

    let nextReplace = replace;
    let nextState;

    if (isAlreadyInPresentation) {
      const mode = currentPresentationState?.mode ?? entryMode;
      const depth =
        mode === PRESENTATION_ENTRY_MODE.ITEM
          ? 1
          : (currentPresentationState?.depth ?? 0) + 1;

      nextReplace = mode === PRESENTATION_ENTRY_MODE.ITEM;
      nextState = {
        presentation: {
          mode,
          depth,
          hasReturnEntry: currentPresentationState?.hasReturnEntry ?? hasReturnEntry,
          returnPath: currentPresentationState?.returnPath ?? returnPath,
          returnHash: currentPresentationState?.returnHash ?? returnHash,
        },
      };
    } else {
      nextState = {
        presentation: {
          mode: entryMode,
          depth: 1,
          hasReturnEntry,
          returnPath,
          returnHash,
        },
      };
    }

    setPathname(returnPath, {
      hash: buildSlideHash(meetup, slide),
      replace: nextReplace,
      state: nextState,
    });
    syncLocationState();
  };

  const openPresentationFromItem = (meetup, item, returnHash) => {
    const includeOpenCommunitySlot = meetup.id === nextMeetup?.id;
    const slideIndex = findTopicSlideIndex(meetup, item, { includeOpenCommunitySlot });
    if (slideIndex === -1) {
      return;
    }

    const returnPath = buildMeetupPath(meetup.slug);
    setPathname(returnPath, {
      hash: returnHash,
      replace: true,
      state: window.history.state,
    });

    openPresentation(meetup, slideIndex, {
      entryMode: PRESENTATION_ENTRY_MODE.ITEM,
      hasReturnEntry: true,
      returnHash,
    });
  };

  const closePresentation = (meetup) => {
    const presentationState = getPresentationHistoryState();
    if (presentationState?.hasReturnEntry && presentationState?.depth) {
      window.history.go(-presentationState.depth);
      return;
    }

    goToMeetup(meetup, {
      replace: true,
      hash: presentationState?.returnHash ?? "",
    });
  };

  if (route.name === APP_ROUTE.CALENDAR) {
    return (
      <CalendarView
        calendarEntries={calendarEntries}
        nextMeetup={nextMeetup}
        onClose={() => goToNextMeetupOrHome({ replace: true })}
        onOpenRoute={openRoute}
      />
    );
  }

  if (route.name === APP_ROUTE.SUBMIT_LINK) {
    return (
      <SubmissionScreen
        key="link"
        kind="link"
        target={nextSubmissionTarget}
        onBack={() => goToNextMeetupOrHome({ replace: true })}
        onOpenRoute={openRoute}
      />
    );
  }

  if (route.name === APP_ROUTE.SUBMIT_SHOWCASE) {
    return (
      <SubmissionScreen
        key="showcase"
        kind="showcase"
        target={nextSubmissionTarget}
        onBack={() => goToNextMeetupOrHome({ replace: true })}
        onOpenRoute={openRoute}
      />
    );
  }

  if (route.name === APP_ROUTE.WIKI) {
    return (
      <WikiExplorer
        manifest={wikiManifest}
        error={wikiError}
        onRetry={() => setWikiLoadAttempt((attempt) => attempt + 1)}
        focusedWikiId={route.wikiId}
        search={route.search ?? ""}
        onOpenRoute={openRoute}
      />
    );
  }

  if (route.name === APP_ROUTE.MEETUP) {
    const meetup = meetups.find((candidate) => candidate.slug === route.meetupSlug) ?? null;

    return (
      <>
        <MeetupDetailView
          meetup={meetup}
          meetupSlug={route.meetupSlug}
          nextMeetupId={nextMeetup?.id ?? null}
          wikiTopicLookup={wikiTopicLookup}
          wikiPagesById={wikiManifest?.pagesById ?? {}}
          onOpenRoute={openRoute}
          onOpenPresentation={(candidate) =>
            openPresentation(candidate, 0, {
              entryMode: PRESENTATION_ENTRY_MODE.FULL,
              hasReturnEntry: true,
              returnHash:
                window.location.pathname === buildMeetupPath(candidate.slug) &&
                !window.location.hash.startsWith("#/slides/")
                  ? window.location.hash
                  : "",
            })
          }
          onOpenTopicPresentation={(item, topicId) =>
            openPresentationFromItem(meetup, item, `#${topicId}`)
          }
        />
        {presentationState?.meetup ? (
          <PresentationMode
            meetup={presentationState.meetup}
            currentIndex={presentationState.slideIndex}
            includeOpenCommunitySlot={presentationState.meetup.id === nextMeetup?.id}
            onNavigate={(slideIndex) => openPresentation(presentationState.meetup, slideIndex)}
            onExit={() => closePresentation(presentationState.meetup)}
          />
        ) : null}
      </>
    );
  }

  return (
    <>
      <ArchiveView
        meetups={meetups}
        nextMeetupId={nextMeetup?.id ?? null}
        onOpenRoute={openRoute}
      />
      {presentationState?.meetup ? (
        <PresentationMode
          meetup={presentationState.meetup}
          currentIndex={presentationState.slideIndex}
          includeOpenCommunitySlot={presentationState.meetup.id === nextMeetup?.id}
          onNavigate={(slideIndex) => openPresentation(presentationState.meetup, slideIndex)}
          onExit={() => closePresentation(presentationState.meetup)}
        />
      ) : null}
    </>
  );
}
