import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../../config/locales';

/**
 * Guide lookup across locales.
 *
 * English guides live at `src/content/guides/<slug>.mdx` and translations at
 * `src/content/guides/<locale>/<slug>.mdx`, so the collection id is `<slug>`
 * for English and `<locale>/<slug>` elsewhere. That keeps one collection, one
 * schema and one set of frontmatter rules for all of them — a translation that
 * drops its description or its dates fails the build exactly as an English
 * guide would.
 *
 * A locale with no translation of a guide falls back to the English entry
 * rather than dropping the page: the guide is linked from calculator pages in
 * every locale, and a missing translation should degrade to English prose, not
 * to a 404. `i18n-content.test.ts` asserts there are no fallbacks left.
 */

export type GuideEntry = CollectionEntry<'guides'>;

/** The slug of a guide, with any locale prefix removed. */
export const guideSlug = (entry: GuideEntry): string => {
  const parts = entry.id.split('/');
  return parts.length > 1 ? (parts[parts.length - 1] ?? entry.id) : entry.id;
};

/** The locale a guide entry belongs to, inferred from its path. */
export const guideLocale = (entry: GuideEntry, locales: readonly Locale[]): Locale => {
  const parts = entry.id.split('/');
  if (parts.length < 2) return DEFAULT_LOCALE;
  const prefix = parts[0];
  return locales.find((locale) => locale === prefix) ?? DEFAULT_LOCALE;
};

/** Every English guide, which defines the canonical set of slugs. */
export const englishGuides = async (): Promise<readonly GuideEntry[]> => {
  const all = await getCollection('guides');
  return all.filter((entry) => !entry.id.includes('/'));
};

/**
 * The guides to show for a locale, one per slug, translation preferred.
 *
 * Sorted by title so the listing is stable across builds rather than depending
 * on filesystem order, which differs between platforms.
 */
export const guidesFor = async (locale: Locale): Promise<readonly GuideEntry[]> => {
  const all = await getCollection('guides');
  const english = all.filter((entry) => !entry.id.includes('/'));

  if (locale === DEFAULT_LOCALE) {
    return [...english].sort((a, b) => a.data.title.localeCompare(b.data.title));
  }

  const translated = new Map(
    all
      .filter((entry) => entry.id.startsWith(`${locale}/`))
      .map((entry) => [guideSlug(entry), entry])
  );

  return english
    .map((entry) => translated.get(entry.id) ?? entry)
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
};

/** One guide by slug, in the requested locale, or null if the slug is unknown. */
export const guideFor = async (slug: string, locale: Locale): Promise<GuideEntry | null> => {
  const all = await getCollection('guides');
  if (locale !== DEFAULT_LOCALE) {
    const translated = all.find((entry) => entry.id === `${locale}/${slug}`);
    if (translated !== undefined) return translated;
  }
  return all.find((entry) => entry.id === slug) ?? null;
};
