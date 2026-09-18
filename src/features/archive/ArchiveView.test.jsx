import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { meetups } from "../../data.js";
import ArchiveView from "./ArchiveView.jsx";

describe("ArchiveView", () => {
  it("shows live registration destinations for the public meetup", () => {
    const meetup = meetups.find((entry) => entry.slug === "2026-09-30");
    const html = renderToStaticMarkup(
      <ArchiveView meetups={[meetup]} nextMeetupId={meetup.id} onOpenRoute={() => {}} />,
    );
    expect(html).toContain('href="https://luma.com/g3o10lht"');
    expect(html).toContain('href="https://www.meetup.com/bitcoin-park-austin/events/316616278/"');
    expect(html).toContain('href="https://www.meetup.com/austin-computer-club/events/316617086/"');
    expect(html).not.toContain('href="https://www.meetup.com/austin-computer-club/"');
    expect(html).toContain('href="/meetups/2026-09-30"');
  });

  it("renders the poster hero with descriptive alt text", () => {
    const html = renderToStaticMarkup(
      <ArchiveView meetups={[]} nextMeetupId={null} onOpenRoute={() => {}} />,
    );

    expect(html).toContain('src="/brand/hero.png?v=4d43551b09ae"');
    expect(html).toContain("wireframe hand meets a human hand");
    expect(html).toContain('aria-label="Sovereign AI Club"');
  });
});
