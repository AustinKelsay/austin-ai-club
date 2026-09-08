/**
 * Builds the CSS mask that tiles the ASCII wordmark across the page backdrop.
 *
 * The mask is an inline SVG with two brick-offset rows of the wordmark, so the
 * texture reads like the Brand Poster's repeated ASCII rows. Colour comes from
 * the element's `background-color`, which keeps the wallpaper on the token sheet.
 * SVG images cannot load web fonts, so the tile falls back to system monospace.
 */

const FONT_SIZE = 11;
const LINE_HEIGHT = 12;
const ROW_GAP = 36;
const TILE_WIDTH = 420;
const TOP_PADDING = 8;

/**
 * Escapes text for an SVG text node.
 * @param {string} value Raw text
 * @returns {string}
 */
function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/**
 * Renders one wordmark block as SVG text elements.
 * @param {string[]} lines Wordmark lines
 * @param {number} x Left edge in tile pixels
 * @param {number} y Top edge in tile pixels
 * @returns {string}
 */
function renderBlock(lines, x, y) {
  return lines
    .map(
      (line, index) =>
        `<text x='${x}' y='${y + FONT_SIZE + index * LINE_HEIGHT}' xml:space='preserve'>${escapeXml(line)}</text>`,
    )
    .join("");
}

/**
 * Computes the tile height for a wordmark with the given line count.
 * @param {number} lineCount Number of wordmark lines
 * @returns {number}
 */
export function getAsciiWallpaperTileHeight(lineCount) {
  return 2 * (lineCount * LINE_HEIGHT + ROW_GAP);
}

/**
 * Builds a `url("data:image/svg+xml,...")` mask value for the wallpaper.
 * @param {string} asciiText Multi-line ASCII wordmark
 * @returns {{ maskImage: string, width: number, height: number }} CSS mask and tile size
 */
export function buildAsciiWallpaperMask(asciiText) {
  if (typeof asciiText !== "string" || asciiText.trim() === "") {
    throw new Error("buildAsciiWallpaperMask requires non-empty ASCII text");
  }

  const lines = asciiText.split("\n");
  const rowPitch = lines.length * LINE_HEIGHT + ROW_GAP;
  const height = getAsciiWallpaperTileHeight(lines.length);
  const halfWidth = TILE_WIDTH / 2;

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE_WIDTH}' height='${height}' viewBox='0 0 ${TILE_WIDTH} ${height}'>` +
    `<style>text{font:700 ${FONT_SIZE}px/1 Menlo,Consolas,'DejaVu Sans Mono','Liberation Mono',monospace;fill:#000;white-space:pre}</style>` +
    renderBlock(lines, 0, TOP_PADDING) +
    renderBlock(lines, halfWidth, TOP_PADDING + rowPitch) +
    renderBlock(lines, halfWidth - TILE_WIDTH, TOP_PADDING + rowPitch) +
    `</svg>`;

  return {
    maskImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    width: TILE_WIDTH,
    height,
  };
}
