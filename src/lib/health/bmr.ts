import type { Sex } from './validation';
import type { Centimetres, Kilograms, Years } from './units';

/**
 * Basal / resting metabolic rate.
 *
 * Three published equations, offered together because they genuinely disagree —
 * by 100-300 kcal for the same person — and the honest thing is to show that
 * rather than present one number as the truth.
 *
 * Sources:
 * - Mifflin-St Jeor: Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA,
 *   Koh YO. "A new predictive equation for resting energy expenditure in healthy
 *   individuals." American Journal of Clinical Nutrition 51(2), 1990,
 *   pp. 241-247.
 * - Revised Harris-Benedict: Roza AM, Shizgal HM. "The Harris Benedict equation
 *   reevaluated: resting energy requirements and the body cell mass."
 *   American Journal of Clinical Nutrition 40(1), 1984, pp. 168-182.
 *   (Revises the original Harris JA, Benedict FG, Carnegie Institution of
 *   Washington Publication No. 279, 1919.)
 * - Katch-McArdle: Katch FI, McArdle WD. "Nutrition, Weight Control, and
 *   Exercise", Lea & Febiger, Philadelphia, 1977.
 *
 * Default is Mifflin-St Jeor: it was derived from a modern population and
 * validated against indirect calorimetry, and it is the equation the Academy of
 * Nutrition and Dietetics recommends for non-obese and obese adults alike.
 * Harris-Benedict, even revised, was built on a 1919 cohort and tends to
 * over-estimate. Katch-McArdle is the most accurate of the three *when* lean
 * body mass is genuinely known, because it is the only one that responds to
 * body composition — but a guessed body-fat percentage makes it the worst.
 */

export const BMR_FORMULAS = [
  'mifflin_st_jeor',
  'revised_harris_benedict',
  'katch_mcardle',
] as const;

export type BmrFormula = (typeof BMR_FORMULAS)[number];

export const DEFAULT_BMR_FORMULA: BmrFormula = 'mifflin_st_jeor';

/**
 * Mifflin-St Jeor (1990).
 *
 *   men:   BMR = 10W + 6.25H - 5A + 5
 *   women: BMR = 10W + 6.25H - 5A - 161
 *
 * W in kilograms, H in centimetres, A in years.
 */
export const mifflinStJeor = (
  mass: Kilograms,
  height: Centimetres,
  age: Years,
  sex: Sex
): number => {
  const base = 10 * mass + 6.25 * height - 5 * age;
  return sex === 'male' ? base + 5 : base - 161;
};

/**
 * Revised Harris-Benedict (Roza & Shizgal, 1984).
 *
 *   men:   BMR = 88.362 + 13.397W + 4.799H - 5.677A
 *   women: BMR = 447.593 +  9.247W + 3.098H - 4.330A
 *
 * W in kilograms, H in centimetres, A in years.
 */
export const revisedHarrisBenedict = (
  mass: Kilograms,
  height: Centimetres,
  age: Years,
  sex: Sex
): number =>
  sex === 'male'
    ? 88.362 + 13.397 * mass + 4.799 * height - 5.677 * age
    : 447.593 + 9.247 * mass + 3.098 * height - 4.33 * age;

/**
 * Katch-McArdle (1977).
 *
 *   BMR = 370 + 21.6 x LBM
 *
 * LBM in kilograms. Takes no sex argument: lean mass already carries the
 * difference the sex coefficient stands in for in the other two equations.
 */
export const katchMcArdle = (leanBodyMass: Kilograms): number => 370 + 21.6 * leanBodyMass;

export interface BmrInput {
  readonly mass: Kilograms;
  readonly height: Centimetres;
  readonly age: Years;
  readonly sex: Sex;
  /** Required by Katch-McArdle only; ignored by the other two equations. */
  readonly leanBodyMass?: Kilograms;
}

/**
 * Dispatches to the requested equation.
 *
 * Returns null when Katch-McArdle is asked for without lean body mass, rather
 * than silently falling back to a different equation and reporting it under the
 * wrong name.
 */
export const basalMetabolicRate = (input: BmrInput, formula: BmrFormula): number | null => {
  switch (formula) {
    case 'mifflin_st_jeor':
      return mifflinStJeor(input.mass, input.height, input.age, input.sex);
    case 'revised_harris_benedict':
      return revisedHarrisBenedict(input.mass, input.height, input.age, input.sex);
    case 'katch_mcardle':
      return input.leanBodyMass === undefined ? null : katchMcArdle(input.leanBodyMass);
  }
};

/** Every equation that can be computed from the given input, for comparison. */
export const allBmrEstimates = (input: BmrInput): Record<BmrFormula, number | null> => ({
  mifflin_st_jeor: mifflinStJeor(input.mass, input.height, input.age, input.sex),
  revised_harris_benedict: revisedHarrisBenedict(input.mass, input.height, input.age, input.sex),
  katch_mcardle: input.leanBodyMass === undefined ? null : katchMcArdle(input.leanBodyMass),
});
