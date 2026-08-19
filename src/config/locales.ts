/**
 * Locale definitions — the single source of truth.
 *
 * Imported by both `astro.config.mjs` and `src/config/site.ts`. Astro loads its
 * config through Vite, so a TypeScript import works there, and sharing one
 * definition is what stops the routing config and the hreflang map from
 * drifting apart. A drift between them would not fail the build: it would emit
 * hreflang tags pointing at routes that do not exist, across every page.
 */

export interface LocaleDefinition {
  /** BCP-47 language tag, used for hreflang, `<html lang>` and Intl. */
  readonly code: string;
  /** URL path segment. Lowercase, because URLs are. */
  readonly path: string;
  /** Open Graph locale, which uses underscores and a required region. */
  readonly ogLocale: string;
  /** Text direction; only Arabic differs among the launch set. */
  readonly dir: 'ltr' | 'rtl';
  /** Endonym — the language's own name for itself, for the language switcher. */
  readonly name: string;
  /**
   * Locale tag passed to Intl for number formatting. Usually the same as
   * `code`, but pinned explicitly so a region-less tag cannot fall back to a
   * different numbering system than intended.
   */
  readonly numberLocale: string;
}

export const LOCALES = [
  {
    code: 'en',
    path: 'en',
    ogLocale: 'en_US',
    dir: 'ltr',
    name: 'English',
    numberLocale: 'en-US',
  },
  { code: 'es', path: 'es', ogLocale: 'es_ES', dir: 'ltr', name: 'Español', numberLocale: 'es-ES' },
  {
    code: 'pt-BR',
    path: 'pt-br',
    ogLocale: 'pt_BR',
    dir: 'ltr',
    name: 'Português (Brasil)',
    numberLocale: 'pt-BR',
  },
  {
    code: 'fr',
    path: 'fr',
    ogLocale: 'fr_FR',
    dir: 'ltr',
    name: 'Français',
    numberLocale: 'fr-FR',
  },
  { code: 'de', path: 'de', ogLocale: 'de_DE', dir: 'ltr', name: 'Deutsch', numberLocale: 'de-DE' },
  {
    code: 'it',
    path: 'it',
    ogLocale: 'it_IT',
    dir: 'ltr',
    name: 'Italiano',
    numberLocale: 'it-IT',
  },
  { code: 'hi', path: 'hi', ogLocale: 'hi_IN', dir: 'ltr', name: 'हिन्दी', numberLocale: 'hi-IN' },
  {
    code: 'id',
    path: 'id',
    ogLocale: 'id_ID',
    dir: 'ltr',
    name: 'Bahasa Indonesia',
    numberLocale: 'id-ID',
  },
  { code: 'ja', path: 'ja', ogLocale: 'ja_JP', dir: 'ltr', name: '日本語', numberLocale: 'ja-JP' },
  { code: 'ar', path: 'ar', ogLocale: 'ar_AR', dir: 'rtl', name: 'العربية', numberLocale: 'ar-EG' },
] as const satisfies readonly LocaleDefinition[];

export type Locale = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE = 'en' satisfies Locale;

export const LOCALE_CODES = LOCALES.map((locale) => locale.code) as readonly Locale[];

/**
 * Keyed access. Written as a typed record so `LOCALE_BY_CODE[locale]` is total
 * for a `Locale` key — adding a locale to LOCALES is then a one-line change the
 * compiler checks everywhere, which is what section 6.3 of the brief asks for.
 */
export const LOCALE_BY_CODE = Object.fromEntries(
  LOCALES.map((locale) => [locale.code, locale])
) as {
  readonly [K in Locale]: Extract<(typeof LOCALES)[number], { code: K }>;
};

/**
 * The `locales` value Astro's i18n config expects.
 *
 * Locales whose path differs from their code are expressed in object form so
 * the URL stays lowercase while hreflang keeps its correct casing.
 *
 * The annotation is required, not decorative: Astro types `codes` as a
 * non-empty tuple `[string, ...string[]]`, and an inferred `.map()` result
 * widens to `string[]`, which does not satisfy it.
 */
export const ASTRO_I18N_LOCALES = LOCALES.map((locale) =>
  locale.path === locale.code
    ? locale.code
    : { path: locale.path, codes: [locale.code] as [string, ...string[]] }
);

/** Maps an app locale to its Open Graph equivalent. */
export const toOgLocale = (locale: Locale): string => LOCALE_BY_CODE[locale].ogLocale;

/** Text direction for a locale. */
export const toDir = (locale: Locale): 'ltr' | 'rtl' => LOCALE_BY_CODE[locale].dir;

/** True when the value is one of the shipped locales. */
export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALE_CODES as readonly string[]).includes(value);

/**
 * URL prefix for a locale, including trailing slash, or '/' for the default.
 *
 * The default locale is served from the root with no prefix
 * (`prefixDefaultLocale: false`), so English URLs have no `/en/` segment.
 */
export const localePrefix = (locale: Locale): string =>
  locale === DEFAULT_LOCALE ? '/' : `/${LOCALE_BY_CODE[locale].path}/`;
