import { CALCULATOR_DEFINITIONS } from '../../data/calculators';
import { CHART_DEFINITIONS } from '../../data/charts';
import { ACTIVITIES } from '../../data/activities';
import { LIFTS } from '../../data/lifts';
import { DISTANCES } from '../../data/distances';
import { SITE, hasFullProgrammaticSet } from '../../config/site';
import { PRIORITY_PROGRAMMATIC } from '../../data/programmatic-priority';
import type { Locale } from '../../config/locales';

/**
 * The registry of every indexable page.
 *
 * Sitemaps are generated from this rather than by crawling the build output, so
 * a page's priority, change frequency and last-modified date live next to the
 * data that produces it. Crawling `dist` would work too, but it cannot know
 * *when* a page's content last changed — only when the build ran, which is the
 * `lastmod` anti-pattern section 6.5 explicitly rules out.
 *
 * Pages excluded on purpose:
 * - /search/ is noIndex: its content is whatever the query string asks for.
 * - /404 is not a page anyone should be sent to.
 * - Endpoints (robots.txt, llms.txt, the sitemaps themselves, security.txt).
 */

export type SitemapSection =
  'core' | 'calculators' | 'guides' | 'charts' | 'activities' | 'lifts' | 'distances';

export interface PageEntry {
  /** Locale-independent path, without the locale prefix. */
  readonly path: string;
  readonly section: SitemapSection;
  /** Section 6.5 priority table. */
  readonly priority: number;
  readonly changefreq: 'daily' | 'weekly' | 'monthly';
  /**
   * Real content-modification date as YYYY-MM-DD.
   *
   * Never `new Date()`: a lastmod that moves on every build tells search
   * engines every page changed when none did, and they learn to ignore it.
   */
  readonly lastmod: string;
  /**
   * Locales in which this exact page exists. Used for hreflang and to keep the
   * sitemap from advertising a translation that was never built.
   */
  readonly locales: readonly Locale[];
}

/** Content review date for pages whose copy was written by hand. */
const REVIEWED = '2026-08-20';

/**
 * Locales a page exists in.
 *
 * The single place that decides which pages are translated. The sitemap, the
 * hreflang map and `getStaticPaths` all read it, so they cannot disagree —
 * which is the failure the build gate exists to catch.
 *
 * Core, calculator, chart and guide pages ship in every locale. Programmatic
 * pages ship in full only for English and for any locale listed in
 * `FULL_PROGRAMMATIC_LOCALES`; every other locale gets the thirty priority
 * pages from section 5.3.
 */
export const localesFor = (section: SitemapSection, slug?: string): readonly Locale[] => {
  const isProgrammatic = section === 'activities' || section === 'lifts' || section === 'distances';

  if (!isProgrammatic) return SITE.translatedLocales;

  // A programmatic page with no slug cannot be checked against the priority
  // list, so it is treated as full-set-only rather than silently shipped
  // everywhere.
  const isPriority = slug !== undefined && PRIORITY_PROGRAMMATIC.has(slug);

  return SITE.translatedLocales.filter((locale) => hasFullProgrammaticSet(locale) || isPriority);
};

const core: readonly PageEntry[] = [
  {
    path: '/',
    section: 'core',
    priority: 1.0,
    changefreq: 'daily',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/calculators',
    section: 'core',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/guides',
    section: 'core',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/charts',
    section: 'core',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/calories-burned',
    section: 'core',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/one-rep-max',
    section: 'core',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/pace',
    section: 'core',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/about',
    section: 'core',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/contact',
    section: 'core',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/editorial-policy',
    section: 'core',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/accessibility',
    section: 'core',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/privacy',
    section: 'core',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/terms',
    section: 'core',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
  {
    path: '/cookies',
    section: 'core',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: REVIEWED,
    locales: localesFor('core'),
  },
];

const calculators: readonly PageEntry[] = CALCULATOR_DEFINITIONS.map((definition) => ({
  path: `/calculators/${definition.slug}`,
  section: 'calculators' as const,
  priority: 0.8,
  changefreq: 'weekly' as const,
  lastmod: definition.lastUpdated,
  locales: localesFor('calculators', definition.slug),
}));

const charts: readonly PageEntry[] = CHART_DEFINITIONS.map((chart) => ({
  path: `/charts/${chart.slug}`,
  section: 'charts' as const,
  priority: 0.7,
  changefreq: 'monthly' as const,
  lastmod: chart.lastUpdated,
  locales: localesFor('charts', chart.slug),
}));

const activities: readonly PageEntry[] = ACTIVITIES.map((activity) => ({
  path: `/calories-burned/${activity.slug}`,
  section: 'activities' as const,
  priority: 0.8,
  changefreq: 'weekly' as const,
  lastmod: REVIEWED,
  locales: localesFor('activities', activity.slug),
}));

const lifts: readonly PageEntry[] = LIFTS.map((lift) => ({
  path: `/one-rep-max/${lift.slug}`,
  section: 'lifts' as const,
  priority: 0.8,
  changefreq: 'weekly' as const,
  lastmod: REVIEWED,
  locales: localesFor('lifts', lift.slug),
}));

const distances: readonly PageEntry[] = DISTANCES.map((distance) => ({
  path: `/pace/${distance.slug}`,
  section: 'distances' as const,
  priority: 0.8,
  changefreq: 'weekly' as const,
  lastmod: REVIEWED,
  locales: localesFor('distances', distance.slug),
}));

/**
 * Guides are async because they come from a content collection.
 *
 * Translations live at `<locale>/<slug>.mdx` in the same collection, so the
 * entries are filtered to the English set: a slug is one page with alternates,
 * not ten pages. Without the filter the sitemap emits `/ja/guides/ar/<slug>/`,
 * which is a URL no route builds.
 */
export const guideEntries = async (): Promise<readonly PageEntry[]> => {
  const { getCollection } = await import('astro:content');
  const all = await getCollection('guides');
  const guides = all.filter((guide) => !guide.id.includes('/'));
  return guides.map((guide) => ({
    path: `/guides/${guide.id}`,
    section: 'guides' as const,
    priority: 0.7,
    changefreq: 'monthly' as const,
    lastmod: guide.data.updated.toISOString().slice(0, 10),
    locales: localesFor('guides', guide.id),
  }));
};

export const staticEntries: readonly PageEntry[] = [
  ...core,
  ...calculators,
  ...charts,
  ...activities,
  ...lifts,
  ...distances,
];

/** Every indexable page, including guides. */
export const allEntries = async (): Promise<readonly PageEntry[]> => [
  ...staticEntries,
  ...(await guideEntries()),
];

export const SITEMAP_SECTIONS: readonly SitemapSection[] = [
  'core',
  'calculators',
  'guides',
  'charts',
  'activities',
  'lifts',
  'distances',
];

/** Section 6.5 caps each child sitemap well below the 50,000 URL limit. */
export const MAX_URLS_PER_SITEMAP = 45_000;

export const entriesForSection = async (section: SitemapSection): Promise<readonly PageEntry[]> => {
  const entries = await allEntries();
  return entries.filter((entry) => entry.section === section);
};
