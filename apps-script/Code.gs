const CONFIG = {
  subscribersSheet: "subscribers",
  deliveriesSheet: "deliveries",
  defaultFeedUrl: "https://austinai.club/meetups.json",
  iframeMessageSource: "austin-ai-reminder-signup",
  reminderHour: 10,
};

function doPost(e) {
  const email = normalizeEmail_(e?.parameter?.email);
  if (!email) {
    return renderIframeResponse_("Enter a valid email address and try again.", "error");
  }

  setupReminderSheets();
  upsertSubscriber_(email, {
    source: e?.parameter?.source || "site",
    pageUrl: e?.parameter?.pageUrl || "",
  });

  return renderIframeResponse_("You are subscribed to Sovereign AI Club reminders.", "success");
}

function doGet(e) {
  if (e?.parameter?.unsubscribe !== "1") {
    return renderPage_("Sovereign AI Club reminders are online.");
  }

  const email = normalizeEmail_(e?.parameter?.email);
  const token = e?.parameter?.token || "";

  if (!email || !isValidUnsubscribeToken_(email, token)) {
    return renderPage_("This unsubscribe link is invalid or expired.");
  }

  setupReminderSheets();
  upsertSubscriber_(email, {
    status: "unsubscribed",
    source: "unsubscribe",
    pageUrl: "",
  });

  return renderPage_("You have been unsubscribed from Sovereign AI Club reminders.");
}

function sendTodayReminders() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) {
    return;
  }

  try {
    sendTodayReminders_();
  } finally {
    lock.releaseLock();
  }
}

function sendTodayReminders_() {
  const timezone = getTimezone_();
  const currentHour = Number(Utilities.formatDate(new Date(), timezone, "H"));
  setupReminderSheets();

  const today = Utilities.formatDate(new Date(), timezone, "yyyy-MM-dd");
  const events = getUpcomingEvents_().filter((event) =>
    event.localDate === today && Number(event.reminderSendHour || CONFIG.reminderHour) === currentHour);
  if (!events.length) {
    return;
  }

  const subscribers = getActiveSubscribers_();
  if (!subscribers.length) {
    return;
  }

  events.forEach((event) => {
    subscribers.forEach((subscriber) => {
      if (deliveryExists_(event.id, subscriber.email)) {
        return;
      }

      sendReminderEmail_(subscriber.email, event);
      logDelivery_(event.id, subscriber.email);
    });
  });
}

function sendSmokeTestReminder() {
  setupReminderSheets();
  const subscriber = getLatestActiveSubscriber_();
  if (!subscriber) {
    throw new Error("No active subscribers found for the smoke test.");
  }

  const event = buildSmokeTestEvent_();
  sendReminderEmail_(subscriber.email, event);
  logDelivery_(event.id, subscriber.email);
}

function installReminderTrigger() {
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === "sendTodayReminders")
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger("sendTodayReminders")
    .timeBased()
    .everyHours(1)
    .create();
}

function setupReminderSheets() {
  ensureSheet_(CONFIG.subscribersSheet, [
    "email",
    "status",
    "createdAt",
    "updatedAt",
    "source",
    "pageUrl",
  ]);
  ensureSheet_(CONFIG.deliveriesSheet, [
    "eventId",
    "email",
    "sentAt",
  ]);
}

function getUpcomingEvents_() {
  const response = UrlFetchApp.fetch(getEventsFeedUrl_(), {
    muteHttpExceptions: false,
  });
  const payload = JSON.parse(response.getContentText());
  const timezone = getTimezone_();

  return (payload.events || []).map((event) => ({
    id: event.id,
    title: event.title,
    summary: event.summary,
    startAt: event.startAt,
    endAt: event.endAt,
    reminderSendHour: event.reminderSendHour,
    locationName: event.locationName,
    locationAddress: event.locationAddress,
    googleCalendarUrl: event.googleCalendarUrl,
    icsUrl: event.icsUrl,
    detailsUrl: event.detailsUrl,
    localDate: Utilities.formatDate(new Date(event.startAt), timezone, "yyyy-MM-dd"),
  }));
}

function getActiveSubscribers_() {
  const sheet = getSpreadsheet_().getSheetByName(CONFIG.subscribersSheet);
  const rows = sheet.getDataRange().getValues();

  return rows
    .slice(1)
    .filter((row) => row[0] && row[1] === "active")
    .map((row) => ({
      email: String(row[0]).trim().toLowerCase(),
    }));
}

function getLatestActiveSubscriber_() {
  const sheet = getSpreadsheet_().getSheetByName(CONFIG.subscribersSheet);
  const rows = sheet.getDataRange().getValues().slice(1);

  const activeRows = rows
    .filter((row) => row[0] && row[1] === "active")
    .sort((left, right) => new Date(right[3] || right[2]).getTime() - new Date(left[3] || left[2]).getTime());

  if (!activeRows.length) {
    return null;
  }

  return {
    email: String(activeRows[0][0]).trim().toLowerCase(),
  };
}

function deliveryExists_(eventId, email) {
  const sheet = getSpreadsheet_().getSheetByName(CONFIG.deliveriesSheet);
  const rows = sheet.getDataRange().getValues();

  return rows.slice(1).some((row) => row[0] === eventId && row[1] === email);
}

function logDelivery_(eventId, email) {
  const sheet = getSpreadsheet_().getSheetByName(CONFIG.deliveriesSheet);
  sheet.appendRow([eventId, email, new Date().toISOString()]);
}

function upsertSubscriber_(email, options) {
  const settings = options || {};
  const status = settings.status || "active";
  const source = settings.source || "site";
  const pageUrl = settings.pageUrl || "";
  const sheet = getSpreadsheet_().getSheetByName(CONFIG.subscribersSheet);
  const rows = sheet.getDataRange().getValues();
  const timestamp = new Date().toISOString();

  for (let index = 1; index < rows.length; index += 1) {
    if (String(rows[index][0]).trim().toLowerCase() !== email) {
      continue;
    }

    sheet.getRange(index + 1, 2, 1, 5).setValues([[status, rows[index][2] || timestamp, timestamp, source, pageUrl]]);
    return;
  }

  sheet.appendRow([email, status, timestamp, timestamp, source, pageUrl]);
}

function sendReminderEmail_(email, event) {
  const unsubscribeUrl = `${getReminderEndpointUrl_()}?unsubscribe=1&email=${encodeURIComponent(email)}&token=${encodeURIComponent(buildUnsubscribeToken_(email))}`;
  const location = [event.locationName, event.locationAddress].filter(Boolean).join(", ");
  const start = Utilities.formatDate(new Date(event.startAt), getTimezone_(), "EEEE, MMMM d 'at' h:mm a z");
  const links = [
    event.detailsUrl ? `<a href="${event.detailsUrl}">Event details</a>` : "",
    event.googleCalendarUrl ? `<a href="${event.googleCalendarUrl}">Add to Google Calendar</a>` : "",
    event.icsUrl ? `<a href="${event.icsUrl}">Download ICS</a>` : "",
  ].filter(Boolean);

  MailApp.sendEmail({
    to: email,
    subject: `${event.title} today at ${start}`,
    htmlBody: [
      `<p>${escapeHtml_(event.title)} meets today at ${escapeHtml_(start)}.</p>`,
      `<p>${escapeHtml_(event.summary)}</p>`,
      `<p><strong>Location:</strong> ${escapeHtml_(location)}</p>`,
      links.length ? `<p>${links.join("<br />")}</p>` : "",
      `<p><a href="${unsubscribeUrl}">Unsubscribe</a></p>`,
    ].join(""),
  });
}

function buildSmokeTestEvent_() {
  const timezone = getTimezone_();
  const start = new Date(Date.now() + 60 * 60 * 1000);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const timestamp = Utilities.formatDate(new Date(), timezone, "yyyyMMdd-HHmmss");

  return {
    id: `smoke-test-${timestamp}`,
    title: "Sovereign AI Club Smoke Test",
    summary: "Temporary reminder email to verify the Sovereign AI Club reminder flow end-to-end.",
    startAt: start.toISOString(),
    endAt: end.toISOString(),
    locationName: "Bitcoin Park Austin",
    locationAddress: "Austin, TX",
    detailsUrl: "https://austinai.club/calendar",
    googleCalendarUrl: buildGoogleCalendarUrl_(start, end),
    icsUrl: "",
  };
}

function buildGoogleCalendarUrl_(start, end) {
  return [
    "https://calendar.google.com/calendar/render?action=TEMPLATE",
    `text=${encodeURIComponent("Sovereign AI Club Smoke Test")}`,
    `dates=${encodeURIComponent(formatCalendarDate_(start) + "/" + formatCalendarDate_(end))}`,
    `details=${encodeURIComponent("Temporary reminder email to verify the Sovereign AI Club reminder flow end-to-end.")}`,
    `location=${encodeURIComponent("Bitcoin Park Austin, Austin, TX")}`,
    `ctz=${encodeURIComponent(getTimezone_())}`,
  ].join("&");
}

function formatCalendarDate_(date) {
  return Utilities.formatDate(date, "UTC", "yyyyMMdd'T'HHmmss'Z'");
}

function ensureSheet_(name, headers) {
  const spreadsheet = getSpreadsheet_();
  const existing = spreadsheet.getSheetByName(name);
  if (existing) {
    return existing;
  }

  const sheet = spreadsheet.insertSheet(name);
  sheet.appendRow(headers);
  sheet.setFrozenRows(1);
  return sheet;
}

function getSpreadsheet_() {
  const sheetId = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (sheetId) {
    return SpreadsheetApp.openById(sheetId);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getEventsFeedUrl_() {
  return PropertiesService.getScriptProperties().getProperty("EVENTS_FEED_URL") || CONFIG.defaultFeedUrl;
}

function getReminderEndpointUrl_() {
  return PropertiesService.getScriptProperties().getProperty("REMINDER_ENDPOINT_URL") || "";
}

function getTimezone_() {
  return Session.getScriptTimeZone() || "America/Chicago";
}

function normalizeEmail_(value) {
  const email = String(value || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

function getUnsubscribeSecret_() {
  const secret = PropertiesService.getScriptProperties().getProperty("UNSUBSCRIBE_SECRET");
  if (!secret) {
    throw new Error("Set the UNSUBSCRIBE_SECRET script property before sending reminders.");
  }
  return secret;
}

function buildUnsubscribeToken_(email) {
  const signature = Utilities.computeHmacSha256Signature(email, getUnsubscribeSecret_());
  return Utilities.base64EncodeWebSafe(signature);
}

function isValidUnsubscribeToken_(email, token) {
  return buildUnsubscribeToken_(email) === token;
}

function renderIframeResponse_(message, status) {
  const payload = JSON.stringify({
    source: CONFIG.iframeMessageSource,
    status: status || "success",
    message: String(message || ""),
  }).replace(/</g, "\\u003c");

  return HtmlService.createHtmlOutput(
    `<html><body><p>${escapeHtml_(message)}</p><script>
      (function () {
        var payload = ${payload};
        try {
          window.parent.postMessage(payload, "*");
        } catch (error) {}
        try {
          if (window.top && window.top !== window.parent) {
            window.top.postMessage(payload, "*");
          }
        } catch (error) {}
      }());
    </script></body></html>`,
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function renderPage_(message) {
  return HtmlService.createHtmlOutput(
    `<html><body style="font-family:Arial,sans-serif;padding:24px;">${escapeHtml_(message)}</body></html>`,
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
