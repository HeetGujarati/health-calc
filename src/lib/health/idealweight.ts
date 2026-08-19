import { healthyWeightRange } from './bmi';
import { INCHES_PER_FOOT, centimetresToInches, type Centimetres } from './units';
import type { Sex } from './validation';

/**
 * "Ideal" body weight equations.
 *
 * An important honesty note, which the page states prominently: none of these
 * equations was designed to tell anyone what to weigh. All four come from
 * clinical pharmacy and were built to normalise drug doses — Devine's appeared
 * in a paper about gentamicin dosing. They encode a single number per height,
 * with no range, no body composition and no acknowledgement that healthy people
 * of the same height differ.
 *
 * The healthy BMI range is the more defensible answer to the question people
 * are actually asking, so it is returned alongside every estimate and is what
 * the page leads with.
 *
 * All four share the same shape: a base mass at 5 feet, plus a per-inch
 * increment above it.
 *
 * Sources:
 * - Devine BJ. "Gentamicin therapy." Drug Intelligence and Clinical Pharmacy 8,
 *   1974, pp. 650-655.
 * - Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M. "Determination of
 *   ideal body weight for drug dosage calculations." American Journal of
 *   Hospital Pharmacy 40(6), 1983, pp. 1016-1019.
 * - Miller DR, Carlson JD, Loyd BJ, Day BJ. "Determining ideal body weight."
 *   American Journal of Hospital Pharmacy 40(9), 1983, p. 1622.
 * - Hamwi GJ. "Therapy: changing dietary concepts." In: Danowski TS (ed),
 *   Diabetes Mellitus: Diagnosis and Treatment. American Diabetes Association,
 *   New York, 1964, pp. 73-78.
 */

export const IDEAL_WEIGHT_FORMULAS = ['devine', 'robinson', 'miller', 'hamwi'] as const;
export type IdealWeightFormula = (typeof IDEAL_WEIGHT_FORMULAS)[number];
export const DEFAULT_IDEAL_WEIGHT_FORMULA: IdealWeightFormula = 'devine';

/** Every equation is anchored at five feet. */
const BASE_HEIGHT_INCHES = 5 * INCHES_PER_FOOT;

interface IdealWeightCoefficients {
  readonly baseKg: number;
  readonly kgPerInch: number;
}

const COEFFICIENTS: Readonly<
  Record<IdealWeightFormula, Readonly<Record<Sex, IdealWeightCoefficients>>>
> = {
  devine: {
    male: { baseKg: 50, kgPerInch: 2.3 },
    female: { baseKg: 45.5, kgPerInch: 2.3 },
  },
  robinson: {
    male: { baseKg: 52, kgPerInch: 1.9 },
    female: { baseKg: 49, kgPerInch: 1.7 },
  },
  miller: {
    male: { baseKg: 56.2, kgPerInch: 1.41 },
    female: { baseKg: 53.1, kgPerInch: 1.36 },
  },
  hamwi: {
    male: { baseKg: 48, kgPerInch: 2.7 },
    female: { baseKg: 45.5, kgPerInch: 2.2 },
  },
};

/**
 * Applies one equation.
 *
 * Below five feet the per-inch term goes negative, which every one of these
 * equations does by construction — they were never validated below their
 * anchor. The value is returned as the equation defines it and the page flags
 * heights outside the validated range, rather than silently clamping.
 */
export const idealWeight = (height: Centimetres, sex: Sex, formula: IdealWeightFormula): number => {
  const inches = centimetresToInches(height);
  const coefficients = COEFFICIENTS[formula][sex];
  return coefficients.baseKg + coefficients.kgPerInch * (inches - BASE_HEIGHT_INCHES);
};

export const allIdealWeightEstimates = (
  height: Centimetres,
  sex: Sex
): Record<IdealWeightFormula, number> => ({
  devine: idealWeight(height, sex, 'devine'),
  robinson: idealWeight(height, sex, 'robinson'),
  miller: idealWeight(height, sex, 'miller'),
  hamwi: idealWeight(height, sex, 'hamwi'),
});

/** True when the height sits inside the range these equations were built for. */
export const isWithinValidatedHeightRange = (height: Centimetres): boolean => {
  const inches = centimetresToInches(height);
  return inches >= BASE_HEIGHT_INCHES;
};

export interface IdealWeightSummary {
  readonly estimates: Record<IdealWeightFormula, number>;
  /** The range the page leads with, because it is a range and it is evidence-based. */
  readonly healthyBmiRange: { readonly minKg: number; readonly maxKg: number };
  readonly withinValidatedHeightRange: boolean;
}

export const idealWeightSummary = (height: Centimetres, sex: Sex): IdealWeightSummary => ({
  estimates: allIdealWeightEstimates(height, sex),
  healthyBmiRange: healthyWeightRange(height),
  withinValidatedHeightRange: isWithinValidatedHeightRange(height),
});
