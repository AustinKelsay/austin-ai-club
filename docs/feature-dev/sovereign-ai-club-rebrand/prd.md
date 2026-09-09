# PRD: Sovereign AI Club Rebrand

## Problem Statement

The club is now Sovereign AI Club, meets at AI Freedom Lab at 5:30 PM, and has a poster that defines its visual identity. The website still says Austin AI Club on every surface, points at the old venue and start time, and looks like a dark neon terminal that shares nothing with the Brand Poster. A Member landing on the site, a calendar invite, a reminder email, a wiki page, or a Presentation Mode slide sees the old club. The LLM Wiki also names the club in every Meetup page title and `[[wikilink]]`, so the old name is baked into the archive's link graph, and the curation skill that agents use to author boards still carries the old name, a stale repo pointer, and duplicated reference that drifts from `CONTEXT.md`.

## Solution

Rename the club to Sovereign AI Club everywhere it is named, including the Markdown Archive and LLM Wiki, and restyle the website to match the Brand Poster: light sage-to-white palette, charcoal monospace type, an ASCII-art wordmark, brutalist panels with hard offset shadows, an ASCII wallpaper texture, and poster imagery on the homepage and social preview. Presentation Mode adopts the same light theme. The next Meetup and the Meetup template carry the new venue and start time while past Meetups keep their historical Event Metadata. The Sovereignty Lens joins the glossary as the club's primary editorial lens. The curation skill is renamed and rewritten so it points at the glossary instead of restating it.

The domain stays `austinai.club` and the repo stays `austin-ai-club` for now; both are separate later steps.

## User Stories

1. As a Member, I want the site header, footer, and page title to say Sovereign AI Club, so that I know I am on the right club's site.
2. As a Member, I want the site to look like the poster I saw, so that the poster and the site read as one brand.
3. As a Member, I want the homepage to show the poster's hand-and-starburst imagery, so that the site carries the same visual hook as the print material.
4. As a Member sharing a link, I want the social preview image and description to show Sovereign AI Club, so that shared links carry the new brand.
5. As a Member, I want the calendar page to name Sovereign AI Club and the biweekly cadence, so that the schedule matches the poster's "twice a month".
6. As a Member, I want the next Meetup and generated Meetup Slots to show AI Freedom Lab and a 5:30 PM start, so that I show up at the right place and time.
7. As a Member adding a Meetup to my calendar, I want the ICS and Google Calendar entries titled Sovereign AI Club with the new venue for upcoming Meetups, so that my calendar matches the site.
8. As a Member subscribed to reminders, I want reminder emails to say Sovereign AI Club, so that the email matches the club I signed up for.
9. As a Member looking at a past Meetup, I want its venue and time to reflect where it actually happened, so that the archive stays truthful.
10. As a Member browsing a past Meetup, I want the page to say Sovereign AI Club, so that the archive reads as one club with one name.
11. As a host running Presentation Mode, I want slides in the light poster theme with legible embeds, so that the room sees the same brand as the site.
12. As a host running Presentation Mode, I want track colors that still distinguish Tracks on a light background, so that slide chrome stays scannable.
13. As a Member reading on a phone, I want the light theme to meet contrast expectations and avoid horizontal overflow, so that the redesign is usable everywhere the old one was.
14. As a Member who prefers reduced motion, I want the redesign to respect that preference, so that texture and transitions do not get in the way.
15. As a wiki reader, I want wiki page titles and `[[wikilinks]]` to name Sovereign AI Club, so that the LLM Wiki reads consistently with the site.
16. As a wiki reader, I want existing wiki URLs and Meetup URLs to keep working after the rename, so that saved links do not break.
17. As a wiki reader, I want the Wiki Explorer and its graph to render in the light theme, so that no surface is left in the old dark style.
18. As a curator, I want the LLM Wiki lint to reject the retired name, so that future boards do not reintroduce Austin AI Club by habit.
19. As a curator, I want the glossary to define the Sovereignty Lens and how it relates to the Open Source and Privacy Lenses, so that Discussion Fit decisions have a shared vocabulary.
20. As a curator using the curation skill, I want the skill named for Sovereign AI Club with a correct repo pointer, so that it fires and orients correctly.
21. As a curator using the curation skill, I want it to point at `CONTEXT.md`, the wiki schema, and the README for Tracks, frontmatter, and Meetup Data fields instead of restating them, so that one edit changes behavior everywhere.
22. As an agent maintaining the site, I want design tokens to be the single source of color, shadow, radius, and type, so that theme changes are one-place edits.
23. As an agent maintaining the site, I want tests and fixtures to use the new name, so that the retired name has no remaining foothold in the codebase.
24. As an agent maintaining the site, I want the Brand Poster checked into the repo, so that visual decisions can be verified against the source of truth.
25. As a maintainer, I want the former name recorded in an ADR, so that the rename's trade-offs stay legible to future readers.

## Implementation Decisions

- The Brand Poster at `docs/brand/sovereign-ai-club-poster.png` is the design reference for every visual decision in this spec.
- Theme tokens are prefactored before any visual change: every hardcoded accent, background, glow, shadow, and per-Track color in the stylesheets and the wiki graph visuals moves onto root design tokens, with no visible change. The theme swap then edits tokens only.
- The light theme uses a sage-to-white gradient background, white panels, charcoal text, and the poster's wireframe green as the accent. Glows, blurred shadows, backdrop blur, and the faint grid texture are removed. Panels use a hard, unblurred offset shadow and small or square corners. The page carries a low-opacity repeating ASCII wallpaper layer derived from the wordmark.
- The site uses a single monospace family for display and body. The display family is the one whose heavy weight best matches the poster's "AI / CLUB" lockup; the current mono is acceptable if no better match is found.
- The wordmark is a `SovereignWordmark` component that renders the ASCII-art "SOVEREIGN" in preformatted text inside a white box with a hard shadow, paired with an "AI / CLUB" lockup, and exposes the accessible name "Sovereign AI Club". The ASCII text is generated to approximate the poster; the designer's original text replaces it when supplied.
- The `$` brand mark and favicon are replaced by a mark derived from the poster (starburst or ASCII "S"). A social preview image is cropped from the poster.
- The homepage hero uses the poster's hand-and-starburst imagery cropped from the poster JPG; a layered source replaces it when supplied.
- Per-Track colors are re-derived from the starburst spokes (red, blue, yellow, green plus two harmonizing hues) so Tracks stay distinguishable on the light background. Community keeps its own hue.
- Presentation Mode follows the light theme. X embeds switch to their light theme. Slide chrome, link cards, and Release Roundup feeds adopt the same tokens.
- All UI copy naming the club changes to Sovereign AI Club: header, footer, calendar heading, wiki heading, generated Meetup Slot summary, page title and meta description, ICS product identifier, and the reminder form's source value stays tied to the domain.
- Event Metadata: a 2026-09-09 Meetup is scaffolded from the template with title Sovereign AI Club, AI Freedom Lab, Austin, TX, 5:30 to 7:30 PM Central. The template and the generated Meetup Slot copy carry the same venue and time. Past Meetups keep their venue and time; only their event title changes to Sovereign AI Club. Calendar artifacts and the meetups feed are regenerated.
- Reminder backend copy in the Apps Script source changes to Sovereign AI Club; deploying the script is a production handoff outside this spec.
- LLM Wiki rename is a lockstep wide refactor: every Meetup page title, every `[[Austin AI Club - …]]` wikilink, the wiki lint's title-prefix rule, the Release Roundup sync script's title regex, and the generated manifest change together so lint and tests stay green in one landing. Wiki page IDs and routes derive from dates and slugs, so URLs do not change.
- The wiki lint gains a retired-name rule that fails when "Austin AI Club" appears in the LLM Wiki.
- Meetup Data, README, ADRs 0001 and 0002, agent docs, and test fixtures adopt the new name. `CONTEXT.md` and ADR 0003 already carry the decision.
- The curation skill is renamed `curate-sovereign-ai-meetup`, stays model-invoked with a description tightened to one trigger per branch, fixes the stale repo pointer, replaces its restated Track definitions, frontmatter schema, and Meetup Data field list with pointers to `CONTEXT.md`, `SCHEMA.md`, and the README, rewrites negations as positive targets, sharpens fuzzy completion criteria, drops no-op hygiene while keeping the generated-artifact gotchas, and names the Sovereignty Lens as a Discussion Fit input. Its Codex interface metadata is updated to match.
- Out-of-repo skill work is tracked by a ticket in this repo's tracker but lives in the local Codex skills store.

## Testing Decisions

- A good test exercises a public interface and asserts user-visible behavior: rendered markup, generated calendar text, lint verdicts. Color values and CSS internals are verified visually, not asserted in unit tests.
- Seam 1, rendered markup: static-render the archive shell and views and assert the accessible wordmark name "Sovereign AI Club" is present and the retired name is absent. Prior art: the Wiki Explorer and meetup section static-markup tests.
- Seam 2, calendar builders: assert the ICS product identifier and event titles say Sovereign AI Club, the scaffolded 2026-09-09 Meetup carries AI Freedom Lab and a 5:30 PM start, generated Meetup Slots inherit that venue and time, and past Meetups keep theirs. Prior art: the calendar and meetup-ui tests.
- Seam 3, wiki lint: assert the retired-name rule fails on "Austin AI Club" and passes on a renamed fixture, and that the Meetup title-prefix rule accepts the new prefix. Prior art: the lint-wiki tests.
- Seam 4, wiki manifest: assert renamed Meetup titles resolve `[[Sovereign AI Club - …]]` wikilinks and that page IDs are unchanged. Prior art: the wiki manifest tests.
- Visual verification is agent-performable: local preview plus browser smoke of every route (home, meetup detail, Presentation Mode slide, calendar, submit-link, submit-showcase, wiki, wiki page) on desktop and a 390px viewport, a contrast check of text-on-surface token pairs, and a reduced-motion check.
- The theme tokens prefactor is verified by before/after screenshots of each route showing no visible change.
- Full checks per ticket: `npm test`, `npm run lint:wiki`, `npm run build`.

## Out of Scope

- New domain, DNS, or changing `austinai.club` anywhere it appears as an identifier or URL.
- Renaming the GitHub repository or the package name.
- Deploying the Apps Script reminder backend or any production change.
- Authoring the 2026-09-09 Topic Board content beyond the scaffold and Event Metadata; that is curation work.
- Editing individual Topic or Showcase copy in past Meetups beyond the club name.
- A dark mode or theme toggle.
- Sourcing the designer's original ASCII text or layered poster art; approximations ship, and a parked human ticket tracks the originals.

## Further Notes

The core acceptance example: open the homepage and see the Sovereign wordmark on a sage background with the poster's imagery; open the calendar and see the 2026-09-09 Meetup at AI Freedom Lab, 5:30 PM; open a March 2026 Meetup and see Sovereign AI Club with its original Bitcoin Park venue; run `npm run lint:wiki` after writing "Austin AI Club" into any wiki page and watch it fail.

Repo branch deviation: this repo has no `staging` branch, so the base and PR target are `main`, as in the previous Feature Dev run.
