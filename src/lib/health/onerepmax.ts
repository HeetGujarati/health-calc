/**
 * One-repetition maximum estimation.
 *
 * Five published equations. They agree closely at low repetition counts and
 * diverge sharply as reps rise, which is the single most useful thing a reader
 * can learn from this page — so all five are shown, always, rather than one
 * being presented as the answer.
 *
 * Sources:
 * - Epley B. "Poundage Chart." Boyd Epley Workout. Body Enterprises, Lincoln
 *   NE, 1985.
 * - Brzycki M. "Strength testing: predicting a one-rep max from reps-to-fatigue."
 *   Journal of Physical Education, Recreation and Dance 64(1), 1993, pp. 88-90.
 * - Lombardi VP. "Beginning Weight Training: The Safe and Effective Way."
 *   Wm. C. Brown, Dubuque IA, 1989.
 * - O'Conner B, Simmons J, O'Shea P. "Weight Training Today." West Publishing,
 *   St. Paul MN, 1989.
 * - Wathan D. "Load assignment." In: Baechle TR (ed), Essentials of Strength
 *   Training and Conditioning. Human Kinetics, Champaign IL, 1994, pp. 435-446.
 *
 * Accuracy: all five were validated in the 2-10 repetition range. Above roughly
 * 10 reps the estimates become dominated by muscular endurance rather than
 * maximal strength, and they diverge from each other by more than they diverge
 * from the truth. The validation ceiling is exported so the UI can say so.
 */

import type { Kilograms } from './units';

export const ONE_REP_MAX_FORMULAS = ['epley', 'brzycki', 'lombardi', 'oconner', 'wathan'] as const;

export type OneRepMaxFormula = (typeof ONE_REP_MAX_FORMULAS)[number];

export const DEFAULT_ONE_REP_MAX_FORMULA: OneRepMaxFormula = 'epley';

/** Beyond this many repetitions the equations were never validated. */
export const RELIABLE_REP_CEILING = 10;

/** Epley (1985): 1RM = w (1 + r/30). */
export const epley = (load: Kilograms, reps: number): number => load * (1 + reps / 30);

/**
 * Brzycki (1993): 1RM = w x 36 / (37 - r).
 *
 * Undefined at 37 reps, where the denominator reaches zero; the repetition
 * validator caps input at 20 long before that, and this returns null rather
 * than Infinity if it is ever reached.
 */
export const brzycki = (load: Kilograms, reps: number): number | null =>
  reps >= 37 ? null : (load * 36) / (37 - reps);

/** Lombardi (1989): 1RM = w x r^0.10. */
export const lombardi = (load: Kilograms, reps: number): number => load * Math.pow(reps, 0.1);

/** O'Conner et al. (1989): 1RM = w (1 + r/40). */
export const oconner = (load: Kilograms, reps: number): number => load * (1 + reps / 40);

/** Wathan (1994): 1RM = 100w / (48.8 + 53.8 e^(-0.075 r)). */
export const wathan = (load: Kilograms, reps: number): number =>
  (100 * load) / (48.8 + 53.8 * Math.exp(-0.075 * reps));

export const oneRepMax = (
  load: Kilograms,
  reps: number,
  formula: OneRepMaxFormula
): number | null => {
  switch (formula) {
    case 'epley':
      return epley(load, reps);
    case 'brzycki':
      return brzycki(load, reps);
    case 'lombardi':
      return lombardi(load, reps);
    case 'oconner':
      return oconner(load, reps);
    case 'wathan':
      return wathan(load, reps);
  }
};

/**
 * Every estimate. Only Brzycki can be undefined (at 37 reps), so the return
 * type says exactly that rather than forcing null checks on the other four.
 */
export const allOneRepMaxEstimates = (
  load: Kilograms,
  reps: number
): {
  readonly epley: number;
  readonly brzycki: number | null;
  readonly lombardi: number;
  readonly oconner: number;
  readonly wathan: number;
} => ({
  epley: epley(load, reps),
  brzycki: brzycki(load, reps),
  lombardi: lombardi(load, reps),
  oconner: oconner(load, reps),
  wathan: wathan(load, reps),
});

/**
 * Mean of the estimates that are defined.
 *
 * Offered because the spread between formulas usually exceeds the error of any
 * one of them, so the average is a more honest single number than picking a
 * favourite.
 */
export const averageOneRepMax = (load: Kilograms, reps: number): number => {
  const values = Object.values(allOneRepMaxEstimates(load, reps)).filter(
    (value): value is number => value !== null
  );
  return values.reduce((total, value) => total + value, 0) / values.length;
};

/**
 * Percentage-of-1RM table.
 *
 * The brief asks for 50-95%. Steps of 5 keep it readable on a phone.
 */
export const ONE_REP_MAX_PERCENTAGES = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95] as const;

export const percentageTable = (
  oneRepMaxValue: number
): readonly { readonly percent: number; readonly load: number }[] =>
  ONE_REP_MAX_PERCENTAGES.map((percent) => ({
    percent,
    load: (oneRepMaxValue * percent) / 100,
  }));

/**
 * Repetitions expected at a given percentage of 1RM, by inverting Epley.
 *
 *   1RM = w (1 + r/30)  =>  r = 30 (1RM/w - 1)
 *
 * Epley is used for the inversion because it is the only one of the five that
 * inverts to a closed form without a special case.
 */
export const repsAtPercentage = (percent: number): number => {
  if (percent <= 0 || percent > 100) return 0;
  return 30 * (100 / percent - 1);
};

/** Load for a target repetition count, derived from an estimated 1RM. */
export const loadForReps = (oneRepMaxValue: number, reps: number): number =>
  oneRepMaxValue / (1 + reps / 30);
