/**
 * Wiki graph node types with their color tokens.
 * DOM consumers use `cssColor` (a `var()` reference);
 * canvas consumers resolve hex values through `getWikiGraphTypeColors()`.
 */
import { readThemeToken } from "./themeTokens.js";

export const WIKI_GRAPH_TYPES = [
  { type: "meetup", label: "Meetup", token: "--graph-meetup" },
  { type: "entity", label: "Entity", token: "--graph-entity" },
  { type: "concept", label: "Concept", token: "--graph-concept" },
  { type: "comparison", label: "Comparison", token: "--graph-comparison" },
  { type: "query", label: "Query", token: "--graph-query" },
].map((graphType) => ({ ...graphType, cssColor: `var(${graphType.token})` }));

/**
 * Resolves the current computed color for every graph type.
 * Resolve once when a graph mounts, then reuse the map in canvas callbacks.
 * @returns {Record<string, string>} Type name to hex color
 */
export function getWikiGraphTypeColors() {
  return Object.fromEntries(
    WIKI_GRAPH_TYPES.map(({ type, token }) => [type, readThemeToken(token)]),
  );
}
