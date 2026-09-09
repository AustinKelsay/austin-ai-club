# Apps Script Reminder Backend

This folder is the tiny backend for the inline Reminder signup on `sovereignai.club`.

It does four things:

1. Accepts one global email signup from the site
2. Stores subscribers in a Google Sheet
3. Fetches the static meetup feed from `https://sovereignai.club/meetups.json`
4. Sends one Reminder email on actual planned Meetup days around 10:00 AM CT

## What to configure

Set these script properties before deploying:

- `SHEET_ID`
  Google Sheet to store `subscribers` and `deliveries`
- `EVENTS_FEED_URL`
  Usually `https://sovereignai.club/meetups.json`
- `REMINDER_ENDPOINT_URL`
  The deployed web app URL ending in `/exec`
- `UNSUBSCRIBE_SECRET`
  Any long random string

## Recommended setup

1. Create a new Apps Script project
2. Paste in [Code.gs](Code.gs)
3. Set the script properties above
4. Run `setupReminderSheets()` once
5. Deploy as a web app
   Execute as: `Me`
   Who has access: `Anyone`
6. Copy the `/exec` URL into `REMINDER_ENDPOINT_URL`
7. Run `installReminderTrigger()` once
8. Put the same `/exec` URL into `VITE_REMINDER_SIGNUP_URL`

## Smoke test

To verify the full flow with a real inbox email:

1. Re-submit your email from the local site
   This updates your row so you become the most recently active subscriber.
2. Copy the latest `sendSmokeTestReminder()` helpers from [Code.gs](Code.gs) into your Apps Script project and save
3. In the Apps Script editor, run `sendSmokeTestReminder()`
4. Check your inbox for a message with the subject `Sovereign AI Club Smoke Test today at ...`

`sendSmokeTestReminder()` builds a temporary fake event one hour in the future and sends it to the most recently updated active subscriber in the sheet.

## Sheet tabs

The script creates:

- `subscribers`
- `deliveries`

`deliveries` prevents duplicate sends for the same event and subscriber.
