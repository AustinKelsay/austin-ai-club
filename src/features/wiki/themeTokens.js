/**
 * Reads CSS custom properties with fallbacks so graph and legend colors
 * stay on the same token sheet as the stylesheets.
 *
 * Canvas code calls this per frame, so values are cached after the first read.
 */

const DEFAULTS = {
  "--graph-meetup": "#5ccb89",
  "--graph-entity": "#7fa6ff",
  "--graph-concept": "#e3b94d",
  "--graph-comparison": "#f08a8a",
  "--graph-query": "#f2a566",
  "--graph-node-default": "#9fb0a6",
  "--graph-node-selected": "#f2f7f3",
  "--graph-topic-link": "rgba(127, 166, 255, 0.45)",
  "--graph-wiki-link": "rgba(159, 176, 166, 0.22)",
  "--graph-topic-link-selected": "rgba(127, 166, 255, 0.85)",
  "--graph-wiki-link-selected": "rgba(159, 176, 166, 0.85)",
  "--graph-topic-link-dim": "rgba(127, 166, 255, 0.08)",
  "--graph-wiki-link-dim": "rgba(159, 176, 166, 0.08)",
  "--graph-label-bg": "rgba(23, 31, 26, 0.9)",
};

/** @type {Map<string, string>} */
const cache = new Map();

/**
 * Reads a CSS custom property from the document root.
 * @param {string} name Token name including the leading dashes
 * @returns {string} Computed token or the matching fallback
 */
export function readThemeToken(name) {
  if (typeof document !== "undefined") {
    const cached = cache.get(name);
    if (cached) {
      return cached;
    }

    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (value) {
      cache.set(name, value);
      return value;
    }
  }

  const fallback = DEFAULTS[name];
  if (!fallback) {
    throw new Error(`Missing theme token: ${name}`);
  }

  return fallback;
}
