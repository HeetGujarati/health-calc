import { centimetresToInches, type Centimetres } from './units';

/**
 * US Army body composition standard.
 *
 * IMPORTANT — this is not the tape test, and deliberately so.
 *
 * Army Directive 2026-13, "Army Body Composition Program and Standards",
 * effective 7 July 2026, rescinded three things at once: the height and weight
 * screening tables, the circumference-based tape test, and every supplemental
 * body fat assessment method (DXA, InBody, Bod Pod). It replaced all of them
 * with waist-to-height ratio as the Army's sole body composition assessment.
 *
 * That directive superseded Army Directive 2023-11, which had itself replaced
 * the older multi-site tape formula (neck and waist for men; neck, waist and
 * hip for women) with a one-site abdominal measurement from 8 June 2024.
 *
 * Almost every "army body fat calculator" online still implements the
 * multi-site tape formula, which has now been out of use for over two years and
 * rescinded outright for one. Implementing it here would mean shipping a
 * calculator that produces a number the Army does not use and will not accept.
 * The rescinded formulas are therefore *not* implemented: the brief forbids
 * publishing figures that cannot be sourced to a current authority, and a
 * historical number presented next to a live one invites exactly the confusion
 * this page exists to resolve. The page explains what changed and when, which
 * is the genuinely useful thing to tell someone searching for the tape test.
 *
 * Source: Army Directive 2026-13, Army Body Composition Program and Standards,
 * Headquarters Department of the Army, effective 7 July 2026 (publication
 * reference ARN47030). Corroborated by the Army Body Composition Program FAQ
 * and by contemporaneous reporting in Stars and Stripes, 7 July 2026.
 */

/**
 * The single passing threshold.
 *
 * The standard is "less than, but not equal to" 0.55 — a ratio of exactly 0.550
 * does not meet it. This is a strict inequality and is tested as one.
 */
export const ARMY_WHTR_THRESHOLD = 0.55;

/** The standard is recorded to three decimal places. */
export const ARMY_WHTR_PRECISION = 3;

/** Effective date of the current standard, for the page's "last updated" copy. */
export const ARMY_STANDARD_EFFECTIVE_DATE = '2026-07-07';

/** Assessments per calendar year under the directive. */
export const ARMY_ASSESSMENTS_PER_YEAR = 2;

/**
 * Waist-to-height ratio.
 *
 * Waist is measured horizontally at the navel; height is standing height. The
 * directive expresses both in inches, but the ratio is dimensionless, so any
 * consistent pair of units gives the same answer. Centimetres are converted
 * anyway, so that a caller passing mixed units gets a type error rather than a
 * wrong ratio.
 *
 * Notably, and unlike every method it replaced, there is no age adjustment and
 * no sex adjustment. One number, one threshold, everyone.
 */
export const waistToHeightRatio = (waist: Centimetres, height: Centimetres): number => {
  const waistIn = centimetresToInches(waist);
  const heightIn = centimetresToInches(height);
  return waistIn / heightIn;
};

/**
 * Rounds to the recorded precision.
 *
 * Applied before the comparison, because the directive records the ratio to
 * three decimals and judges *that* value. A raw ratio of 0.54996 records as
 * 0.550, which does not meet the standard even though the unrounded number is
 * below it. Rounding after comparison would pass someone the Army would not.
 */
export const recordedWhtr = (ratio: number): number => {
  const factor = 10 ** ARMY_WHTR_PRECISION;
  return Math.round(ratio * factor) / factor;
};

export interface ArmyBodyCompositionResult {
  /** The raw, unrounded ratio. */
  readonly ratio: number;
  /** The ratio as recorded, to three decimal places. */
  readonly recorded: number;
  readonly meetsStandard: boolean;
  readonly threshold: number;
  /**
   * The largest waist, in centimetres, that would meet the standard at this
   * height. Gives the page something concrete and neutral to show.
   */
  readonly maxWaistCm: number;
}

export const armyBodyComposition = (
  waist: Centimetres,
  height: Centimetres
): ArmyBodyCompositionResult => {
  const ratio = waistToHeightRatio(waist, height);
  const recorded = recordedWhtr(ratio);
  return {
    ratio,
    recorded,
    meetsStandard: recorded < ARMY_WHTR_THRESHOLD,
    threshold: ARMY_WHTR_THRESHOLD,
    maxWaistCm: maxWaistForStandard(height),
  };
};

/**
 * The largest waist, to the nearest 0.1 cm, that still meets the standard.
 *
 * The rounding interaction here is subtle enough to be worth spelling out. The
 * standard is recorded to three decimals *and* is a strict inequality, so the
 * passing ceiling is not 0.5495: that value records as 0.550, which fails.
 * A passing ratio must record to 0.549 or lower.
 *
 * So the supremum is exclusive, and returning it directly would hand back a
 * waist that fails the very standard this function is describing. Instead the
 * value is floored to a tenth of a centimetre — a precision anyone can actually
 * measure to — and then verified. The verification step covers the case where
 * the floor lands exactly on the exclusive boundary.
 */
export const maxWaistForStandard = (height: Centimetres): number => {
  const exclusiveSupremum = height * (ARMY_WHTR_THRESHOLD - 0.5 / 10 ** ARMY_WHTR_PRECISION);
  const candidate = Math.floor(exclusiveSupremum * 10) / 10;
  const passes = (waistCm: number): boolean => recordedWhtr(waistCm / height) < ARMY_WHTR_THRESHOLD;
  // Step down one tenth if the floor itself landed on the failing boundary.
  return passes(candidate) ? candidate : Math.round((candidate - 0.1) * 10) / 10;
};
