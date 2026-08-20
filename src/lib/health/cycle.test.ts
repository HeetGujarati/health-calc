import { describe, expect, it } from 'vitest';
import {
  addDays,
  clampCycleDays,
  daysBetween,
  formatIsoDate,
  MAX_CYCLE_DAYS,
  MIN_CYCLE_DAYS,
  nextPeriodStart,
  parseIsoDate,
  periodEnd,
  upcomingPeriodStarts,
} from './cycle';

/**
 * Menstrual cycle dates.
 *
 * Two properties matter more than any individual figure, and both are tested
 * directly rather than inferred from examples: the arithmetic is in UTC so the
 * answer cannot depend on where it runs, and projections are taken from the
 * original date rather than chained, so error cannot accumulate across cycles.
 *
 * Dates spanning leap days and year ends are used deliberately — six 28-day
 * cycles cross several month boundaries by construction.
 */

describe('date primitives', () => {
  it('parses and formats a date unchanged', () => {
    expect(formatIsoDate(parseIsoDate('2026-08-20') ?? 0)).toBe('2026-08-20');
  });

  it('rejects a date that does not exist rather than rolling it forward', () => {
    // `new Date('2026-02-30')` and `Date.UTC(2026, 1, 30)` both silently become
    // 2 March. A mistyped date should be reported, not answered.
    expect(parseIsoDate('2026-02-30')).toBeNull();
    expect(parseIsoDate('2025-02-29')).toBeNull();
    expect(parseIsoDate('2026-13-01')).toBeNull();
    expect(parseIsoDate('2026-00-10')).toBeNull();
    expect(parseIsoDate('2026-8-20')).toBeNull();
    expect(parseIsoDate('not a date')).toBeNull();
  });

  it('accepts the leap day in a leap year', () => {
    expect(parseIsoDate('2024-02-29')).not.toBeNull();
    expect(addDays('2024-02-28', 1)).toBe('2024-02-29');
    expect(addDays('2024-02-29', 1)).toBe('2024-03-01');
  });

  it('crosses month and year boundaries in both directions', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2027-01-01', -1)).toBe('2026-12-31');
    expect(daysBetween('2026-12-31', '2027-01-01')).toBe(1);
    expect(daysBetween('2027-01-01', '2026-12-31')).toBe(-1);
  });

  it('does not depend on the local timezone', () => {
    // The reason the module works in epoch days: a projection must land on the
    // same calendar date regardless of host offset, and a local Date would
    // shift for hosts west of UTC.
    expect(nextPeriodStart('2026-01-01', 28)).toBe('2026-01-29');
    expect(daysBetween('2026-01-01', '2026-01-29')).toBe(28);
  });

  it('returns null from every function given an unparseable date', () => {
    expect(addDays('nope', 1)).toBeNull();
    expect(daysBetween('nope', '2026-01-01')).toBeNull();
    expect(daysBetween('2026-01-01', 'nope')).toBeNull();
    expect(nextPeriodStart('nope')).toBeNull();
    expect(periodEnd('nope', 4)).toBeNull();
    expect(upcomingPeriodStarts('nope')).toEqual([]);
  });
});

describe('cycle length', () => {
  it('clamps to the accepted range', () => {
    expect(clampCycleDays(28)).toBe(28);
    expect(clampCycleDays(1)).toBe(MIN_CYCLE_DAYS);
    expect(clampCycleDays(400)).toBe(MAX_CYCLE_DAYS);
  });

  it('rounds a fractional cycle length to whole days', () => {
    expect(clampCycleDays(28.4)).toBe(28);
    expect(clampCycleDays(28.6)).toBe(29);
  });
});

describe('period projection', () => {
  it('puts the next period one cycle after the last', () => {
    expect(nextPeriodStart('2026-03-10', 28)).toBe('2026-04-07');
    expect(nextPeriodStart('2026-03-10', 31)).toBe('2026-04-10');
    expect(nextPeriodStart('2026-03-10', 21)).toBe('2026-03-31');
  });

  it('defaults to a 28-day cycle', () => {
    expect(nextPeriodStart('2026-03-10')).toBe(nextPeriodStart('2026-03-10', 28));
  });

  it('projects each cycle from the original date, not from the previous one', () => {
    // Chaining would let any rounding repeat; six cycles out that is nearly a
    // week. Every entry must be an exact multiple of the cycle from the start.
    const starts = upcomingPeriodStarts('2026-01-15', 30, 6);
    expect(starts).toHaveLength(6);
    starts.forEach((start, index) => {
      expect(daysBetween('2026-01-15', start)).toBe(30 * (index + 1));
    });
  });

  it('crosses a year end while projecting', () => {
    const starts = upcomingPeriodStarts('2026-11-20', 28, 3);
    expect(starts).toEqual(['2026-12-18', '2027-01-15', '2027-02-12']);
  });

  it('returns an empty list for a non-positive count', () => {
    expect(upcomingPeriodStarts('2026-01-15', 28, 0)).toEqual([]);
    expect(upcomingPeriodStarts('2026-01-15', 28, -3)).toEqual([]);
  });
});

describe('period end', () => {
  it('counts the first day, so a three-day period starting on the 1st ends on the 3rd', () => {
    expect(periodEnd('2026-03-01', 3)).toBe('2026-03-03');
    expect(periodEnd('2026-03-01', 1)).toBe('2026-03-01');
  });

  it('crosses a month boundary', () => {
    expect(periodEnd('2026-01-30', 5)).toBe('2026-02-03');
  });

  it('treats a zero or negative length as a single day', () => {
    expect(periodEnd('2026-03-01', 0)).toBe('2026-03-01');
    expect(periodEnd('2026-03-01', -4)).toBe('2026-03-01');
  });

  it('returns null for an unparseable start', () => {
    expect(periodEnd('nope', 4)).toBeNull();
  });
});
