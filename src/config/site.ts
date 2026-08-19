import { DEFAULT_LOCALE, LOCALE_CODES, type Locale } from './locales';

/**
 * Site configuration — the single source of truth.
 *
 * Nothing anywhere else in the codebase may hardcode any of these values
 * (brief section 6.1). If a string appears in two places, one of them is wrong
 * and nobody finds out until it is wrong on 880 pages.
 *
 * Values the owner must set before launch are marked OWNER PLACEHOLDER and are
 * listed as a checklist in DEPLOY.md.
 */

/**
 * Canonical origin.
 *
 * Read from PUBLIC_SITE_URL so the host controls it. The documented fallback is
 * the Cloudflare Pages project subdomain — where the site genuinely resolves
 * before a custom domain is attached — so an unset variable still produces
 * working absolute URLs rather than canonicals pointing at a domain nobody owns.
 *
 * Trailing slashes are stripped so callers can always join with a leading-slash
 * path without producing a double slash.
 */
const resolveBaseUrl = (): string => {
  // Typed as unknown because import.meta.env is `any`; the checks below are
  // what actually establish it is a usable string.
  const configured: unknown = import.meta.env.PUBLIC_SITE_URL;
  const raw =
    typeof configured === 'string' && configured.trim() !== ''
      ? configured.trim()
      : 'https://fitness-calculators.pages.dev';
  return raw.replace(/\/+$/, '');
};

export interface SiteConfig {
  readonly name: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly defaultDescription: string;
  readonly baseUrl: string;
  readonly defaultLocale: Locale;
  readonly locales: readonly Locale[];
  readonly globalKeywords: readonly string[];
  readonly defaultOgImage: string;
  readonly ogImageDimensions: { readonly width: number; readonly height: number };
  readonly creator: {
    readonly name: string;
    readonly url: string;
    /** Null until the owner supplies a real account. Never invented. */
    readonly twitter: string | null;
  };
  readonly publisher: string;
  readonly themeColor: { readonly light: string; readonly dark: string };
  /** Null until the owner supplies a real account. Never invented. */
  readonly twitterHandle: string | null;
  readonly contactEmail: string;
  readonly FULL_PROGRAMMATIC_LOCALES: readonly Locale[];
}

/**
 * Annotated with `SiteConfig` rather than `satisfies` it.
 *
 * `satisfies` would preserve the literal types, so `twitterHandle` would narrow
 * to exactly `null` and every guard against it would read as dead code to the
 * compiler — even though the field exists precisely to be filled in later. The
 * annotation widens it to the declared `string | null`, which is what the field
 * actually means.
 */
export const SITE: SiteConfig = Object.freeze({
  name: 'Baseline',
  shortName: 'Baseline',
  tagline: 'Health and fitness calculators, with the working shown',

  /**
   * Used when a page supplies no description of its own. Kept under 157
   * characters so the truncation path is never exercised on it.
   */
  defaultDescription:
    'Free health and fitness calculators built on published equations, each one cited so you can check the source and see how the number was reached.',

  baseUrl: resolveBaseUrl(),

  defaultLocale: DEFAULT_LOCALE,
  locales: LOCALE_CODES,

  /**
   * Merged into every page's keywords, global first, then page-specific,
   * deduplicated case-insensitively and capped at 15 (brief section 6.2.3).
   *
   * Deliberately broad category terms. Page-specific keywords carry the
   * intent; these carry the category.
   */
  globalKeywords: [
    'fitness calculator',
    'health calculator',
    'calorie calculator',
    'bmi calculator',
    'bmr calculator',
    'tdee calculator',
    'body fat calculator',
    'macro calculator',
    'free calculator',
    'metric and imperial',
  ],

  defaultOgImage: '/og/default.png',
  ogImageDimensions: { width: 1200, height: 630 },

  /**
   * The creator is the site itself, not a person.
   *
   * Section 4.3 rule 8 and section 6.4 both forbid inventing a named author or
   * reviewer. Article and Organization schema therefore attribute to the
   * organisation, which is the honest and accurate answer.
   */
  creator: {
    name: 'Baseline',
    url: resolveBaseUrl(),
    twitter: null,
  },
  publisher: 'Baseline',

  /**
   * Matches the surface colour in tokens.css for each scheme, so the browser
   * chrome continues the page rather than banding against it.
   */
  themeColor: {
    light: '#f7f7f5',
    dark: '#16171a',
  },

  /**
   * OWNER PLACEHOLDER — null until a real account exists.
   *
   * Emitting an invented handle would attribute the site to whoever actually
   * owns it. When null, the Twitter card omits `site` and `creator` and still
   * renders correctly: neither is required for a summary_large_image card.
   */
  twitterHandle: null,

  /** OWNER PLACEHOLDER — see the checklist in DEPLOY.md. */
  contactEmail: 'hello@example.com',

  /**
   * Locales that receive the *full* programmatic page set rather than the top
   * 30 by search value (brief section 5.3).
   *
   * Ships empty: a new domain should get its core pages indexed before adding
   * several hundred thin translated pages per locale. SEO.md documents how to
   * flip this once indexation is established.
   */
  FULL_PROGRAMMATIC_LOCALES: [],
});

/** Number of programmatic pages a non-full locale receives, per section 5.3. */
export const PROGRAMMATIC_PAGES_PER_PARTIAL_LOCALE = 30;

/** True when a locale gets every programmatic page. */
export const hasFullProgrammaticSet = (locale: Locale): boolean =>
  locale === SITE.defaultLocale || SITE.FULL_PROGRAMMATIC_LOCALES.includes(locale);
