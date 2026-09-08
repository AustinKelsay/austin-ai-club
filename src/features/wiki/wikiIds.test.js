import { describe, expect, it } from "vitest";
import { normalizeWikiId, stabilizeWikiPageId } from "./wikiIds.js";

describe("stabilizeWikiPageId", () => {
  it("keeps Sovereign meetup titles on historical austin-ai-club ids", () => {
    expect(stabilizeWikiPageId("Sovereign AI Club - April 1, 2026")).toBe(
      "austin-ai-club-april-1-2026",
    );
    expect(stabilizeWikiPageId("Austin AI Club - April 1, 2026")).toBe(
      "austin-ai-club-april-1-2026",
    );
  });

  it("leaves entity and concept titles unchanged", () => {
    expect(stabilizeWikiPageId("OpenAI")).toBe(normalizeWikiId("OpenAI"));
    expect(stabilizeWikiPageId("Coding Agents")).toBe("coding-agents");
  });
});
