import type { APIRoute } from 'astro';
import { CALCULATOR_DEFINITIONS } from '../../data/calculators';
import { getLocalePath } from '../../lib/seo/urls';
import { localeRoutes } from '../../lib/i18n/routes';
import { useTranslations } from '../../lib/i18n';
import { translateCalculator } from '../../lib/i18n/content';
import { guideSlug, guidesFor } from '../../lib/i18n/guides';
import type { Locale } from '../../config/locales';

/**
 * Prebuilt search index, one per locale.
 *
 * Emitted as a static JSON file at build time and fetched by the search page on
 * demand, so it costs nothing on any page that is not the search page and stays
 * outside the sitewide JavaScript budget.
 *
 * Deliberately small: title, a short description, the URL and a type. Full-text
 * indexing of every guide would produce a file measured in hundreds of
 * kilobytes to serve a feature most visitors never use. Titles, descriptions
 * and keywords cover the queries people actually type on a calculator site.
 *
 * Per locale rather than one shared file, because both the URLs and the titles
 * differ — a Spanish reader searching "grasa corporal" must not be shown the
 * English heading, and must not be linked to the English page.
 */
export interface SearchDocument {
  readonly t: string;
  readonly d: string;
  readonly u: string;
  readonly k: string;
  readonly c: 'calculator' | 'guide' | 'page';
}

export function getStaticPaths() {
  return localeRoutes();
}

export const GET: APIRoute = async ({ props }) => {
  const { locale } = props as { locale: Locale };
  const t = useTranslations(locale);

  const calculators: SearchDocument[] = CALCULATOR_DEFINITIONS.map((source) => {
    const definition = translateCalculator(source, locale);
    return {
      t: definition.heading,
      d: definition.intro,
      u: getLocalePath(`/calculators/${definition.slug}`, locale),
      k: definition.keywords.join(' '),
      c: 'calculator' as const,
    };
  });

  const guides: SearchDocument[] = (await guidesFor(locale)).map((guide) => ({
    t: guide.data.title,
    d: guide.data.description,
    u: getLocalePath(`/guides/${guideSlug(guide)}`, locale),
    k: guide.data.keywords.join(' '),
    c: 'guide' as const,
  }));

  const pages: SearchDocument[] = [
    {
      t: t('hub.calculators.title'),
      d: t('hub.calculators.description'),
      u: getLocalePath('/calculators', locale),
      k: t('hub.calculators.title'),
      c: 'page',
    },
    {
      t: t('hub.guides.title'),
      d: t('hub.guides.description'),
      u: getLocalePath('/guides', locale),
      k: t('hub.guides.title'),
      c: 'page',
    },
    {
      t: t('hub.charts.title'),
      d: t('hub.charts.description'),
      u: getLocalePath('/charts', locale),
      k: t('hub.charts.title'),
      c: 'page',
    },
    {
      t: t('editorial.title'),
      d: t('editorial.description'),
      u: getLocalePath('/editorial-policy', locale),
      k: t('editorial.title'),
      c: 'page',
    },
    {
      t: t('about.title'),
      d: t('about.description'),
      u: getLocalePath('/about', locale),
      k: t('about.title'),
      c: 'page',
    },
    {
      t: t('a11y.title'),
      d: t('a11y.description'),
      u: getLocalePath('/accessibility', locale),
      k: t('a11y.title'),
      c: 'page',
    },
  ];

  return new Response(JSON.stringify([...calculators, ...guides, ...pages]), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
