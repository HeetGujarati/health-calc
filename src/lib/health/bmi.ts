import { centimetresToMetres, type Centimetres, type Kilograms, type Metres } from './units';

/**
 * Body mass index and its two common variants.
 *
 * Sources:
 * - BMI (Quetelet index): Quetelet A. "Sur l'homme et le développement de ses
 *   facultés" (1835). Popularised as "body mass index" by Keys A. et al.,
 *   "Indices of relative weight and obesity", Journal of Chronic Diseases 25(6),
 *   1972, pp. 329-343.
 * - Category cut-points: World Health Organization, "Obesity: preventing and
 *   managing the global epidemic", WHO Technical Report Series 894, Geneva 2000.
 * - BMI Prime: Gadzik J. "'How much should I weigh?' — Quetelet's equation,
 *   upper weight limits and BMI prime", Connecticut Medicine 70(2), 2006,
 *   pp. 81-88.
 * - Ponderal index: Rohrer F. "Der Index der Körperfülle als Maß des
 *   Ernährungszustandes", Münchener Medizinische Wochenschrift 68, 1921.
 *
 * What the equation assumes, and what it cannot tell you: BMI is a ratio of
 * mass to height. It contains no information about what that mass is made of,
 * so it does not distinguish muscle from fat, and it does not describe where
 * body fat sits. It was derived from, and validated on, populations rather than
 * individuals — it is a screening indicator, not a diagnosis.
 */

/** Upper bound of the WHO healthy-weight band. Also the BMI Prime denominator. */
export const BMI_PRIME_REFERENCE = 25;

/**
 * WHO adult cut-points, as half-open intervals [min, max).
 *
 * Written as half-open ranges rather than the "18.5-24.9" form seen in
 * summaries, because the real boundary is 25.0 exactly — a BMI of 24.95 falls
 * in the healthy band and would be misclassified by a naive <= 24.9 test.
 */
export const BMI_CATEGORIES = [
  { id: 'underweight', min: -Infinity, max: 18.5 },
  { id: 'healthy_weight', min: 18.5, max: 25 },
  { id: 'overweight', min: 25, max: 30 },
  { id: 'obesity_class_1', min: 30, max: 35 },
  { id: 'obesity_class_2', min: 35, max: 40 },
  { id: 'obesity_class_3', min: 40, max: Infinity },
] as const;

export type BmiCategoryId = (typeof BMI_CATEGORIES)[number]['id'];

/** Lower bound of the healthy band; the goal-weight guard keys off this. */
export const HEALTHY_BMI_MIN = 18.5;
/** Upper bound of the healthy band, exclusive. */
export const HEALTHY_BMI_MAX = 25;

/**
 * BMI = mass (kg) / height (m)^2.
 *
 * Returned at full precision. Rounding happens once, at display, per the
 * rounding policy in rounding.ts.
 */
export const bodyMassIndex = (mass: Kilograms, height: Centimetres): number => {
  const metres: Metres = centimetresToMetres(height);
  return mass / (metres * metres);
};

/**
 * BMI Prime: BMI expressed as a fraction of the upper healthy limit.
 *
 * A value of 1.0 sits exactly at BMI 25, which makes "how far from the band
 * edge" readable at a glance without memorising cut-points.
 */
export const bmiPrime = (bmi: number): number => bmi / BMI_PRIME_REFERENCE;

/**
 * Ponderal index = mass (kg) / height (m)^3.
 *
 * Cubing height rather than squaring it makes the index less sensitive to
 * stature, which is why it is preferred over BMI at the extremes of height
 * where BMI systematically over-reads for tall people and under-reads for
 * short people.
 */
export const ponderalIndex = (mass: Kilograms, height: Centimetres): number => {
  const metres: Metres = centimetresToMetres(height);
  return mass / (metres * metres * metres);
};

/**
 * Classifies a BMI against the WHO adult cut-points.
 *
 * Returns null for a non-finite BMI, which is the one consistent rule: finite
 * input classifies, non-finite input does not.
 *
 * Both non-finite cases would otherwise misbehave. Every comparison against NaN
 * is false, so a NaN falls through the whole table — a table walk with a
 * trailing fallback would report it as the highest band, mislabelling someone
 * from what is really a division by zero. Infinity falls out too, since the top
 * band is [40, Infinity) and Infinity < Infinity is false.
 */
export const bmiCategory = (bmi: number): BmiCategoryId | null => {
  // Guarded explicitly rather than left to the interval edges. Relying on those
  // gives asymmetric results: +Infinity falls outside [40, Infinity) and returns
  // null, but -Infinity satisfies [-Infinity, 18.5) and would be reported as
  // underweight. One explicit rule beats two accidental ones.
  if (!Number.isFinite(bmi)) return null;
  return BMI_CATEGORIES.find((category) => bmi >= category.min && bmi < category.max)?.id ?? null;
};

/**
 * The weight range corresponding to the healthy BMI band at a given height.
 *
 * This is the number the goal-weight guard shows instead of computing a plan
 * toward an underweight target, so it is derived from the same constants
 * rather than duplicated.
 */
export const healthyWeightRange = (
  height: Centimetres
): { readonly minKg: number; readonly maxKg: number } => {
  const metres: Metres = centimetresToMetres(height);
  const squared = metres * metres;
  return {
    minKg: HEALTHY_BMI_MIN * squared,
    maxKg: HEALTHY_BMI_MAX * squared,
  };
};

/** The weight at which a given height would reach a given BMI. */
export const weightForBmi = (bmi: number, height: Centimetres): number => {
  const metres: Metres = centimetresToMetres(height);
  return bmi * metres * metres;
};
