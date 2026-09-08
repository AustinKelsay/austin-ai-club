/**
 * Turns a wiki title, path, or alias into a stable URL-safe page id.
 * @param {unknown} value Title, relative path, or alias
 * @returns {string}
 */
export function normalizeWikiId(value) {
  return String(value ?? "")
    .trim()
    .replace(/\.(md|markdown)$/i, "")
    .replace(/^\.?\//, "")
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Keeps meetup page ids on historical `austin-ai-club-*` slugs after the club rename.
 * Titles and wikilinks may say "Sovereign AI Club"; `/wiki/:id` URLs stay
 * `austin-ai-club-{month}-{day}-{year}`. Entity and concept ids are unchanged.
 * @param {unknown} title Page title or wikilink target
 * @returns {string}
 */
export function stabilizeWikiPageId(title) {
  const rewritten = String(title ?? "").replace(/^Sovereign AI Club\b/, "Austin AI Club");
  return normalizeWikiId(rewritten);
}
