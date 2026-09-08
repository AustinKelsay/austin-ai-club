import { describe, expect, it } from "vitest";
import {
  BASE_NODE_VAL,
  buildNeighborIds,
  buildNodeTooltip,
  DEGREE_VAL_MULTIPLIER,
  getLinkColor,
  getLinkParticleCount,
  getLinkWidth,
  getNodeColor,
  getNodeVal,
  isNeighborLink,
  isNeighborNode,
  isSelectedNode,
  MAX_NEIGHBOR_NODE_VAL,
  MAX_NODE_VAL,
  SELECTED_NODE_VAL,
  shouldShowNodeLabel,
} from "./wikiGraphVisuals.js";

describe("wikiGraphVisuals", () => {
  it("scales node size by degree when not selected", () => {
    expect(getNodeVal({ id: "a", degree: 0 }, "x")).toBe(BASE_NODE_VAL);
    expect(getNodeVal({ id: "a", degree: 5 }, "x")).toBeCloseTo(
      BASE_NODE_VAL + 5 * DEGREE_VAL_MULTIPLIER,
    );
  });

  it("forces a flat selected size regardless of degree", () => {
    expect(getNodeVal({ id: "a", degree: 30 }, "a")).toBe(SELECTED_NODE_VAL);
  });

  it("enlarges neighbor nodes inside the selected neighborhood", () => {
    const neighbors = new Set(["b"]);
    const neighborValue = getNodeVal({ id: "b", degree: 4 }, "a", neighbors);
    const unrelatedValue = getNodeVal({ id: "c", degree: 4 }, "a", neighbors);

    expect(neighborValue).toBeGreaterThan(unrelatedValue);
    expect(neighborValue).toBeCloseTo(BASE_NODE_VAL + 1.2 + 4 * (DEGREE_VAL_MULTIPLIER * 0.5));
  });

  it("caps high-degree hub sizes so focused graph nodes stay readable", () => {
    const neighbors = new Set(["b"]);

    expect(getNodeVal({ id: "b", degree: 200 }, "a", neighbors)).toBe(MAX_NEIGHBOR_NODE_VAL);
    expect(getNodeVal({ id: "c", degree: 200 }, "a", neighbors)).toBe(MAX_NODE_VAL);
  });

  it("uses the type color or falls back to neutral", () => {
    const colors = { entity: "#47d4f3" };
    expect(getNodeColor({ id: "a", type: "entity" }, null, colors)).toBe("rgba(71, 212, 243, 1)");
    expect(getNodeColor({ id: "a", type: "concept" }, null, colors)).toBe(
      "rgba(159, 176, 166, 1)",
    );
  });

  it("overrides the node color when selected", () => {
    expect(getNodeColor({ id: "a", type: "entity" }, "a", { entity: "#47d4f3" })).toBe("#f2f7f3");
  });

  it("fades non-neighbor nodes when a node is selected", () => {
    const colors = { entity: "#47d4f3", concept: "#c47df3" };
    const neighbors = new Set(["b"]);

    expect(getNodeColor({ id: "a", type: "entity" }, "a", colors, neighbors)).toBe("#f2f7f3");
    expect(getNodeColor({ id: "b", type: "concept" }, "a", colors, neighbors)).toBe(
      "rgba(196, 125, 243, 1)",
    );
    expect(getNodeColor({ id: "c", type: "entity" }, "a", colors, neighbors)).toBe(
      "rgba(71, 212, 243, 0.16)",
    );
  });

  it("identifies selected and neighbor nodes", () => {
    const neighbors = new Set(["b", "c"]);

    expect(isSelectedNode({ id: "a" }, "a")).toBe(true);
    expect(isSelectedNode({ id: "b" }, "a")).toBe(false);
    expect(isNeighborNode({ id: "b" }, "a", neighbors)).toBe(true);
    expect(isNeighborNode({ id: "d" }, "a", neighbors)).toBe(false);
    expect(isNeighborNode({ id: "a" }, "a", neighbors)).toBe(false);
  });

  it("identifies links connected to a selected node and its neighbors", () => {
    const neighbors = new Set(["b", "c"]);

    expect(isNeighborLink({ source: "a", target: "b" }, "a", neighbors)).toBe(true);
    expect(isNeighborLink({ source: "b", target: "a" }, "a", neighbors)).toBe(true);
    expect(isNeighborLink({ source: "b", target: "c" }, "a", neighbors)).toBe(false);
    expect(isNeighborLink({ source: "d", target: "e" }, "a", neighbors)).toBe(false);
  });

  it("builds a set of neighbor ids from link data", () => {
    const links = [
      { source: "a", target: "b" },
      { source: "a", target: "c" },
      { source: "b", target: "d" },
    ];

    expect([...buildNeighborIds(links, "a")].sort()).toEqual(["b", "c"]);
    expect([...buildNeighborIds(links, "b")].sort()).toEqual(["a", "d"]);
    expect(buildNeighborIds(links, "z").size).toBe(0);
    expect(buildNeighborIds(links, null).size).toBe(0);
  });

  it("handles object-style link endpoints when building neighbors", () => {
    const links = [
      { source: { id: "a" }, target: { id: "b" } },
      { source: { id: "c" }, target: { id: "a" } },
    ];

    expect([...buildNeighborIds(links, "a")].sort()).toEqual(["b", "c"]);
  });

  it("styles topic links brighter and wider than wiki links", () => {
    expect(getLinkColor({ kind: "topic" })).toContain("127, 166, 255");
    expect(getLinkColor({ kind: "wiki" })).toContain("159, 176, 166");
    expect(getLinkWidth({ kind: "topic" })).toBeGreaterThan(getLinkWidth({ kind: "wiki" }));
    expect(getLinkParticleCount({ kind: "topic" })).toBe(1);
    expect(getLinkParticleCount({ kind: "wiki" })).toBe(0);
  });

  it("highlights links connected to the selected node", () => {
    const neighbors = new Set(["b"]);
    const topicLink = { kind: "topic", source: "a", target: "b" };
    const wikiLink = { kind: "wiki", source: "b", target: "c" };

    expect(getLinkColor(topicLink, "a", neighbors)).toContain("0.85");
    expect(getLinkColor(wikiLink, "a", neighbors)).toContain("0.08");
    expect(getLinkWidth(topicLink, "a", neighbors)).toBeGreaterThan(
      getLinkWidth(wikiLink, "a", neighbors),
    );
  });

  it("only animates selected-neighborhood topic links when focused", () => {
    const neighbors = new Set(["b"]);
    const neighborTopicLink = { kind: "topic", source: "a", target: "b" };
    const unrelatedTopicLink = { kind: "topic", source: "c", target: "d" };

    expect(getLinkParticleCount(neighborTopicLink, "a", neighbors)).toBe(1);
    expect(getLinkParticleCount(unrelatedTopicLink, "a", neighbors)).toBe(0);
  });

  it("falls back to default link styling when no node is selected", () => {
    const topicLink = { kind: "topic", source: "a", target: "b" };

    expect(getLinkColor(topicLink)).toContain("0.45");
    expect(getLinkWidth(topicLink)).toBeGreaterThan(0);
  });

  it("shows labels for selected, neighbor, or high-degree nodes", () => {
    const neighbors = new Set(["b"]);

    expect(shouldShowNodeLabel({ id: "a", degree: 1 }, "a")).toBe(true);
    expect(shouldShowNodeLabel({ id: "b", degree: 1 }, "a", neighbors)).toBe(true);
    expect(shouldShowNodeLabel({ id: "c", degree: 10 }, "a", neighbors)).toBe(false);
    expect(shouldShowNodeLabel({ id: "a", degree: 10 }, null, 8)).toBe(true);
    expect(shouldShowNodeLabel({ id: "a", degree: 5 }, null, 8)).toBe(false);
  });

  it("builds a tooltip with title, type, and link count", () => {
    const tooltip = buildNodeTooltip({ label: "OpenAI", type: "entity", degree: 4 });

    expect(tooltip).toContain("OpenAI");
    expect(tooltip).toContain("entity");
    expect(tooltip).toContain("4 links");
    expect(tooltip).toContain("wiki-graph-tooltip");
  });

  it("uses singular link label for single-degree nodes", () => {
    const tooltip = buildNodeTooltip({ label: "Apple", type: "entity", degree: 1 });

    expect(tooltip).toContain("1 link<");
    expect(tooltip).not.toContain("1 links");
  });

  it("escapes HTML in tooltip labels", () => {
    const tooltip = buildNodeTooltip({ label: "<img src=x>", type: "entity", degree: 1 });

    expect(tooltip).toContain("&lt;img src=x&gt;");
    expect(tooltip).not.toContain("<img src=x>");
  });
});
