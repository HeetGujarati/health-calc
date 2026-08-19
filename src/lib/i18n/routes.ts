import { DEFAULT_LOCALE, LOCALE_BY_CODE, type Locale } from '../../config/locales';
import { SITE } from '../../config/site';

/**
 * Route parameter helpers for the `[...locale]` rest segment.
 *
 * English is served from the root (`prefixDefaultLocale: false`), which in
 * Astro terms means the rest parameter is `undefined` for `en` and the URL path
 * segment for every other locale. Getting that wrong produces `/en/` duplicates
 * of the entire site, so it is expressed once here and nowhere else.
 */

/** The `[...locale]` param value for a locale: undefined at the root. */
export const localeParam = (locale: Locale): string | undefined =>
  locale === DEFAULT_LOCALE ? undefined : LOCALE_BY_CODE[locale].path;

/**
 * Locales that have pages built.
 *
 * Everything that enumerates locales for routing goes through this, so a locale
 * cannot appear in the sitemap or in hreflang without its pages existing.
 */
export const builtLocales = (): readonly Locale[] => SITE.translatedLocales;

export interface LocaleRoute {
  readonly params: { readonly locale: string | undefined };
  readonly props: { readonly locale: Locale };
}

/** One route per built locale, for a page that exists in every locale. */
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
 * Cross product of built locales and items.
 *
 * `include` decides, per locale, whether an item ships there — which is how
 * section 5.3's "top 30 programmatic pages per non-English locale" is enforced
 * at the routing layer rather than by hoping a filter is applied consistently.
 */
export const localeItemRoutes = <T extends { readonly slug: string }>(
  items: readonly T[],
  include: (locale: Locale, item: T) => boolean = () => true
): readonly LocaleItemRoute<T>[] =>
  builtLocales().flatMap((locale) =>
    items
      .filter((item) => include(locale, item))
      .map((item) => ({
        params: { locale: localeParam(locale), slug: item.slug },
        props: { locale, item },
      }))
  );
