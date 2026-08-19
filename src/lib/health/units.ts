/**
 * Branded unit types.
 *
 * Every published formula in this library assumes a specific unit. Mifflin-St
 * Jeor wants kilograms and centimetres; the US Navy circumference method wants
 * inches; Epley wants whatever unit the load was entered in. Passing pounds
 * where kilograms are expected produces a plausible-looking number that is
 * wrong by a factor of 2.2, which no test of the formula itself would catch.
 *
 * Branding makes that a compile error instead. The brand exists only in the
 * type system — there is no runtime cost and no wrapper object.
 */

declare const unitBrand: unique symbol;

/** A number tagged with the unit it is measured in. */
type Unit<Name extends string> = number & { readonly [unitBrand]: Name };

export type Kilograms = Unit<'kg'>;
export type Pounds = Unit<'lb'>;
export type Grams = Unit<'g'>;
export type Centimetres = Unit<'cm'>;
export type Metres = Unit<'m'>;
export type Inches = Unit<'in'>;
export type Millimetres = Unit<'mm'>;
export type Years = Unit<'years'>;
export type Kcal = Unit<'kcal'>;
export type BeatsPerMinute = Unit<'bpm'>;
export type Litres = Unit<'L'>;
export type Seconds = Unit<'s'>;
export type MetabolicEquivalent = Unit<'MET'>;

/**
 * Trusted constructors.
 *
 * These assert a unit onto a raw number without validating it. Anything derived
 * from user input must pass through the zod schemas in `validation.ts` first —
 * these exist for internal conversions and for values already proven finite.
 */
export const asKilograms = (value: number): Kilograms => value as Kilograms;
export const asPounds = (value: number): Pounds => value as Pounds;
export const asGrams = (value: number): Grams => value as Grams;
export const asCentimetres = (value: number): Centimetres => value as Centimetres;
export const asMetres = (value: number): Metres => value as Metres;
export const asInches = (value: number): Inches => value as Inches;
export const asMillimetres = (value: number): Millimetres => value as Millimetres;
export const asYears = (value: number): Years => value as Years;
export const asKcal = (value: number): Kcal => value as Kcal;
export const asBeatsPerMinute = (value: number): BeatsPerMinute => value as BeatsPerMinute;
export const asLitres = (value: number): Litres => value as Litres;
export const asSeconds = (value: number): Seconds => value as Seconds;
export const asMet = (value: number): MetabolicEquivalent => value as MetabolicEquivalent;

/**
 * Exact conversion factors.
 *
 * The pound and the inch are *defined* in terms of SI units by international
 * agreement (1959), so these are exact, not approximations. Using the exact
 * values keeps metric/imperial round-trips lossless to floating-point
 * precision, which the round-trip tests assert.
 */
export const KG_PER_POUND = 0.45359237;
export const CM_PER_INCH = 2.54;
export const INCHES_PER_FOOT = 12;
export const METRES_PER_MILE = 1609.344;
export const METRES_PER_KILOMETRE = 1000;
export const SECONDS_PER_MINUTE = 60;
export const SECONDS_PER_HOUR = 3600;

// --- Mass -------------------------------------------------------------------

export const poundsToKilograms = (value: Pounds): Kilograms => asKilograms(value * KG_PER_POUND);

export const kilogramsToPounds = (value: Kilograms): Pounds => asPounds(value / KG_PER_POUND);

export const kilogramsToGrams = (value: Kilograms): Grams => asGrams(value * 1000);

export const gramsToKilograms = (value: Grams): Kilograms => asKilograms(value / 1000);

// --- Length -----------------------------------------------------------------

export const inchesToCentimetres = (value: Inches): Centimetres =>
  asCentimetres(value * CM_PER_INCH);

export const centimetresToInches = (value: Centimetres): Inches => asInches(value / CM_PER_INCH);

export const centimetresToMetres = (value: Centimetres): Metres => asMetres(value / 100);

export const metresToCentimetres = (value: Metres): Centimetres => asCentimetres(value * 100);

export const millimetresToCentimetres = (value: Millimetres): Centimetres =>
  asCentimetres(value / 10);

/** Combines a feet-and-inches height into total inches. */
export const feetAndInchesToInches = (feet: number, inches: number): Inches =>
  asInches(feet * INCHES_PER_FOOT + inches);

/** Splits total inches into whole feet plus remaining inches, for display. */
export const inchesToFeetAndInches = (value: Inches): { feet: number; inches: number } => {
  const totalWholeInches = Math.round(value);
  return {
    feet: Math.floor(totalWholeInches / INCHES_PER_FOOT),
    inches: totalWholeInches % INCHES_PER_FOOT,
  };
};

// --- Time -------------------------------------------------------------------

export const secondsToHours = (value: Seconds): number => value / SECONDS_PER_HOUR;

export const hoursToSeconds = (hours: number): Seconds => asSeconds(hours * SECONDS_PER_HOUR);

export const minutesToSeconds = (minutes: number): Seconds =>
  asSeconds(minutes * SECONDS_PER_MINUTE);
