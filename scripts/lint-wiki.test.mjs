import { describe, expect, it } from "vitest";
import {
  checkDatedMeetupSourceRecordCoverage,
  checkDatedSourceLinkRecordHierarchy,
  checkDatedSourceRecordTopicHeadings,
  checkDatedSourceRecordTopicUrlPlacement,
  checkIndexCompleteness,
  checkMeetupRelatedPageSpine,
  checkMentionedInSourceRecords,
  checkMentionedInTopicReferences,
  checkMentionedInTopicTitles,
  checkRetiredClubName,
  checkTopicWikilinkBacklinks,
} from "./lint-wiki.mjs";

describe("checkDatedSourceLinkRecordHierarchy", () => {
  it("rejects source bullets directly under dated source record sections", () => {
    const errors = checkDatedSourceLinkRecordHierarchy(
      "public/topics/raw/articles/2026-05-13-link-records.md",
      `# May 13, 2026 Source Link Records

## Agent Infrastructure

- Sandcastle repo: https://github.com/mattpocock/sandcastle
`,
    );

    expect(errors).toEqual([
      'public/topics/raw/articles/2026-05-13-link-records.md:5: source bullets must be nested under a Topic or Showcase heading inside "Agent Infrastructure"',
    ]);
  });

  it("accepts source bullets under Topic and Showcase headings", () => {
    const errors = checkDatedSourceLinkRecordHierarchy(
      "public/topics/raw/articles/2026-05-13-link-records.md",
      `# May 13, 2026 Source Link Records

## Agent Infrastructure

### Sandcastle

- Sandcastle repo: https://github.com/mattpocock/sandcastle

## Showcase

### Community Slot

- Signup link: https://example.com/showcase
`,
    );

    expect(errors).toEqual([]);
  });
});

describe("checkDatedMeetupSourceRecordCoverage", () => {
  it("rejects dated meetup URLs that are missing from the matching source record", () => {
    const errors = checkDatedMeetupSourceRecordCoverage(
      "public/topics/2026-05-27.md",
      `# Sovereign AI Club - May 27, 2026

- **Cursor gets SpaceX compute** - The compute story gets very concrete.
  Source: https://cursor.com/blog/spacex-model-training
`,
      `# May 27, 2026 Source Link Records

## Big Tech Moves

### Cursor gets SpaceX compute

- Related source: https://example.com/context
`,
    );

    expect(errors).toEqual([
      "public/topics/2026-05-27.md: source URL is missing from public/topics/raw/articles/2026-05-27-link-records.md: https://cursor.com/blog/spacex-model-training",
    ]);
  });

  it("accepts dated meetup URLs captured in the matching source record", () => {
    const errors = checkDatedMeetupSourceRecordCoverage(
      "public/topics/2026-05-27.md",
      `# Sovereign AI Club - May 27, 2026

- **Cursor gets SpaceX compute** - The compute story gets very concrete.
  Source: https://cursor.com/blog/spacex-model-training
`,
      `# May 27, 2026 Source Link Records

## Big Tech Moves

### Cursor gets SpaceX compute

- Cursor SpaceX training blog: https://cursor.com/blog/spacex-model-training
`,
    );

    expect(errors).toEqual([]);
  });
});

describe("checkDatedSourceRecordTopicHeadings", () => {
  it("rejects source-record groups that do not match dated meetup Topic titles", () => {
    const errors = checkDatedSourceRecordTopicHeadings(
      "public/topics/raw/articles/2026-05-27-link-records.md",
      `# May 27, 2026 Source Link Records

## Agent Infrastructure

### Cursor gets SpaceX compute

- Source: https://example.com/cursor-spacex
`,
      new Set(["spacex options cursor for $60b"]),
    );

    expect(errors).toEqual([
      'public/topics/raw/articles/2026-05-27-link-records.md:5: source-record group "Cursor gets SpaceX compute" must match a Topic or Showcase title from the dated Meetup page',
    ]);
  });

  it("accepts source-record groups that match dated meetup Topic titles", () => {
    const errors = checkDatedSourceRecordTopicHeadings(
      "public/topics/raw/articles/2026-05-27-link-records.md",
      `# May 27, 2026 Source Link Records

## Agent Infrastructure

### SpaceX options Cursor for $60B

- Source: https://example.com/cursor-spacex
`,
      new Set(["spacex options cursor for $60b"]),
    );

    expect(errors).toEqual([]);
  });
});

describe("checkDatedSourceRecordTopicUrlPlacement", () => {
  it("rejects Topic URLs that are only present under a different source-record group", () => {
    const errors = checkDatedSourceRecordTopicUrlPlacement(
      "public/topics/raw/articles/2026-04-01-link-records.md",
      `# Sovereign AI Club - April 1, 2026

## Models & Research

- **Distillation hesitation** - GLM and MiniMax docs both support the hesitation story.
  Source: https://docs.z.ai/guides/llm/glm-5
`,
      `# April 1, 2026 Source Link Records

## Models & Research

### GLM-5.1

- GLM docs:
  - https://docs.z.ai/guides/llm/glm-5

### Distillation hesitation

- Distillation hesitation records:
  - https://x.com/example/status/1
`,
    );

    expect(errors).toEqual([
      'public/topics/raw/articles/2026-04-01-link-records.md:10: URL from Topic "Distillation hesitation" must be under the matching source-record group: https://docs.z.ai/guides/llm/glm-5',
    ]);
  });

  it("accepts Topic URLs under the matching source-record group", () => {
    const errors = checkDatedSourceRecordTopicUrlPlacement(
      "public/topics/raw/articles/2026-04-01-link-records.md",
      `# Sovereign AI Club - April 1, 2026

## Models & Research

- **Distillation hesitation** - GLM docs support the hesitation story.
  Source: https://docs.z.ai/guides/llm/glm-5
`,
      `# April 1, 2026 Source Link Records

## Models & Research

### Distillation hesitation

- Distillation hesitation records:
  - https://docs.z.ai/guides/llm/glm-5
`,
    );

    expect(errors).toEqual([]);
  });
});

describe("checkMentionedInTopicTitles", () => {
  it("rejects concept and entity Mentioned In bullets without bold topic titles", () => {
    const errors = checkMentionedInTopicTitles(
      "public/topics/concepts/coding-agents.md",
      `# Coding Agents

## Mentioned In

- [[Sovereign AI Club - May 13, 2026]]: Sandcastle and SubQ.
`,
      "concept",
    );

    expect(errors).toEqual([
      "public/topics/concepts/coding-agents.md:5: Mentioned In bullets for concept/entity pages must include at least one bold exact Topic Title",
    ]);
  });

  it("rejects concept and entity Mentioned In bullets without meetup wikilinks", () => {
    const errors = checkMentionedInTopicTitles(
      "public/topics/entities/openai.md",
      `# OpenAI

## Mentioned In

- May 13 meetup: **OpenAI Privacy Filter gets inverted**.
`,
      "entity",
    );

    expect(errors).toEqual([
      "public/topics/entities/openai.md:5: Mentioned In bullets for concept/entity pages must start with a meetup wikilink",
    ]);
  });

  it("accepts concept and entity Mentioned In bullets with meetup links and bold topic titles", () => {
    const errors = checkMentionedInTopicTitles(
      "public/topics/concepts/coding-agents.md",
      `# Coding Agents

## Mentioned In

- [[Sovereign AI Club - May 13, 2026]]: **Sandcastle** and **SubQ goes after 12M-token context**.
`,
      "concept",
    );

    expect(errors).toEqual([]);
  });

  it("rejects Mentioned In topic titles that are not on the linked meetup page", () => {
    const meetupTopicTitlesById = new Map([
      ["austin-ai-club-may-13-2026", new Set(["sandcastle"])],
    ]);
    const errors = checkMentionedInTopicReferences(
      "public/topics/concepts/coding-agents.md",
      `# Coding Agents

## Mentioned In

- [[Sovereign AI Club - May 13, 2026]]: **SubQ goes after 12M-token context**.
`,
      "concept",
      meetupTopicTitlesById,
    );

    expect(errors).toEqual([
      'public/topics/concepts/coding-agents.md:5: Mentioned In Topic Title "SubQ goes after 12M-token context" was not found on Sovereign AI Club - May 13, 2026',
    ]);
  });

  it("accepts Mentioned In topic titles that exist on the linked meetup page", () => {
    const meetupTopicTitlesById = new Map([
      [
        "austin-ai-club-may-13-2026",
        new Set(["sandcastle", "subq goes after 12m-token context"]),
      ],
    ]);
    const errors = checkMentionedInTopicReferences(
      "public/topics/concepts/coding-agents.md",
      `# Coding Agents

## Mentioned In

- [[Sovereign AI Club - May 13, 2026]]: **Sandcastle** and **SubQ goes after 12M-token context**.
`,
      "concept",
      meetupTopicTitlesById,
    );

    expect(errors).toEqual([]);
  });
});

describe("checkMentionedInSourceRecords", () => {
  it("rejects concept and entity Mentioned In meetup links without matching source records", () => {
    const errors = checkMentionedInSourceRecords(
      "public/topics/entities/openai.md",
      `# OpenAI

## Mentioned In

- [[Sovereign AI Club - May 27, 2026]]: **Karpathy joins Anthropic for recursive AI research**.
`,
      "entity",
      ["raw/articles/2026-05-13-link-records.md"],
      new Map([
        ["austin-ai-club-may-27-2026", "raw/articles/2026-05-27-link-records.md"],
      ]),
    );

    expect(errors).toEqual([
      "public/topics/entities/openai.md:5: Mentioned In meetup Sovereign AI Club - May 27, 2026 requires frontmatter source raw/articles/2026-05-27-link-records.md",
    ]);
  });

  it("accepts concept and entity Mentioned In meetup links with matching source records", () => {
    const errors = checkMentionedInSourceRecords(
      "public/topics/entities/openai.md",
      `# OpenAI

## Mentioned In

- [[Sovereign AI Club - May 27, 2026]]: **Karpathy joins Anthropic for recursive AI research**.
`,
      "entity",
      ["raw/articles/2026-05-27-link-records.md"],
      new Map([
        ["austin-ai-club-may-27-2026", "raw/articles/2026-05-27-link-records.md"],
      ]),
    );

    expect(errors).toEqual([]);
  });
});

describe("checkIndexCompleteness", () => {
  it("rejects normal wiki pages missing from the wiki index", () => {
    const errors = checkIndexCompleteness(
      "public/topics/index.md",
      `# Wiki Index

## Concepts

- [[Coding Agents]]
`,
      [
        {
          rel: "public/topics/concepts/coding-agents.md",
          title: "Coding Agents",
          type: "concept",
        },
        {
          rel: "public/topics/entities/cursor.md",
          title: "Cursor",
          type: "entity",
        },
        {
          rel: "public/topics/raw/articles/2026-05-27-link-records.md",
          title: "Sovereign AI Club - May 27, 2026 - Source Link Records",
          type: "summary",
        },
        {
          rel: "public/topics/TEMPLATE.md",
          title: "Sovereign AI Club - Month DD, YYYY",
          type: "meetup",
        },
      ],
    );

    expect(errors).toEqual([
      "public/topics/index.md: missing index entry for entity page [[Cursor]] (public/topics/entities/cursor.md)",
    ]);
  });

  it("accepts indexed normal wiki pages and ignores summary source records", () => {
    const errors = checkIndexCompleteness(
      "public/topics/index.md",
      `# Wiki Index

## Entities

- [[Cursor]]

## Concepts

- [[Coding Agents]]
`,
      [
        {
          rel: "public/topics/concepts/coding-agents.md",
          title: "Coding Agents",
          type: "concept",
        },
        {
          rel: "public/topics/entities/cursor.md",
          title: "Cursor",
          type: "entity",
        },
        {
          rel: "public/topics/raw/articles/2026-05-27-link-records.md",
          title: "Sovereign AI Club - May 27, 2026 - Source Link Records",
          type: "summary",
        },
      ],
    );

    expect(errors).toEqual([]);
  });
});

describe("checkTopicWikilinkBacklinks", () => {
  it("rejects topic wikilinks without reciprocal Mentioned In entries", () => {
    const errors = checkTopicWikilinkBacklinks(
      "public/topics/2026-05-27.md",
      `# Sovereign AI Club - May 27, 2026

## Agent Infrastructure

- **SpaceX options Cursor for $60B** - [[Cursor]] gets tied to [[SpaceX]] compute.
  Source: https://example.com/cursor-spacex
`,
      "Sovereign AI Club - May 27, 2026",
      new Map([
        [
          "cursor",
          {
            rel: "public/topics/entities/cursor.md",
            content: `# Cursor

## Mentioned In

- [[Sovereign AI Club - May 27, 2026]]: **Composer 2.5 = Opus at one tenth the cost??**.
`,
          },
        ],
      ]),
    );

    expect(errors).toEqual([
      'public/topics/2026-05-27.md:5: Topic wikilink [[Cursor]] must have a reciprocal Mentioned In entry for "SpaceX options Cursor for $60B" in public/topics/entities/cursor.md',
    ]);
  });

  it("accepts topic wikilinks with reciprocal Mentioned In entries", () => {
    const errors = checkTopicWikilinkBacklinks(
      "public/topics/2026-05-27.md",
      `# Sovereign AI Club - May 27, 2026

## Agent Infrastructure

- **SpaceX options Cursor for $60B** - [[Cursor]] gets tied to [[SpaceX]] compute.
  Source: https://example.com/cursor-spacex
`,
      "Sovereign AI Club - May 27, 2026",
      new Map([
        [
          "cursor",
          {
            rel: "public/topics/entities/cursor.md",
            content: `# Cursor

## Mentioned In

- [[Sovereign AI Club - May 27, 2026]]: **SpaceX options Cursor for $60B**.
`,
          },
        ],
      ]),
    );

    expect(errors).toEqual([]);
  });
});

describe("checkMeetupRelatedPageSpine", () => {
  it("rejects Topic wikilinks missing from the meetup Related wiki pages line", () => {
    const errors = checkMeetupRelatedPageSpine(
      "public/topics/2026-05-27.md",
      `# Sovereign AI Club

## May 27, 2026

Related wiki pages: [[Cursor]].

### Agent Infrastructure

- **Composer 2.5 = Opus at one tenth the cost??** - [[Cursor]] and [[Agent Cost Controls]] both matter here.
  Source: https://example.com/composer
`,
    );

    expect(errors).toEqual([
      'public/topics/2026-05-27.md:9: Related wiki pages must include [[Agent Cost Controls]] used by Topic "Composer 2.5 = Opus at one tenth the cost??"',
    ]);
  });

  it("accepts Topic wikilinks present in the meetup Related wiki pages line", () => {
    const errors = checkMeetupRelatedPageSpine(
      "public/topics/2026-05-27.md",
      `# Sovereign AI Club

## May 27, 2026

Related wiki pages: [[Cursor]], [[Agent Cost Controls]].

### Agent Infrastructure

- **Composer 2.5 = Opus at one tenth the cost??** - [[Cursor]] and [[Agent Cost Controls]] both matter here.
  Source: https://example.com/composer
`,
    );

    expect(errors).toEqual([]);
  });

  it("rejects implicit Related wiki pages without a reciprocal Mentioned In entry", () => {
    const errors = checkMeetupRelatedPageSpine(
      "public/topics/2026-05-27.md",
      `# Sovereign AI Club

## May 27, 2026

Related wiki pages: [[Cursor]], [[Open Models]].

### Agent Infrastructure

- **Composer 2.5 = Opus at one tenth the cost??** - [[Cursor]] matters here.
  Source: https://example.com/composer
`,
      "Sovereign AI Club - May 27, 2026",
      new Map([
        [
          "open-models",
          {
            rel: "public/topics/concepts/open-models.md",
            content: `# Open Models

## Mentioned In

- [[Sovereign AI Club - June 10, 2026]]: **Open-weight release week turns into a firehose**.
`,
          },
        ],
      ]),
    );

    expect(errors).toEqual([
      "public/topics/2026-05-27.md: Related wiki page [[Open Models]] must be used by Topic prose or have a Mentioned In entry for [[Sovereign AI Club - May 27, 2026]] in public/topics/concepts/open-models.md",
    ]);
  });

  it("accepts implicit Related wiki pages backed by Mentioned In entries", () => {
    const errors = checkMeetupRelatedPageSpine(
      "public/topics/2026-05-27.md",
      `# Sovereign AI Club

## May 27, 2026

Related wiki pages: [[Cursor]], [[Open Models]].

### Agent Infrastructure

- **Composer 2.5 = Opus at one tenth the cost??** - [[Cursor]] matters here.
  Source: https://example.com/composer
`,
      "Sovereign AI Club - May 27, 2026",
      new Map([
        [
          "open-models",
          {
            rel: "public/topics/concepts/open-models.md",
            content: `# Open Models

## Mentioned In

- [[Sovereign AI Club - May 27, 2026]]: **Multi-token prediction goes mainstream**.
`,
          },
        ],
      ]),
    );

    expect(errors).toEqual([]);
  });
});

describe("checkRetiredClubName", () => {
  it("fails when a wiki page body or frontmatter contains Austin AI Club", () => {
    const errors = checkRetiredClubName(
      "public/topics/2026-05-13.md",
      `---
title: Austin AI Club - May 13, 2026
---

# Austin AI Club
`,
    );

    expect(errors).toEqual([
      'public/topics/2026-05-13.md:2: retired club name "Austin AI Club" is not allowed in the LLM Wiki',
      'public/topics/2026-05-13.md:5: retired club name "Austin AI Club" is not allowed in the LLM Wiki',
    ]);
  });

  it("passes on a renamed Sovereign fixture", () => {
    const errors = checkRetiredClubName(
      "public/topics/2026-05-13.md",
      `---
title: Sovereign AI Club - May 13, 2026
---

# Sovereign AI Club
`,
    );

    expect(errors).toEqual([]);
  });
});

describe("meetup title prefix", () => {
  it("accepts Mentioned In meetup wikilinks with the Sovereign AI Club title prefix", () => {
    const errors = checkMentionedInTopicReferences(
      "public/topics/concepts/coding-agents.md",
      `# Coding Agents

## Mentioned In

- [[Sovereign AI Club - May 13, 2026]]: **Sandcastle**.
`,
      "concept",
    );

    expect(errors).toEqual([]);
  });
});
