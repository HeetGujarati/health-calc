import { asBeatsPerMinute, type BeatsPerMinute, type Years } from './units';

/**
 * Maximum and target heart rate.
 *
 * Sources:
 * - Fox SM, Naughton JP, Haskell WL. "Physical activity and the prevention of
 *   coronary heart disease." Annals of Clinical Research 3(6), 1971,
 *   pp. 404-432. The origin of "220 minus age".
 * - Tanaka H, Monahan KD, Seals DR. "Age-predicted maximal heart rate
 *   revisited." Journal of the American College of Cardiology 37(1), 2001,
 *   pp. 153-156. A meta-analysis of 351 studies covering 18,712 subjects.
 * - Karvonen MJ, Kentala E, Mustala O. "The effects of training on heart rate:
 *   a longitudinal study." Annales Medicinae Experimentalis et Biologiae
 *   Fenniae 35(3), 1957, pp. 307-315.
 *
 * On accuracy, stated plainly because this is where most calculators mislead:
 * "220 minus age" was never derived from a regression. Fox et al. presented it
 * as an approximation drawn by eye from scattered data, and it carries a
 * standard deviation of roughly 10-12 beats per minute — meaning about a third
 * of people sit more than 10 bpm away from their predicted maximum. Tanaka's
 * equation came from an actual meta-analysis and is the better predictor,
 * particularly over 40, where Fox systematically under-predicts.
 *
 * Neither is a substitute for a measured maximum.
 */

export const MAX_HEART_RATE_FORMULAS = ['tanaka', 'fox'] as const;
export type MaxHeartRateFormula = (typeof MAX_HEART_RATE_FORMULAS)[number];
export const DEFAULT_MAX_HEART_RATE_FORMULA: MaxHeartRateFormula = 'tanaka';

/** Fox et al. (1971): HRmax = 220 - age. */
export const foxMaxHeartRate = (age: Years): BeatsPerMinute => asBeatsPerMinute(220 - age);

/** Tanaka et al. (2001): HRmax = 208 - 0.7 x age. */
export const tanakaMaxHeartRate = (age: Years): BeatsPerMinute => asBeatsPerMinute(208 - 0.7 * age);

export const maxHeartRate = (age: Years, formula: MaxHeartRateFormula): BeatsPerMinute =>
  formula === 'tanaka' ? tanakaMaxHeartRate(age) : foxMaxHeartRate(age);

export const allMaxHeartRateEstimates = (age: Years): Record<MaxHeartRateFormula, number> => ({
  tanaka: tanakaMaxHeartRate(age),
  fox: foxMaxHeartRate(age),
});

/**
 * Karvonen (1957): target = ((HRmax - HRrest) x intensity) + HRrest.
 *
 * Works from heart rate reserve rather than raw maximum, so it accounts for
 * resting heart rate — which is why it is the default. A fit person with a
 * resting rate of 50 and an unfit person at 80 get meaningfully different
 * targets for the same intensity, and the plain-percentage method misses that
 * entirely.
 *
 * `intensity` is a fraction between 0 and 1.
 */
export const karvonenTargetHeartRate = (
  maxHr: BeatsPerMinute,
  restingHr: BeatsPerMinute,
  intensity: number
): BeatsPerMinute => asBeatsPerMinute((maxHr - restingHr) * intensity + restingHr);

/** Plain percentage of maximum, shown for comparison against Karvonen. */
export const percentageOfMaxHeartRate = (
  maxHr: BeatsPerMinute,
  intensity: number
): BeatsPerMinute => asBeatsPerMinute(maxHr * intensity);

/**
 * Training zones.
 *
 * Five-zone model as used in ACSM's Guidelines for Exercise Testing and
 * Prescription. Bounds are fractions of heart rate reserve.
 */
export const HEART_RATE_ZONES = [
  { id: 'very_light', min: 0.5, max: 0.6 },
  { id: 'light', min: 0.6, max: 0.7 },
  { id: 'moderate', min: 0.7, max: 0.8 },
  { id: 'hard', min: 0.8, max: 0.9 },
  { id: 'maximum', min: 0.9, max: 1.0 },
] as const;

export type HeartRateZoneId = (typeof HEART_RATE_ZONES)[number]['id'];

export interface HeartRateZoneRange {
  readonly id: HeartRateZoneId;
  readonly minBpm: number;
  readonly maxBpm: number;
}

/** Every zone expressed in beats per minute, using heart rate reserve. */
export const karvonenZones = (
  maxHr: BeatsPerMinute,
  restingHr: BeatsPerMinute
): readonly HeartRateZoneRange[] =>
  HEART_RATE_ZONES.map((zone) => ({
    id: zone.id,
    minBpm: karvonenTargetHeartRate(maxHr, restingHr, zone.min),
    maxBpm: karvonenTargetHeartRate(maxHr, restingHr, zone.max),
  }));

/** Heart rate reserve: the working range between rest and maximum. */
export const heartRateReserve = (maxHr: BeatsPerMinute, restingHr: BeatsPerMinute): number =>
  maxHr - restingHr;
