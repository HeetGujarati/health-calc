import {
  METRES_PER_KILOMETRE,
  METRES_PER_MILE,
  SECONDS_PER_HOUR,
  asSeconds,
  type Seconds,
} from './units';
import { indexById } from './lookup';

/**
 * Running pace, speed and finish time.
 *
 * Pure arithmetic rather than an empirical model, so there is no source paper
 * to cite: pace is distance over time by definition. The race distances below
 * are the official ones, and the marathon and half marathon lengths are fixed
 * by World Athletics Competition Rule 55.
 *
 * Everything is computed in metres and seconds internally and converted once at
 * the edges, so no rounding accumulates across a splits table.
 */

export const RACE_DISTANCES = [
  { id: '100m', metres: 100 },
  { id: '400m', metres: 400 },
  { id: '1-mile', metres: METRES_PER_MILE },
  { id: '3k', metres: 3 * METRES_PER_KILOMETRE },
  { id: '5k', metres: 5 * METRES_PER_KILOMETRE },
  { id: '10k', metres: 10 * METRES_PER_KILOMETRE },
  { id: '15k', metres: 15 * METRES_PER_KILOMETRE },
  { id: 'half-marathon', metres: 21_097.5 },
  { id: 'marathon', metres: 42_195 },
  { id: '50k', metres: 50 * METRES_PER_KILOMETRE },
] as const;

export type RaceDistanceId = (typeof RACE_DISTANCES)[number]['id'];

const DISTANCE_BY_ID = indexById(RACE_DISTANCES);

export const raceDistanceMetres = (id: RaceDistanceId): number => DISTANCE_BY_ID[id].metres;

/** Seconds per kilometre. */
export const pacePerKilometre = (distanceMetres: number, time: Seconds): number =>
  (time / distanceMetres) * METRES_PER_KILOMETRE;

/** Seconds per mile. */
export const pacePerMile = (distanceMetres: number, time: Seconds): number =>
  (time / distanceMetres) * METRES_PER_MILE;

/** Kilometres per hour. */
export const speedKph = (distanceMetres: number, time: Seconds): number =>
  (distanceMetres / METRES_PER_KILOMETRE) * (SECONDS_PER_HOUR / time);

/** Miles per hour. */
export const speedMph = (distanceMetres: number, time: Seconds): number =>
  (distanceMetres / METRES_PER_MILE) * (SECONDS_PER_HOUR / time);

/** Finish time implied by a pace, in seconds. */
export const finishTime = (distanceMetres: number, secondsPerKilometre: number): Seconds =>
  asSeconds((distanceMetres / METRES_PER_KILOMETRE) * secondsPerKilometre);

export interface Split {
  /** 1-indexed segment number. */
  readonly index: number;
  /** Distance covered at the end of this split, in metres. */
  readonly cumulativeMetres: number;
  /** Elapsed time at the end of this split, in seconds. */
  readonly cumulativeSeconds: number;
  /** True for a final segment shorter than a full unit. */
  readonly partial: boolean;
}

/**
 * Even splits over a distance.
 *
 * The final segment of a race is usually partial — a marathon is 42.195 km, so
 * the 43rd kilometre split covers only 195 m. That segment is flagged rather
 * than dropped or rounded away, because a splits table that silently omits the
 * last 195 m of a marathon is wrong in exactly the place it matters.
 */
export const splits = (
  distanceMetres: number,
  time: Seconds,
  splitMetres: number
): readonly Split[] => {
  if (splitMetres <= 0 || distanceMetres <= 0) return [];

  const secondsPerMetre = time / distanceMetres;
  const result: Split[] = [];
  const fullSplits = Math.floor(distanceMetres / splitMetres);

  for (let index = 1; index <= fullSplits; index += 1) {
    const cumulativeMetres = index * splitMetres;
    result.push({
      index,
      cumulativeMetres,
      cumulativeSeconds: cumulativeMetres * secondsPerMetre,
      partial: false,
    });
  }

  const remainder = distanceMetres - fullSplits * splitMetres;
  // Guard against floating-point dust producing a 0.0000001 m final split.
  if (remainder > 1e-6) {
    result.push({
      index: fullSplits + 1,
      cumulativeMetres: distanceMetres,
      cumulativeSeconds: time,
      partial: true,
    });
  }

  return result;
};

/** Formats seconds as h:mm:ss, or m:ss when under an hour. */
export const formatDuration = (totalSeconds: number): string => {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '--';

  const rounded = Math.round(totalSeconds);
  const hours = Math.floor(rounded / SECONDS_PER_HOUR);
  const minutes = Math.floor((rounded % SECONDS_PER_HOUR) / 60);
  const seconds = rounded % 60;

  const pad = (value: number): string => value.toString().padStart(2, '0');

  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
};

/** Parses "h:mm:ss", "m:ss" or a bare seconds count into seconds. */
export const parseDuration = (input: string): Seconds | null => {
  const trimmed = input.trim();
  if (trimmed === '') return null;

  const parts = trimmed.split(':');
  if (parts.length > 3) return null;

  const numbers = parts.map((part) => Number(part));
  if (numbers.some((value) => !Number.isFinite(value) || value < 0)) return null;

  // Minutes and seconds must be below 60 when a larger unit is present,
  // otherwise "1:75" would silently parse as 135 seconds.
  if (parts.length > 1 && numbers.slice(1).some((value) => value >= 60)) return null;

  const total = numbers.reduce((accumulator, value) => accumulator * 60 + value, 0);
  return asSeconds(total);
};
