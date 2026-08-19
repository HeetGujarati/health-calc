import { type Result, err } from '../health/errors';
import {
  parseHeightCm,
  parseHeightIn,
  parseMassKg,
  parseMassLb,
  parseUnitSystem,
  type UnitSystem,
} from '../health/validation';
import {
  feetAndInchesToInches,
  inchesToCentimetres,
  poundsToKilograms,
  type Centimetres,
  type Kilograms,
} from '../health/units';
import type { FormValues } from './result';

/**
 * Shared input reading for calculators.
 *
 * Every calculator accepts both unit systems, and each one converts to metric
 * at the boundary so the formula modules only ever see kilograms and
 * centimetres. Doing the conversion once, here, is what stops a unit bug from
 * being reimplemented sixteen times.
 */

export const unitSystemOf = (values: FormValues): UnitSystem => {
  const parsed = parseUnitSystem(values['units'] ?? 'metric');
  // An unrecognised value falls back to metric rather than failing the whole
  // calculation: the unit toggle is not something the user typed.
  return parsed.ok ? parsed.value : 'metric';
};

/**
 * Reads a body mass in whichever system is active and returns kilograms.
 *
 * Validation happens in the *entered* unit, so the error message quotes a range
 * the user recognises — telling someone who typed pounds that the value should
 * be between 20 and 400 kg is useless.
 */
export const readMass = (values: FormValues, field = 'weight'): Result<Kilograms> => {
  if (unitSystemOf(values) === 'imperial') {
    const pounds = parseMassLb(values[field], field);
    return pounds.ok ? { ok: true, value: poundsToKilograms(pounds.value) } : pounds;
  }
  return parseMassKg(values[field], field);
};

/**
 * Reads a height and returns centimetres.
 *
 * Imperial height arrives as separate feet and inches fields, because asking
 * someone for "70 inches" is asking them to do arithmetic the page should do.
 */
export const readHeight = (values: FormValues, field = 'height'): Result<Centimetres> => {
  if (unitSystemOf(values) !== 'imperial') {
    return parseHeightCm(values[field], field);
  }

  const feetRaw = values[`${field}Feet`];
  const inchesRaw = values[`${field}Inches`] ?? '0';

  if (feetRaw === undefined || feetRaw.trim() === '') {
    return err('missing', 'Enter a height.', field);
  }

  const feet = Number(feetRaw);
  const inches = Number(inchesRaw === '' ? '0' : inchesRaw);

  if (!Number.isFinite(feet) || !Number.isFinite(inches)) {
    return err('not_a_number', 'Height must be a number.', field);
  }

  const total = parseHeightIn(feetAndInchesToInches(feet, inches), field);
  return total.ok ? { ok: true, value: inchesToCentimetres(total.value) } : total;
};

/** Reads a plain string field, defaulting when absent. */
export const readChoice = (values: FormValues, field: string, fallback: string): string => {
  const raw = values[field];
  return raw === undefined || raw.trim() === '' ? fallback : raw.trim();
};
