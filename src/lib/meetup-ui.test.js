import { afterEach, describe, expect, it } from "vitest";
import {
  createInlineIcsHref,
  escapeIcsText,
  formatEventLongDate,
  formatEventTime,
  formatEventWeekday,
} from "./meetup-ui.js";

const originalWindow = globalThis.window;

const eveningEvent = {
  startAt: "2026-09-09T22:30:00.000Z",
  endAt: "2026-09-10T00:30:00.000Z",
  timezone: "America/Chicago",
};

describe("event formatters", () => {
  it("collapses a shared day period and zone into one range", () => {
    expect(formatEventTime(eveningEvent)).toBe("5:30 – 7:30 PM CDT");
  });

  it("keeps both day periods when the range crosses noon", () => {
    expect(
      formatEventTime({ ...eveningEvent, startAt: "2026-09-09T16:30:00.000Z", endAt: "2026-09-09T18:30:00.000Z" }),
    ).toBe("11:30 AM – 1:30 PM CDT");
  });

  it("formats the weekday and long date in the event time zone", () => {
    expect(formatEventWeekday(eveningEvent)).toBe("Wednesday");
    expect(formatEventLongDate(eveningEvent)).toBe("Wednesday, September 9");
  });
});

describe("escapeIcsText", () => {
  it("escapes text characters that have special meaning in ICS fields", () => {
    expect(escapeIcsText("A, B; C\\D\nE")).toBe("A\\, B\\; C\\\\D\\nE");
  });
});

describe("createInlineIcsHref", () => {
  afterEach(() => {
    globalThis.window = originalWindow;
  });

  it("escapes generated ICS text fields", () => {
    globalThis.window = {
      location: {
        href: "https://austinai.club/calendar",
        origin: "https://austinai.club",
      },
    };

    const href = createInlineIcsHref({
      id: "generated-2026-07-22",
      detailsHref: null,
      event: {
        title: "Austin, AI; Club",
        summary: "Quick AI news rundown,\nwith demos; and back\\slashes.",
        startAt: "2026-07-22T23:00:00.000Z",
        endAt: "2026-07-23T01:00:00.000Z",
        timezone: "America/Chicago",
        locationName: "Bitcoin Park Austin",
        locationAddress: "Austin, TX",
      },
    });
    const body = decodeURIComponent(href.replace(/^data:text\/calendar;charset=utf-8,/, ""));

    expect(body).toContain("PRODID:-//Sovereign AI Club//Meetups//EN");
    expect(body).toContain("SUMMARY:Austin\\, AI\\; Club");
    expect(body).toContain("DESCRIPTION:Quick AI news rundown\\,\\nwith demos\\; and back\\\\slashes.");
    expect(body).toContain("Details: https://austinai.club/calendar");
    expect(body).toContain("LOCATION:Bitcoin Park Austin\\, Austin\\, TX");
  });
});
