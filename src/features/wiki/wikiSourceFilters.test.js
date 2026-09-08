import { describe, expect, it } from "vitest";
import {
  buildWikiSourceFilterOptions,
  buildWikiSourceItems,
  filterWikiSourceItems,
} from "./wikiSourceFilters.js";

const selectedPage = {
  title: "OpenClaw",
  type: "entity",
  sourceLinks: ["https://openclaw.ai/docs"],
  sourceReferences: [],
  referencedTopicSources: [
    {
      href: "https://example.com/agent-runtime",
      title: "OpenClaw becomes an agent runtime",
      section: "Agent Infrastructure",
      sourcePageTitle: "Sovereign AI Club - May 13, 2026",
    },
    {
      href: "https://example.com/security",
      title: "OpenClaw hardens tool permissions",
      section: "Security",
      sourcePageTitle: "Sovereign AI Club - May 27, 2026",
    },
  ],
};

describe("Wiki source filters", () => {
  it("filters the unified Sources list by provenance, Meetup, Track, and Topic Title", () => {
    const items = buildWikiSourceItems(selectedPage);

    expect(buildWikiSourceFilterOptions(items)).toEqual({
      meetups: ["Sovereign AI Club - May 13, 2026", "Sovereign AI Club - May 27, 2026"],
      tracks: ["Agent Infrastructure", "Security"],
      topicTitles: ["OpenClaw becomes an agent runtime", "OpenClaw hardens tool permissions"],
    });

    expect(filterWikiSourceItems(items, { provenance: "direct" }).map((item) => item.href)).toEqual([
      "https://openclaw.ai/docs",
    ]);
    expect(
      filterWikiSourceItems(items, {
        provenance: "referenced",
        meetup: "Sovereign AI Club - May 27, 2026",
        track: "Security",
        topicTitle: "OpenClaw hardens tool permissions",
      }).map((item) => item.href),
    ).toEqual(["https://example.com/security"]);
  });
});
