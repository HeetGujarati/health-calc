import { secondsToHours, type Kilograms, type MetabolicEquivalent, type Seconds } from './units';

/**
 * Energy expended during an activity, from its metabolic equivalent.
 *
 * A MET is a multiple of resting metabolic rate. One MET is defined as an oxygen
 * uptake of 3.5 mL per kilogram per minute, which is roughly what sitting
 * quietly costs.
 *
 * Sources:
 * - Ainsworth BE, Haskell WL, Herrmann SD, et al. "2011 Compendium of Physical
 *   Activities: a second update of codes and MET values." Medicine and Science
 *   in Sports and Exercise 43(8), 2011, pp. 1575-1581.
 * - Herrmann SD, Willis EA, Ainsworth BE, et al. "2024 Adult Compendium of
 *   Physical Activities: A third update of the energy costs of human
 *   activities." Journal of Sport and Health Science 13(1), 2024, pp. 6-12.
 *
 * Two forms are implemented because they differ by about 5% and both are in
 * common use. The simple form is the one the brief specifies and the one most
 * readers expect; the oxygen-uptake form is what the Compendium's own definition
 * implies. Both are shown, with the difference explained rather than hidden.
 */

/** Oxygen uptake of one MET, in mL per kilogram per minute. */
export const ML_O2_PER_KG_PER_MIN_PER_MET = 3.5;

/**
 * Simple form: kcal = MET x mass(kg) x hours.
 *
 * Relies on the approximation that one MET costs about 1 kcal per kilogram per
 * hour. Slightly under-reads relative to the oxygen-uptake form.
 */
export const caloriesBurned = (
  met: MetabolicEquivalent,
  mass: Kilograms,
  duration: Seconds
): number => met * mass * secondsToHours(duration);

/**
 * Oxygen-uptake form: kcal/min = MET x 3.5 x mass(kg) / 200.
 *
 * Derives from the MET definition plus the caloric equivalent of oxygen
 * (approximately 5 kcal per litre of O2 consumed).
 */
export const caloriesBurnedFromOxygenUptake = (
  met: MetabolicEquivalent,
  mass: Kilograms,
  duration: Seconds
): number => {
  const minutes = duration / 60;
  return ((met * ML_O2_PER_KG_PER_MIN_PER_MET * mass) / 200) * minutes;
};

/**
 * Energy above what rest would have cost over the same period.
 *
 * The honest figure for "calories burned by this workout": an activity at 6
 * METs for an hour does not add six hours' worth of resting energy, it adds
 * five, because the first MET is the resting rate the body would have spent
 * anyway.
 */
export const netCaloriesBurned = (
  met: MetabolicEquivalent,
  mass: Kilograms,
  duration: Seconds
): number => Math.max(0, (met - 1) * mass * secondsToHours(duration));

/** Weights used down the left edge of the reference tables on activity pages. */
export const REFERENCE_MASSES_KG = [55, 65, 75, 85, 95, 110] as const;

/** Durations used across the top of the reference tables, in minutes. */
export const REFERENCE_DURATIONS_MIN = [15, 20, 30, 45, 60, 90] as const;

export interface ReferenceCell {
  readonly massKg: number;
  readonly minutes: number;
  readonly kcal: number;
}

/**
 * The precomputed 6x6 grid every activity page renders.
 *
 * Built at build time so the table is real content in the prerendered HTML and
 * remains usable with JavaScript disabled.
 */
export const referenceTable = (met: MetabolicEquivalent): readonly ReferenceCell[] =>
  REFERENCE_MASSES_KG.flatMap((massKg) =>
    REFERENCE_DURATIONS_MIN.map((minutes) => ({
      massKg,
      minutes,
      kcal: met * massKg * (minutes / 60),
    }))
  );
