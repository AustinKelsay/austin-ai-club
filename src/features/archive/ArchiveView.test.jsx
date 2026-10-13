import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { meetups } from "../../data.js";
import ArchiveView from "./ArchiveView.jsx";

describe("ArchiveView", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows live registration destinations for the upcoming meetup only", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-13T12:00:00-05:00"));
    const upcoming = meetups.find((entry) => entry.slug === "2026-10-21");
    const past = meetups.find((entry) => entry.slug === "2026-09-30");
    const html = renderToStaticMarkup(
      <ArchiveView meetups={[upcoming, past]} nextMeetupId={upcoming.id} onOpenRoute={() => {}} />,
    );
    expect(html).toContain('href="https://luma.com/4v6548j5"');
    expect(html).toContain('href="https://www.meetup.com/bitcoin-park-austin/events/316963193/"');
    expect(html).toContain('href="/meetups/2026-10-21"');
    expect(html).toContain('href="/meetups/2026-09-30"');
    expect(html).not.toContain('href="https://luma.com/g3o10lht"');
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
