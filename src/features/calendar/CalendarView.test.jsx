import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import CalendarView from "./CalendarView.jsx";

const originalWindow = globalThis.window;

afterEach(() => {
  globalThis.window = originalWindow;
  vi.useRealTimers();
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

const entry = {
  id: "meetup-2026-09-09",
  kind: "authored",
  slug: "2026-09-09",
  date: "September 9, 2026",
  detailsHref: "/meetups/2026-09-09",
  event,
};

function renderCalendar() {
  globalThis.window = {
    location: { href: "https://austinai.club/calendar" },
  };

  return renderToStaticMarkup(
    <CalendarView
      calendarEntries={[entry]}
      nextMeetup={{ event }}
      onClose={() => {}}
      onOpenRoute={() => {}}
    />,
  );
}

describe("CalendarView", () => {
  it("names Sovereign AI Club and marks scheduled meetups", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-01T12:00:00-05:00"));
    const html = renderCalendar();

    expect(html).toContain("Sovereign AI Club calendar");
    expect(html).not.toContain("Austin AI Club");
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="2026-09-09, scheduled meetup"');
    expect(html).toContain('aria-pressed="true"');
    expect(html).not.toContain('role="gridcell"');
    expect(html).toContain("download ICS");
  });

  it("marks ended meetups as past and drops their calendar actions", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-10T12:00:00-05:00"));
    const html = renderCalendar();

    expect(html).toContain('aria-label="2026-09-09, past meetup"');
    expect(html).not.toContain("download ICS");
    expect(html).toContain("open meetup page");
  });
});
