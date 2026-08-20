import { DEFAULT_LOCALE, LOCALE_BY_CODE, type Locale } from '../../config/locales';

/**
 * Locale-aware number and date formatting.
 *
 * Section 5.3 requires correct unit rendering via `Intl.NumberFormat`. Getting
 * this wrong is not cosmetic: "1.234" means one thousand two hundred and
 * thirty-four in German and one-point-two-three-four in English, and a body
 * weight is a number where that distinction matters.
 *
 * Everything here runs at build time. `Intl` is in Node and in every browser
 * the site targets, so this costs nothing at runtime and adds nothing to the
 * JavaScript budget.
 *
 * Formatters are cached: constructing an `Intl.NumberFormat` is expensive
 * relative to using one, and a build renders hundreds of thousands of numbers.
 */

const numberFormatters = new Map<string, Intl.NumberFormat>();

const numberFormatter = (locale: Locale, options: Intl.NumberFormatOptions): Intl.NumberFormat => {
  const tag = LOCALE_BY_CODE[locale].numberLocale;
  const key = `${tag}|${JSON.stringify(options)}`;
  const cached = numberFormatters.get(key);
  if (cached !== undefined) return cached;
  const created = new Intl.NumberFormat(tag, options);
  numberFormatters.set(key, created);
  return created;
};

/**
 * Formats a number for display.
 *
 * `maximumFractionDigits` defaults high enough to leave an already-rounded
 * value alone: rounding is the caller's decision and happens in
 * `lib/health/rounding`, so this must not quietly round again.
 */
export const formatNumber = (
  value: number,
  locale: Locale,
  options: Intl.NumberFormatOptions = {}
): string => {
  if (!Number.isFinite(value)) return '';
  return numberFormatter(locale, { maximumFractionDigits: 4, ...options }).format(value);
};

/** Formats an integer, with the locale's grouping separator. */
export const formatInteger = (value: number, locale: Locale): string =>
  formatNumber(value, locale, { maximumFractionDigits: 0 });

const dateFormatters = new Map<string, Intl.DateTimeFormat>();

/**
 * Formats an ISO date as a long-form date in the locale.
 *
 * Parsed as UTC — `new Date('2026-08-20')` is midnight UTC, and formatting it
 * in a timezone behind UTC would render the previous day. The `timeZone: 'UTC'`
 * option is what stops a build machine's timezone changing what a page says.
 */
export const formatDate = (isoDate: string, locale: Locale): string => {
  const tag = LOCALE_BY_CODE[locale].numberLocale;
  let formatter = dateFormatters.get(tag);
  if (formatter === undefined) {
    formatter = new Intl.DateTimeFormat(tag, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
    dateFormatters.set(tag, formatter);
  }
  const parsed = new Date(`${isoDate}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? isoDate : formatter.format(parsed);
};

/**
 * Locales whose orthography capitalises nouns.
 *
 * English copy reads "calories burned walking", so the activity name is
 * lowercased before interpolation. German capitalises every noun, and
 * "radfahren" is simply misspelled — so the name goes in unchanged there.
 * Scripts without letter case are unaffected either way.
 */
const NOUN_CASE_LOCALES: readonly Locale[] = ['de'];

/** The activity or lift name as it should read inside a sentence. */
export const nameInSentence = (name: string, locale: Locale): string =>
  NOUN_CASE_LOCALES.includes(locale) ? name : name.toLowerCase();

/**
 * Default unit system for a locale.
 *
 * Section 5.3: imperial for the US-targeted English pages, metric everywhere
 * else. The reader's own choice, stored in localStorage by the calculator
 * island, always wins over this — it is only the starting point for someone
 * who has not chosen yet.
 */
export const defaultUnitSystem = (locale: Locale): 'metric' | 'imperial' =>
  locale === DEFAULT_LOCALE ? 'imperial' : 'metric';
