/**
 * Total daily energy expenditure.
 *
 * TDEE = BMR x activity multiplier. The multiplier is a physical activity level
 * (PAL): the ratio of total energy expenditure to basal metabolic rate.
 *
 * A note on sourcing, because it matters here more than anywhere else in this
 * library. The five multipliers below — 1.2, 1.375, 1.55, 1.725, 1.9 — are the
 * set every consumer calculator uses, and they are what users expect to see.
 * They do **not** originate in a single published paper. They are a convention
 * that propagated through fitness literature, and sites that cite them to
 * Harris-Benedict or Mifflin-St Jeor are citing papers that do not contain them.
 * This library does not repeat that error.
 *
 * What *is* published, and what these values are checked against:
 *
 * - Institute of Medicine, "Dietary Reference Intakes for Energy, Carbohydrate,
 *   Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids", National
 *   Academies Press, Washington DC, 2005, chapter 12. Defines PAL categories
 *   from doubly labelled water data: sedentary >= 1.0 < 1.4, low active
 *   >= 1.4 < 1.6, active >= 1.6 < 1.9, very active >= 1.9 < 2.5.
 * - FAO/WHO/UNU Expert Consultation, "Human Energy Requirements", FAO Food and
 *   Nutrition Technical Report Series 1, Rome 2004. Defines lifestyle PAL
 *   bands: sedentary/light 1.40-1.69, moderately active 1.70-1.99, vigorously
 *   active 2.00-2.40.
 *
 * Each level below carries the IOM band it falls in, so the page can show
 * honestly where the conventional number sits against the evidence. The
 * conventional "sedentary" 1.2 sits inside the IOM sedentary band but below the
 * FAO floor of 1.40 — a real discrepancy, surfaced rather than hidden.
 */

import type { Kcal } from './units';
import { indexById } from './lookup';

/** The IOM 2005 PAL categories, as half-open intervals. */
export const IOM_PAL_BANDS = [
  { id: 'sedentary', min: 1.0, max: 1.4 },
  { id: 'low_active', min: 1.4, max: 1.6 },
  { id: 'active', min: 1.6, max: 1.9 },
  { id: 'very_active', min: 1.9, max: 2.5 },
] as const;

export type IomPalBandId = (typeof IOM_PAL_BANDS)[number]['id'];

export const ACTIVITY_LEVELS = [
  {
    id: 'sedentary',
    multiplier: 1.2,
    /** Desk work, no deliberate exercise. */
    iomBand: 'sedentary',
  },
  {
    id: 'lightly_active',
    multiplier: 1.375,
    /** Light exercise or sport 1-3 days a week. */
    iomBand: 'sedentary',
  },
  {
    id: 'moderately_active',
    multiplier: 1.55,
    /** Moderate exercise or sport 3-5 days a week. */
    iomBand: 'low_active',
  },
  {
    id: 'very_active',
    multiplier: 1.725,
    /** Hard exercise or sport 6-7 days a week. */
    iomBand: 'active',
  },
  {
    id: 'extra_active',
    multiplier: 1.9,
    /** Hard daily exercise plus a physically demanding job, or twice-daily training. */
    iomBand: 'very_active',
  },
] as const satisfies readonly {
  id: string;
  multiplier: number;
  iomBand: IomPalBandId;
}[];

export type ActivityLevelId = (typeof ACTIVITY_LEVELS)[number]['id'];

export const DEFAULT_ACTIVITY_LEVEL: ActivityLevelId = 'moderately_active';

const ACTIVITY_BY_ID = indexById(ACTIVITY_LEVELS);

export const activityMultiplier = (id: ActivityLevelId): number => ACTIVITY_BY_ID[id].multiplier;

/** Which IOM band a given multiplier falls in, or null if outside all of them. */
export const iomBandFor = (multiplier: number): IomPalBandId | null =>
  IOM_PAL_BANDS.find((band) => multiplier >= band.min && multiplier < band.max)?.id ?? null;

/**
 * TDEE = BMR x PAL.
 *
 * Full precision; rounded once at display.
 */
export const totalDailyEnergyExpenditure = (bmr: number, level: ActivityLevelId): number =>
  bmr * activityMultiplier(level);

/** Every activity level applied to one BMR, for the comparison table. */
export const allActivityEstimates = (bmr: number): Record<ActivityLevelId, number> =>
  Object.fromEntries(ACTIVITY_LEVELS.map((level) => [level.id, bmr * level.multiplier])) as Record<
    ActivityLevelId,
    number
  >;

/**
 * Energy expended above rest.
 *
 * Useful on the calories-burned pages, where the honest figure for an activity
 * is the *additional* energy over doing nothing, not the gross total that
 * includes the BMR the body would have spent anyway.
 */
export const activityEnergyAboveRest = (tdee: number, bmr: number): Kcal =>
  Math.max(0, tdee - bmr) as Kcal;
