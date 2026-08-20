import {
  armyBodyFat,
  bmi,
  bodyFat,
  healthyWeightRange,
  idealWeight,
  leanBodyMass,
} from './definitions/body';
import { bmr, calorie, macro, protein, tdee, waterIntakeCalc } from './definitions/energy';
import {
  caloriesBurnedCalc,
  oneRepMax,
  runningPace,
  targetHeartRate,
} from './definitions/training';
import { bodyType } from './definitions/bodytype';
import { period } from './definitions/cycle';
import { foodScoreCalc } from './definitions/foodscore';
import {
  CALCULATOR_CATEGORIES,
  type CalculatorCategoryId,
  type CalculatorDefinition,
} from './types';

/**
 * The eighteen calculators.
 *
 * Order here is the order they appear in the directory, grouped by category.
 */
export const CALCULATOR_DEFINITIONS: readonly CalculatorDefinition[] = [
  bmi,
  bodyFat,
  leanBodyMass,
  armyBodyFat,
  bmr,
  tdee,
  calorie,
  macro,
  protein,
  waterIntakeCalc,
  oneRepMax,
  caloriesBurnedCalc,
  targetHeartRate,
  runningPace,
  idealWeight,
  healthyWeightRange,
  period,
  bodyType,
  foodScoreCalc,
];

const BY_SLUG = new Map(CALCULATOR_DEFINITIONS.map((entry) => [entry.slug, entry]));

export const getCalculator = (slug: string): CalculatorDefinition | null =>
  BY_SLUG.get(slug) ?? null;

export const calculatorSlugs: readonly string[] = CALCULATOR_DEFINITIONS.map((entry) => entry.slug);

/** Calculators grouped by category, for the directory and the index page. */
export const calculatorsByCategory = (): readonly {
  readonly id: CalculatorCategoryId;
  readonly label: string;
  readonly items: readonly CalculatorDefinition[];
}[] =>
  CALCULATOR_CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
    items: CALCULATOR_DEFINITIONS.filter((entry) => entry.category === category.id),
  })).filter((group) => group.items.length > 0);
