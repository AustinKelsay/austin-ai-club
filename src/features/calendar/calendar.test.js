import { afterEach, describe, expect, it, vi } from "vitest";
import { meetups } from "../../data.js";
import { buildCalendarEntries, getNextSubmissionTarget } from "./calendar.js";

const baseEvent = {
  title: "Sovereign AI Club",
  summary: "Quick AI news rundown, demos, and open discussion.",
  timezone: "America/Chicago",
  locationName: "Bitcoin Park Austin",
  locationAddress: "Austin, TX",
  reminderSendHour: 10,
};

function meetup(slug, startAt, endAt) {
  return {
    id: `meetup-${slug}`,
    slug,
    date: slug,
    event: {
      ...baseEvent,
      startAt,
      endAt,
    },
  };
}

describe("buildCalendarEntries", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("uses the most recent authored meetup time for generated future slots", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-09T12:00:00-05:00"));

    const entries = buildCalendarEntries([
      meetup("2026-03-18", "2026-03-18T17:00:00-05:00", "2026-03-18T19:00:00-05:00"),
      meetup("2026-07-08", "2026-07-08T18:00:00-05:00", "2026-07-08T20:00:00-05:00"),
    ], 1);

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      kind: "generated",
      slug: "2026-07-22",
      event: {
        startAt: "2026-07-22T23:00:00.000Z",
        endAt: "2026-07-23T01:00:00.000Z",
      },
    });
  });

  it("keeps upcoming authored dates and continues their cadence across daylight saving", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-07T12:00:00-05:00"));
    const entries = buildCalendarEntries(meetups, 6);
    expect(entries.map((entry) => entry.slug)).toEqual([
      "2026-09-09", "2026-09-23", "2026-10-07", "2026-10-21", "2026-11-04", "2026-11-18",
    ]);
    expect(entries[0].kind).toBe("authored");
    expect(entries[4].event.startAt).toBe("2026-11-04T23:30:00.000Z");
  });

});

describe("getNextSubmissionTarget", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const cadence = [
    meetup("2026-03-18", "2026-03-18T17:00:00-05:00", "2026-03-18T19:00:00-05:00"),
    meetup("2026-08-05", "2026-08-05T18:00:00-05:00", "2026-08-05T20:00:00-05:00"),
  ];

  it("targets the next authored meetup when one has not ended yet", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-25T13:08:00-05:00"));

    const target = getNextSubmissionTarget([
      ...cadence,
      meetup("2026-08-26", "2026-08-26T18:00:00-05:00", "2026-08-26T20:00:00-05:00"),
    ]);

    expect(target).toMatchObject({
      id: "meetup-2026-08-26",
      kind: "authored",
      slug: "2026-08-26",
    });
  });

  it("targets the default biweekly Meetup Slot after the last authored meetup", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-10T12:00:00-05:00"));

    const target = getNextSubmissionTarget(cadence);

    expect(target).toMatchObject({
      kind: "generated",
      slug: "2026-08-19",
      event: {
        startAt: "2026-08-19T23:00:00.000Z",
        endAt: "2026-08-20T01:00:00.000Z",
      },
    });
  });

  it("targets the next Wednesday when the biweekly slot passed unauthored", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-25T13:08:00-05:00"));

    const target = getNextSubmissionTarget(cadence);

    expect(target).toMatchObject({
      kind: "generated",
      slug: "2026-08-26",
      event: {
        startAt: "2026-08-26T23:00:00.000Z",
        endAt: "2026-08-27T01:00:00.000Z",
      },
    });
  });

  it("targets the following Wednesday after that slipped meeting has already ended", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-26T21:00:00-05:00"));

    const target = getNextSubmissionTarget(cadence);

    expect(target).toMatchObject({
      kind: "generated",
      slug: "2026-09-02",
    });
  });
});

describe("authored Sovereign AI Club event metadata", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("puts 2026-09-09 at AI Freedom Lab at 5:30 PM and keeps past venues", () => {
    const september = meetups.find((meetup) => meetup.slug === "2026-09-09");
    const march = meetups.find((meetup) => meetup.slug === "2026-03-18");

    expect(september.event).toMatchObject({
      title: "Sovereign AI Club",
      locationName: "AI Freedom Lab",
      locationAddress: "Austin, TX",
      startAt: "2026-09-09T17:30:00-05:00",
      endAt: "2026-09-09T19:30:00-05:00",
    });
    expect(march.event).toMatchObject({
      locationName: "Bitcoin Park Austin",
      startAt: "2026-03-18T17:00:00-05:00",
    });
  });

  it("lets later Meetup Slots inherit the 2026-09-09 venue and start time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-10T12:00:00-05:00"));

    const entries = buildCalendarEntries(meetups, 2);

    expect(entries[0]).toMatchObject({
      kind: "generated",
      slug: "2026-09-23",
      event: {
        title: "Sovereign AI Club",
        locationName: "AI Freedom Lab",
        startAt: "2026-09-23T22:30:00.000Z",
        endAt: "2026-09-24T00:30:00.000Z",
        summary: "Quick AI news rundown, demos, and open discussion.",
      },
    });
    expect(entries[1].slug).toBe("2026-10-07");
    expect(entries[1].event.summary).toBe(
      "Biweekly Sovereign AI Club meetup. Full topic board and notes will land closer to the event.",
    );
    expect(entries[1].event.locationName).toBe("AI Freedom Lab");
  });
});
