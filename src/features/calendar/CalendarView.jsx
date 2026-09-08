import { useMemo, useState } from "react";
import RouteLink from "../../components/RouteLink.jsx";
import ReminderSignup from "./ReminderSignup.jsx";
import {
  addCalendarMonths,
  buildCalendarMonth,
  getCalendarEntryDateKey,
  getCalendarEntryMonthKey,
  getCalendarMonthLabel,
  getInitialCalendarEntry,
  getMonthKeyFromDateKey,
  getTodayDateKey,
  groupCalendarEntriesByDate,
  WEEKDAY_LABELS,
} from "./calendar.js";
import {
  buildGoogleCalendarUrl,
  buildIcsHref,
  createInlineIcsHref,
  formatEventDate,
  formatEventLongDate,
  formatEventTime,
  getLocationLabel,
} from "../../lib/meetup-ui.js";

function CalendarEventDetail({ entry, onOpenRoute }) {
  if (!entry) {
    return (
      <article className="calendar-event-card calendar-event-card--empty">
        <h3>Pick a marked day.</h3>
        <p className="calendar-event-summary">
          Marked days are scheduled meetups or tentative biweekly slots.
        </p>
      </article>
    );
  }

  const { event } = entry;
  const meetupAriaLabel = `Open meetup page for ${event.title} on ${formatEventDate(event)}`;

  return (
    <article className="calendar-event-card calendar-event-card--selected" data-kind={entry.kind}>
      <div className="calendar-event-copy">
        <h3>{formatEventLongDate(event)}</h3>
        <p className="calendar-event-summary">{event.summary}</p>
        <div className="calendar-event-meta">
          <span>{formatEventTime(event)}</span>
          <span>{getLocationLabel(event)}</span>
        </div>
        <span className={`calendar-event-status calendar-event-status--${entry.kind}`}>
          {entry.kind === "generated" ? "tentative" : "scheduled"}
        </span>
      </div>
      <div className="calendar-event-actions">
        <a href={buildGoogleCalendarUrl({ event })} target="_blank" rel="noreferrer">
          add to Google Calendar
        </a>
        <a href={entry.kind === "authored" ? buildIcsHref({ slug: entry.slug }) : createInlineIcsHref(entry)}>
          download ICS
        </a>
        {entry.detailsHref ? (
          <RouteLink to={entry.detailsHref} onOpenRoute={onOpenRoute} aria-label={meetupAriaLabel}>
            open meetup page
          </RouteLink>
        ) : null}
      </div>
    </article>
  );
}

function CalendarGrid({ cells, selectedDateKey, visibleMonth, onSelectDate }) {
  return (
    <div className="calendar-grid" role="group" aria-label={`${getCalendarMonthLabel(visibleMonth)} meetups`}>
      {WEEKDAY_LABELS.map((label) => (
        <div key={label} className="calendar-weekday" aria-hidden="true">
          {label}
        </div>
      ))}
      {cells.map((cell) => {
        const hasEntries = cell.entries.length > 0;
        const primaryEntry = cell.entries[0];
        const isSelected = cell.dateKey === selectedDateKey;
        const className = [
          "calendar-day",
          cell.isCurrentMonth ? "calendar-day--current" : "calendar-day--outside",
          cell.isToday ? "calendar-day--today" : "",
          hasEntries ? "calendar-day--has-event" : "",
          isSelected ? "calendar-day--selected" : "",
        ].filter(Boolean).join(" ");
        const statusLabel = primaryEntry?.kind === "generated" ? "tentative" : "scheduled";
        const statusAriaLabel = primaryEntry?.kind === "generated" ? "tentative meetup" : "scheduled meetup";

        return (
          <button
            key={cell.dateKey}
            type="button"
            className={className}
            disabled={!hasEntries}
            onClick={() => onSelectDate(cell.dateKey)}
            aria-pressed={hasEntries ? isSelected : undefined}
            aria-label={`${cell.dateKey}${hasEntries ? `, ${statusAriaLabel}` : ""}`}
          >
            <span className="calendar-day-number">{cell.dayNumber}</span>
            {hasEntries ? (
              <span
                className={`calendar-day-event calendar-day-event--${primaryEntry.kind}`}
                aria-label={statusAriaLabel}
              >
                {statusLabel}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export default function CalendarView({ calendarEntries, nextMeetup, onClose, onOpenRoute }) {
  const timeZone = calendarEntries[0]?.event.timezone ?? "America/Chicago";
  const initialEntry = getInitialCalendarEntry(calendarEntries, timeZone);
  const initialDateKey = initialEntry ? getCalendarEntryDateKey(initialEntry, timeZone) : getTodayDateKey(timeZone);
  const [visibleMonth, setVisibleMonth] = useState(() => getMonthKeyFromDateKey(initialDateKey));
  const [selectedDateKey, setSelectedDateKey] = useState(() => initialDateKey);
  const entriesByDate = useMemo(
    () => groupCalendarEntriesByDate(calendarEntries, timeZone),
    [calendarEntries, timeZone],
  );
  const monthCells = useMemo(
    () => buildCalendarMonth(visibleMonth, calendarEntries, { timeZone }),
    [calendarEntries, timeZone, visibleMonth],
  );
  const selectedEntry = entriesByDate.get(selectedDateKey)?.[0] ?? null;

  const moveToMonth = (monthKey) => {
    const firstEntryInMonth = calendarEntries.find(
      (entry) => getCalendarEntryMonthKey(entry, timeZone) === monthKey,
    );
    setVisibleMonth(monthKey);
    setSelectedDateKey(firstEntryInMonth ? getCalendarEntryDateKey(firstEntryInMonth, timeZone) : "");
  };

  const goToToday = () => {
    const todayKey = getTodayDateKey(timeZone);
    const todayEntry = entriesByDate.get(todayKey)?.[0] ?? null;
    setVisibleMonth(getMonthKeyFromDateKey(todayKey));
    setSelectedDateKey(todayEntry ? todayKey : "");
  };

  return (
    <section className="calendar-screen" aria-label="Calendar view">
      <header className="calendar-screen-header">
        <div className="calendar-screen-brand">
          <h1>Sovereign AI Club every two weeks</h1>
        </div>
        <div className="screen-header-actions">
          <button className="calendar-close-btn" onClick={onClose}>
            back to meetup page
          </button>
        </div>
      </header>

      <main tabIndex={-1} className="calendar-screen-body">
        <div className="calendar-board">
          <section className="calendar-month-panel" aria-label="Monthly calendar">
            <div className="calendar-month-toolbar">
              <h3>{getCalendarMonthLabel(visibleMonth)}</h3>
              <div className="calendar-month-actions" aria-label="Calendar navigation">
                <button type="button" onClick={() => moveToMonth(addCalendarMonths(visibleMonth, -1))}>
                  Prev
                </button>
                <button type="button" onClick={goToToday}>
                  Today
                </button>
                <button type="button" onClick={() => moveToMonth(addCalendarMonths(visibleMonth, 1))}>
                  Next
                </button>
              </div>
            </div>
            <CalendarEventDetail entry={selectedEntry} onOpenRoute={onOpenRoute} />
            <CalendarGrid
              cells={monthCells}
              selectedDateKey={selectedDateKey}
              visibleMonth={visibleMonth}
              onSelectDate={setSelectedDateKey}
            />
          </section>

        </div>

        <ReminderSignup nextMeetup={nextMeetup} variant="screen" />
      </main>
    </section>
  );
}
