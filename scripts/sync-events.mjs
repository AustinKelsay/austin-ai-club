import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { meetups } from "../src/data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const publicDir = path.join(repoRoot, "public");
const calendarDir = path.join(publicDir, "calendar");
const outputPath = path.join(publicDir, "meetups.json");
const siteUrl = (process.env.SITE_URL ?? "https://sovereignai.club").replace(/\/+$/, "");

// Keep this path builder aligned with src/app/routes.js buildMeetupPath() and
// the MEETUP_PATH_PREFIX route shape. scripts/ runs in plain Node, so it cannot
// import the frontend constants module because that file depends on import.meta.env.
function buildMeetupPath(slug) {
  return `/meetups/${encodeURIComponent(slug)}`;
}

function formatTimestamp(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function buildGoogleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatTimestamp(new Date(event.startAt))}/${formatTimestamp(new Date(event.endAt))}`,
    details: event.summary,
    location: [event.locationName, event.locationAddress].filter(Boolean).join(", "),
    ctz: event.timezone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

async function readTextIfExists(targetPath) {
  try {
    return await fs.readFile(targetPath, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function writeTextIfChanged(targetPath, content) {
  const previousContent = await readTextIfExists(targetPath);

  if (previousContent === content) {
    return;
  }

  await fs.writeFile(targetPath, content, "utf8");
}

function withoutGeneratedAt(payload) {
  const { generatedAt, ...stablePayload } = payload;
  return stablePayload;
}

function withoutIcsDtstamp(content) {
  return content.replace(/^DTSTAMP:.*$/m, "DTSTAMP:");
}

function extractIcsDtstamp(content) {
  return content.match(/^DTSTAMP:(.+)$/m)?.[1] ?? null;
}

function getEventRevisionTimestamp(event) {
  return formatTimestamp(new Date(event.updatedAt ?? event.startAt));
}

function buildIcsBody(event, detailsUrl, dtstamp) {
  const location = [event.locationName, event.locationAddress].filter(Boolean).join(", ");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sovereign AI Club//Meetups//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    // Keep legacy UIDs stable so the domain migration does not duplicate events.
    `UID:${event.id}@austinai.club`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${formatTimestamp(new Date(event.startAt))}`,
    `DTEND:${formatTimestamp(new Date(event.endAt))}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(`${event.summary}\n\nDetails: ${detailsUrl}`)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `URL:${escapeIcsText(detailsUrl)}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ];

  return lines.join("\r\n");
}

async function buildStableIcsBody(event) {
  const targetPath = path.join(publicDir, event.icsPath);
  const previousContent = await readTextIfExists(targetPath);
  const fallbackDtstamp = getEventRevisionTimestamp(event);
  const candidateBody = buildIcsBody(event, event.detailsUrl, fallbackDtstamp);

  if (!previousContent) {
    return candidateBody;
  }

  if (withoutIcsDtstamp(previousContent) !== withoutIcsDtstamp(candidateBody)) {
    return candidateBody;
  }

  return buildIcsBody(
    event,
    event.detailsUrl,
    extractIcsDtstamp(previousContent) ?? fallbackDtstamp,
  );
}

function collectEvents() {
  return meetups
    .filter((meetup) => meetup.event)
    .map((meetup) => {
      const event = meetup.event;
      const detailsUrl = `${siteUrl}${buildMeetupPath(meetup.slug)}`;
      const icsPath = `/calendar/${meetup.slug}.ics`;

      return {
        id: meetup.slug,
        meetupId: meetup.id,
        slug: meetup.slug,
        dateLabel: meetup.date,
        markdownHref: meetup.markdownHref,
        title: event.title,
        summary: event.summary,
        startAt: event.startAt,
        endAt: event.endAt,
        timezone: event.timezone,
        locationName: event.locationName,
        locationAddress: event.locationAddress,
        reminderSendHour: event.reminderSendHour,
        detailsUrl,
        googleCalendarUrl: buildGoogleCalendarUrl({
          ...event,
          id: meetup.slug,
        }),
        icsUrl: `${siteUrl}${icsPath}`,
        icsPath,
      };
    });
}

async function main() {
  const events = collectEvents();

  await fs.mkdir(calendarDir, { recursive: true });
  await Promise.all(
    events.map(async (event) => {
      const icsBody = await buildStableIcsBody(event);
      await writeTextIfChanged(path.join(publicDir, event.icsPath), icsBody);
    }),
  );

  const previousPayloadContent = await readTextIfExists(outputPath);
  const previousPayload = previousPayloadContent ? JSON.parse(previousPayloadContent) : null;
  const nextPayload = {
    generatedAt: new Date().toISOString(),
    siteUrl,
    events: events.map(({ icsPath, ...event }) => event),
  };
  const payload =
    previousPayload &&
    JSON.stringify(withoutGeneratedAt(previousPayload)) === JSON.stringify(withoutGeneratedAt(nextPayload))
      ? { ...nextPayload, generatedAt: previousPayload.generatedAt }
      : nextPayload;

  await writeTextIfChanged(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
