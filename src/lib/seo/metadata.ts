import { SITE } from '../../config/site';
import { DEFAULT_LOCALE, toOgLocale, type Locale } from '../../config/locales';
import { absoluteUrl, getCanonicalUrl, getHreflangMap, type HreflangEntry } from './urls';

/**
 * Metadata engine.
 *
 * `SeoMeta` mirrors the shape of the Next.js `Metadata` type on purpose (brief
 * section 1): same field names, same nesting. The SEO architecture was specified
 * against Next.js, and keeping the shape means the module ports back without a
 * rewrite, and reads familiarly to anyone who has used it.
 *
 * Everything renders through `src/components/Seo.astro`. No page writes raw
 * head tags.
 */

/** Maximum rendered title length before a build-time warning. */
export const MAX_TITLE_LENGTH = 60;
/** Descriptions are truncated to this, at a word boundary. */
export const MAX_DESCRIPTION_LENGTH = 157;
/** Merged keyword lists are capped here. */
export const MAX_KEYWORDS = 15;

export interface OpenGraphImage {
  readonly url: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface OpenGraphMeta {
  readonly type: 'website' | 'article';
  readonly siteName: string;
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly images: readonly OpenGraphImage[];
  readonly locale: string;
  readonly alternateLocale: readonly string[];
  /** Article-only fields, omitted entirely for websites. */
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
}

export interface TwitterMeta {
  readonly card: 'summary_large_image';
  /** Omitted when the owner has no account; never invented. */
  readonly site?: string;
  readonly creator?: string;
  readonly title: string;
  readonly description: string;
  readonly images: readonly string[];
}

export interface RobotsMeta {
  readonly index: boolean;
  readonly follow: boolean;
  readonly googleBot: {
    readonly index: boolean;
    readonly follow: boolean;
    readonly 'max-snippet': number;
    readonly 'max-image-preview': 'large';
    readonly 'max-video-preview': number;
  };
}

export interface SeoMeta {
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly alternates: {
    readonly canonical: string;
    readonly languages: readonly HreflangEntry[];
  };
  readonly openGraph: OpenGraphMeta;
  readonly twitter: TwitterMeta;
  readonly robots: RobotsMeta;
  /** Drives `<html lang>` and `dir`. */
  readonly locale: Locale;
  /**
   * True when this page must not appear in the index, in any sitemap, or as
   * anyone's hreflang alternate.
   */
  readonly noIndex: boolean;
}

export interface BaseMetadataInput {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly locale: Locale;
  readonly keywords?: readonly string[];
  /** Locales in which this exact page exists. Defaults to every locale. */
  readonly availableLocales?: readonly Locale[];
  readonly image?: Partial<OpenGraphImage> & { readonly url: string };
  readonly noIndex?: boolean;
}

/**
 * Applies the title format, avoiding a duplicated site name.
 *
 * A page titled "Baseline BMI Calculator" must not become
 * "Baseline BMI Calculator | Baseline".
 */
export const formatTitle = (pageTitle: string): string => {
  const trimmed = pageTitle.trim();
  if (trimmed === '') return SITE.name;
  const alreadyBranded = trimmed.toLowerCase().includes(SITE.name.toLowerCase());
  return alreadyBranded ? trimmed : `${trimmed} | ${SITE.name}`;
};

/**
 * Truncates a description at a word boundary.
 *
 * Never cuts mid-word (brief section 6.2.2). The ellipsis is included in the
 * budget, so the result is genuinely within the limit rather than three
 * characters over it — which is the bug in most implementations of this.
 */
export const truncateDescription = (
  description: string,
  maxLength: number = MAX_DESCRIPTION_LENGTH
): string => {
  const collapsed = description.trim().replace(/\s+/g, ' ');
  if (collapsed.length <= maxLength) return collapsed;

  const ellipsis = '...';
  const budget = maxLength - ellipsis.length;
  const clipped = collapsed.slice(0, budget + 1);
  const lastSpace = clipped.lastIndexOf(' ');

  // A single word longer than the budget has no space to cut at; hard-cut it
  // rather than returning an empty string.
  const body = lastSpace > 0 ? clipped.slice(0, lastSpace) : collapsed.slice(0, budget);

  return `${body.replace(/[\s,;:.!-]+$/, '')}${ellipsis}`;
};

/**
 * Merges global and page keywords.
 *
 * Global first, deduplicated case-insensitively but preserving the original
 * casing of the first occurrence, capped at 15.
 */
export const mergeKeywords = (pageKeywords: readonly string[] = []): readonly string[] => {
  const seen = new Set<string>();
  const merged: string[] = [];

  for (const keyword of [...SITE.globalKeywords, ...pageKeywords]) {
    const normalised = keyword.trim();
    if (normalised === '') continue;
    const key = normalised.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(normalised);
    if (merged.length === MAX_KEYWORDS) break;
  }

  return merged;
};

/** Default robots directives: indexable, with Google's expanded preview limits. */
const indexableRobots: RobotsMeta = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

const noIndexRobots: RobotsMeta = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

/** Warnings raised while building metadata, surfaced by the build gate. */
export const metadataWarnings: string[] = [];

const warnIfTitleTooLong = (title: string, path: string): void => {
  if (title.length > MAX_TITLE_LENGTH) {
    metadataWarnings.push(
      `Title is ${String(title.length)} characters (limit ${String(MAX_TITLE_LENGTH)}) on ${path}: "${title}"`
    );
  }
};

const buildImage = (input: BaseMetadataInput, title: string): OpenGraphImage => ({
  url: absoluteUrl(input.image?.url ?? SITE.defaultOgImage),
  width: input.image?.width ?? SITE.ogImageDimensions.width,
  height: input.image?.height ?? SITE.ogImageDimensions.height,
  alt: input.image?.alt ?? title,
});

const buildTwitter = (title: string, description: string, image: OpenGraphImage): TwitterMeta => {
  // `site` and `creator` are omitted rather than invented. Neither is required
  // for a summary_large_image card to render.
  const base = {
    card: 'summary_large_image',
    title,
    description,
    images: [image.url],
  } as const;

  if (SITE.twitterHandle === null) return base;
  return { ...base, site: SITE.twitterHandle, creator: SITE.creator.twitter ?? SITE.twitterHandle };
};

/**
 * Shared construction for all three builders.
 *
 * The noIndex interaction is the important part: a noIndex page emits no
 * hreflang alternates at all. A page excluded from the index must never be
 * advertised as the translation to serve, and section 6.2.6 requires the
 * suppression to cover both the sitemap entry and the alternates.
 */
const buildMetadata = (
  input: BaseMetadataInput,
  ogType: 'website' | 'article',
  articleTimes?: { readonly publishedTime?: string; readonly modifiedTime?: string }
): SeoMeta => {
  const noIndex = input.noIndex ?? false;
  const title = formatTitle(input.title);
  const description = truncateDescription(input.description);
  const canonical = getCanonicalUrl(input.path, input.locale);
  const image = buildImage(input, title);

  warnIfTitleTooLong(title, canonical);

  const availableLocales = input.availableLocales ?? SITE.locales;
  const languages = noIndex ? [] : getHreflangMap(input.path, availableLocales);

  const openGraph: OpenGraphMeta = {
    type: ogType,
    siteName: SITE.name,
    url: canonical,
    title,
    description,
    images: [image],
    locale: toOgLocale(input.locale),
    alternateLocale: SITE.locales
      .filter((locale) => locale !== input.locale)
      .map((locale) => toOgLocale(locale)),
    ...(articleTimes?.publishedTime !== undefined
      ? { publishedTime: articleTimes.publishedTime }
      : {}),
    ...(articleTimes?.modifiedTime !== undefined
      ? { modifiedTime: articleTimes.modifiedTime }
      : {}),
  };

  return {
    title,
    description,
    keywords: mergeKeywords(input.keywords),
    alternates: { canonical, languages },
    openGraph,
    twitter: buildTwitter(title, description, image),
    robots: noIndex ? noIndexRobots : indexableRobots,
    locale: input.locale,
    noIndex,
  };
};

/** Static and base pages: home, hubs, about, legal. */
export const buildBaseMetadata = (input: BaseMetadataInput): SeoMeta =>
  buildMetadata(input, 'website');

/** Calculator and programmatic tool pages. */
export const buildToolMetadata = (input: BaseMetadataInput): SeoMeta =>
  buildMetadata(input, 'website');

export interface ArticleMetadataInput extends BaseMetadataInput {
  readonly publishedTime: string;
  readonly modifiedTime: string;
}

/** Guides and informational pages. */
export const buildArticleMetadata = (input: ArticleMetadataInput): SeoMeta =>
  buildMetadata(input, 'article', {
    publishedTime: input.publishedTime,
    modifiedTime: input.modifiedTime,
  });

/** Serialises robots directives into the `content` attribute value. */
export const robotsContent = (robots: RobotsMeta): string =>
  `${robots.index ? 'index' : 'noindex'}, ${robots.follow ? 'follow' : 'nofollow'}`;

export const googleBotContent = (robots: RobotsMeta): string =>
  [
    robots.googleBot.index ? 'index' : 'noindex',
    robots.googleBot.follow ? 'follow' : 'nofollow',
    `max-snippet:${String(robots.googleBot['max-snippet'])}`,
    `max-image-preview:${robots.googleBot['max-image-preview']}`,
    `max-video-preview:${String(robots.googleBot['max-video-preview'])}`,
  ].join(', ');

/** Re-exported so pages import one module. */
export { DEFAULT_LOCALE };
