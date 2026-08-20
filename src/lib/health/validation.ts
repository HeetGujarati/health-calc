import { err, ok, type Result } from './errors';
import {
  asBeatsPerMinute,
  asCentimetres,
  asInches,
  asKilograms,
  asMet,
  asMillimetres,
  asPounds,
  asSeconds,
  asYears,
  type BeatsPerMinute,
  type Centimetres,
  type Inches,
  type Kilograms,
  type MetabolicEquivalent,
  type Millimetres,
  type Pounds,
  type Seconds,
  type Years,
} from './units';

/**
 * Plausible ranges.
 *
 * These are deliberately wider than any realistic user and narrower than
 * physically absurd. The purpose is not to police body size — it is to catch
 * unit mix-ups and typos before a formula turns them into a confident-looking
 * number. A user who types their weight in grams, or slips an extra digit,
 * should see a question rather than a wrong answer.
 *
 * The upper mass bound sits above the heaviest weights ever recorded; the
 * height bounds sit outside the tallest and shortest adults on record.
 */
export const LIMITS = {
  massKg: { min: 20, max: 400 },
  massLb: { min: 44, max: 880 },
  heightCm: { min: 50, max: 260 },
  heightIn: { min: 20, max: 102 },
  ageYears: { min: 0, max: 120 },
  /** Neck, waist and hip circumferences for the girth-based methods. */
  neckCm: { min: 20, max: 80 },
  // Wrist circumference. Adult wrists sit roughly between 13 and 22 cm; the
  // bounds are wider so an unusual but genuine measurement is not rejected.
  wristCm: { min: 10, max: 30 },
  waistCm: { min: 40, max: 200 },
  hipCm: { min: 50, max: 200 },
  /** Skinfold calipers do not read meaningfully outside this band. */
  skinfoldMm: { min: 1, max: 100 },
  heartRateBpm: { min: 30, max: 220 },
  /** 1RM estimates lose validity well before 20 reps; see onerepmax.ts. */
  reps: { min: 1, max: 20 },
  loadKg: { min: 1, max: 1000 },
  durationSeconds: { min: 1, max: 86_400 },
  met: { min: 0.9, max: 30 },
} as const;

/**
 * Coerces arbitrary input to a finite number, rejecting everything the brief
 * lists as hostile.
 *
 * The empty-string case is the one that matters most: `Number('')` is `0`, so
 * any schema built on plain coercion silently turns a blank field into a real
 * answer. Same for whitespace, `null` and `[]`. Each is rejected explicitly
 * before coercion is allowed anywhere near the value.
 */
export const toFiniteNumber = (raw: unknown, field: string, label: string): Result<number> => {
  if (raw === null || raw === undefined) {
    return err('missing', `Enter ${label}.`, field);
  }

  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed === '') {
      return err('missing', `Enter ${label}.`, field);
    }
    const parsed = Number(trimmed);
    if (Number.isNaN(parsed)) {
      return err('not_a_number', `${capitalise(label)} must be a number.`, field);
    }
    if (!Number.isFinite(parsed)) {
      return err('not_finite', `${capitalise(label)} must be a real number.`, field);
    }
    return ok(parsed);
  }

  if (typeof raw !== 'number') {
    return err('not_a_number', `${capitalise(label)} must be a number.`, field);
  }

  if (Number.isNaN(raw)) {
    return err('not_a_number', `${capitalise(label)} must be a number.`, field);
  }

  if (!Number.isFinite(raw)) {
    return err('not_finite', `${capitalise(label)} must be a real number.`, field);
  }

  return ok(raw);
};

// charAt returns '' rather than undefined for an out-of-range index, so it
// needs no assertion under noUncheckedIndexedAccess.
const capitalise = (text: string): string => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

/**
 * Validates a finite number against a range and brands it.
 *
 * The out-of-range message names the accepted band, because "that doesn't look
 * right" gives the user nothing to act on.
 */
const inRange = <T extends number>(
  raw: unknown,
  range: { readonly min: number; readonly max: number },
  field: string,
  label: string,
  unit: string,
  brand: (value: number) => T
): Result<T> => {
  const numeric = toFiniteNumber(raw, field, label);
  if (!numeric.ok) return numeric;

  if (numeric.value < range.min || numeric.value > range.max) {
    return err(
      'out_of_range',
      `${capitalise(label)} should be between ${range.min} and ${range.max} ${unit}. Check the units and try again.`,
      field
    );
  }

  return ok(brand(numeric.value));
};

// --- Field parsers ----------------------------------------------------------

export const parseMassKg = (raw: unknown, field = 'weight'): Result<Kilograms> =>
  inRange(raw, LIMITS.massKg, field, 'a weight', 'kg', asKilograms);

export const parseMassLb = (raw: unknown, field = 'weight'): Result<Pounds> =>
  inRange(raw, LIMITS.massLb, field, 'a weight', 'lb', asPounds);

export const parseHeightCm = (raw: unknown, field = 'height'): Result<Centimetres> =>
  inRange(raw, LIMITS.heightCm, field, 'a height', 'cm', asCentimetres);

export const parseHeightIn = (raw: unknown, field = 'height'): Result<Inches> =>
  inRange(raw, LIMITS.heightIn, field, 'a height', 'in', asInches);

export const parseAge = (raw: unknown, field = 'age'): Result<Years> =>
  inRange(raw, LIMITS.ageYears, field, 'an age', 'years', asYears);

export const parseNeckCm = (raw: unknown, field = 'neck'): Result<Centimetres> =>
  inRange(raw, LIMITS.neckCm, field, 'a neck measurement', 'cm', asCentimetres);

export const parseWristCm = (raw: unknown, field = 'wrist'): Result<Centimetres> =>
  inRange(raw, LIMITS.wristCm, field, 'a wrist measurement', 'cm', asCentimetres);

export const parseWaistCm = (raw: unknown, field = 'waist'): Result<Centimetres> =>
  inRange(raw, LIMITS.waistCm, field, 'a waist measurement', 'cm', asCentimetres);

export const parseHipCm = (raw: unknown, field = 'hip'): Result<Centimetres> =>
  inRange(raw, LIMITS.hipCm, field, 'a hip measurement', 'cm', asCentimetres);

export const parseSkinfoldMm = (raw: unknown, field = 'skinfold'): Result<Millimetres> =>
  inRange(raw, LIMITS.skinfoldMm, field, 'a skinfold measurement', 'mm', asMillimetres);

export const parseHeartRate = (raw: unknown, field = 'heartRate'): Result<BeatsPerMinute> =>
  inRange(raw, LIMITS.heartRateBpm, field, 'a heart rate', 'bpm', asBeatsPerMinute);

export const parseReps = (raw: unknown, field = 'reps'): Result<number> => {
  const parsed = inRange(raw, LIMITS.reps, field, 'a repetition count', 'reps', (v) => v);
  if (!parsed.ok) return parsed;
  if (!Number.isInteger(parsed.value)) {
    return err('not_a_number', 'Repetitions must be a whole number.', field);
  }
  return parsed;
};

export const parseLoadKg = (raw: unknown, field = 'load'): Result<Kilograms> =>
  inRange(raw, LIMITS.loadKg, field, 'a weight lifted', 'kg', asKilograms);

export const parseDurationSeconds = (raw: unknown, field = 'duration'): Result<Seconds> =>
  inRange(raw, LIMITS.durationSeconds, field, 'a duration', 'seconds', asSeconds);

export const parseMet = (raw: unknown, field = 'met'): Result<MetabolicEquivalent> =>
  inRange(raw, LIMITS.met, field, 'a MET value', 'METs', asMet);

// --- Enumerations -----------------------------------------------------------

/**
 * Biological sex, as the equations require it.
 *
 * Every equation in this library that takes sex was published with two
 * coefficient sets derived from male and female reference populations. The
 * field is named for what it actually is — an input to a population equation —
 * and the UI explains that, rather than implying anything about identity.
 */
export const SEXES = ['male', 'female'] as const;
export type Sex = (typeof SEXES)[number];

export const isSex = (value: unknown): value is Sex =>
  typeof value === 'string' && (SEXES as readonly string[]).includes(value);

export const parseSex = (raw: unknown, field = 'sex'): Result<Sex> =>
  isSex(raw)
    ? ok(raw)
    : err(
        'unsupported_option',
        'Choose which set of equation coefficients to use: male or female.',
        field
      );

export const UNIT_SYSTEMS = ['metric', 'imperial'] as const;
export type UnitSystem = (typeof UNIT_SYSTEMS)[number];

export const isUnitSystem = (value: unknown): value is UnitSystem =>
  typeof value === 'string' && (UNIT_SYSTEMS as readonly string[]).includes(value);

export const parseUnitSystem = (raw: unknown, field = 'units'): Result<UnitSystem> =>
  isUnitSystem(raw)
    ? ok(raw)
    : err('unsupported_option', 'Choose either metric or imperial units.', field);
