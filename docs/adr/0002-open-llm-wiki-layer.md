# Open LLM Wiki layer over Markdown Archive

Sovereign AI Club will extend `public/topics/` into an open LLM Wiki while keeping dated Meetup notes in place as the Markdown Archive. The wiki adds `SCHEMA.md`, `index.md`, `log.md`, source link records, and interlinked entity/concept pages so humans and agents can preserve recurring context across Meetups.

The Meetup rendering path does not change in v1. `src/data.js` remains the explicit Meetup Data contract used by the homepage, Meetup detail pages, calendar/reminder artifacts, and Presentation Mode.

The website may also publish a **Wiki Explorer** over the LLM Wiki. That explorer uses a generated manifest from Markdown frontmatter, excerpts, tags, sources, and `[[wikilinks]]` as its frontend read model. This manifest is for discovery and navigation only: the Markdown files remain the source content, and the explorer does not render full Markdown pages in v1.

## 2026-07-21 update: authored wiki reading

The v1 reading restriction is superseded for authored entity and concept pages. The generated manifest may include their body Markdown so the Wiki Explorer can render headings, paragraphs, lists, links, and resolved wikilinks directly. Source-record and Meetup bodies remain excluded: source records stay link metadata rather than copied third-party material, and Meetup Data remains the rendering contract for Meetup archive pages and Presentation Mode.

External source material in the public repo should be stored as link records, not full article captures. When Markdown and Meetup Data disagree, treat the Markdown Archive as the durable record and update Meetup Data to render the intended board.
