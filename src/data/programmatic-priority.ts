/**
 * The thirty programmatic pages that ship in every locale.
 *
 * Section 5.3 gives non-English locales all calculators, all core pages, all
 * charts, all guides, "plus the top 30 programmatic pages by search value".
 *
 * **This ranking is editorial judgement, not measured data.** No keyword tool
 * was consulted and no volume figures are claimed anywhere, because inventing
 * them would be exactly the fabrication the brief forbids. The ordering below
 * is defensible on grounds that do not require a data source:
 *
 * - Head terms over long tail. "calories burned walking" is a query in every
 *   language; "calories burned raking leaves" is a query in very few.
 * - Universal activities over regional ones. Walking, running, cycling and
 *   swimming travel across all ten locales; American football does not.
 * - Base movements over variants. `squat` before `front-squat`, `5k` before
 *   `15k`.
 * - The unqualified form over the qualified. `walking` before `brisk-walking`,
 *   because the plain noun absorbs most of the demand and the page covers the
 *   variants in its table anyway.
 *
 * SEO.md documents how to replace this with real per-locale data once Search
 * Console has enough impressions to rank them honestly, and how to flip
 * `FULL_PROGRAMMATIC_LOCALES` to ship the whole set instead.
 */

/** Activity slugs, most broadly searched first. */
export const PRIORITY_ACTIVITIES: readonly string[] = [
  'walking',
  'running-11kmh',
  'cycling-moderate',
  'swimming-slow',
  'jump-rope',
  'weight-training',
  'yoga',
  'hiit',
  'rowing-machine',
  'elliptical',
  'stair-climbing',
  'hiking',
  'jogging',
  'dance-class',
  'pilates',
  'basketball',
];

/** Lift slugs. The competition lifts, then the common accessories. */
export const PRIORITY_LIFTS: readonly string[] = [
  'bench-press',
  'squat',
  'deadlift',
  'overhead-press',
  'barbell-row',
  'incline-bench',
  'front-squat',
];

/** Race distances. The road-racing standards first. */
export const PRIORITY_DISTANCES: readonly string[] = [
  '5k',
  '10k',
  'half-marathon',
  'marathon',
  '1-mile',
  '400m',
  '3k',
];

/**
 * Every priority slug, as one set for the routing layer.
 *
 * Slugs are unique across the three clusters, so a single set is unambiguous.
 * `programmaticPriorityCount` is asserted against 30 by a unit test: the brief
 * gives a number, and a list that silently drifts to 28 or 34 would satisfy
 * nobody.
 */
export const PRIORITY_PROGRAMMATIC: ReadonlySet<string> = new Set([
  ...PRIORITY_ACTIVITIES,
  ...PRIORITY_LIFTS,
  ...PRIORITY_DISTANCES,
]);

export const programmaticPriorityCount = (): number => PRIORITY_PROGRAMMATIC.size;
