import { describe, expect, it } from 'vitest';
import {
  LIMITS,
  parseAge,
  parseHeightCm,
  parseMassKg,
  parseReps,
  parseSex,
  parseUnitSystem,
  toFiniteNumber,
} from './validation';
import { firstError, isOk } from './errors';

/**
 * The hostile-input requirements from section 8 of the brief. Every one of
 * these must be rejected with a message, never turned into a number.
 */
describe('hostile input rejection', () => {
  const hostile: readonly [string, unknown][] = [
    ['empty string', ''],
    ['whitespace only', '   '],
    ['null', null],
    ['undefined', undefined],
    ['non-numeric text', 'abc'],
    ['NaN', Number.NaN],
    ['Infinity', Number.POSITIVE_INFINITY],
    ['negative Infinity', Number.NEGATIVE_INFINITY],
    ['array', []],
    ['object', {}],
    ['boolean', true],
  ];

  for (const [label, value] of hostile) {
    it(`rejects ${label} with a helpful message`, () => {
      const result = parseMassKg(value);
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected rejection');
      expect(result.error.message.length).toBeGreaterThan(0);
      expect(result.error.field).toBe('weight');
    });
  }

  it('rejects the empty string rather than coercing it to zero', () => {
    // Number('') is 0, so any schema built on plain coercion would silently
    // turn a blank field into a real answer. This is the single most important
    // case in this file.
    expect(Number('')).toBe(0);
    const result = toFiniteNumber('', 'weight', 'a weight');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe('missing');
  });

  it('rejects whitespace for the same reason', () => {
    expect(Number('  ')).toBe(0);
    expect(toFiniteNumber('   ', 'weight', 'a weight').ok).toBe(false);
  });

  it('distinguishes missing from unparseable in the error code', () => {
    const missing = toFiniteNumber(null, 'age', 'an age');
    const garbage = toFiniteNumber('twelve', 'age', 'an age');
    if (missing.ok || garbage.ok) throw new Error('expected rejections');
    expect(missing.error.code).toBe('missing');
    expect(garbage.error.code).toBe('not_a_number');
  });

  it('separates Infinity from NaN in the error code', () => {
    const infinite = toFiniteNumber(Number.POSITIVE_INFINITY, 'age', 'an age');
    if (infinite.ok) throw new Error('expected rejection');
    expect(infinite.error.code).toBe('not_finite');
  });
});

describe('absurd but numeric values', () => {
  it('rejects a 5 cm height', () => {
    const result = parseHeightCm(5);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('out_of_range');
      // The message must name the accepted band, not just say "invalid".
      expect(result.error.message).toContain('50');
      expect(result.error.message).toContain('260');
    }
  });

  it('rejects a 900 kg weight', () => {
    const result = parseMassKg(900);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe('out_of_range');
  });

  it('rejects an age of 200', () => {
    expect(parseAge(200).ok).toBe(false);
  });

  it('rejects zero and negative values', () => {
    expect(parseMassKg(0).ok).toBe(false);
    expect(parseMassKg(-70).ok).toBe(false);
    expect(parseHeightCm(0).ok).toBe(false);
    expect(parseHeightCm(-175).ok).toBe(false);
  });

  it('accepts values at the exact range boundaries', () => {
    expect(parseMassKg(LIMITS.massKg.min).ok).toBe(true);
    expect(parseMassKg(LIMITS.massKg.max).ok).toBe(true);
    expect(parseHeightCm(LIMITS.heightCm.min).ok).toBe(true);
    expect(parseHeightCm(LIMITS.heightCm.max).ok).toBe(true);
  });

  it('rejects values just outside the boundaries', () => {
    expect(parseMassKg(LIMITS.massKg.min - 0.01).ok).toBe(false);
    expect(parseMassKg(LIMITS.massKg.max + 0.01).ok).toBe(false);
  });
});

describe('accepted input', () => {
  it('accepts plausible numbers and numeric strings alike', () => {
    expect(isOk(parseMassKg(70))).toBe(true);
    expect(isOk(parseMassKg('70'))).toBe(true);
    expect(isOk(parseMassKg(' 70.5 '))).toBe(true);
    expect(isOk(parseHeightCm('175'))).toBe(true);
  });

  it('returns the parsed numeric value', () => {
    const result = parseMassKg('72.5');
    if (!result.ok) throw new Error('expected success');
    expect(result.value).toBe(72.5);
  });

  it('requires repetitions to be whole numbers', () => {
    expect(parseReps(5).ok).toBe(true);
    expect(parseReps(5.5).ok).toBe(false);
    expect(parseReps(0).ok).toBe(false);
    expect(parseReps(21).ok).toBe(false);
  });
});

describe('enumerations', () => {
  it('accepts the supported sexes only', () => {
    expect(parseSex('male').ok).toBe(true);
    expect(parseSex('female').ok).toBe(true);
    expect(parseSex('other').ok).toBe(false);
    expect(parseSex('').ok).toBe(false);
    expect(parseSex(null).ok).toBe(false);
  });

  it('accepts the supported unit systems only', () => {
    expect(parseUnitSystem('metric').ok).toBe(true);
    expect(parseUnitSystem('imperial').ok).toBe(true);
    expect(parseUnitSystem('furlongs').ok).toBe(false);
  });
});

describe('error aggregation', () => {
  it('surfaces the first failing field', () => {
    const error = firstError(parseMassKg(70), parseHeightCm('nonsense'), parseAge(30));
    expect(error).not.toBeNull();
    expect(error?.field).toBe('height');
  });

  it('returns null when everything parses', () => {
    expect(firstError(parseMassKg(70), parseHeightCm(175), parseAge(30))).toBeNull();
  });
});
