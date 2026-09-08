import { describe, expect, it } from "vitest";
import { buildAsciiWallpaperMask, getAsciiWallpaperTileHeight } from "./asciiWallpaper.js";
import { SOVEREIGN_ASCII } from "./SovereignWordmark.jsx";

describe("asciiWallpaper", () => {
  it("emits a CSS mask backed by an encoded inline SVG", () => {
    const { maskImage, width, height } = buildAsciiWallpaperMask(SOVEREIGN_ASCII);

    expect(maskImage.startsWith('url("data:image/svg+xml,%3Csvg')).toBe(true);
    expect(maskImage.endsWith('%3C%2Fsvg%3E")')).toBe(true);
    expect(width).toBeGreaterThan(0);
    expect(height).toBe(getAsciiWallpaperTileHeight(SOVEREIGN_ASCII.split("\n").length));
  });

  it("escapes markup characters inside the wordmark text", () => {
    const { maskImage } = buildAsciiWallpaperMask("a < b\n& c");
    const svg = decodeURIComponent(maskImage.slice('url("data:image/svg+xml,'.length, -2));

    expect(svg).toContain("a &lt; b");
    expect(svg).toContain("&amp; c");
    expect(svg).not.toContain("a < b");
    expect((svg.match(/<text /g) ?? []).length).toBe(6);
  });

  it("rejects empty input instead of rendering a blank tile", () => {
    expect(() => buildAsciiWallpaperMask("")).toThrow();
    expect(() => buildAsciiWallpaperMask("   ")).toThrow();
  });
});
