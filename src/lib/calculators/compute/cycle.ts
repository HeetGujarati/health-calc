import {
  clampCycleDays,
  nextPeriodStart,
  periodEnd,
  upcomingPeriodStarts,
} from '../../health/cycle';
import { readCycleLength, readDate, readChoice } from '../inputs';
import { failure, type CalculatorResult, type FormValues, type ResultNote } from '../result';

/**
 * Menstrual cycle calculators.
 *
 * This projects dates and nothing else. No fertile window, no ovulation
 * estimate, no conception date: the site says on `/about/` and in `llms.txt`
 * that it does not publish those, and a "next period" page is the one cycle
 * tool that produces neither a fertility signal nor a clinical number.
 *
 * The output is deliberately framed as a projection rather than a prediction.
 * Cycle length varies between people and between cycles for one person, so
 * repeating a single interval forward is an average being extended, and the
 * further out it goes the less it means. The page says so, and the note below
 * says so again next to the dates themselves.
 */

/** How far ahead to project. Six cycles is roughly half a year at 28 days. */
const CYCLES_AHEAD = 6;

const DEFAULT_PERIOD_DAYS = 5;

/**
 * Formats an ISO date for display in the reader's locale.
 *
 * `Intl.DateTimeFormat` is given the date at UTC noon rather than midnight.
 * Midnight UTC formatted in a timezone behind UTC renders as the previous day,
 * which would silently show every projected date one day early for anyone in
 * the Americas — the exact class of bug the module avoids internally.
 */
const displayDate = (iso: string, locale: string): string => {
  const [year, month, day] = iso.split('-').map(Number);
  if (year === undefined || month === undefined || day === undefined) return iso;

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
};

const readPeriodDays = (values: FormValues): number => {
  const raw = Number(readChoice(values, 'periodDays', String(DEFAULT_PERIOD_DAYS)));
  if (!Number.isFinite(raw)) return DEFAULT_PERIOD_DAYS;
  return Math.min(Math.max(Math.round(raw), 1), 10);
};

export const computePeriod = (values: FormValues, locale: string): CalculatorResult => {
  const lastPeriod = readDate(values, 'lastPeriod', 'the first day of your last period');
  if (!lastPeriod.ok) return failure(lastPeriod.error);

  const cycle = readCycleLength(values);
  if (!cycle.ok) return failure(cycle.error);

  const periodDays = readPeriodDays(values);
  const cycleDays = clampCycleDays(cycle.value);

  // `readDate` has already parsed this, so a null here is not reachable from the
  // form. Handled rather than asserted because the same compute function is
  // callable with arbitrary values from the query string.
  const next = nextPeriodStart(lastPeriod.value, cycleDays);
  if (next === null) {
    return failure({
      code: 'not_a_number',
      message: 'Enter the first day of your last period as a real calendar date.',
      field: 'lastPeriod',
    });
  }

  const upcoming = upcomingPeriodStarts(lastPeriod.value, cycleDays, CYCLES_AHEAD);

  const notes: ResultNote[] = [
    {
      tone: 'info',
      text: 'These dates repeat one cycle length forward. Cycle length varies between people and from one cycle to the next, so treat them as an average extended, not a prediction — and the further out a date is, the less it is worth.',
    },
  ];

  if (cycleDays !== cycle.value) {
    notes.push({
      tone: 'info',
      text: `Cycle length was rounded to ${String(cycleDays)} days.`,
    });
  }

  return {
    ok: true,
    primary: {
      label: 'Next period expected',
      value: displayDate(next, locale),
    },
    summary: `With a ${String(cycleDays)}-day cycle, your next period is expected around ${displayDate(next, locale)}.`,
    secondary: upcoming.slice(1).map((start, index) => {
      const end = periodEnd(start, periodDays);
      return {
        label: `Cycle ${String(index + 2)}`,
        value:
          end === null
            ? displayDate(start, locale)
            : `${displayDate(start, locale)} – ${displayDate(end, locale)}`,
      };
    }),
    notes,
  };
};
