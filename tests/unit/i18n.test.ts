import { describe, expect, it } from 'vitest';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '../../src/config/locales';
import { MESSAGE_KEYS, UI_MESSAGES, interpolate, useTranslations } from '../../src/lib/i18n';
import { en } from '../../src/i18n/ui/en';

/**
 * Key *coverage* is a compile-time guarantee: `Messages` is
 * `Record<keyof typeof en, string>`, so a locale missing a key does not build.
 * These tests cover what the type system cannot see — that the translation is
 * actually a translation, and that the placeholders survived it.
 */

const NON_DEFAULT: readonly Locale[] = LOCALES.map((locale) => locale.code).filter(
  (code): code is Locale => code !== DEFAULT_LOCALE
);

const placeholdersIn = (value: string): readonly string[] =>
  [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1] ?? '').sort();

/**
 * Keys whose correct translation legitimately equals the English string.
 *
 * Every entry is a loanword or an initialism that is genuinely written the same
 * way in that language — not an oversight. Anything not listed here must
 * differ from English, which is what catches a copy-paste that never got
 * translated.
 */
const IDENTICAL_BY_DESIGN: Readonly<Partial<Record<Locale, readonly string[]>>> = {
  // "Cookies" is the borrowed term across the Latin-script European locales.
  // "Imperial", "Legal" and "Error" are the same words in Spanish.
  es: [
    'calc.imperial',
    'footer.legal',
    'notFound.label',
    'consent.heading',
    'cookies.title',
    'footer.cookies',
    'activity.columnKcal30',
    'lift.repsUnit',
    'lift.column100x5',
  ],
  'pt-BR': [
    'calc.imperial',
    'consent.heading',
    'cookies.title',
    'footer.cookies',
    'activity.columnKcal30',
    'lift.column100x5',
    'lift.repsUnit',
  ],
  // French shares a great deal of this vocabulary with English outright.
  fr: [
    'calc.questions',
    'calc.relatedGuides',
    'calc.source',
    'chart.source',
    'contact.title',
    'editorial.h2Corrections',
    'footer.contact',
    'footer.guides',
    'hub.activities.columnCode',
    'hub.guides.title',
    'nav.guides',
    'notFound.guides',
    'consent.heading',
    'cookies.title',
    'footer.cookies',
    'activity.columnKcal30',
    'distance.columnDistance',
    'lift.column100x5',
    'lift.repsUnit',
    'search.typeGuide',
    'search.typePage',
  ],
  // "Training", "Code" and "Imperial" are ordinary German.
  de: [
    'calc.imperial',
    'category.training',
    'consent.heading',
    'cookies.title',
    'footer.cookies',
    'hub.activities.columnCode',
    'activity.columnKcal30',
    'distance.columnPaceKm',
  ],
  // "Privacy" and "Home" are the ordinary Italian usage, not English left in.
  it: ['footer.privacy', 'nav.home', 'privacy.title', 'activity.columnKcal30', 'lift.formula'],
  hi: [],
  id: ['footer.legal', 'calc.imperial', 'distance.columnPaceKm'],
  ja: [],
  ar: [],
};

describe('locale catalogs', () => {
  it('registers every declared locale', () => {
    expect(Object.keys(UI_MESSAGES).sort()).toEqual(LOCALES.map((locale) => locale.code).sort());
  });

  it.each(NON_DEFAULT)('%s has exactly the English key set', (locale) => {
    expect(Object.keys(UI_MESSAGES[locale]).sort()).toEqual([...MESSAGE_KEYS].sort());
  });

  it.each(NON_DEFAULT)('%s preserves every placeholder', (locale) => {
    const messages = UI_MESSAGES[locale];
    for (const key of MESSAGE_KEYS) {
      expect(placeholdersIn(messages[key]), `${locale} → ${key}`).toEqual(placeholdersIn(en[key]));
    }
  });

  it.each(NON_DEFAULT)('%s leaves no string untranslated', (locale) => {
    const allowed = new Set(IDENTICAL_BY_DESIGN[locale] ?? []);
    const messages = UI_MESSAGES[locale];
    const untranslated = MESSAGE_KEYS.filter(
      (key) => messages[key] === en[key] && !allowed.has(key)
    );
    expect(untranslated).toEqual([]);
  });

  it.each(NON_DEFAULT)('%s has no empty value', (locale) => {
    const messages = UI_MESSAGES[locale];
    const empty = MESSAGE_KEYS.filter((key) => messages[key].trim() === '');
    expect(empty).toEqual([]);
  });

  it('the Arabic catalog is the only right-to-left one', () => {
    const rtl = LOCALES.filter((locale) => locale.dir === 'rtl').map((locale) => locale.code);
    expect(rtl).toEqual(['ar']);
  });
});

describe('interpolate', () => {
  it('substitutes named placeholders', () => {
    expect(interpolate('{count} results for "{query}".', { count: 3, query: 'bmi' })).toBe(
      '3 results for "bmi".'
    );
  });

  it('leaves an unmatched placeholder visible rather than blanking it', () => {
    // A silently blanked placeholder produces " results for" on a live page and
    // nothing fails; a visible {count} is caught by the HTML gate.
    expect(interpolate('{count} results', {})).toBe('{count} results');
  });

  it('substitutes every occurrence of the same placeholder', () => {
    expect(interpolate('{a} and {a}', { a: 'x' })).toBe('x and x');
  });

  it('ignores braces that are not placeholders', () => {
    expect(interpolate('a { b } c', { b: 'x' })).toBe('a { b } c');
  });
});

describe('useTranslations', () => {
  it('returns the catalog string for the bound locale', () => {
    expect(useTranslations('de')('nav.calculators')).toBe('Rechner');
    expect(useTranslations('ja')('nav.calculators')).toBe('計算ツール');
  });

  it('carries its locale', () => {
    expect(useTranslations('ar').locale).toBe('ar');
  });

  it('interpolates through the bound translator', () => {
    expect(useTranslations('es')('hub.calculators.intro', { count: 16 })).toContain('16');
  });
});
