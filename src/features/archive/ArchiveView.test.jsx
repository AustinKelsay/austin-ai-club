import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ArchiveView from "./ArchiveView.jsx";

describe("ArchiveView", () => {
  it("renders the poster hero with descriptive alt text", () => {
    const html = renderToStaticMarkup(
      <ArchiveView meetups={[]} nextMeetupId={null} onOpenRoute={() => {}} />,
    );

    expect(html).toContain('src="/brand/hero.jpg"');
    expect(html).toContain("wireframe hand meets a human hand");
    expect(html).toContain('aria-label="Sovereign AI Club"');
  });
});
