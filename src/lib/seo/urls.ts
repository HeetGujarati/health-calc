import { SITE } from '../../config/site';
import { DEFAULT_LOCALE, LOCALE_BY_CODE, type Locale } from '../../config/locales';

/**
 * Canonical URL construction.
 *
 * One rule, enforced here and nowhere else: every internal path is absolute,
 * lowercase, carries exactly one trailing slash, includes the locale segment
 * except for the default locale at root, and never carries a query string.
 *
 * `trailingSlash: 'always'` in astro.config.mjs makes Astro serve that form; a
 * canonical that disagrees with the served form points search engines at a URL
 * that redirects, which wastes crawl budget on every page.
 */

/**
 * Normalises a site-relative path to the canonical form.
 *
 * Accepts the sloppy inputs a page might realistically pass — no leading slash,
 * no trailing slash, doubled slashes, a stray query string — and returns one
 * consistent shape, so callers never have to remember the convention.
 */
export const normalisePath = (path: string): string => {
  // Drop any query or fragment: canonicals never carry them.
  const withoutQuery = path.split(/[?#]/)[0] ?? '';
  const collapsed = withoutQuery.replace(/\/{2,}/g, '/');
  const trimmed = collapsed.replace(/^\/+|\/+$/g, '');
  return trimmed === '' ? '/' : `/${trimmed}/`;
};

/**
 * Path for a page in a given locale, without the origin.
 *
 * The default locale is served from the root, so it gets no prefix.
 */
export const getLocalePath = (path: string, locale: Locale): string => {
  const normalised = normalisePath(path);
  if (locale === DEFAULT_LOCALE) return normalised;
  const segment = LOCALE_BY_CODE[locale].path;
  return normalised === '/' ? `/${segment}/` : `/${segment}${normalised}`;
};

/** Absolute canonical URL for a page in a locale. */
export const getCanonicalUrl = (path: string, locale: Locale): string =>
  `${SITE.baseUrl}${getLocalePath(path, locale)}`;

/** Resolves any site-relative asset path to an absolute URL. */
export const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.baseUrl}/${path.replace(/^\/+/, '')}`;
};

export interface HreflangEntry {
  readonly hreflang: string;
  readonly href: string;
}

/**
 * hreflang alternates for a page.
 *
 * Rules from section 6.3, all of which are load-bearing:
 *
 * - Self-referencing hreflang is mandatory, so the current locale is included.
 * - `x-default` points at the English URL.
 * - Only locales where the page *actually exists* are emitted. Advertising a
 *   translation that 404s is worse than advertising none, and the build gate in
 *   `scripts/` fails on any alternate that does not resolve.
 * - A noIndex page emits no alternates at all, and is never a target of anyone
 *   else's — a page excluded from the index must not be advertised as the
 *   translation to serve.
 */
export const getHreflangMap = (
  path: string,
  availableLocales: readonly Locale[]
): readonly HreflangEntry[] => {
  if (availableLocales.length === 0) return [];

  // Annotated rather than inferred: inference narrows `hreflang` to the Locale
  // union, and x-default is not a locale.
  const entries: HreflangEntry[] = availableLocales.map((locale) => ({
    hreflang: locale,
    href: getCanonicalUrl(path, locale),
  }));

  // x-default points at the default locale, but only if the page exists there.
  if (availableLocales.includes(DEFAULT_LOCALE)) {
    entries.push({ hreflang: 'x-default', href: getCanonicalUrl(path, DEFAULT_LOCALE) });
  }

  return entries;
};

/**
 * Strips the locale prefix from a pathname, returning the locale-independent
 * path plus the locale it was in.
 *
 * Used by the language switcher, which must link to the *same* page in another
 * locale rather than dropping the reader on a translated homepage.
 */
export const splitLocaleFromPath = (
  pathname: string
): { readonly locale: Locale; readonly path: string } => {
  const normalised = normalisePath(pathname);
  const segments = normalised.split('/').filter((segment) => segment !== '');
  const first = segments[0];

  for (const locale of Object.values(LOCALE_BY_CODE)) {
    if (locale.path === first && locale.code !== DEFAULT_LOCALE) {
      return {
        locale: locale.code,
        path: normalisePath(segments.slice(1).join('/')),
      };
    }
  }

  return { locale: DEFAULT_LOCALE, path: normalised };
};
