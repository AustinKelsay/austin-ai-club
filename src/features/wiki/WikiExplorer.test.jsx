import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { WikiDetail } from "./WikiDetail.jsx";
import { WikiTopicResults, WikiTopicSpotlight } from "./WikiTopicResults.jsx";

function buildPage(overrides) {
  return {
    id: "openai",
    title: "OpenAI",
    type: "entity",
    tags: ["entity", "company"],
    sourceCount: 1,
    sourceLinks: ["https://openai.com/release"],
    sourceReferences: [],
    referencedTopicSources: [],
    outgoingIds: [],
    backlinkIds: [],
    unresolvedLinks: [],
    excerpt: "OpenAI is a recurring Sovereign AI Club entity.",
    rawHref: "/topics/entities/openai.md",
    ...overrides,
  };
}

describe("WikiDetail", () => {
  it("shows source links for the selected wiki page", () => {
    const longSourceLink =
      "https://example.com/research/extremely-long-model-release-slug-without-friendly-breakpoints";
    const selectedPage = buildPage({
      id: "openai",
      sourceLinks: ["https://openai.com/release", longSourceLink],
    });
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("Sources");
    expect(html).toContain("Direct");
    expect(html).toContain("href=\"https://openai.com/release\"");
    expect(html).toContain("openai.com/release");
    expect(html).toContain("class=\"wiki-link-label\"");
    expect(html).toContain("example.com/research/extremely-long-model-release-slug");
  });

  it("shows source link topic titles when source references include context", () => {
    const selectedPage = buildPage({
      id: "austin-ai-club-april-1-2026",
      title: "Sovereign AI Club - April 1, 2026",
      type: "meetup",
      tags: ["meetup"],
      sourceLinks: ["https://github.com/ryanthegentry/402index-mcp-server"],
      sourceReferences: [
        {
          href: "https://github.com/ryanthegentry/402index-mcp-server",
          title: "402 Index paid API loop demo",
          section: "Agent Infrastructure",
        },
      ],
      excerpt: "April 1 meetup.",
      rawHref: "/topics/2026-04-01.md",
    });
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="austin-ai-club-april-1-2026"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("402 Index paid API loop demo");
    expect(html).toContain("Agent Infrastructure");
    expect(html).toContain("github.com/ryanthegentry/402index-mcp-server");
  });

  it("shows referenced topic sources in the unified sources list", () => {
    const selectedPage = buildPage({
      id: "agent-infrastructure",
      title: "Agent Infrastructure",
      type: "concept",
      tags: ["concept", "track"],
      sourceLinks: [],
      sourceReferences: [],
      referencedTopicSources: [
        {
          href: "https://github.com/ryanthegentry/402index-mcp-server",
          title: "402 Index paid API loop demo",
          section: "Agent Infrastructure",
          sourcePageTitle: "Sovereign AI Club - April 1, 2026",
        },
      ],
      excerpt: "Agent Infrastructure covers runtimes and protocols.",
      rawHref: "/topics/concepts/agent-infrastructure.md",
    });
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="agent-infrastructure"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("Sources");
    expect(html).not.toContain("Referenced Topic Sources");
    expect(html).not.toContain("No source links captured yet.");
    expect(html).toContain("402 Index paid API loop demo");
    expect(html).toContain("From Sovereign AI Club - April 1, 2026");
    expect(html).toContain("github.com/ryanthegentry/402index-mcp-server");
  });

  it("renders source controls for provenance, Meetup, Track, and Topic Title", () => {
    const selectedPage = buildPage({
      id: "openclaw",
      title: "OpenClaw",
      sourceLinks: [],
      referencedTopicSources: [
        {
          href: "https://example.com/agent-runtime",
          title: "OpenClaw becomes an agent runtime",
          section: "Agent Infrastructure",
          sourcePageTitle: "Sovereign AI Club - May 13, 2026",
        },
        {
          href: "https://example.com/agent-security",
          title: "OpenClaw hardens its sandbox",
          section: "Security",
          sourcePageTitle: "Sovereign AI Club - May 27, 2026",
        },
      ],
    });

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={{ pagesById: {} }}
        selectedPage={selectedPage}
        focusedWikiId="openclaw"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain('aria-label="Filter Sources by provenance"');
    expect(html).toContain('aria-label="Filter Sources by Meetup"');
    expect(html).toContain('aria-label="Filter Sources by Track"');
    expect(html).toContain('aria-label="Filter Sources by Topic Title"');
    expect(html).toContain("Sovereign AI Club - May 13, 2026");
    expect(html).toContain("Agent Infrastructure");
    expect(html).toContain("OpenClaw becomes an agent runtime");
  });

  it("omits source filters that only have one choice", () => {
    const selectedPage = buildPage({
      id: "openclaw",
      title: "OpenClaw",
      sourceLinks: [],
      referencedTopicSources: [
        {
          href: "https://example.com/agent-runtime",
          title: "OpenClaw becomes an agent runtime",
          section: "Agent Infrastructure",
          sourcePageTitle: "Sovereign AI Club - May 13, 2026",
        },
      ],
    });

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={{ pagesById: {} }}
        selectedPage={selectedPage}
        focusedWikiId="openclaw"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).not.toContain('aria-label="Filter Sources by Meetup"');
    expect(html).not.toContain('aria-label="Filter Sources by Track"');
    expect(html).not.toContain('aria-label="Filter Sources by Topic Title"');
    expect(html).toContain("OpenClaw becomes an agent runtime");
  });

  it("renders authored entity Markdown with headings, lists, links, and navigable wikilinks", () => {
    const selectedPage = buildPage({
      bodyMarkdown: `# OpenAI

OpenAI publishes **model research** and [release notes](https://openai.com/research).

## Related

- [[Coding Agents|Coding-agent tools]]
- [[Missing Page]]
- Public model documentation
`,
    });

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={{ pagesById: { "coding-agents": { id: "coding-agents" } } }}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain('aria-label="OpenAI Wiki page body"');
    expect(html).not.toContain("Read Wiki Page");
    expect(html).not.toContain("<h1>OpenAI</h1>");
    expect(html).toContain("<h2>Related</h2>");
    expect(html).toContain("<strong>model research</strong>");
    expect(html).toContain('href="https://openai.com/research"');
    expect(html).toContain('href="/wiki/coding-agents"');
    expect(html).not.toContain('href="/wiki/missing-page"');
    expect(html).toContain("wiki-markdown-wikilink--unresolved");
    expect(html).toContain("Coding-agent tools");
    expect(html).toContain("Public model documentation");
  });

  it("shows the opening paragraph once, in the summary, with its links intact", () => {
    const selectedPage = buildPage({
      excerpt: "OpenAI ships GPT models.",
      bodyMarkdown: `# OpenAI

OpenAI ships [[GPT]] models.

## Mentioned In

- [[Sovereign AI Club - June 10, 2026]]: **GPT-6 launch**.
`,
    });

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={{ pagesById: { gpt: { id: "gpt" } } }}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
      />,
    );

    expect(html.match(/OpenAI ships/g)).toHaveLength(1);
    expect(html).toContain('class="wiki-detail-copy">OpenAI ships <a');
    expect(html).not.toContain("OpenAI ships GPT models.");
    expect(html.match(/Mentioned In/g)).toHaveLength(1);
    expect(html).not.toContain("Related Wiki Pages");
  });

  it("merges outgoing links and backlinks into one list for pages without a body", () => {
    const selectedPage = buildPage({
      id: "austin-ai-club-april-1-2026",
      title: "Sovereign AI Club - April 1, 2026",
      type: "meetup",
      excerpt: "Related wiki pages: Security, Cursor.",
      outgoingIds: ["security", "cursor"],
      backlinkIds: ["cursor", "openai"],
    });
    const manifest = {
      pagesById: {
        security: { id: "security", title: "Security", type: "concept" },
        cursor: { id: "cursor", title: "Cursor", type: "entity" },
        openai: { id: "openai", title: "OpenAI", type: "entity" },
      },
    };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="austin-ai-club-april-1-2026"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("Connected Pages");
    expect(html).not.toContain("Backlinks");
    expect(html).not.toContain("Related wiki pages:");
    expect(html.match(/href="\/wiki\/cursor"/g)).toHaveLength(1);
    expect(html).toContain('href="/wiki/security"');
    expect(html).toContain('href="/wiki/openai"');
  });

  it("preserves authored headings that are only substrings of the page title", () => {
    const selectedPage = buildPage({
      title: "OpenAI Presence",
      bodyMarkdown: "# AI\n\nAuthored section about AI.",
    });
    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={{ pagesById: {} }}
        selectedPage={selectedPage}
        focusedWikiId={selectedPage.id}
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("<h1>AI</h1>");
  });

  it("drops leading headings that only restate a meetup page title", () => {
    const selectedPage = buildPage({
      id: "austin-ai-club-april-1-2026",
      title: "Sovereign AI Club - April 1, 2026",
      type: "meetup",
      bodyMarkdown: `# Sovereign AI Club

## April 1, 2026

Related wiki pages: [[Security]].

### Agent Infrastructure
- **GTC recap**
`,
    });

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={{ pagesById: { security: { id: "security" } } }}
        selectedPage={selectedPage}
        focusedWikiId="austin-ai-club-april-1-2026"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).not.toContain("<h1>Sovereign AI Club</h1>");
    expect(html).not.toContain("<h2>April 1, 2026</h2>");
    expect(html).toContain("<h3>Agent Infrastructure</h3>");
    expect(html).not.toContain("Not mentioned in a meetup yet.");
  });

  it("resolves Sovereign meetup wikilinks to historical austin-ai-club page ids", () => {
    const selectedPage = buildPage({
      bodyMarkdown: `## Mentioned In

- [[Sovereign AI Club - April 1, 2026]]: **402 Index paid API loop demo**.
`,
    });

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={{
          pagesById: {
            "austin-ai-club-april-1-2026": { id: "austin-ai-club-april-1-2026" },
          },
        }}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain('href="/wiki/austin-ai-club-april-1-2026"');
    expect(html).not.toContain("wiki-markdown-wikilink--unresolved");
  });

  it("renders tags as clickable buttons when onTagClick is provided", () => {
    const selectedPage = buildPage();
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
        onTagClick={() => {}}
      />,
    );

    expect(html).toMatch(/<button[^>]*class="[^"]*wiki-tag--clickable[^"]*"[^>]*>entity<\/button>/);
    expect(html).toMatch(/<button[^>]*class="[^"]*wiki-tag--clickable[^"]*"[^>]*>company<\/button>/);
    expect(html).not.toMatch(/<span[^>]*class="[^"]*wiki-tag[^"]*"[^>]*>entity<\/span>/);
  });

  it("highlights the active tag filter", () => {
    const selectedPage = buildPage();
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
        onTagClick={() => {}}
        activeTag="company"
      />,
    );

    expect(html).toMatch(
      /<button[^>]*class="[^"]*wiki-tag--active[^"]*"[^>]*>company<\/button>/,
    );
    expect(html).not.toMatch(
      /<button[^>]*class="[^"]*wiki-tag--active[^"]*"[^>]*>entity<\/button>/,
    );
  });

  it("renders tags as plain spans when onTagClick is omitted", () => {
    const selectedPage = buildPage();
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toMatch(/<span[^>]*class="[^"]*wiki-tag[^"]*"[^>]*>entity<\/span>/);
    expect(html).not.toContain("wiki-tag--clickable");
  });

  it("shows a freshness line when the page has a recent updated date", () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const selectedPage = buildPage({ updated: yesterday });
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("wiki-detail-freshness");
    expect(html).toMatch(/Updated (yesterday|1 day ago)/);
  });

  it("omits the freshness line when no date is available", () => {
    const selectedPage = buildPage({ updated: "", created: "" });
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).not.toContain("wiki-detail-freshness");
  });

  it("renders a copy link button next to the markdown source link", () => {
    const selectedPage = buildPage();
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toMatch(/<button[^>]*class="[^"]*wiki-copy-link[^"]*"[^>]*>Copy link<\/button>/);
  });

  it("opens external source links in a new tab", () => {
    const selectedPage = buildPage({
      sourceLinks: ["https://openai.com/release"],
    });
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="openai"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("shows a Mentioned In section with meetup backlinks", () => {
    const selectedPage = buildPage({
      id: "anthropic",
      backlinkIds: ["austin-ai-club-june-10-2026", "agent-cost-controls"],
    });
    const manifest = {
      pagesById: {
        "austin-ai-club-june-10-2026": {
          id: "austin-ai-club-june-10-2026",
          title: "Sovereign AI Club - June 10, 2026",
          type: "meetup",
        },
        "agent-cost-controls": {
          id: "agent-cost-controls",
          title: "Agent Cost Controls",
          type: "concept",
        },
      },
    };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="anthropic"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("Mentioned In");
    expect(html).toContain("Sovereign AI Club - June 10, 2026");
  });

  it("groups referenced topic sources by track section", () => {
    const selectedPage = buildPage({
      id: "agent-infrastructure",
      type: "concept",
      sourceLinks: ["https://direct.example.com"],
      sourceReferences: [],
      referencedTopicSources: [
        {
          href: "https://agent.example.com/one",
          title: "Agent topic one",
          section: "Agent Infrastructure",
          sourcePageTitle: "Sovereign AI Club - June 10, 2026",
        },
        {
          href: "https://agent.example.com/two",
          title: "Agent topic two",
          section: "Agent Infrastructure",
          sourcePageTitle: "Sovereign AI Club - May 27, 2026",
        },
        {
          href: "https://models.example.com/one",
          title: "Model topic one",
          section: "Models & Research",
          sourcePageTitle: "Sovereign AI Club - June 10, 2026",
        },
      ],
    });
    const manifest = { pagesById: {} };

    const html = renderToStaticMarkup(
      <WikiDetail
        manifest={manifest}
        selectedPage={selectedPage}
        focusedWikiId="agent-infrastructure"
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("Agent Infrastructure");
    expect(html).toContain("Models &amp; Research");
    expect(html).toContain("Agent topic one");
    expect(html).toContain("Agent topic two");
    expect(html).toContain("Model topic one");
  });
});

describe("WikiTopicResults", () => {
  it("renders compact Topic hits for search discovery", () => {
    const html = renderToStaticMarkup(
      <WikiTopicSpotlight
        topics={[
          {
            id: "cursor-origin",
            title: "Cursor previews Origin, a GitHub competitor",
            section: "Big Tech Moves",
            meetupTitle: "Sovereign AI Club - June 24, 2026",
            meetupSlug: "2026-06-24",
            wikiIds: ["cursor", "big-tech-moves"],
          },
          {
            id: "cursor-spacex",
            title: "SpaceX options Cursor for $60B",
            section: "Big Tech Moves",
            meetupTitle: "Sovereign AI Club - May 27, 2026",
            meetupSlug: "2026-05-27",
            wikiIds: ["cursor", "spacex"],
          },
        ]}
        pagesById={{
          cursor: { id: "cursor", title: "Cursor", type: "entity" },
          spacex: { id: "spacex", title: "SpaceX", type: "entity" },
          "big-tech-moves": { id: "big-tech-moves", title: "Big Tech Moves", type: "concept" },
        }}
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("Topic hits");
    expect(html).toContain("Cursor previews Origin");
    expect(html).toContain("SpaceX options Cursor for $60B");
    expect(html).toContain("Sovereign AI Club - June 24, 2026");
    expect(html).toContain("Cursor");
    expect(html).toContain("SpaceX");
  });

  it("renders filtered Topic Results with wiki chips and source links", () => {
    const html = renderToStaticMarkup(
      <WikiTopicResults
        topics={[
          {
            id: "austin-ai-club-may-27-2026-big-tech-moves-spacex-options-cursor-for-60b",
            title: "SpaceX options Cursor for $60B",
            section: "Big Tech Moves",
            meetupTitle: "Sovereign AI Club - May 27, 2026",
            meetupSlug: "2026-05-27",
            sourceLinks: [
              "https://siliconangle.com/2026/04/22/spacex-partners-cursor-ai-training-floats-potential-60b-acquisition/",
            ],
            wikiIds: ["cursor", "spacex"],
          },
        ]}
        pagesById={{
          cursor: { id: "cursor", title: "Cursor", type: "entity" },
          spacex: { id: "spacex", title: "SpaceX", type: "entity" },
        }}
        activeFilterIds={["cursor", "spacex"]}
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("Topic Results");
    expect(html).toContain("SpaceX options Cursor for $60B");
    expect(html).toContain("Sovereign AI Club - May 27, 2026");
    expect(html).toContain("Big Tech Moves");
    expect(html).toContain("Cursor");
    expect(html).toContain("SpaceX");
    expect(html).toContain("siliconangle.com");
  });
});
