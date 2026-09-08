import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import CalendarView from "./CalendarView.jsx";

const originalWindow = globalThis.window;

afterEach(() => {
  globalThis.window = originalWindow;
});

const event = {
  title: "Sovereign AI Club",
  summary: "Quick AI news rundown, demos, and open discussion.",
  startAt: "2026-09-09T17:30:00-05:00",
  endAt: "2026-09-09T19:30:00-05:00",
  timezone: "America/Chicago",
  locationName: "AI Freedom Lab",
  locationAddress: "Austin, TX",
};

describe("CalendarView", () => {
  it("names Sovereign AI Club and the biweekly cadence", () => {
    globalThis.window = {
      location: { href: "https://austinai.club/calendar" },
    };

    const html = renderToStaticMarkup(
      <CalendarView
        calendarEntries={[
          {
            id: "meetup-2026-09-09",
            kind: "authored",
            slug: "2026-09-09",
            date: "September 9, 2026",
            detailsHref: "/meetups/2026-09-09",
            event,
          },
        ]}
        nextMeetup={{ event }}
        onClose={() => {}}
        onOpenRoute={() => {}}
      />,
    );

    expect(html).toContain("Sovereign AI Club every two weeks");
    expect(html).not.toContain("Austin AI Club");
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="2026-09-09, scheduled meetup"');
    expect(html).toContain('aria-pressed="true"');
    expect(html).not.toContain('role="gridcell"');
  });
});
