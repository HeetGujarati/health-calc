import type { Kilograms } from './units';
import { indexById } from './lookup';

/**
 * Daily protein target.
 *
 * Sources:
 * - RDA baseline of 0.8 g/kg: Institute of Medicine, "Dietary Reference Intakes
 *   for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein,
 *   and Amino Acids", National Academies Press, Washington DC, 2005.
 * - Training population ranges of 1.2-2.0 g/kg: Thomas DT, Erdman KA, Burke LM.
 *   "Position of the Academy of Nutrition and Dietetics, Dietitians of Canada,
 *   and the American College of Sports Medicine: Nutrition and Athletic
 *   Performance." Journal of the Academy of Nutrition and Dietetics 116(3),
 *   2016, pp. 501-528.
 * - Plateau near 1.6 g/kg for resistance-training gains: Morton RW, Murphy KT,
 *   McKellar SR, et al. "A systematic review, meta-analysis and meta-regression
 *   of the effect of protein supplementation on resistance training-induced
 *   gains in muscle mass and strength in healthy adults." British Journal of
 *   Sports Medicine 52(6), 2018, pp. 376-384.
 * - Higher intakes during an energy deficit: Helms ER, Zinn C, Rowlands DS,
 *   Brown SR. "A systematic review of dietary protein during caloric restriction
 *   in resistance trained lean athletes." International Journal of Sport
 *   Nutrition and Exercise Metabolism 24(2), 2014, pp. 127-138.
 *
 * A point worth stating plainly on the page: the RDA is the amount that
 * prevents deficiency in most healthy adults, not the amount that is optimal
 * for someone training. Those are different questions, and conflating them is
 * the most common error in protein advice.
 */

/** The Recommended Dietary Allowance, in grams per kilogram of body mass. */
export const PROTEIN_RDA_G_PER_KG = 0.8;

/**
 * Meta-analytic plateau for resistance-training gains.
 *
 * Morton et al. found no further benefit to muscle gain beyond roughly this
 * intake, with a confidence interval extending to about 2.2 g/kg.
 */
export const PROTEIN_PLATEAU_G_PER_KG = 1.6;

export const PROTEIN_LEVELS = [
  { id: 'rda_baseline', gramsPerKg: 0.8 },
  { id: 'lightly_active', gramsPerKg: 1.2 },
  { id: 'endurance_training', gramsPerKg: 1.4 },
  { id: 'resistance_training', gramsPerKg: 1.6 },
  { id: 'building_muscle', gramsPerKg: 1.8 },
  { id: 'training_in_a_deficit', gramsPerKg: 2.2 },
] as const;

export type ProteinLevelId = (typeof PROTEIN_LEVELS)[number]['id'];
export const DEFAULT_PROTEIN_LEVEL: ProteinLevelId = 'resistance_training';

const LEVEL_BY_ID = indexById(PROTEIN_LEVELS);

export const proteinGramsPerKgFor = (level: ProteinLevelId): number =>
  LEVEL_BY_ID[level].gramsPerKg;

/** Daily protein in grams for a body mass and activity level. */
export const proteinTarget = (mass: Kilograms, level: ProteinLevelId): number =>
  mass * proteinGramsPerKgFor(level);

/** The RDA for comparison, always shown alongside the recommendation. */
export const proteinRda = (mass: Kilograms): number => mass * PROTEIN_RDA_G_PER_KG;

/** Every level applied to one body mass, for the comparison table. */
export const allProteinTargets = (mass: Kilograms): Record<ProteinLevelId, number> =>
  Object.fromEntries(PROTEIN_LEVELS.map((level) => [level.id, mass * level.gramsPerKg])) as Record<
    ProteinLevelId,
    number
  >;

/**
 * Protein target based on lean body mass instead of total mass.
 *
 * More defensible at higher body fat percentages, where scaling to total mass
 * inflates the target: protein needs track lean tissue, not fat tissue.
 */
export const proteinTargetFromLeanMass = (leanMass: Kilograms, gramsPerKgLean = 2.0): number =>
  leanMass * gramsPerKgLean;
