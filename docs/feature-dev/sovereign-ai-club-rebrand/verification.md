# Rebrand polish and verification

Verified locally on September 7, 2026, on `feature/sovereign-ai-club-rebrand`.

## Changes from the first implementation pass

| Before | After |
| --- | --- |
| Pale past Meetup titles, metadata, wiki chips, hover links, form feedback, and tentative calendar badges inherited the dark palette. | Readable charcoal, green, and semantic status colors; darker gold and orange Track text; graph fallback colors match the theme. |
| Wallpaper painted over some panels and images. | The application has its own stacking layer above the decorative wallpaper. |
| Desktop hero cropped out the human hand and most of the starburst; image dimensions described a landscape asset. | Responsive introduction beside the complete poster, stacked on phones, with correct intrinsic dimensions and a subtle image outline. |
| Mobile header stacked its small wordmark above the site title. | Wordmark and site title share a row above navigation. |
| Past Meetup cards and selected hover surfaces retained blurred shadows and glows. | Archive cards, calendar hover states, and presentation link cards use the hard theme shadows; fullscreen graph uses a light panel and sage backdrop. |
| Wiki chips and slide exit controls had small hit areas; home and Meetup card focus states were faint. | Those controls have 40px minimum height; home and Meetup cards have explicit keyboard focus outlines. Shared action radius uses the theme token. |
| The mobile calendar's square aspect ratio forced day cells beyond the panel. | Day cells size to their grid columns without horizontal overflow. |
| Calendar buttons claimed gridcell semantics without rows; Showcase buttons replaced list-item semantics; graph and wordmark labels lacked an appropriate role. | Calendar uses a labelled group of native buttons with full-date labels and pressed state; Showcase list items contain the interactive content; graph and wordmark expose image roles. |
| Future calendar slots followed the original March anchor, putting a slot only one week after September 9. | Upcoming authored Meetups remain scheduled; later slots recur from the latest authored date: September 23, October 7, and onward, preserving 5:30 PM Central across daylight saving. |
| Social image metadata used a relative URL without alternative text. | Absolute image URL on the retained domain and descriptive alternative text. |

## Automated checks

- `npm test`: 189 tests passed across 26 files, including a new Showcase semantics regression case and calendar date-label assertions and a recurrence regression covering the daylight-saving change.
- `npm run lint:wiki`: 162 Markdown files passed.
- `npm run build`: passed; generated 157 wiki pages and 1,829 links.
- `git -c core.whitespace=cr-at-eol diff --check`: passed. ICS files intentionally retain CRLF endings.
- Axe WCAG 2 A/AA and 2.1 AA scans at 1440px and 390px: no violations on home, historical Meetup, calendar, Cursor wiki page, both submission forms, and the checked slide route. The active Presentation Mode overlay was also scanned separately and passed.

## Browser verification

Chromium ran headlessly from the existing Playwright cache. Screenshots and temporary browser scripts are in `/tmp/sovereign-qa` and `/tmp/sovereign-*.cjs`; no new browser dependencies were added to the repo.

Checked home, September 9 Meetup, March 18 Meetup, calendar, Wiki Explorer, Cursor wiki page, the historical April 1 wiki URL, and both submission forms at 1440px and 390px. The same nine routes also passed a smoke check against the production build. No uncaught application errors were observed. Additional element-bound checks confirmed that key mobile controls and panels fit the viewport; reduced-motion mode disables smooth scrolling and transitions.

Interaction checks covered calendar month navigation, Google Calendar parameters and ICS contents, Presentation Mode entry, keyboard navigation, deep-link reload and exit, wiki search URL updates, and graph fullscreen entry and exit. September 9 uses AI Freedom Lab and 22:30 UTC (5:30 PM Central); March 18 still displays Bitcoin Park.

Both submission forms were exercised through error, retry, success, and field reset using intercepted API responses. Reminder signup and reset were exercised through an intercepted Apps Script response. These checks verify frontend behavior, not live backend delivery; no real GitHub issues, subscriptions, or emails were created.

## Follow-up pass: backdrop polish and dark theme

Requested after the first verification pass; recorded as alignment decisions 8 and 9 in `ledger.md`.

| Before | After |
| --- | --- |
| Flat sage-to-white gradient painted on `body`; a rotated plain-text "SOVEREIGN" layer only covered the top of the viewport. | Viewport-fixed poster backdrop (`--page-backdrop`): sage pooling top-left and along the right edge, white below, shared by the page and the Presentation Mode overlay. |
| No wallpaper texture below the first screen. | `SovereignWallpaper` tiles the same ASCII wordmark as the header (`SOVEREIGN_ASCII`) through a CSS mask in brick-offset rows, colored by `--ascii-wallpaper-color`, drifting one tile per 150s. Reduced motion stops the drift. |
| Calendar and submission screens sat on an opaque white page. | They show the shared backdrop and wallpaper like every other route. |
| Light theme only; `color-scheme: light`. | `[data-theme="dark"]` token overrides (backdrop, panels, text, accent, semantic states, shadows, image outline, graph and Track hues). A `ThemeToggle` sits in the topbar, calendar and submission headers, and the slide topbar. First visit follows `prefers-color-scheme`; a choice persists in `localStorage` and applies before first paint via an inline script in `index.html`. |
| Graph colors were read once at module load, so a theme switch could not recolor the canvas. | Token reads are cached per theme and resolved at draw time; the graph repaints on `sovereign-theme-change`. Legend and catalog dots use `var(--graph-*)` directly. |
| Wiki, archive, and slide styles still carried mint and cyan `rgba()` values and blurred shadows from the dark terminal era; X embeds were pinned to their light theme. | All color and shadow values derive from tokens; embeds take the theme active at mount. |
| `<button class="wiki-tag">` and the "Show matching Topics" button fell back to the browser's button face, which turned grey in dark mode. | Both share the chip and source-link styling explicitly. |

Checks for this pass:

- `npm test`: 199 tests passed across 29 files (new: theme resolution and storage, `ThemeToggle` markup, ASCII wallpaper mask encoding; legend test now asserts token references).
- `npm run lint:wiki`, `npm run build`, and `git diff --check` passed; the inline theme bootstrap survives the production build.
- Axe WCAG 2 A/AA and 2.1 AA: no violations in either theme at 1440px and 390px on home, historical Meetup, calendar, Cursor wiki page, both submission forms, and the active slide overlay. The dark wiki page initially failed on the UA-styled button noted above; fixed and re-scanned clean on the dev server and the production preview.
- Browser interaction checks: system dark preference applies on first paint without being persisted; toggling persists, survives reload, and recolors the graph canvas in place; the slide topbar toggle works with the wallpaper mounted inside the overlay; reduced motion removes the wallpaper animation; on 390px the toggle keeps a 40px hit area and the page has no horizontal overflow.
- Screenshots for both themes at both widths are in `/tmp/sovereign-qa2`.

## Follow-up pass: duplicate titles and filler copy

Requested after the theme pass (the topbar read "Sovereign AI Club" twice, then the domain); recorded as alignment decision 10 in `ledger.md`. Rule applied on every screen: say each thing once, in the place that reads best.

| Screen | Removed | Kept |
| --- | --- | --- |
| Topbar | "Sovereign AI Club" eyebrow and "austinai.club" heading beside the wordmark | Wordmark as the home link; `h1` is screen-reader-only |
| Footer | Second wordmark label, "Meetup topics, demos, and notes…" copy, and nav links the sticky topbar already has | Wordmark and GitHub |
| Home hero | Club name in the eyebrow | "Austin, TX" |
| Meetup cards | "Past meetup" eyebrows under the "Past meetups" divider, the "open meetup" pill on an already-clickable card, "0 topics · 1 tracks" on an empty board, the "Wed, Sep 9" chip under a "September 9, 2026" heading, and "PM CDT" printed twice | "Upcoming meetup" eyebrow, "26 topics · 6 tracks", "Wednesday · 5:30 – 7:30 PM CDT", venue |
| Meetup detail | "Meetup archive" eyebrow, the duplicate date chip, the single-item Track jump nav on the September 9 board, and the "Open slot at the end" label beside a blurb that says the same thing | Back link, Presentation Mode, counts, event bar, submission links |
| Calendar | "Calendar" eyebrow and "Confirmed dates…" blurb above "Sovereign AI Club every two weeks", "Month view" above the month name, and the "Sovereign AI Club" title on every event card | Event cards are headed by their long date ("Wednesday, September 9") |
| Reminders | "Meetup reminders" eyebrow, the second "One email on meetup days" sentence, and the "Success" kicker | Heading, cadence line, next-up line, unsubscribe note |
| Submission forms | Eyebrows ("Submit a link", "Showcase") and "Share a link for the next meetup." | "Submit a link"; "Propose a showcase" keeps its 3–5 minute note |
| Wiki Explorer | "LLM Wiki" eyebrow above a heading that named the club again, the Index header ("157 pages · All types") that duplicated the "All 157" tab, the graph panel title that duplicated the detail heading, and the per-item type label under a heading of the same type | "LLM Wiki" heading with a one-line blurb, tabs, legend + Surprise |
| Wiki detail | Type eyebrow (the first tag already says it), the "Read Wiki Page" label, the "29 sources · 11 wiki links · 12 backlinks" chips, the opening paragraph rendered twice (summary and body), the "Sovereign AI Club" / "April 1, 2026" body headings that restate the title, sidebar "Mentioned In" and "Related Wiki Pages" lists when the body has those sections, "Not mentioned in a meetup yet." on Meetup pages, single-choice source filters, and separate outgoing and backlink lists on bodiless pages that were nearly identical | Summary once (now with live wikilinks), tags, body, Sources with useful filters, Backlinks on authored pages, one merged "Connected Pages" list on Meetup boards |
| Presentation Mode | "Topic 3 of 7" in the breadcrumb (the bottom bar says it), the bottom-bar breadcrumb that repeated the topbar on mobile, and the "Track 1 of 6" kicker on Track slides (the bottom bar says it) | Topbar breadcrumb, bottom label + progress + counter |

Implementation notes: `formatEventTime` now uses `Intl.DateTimeFormat.formatRange` so a shared day period and zone print once; `formatEventWeekday` and `formatEventLongDate` were added. `formatMeetupCounts` pluralizes and returns nothing for an empty board. `WikiMarkdownBody` exports `getWikiLeadParagraph`, `hasWikiHeading`, and `WikiInlineMarkdown` so `WikiDetail` can show the opening paragraph once and skip sidebar sections the body covers. Orphaned CSS for the removed elements was deleted.

Checks for this pass:

- `npm test`: 209 tests passed across 29 files (new: time range collapsing, weekday and long date formatting, count pluralization, wordmark-only chrome, lead paragraph dedupe, title-heading stripping, merged connected pages, single-choice filter omission).
- `npm run build` passed.
- Axe WCAG 2 A/AA and 2.1 AA: no violations in either theme at 1440px and 390px on home, both Meetup pages, calendar, Cursor and April 1 wiki pages, both submission forms, and the active slide overlay.
- Screenshots of every route in both themes plus 390px are in `/tmp/sovereign-qa3`.

## Follow-up pass: Presentation Mode contrast

Requested after the copy pass; the light-mode slide field was the page backdrop (sage pooling into white) with wallpaper behind the type. Recorded as alignment decision 11 in `ledger.md`.

| Before | After |
| --- | --- |
| Overlay used `--page-backdrop`, so titles and body sat on a sage-to-white fade. Measured field beside the title was `#ECF3EC`. | Overlay uses `--pres-backdrop`: even sage (`#A4C2AE` corners, `#BBD0C9` mid-field) that does not fade to white. |
| Overlay wallpaper was `z-index: -1` (hidden behind the opaque backdrop) or, when visible, white 55% tiles cutting through type. | Overlay mounts its own wallpaper at `z-index: 0`, colored `--pres-wallpaper` (white 42% on sage in light; 10% in dark), so the letters stay in the margins. |
| `--text-sub` body copy on sage failed a comfortable reading contrast, especially gold and blue Track titles. | Slide copy sits on a paper plate (`--pres-veil`) with the hard offset shadow. Body uses `--text`. Track wash (`--t-accent` at 22%) tints the field around the plate. |
| Chrome bars were translucent over the wash. | Topbar, bottom bar, and mobile controls are solid `--panel-strong`. Breadcrumb and slide label use `--text`. |

Checks for this pass:

- `npm test`: 209 tests passed across 29 files.
- Axe WCAG 2 A/AA and 2.1 AA: no violations on welcome, track-title, topic, and Models slides in both themes at 1440px and 390px.
- Screenshots in `/tmp/sovereign-pres`.

## Follow-up pass: dark theme only

Requested after the slide-contrast pass; recorded as alignment decision 12 in `ledger.md`.

| Before | After |
| --- | --- |
| Light was the default; `[data-theme="dark"]` overrode tokens; a toggle in every header persisted a choice in `localStorage`. | Dark tokens live on `:root`. There is no light palette, no `data-theme` switch, and no toggle. |
| `index.html` ran a pre-paint script that followed storage or `prefers-color-scheme`. | `color-scheme` and `theme-color` are dark. No bootstrap script. |
| Wiki graph listened for `sovereign-theme-change` and cached tokens per theme. | Graph reads the single token sheet. X embeds are pinned to their dark theme. |

Checks for this pass:

- `npm test`: 203 tests passed across 27 files (theme resolution, storage, and toggle tests removed; ArchiveShell asserts no toggle).
- Axe WCAG 2 A/AA and 2.1 AA: no violations on home, meetup, calendar, wiki, submit, and slides at 1440px and 390px.
- Browser: system light preference and a leftover `localStorage` light key do not flip the palette; `.theme-toggle` is absent on every route. Screenshots in `/tmp/sovereign-dark`.

## Final end-to-end polish

Requested on September 7 after the dark-only decision. The review used Matt Pocock's codebase-design principles and the code-review skill's independent Standards and Spec reviews. The fixed point was `2a3d026`; the reviewed delivery was the current working tree, including untracked source files. The user's later decisions in the ledger supersede the original light-theme requirements. Existing uncommitted work was preserved.

### Visuals, navigation, and interaction

| Before | After |
| --- | --- |
| Wiki tags retained a higher-specificity `grid-column: 2` rule on narrow screens, creating an implicit column and pushing article content outside a 320px viewport. | Tags, authored Markdown, Sources, and Backlinks share one full-width column below 1080px. Mobile source cards stack their metadata below the title. |
| Calendar actions, reminder inputs/actions, submission buttons, slide controls, and graph controls retained selected pill radii. | Those actions use the small panel radius; semantic badges and graph dots retain their rounded shapes. Invalid negative Wiki radii now use `--radius-inner`. The graph toolbar no longer carries an unnecessary backdrop blur. |
| Several controls suppressed the global focus outline in favor of faint green shadows. | Navigation, Track links, Topics, calendar actions, forms, graph controls, and Presentation Mode use clear keyboard focus outlines. Wiki header links have at least a 40px hit area; desktop navigation has a 40px minimum width. |
| Small form text could cause mobile input zoom, and text selection used browser defaults. | Mobile inputs/selects use 16px text; selection uses the site palette. Submission headings have explicit spacing. |
| Shared navigation had no landmark or skip link, and the active Wiki link was not identified. | A labelled navigation landmark, Skip to content link, and active Wiki state are present. Standalone calendar and submission pages have level-one headings; submission content has a main landmark. |
| Opening a historical Meetup from the bottom of the archive preserved a scroll position of 2,253px. | Explicit navigation between pages starts at the top and focuses the main content. Wiki selection/filter changes and slide return anchors retain their existing behavior. |
| Presentation Mode left keyboard focus behind the overlay, and Space on the Exit button advanced the slide. | Both fullscreen surfaces share `useModalFocus`: background content is inert, Tab stays inside, Escape closes the surface, scroll state is restored, and focus returns to the opener. Space activates focused controls normally; the slide counter announces changes. |
| Escape from the fullscreen graph also navigated away from the Wiki; Escape while filtering could do both operations. | Escape closes the graph or clears active filters before the app-level route shortcut can run. |
| Switching between Link and Showcase forms carried title, status, and textarea state across kinds. Editing while submitting re-enabled Send. | Each form has its own React key; fields and Submit remain disabled while a request is pending, with an explicit busy state. |
| Welcome slides repeated the club name in the eyebrow and title. | An eyebrow identical to the title is omitted. |
| A blocked X embed's raw URL widened a phone slide; long URLs also forced a single-column link grid past its available width. | Embed fallback links wrap, link cards can shrink, and mobile link grids use `minmax(0, 1fr)` with wrapping titles. |
| CSS reduced-motion settings did not affect canvas camera transitions or particles. | The graph responds to reduced-motion preference changes, uses immediate camera positioning, and disables directional particles. |

### Code quality and loading behavior

| Before | After |
| --- | --- |
| The force graph shipped in the initial JavaScript bundle, approximately 679kB before gzip. | `WikiGraphView` loads the graph separately: initial JavaScript is 495.14kB (154.78kB gzip), and the graph chunk is 186.72kB (61.74kB gzip). The Vite size warning is gone. |
| A failed manifest request left the Wiki on “Loading” indefinitely. | The Wiki shows a connection/retry state. Superseded fetches are aborted and cannot update state. |
| A failed lazy graph download would reject the route's render. | A graph-scoped error boundary preserves the Wiki reader and offers Reload Wiki; reloading clears React.lazy's cached rejection. |
| Graph color callbacks allocated a five-type palette per node, and unused code/comments still described theme switching. | The graph resolves the palette once at mount, unused repaint code is removed, and comments describe the single theme. |
| Topic and Showcase slide markup duplicated title, description, notes, and media rendering. Track declarations repeated the same derived color tokens six times. | Both topic-like slides use one rendering path; derived Track tokens share a `[data-track]` rule. The unused App calendar import and duplicate submission-form rule are removed. |
| Opening authored headings were removed if their text was any substring of a page title. | Only exact titles or the two explicit Meetup title segments are suppressed. A regression test proves an authored `# AI` heading survives on an `OpenAI Presence` page. |
| The video frame background was a literal `#000` outside the token sheet. | It uses `--media-backdrop`. |

### Review disposition

**Standards:** Both original findings were addressed: overly broad heading removal and repeated graph-palette allocation. The final independent review found no blocking correctness or maintainability issues in the polish delta.

**Spec:** Duplicate welcome copy and the video color literal were fixed. DOM-free graph utilities intentionally retain their fallback palette; the live canvas reads the CSS token sheet. The final review caught the lazy graph failure case, which was fixed and confirmed resolved after a simulated 503 and successful reload.

### Verification

- `npm test`: 204 tests across 27 files passed, including the new heading-preservation regression (observed failing before the fix).
- `npm run lint:wiki`: 162 Markdown files passed.
- `npm run build`: passed with no chunk-size warning. The manifest still contains 157 pages and 1,829 links.
- `git -c core.whitespace=cr-at-eol diff --check`: passed.
- Chromium route/contrast checks passed at 320, 390, 768, and 1440px on home, upcoming Meetup, historical Meetup, calendar, Cursor Wiki page, historical Meetup Wiki page, both submission forms, and Presentation Mode. No WCAG 2 A/AA or 2.1 AA axe violations, page overflow, or uncaught application errors were observed in the normal route/interaction suite. System light preference and a stored light-theme key still render the single dark palette.
- The same 36 route checks and four viewport-specific interaction runs also passed against the production preview at `http://127.0.0.1:4180`.
- Browser interactions covered fullscreen focus entry, forward/reverse Tab, focus restoration, Escape, Space on Exit, arrow navigation, page-scroll reset, Wiki search clearing, form switching, error/retry/success, and manifest failure/retry.
- All 34 slides of the March 18 Meetup were stepped through at 390 and 1440px, checking horizontal fit and that the top of each slide remained accessible. Screenshots include welcome, Track, Topic, and later slides.
- A separate test rejected the graph module request with 503, confirmed the Cursor reader remained present, and restored the graph through Reload Wiki. Another held a submission request pending, checked disabled fields/Submit, then confirmed successful reset.
- Screenshots, executable browser probes, and route results are in `/tmp/sovereign-polish`. `verify.cjs`, `slides.cjs`, and `failures.cjs` contain the assertions; no browser dependencies were added to the repository. Submission API responses were intercepted: these checks created no real issues, subscriptions, or emails.

## Remaining delivery boundaries

The work is uncommitted. Production deployment and Apps Script redeployment were outside this verification pass. Designer originals remain parked under #55. The final build has no JavaScript chunk-size warning; the graph is loaded separately.
