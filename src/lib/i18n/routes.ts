import { DEFAULT_LOCALE, LOCALE_BY_CODE, type Locale } from '../../config/locales';
import { SITE } from '../../config/site';
import { localesFor, type SitemapSection } from '../seo/pages';

/**
 * Route parameter helpers for the `[...locale]` rest segment.
 *
 * English is served from the root (`prefixDefaultLocale: false`), which in
 * Astro terms means the rest parameter is `undefined` for `en` and the URL path
 * segment for every other locale. Getting that wrong produces `/en/` duplicates
 * of the entire site, so it is expressed once here and nowhere else.
 *
 * Which locales a route is built for comes from `localesFor` — the same
 * function the sitemap and the hreflang map use. Routing cannot advertise a
 * translation it did not build, or build one it does not advertise, because
 * there is only one answer to the question.
 */

/** The `[...locale]` param value for a locale: undefined at the root. */
export const localeParam = (locale: Locale): string | undefined =>
  locale === DEFAULT_LOCALE ? undefined : LOCALE_BY_CODE[locale].path;

/** Every locale with pages built. */
export const builtLocales = (): readonly Locale[] => SITE.translatedLocales;

export interface LocaleRoute {
  readonly params: { readonly locale: string | undefined };
  readonly props: { readonly locale: Locale };
}

/** One route per locale, for a page that exists in every locale. */
export const localeRoutes = (): readonly LocaleRoute[] =>
  builtLocales().map((locale) => ({
    params: { locale: localeParam(locale) },
    props: { locale },
  }));

export interface LocaleItemRoute<T> {
  readonly params: { readonly locale: string | undefined; readonly slug: string };
  readonly props: { readonly locale: Locale; readonly item: T };
}

/**
 * Cross product of locales and items, filtered by where each item ships.
 *
 * This is where section 5.3's "top 30 programmatic pages per non-English
 * locale" is enforced: at the routing layer, from the same source the sitemap
 * reads, rather than by a filter someone has to remember to apply twice.
 */
export const localeItemRoutes = <T extends { readonly slug: string }>(
  items: readonly T[],
  section: SitemapSection
): readonly LocaleItemRoute<T>[] =>
  items.flatMap((item) =>
    localesFor(section, item.slug).map((locale) => ({
      params: { locale: localeParam(locale), slug: item.slug },
      props: { locale, item },
    }))
  );
