/**
 * Menstrual cycle dates.
 *
 * Deliberately narrow. This projects the next few period start dates forward
 * from the last one and a cycle length, and does nothing else: no ovulation, no
 * fertile window, no conception or due date. The site states on `/about/` and
 * in `llms.txt` that it does not publish pregnancy, due date, ovulation or
 * conception calculators, and a module carrying that arithmetic unused would
 * contradict it just as loudly as a page would.
 *
 * Two decisions run through all of it.
 *
 * **Everything is UTC midnight.** A date worked out in Auckland and one worked
 * out in Los Angeles from the same input must be the same calendar date. Local
 * `Date` construction makes that untrue for several hours a day, and the bug is
 * invisible in the timezone you develop in. Dates enter and leave as
 * `YYYY-MM-DD` strings and are integers of days in between.
 *
 * **Today is passed in, never read.** `Date.now()` here would make the
 * functions impure, the tests time-dependent, and any build-time table
 * different on every build. The caller supplies the reference date.
 *
 * What this cannot do is the part that matters most on the page: cycle length
 * varies between people and between cycles for the same person, so a projection
 * from a single past date is an average, not a prediction. The calculator says
 * so rather than implying otherwise.
 */

/** A calendar date with no time and no zone, as `YYYY-MM-DD`. */
export type IsoDate = string;

/** The cycle length the common textbook figure assumes. */
export const REFERENCE_CYCLE_DAYS = 28;

/**
 * Accepted cycle lengths.
 *
 * 21 to 35 days is the range usually described as typical; this is a little
 * wider at both ends so that someone outside it still gets an answer rather
 * than a rejection, which is not the page's business to issue.
 */
export const MIN_CYCLE_DAYS = 20;
export const MAX_CYCLE_DAYS = 45;

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86_400_000;

/**
 * Parses `YYYY-MM-DD` to a UTC epoch-day count, or null if it is not a real date.
 *
 * Rejects 2026-02-30 rather than rolling it forward into March, which is what
 * `new Date('2026-02-30')` does in some engines and what `Date.UTC` does in all
 * of them. Someone who mistypes a date should be told, not handed a confident
 * answer for a different day.
 */
export const parseIsoDate = (value: string): number | null => {
  const match = ISO_DATE.exec(value.trim());
  if (match === null) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const stamp = Date.UTC(year, month - 1, day);
  const roundTripped = new Date(stamp);
  if (
    roundTripped.getUTCFullYear() !== year ||
    roundTripped.getUTCMonth() !== month - 1 ||
    roundTripped.getUTCDate() !== day
  ) {
    return null;
  }

  return Math.round(stamp / MS_PER_DAY);
};

/** Formats a UTC epoch-day count back to `YYYY-MM-DD`. */
export const formatIsoDate = (epochDay: number): IsoDate => {
  const date = new Date(epochDay * MS_PER_DAY);
  const year = String(date.getUTCFullYear()).padStart(4, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/** Shifts an ISO date by a whole number of days. */
export const addDays = (date: IsoDate, days: number): IsoDate | null => {
  const epochDay = parseIsoDate(date);
  if (epochDay === null) return null;
  return formatIsoDate(epochDay + days);
};

/** Whole days from `from` to `to`. Negative when `to` is earlier. */
export const daysBetween = (from: IsoDate, to: IsoDate): number | null => {
  const start = parseIsoDate(from);
  const end = parseIsoDate(to);
  if (start === null || end === null) return null;
  return end - start;
};

/**
 * Clamps a cycle length to the accepted range.
 *
 * The input layer rejects out-of-range values with a message; this exists so
 * the arithmetic is still safe when called from a reference table or any other
 * caller that did not go through a form.
 */
export const clampCycleDays = (cycleDays: number): number =>
  Math.min(Math.max(Math.round(cycleDays), MIN_CYCLE_DAYS), MAX_CYCLE_DAYS);

/** The first day of the next expected period. */
export const nextPeriodStart = (
  lastPeriodStart: IsoDate,
  cycleDays = REFERENCE_CYCLE_DAYS
): IsoDate | null => addDays(lastPeriodStart, clampCycleDays(cycleDays));

/**
 * The next `count` expected period start dates.
 *
 * Each is projected from the original date rather than from the previous
 * projection, so rounding cannot accumulate across cycles — six cycles out, an
 * off-by-one repeated six times would be nearly a week.
 */
export const upcomingPeriodStarts = (
  lastPeriodStart: IsoDate,
  cycleDays = REFERENCE_CYCLE_DAYS,
  count = 6
): readonly IsoDate[] => {
  const clamped = clampCycleDays(cycleDays);
  const starts: IsoDate[] = [];

  for (let cycle = 1; cycle <= Math.max(0, count); cycle += 1) {
    const start = addDays(lastPeriodStart, clamped * cycle);
    if (start === null) return [];
    starts.push(start);
  }

  return starts;
};

/**
 * The last day of a period starting on `start`, given its length in days.
 *
 * A three-day period starting on the 1st ends on the 3rd, not the 4th — the
 * first day counts, which is the off-by-one worth stating rather than leaving
 * to the reader of the call site.
 */
export const periodEnd = (start: IsoDate, periodDays: number): IsoDate | null =>
  addDays(start, Math.max(1, Math.round(periodDays)) - 1);
