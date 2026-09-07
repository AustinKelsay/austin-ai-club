# Sovereign AI Club Rebrand Feature Dev Ledger

## Run

- Run ID: sovereign-ai-club-rebrand-2026-09-07
- Loop: Feature Dev
- Target repo: AustinKelsay/austin-ai-club
- Base branch: origin/main (repo has no `staging` branch; same deviation as the wiki-topic-explorer run)
- Feature branch: feature/sovereign-ai-club-rebrand
- Human owner: AustinKelsay
- Started: 2026-09-07
- Current status: Spec and tickets published; ready for implementation sessions on the unblocked frontier
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
- Ticket sessions: Pending
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
| #44 Theme Tokens Prefactor | AFK | Ready | | | |
| #45 Sovereign Identity in the App | AFK | Ready | | | |
| #50 Sage Light Theme and Archive Shell | AFK | Blocked by #44, #45 | | | |
| #51 Presentation Mode Light Pass | AFK | Blocked by #50 | | | |
| #52 Calendar, Submission, Reminder Light Pass | AFK | Blocked by #50 | | | |
| #53 Wiki Explorer and Graph Light Pass | AFK | Blocked by #50 | | | |
| #46 Next Meetup Event Metadata and Template | AFK | Ready | | | |
| #47 Meetup Data, Docs, Test Fixture Rename | AFK | Ready | | | |
| #48 LLM Wiki Rename Sweep and Retired-Name Lint | AFK | Ready | | | |
| #54 Poster Hero Imagery | AFK | Blocked by #50 | | | |
| #49 Curation Skill Rename and Polish | AFK (out-of-repo) | Ready | | | |
| #55 Designer Source Assets | HITL | Parked | | | |

## Parked HITL Slices

| Issue | Why parked | Blocks | Required human action | Final PR decision |
| --- | --- | --- | --- | --- |
| #55 Designer Source Assets | Only the designer has the original ASCII text and layered art | Nothing; #45 and #54 ship approximations | Supply originals or confirm approximations are final | Scope out of this PR if not supplied |

## Issue Session Ledger

| Issue | Fixed point | Worker session | Commit | Review result | Checks |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Production Handoffs

- Apps Script reminder backend: source copy changes in Slice 7; redeploying the script is a human production step.
- Domain and repo rename: explicitly out of scope; tracked in ADR 0003.

## Open Questions

- None. Testing seams and ticket breakdown were approved by the human on 2026-09-07 before publication.

## Escalations

- None.
