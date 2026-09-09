export function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toGoogleCalendarTimestamp(value) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function buildGoogleCalendarUrl(meetup) {
  const event = meetup.event;

  if (!event) {
    return "";
  }

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toGoogleCalendarTimestamp(event.startAt)}/${toGoogleCalendarTimestamp(event.endAt)}`,
    details: event.summary,
    location: [event.locationName, event.locationAddress].filter(Boolean).join(", "),
    ctz: event.timezone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsHref(meetup) {
  return `/calendar/${meetup.slug}.ics`;
}

export function escapeIcsText(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function formatEventDate(event) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: event.timezone,
  }).format(new Date(event.startAt));
}

/**
 * Formats the weekday of an event in its own time zone, e.g. "Wednesday".
 * Used next to a heading that already carries the full date.
 */
export function formatEventWeekday(event) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: event.timezone,
  }).format(new Date(event.startAt));
}

/**
 * Formats the weekday, month, and day of an event, e.g. "Wednesday, September 9".
 */
export function formatEventLongDate(event) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: event.timezone,
  }).format(new Date(event.startAt));
}

/**
 * Formats the start–end range once, e.g. "5:30 – 7:30 PM CDT".
 * Shared day period and zone are collapsed instead of repeated on both ends.
 */
export function formatEventTime(event) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: event.timezone,
    timeZoneName: "short",
  });

  return formatter
    .formatRange(new Date(event.startAt), new Date(event.endAt))
    .replace(/[\u2009\u202f]/g, " ");
}

export function getLocationLabel(event) {
  return [event.locationName, event.locationAddress].filter(Boolean).join(" · ");
}

export function formatDateKey(value, timeZone = "America/Chicago") {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone,
  }).formatToParts(new Date(value));

  const part = (type) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function addDays(value, days) {
  const next = new Date(value);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

export function createInlineIcsHref(entry) {
  const { event } = entry;
  const location = [event.locationName, event.locationAddress].filter(Boolean).join(", ");
  const detailsUrl = entry.detailsHref
    ? `${window.location.origin}${entry.detailsHref}`
    : window.location.href;
  const revisionTimestamp = event.updatedAt ?? event.startAt;
  const description = `${event.summary}\n\nDetails: ${detailsUrl}`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sovereign AI Club//Meetups//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    // Keep legacy UIDs stable so the domain migration does not duplicate events.
    `UID:${entry.id}@austinai.club`,
    `DTSTAMP:${toGoogleCalendarTimestamp(revisionTimestamp)}`,
    `DTSTART:${toGoogleCalendarTimestamp(event.startAt)}`,
    `DTEND:${toGoogleCalendarTimestamp(event.endAt)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `URL:${escapeIcsText(detailsUrl)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export function isUpcomingMeetup(meetup) {
  if (!meetup.event) {
    return false;
  }

  return new Date(meetup.event.endAt).getTime() >= Date.now();
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
