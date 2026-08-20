import {
  computeArmyBodyFat,
  computeBmi,
  computeBodyFat,
  computeHealthyWeightRange,
  computeIdealWeight,
  computeLeanBodyMass,
} from './compute/body';
import {
  computeBmr,
  computeCalorieGoal,
  computeMacros,
  computeProtein,
  computeTdee,
  computeWaterIntake,
} from './compute/energy';
import {
  computeCaloriesBurned,
  computeOneRepMax,
  computeRunningPace,
  computeTargetHeartRate,
} from './compute/training';
import { computePeriod } from './compute/cycle';
import type { ComputeFn } from './result';

/**
 * Slug to compute function.
 *
 * One registry, imported by the single client island, so Astro emits one shared
 * chunk across all sixteen calculator pages rather than a bundle per page. The
 * functions are pure arithmetic over small modules, so the whole registry costs
 * a few kilobytes.
 *
 * Keyed by URL slug, which is also what the page element carries in its
 * data-calculator attribute — so adding a calculator means adding a definition
 * and an entry here, and nothing else.
 */
export const CALCULATORS: Readonly<Record<string, ComputeFn>> = {
  bmi: computeBmi,
  bmr: computeBmr,
  tdee: computeTdee,
  calorie: computeCalorieGoal,
  macro: computeMacros,
  protein: computeProtein,
  'body-fat': computeBodyFat,
  'lean-body-mass': computeLeanBodyMass,
  'ideal-weight': computeIdealWeight,
  'healthy-weight-range': computeHealthyWeightRange,
  'calories-burned': computeCaloriesBurned,
  'one-rep-max': computeOneRepMax,
  'target-heart-rate': computeTargetHeartRate,
  'running-pace': computeRunningPace,
  'water-intake': computeWaterIntake,
  'army-body-fat': computeArmyBodyFat,
  period: computePeriod,
};

export const calculatorSlugs = Object.keys(CALCULATORS);

export const computeFor = (slug: string): ComputeFn | null => CALCULATORS[slug] ?? null;
