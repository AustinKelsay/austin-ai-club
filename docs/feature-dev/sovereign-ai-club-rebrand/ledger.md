# Sovereign AI Club Rebrand Feature Dev Ledger

## Run

- Run ID: sovereign-ai-club-rebrand-2026-09-07
- Loop: Feature Dev
- Target repo: AustinKelsay/austin-ai-club
- Base branch: origin/main (repo has no `staging` branch; same deviation as the wiki-topic-explorer run)
- Feature branch: feature/sovereign-ai-club-rebrand
- Human owner: AustinKelsay
- Started: 2026-09-07
- Current status: Alignment complete; spec and tickets drafted, awaiting seam and breakdown confirmation before publication
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
- Spec issue: Pending publication (draft at `./prd.md`)
- Tickets: Pending publication (draft at `./slices.md`)
- Ticket sessions: Pending
- Agent briefs: Pending issue links
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
| Slice 1 Theme Tokens Prefactor | AFK | Drafted | | | |
| Slice 2 Sovereign Identity in the App | AFK | Drafted | | | |
| Slice 3 Sage Light Theme and Archive Shell | AFK | Drafted | | | |
| Slice 4 Presentation Mode Light Pass | AFK | Drafted | | | |
| Slice 5 Calendar, Submission, Reminder Light Pass | AFK | Drafted | | | |
| Slice 6 Wiki Explorer and Graph Light Pass | AFK | Drafted | | | |
| Slice 7 Next Meetup Event Metadata and Template | AFK | Drafted | | | |
| Slice 8 Meetup Data, Docs, Test Fixture Rename | AFK | Drafted | | | |
| Slice 9 LLM Wiki Rename Sweep and Retired-Name Lint | AFK | Drafted | | | |
| Slice 10 Poster Hero Imagery | AFK | Drafted | | | |
| Slice 11 Curation Skill Rename and Polish | AFK (out-of-repo) | Drafted | | | |
| Slice 12 Designer Source Assets | HITL | Parked | | | |

## Parked HITL Slices

| Issue | Why parked | Blocks | Required human action | Final PR decision |
| --- | --- | --- | --- | --- |
| Slice 12 Designer Source Assets | Only the designer has the original ASCII text and layered art | Nothing; Slices 2 and 10 ship approximations | Supply originals or confirm approximations are final | Scope out of this PR if not supplied |

## Issue Session Ledger

| Issue | Fixed point | Worker session | Commit | Review result | Checks |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Production Handoffs

- Apps Script reminder backend: source copy changes in Slice 7; redeploying the script is a human production step.
- Domain and repo rename: explicitly out of scope; tracked in ADR 0003.

## Open Questions

- Testing seams and ticket breakdown await human confirmation before the spec issue and tickets are published.

## Escalations

- None.
