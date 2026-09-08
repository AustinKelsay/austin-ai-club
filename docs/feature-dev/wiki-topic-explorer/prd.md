# PRD: Wiki Topic Explorer

## Problem Statement

Sovereign AI Club already has a Markdown Archive and LLM Wiki, but the public Wiki Explorer is still page-oriented. A meetup organizer can find the Cursor page or the SpaceX page, but cannot easily answer practical questions like "show every past Cursor Topic" or "show every past Topic that links both Cursor and SpaceX." The archive has the right foundations in `[[wikilinks]]`, source records, and generated wiki metadata, but Topics are not yet a first-class exploration unit in the front end.

## Solution

Extend the generated Wiki Explorer manifest with first-class Topic records derived from the Markdown Archive. Each Topic record should include its Meetup, Track, Topic Title, source Links, resolved wiki entities/concepts, and searchable text. The Wiki Explorer should support stable URL filters for entity and concept intersections, render a Topic Results panel, and expose entry points from Meetup detail Topics so organizers can move from a current board item to related historical material.

The Markdown Archive remains the source of record. `src/data.js` remains the Meetup Data contract for archive pages and Presentation Mode. The Wiki Explorer uses the generated manifest as its discovery read model.

## User Stories

1. As a meetup organizer, I want to open a Cursor wiki page, so that I can see prior Topics and Links involving Cursor.
2. As a meetup organizer, I want to filter Wiki Explorer Topics by Cursor, so that I can quickly prepare context for a Cursor discussion.
3. As a meetup organizer, I want to filter Topics by Cursor and SpaceX together, so that I can find the exact past intersection Topic.
4. As a meetup organizer, I want stable filtered URLs, so that I can save or share a prepared exploration view before the meetup.
5. As a meetup organizer, I want Topic Results grouped with Meetup, Track, and source provenance, so that I can scan the historical discussion path.
6. As a meetup organizer, I want source Links inside Topic Results, so that I can jump from a result to the original support material.
7. As a meetup organizer, I want Meetup detail Topics to show small wiki entry points when metadata exists, so that the current board becomes a launchpad into the LLM Wiki.
8. As an archive reader, I want existing `/wiki`, `/wiki/:id`, `/meetups/:slug`, and Presentation Mode behavior to keep working, so that new exploration does not break old flows.
9. As an agent maintaining the wiki, I want tests around Topic extraction and filters, so that future curation changes do not silently break exploration.
10. As a developer, I want the feature to be generated from Markdown Archive data, so that we avoid duplicating entity/tag metadata by hand in Meetup Data.

## Implementation Decisions

- Add Topic records to the generated wiki manifest. A Topic record is derived from a Meetup page Topic bullet and its supporting Links.
- Resolve Topic `[[wikilinks]]` to page IDs using the same title-to-ID map as page links.
- Keep Topic records separate from wiki pages. Topics are not wiki pages and should not affect page catalog counts.
- Add a small route/search extension for `entities` and `concepts` query params, using comma-separated wiki page IDs.
- Treat entity/concept filters as AND filters: a Topic must include every selected ID to match.
- Keep broad page search intact, but make free-text search tokenized enough that multi-word queries such as `cursor spacex` can match across Topic/page haystacks.
- Add a Topic Results panel to the Wiki Explorer instead of rendering full Markdown.
- Add Meetup detail wiki chips by matching rendered Meetup Data Topics back to manifest Topic records by Meetup slug and Topic Title.
- Do not generate `src/data.js` from the LLM Wiki. Pass manifest-derived metadata into archive rendering when available.
- Record the repo branch deviation: this repo has no `staging` branch, so the PR target is `main` unless staging appears.

## Testing Decisions

- Test manifest Topic extraction through `buildWikiManifest`, because that is the public generation interface.
- Test route state parse/build for `entities` and `concepts`.
- Test search/filter helpers through public functions, not private implementation details.
- Test rendered Topic Results and wiki chips with React static markup where possible.
- Run `npm run lint:wiki`, `npm test`, and `npm run build`.
- Smoke test the running app with a local dev server and browser automation for the Cursor/SpaceX filtered path and a Meetup detail entry point.

## Out of Scope

- Full Markdown rendering in Wiki Explorer.
- Editing wiki pages from the browser.
- New curation content about Cursor, SpaceX, or the June 24 board.
- Production deployment or production-only verification.
- Replacing Meetup Data or Presentation Mode with generated wiki data.

## Further Notes

The core acceptance example is `/wiki?entities=cursor,spacex`: it should show the May 27 **SpaceX options Cursor for $60B** Topic with its sources, while preserving the existing wiki graph and page explorer.
