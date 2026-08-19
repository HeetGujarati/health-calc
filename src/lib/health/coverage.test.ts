import { describe, expect, it } from 'vitest';
import {
  parseDurationSeconds,
  parseHeartRate,
  parseHeightIn,
  parseHipCm,
  parseLoadKg,
  parseMassLb,
  parseMet,
  parseNeckCm,
  parseSkinfoldMm,
  parseWaistCm,
} from './validation';
import { err, isOk, ok } from './errors';
import {
  asCentimetres,
  asKilograms,
  asMetres,
  asMillimetres,
  hoursToSeconds,
  metresToCentimetres,
  millimetresToCentimetres,
  minutesToSeconds,
} from './units';
import { formatRange } from './rounding';
import { bmiCategory } from './bmi';
import { allBmrEstimates } from './bmr';
import { usNavyBodyFat } from './bodyfat';

/**
 * Fills the coverage the main suites leave: the field parsers the calculator
 * pages call, the conversions used by the imperial toggle, and the error
 * branches that only fire on malformed input.
 */

describe('remaining field parsers', () => {
  const cases: readonly [string, (raw: unknown) => { ok: boolean }, number, number][] = [
    ['neck', parseNeckCm, 38, 5],
    ['waist', parseWaistCm, 85, 5],
    ['hip', parseHipCm, 95, 5],
    ['skinfold', parseSkinfoldMm, 15, 500],
    ['heart rate', parseHeartRate, 60, 500],
    ['load', parseLoadKg, 100, 5000],
    ['duration', parseDurationSeconds, 3600, 999_999],
    ['MET', parseMet, 8, 500],
    ['mass in pounds', parseMassLb, 154, 5000],
    ['height in inches', parseHeightIn, 70, 500],
  ];

  for (const [label, parser, valid, invalid] of cases) {
    it(`accepts a plausible ${label} and rejects an absurd one`, () => {
      expect(parser(valid).ok).toBe(true);
      expect(parser(invalid).ok).toBe(false);
      expect(parser('').ok).toBe(false);
      expect(parser(Number.NaN).ok).toBe(false);
    });
  }
});

describe('result helpers', () => {
  it('builds success values', () => {
    const result = ok(42);
    expect(result.ok).toBe(true);
    expect(isOk(result)).toBe(true);
    if (result.ok) expect(result.value).toBe(42);
  });

  it('omits the field key entirely when no field is given', () => {
    // exactOptionalPropertyTypes means an explicit undefined would be a type
    // error, so the key must be absent rather than present-and-undefined.
    const withoutField = err('missing', 'Enter a value.');
    if (withoutField.ok) throw new Error('expected error');
    expect('field' in withoutField.error).toBe(false);

    const withField = err('missing', 'Enter a value.', 'weight');
    if (withField.ok) throw new Error('expected error');
    expect(withField.error.field).toBe('weight');
  });
});

describe('remaining unit conversions', () => {
  it('converts metres and millimetres', () => {
    expect(metresToCentimetres(asMetres(1.75))).toBeCloseTo(175, 10);
    expect(millimetresToCentimetres(asMillimetres(150))).toBeCloseTo(15, 10);
  });

  it('converts durations into seconds', () => {
    expect(hoursToSeconds(1)).toBe(3600);
    expect(hoursToSeconds(0.5)).toBe(1800);
    expect(minutesToSeconds(45)).toBe(2700);
  });
});

describe('BMI category edge handling', () => {
  it('returns null for a non-finite BMI instead of the highest band', () => {
    // Every comparison against NaN is false, so a table walk would fall through
    // to the last band and label someone from a division by zero.
    expect(bmiCategory(Number.NaN)).toBeNull();
  });

  it('treats Infinity as non-finite too, for one consistent rule', () => {
    // The top band is [40, Infinity), and Infinity < Infinity is false, so an
    // infinite BMI lands outside every band. That is the same answer NaN gets:
    // finite input classifies, non-finite input does not.
    expect(bmiCategory(Number.POSITIVE_INFINITY)).toBeNull();
    expect(bmiCategory(Number.NEGATIVE_INFINITY)).toBeNull();
  });

  it('still classifies every finite value, including implausible ones', () => {
    expect(bmiCategory(-5)).toBe('underweight');
    expect(bmiCategory(0)).toBe('underweight');
    expect(bmiCategory(1000)).toBe('obesity_class_3');
  });
});

describe('remaining formula branches', () => {
  it('includes Katch-McArdle in the comparison when lean mass is known', () => {
    const estimates = allBmrEstimates({
      mass: asKilograms(80),
      height: asCentimetres(180),
      age: 30 as never,
      sex: 'male',
      leanBodyMass: asKilograms(64),
    });
    expect(estimates.katch_mcardle).toBeCloseTo(1752.4, 6);
  });

  it('returns null for a female Navy calculation with an impossible girth', () => {
    expect(
      usNavyBodyFat({
        height: asCentimetres(165),
        neck: asCentimetres(180),
        waist: asCentimetres(75),
        hip: asCentimetres(95),
        sex: 'female',
      })
    ).toBeNull();
  });
});

describe('range formatting', () => {
  it('formats a localised range', () => {
    expect(formatRange(56.65625, 76.5625, 'en-US', 'massKg')).toBe('56.7–76.6');
    expect(formatRange(56.65625, 76.5625, 'de-DE', 'massKg')).toBe('56,7–76,6');
  });
});
