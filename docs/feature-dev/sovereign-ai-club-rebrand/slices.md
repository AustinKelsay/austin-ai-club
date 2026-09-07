# Sovereign AI Club Rebrand Slices

Tracer-bullet tickets for the [PRD](./prd.md). Blockers first; the frontier is any slice whose blockers are done.

## Slice 1: Theme Tokens Prefactor

- Type: AFK
- Blocked by: None
- User stories covered: 22

### What to build

Move every hardcoded accent, background, glow, shadow, radius, and per-Track color in the stylesheets and the wiki graph visuals onto root design tokens. No visible change. This is the "make the change easy" step so the theme swap is a token-only edit.

### Acceptance criteria

- [ ] No stylesheet contains a literal accent or background color outside the token declarations.
- [ ] Wiki graph node, link, and background colors read from tokens.
- [ ] Before/after screenshots of every route show no visible difference.
- [ ] `npm test` and `npm run build` pass.

## Slice 2: Sovereign Identity in the App

- Type: AFK
- Blocked by: None
- User stories covered: 1, 4, 5, 7, 8, 23

### What to build

Every place the app names the club says Sovereign AI Club: a `SovereignWordmark` component (ASCII "SOVEREIGN" plus the "AI / CLUB" lockup, accessible name "Sovereign AI Club") in the header and footer, the page title and meta description, calendar and wiki headings, the generated Meetup Slot summary, the ICS product identifier, a new favicon and brand mark, and a social preview image cropped from the Brand Poster. The ASCII text is a generated approximation of the poster's wordmark.

### Acceptance criteria

- [ ] Static render of the archive shell exposes the accessible name "Sovereign AI Club" and contains no "Austin AI Club".
- [ ] Page title, meta description, and social preview name Sovereign AI Club.
- [ ] Calendar builders emit a Sovereign AI Club product identifier.
- [ ] Favicon and brand mark no longer use the `$` glyph.
- [ ] `npm test` and `npm run build` pass.

## Slice 3: Sage Light Theme and Archive Shell

- Type: AFK
- Blocked by: Slices 1 and 2
- User stories covered: 2, 12, 13, 14, 22

### What to build

Flip the tokens to the Brand Poster palette: sage-to-white gradient, white panels, charcoal text, wireframe-green accent, hard offset shadows, square-ish corners, ASCII wallpaper texture, single mono family, light color scheme. Re-derive the six Track colors from the starburst. Style the wordmark box and topbar. Land the homepage index and Meetup detail pages in the new theme.

### Acceptance criteria

- [ ] Home and Meetup detail render in the light theme with the styled wordmark.
- [ ] Track colors are distinguishable on the light background across all six Tracks.
- [ ] Text-on-surface token pairs pass a contrast check; no horizontal overflow at 390px.
- [ ] Reduced-motion preference disables non-essential transitions.
- [ ] `npm test` and `npm run build` pass.

## Slice 4: Presentation Mode Light Pass

- Type: AFK
- Blocked by: Slice 3
- User stories covered: 11, 12

### What to build

Presentation Mode slides, chrome, link cards, Release Roundup feeds, and embeds adopt the light theme. X embeds use their light theme.

### Acceptance criteria

- [ ] A full-board slide, a Topic slide with an X embed, a Release Roundup slide, and a Showcase slide all render in the light theme.
- [ ] Slide navigation, deep links, and exit behavior are unchanged.
- [ ] `npm test` and `npm run build` pass.

## Slice 5: Calendar, Submission, and Reminder Light Pass

- Type: AFK
- Blocked by: Slice 3
- User stories covered: 5, 13

### What to build

Calendar grid and timeline, the reminder signup, and both submission screens adopt the light theme.

### Acceptance criteria

- [ ] `/calendar`, `/submit-link`, and `/submit-showcase` render in the light theme on desktop and at 390px.
- [ ] Form states (idle, submitting, success, error) remain legible.
- [ ] `npm test` and `npm run build` pass.

## Slice 6: Wiki Explorer and Graph Light Pass

- Type: AFK
- Blocked by: Slice 3
- User stories covered: 17

### What to build

Wiki Explorer, Topic Results, wiki page bodies, and the force graph (canvas background, nodes, links, legend) adopt the light theme.

### Acceptance criteria

- [ ] `/wiki` and a wiki page render in the light theme with a legible graph and legend.
- [ ] Graph filters and focus behavior are unchanged.
- [ ] `npm test` and `npm run build` pass.

## Slice 7: Next Meetup Event Metadata and Template

- Type: AFK
- Blocked by: None
- User stories covered: 6, 7, 8, 9

### What to build

Scaffold the 2026-09-09 Meetup from the template with title Sovereign AI Club, AI Freedom Lab, Austin, TX, 5:30 to 7:30 PM Central; register it in the archive index and Meetup Data. Update the template and generated Meetup Slot copy with the new venue and time. Change the Apps Script reminder copy to Sovereign AI Club. Regenerate calendar artifacts and the meetups feed. Past Meetups keep their venue and time.

### Acceptance criteria

- [ ] The calendar shows 2026-09-09 at AI Freedom Lab, 5:30 PM, and later Meetup Slots inherit that venue and time.
- [ ] Past Meetups still show Bitcoin Park Austin and 6:00 PM.
- [ ] Regenerated ICS and feed entries for 2026-09-09 carry the new title, venue, and time.
- [ ] Reminder backend source says Sovereign AI Club; deployment is recorded as a production handoff.
- [ ] `npm test` and `npm run build` pass.

## Slice 8: Meetup Data, Docs, and Test Fixture Rename

- Type: AFK
- Blocked by: None
- User stories covered: 10, 23, 25

### What to build

Rename the club in Meetup Data (including past event titles), README, ADRs 0001 and 0002, agent docs, the prior PRD, and every test fixture. Regenerate calendar artifacts and the meetups feed so past entries carry the new title with their historical venue.

### Acceptance criteria

- [ ] No tracked file outside the LLM Wiki contains "Austin AI Club" except ADR 0003 and the glossary's former-name notes.
- [ ] Past Meetup pages render Sovereign AI Club with their original venue and time.
- [ ] `npm test`, `npm run lint:wiki`, and `npm run build` pass.

## Slice 9: LLM Wiki Rename Sweep and Retired-Name Lint

- Type: AFK
- Blocked by: None
- User stories covered: 15, 16, 18, 23

### What to build

Lockstep wide refactor: rename every Meetup page title and every `[[Austin AI Club - …]]` wikilink, update the wiki lint's title-prefix rule and the Release Roundup sync script's title regex, add a lint rule that fails on the retired name anywhere in the LLM Wiki, and regenerate the manifest. Wiki page IDs and routes stay stable.

### Acceptance criteria

- [ ] `npm run lint:wiki` passes on the renamed wiki and fails when "Austin AI Club" is added to any wiki page.
- [ ] Manifest resolves `[[Sovereign AI Club - …]]` wikilinks and page IDs are unchanged.
- [ ] Existing `/wiki/:id` and `/meetups/:slug` URLs still resolve.
- [ ] `npm test`, `npm run lint:wiki`, and `npm run build` pass.

## Slice 10: Poster Hero Imagery

- Type: AFK
- Blocked by: Slice 3
- User stories covered: 3, 24

### What to build

The homepage shows the Brand Poster's hand-and-starburst imagery as a hero, cropped from the poster JPG and composed so it sits on the sage background. The Brand Poster is committed to the repo as the design reference.

### Acceptance criteria

- [ ] Homepage renders the hero on desktop and 390px without layout shift or overflow.
- [ ] Hero image has descriptive alt text and does not block first paint.
- [ ] `npm run build` passes.

## Slice 11: Curation Skill Rename and Polish

- Type: AFK
- Blocked by: None
- User stories covered: 19, 20, 21

### What to build

Rename the local Codex skill to `curate-sovereign-ai-meetup`, keep it model-invoked with a description tightened to one trigger per branch, fix the stale repo pointer, replace restated Track definitions, frontmatter schema, and Meetup Data fields with pointers to `CONTEXT.md`, `SCHEMA.md`, and the README, rewrite negations as positive targets, sharpen fuzzy completion criteria, drop no-op hygiene while keeping generated-artifact gotchas, name the Sovereignty Lens as a Discussion Fit input, and update the Codex interface metadata.

### Acceptance criteria

- [ ] Skill folder, frontmatter name, description, and interface metadata all say Sovereign AI Club.
- [ ] The skill contains no Track definitions, frontmatter schema, or Meetup Data field list of its own; each is a pointer.
- [ ] Every step ends on a checkable completion criterion.
- [ ] Skill validates with the local skill validator.

## Slice 12: Designer Source Assets

- Type: HITL (parked, non-blocking)
- Blocked by: None
- User stories covered: 2, 3

### What to build

Obtain the designer's original ASCII wordmark text and a layered or isolated version of the hand-and-starburst art. When supplied, they replace the approximations from Slices 2 and 10 in a follow-up.

### Acceptance criteria

- [ ] Original ASCII text and isolated art are in the repo, or the human has confirmed the approximations ship as final.
