import { describe, expect, it } from "vitest";
import { formatRelativeDate, getMeetupDateFromTitle } from "./wikiDates.js";

describe("wikiDates", () => {
  it("formats past dates as a relative phrase", () => {
    const now = new Date("2026-06-10T12:00:00Z");
    const oneDayAgo = "2026-06-09T12:00:00Z";
    const formatted = formatRelativeDate(oneDayAgo, now);

    expect(formatted).toMatch(/1 day ago|yesterday/);
  });

  it("formats future dates as forward-relative", () => {
    const now = new Date("2026-06-10T12:00:00Z");
    const inTwoDays = "2026-06-12T12:00:00Z";
    const formatted = formatRelativeDate(inTwoDays, now);

    expect(formatted).toMatch(/in 2 days/);
  });

  it("returns an empty string for missing or invalid values", () => {
    expect(formatRelativeDate("")).toBe("");
    expect(formatRelativeDate("not-a-date", new Date())).toBe("");
  });

  it("extracts a YYYY-MM-DD date from a title when present in ISO form", () => {
    expect(getMeetupDateFromTitle("Sovereign AI Club - 2026-06-10 - notes")).toBe("2026-06-10");
    expect(getMeetupDateFromTitle("Q1 update — 2026-04-01 wrap")).toBe("2026-04-01");
  });

  it("returns null when no ISO date is present", () => {
    expect(getMeetupDateFromTitle("OpenAI")).toBeNull();
    expect(getMeetupDateFromTitle("Sovereign AI Club - June 10, 2026")).toBeNull();
    expect(getMeetupDateFromTitle("")).toBeNull();
  });
});
