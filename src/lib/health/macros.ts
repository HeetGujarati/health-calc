import type { Kilograms } from './units';
import { indexById } from './lookup';

/**
 * Macronutrient split.
 *
 * Protein is set per kilogram of body weight, fat as a share of total energy,
 * and carbohydrate takes the remainder. That order is deliberate: protein need
 * scales with body size rather than with intake, fat has a floor below which
 * hormone production and fat-soluble vitamin absorption suffer, and carbohydrate
 * is the macronutrient the body is most flexible about.
 *
 * Sources:
 * - Energy densities (Atwater general factors): Atwater WO, Woods CD. "The
 *   chemical composition of American food materials." US Department of
 *   Agriculture, Office of Experiment Stations, Bulletin 28, 1896.
 * - Acceptable Macronutrient Distribution Ranges: Institute of Medicine,
 *   "Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty
 *   Acids, Cholesterol, Protein, and Amino Acids", National Academies Press,
 *   2005. Protein 10-35% of energy, fat 20-35%, carbohydrate 45-65%.
 * - Protein targets for training populations: Thomas DT, Erdman KA, Burke LM.
 *   "Position of the Academy of Nutrition and Dietetics, Dietitians of Canada,
 *   and the American College of Sports Medicine: Nutrition and Athletic
 *   Performance." Journal of the Academy of Nutrition and Dietetics 116(3),
 *   2016, pp. 501-528.
 */

/** Atwater general factors, kcal per gram. */
export const KCAL_PER_GRAM = {
  protein: 4,
  carbohydrate: 4,
  fat: 9,
} as const;

/**
 * Lowest fat intake this library will produce, as a share of energy.
 *
 * The IOM's Acceptable Macronutrient Distribution Range for fat starts at 20%.
 * Presets do not go below it, so no preset can generate a split that falls
 * outside published guidance.
 */
export const MINIMUM_FAT_FRACTION = 0.2;

export const MACRO_PRESETS = [
  { id: 'maintenance', proteinGramsPerKg: 1.6, fatFraction: 0.3 },
  { id: 'cut', proteinGramsPerKg: 2.0, fatFraction: 0.25 },
  { id: 'bulk', proteinGramsPerKg: 1.6, fatFraction: 0.25 },
  { id: 'high_protein', proteinGramsPerKg: 2.2, fatFraction: 0.25 },
  { id: 'low_carb', proteinGramsPerKg: 2.0, fatFraction: 0.45 },
] as const;

export type MacroPresetId = (typeof MACRO_PRESETS)[number]['id'];
export const DEFAULT_MACRO_PRESET: MacroPresetId = 'maintenance';

const PRESET_BY_ID = indexById(MACRO_PRESETS);

export interface MacroSplit {
  readonly proteinGrams: number;
  readonly fatGrams: number;
  readonly carbohydrateGrams: number;
  readonly proteinKcal: number;
  readonly fatKcal: number;
  readonly carbohydrateKcal: number;
  /**
   * True when protein and fat alone already exceed the calorie target, leaving
   * no room for carbohydrate. Happens at low intakes with high body mass.
   */
  readonly carbohydrateFloored: boolean;
}

/**
 * Splits a calorie target into grams.
 *
 * Carbohydrate is clamped at zero rather than allowed to go negative. A
 * negative carbohydrate figure is meaningless, and silently letting it through
 * would make the three macros stop summing to the calorie target.
 */
export const macroSplit = (
  calories: number,
  bodyMass: Kilograms,
  proteinGramsPerKg: number,
  fatFraction: number
): MacroSplit => {
  const proteinGrams = proteinGramsPerKg * bodyMass;
  const proteinKcal = proteinGrams * KCAL_PER_GRAM.protein;

  const fatKcal = calories * fatFraction;
  const fatGrams = fatKcal / KCAL_PER_GRAM.fat;

  const remainingKcal = calories - proteinKcal - fatKcal;
  const carbohydrateFloored = remainingKcal < 0;
  const carbohydrateKcal = Math.max(0, remainingKcal);

  return {
    proteinGrams,
    fatGrams,
    carbohydrateGrams: carbohydrateKcal / KCAL_PER_GRAM.carbohydrate,
    proteinKcal,
    fatKcal,
    carbohydrateKcal,
    carbohydrateFloored,
  };
};

export const macroSplitFromPreset = (
  calories: number,
  bodyMass: Kilograms,
  preset: MacroPresetId
): MacroSplit => {
  const config = PRESET_BY_ID[preset];
  return macroSplit(calories, bodyMass, config.proteinGramsPerKg, config.fatFraction);
};

/** Each macronutrient as a percentage of the calories actually allocated. */
export const macroPercentages = (
  split: MacroSplit
): { readonly protein: number; readonly fat: number; readonly carbohydrate: number } => {
  const total = split.proteinKcal + split.fatKcal + split.carbohydrateKcal;
  if (total <= 0) return { protein: 0, fat: 0, carbohydrate: 0 };
  return {
    protein: (split.proteinKcal / total) * 100,
    fat: (split.fatKcal / total) * 100,
    carbohydrate: (split.carbohydrateKcal / total) * 100,
  };
};
