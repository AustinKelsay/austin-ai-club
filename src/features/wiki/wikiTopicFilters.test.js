import { describe, expect, it } from "vitest";
import { filterTopicsByExplorerState } from "./wikiTopicFilters.js";

function topic(overrides) {
  return {
    id: "topic",
    title: "Topic",
    section: "Big Tech Moves",
    meetupTitle: "Sovereign AI Club - May 27, 2026",
    meetupSlug: "2026-05-27",
    sourceLinks: [],
    wikiIds: [],
    wikiTitles: [],
    searchText: "",
    ...overrides,
  };
}

describe("wikiTopicFilters", () => {
  it("filters Topics by all selected entity and concept IDs", () => {
    const topics = [
      topic({
        id: "cursor-spacex",
        title: "SpaceX options Cursor for $60B",
        wikiIds: ["cursor", "spacex", "coding-agents"],
      }),
      topic({
        id: "cursor-only",
        title: "Composer 2.5",
        wikiIds: ["cursor", "coding-agents"],
      }),
    ];

    expect(
      filterTopicsByExplorerState(topics, {
        entityFilters: ["cursor", "spacex"],
        conceptFilters: ["coding-agents"],
      }).map((candidate) => candidate.id),
    ).toEqual(["cursor-spacex"]);
  });

  it("filters Topics with tokenized text search", () => {
    const topics = [
      topic({
        id: "cursor-spacex",
        title: "SpaceX options Cursor for $60B",
        searchText: "SpaceX options Cursor for $60B Big Tech Moves Sovereign AI Club",
      }),
      topic({
        id: "google-spacex",
        title: "Google rents SpaceX's GPU bridge",
        searchText: "Google rents SpaceX GPU bridge",
      }),
    ];

    expect(
      filterTopicsByExplorerState(topics, { query: "cursor spacex" }).map(
        (candidate) => candidate.id,
      ),
    ).toEqual(["cursor-spacex"]);
  });
});
