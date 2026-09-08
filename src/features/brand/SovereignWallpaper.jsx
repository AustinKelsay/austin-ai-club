/**
 * Fixed, decorative wallpaper layer that tiles the ASCII wordmark behind the page.
 * Mounted once per stacking context (page root and Presentation Mode overlay).
 */
import { useMemo } from "react";
import { buildAsciiWallpaperMask } from "./asciiWallpaper.js";
import { SOVEREIGN_ASCII } from "./SovereignWordmark.jsx";

/**
 * Renders the wallpaper layer. Styling lives in `.ascii-wallpaper` (base.css).
 */
export default function SovereignWallpaper() {
  const style = useMemo(() => {
    const { maskImage, width, height } = buildAsciiWallpaperMask(SOVEREIGN_ASCII);
    const maskSize = `${width}px ${height}px`;

    return {
      WebkitMaskImage: maskImage,
      maskImage,
      WebkitMaskSize: maskSize,
      maskSize,
      "--wallpaper-tile-height": `${height}px`,
    };
  }, []);

  return <div className="ascii-wallpaper" aria-hidden="true" style={style} />;
}
