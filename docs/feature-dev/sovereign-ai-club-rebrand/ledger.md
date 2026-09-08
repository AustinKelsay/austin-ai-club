# Sovereign AI Club Rebrand Feature Dev Ledger

## Run

- Run ID: sovereign-ai-club-rebrand-2026-09-07
- Loop: Feature Dev
- Target repo: AustinKelsay/austin-ai-club
- Base branch: origin/main (repo has no `staging` branch; same deviation as the wiki-topic-explorer run)
- Feature branch: feature/sovereign-ai-club-rebrand
- Human owner: AustinKelsay
- Started: 2026-09-07
- Current status: Implementation and September 9 curation reviewed and verified; release authorized on September 8. HITL #55 remains parked. Website ships through GitHub/Vercel; Apps Script redeployment still requires authenticated access. See `verification.md` and `../../meetup-prep/2026-09-09-release.md`.
- Skill setup status: Existing `AGENTS.md`, issue tracker docs, triage label docs, and domain docs found. GitHub labels `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix` already exist.

## Goal

Rename, rebrand, reframe, and restyle the Austin AI Club meetup site as Sovereign AI Club, using the Brand Poster as the de facto design guide, and polish the meetup curation skill with the writing-for-agents discipline.

## Alignment Decisions

Resolved with the human on 2026-09-07:

1. Domain stays `austinai.club` for now; a new domain is added later.
2. Rename everywhere, including past Meetup pages, wikilinks, Meetup Data, calendar artifacts, tests, and docs.
3. Presentation Mode matches the light poster theme; no dark projector mode.
4. Cadence stays biweekly; the next Meetup is Wednesday 2026-09-09. New venue AI Freedom Lab, Austin, TX; 5:30 PM start (assumed 2-hour duration, so 7:30 PM end). Past Meetups keep their historical Event Metadata.
5. Skill rename and invocation choice delegated to the agent: `curate-sovereign-ai-meetup`, model-invoked.
6. "Sovereign" is both the club name and a new **Sovereignty Lens**, the club's primary editorial lens; Open Source and Privacy Lenses are facets of it.
7. Plan lives at `docs/feature-dev/sovereign-ai-club-rebrand/` and is published to GitHub Issues.

Revised with the human on 2026-09-07 after the verification pass:

8. A dark theme ships after all, as an opt-in toggle. Light remains the default and the Brand Poster reference; the first visit follows `prefers-color-scheme`, and a toggle in every screen header (including Presentation Mode, so hosts get a dark projector option) stores the choice in `localStorage`. The PRD's "no dark mode" exclusion and decision 3 above are superseded by this entry; ADR 0003 still describes the default light theme accurately.
9. The page backdrop follows the poster more closely: a viewport-fixed sage vignette (deep in the top-left and along the right edge, white below) with the ASCII wordmark tiled as a slowly drifting wallpaper, on every route including calendar, submission, and slides.
10. Each fact appears once per screen. The wordmark is the only visible club name in the chrome (the `h1` is screen-reader-only; the domain is not shown), eyebrows that restate the heading beneath them are gone, a date already in a heading is not repeated in a chip, and structured wiki sidebars do not repeat sections the authored body already carries. The footer is the wordmark and a GitHub link; the sticky topbar already holds the navigation.
11. Presentation Mode does not share the page's sage-to-white fade. Slides use an even sage field, a quieter white wordmark in the margins, and a paper plate behind the copy so titles and body never sit on the decorative backdrop. Dark projector mode keeps the same stack with lifted panels.
12. Dark is the only theme. There is no light-mode option, no theme toggle, and no `prefers-color-scheme` or `localStorage` switch. Decisions 3 and 8 above, and the PRD's original light-only / later toggle language, are superseded; ADR 0003 now records the single dark theme. The Brand Poster still supplies sage, green, the wordmark, hard shadows, and wallpaper.

13. Final visual and code-quality polish is delegated to the agent, using the Matt Pocock codebase-design and two-axis review workflow. Preserve the single dark palette and poster identity; fix responsive layouts, keyboard navigation, failure states, and concrete maintainability issues. See the final end-to-end pass in `verification.md`.

## Durable Artifacts

- CONTEXT updates: Renamed the club throughout; added **Sovereign AI Club** (Avoid: Austin AI Club), **Brand Poster**, **Sovereignty Lens**; added Event Metadata history rule; added example dialogue and flagged ambiguities for the rename, the lens, and the venue change.
- ADRs: `docs/adr/0003-sovereign-ai-club-rebrand.md`
- Brand Poster: `docs/brand/sovereign-ai-club-poster.jpg`
- Prototype source branch, if any: None
- Spec issue: https://github.com/AustinKelsay/austin-ai-club/issues/43 (source: `./prd.md`)
- Tickets (source: `./slices.md`), published as sub-issues of #43 with native blocked-by links:
  - #44 Theme tokens prefactor
  - #45 Sovereign identity in the app
  - #46 Next Meetup event metadata and template
  - #47 Meetup Data, docs, and test fixture rename
  - #48 LLM Wiki rename sweep and retired-name lint
  - #49 Curation skill rename and polish
  - #50 Sage light theme and archive shell (blocked by #44, #45)
  - #51 Presentation Mode light pass (blocked by #50)
  - #52 Calendar, submission, and reminder light pass (blocked by #50)
  - #53 Wiki Explorer and graph light pass (blocked by #50)
  - #54 Poster hero imagery (blocked by #50)
  - #55 Designer source assets (HITL, parked)
- Ticket sessions: Implemented in this run
- Agent briefs: Ticket bodies carry what-to-build, acceptance criteria, and blocking edges
- Review packets: This ledger
- Local CodeRabbit report: Pending
- PR URL: Pending

## Commands

- Install: `npm install` if dependencies are missing.
- Typecheck: Not configured.
- Test: `npm test`
- Build: `npm run build`
- Wiki lint: `npm run lint:wiki`
- Visual verification: `npm run preview -- --host 127.0.0.1 --port 4173`, then browser smoke of `/`, `/meetups/2026-03-18`, a `#/slides/` deep link, `/calendar`, `/submit-link`, `/submit-showcase`, `/wiki`, `/wiki/cursor` on desktop and 390px.

## Testing Seams

1. Rendered markup: static-render archive shell and views; assert accessible wordmark name and absence of the retired name.
2. Calendar builders: ICS product identifier, event titles, 2026-09-09 venue and time, slot inheritance, historical venues preserved.
3. Wiki lint: retired-name rule and new title-prefix rule.
4. Wiki manifest: renamed wikilinks resolve, page IDs unchanged.
5. Visual: agent-performable browser smoke, contrast check, reduced-motion check, before/after screenshots for the tokens prefactor.

No new seams; all four unit seams exist today.

## Ticket Ledger

| Issue | Type | Status | Review thread | Fixes needed | Verified |
| --- | --- | --- | --- | --- | --- |
| #44 Theme Tokens Prefactor | AFK | Done | | | Tests + build |
| #45 Sovereign Identity in the App | AFK | Done | | | ArchiveShell + ICS tests |
| #50 Sage Light Theme and Archive Shell | AFK | Done | | | Tests + build |
| #51 Presentation Mode Light Pass | AFK | Done | | | Tokens + light X embeds |
| #52 Calendar, Submission, Reminder Light Pass | AFK | Done | | | Shared token sheet |
| #53 Wiki Explorer and Graph Light Pass | AFK | Done | | | Graph tokens + tests |
| #46 Next Meetup Event Metadata and Template | AFK | Done | | | Calendar + ICS |
| #47 Meetup Data, Docs, Test Fixture Rename | AFK | Done | | | Data/docs rename |
| #48 LLM Wiki Rename Sweep and Retired-Name Lint | AFK | Done | | | `lint:wiki` 162 files |
| #54 Poster Hero Imagery | AFK | Done | | | ArchiveView hero test |
| #49 Curation Skill Rename and Polish | AFK (out-of-repo) | Done | | | Skill validator |
| #55 Designer Source Assets | HITL | Parked | | | |

## Parked HITL Slices

| Issue | Why parked | Blocks | Required human action | Final PR decision |
| --- | --- | --- | --- | --- |
| #55 Designer Source Assets | Only the designer has the original ASCII text and layered art | Nothing; #45 and #54 ship approximations | Supply originals or confirm approximations are final | Scope out of this PR if not supplied |

## Issue Session Ledger

| Issue | Fixed point | Worker session | Commit | Review result | Checks |
| --- | --- | --- | --- | --- | --- |
| #44–#54, #49 | `feature/sovereign-ai-club-rebrand` | this session | included in release | pending | `npm test` 187 pass; `lint:wiki` pass; `npm run build` pass |
| Backdrop polish + dark theme (decisions 8–9, no ticket) | `feature/sovereign-ai-club-rebrand` | follow-up session | included in release | pending | `npm test` 199 pass; `lint:wiki` pass; `npm run build` pass; see `./verification.md` |
| Copy trim: duplicate titles and filler (decision 10, no ticket) | `feature/sovereign-ai-club-rebrand` | follow-up session | included in release | pending | `npm test` 209 pass; `npm run build` pass; axe clean both themes; see `./verification.md` |

## Production Handoffs

- Apps Script reminder backend: source copy now says Sovereign AI Club; redeploying `apps-script/Code.gs` requires authenticated Apps Script access, unavailable in the release session. Website deployment does not deploy this backend.
- Domain and repo rename: explicitly out of scope; tracked in ADR 0003.
- Wiki page IDs stay `austin-ai-club-*` so `/wiki/:id` URLs do not change. Titles and wikilinks say Sovereign AI Club.

## Open Questions

- None. Testing seams and ticket breakdown were approved by the human on 2026-09-07 before publication.

## Escalations

- None.
