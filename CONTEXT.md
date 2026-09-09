# Sovereign AI Club Meetup List

This context describes the language for curating Sovereign AI Club meetups, topic boards, reminders, and the durable public archive.

## Language

**Sovereign AI Club**:
The Austin, TX community gathering this website archives and supports. Formerly Austin AI Club; the name is Sovereign AI Club everywhere, including the Markdown Archive.
_Avoid_: Austin AI Club, the meetup

**Brand Poster**:
The Sovereign AI Club poster at `docs/brand/sovereign-ai-club-poster.jpg`: the de facto design guide for the website's palette, type, texture, imagery, panel style, and event facts.
_Avoid_: Mockup, mood board

**Member**:
A person in or near the Sovereign AI Club community.

**Meetup**:
A dated Sovereign AI Club gathering with a topic board, optional reminder metadata, and an archive page.
_Avoid_: Session

**Meetup Slot**:
A tentative calendar placeholder for a likely Sovereign AI Club gathering.
_Avoid_: Meetup

**Event Metadata**:
The time, location, calendar, and reminder details for a Meetup.

**Topic Board**:
The curated set of Tracks, Topics, Community Slot, and Showcases for a Meetup.

**Track**:
A stable high-level discussion category used to group meetup topics.
_Avoid_: Section, bucket

**Topic**:
A single discussion item on a meetup board, backed by one or more Links.
_Avoid_: Story, item, link

**Topic Title**:
The curator-authored title for a Topic as it appears on a Meetup board.
_Avoid_: Link title, source title

**Showcase Title**:
The curator-authored title for a Showcase as it appears in the Community Slot.
_Avoid_: Topic Title

**Discussion Fit**:
The editorial standard for whether an AI item belongs on the meetup board.
_Avoid_: Interestingness

**Major AI Story**:
An AI story with enough industry or cultural gravity that Sovereign AI Club would naturally discuss it.

**Sovereignty Lens**:
The club's primary editorial lens for favoring topics that increase a builder's or user's control over their own models, data, compute, identity, and payments: local-first, self-hosted, open-weight, permissionless, and exit-capable AI.
_Avoid_: Track, Sovereign Track, freedom tech Track

**Open Source Lens**:
An editorial lens for favoring topics with inspectable code, open weights, reproducible artifacts, or open ecosystem impact.
_Avoid_: Track

**Privacy Lens**:
An editorial lens for favoring topics that affect user data control, local-first workflows, surveillance risk, or privacy-preserving AI systems.
_Avoid_: Track

**Security Lens**:
An editorial lens for evaluating how topics affect attack surfaces, misuse paths, defensive practice, operational risk, or trust boundaries.

**Link**:
A source URL that supports a Topic or is submitted for possible curation into a Topic.
_Avoid_: Topic

**Referenced Topic Source**:
A Link shown from an entity or concept page because it supports a Topic that mentions or belongs to that page.
_Avoid_: Concept source, entity source

**Mentioned In**:
The curated list on an entity or concept page that names the Meetups and specific Topics where that page is relevant.
_Avoid_: Backlinks

**Submission**:
An incoming Link or Showcase contribution that is immediately associated with a target Meetup.
_Avoid_: Suggestion, proposal

**Curation**:
The organizer workflow of choosing, grouping, wording, and placing material on a Meetup board.

**Markdown Archive**:
The durable source of record for authored Meetup notes.
_Avoid_: Data source

**LLM Wiki**:
The public, interlinked Markdown knowledge layer that organizes the Markdown Archive into reusable pages for Meetups, entities, concepts, comparisons, source link records, and durable queries.
_Avoid_: Frontend data source

**Wiki Explorer**:
The public website surface for browsing the LLM Wiki through metadata, authored entity and concept page bodies, wikilinks, backlinks, tags, and graph navigation.
_Avoid_: Meetup renderer

**Meetup Data**:
The structured rendering model for a whole Meetup, curated from the Markdown Archive for the website and Presentation Mode.
_Avoid_: Archive of record

**Presentation Mode**:
A public slide-by-slide surface for presenting Meetup Data during or after a Meetup.

**Reminder**:
A subscriber email sent for an actual planned Meetup.
_Avoid_: Meetup Slot reminder

**Presenter Notes**:
Public host-facing notes that add extra context for presenting a Topic or Showcase.
_Avoid_: Private notes

**Community Slot**:
The end-of-meetup area reserved for short member-led shares.
_Avoid_: Track

**Showcase**:
A short member-led share proposed for the Community Slot.
_Avoid_: Talk, presentation

**Local Builds & Projects**:
The track for Austin/member/community-orbit projects, demos, prototypes, launches, and things people can run or inspect directly.
_Avoid_: SHIPPED

**Agent Infrastructure**:
The track for agent runtimes, protocols, interfaces, orchestration layers, tool-calling systems, and deployment plumbing.

**Models & Research**:
The track for model releases, benchmark shifts, papers, architecture updates, and capability comparisons.

**Closed model releases**:
The official Models & Research Release Roundup Topic for proprietary or gated model launches since the previous Meetup. Presentation Mode shows the full launch-post and source catalog as a scrollable feed.
_Avoid_: Closed model release highlights, proprietary releases split..., mega-slide

**Open model releases**:
The official Models & Research Release Roundup Topic for open-weight or open-source model launches since the previous Meetup. Presentation Mode shows the full launch-post and source catalog as a scrollable feed.
_Avoid_: Open model release highlights, open-weight release week..., mega-slide

**Release Roundup**:
A Meetup Data Topic marked `releaseRoundup: true` so Presentation Mode renders the complete embeds and link catalog as a scrollable Closed/Open model-release feed instead of a reduced presentation subset.
_Avoid_: Mega-slide, super-slide, mecha slide

**Security**:
The track for attacks, abuse patterns, red-team findings, prompt injection, defensive work, and security-relevant failures.

**Big Tech Moves**:
The track for major company moves, hardware launches, ecosystem shifts, acquisitions, platform bets, product strategy, and policy or infrastructure changes that shape AI development.

## Relationships

- A **Meetup** has one **Topic Board**.
- A **Topic Board** has zero or more **Tracks**.
- A **Topic Board** has one **Community Slot**.
- The **Community Slot** appears after all **Tracks**.
- A **Meetup** can have optional **Event Metadata**.
- **Sovereign AI Club** has recurring **Meetups**.
- **Sovereign AI Club** tries to meet biweekly.
- The website's visual design follows the **Brand Poster**.
- **Event Metadata** records where and when a **Meetup** actually happened; a venue or time change applies to the next **Meetup**, the template, and later **Meetup Slots**, never to past **Meetups**.
- **Meetup Slots** follow the biweekly planning cadence by default.
- A **Meetup Slot** can have template **Event Metadata** for calendar display.
- A **Meetup Slot** does not have a **Topic Board**.
- A **Meetup Slot** can be replaced by a hand-authored **Meetup**.
- A **Meetup** is recorded in the **Markdown Archive**.
- The **LLM Wiki** organizes the **Markdown Archive** without replacing it.
- The **LLM Wiki** lives in public Markdown files and is safe to publish in GitHub.
- **LLM Wiki** source link records are organized by **Track**, then **Topic Title**, then supporting **Links**.
- Existing **LLM Wiki** source link records should be backfilled into the **Track** → **Topic Title** → **Links** structure.
- **LLM Wiki** source link record backfills use actual **Topic Titles** from the dated **Meetup**, not newly invented titles.
- **LLM Wiki** source link records use **Showcase Titles** for Showcase source groups without treating **Showcases** as **Topics**.
- **LLM Wiki** linting enforces that dated source link records do not place source bullets directly under **Track** headings.
- **LLM Wiki** source link record backfills preserve readable source labels instead of forcing a fully normalized citation schema.
- **LLM Wiki** entity and concept pages can aggregate **Referenced Topic Sources** without making those Links direct sources for the entity or concept itself.
- **Referenced Topic Sources** are included when a **Topic** belongs to a matching **Track**, explicitly wikilinks to the entity or concept page, or is named by exact **Topic Title** in that page's **Mentioned In** list.
- **Mentioned In** lists name exact **Topic Titles** in bold so humans can scan them and the **Wiki Explorer** can match them to source links.
- Existing **Mentioned In** lists should be backfilled to use bold exact **Topic Titles**.
- **LLM Wiki** linting lightly enforces that entity and concept **Mentioned In** bullets include a Meetup wikilink and at least one bold **Topic Title**.
- Biweekly model launches on **Models & Research** boards use official **Release Roundup** **Topic Titles** `Closed model releases` and `Open model releases`.
- The **Wiki Explorer** presents direct **Links** and aggregated **Referenced Topic Sources** in one **Sources** list with provenance labels.
- The **Wiki Explorer** browses the **LLM Wiki** without replacing the Markdown files.
- The **Wiki Explorer** uses a generated manifest as its frontend read model.
- The **Wiki Explorer** can render authored entity and concept Markdown pages, but does not render source-record or Meetup bodies.
- **Meetup Data** is curated from the **Markdown Archive**.
- **Meetup Data** is not generated from the **LLM Wiki** in v1.
- **Presentation Mode** renders **Meetup Data**.
- A **Track** has zero or more **Topics**.
- A **Topic** belongs to exactly one **Track**.
- A **Topic** has one or more **Links**.
- A **Topic** has exactly one **Topic Title**.
- A **Topic** can have **Presenter Notes**.
- A **Topic** must have **Discussion Fit** for Sovereign AI Club.
- A **Major AI Story** has **Discussion Fit** even when its builder angle is not yet obvious.
- The **Sovereignty Lens** shapes **Discussion Fit** but is not a **Track**.
- The **Open Source Lens** and **Privacy Lens** are facets of the **Sovereignty Lens**.
- The **Open Source Lens** shapes **Discussion Fit** but is not a **Track**.
- The **Privacy Lens** shapes **Discussion Fit** but is not a **Track**.
- The **Security Lens** shapes **Discussion Fit** across **Tracks**.
- **Security** is both a standard **Track** and a **Security Lens**.
- A **Showcase** can have **Presenter Notes**.
- A **Submission** belongs to exactly one target **Meetup**.
- A new **Submission** always targets the next upcoming **Meetup**. If that **Meetup** is not authored yet, the **Submission** targets the next **Meetup Slot**: the default biweekly date after the last **Meetup**, or the next Wednesday if that biweekly date already passed unauthored.
- A **Submission** requires a title.
- A **Submission** can become a **Topic** or **Showcase** through **Curation**.
- **Curation** can rewrite, combine, reframe, order, or move submitted material.
- **Curation** orders **Tracks** and **Topics** by intended discussion flow.
- **Curation** orders **Showcases** by organizer or in-room choice.
- **Reminders** are sent only for actual planned **Meetups**, not tentative **Meetup Slots**.
- A **Topic Board** has one **Community Slot** after its standard **Tracks**.
- A **Community Slot** has zero or more **Showcases**.
- An empty **Community Slot** appears only for the next upcoming **Meetup**.
- An empty **Community Slot** is omitted from past **Meetups**.
- A **Showcase** can have zero or more **Links**.
- **Local Builds & Projects**, **Agent Infrastructure**, **Models & Research**, **Security**, and **Big Tech Moves** are the standard recurring **Tracks**.
- Standard **Tracks** use their standard order by default: **Local Builds & Projects**, **Agent Infrastructure**, **Models & Research**, **Security**, **Big Tech Moves**.
- Empty standard **Tracks** are omitted from an authored **Meetup**.

## Example dialogue

> **Dev:** "A member launched a small Codex workflow this week. Should that go in SHIPPED?"
> **Domain expert:** "No — put it in **Local Builds & Projects** and say in the **Topic** description that it shipped."
>
> **Dev:** "A non-local open-source repo is runnable and interesting. Does it go in **Local Builds & Projects**?"
> **Domain expert:** "No — use **Local Builds & Projects** for Austin/member/community-orbit work, and place outside projects by their main discussion angle."
>
> **Dev:** "The calendar shows a generated date two weeks out. Is that already a **Meetup**?"
> **Domain expert:** "No — that is a **Meetup Slot** until we hand-author the board. We try to stay biweekly, but can override slots when the real date shifts."
>
> **Dev:** "If a generated **Meetup Slot** has time and location details, is it confirmed?"
> **Domain expert:** "No — **Meetup Slots** can use template **Event Metadata** for calendar display without becoming planned **Meetups**."
>
> **Dev:** "Can a **Meetup Slot** have a **Topic Board**?"
> **Domain expert:** "No — once there is a **Topic Board**, it is a **Meetup**, not just a **Meetup Slot**."
>
> **Dev:** "Is a board without time and location metadata still a **Meetup**?"
> **Domain expert:** "Yes — **Event Metadata** is optional. A **Meetup** can still exist as an archived topic board."
>
> **Dev:** "Is the **Meetup** the same thing as the board?"
> **Domain expert:** "No — the **Meetup** is the gathering, and the **Topic Board** is the curated artifact for that gathering."
>
> **Dev:** "The Markdown notes and structured data disagree. Which one should I trust?"
> **Domain expert:** "Trust the **Markdown Archive** as the durable record, then update the **Meetup Data** to render the intended board."
>
> **Dev:** "Now that the archive is an **LLM Wiki**, should the frontend parse those wiki pages directly?"
> **Domain expert:** "No — the **LLM Wiki** helps humans and agents preserve knowledge, but **Meetup Data** remains the explicit frontend rendering contract."
>
> **Dev:** "Are **Presenter Notes** private?"
> **Domain expert:** "No — they are public notes to self that add context for presenting a **Topic** or **Showcase**."
>
> **Dev:** "Should the member demo at the end be another **Track**?"
> **Domain expert:** "No — that belongs in the **Community Slot** as a **Showcase** after the **Tracks**."
>
> **Dev:** "Should we show an empty **Security** track when there are no security topics this week?"
> **Domain expert:** "No — omit empty standard **Tracks** from the authored **Meetup**."
>
> **Dev:** "Should a past **Meetup** show an empty **Community Slot**?"
> **Domain expert:** "No — only the next upcoming **Meetup** should show an empty **Community Slot** as an open-slot call to action."
>
> **Dev:** "Does any interesting AI news qualify as a **Topic**?"
> **Domain expert:** "No — a **Topic** should either be an unavoidable major AI story or something important to developers and builders who care about cutting-edge capability, security, privacy, and open source."
>
> **Dev:** "Does a huge AI story need an immediate builder takeaway to belong?"
> **Domain expert:** "No — a **Major AI Story** has **Discussion Fit** because the room will naturally need to talk about it."
>
> **Dev:** "The club is called Sovereign AI Club now. Should sovereignty be a **Track**?"
> **Domain expert:** "No — the **Sovereignty Lens** shapes **Discussion Fit** across every **Track**. A self-hosted inference story still lands in **Agent Infrastructure** or **Models & Research** by its discussion angle."
>
> **Dev:** "Is the **Sovereignty Lens** just a new name for the **Open Source Lens** plus the **Privacy Lens**?"
> **Domain expert:** "No — those two are facets of it. The **Sovereignty Lens** also covers compute, identity, payments, and the ability to exit a platform, which neither facet names on its own."
>
> **Dev:** "Should the March 2026 notes keep saying Austin AI Club, since that was the name at the time?"
> **Domain expert:** "No — the club is **Sovereign AI Club** everywhere, including the Markdown Archive and the LLM Wiki. ADR 0003 records the former name."
>
> **Dev:** "Should past **Meetups** move to the new venue and start time too?"
> **Domain expert:** "No — **Event Metadata** is a record of what happened. The new venue and time start with the next **Meetup**, the template, and later **Meetup Slots**."
>
> **Dev:** "Should open-source items have their own **Track**?"
> **Domain expert:** "No — use the **Open Source Lens** when deciding what belongs, then place the **Topic** in the best existing **Track**."
>
> **Dev:** "Should privacy have its own **Track**?"
> **Domain expert:** "No — use the **Privacy Lens** when deciding what belongs, then place the **Topic** by its discussion angle."
>
> **Dev:** "If a model release has security implications, does it automatically move to the **Security** track?"
> **Domain expert:** "No — **Security** is also a **Security Lens**. Put the **Topic** in **Models & Research** if that is the main discussion angle."
>
> **Dev:** "Does an energy, regulation, or export-control story belong if no major AI company shipped something?"
> **Domain expert:** "Yes — put it in **Big Tech Moves** when it changes the platform, infrastructure, or policy reality builders have to work inside."
>
> **Dev:** "A submitted URL came in through the link form. Is that already a **Topic**?"
> **Domain expert:** "No — it is a **Link** until it gets curated into a **Topic**, and one **Topic** may include many **Links**."
>
> **Dev:** "When a source link record points back to a Meetup, should it use the article title or the board wording?"
> **Domain expert:** "Use the **Topic Title** from the **Meetup** so readers can see the curated discussion angle, not just the source title."
>
> **Dev:** "Should **Agent Infrastructure** show every source link from Topics in that track?"
> **Domain expert:** "Yes — show them as **Referenced Topic Sources**, because they support the underlying **Topics**, not the abstract **Concept** directly."
>
> **Dev:** "Should **OpenAI** show only links from OpenAI source pages, or links from any Topic that mentions OpenAI?"
> **Domain expert:** "Show **Referenced Topic Sources** from any **Topic** that explicitly wikilinks [[OpenAI]], while preserving the Topic and Meetup context."
>
> **Dev:** "Can an entity or concept page's **Mentioned In** notes drive source aggregation?"
> **Domain expert:** "Yes — but only when the note names exact **Topic Titles**, so **Referenced Topic Sources** stay traceable to curated Topics."
>
> **Dev:** "How should **Mentioned In** name those Topics?"
> **Domain expert:** "Use bold exact **Topic Titles** inside the note, like **Sandcastle**, so the wiki stays readable and machine-matchable."
>
> **Dev:** "Should referenced topic links appear in the same list as direct source links?"
> **Domain expert:** "Yes in the **Wiki Explorer** UI — show both under **Sources**, while preserving provenance labels like direct source or referenced Meetup Topic source."
>
> **Dev:** "Does a submitted **Link** wait in a detached review queue?"
> **Domain expert:** "No — it is a **Submission** for the target **Meetup** immediately, then the organizer can curate it into the board."
>
> **Dev:** "Does submitted copy have to appear exactly as written?"
> **Domain expert:** "No — **Curation** can rewrite, combine, reframe, order, or move submitted material to make the board clearer."
>
> **Dev:** "Should **Topics** be sorted like a news feed?"
> **Domain expert:** "No — **Curation** orders **Tracks** and **Topics** by the intended room discussion flow."
>
> **Dev:** "Can I reorder the standard **Tracks**?"
> **Domain expert:** "Use the standard order by default, but change it when the specific **Meetup** flow calls for it."
>
> **Dev:** "Should **Showcases** appear by submission time?"
> **Domain expert:** "No — **Curation** orders **Showcases** by organizer or in-room choice."
>
> **Dev:** "Can someone submit only a URL?"
> **Domain expert:** "No — every **Submission** needs a title so the organizer can see the intended angle quickly."
>
> **Dev:** "Should the submitter pick a date?"
> **Domain expert:** "No — every new **Submission** targets the next upcoming **Meetup** or **Meetup Slot**."
>
> **Dev:** "The last **Meetup** was three weeks ago, we skipped the generated slot, and the next authored board is not up yet. Does the **Submission** stamp the following origin-grid date?"
> **Domain expert:** "No — stamp the next Wednesday. A **Submission** always belongs to the next gathering, whenever that date is."
>
> **Dev:** "Should reminder copy point at a generated **Meetup Slot**?"
> **Domain expert:** "No — **Reminders** should only point at an actual planned **Meetup**."
>
> **Dev:** "Can a **Showcase** include a repo, demo URL, and announcement post?"
> **Domain expert:** "Yes — a **Showcase** can have many **Links**, but it can also be ad hoc and spontaneous."
>
> **Dev:** "Should Showcase links use the same readable source-record grouping as Topics?"
> **Domain expert:** "Yes — group them under the **Showcase Title**, but do not call that heading a **Topic Title**."

## Flagged ambiguities

- "SHIPPED" was used as a temporary track name for launched work — resolved: launched member work belongs in **Local Builds & Projects**.
- "local builds" was close to meaning any runnable project — resolved: **Local Builds & Projects** is for Austin/member/community-orbit work.
- "Austin AI Club" was the club's name until September 2026 — resolved: the club is **Sovereign AI Club** everywhere, including past Meetup pages, wikilinks, Meetup Data, calendar artifacts, and docs; `sovereignai.club` is the primary domain, `austinai.club` remains an alias for the same site, and the GitHub repo name remains `austin-ai-club`.
- "sovereign" was close to being branding only — resolved: it is both the club name and the **Sovereignty Lens**, the club's primary editorial lens.
- "sovereignty" was close to becoming another **Track** — resolved: the **Sovereignty Lens** shapes **Discussion Fit** across existing **Tracks**.
- "venue change" was close to rewriting past **Event Metadata** — resolved: past **Meetups** keep the venue and time they actually had; the new venue and time apply from the next **Meetup** forward.
- "session" was used for dated Sovereign AI Club gatherings — resolved: the canonical term is **Meetup** in docs, data, and UI code.
- "future meetup" was used for generated calendar placeholders — resolved: tentative generated dates are **Meetup Slots** until manually overridden by hand-authored **Meetups**.
- "biweekly" was close to being a hard schedule guarantee — resolved: it is the default planning cadence, and authored **Meetups** can override it.
- "source of truth" was split between Markdown and structured data — resolved: the **Markdown Archive** is the durable record; **Meetup Data** is the curated rendering model.
- "LLM wiki" was close to becoming a new frontend source — resolved: the **LLM Wiki** organizes the **Markdown Archive**, while **Meetup Data** remains the rendering model.
- "notes" was close to being treated as private facilitation material — resolved: **Presenter Notes** are public notes to self.
- "showcase" was close to being treated as a **Track** — resolved: a **Showcase** belongs to the **Community Slot**, which appears after the standard **Tracks**.
- "standard track" was close to meaning every track must appear every time — resolved: empty standard **Tracks** are omitted.
- "empty community slot" was close to appearing on every **Meetup** — resolved: empty **Community Slots** appear only on the next upcoming **Meetup**.
- "interesting AI news" was close to being enough for **Discussion Fit** — resolved: a **Topic** needs either unavoidable AI relevance or builder relevance through the club's cutting-edge, security, privacy, and open-source lens.
- "adversarial" and "cutting-edge" were used descriptively, not as canonical domain terms — resolved: do not add them as separate lenses or Tracks.
- "open source" was close to becoming another **Track** — resolved: the **Open Source Lens** shapes curation across existing **Tracks**.
- "privacy" was close to becoming another **Track** — resolved: the **Privacy Lens** shapes curation across existing **Tracks**.
- "security" was close to being only a **Track** — resolved: **Security** is both a standard **Track** and a **Security Lens**.
- "big tech" was close to excluding policy and infrastructure — resolved: **Big Tech Moves** includes platform-scale policy, regulation, energy, export-control, and infrastructure changes when they shape AI development.
- "link" was close to being treated as another name for **Topic** — resolved: **Links** are source material; **Topics** are curated discussion entries.
- "source links on concept pages" was close to meaning direct sources for the **Concept** — resolved: concept and entity pages may show **Referenced Topic Sources** aggregated from related **Topics**.
- "related sources" was close to meaning all links from related Meetups — resolved: **Referenced Topic Sources** come from matching **Track** placement or explicit Topic wikilinks.
- "mentioned in" was close to being freeform prose only — resolved: **Mentioned In** can drive **Referenced Topic Sources** when it names exact **Topic Titles**.
- "title" was close to meaning the original source title — resolved: **Topic Title** means the curator-authored board title for the **Topic**.
- "showcase title" was close to being folded into **Topic Title** — resolved: **Showcase Titles** use the same source-record grouping shape without making **Showcases** into **Topics**.
- "topic without links" was considered — resolved: every **Topic** requires at least one **Link**.
- "showcase without links" was considered — resolved: **Showcases** do not require **Links** because they can be ad hoc and spontaneous.
- "submission" was close to being treated as pre-acceptance review state — resolved: **Submissions** are associated with their target **Meetup** immediately to keep contribution friction low.
- "target meetup" was close to being user-selectable — resolved: new **Submissions** always target the next upcoming **Meetup**, or the next **Meetup Slot** when that gathering is not authored yet. If the default biweekly **Meetup Slot** already passed unauthored, the next Wednesday is the target rather than the following origin-grid date.
- "reminder target" was close to following generated **Meetup Slots** — resolved: reminders only point at actual planned **Meetups**.
