# austin-ai-club

A small Vite + React frontend for Sovereign AI Club meetups, topic boards, submissions, reminders, and presentation mode.

This repo is optimized for clarity over abstraction. The goal is to make it easy for a human or agent to:

- understand the rendering model quickly
- add or update meetup topic boards without guessing
- keep the Markdown Archive durable and easy to diff
- support both archive browsing and Presentation Mode

For the project language and curation rules, start with [CONTEXT.md](./CONTEXT.md). The source-of-record decision is captured in [ADR 0001](./docs/adr/0001-markdown-archive-as-source-of-record.md), and the open LLM Wiki layer is captured in [ADR 0002](./docs/adr/0002-open-llm-wiki-layer.md).

## What the app does

The frontend has three public surfaces over the same meetup data:

- Homepage: a browsable index of meetups
- Meetup detail view: a dedicated page for one meetup with its topic board expanded
- Presentation Mode: a slide-by-slide walkthrough of each topic and showcase, including richer embeds, link cards, and public presenter notes

It also has three auxiliary pages:

- `/calendar` for authored meetups and tentative meetup slots
- `/submit-link` for link submissions
- `/submit-showcase` for short member-led showcase proposals

Meetup detail pages live at `/meetups/:slug`.

Presentation Mode is not a separate data source. It is built from the same meetup data that powers both the homepage and meetup detail pages.

The site also supports low-friction submissions and one global reminder signup. Submissions target the next upcoming authored meetup, or the next tentative meetup slot if that gathering is not authored yet. If the default biweekly slot already passed without a board, submissions stamp the next Wednesday rather than skipping ahead on the origin grid. Reminders only point at actual planned meetups, not tentative meetup slots.

Presentation Mode uses hash-based slide URLs such as `/meetups/2026-03-18#/slides/2026-03-18/models-and-research/qwen-3-5-series`, so refresh and direct links return to the same item without needing server-side rendering.

## Quick Start

```bash
npm install
npm run dev
```

Then open the local Vite URL, usually `http://127.0.0.1:5173/`.

If you want the inline reminder form to submit locally, copy [.env.example](./.env.example) to `.env.local` and set `VITE_REMINDER_SIGNUP_URL`.

If you want the submission forms to create GitHub issues, also set:

- `GITHUB_ISSUES_TOKEN`
- `GITHUB_ISSUES_OWNER`
- `GITHUB_ISSUES_REPO`

Under `npm run dev`, Vite now serves `/api/github-issue` locally as well, so the link and showcase forms work on localhost once those env vars are present.

## Build

```bash
npm run build
```

Vite emits the production site to `dist/`.

## Deploy

Vercel deploy is intentionally simple:

1. Import the repo into Vercel
2. Use the `Vite` framework preset
3. Build command: `npm run build`
4. Output directory: `dist`
5. Attach the `austinai.club` domain

This repo also includes [vercel.json](./vercel.json) so those settings are explicit in source control.

Presentation Mode uses hash routes like `#/slides/...`, and the meetup/helper pages use pathname routes like `/meetups/2026-03-18` and `/submit-link`, so static hosting works with the included rewrites.

## Repo Map

- [index.html](./index.html)
  Vite entry HTML
- [src/main.jsx](./src/main.jsx)
  React bootstrap
- [src/App.jsx](./src/App.jsx)
  Main renderer for archive mode, Presentation Mode, embeds, link cards, notes, and footer
- [src/data.js](./src/data.js)
  Explicit meetup data contract for rendering
- [src/styles.css](./src/styles.css)
  Full visual system for both archive and presentation views
- [scripts/sync-events.mjs](./scripts/sync-events.mjs)
  Generates `public/meetups.json` plus per-event ICS files from `src/data.js`, preserving timestamps when event data is unchanged
- [public/topics/](./public/topics/)
  Durable Markdown Archive and open LLM Wiki served as static files
- [public/topics/README.md](./public/topics/README.md)
  Archive-side and wiki workflow notes
- [apps-script/](./apps-script/)
  Tiny Google Apps Script reminder backend
- [api/github-issue.js](./api/github-issue.js)
  Vercel function for turning form submissions into GitHub issues

## Rendering Model

The render pipeline is:

1. Durable meetup notes live in `public/topics/*.md`
2. The Markdown Archive is the source of record for authored meetup notes
3. The LLM Wiki in `public/topics/` adds frontmatter, source link records, indexes, and interlinked entity/concept pages
4. Meetup data in [src/data.js](./src/data.js) mirrors or curates Markdown content for rendering
5. [src/App.jsx](./src/App.jsx) renders archive mode and Presentation Mode from the same meetup data
6. [src/styles.css](./src/styles.css) styles both modes

This split is intentional:

- the Markdown Archive stays durable and easy to diff
- the LLM Wiki keeps recurring context open and reusable on GitHub
- meetup data stays explicit and patch-friendly
- React stays mostly presentational, with only a little view state for Presentation Mode

## Data Shape

Each meetup in [src/data.js](./src/data.js) contains:

- `id`
- `slug`
- `date`
- `markdownHref`
- `event`
- `presentationIntro`
- `showcases[]`
- `tracks[]`

`event` is optional event metadata for calendar links and reminders:

- `title`
- `summary`
- `startAt`
- `endAt`
- `timezone`
- `locationName`
- `locationAddress`
- `reminderSendHour`

Each track contains:

- `id`
- `title`
- `items[]`

Each topic must have at least one link via `href`, `linkPair`, or another link-bearing presentation shape. A topic item can use any of these fields:

- `title`
- `description`
- `chip`
- `href`
- `embed` / `embeds`
- `image` / `images`
- `video` / `videos`
- `mediaPair`
- `linkPair`
- `notes`
- `suppressXEmbeds`
- `suppressVideos`
- `suppressImages`

Supported patterns right now:

- Plain link item
- Auto X/Twitter embeds from `href` and `linkPair`
- Auto YouTube embeds from `href` and `linkPair`
- Explicit X/Twitter embed override via `embed` or `embeds`
- Explicit image override via `image` or `images`
- Explicit YouTube embed override via `video` or `videos`
- Paired topic via `mediaPair`, usually `video + reaction post`
- Public presenter note via `notes`
- Opt out of defaults with `suppressXEmbeds`, `suppressVideos`, or `suppressImages`

## Standard Tracks

Meetups should use the same five high-level tracks by default:

1. `Local Builds & Projects`
2. `Agent Infrastructure`
3. `Models & Research`
4. `Security`
5. `Big Tech Moves`

These names are intentionally broad enough to survive meetup-to-meetup topic drift while still being specific enough to keep the board organized. Empty standard tracks should be omitted.

Use them this way:

- `Local Builds & Projects`
  Austin/member/community-orbit projects, demos, prototypes, launches, and things people can run or inspect directly.
- `Agent Infrastructure`
  CLIs, runtimes, orchestration frameworks, protocols, interfaces, tool-calling layers, and deployment plumbing.
- `Models & Research`
  Model releases, benchmark shifts, papers, frontier comparisons, architecture updates, and capability discussions.
- `Security`
  Attacks, red-team findings, prompt injection, abuse patterns, defensive ideas, and security-relevant failures. Security is also a curation lens across other tracks.
- `Big Tech Moves`
  Major company moves, hardware launches, ecosystem shifts, OS/platform bets, acquisitions, product strategy, and platform-scale policy or infrastructure changes.

Open source and privacy are curation lenses, not tracks. If a topic could fit multiple tracks, sort it by the angle you want the club discussion to focus on, not by every possible interpretation.

## Meetup Workflow

1. Copy [public/topics/TEMPLATE.md](./public/topics/TEMPLATE.md) to `public/topics/YYYY-MM-DD.md`
2. Add wiki frontmatter following [public/topics/SCHEMA.md](./public/topics/SCHEMA.md)
3. Use the standard five tracks unless there is a strong reason to diverge
4. Omit empty tracks
5. Add topics and links in Markdown first
6. Add source link records under `public/topics/raw/articles/` when sources need durable notes
7. Add or update central entity/concept pages and `[[wikilinks]]`
8. Mirror that content into [src/data.js](./src/data.js)
9. Add public `notes` when they help Presentation Mode
10. Add or update the meetup `event` metadata if this is an actual planned meetup that should appear in reminders/calendar links
11. Keep the Community Slot last; show an empty slot only for the next upcoming meetup
12. Update [public/topics/index.md](./public/topics/index.md) and [public/topics/log.md](./public/topics/log.md)
13. Run `npm run lint:wiki` and `npm run build`

Do not skip the Markdown step. The Markdown Archive is the source of record.

## Meetup Slots

Sovereign AI Club tries to meet biweekly. The calendar can generate tentative meetup slots from that cadence, and those slots can be manually overridden by authored meetups when the real date changes.

Meetup slots are not authored meetups: they do not have topic boards, and reminders should not point at them. Submissions can still target the next meetup slot when no authored meetup exists yet, keeping the submission path low-friction. If the default biweekly slot has already passed unauthored, that submission target is the next Wednesday — the next time the club would actually meet — not the following date on the original biweekly grid.

## Reminders

The reminder flow is intentionally small:

1. Event metadata for actual planned meetups lives in [src/data.js](./src/data.js)
2. [scripts/sync-events.mjs](./scripts/sync-events.mjs) generates:
   `public/meetups.json` and `public/calendar/*.ics`
   The generator preserves existing `generatedAt` and `DTSTAMP` values when event data is unchanged, keeping build diffs focused on real event edits.
3. The frontend posts one global email signup to `VITE_REMINDER_SIGNUP_URL`
4. The Apps Script in [apps-script/README.md](./apps-script/README.md) stores subscribers in a Google Sheet and sends reminders only for actual planned meetup days

## Submissions

Submissions are intentionally low-friction:

- new submissions always target the next upcoming authored meetup, or the next tentative meetup slot if that gathering is not authored yet; a missed biweekly slot falls through to the next Wednesday
- link submissions require a title and one or more valid links
- showcase submissions require a title and short description; links are optional because showcases can be ad hoc and spontaneous
- curation can rewrite, combine, reframe, order, or move submitted material before it becomes part of a topic board

## Embed Notes

- The site should be served over HTTP, not opened with `file://`
- X embeds are loaded client-side through Twitter widgets in [src/App.jsx](./src/App.jsx)
- YouTube embeds use `referrerPolicy="strict-origin-when-cross-origin"` to reduce embed failures
- Presentation Mode now auto-renders X posts, YouTube links, and direct image URLs from `href` / `linkPair` unless suppressed
- If an embed is flaky, keep the direct link in the data model so the topic still degrades gracefully

## Editing Guidance

- Prefer editing [src/data.js](./src/data.js) over adding new component abstractions
- Prefer adding a new data shape only if an existing one cannot express the topic cleanly
- Keep comments short and structural
- Keep CSS centralized in [src/styles.css](./src/styles.css) unless a split becomes obviously necessary
- Optimize for coherence across both archive mode and Presentation Mode
