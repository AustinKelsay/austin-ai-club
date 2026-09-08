# Sovereign AI Club Meetup Notes

This folder is the durable Markdown Archive and open LLM Wiki for Sovereign AI Club.

The Markdown Archive is the source of record for authored meetup notes. The LLM Wiki adds durable indexes, source link records, and interlinked entity/concept pages around those notes. The frontend still reads curated Meetup Data from `src/data.js`, and that data should mirror or intentionally curate from these standalone Markdown files.

Start with:

- [SCHEMA.md](./SCHEMA.md) - wiki conventions, page types, source policy, and frontmatter rules
- [index.md](./index.md) - wiki catalog
- [log.md](./log.md) - chronological wiki activity log

## Meetups

- [2026-09-09](./2026-09-09.md) - Sovereign AI Club meetup notes
- [2026-08-26](./2026-08-26.md) - Sovereign AI Club meetup notes
- [2026-08-05](./2026-08-05.md) - Sovereign AI Club meetup notes
- [2026-07-22](./2026-07-22.md) - Sovereign AI Club meetup notes
- [2026-07-08](./2026-07-08.md) - Sovereign AI Club meetup notes
- [2026-06-24](./2026-06-24.md) - Sovereign AI Club meetup notes
- [2026-06-10](./2026-06-10.md) - Sovereign AI Club meetup notes
- [2026-05-27](./2026-05-27.md) - Sovereign AI Club meetup notes
- [2026-05-13](./2026-05-13.md) - Sovereign AI Club meetup notes
- [2026-04-15](./2026-04-15.md) - Sovereign AI Club meetup notes
- [2026-04-01](./2026-04-01.md) - Sovereign AI Club meetup notes
- [2026-03-18](./2026-03-18.md) - Sovereign AI Club meetup notes

## Adding a new meetup

1. Copy `TEMPLATE.md` to `YYYY-MM-DD.md`.
2. Add frontmatter using the schema in `SCHEMA.md`.
3. Add the meetup Topic Board: Tracks, Topics, Links, and any Showcases.
4. Add `[[wikilinks]]` only for central or recurring entities and concepts.
5. Add public source link records under `raw/articles/`; do not copy full third-party source text.
6. Omit empty standard Tracks.
7. Update `src/data.js` so the frontend matches or intentionally curates from the Markdown notes.
8. Add public presenter `notes` only if they help Presentation Mode.
9. Keep the Community Slot last, and show an empty slot only for the next upcoming meetup.
10. Update `index.md` and `log.md`.
11. Run `npm run lint:wiki` and `npm run build`.

Do not skip the Markdown step. The Markdown Archive is the source of record, and the LLM Wiki is the durable context layer around it. `src/data.js` remains the frontend rendering contract.

## Standard Tracks

Use the same five Tracks each meetup unless there is a strong reason not to:

1. `Local Builds & Projects`
2. `Agent Infrastructure`
3. `Models & Research`
4. `Security`
5. `Big Tech Moves`

These Tracks are meant to stay stable across meetups so new Topics have an obvious home. Open source and privacy are curation lenses, not Tracks. Security is both a Track and a curation lens.

## Official model-release roundups

In `Models & Research`, lead with two official Release Roundup Topics titled exactly:

1. `Closed model releases`
2. `Open model releases`

Put the biweekly proprietary/gated launches on Closed and the open-weight launches on Open. Keep launch posts, model cards, blogs, and repos on those Topics so Presentation Mode can scroll the full feed. In `src/data.js`, set `releaseRoundup: true` on both items and do not reduce them with `presentationEmbeds` / `presentationLinkPair`. If a cycle has no closed launches, omit the Closed roundup rather than shipping an empty slide.

Non-release research, evals, and papers stay as separate Topics after the two roundups. If a cycle is a firehose, prefer a longer scrollable Open/Closed catalog over splitting launches across thematic release Topics. Thematic follow-ups are for a distinct room question, not a second release dump.
