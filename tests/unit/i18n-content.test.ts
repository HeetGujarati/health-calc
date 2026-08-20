import { describe, expect, it } from 'vitest';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '../../src/config/locales';
import { CONTENT_MESSAGES } from '../../src/i18n/content';
import { CALCULATOR_DEFINITIONS } from '../../src/data/calculators';
import { ACTIVITIES } from '../../src/data/activities';
import { LIFTS } from '../../src/data/lifts';
import { DISTANCES } from '../../src/data/distances';
import { CHART_DEFINITIONS } from '../../src/data/charts';
import {
  activityKeys,
  calculatorKeys,
  chartKeys,
  distanceKeys,
  liftKeys,
} from '../../src/lib/i18n/content';
import {
  PRIORITY_PROGRAMMATIC,
  programmaticPriorityCount,
} from '../../src/data/programmatic-priority';

/**
 * Content catalog coverage.
 *
 * The key space is derived from the data files, so it cannot drift from what
 * the pages ask for. Two things are checked:
 *
 * - **No dead keys.** A catalog entry no data file asks for is either a typo
 *   or a leftover from deleted content, and both are worth knowing about.
 * - **Coverage per locale.** A missing key is not a crash — `contentText`
 *   falls back to English — so this is the only thing that makes the gap
 *   visible. Every locale is now complete, and `MINIMUM_COVERAGE` is 1: a key
 *   added to a data file without a translation in all nine catalogs fails the
 *   build rather than silently shipping English inside a Japanese page.
 */

const NON_DEFAULT: readonly Locale[] = LOCALES.map((locale) => locale.code).filter(
  (code): code is Locale => code !== DEFAULT_LOCALE
);

const requiredKeys = (): readonly string[] => [
  ...CALCULATOR_DEFINITIONS.flatMap((definition) => calculatorKeys(definition)),
  ...ACTIVITIES.flatMap((activity) => activityKeys(activity)),
  ...LIFTS.flatMap((lift) => liftKeys(lift)),
  ...DISTANCES.flatMap((distance) => distanceKeys(distance)),
  ...CHART_DEFINITIONS.flatMap((chart) => chartKeys(chart)),
];

/**
 * Groups that must be fully translated in every locale.
 *
 * These are the strings that become a page's `<title>`, `<meta description>`
 * and `<h1>` — the ones a duplicate across locales genuinely costs something.
 * Kept as a separate assertion from the coverage floor because it names the
 * offending keys directly, and because it stays meaningful if a future locale
 * is ever added mid-translation.
 */
const IDENTITY_SUFFIXES = ['.heading', '.metaTitle', '.description', '.intro', '.keywords'];

const isIdentityKey = (key: string): boolean =>
  (key.startsWith('calc.') || key.startsWith('chart.')) &&
  IDENTITY_SUFFIXES.some((suffix) => key.endsWith(suffix));

/** Raised as translation lands. Never lowered. At 1 since every locale landed. */
const MINIMUM_COVERAGE = 1;

describe('content catalogs', () => {
  const required = requiredKeys();
  const requiredSet = new Set(required);

  it('derives a stable key space from the data files', () => {
    expect(required.length).toBeGreaterThan(1000);
    expect(new Set(required).size).toBe(required.length);
  });

  it.each(NON_DEFAULT)('%s has no key the data files do not ask for', (locale) => {
    const dead = Object.keys(CONTENT_MESSAGES[locale]).filter((key) => !requiredSet.has(key));
    expect(dead).toEqual([]);
  });

  it.each(NON_DEFAULT)('%s translates every title, description and heading', (locale) => {
    const catalog = CONTENT_MESSAGES[locale];
    const missing = required.filter((key) => isIdentityKey(key) && catalog[key] === undefined);
    expect(missing).toEqual([]);
  });

  it.each(NON_DEFAULT)('%s has no empty translation', (locale) => {
    const catalog = CONTENT_MESSAGES[locale];
    const empty = Object.entries(catalog)
      .filter(([, value]) => value.trim() === '')
      .map(([key]) => key);
    expect(empty).toEqual([]);
  });

  it.each(NON_DEFAULT)('%s meets the coverage floor', (locale) => {
    const catalog = CONTENT_MESSAGES[locale];
    const missing = required.filter((key) => catalog[key] === undefined);
    const done = required.length - missing.length;
    const coverage = done / required.length;
    expect(
      coverage,
      `${locale}: ${String(done)}/${String(required.length)}; first missing: ${missing.slice(0, 5).join(', ')}`
    ).toBeGreaterThanOrEqual(MINIMUM_COVERAGE);
  });

  it('English has no catalog, because the data files are its source of truth', () => {
    expect(CONTENT_MESSAGES.en).toEqual({});
  });
});

describe('programmatic priority list', () => {
  it('contains exactly the thirty pages section 5.3 asks for', () => {
    expect(programmaticPriorityCount()).toBe(30);
  });

  it('names only slugs that exist', () => {
    const known = new Set([
      ...ACTIVITIES.map((activity) => activity.slug),
      ...LIFTS.map((lift) => lift.slug),
      ...DISTANCES.map((distance) => distance.slug),
    ]);
    const unknown = [...PRIORITY_PROGRAMMATIC].filter((slug) => !known.has(slug));
    expect(unknown).toEqual([]);
  });
});
