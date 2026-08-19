import { secondsToHours, type Kilograms, type Seconds } from './units';
import type { Sex } from './validation';

/**
 * Daily fluid intake estimate.
 *
 * Sources:
 * - Institute of Medicine, "Dietary Reference Intakes for Water, Potassium,
 *   Sodium, Chloride, and Sulfate", National Academies Press, Washington DC,
 *   2005. Adequate Intake for *total* water: 3.7 L/day for men, 2.7 L/day for
 *   women, of which roughly 80% comes from drinks and 20% from food.
 * - EFSA Panel on Dietetic Products, Nutrition and Allergies. "Scientific
 *   Opinion on Dietary Reference Values for water." EFSA Journal 8(3), 2010,
 *   1459. Adequate Intake for total water: 2.5 L/day men, 2.0 L/day women.
 * - Sweat replacement during exercise: Sawka MN, Burke LM, Eichner ER, et al.
 *   "American College of Sports Medicine position stand: Exercise and fluid
 *   replacement." Medicine and Science in Sports and Exercise 39(2), 2007,
 *   pp. 377-390.
 *
 * Two honest caveats the page carries. First, the "8 glasses a day" rule has no
 * identifiable source in the scientific literature. Second, the IOM's own
 * report states that the great majority of healthy people meet their needs by
 * letting thirst guide them — these numbers are population reference values,
 * not a target anyone must hit.
 */

/** IOM 2005 Adequate Intake for total water, litres per day. */
export const IOM_TOTAL_WATER_AI_LITRES: Readonly<Record<Sex, number>> = {
  male: 3.7,
  female: 2.7,
};

/** EFSA 2010 Adequate Intake for total water, litres per day. */
export const EFSA_TOTAL_WATER_AI_LITRES: Readonly<Record<Sex, number>> = {
  male: 2.5,
  female: 2.0,
};

/**
 * Share of total water intake that typically comes from food rather than
 * drinks, per the IOM report. Used to convert a total-water reference value
 * into a drinks-only figure, which is what people actually want to know.
 */
export const FOOD_WATER_FRACTION = 0.2;

/** Millilitres per kilogram of body mass, the body-weight-scaled approach. */
export const ML_PER_KG_RANGE = { min: 30, max: 35 } as const;

/**
 * Additional fluid per hour of exercise, in litres.
 *
 * The ACSM position stand declines to give a single number, because sweat rates
 * vary from roughly 0.3 to 2.4 L/hour with intensity, heat and individual
 * physiology. This mid-range figure is offered as an estimate and labelled as
 * one; the page explains that weighing before and after a session is the only
 * way to know a personal sweat rate.
 */
export const LITRES_PER_HOUR_EXERCISE = 0.5;

export const CLIMATES = ['temperate', 'hot', 'very_hot'] as const;
export type Climate = (typeof CLIMATES)[number];
export const DEFAULT_CLIMATE: Climate = 'temperate';

/**
 * Multipliers for ambient conditions.
 *
 * Directional rather than precise: heat raises sweat losses substantially, but
 * no published equation maps temperature to intake for the general public, so
 * these are presented as adjustments and the page says so.
 */
export const CLIMATE_MULTIPLIERS: Readonly<Record<Climate, number>> = {
  temperate: 1.0,
  hot: 1.15,
  very_hot: 1.3,
};

export interface WaterIntakeResult {
  /** Drinks-only recommendation in litres per day. */
  readonly litres: number;
  /** The body-weight-derived baseline before adjustments, in litres. */
  readonly baselineLitres: number;
  /** Additional litres attributed to exercise. */
  readonly exerciseLitres: number;
  /** Reference values shown alongside, so the estimate has context. */
  readonly iomTotalWaterLitres: number;
  readonly efsaTotalWaterLitres: number;
}

/**
 * Body-weight-based estimate with activity and climate adjustments.
 *
 * The baseline uses the midpoint of the 30-35 mL/kg range.
 */
export const waterIntake = (input: {
  readonly mass: Kilograms;
  readonly sex: Sex;
  readonly exerciseDuration?: Seconds;
  readonly climate?: Climate;
}): WaterIntakeResult => {
  const mlPerKg = (ML_PER_KG_RANGE.min + ML_PER_KG_RANGE.max) / 2;
  const baselineLitres = (input.mass * mlPerKg) / 1000;

  const exerciseHours =
    input.exerciseDuration === undefined ? 0 : secondsToHours(input.exerciseDuration);
  const exerciseLitres = exerciseHours * LITRES_PER_HOUR_EXERCISE;

  const climate = input.climate ?? DEFAULT_CLIMATE;
  const litres = (baselineLitres + exerciseLitres) * CLIMATE_MULTIPLIERS[climate];

  return {
    litres,
    baselineLitres,
    exerciseLitres,
    iomTotalWaterLitres: IOM_TOTAL_WATER_AI_LITRES[input.sex],
    efsaTotalWaterLitres: EFSA_TOTAL_WATER_AI_LITRES[input.sex],
  };
};

/** Converts a total-water reference value to the drinks-only equivalent. */
export const drinksOnlyFromTotalWater = (totalWaterLitres: number): number =>
  totalWaterLitres * (1 - FOOD_WATER_FRACTION);
