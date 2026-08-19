import { SITE } from '../../config/site';
import type { Locale } from '../../config/locales';
import { absoluteUrl, getCanonicalUrl } from './urls';

/**
 * Structured data generators.
 *
 * Every generator returns a plain object. Nothing here builds JSON by string
 * concatenation — the `JsonLd` component serialises with `JSON.stringify` and
 * escapes `<` so a value containing `</script>` cannot break out of the block.
 *
 * A build-time gate parses every emitted block and fails on schema errors or
 * dangling `HowTo` step anchors.
 */

export interface JsonLdObject {
  readonly '@context'?: string;
  readonly '@type': string;
  readonly [key: string]: unknown;
}

const SCHEMA_CONTEXT = 'https://schema.org';

/**
 * Organization, emitted sitewide.
 *
 * No `founder`, no named person, no employee count. Section 4.3 rule 8 forbids
 * inventing people, and schema.org properties are exactly where that temptation
 * lives.
 */
export const buildOrganization = (): JsonLdObject => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'Organization',
  '@id': `${SITE.baseUrl}/#organization`,
  name: SITE.name,
  url: SITE.baseUrl,
  description: SITE.defaultDescription,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/icon-512.png'),
    width: 512,
    height: 512,
  },
});

/**
 * WebSite with a SearchAction.
 *
 * The `target` points at `/search/?q=`, which is a real, working, client-side
 * search page backed by a prebuilt static index. Declaring a SearchAction that
 * does not work is a Google structured-data violation, so this generator is
 * only ever called from the homepage, which links that page.
 */
export const buildWebSite = (locale: Locale): JsonLdObject => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'WebSite',
  '@id': `${SITE.baseUrl}/#website`,
  name: SITE.name,
  url: SITE.baseUrl,
  description: SITE.defaultDescription,
  inLanguage: locale,
  publisher: { '@id': `${SITE.baseUrl}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${getCanonicalUrl('/search', locale)}?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export interface AggregateRatingInput {
  readonly ratingValue: number;
  readonly reviewCount: number;
  readonly bestRating?: number;
  readonly worstRating?: number;
}

/**
 * AggregateRating — implemented, tested, and deliberately never populated.
 *
 * The original specification asked for a hardcoded rating. That is not built
 * here, and this function is the reason why it cannot be added by accident.
 *
 * Google's structured data policies prohibit review markup not backed by
 * genuine, user-visible reviews on the page. Fabricating one risks a "spammy
 * structured markup" manual action, which would remove the entire site from
 * rich results — and it is dishonest.
 *
 * So the generator is complete and correct, but returns null unless real review
 * data exists in the content collection. The site ships with none, so no rating
 * is emitted. SEO.md documents how to enable this legitimately.
 */
export const buildAggregateRating = (input: AggregateRatingInput | null): JsonLdObject | null => {
  if (input === null) return null;
  // A rating with no reviews behind it is precisely the fabrication case.
  if (input.reviewCount <= 0) return null;
  if (!Number.isFinite(input.ratingValue)) return null;

  return {
    '@type': 'AggregateRating',
    ratingValue: input.ratingValue,
    reviewCount: input.reviewCount,
    bestRating: input.bestRating ?? 5,
    worstRating: input.worstRating ?? 1,
  };
};

export interface SoftwareApplicationInput {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly locale: Locale;
  readonly applicationSubCategory: string;
  /** Null in every shipped page; see buildAggregateRating. */
  readonly aggregateRating?: AggregateRatingInput | null;
}

/** SoftwareApplication, on every calculator page. */
export const buildSoftwareApplication = (input: SoftwareApplicationInput): JsonLdObject => {
  const rating = buildAggregateRating(input.aggregateRating ?? null);

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'SoftwareApplication',
    name: input.name,
    description: input.description,
    applicationCategory: 'HealthApplication',
    applicationSubCategory: input.applicationSubCategory,
    operatingSystem: 'Any (web browser)',
    url: getCanonicalUrl(input.path, input.locale),
    inLanguage: input.locale,
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: { '@id': `${SITE.baseUrl}/#organization` },
    ...(rating === null ? {} : { aggregateRating: rating }),
  };
};

export interface HowToStepInput {
  readonly name: string;
  readonly text: string;
  /** Fragment id, without the '#'. Must exist in the rendered DOM. */
  readonly anchor: string;
}

export interface HowToInput {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly locale: Locale;
  /** ISO 8601 duration, e.g. PT2M. */
  readonly totalTime: string;
  readonly steps: readonly HowToStepInput[];
  readonly supply?: readonly string[];
  readonly tool?: readonly string[];
}

/**
 * HowTo, on calculator pages and relevant guides.
 *
 * Every step's `url` carries a real fragment that must exist in the rendered
 * DOM. A build gate walks the built HTML and fails on any step anchor with no
 * matching element, because a HowTo pointing at fragments that do not exist is
 * both invalid markup and a broken promise to the reader.
 */
export const buildHowTo = (input: HowToInput): JsonLdObject => {
  const pageUrl = getCanonicalUrl(input.path, input.locale);

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    totalTime: input.totalTime,
    inLanguage: input.locale,
    ...(input.supply === undefined
      ? {}
      : { supply: input.supply.map((item) => ({ '@type': 'HowToSupply', name: item })) }),
    ...(input.tool === undefined
      ? {}
      : { tool: input.tool.map((item) => ({ '@type': 'HowToTool', name: item })) }),
    step: input.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${pageUrl}#${step.anchor}`,
    })),
  };
};

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

/**
 * FAQPage.
 *
 * Google requires the marked-up text to match copy that is visible on the page,
 * so callers pass the same objects that render the visible FAQ block. A gate
 * asserts the rendered questions and the marked-up questions match.
 */
export const buildFaqPage = (items: readonly FaqItem[]): JsonLdObject | null => {
  if (items.length === 0) return null;

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};

export interface BreadcrumbItem {
  readonly name: string;
  /** Site-relative path; converted to an absolute canonical. */
  readonly path: string;
}

/**
 * BreadcrumbList, on every non-home page.
 *
 * Must reflect the true hierarchy, and visible breadcrumbs are rendered
 * alongside it — markup describing a trail the reader cannot see is the kind of
 * mismatch that draws a manual action.
 */
export const buildBreadcrumbList = (
  items: readonly BreadcrumbItem[],
  locale: Locale
): JsonLdObject | null => {
  if (items.length === 0) return null;

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path, locale),
    })),
  };
};

export interface ArticleInput {
  readonly headline: string;
  readonly description: string;
  readonly path: string;
  readonly locale: Locale;
  readonly datePublished: string;
  readonly dateModified: string;
  readonly image?: string;
}

/**
 * Article, on guides.
 *
 * `author` is the organisation, never a person. There is no named author, and
 * inventing one to fill the property is exactly what section 4.3 rule 8
 * forbids. Attributing to the organisation is both honest and valid.
 */
export const buildArticle = (input: ArticleInput): JsonLdObject => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'Article',
  headline: input.headline,
  description: input.description,
  url: getCanonicalUrl(input.path, input.locale),
  datePublished: input.datePublished,
  dateModified: input.dateModified,
  inLanguage: input.locale,
  author: { '@id': `${SITE.baseUrl}/#organization` },
  publisher: { '@id': `${SITE.baseUrl}/#organization` },
  image: absoluteUrl(input.image ?? SITE.defaultOgImage),
  isAccessibleForFree: true,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': getCanonicalUrl(input.path, input.locale),
  },
});

/**
 * Serialises a JSON-LD object for embedding in a script tag.
 *
 * Escapes `<` as the `<` escape sequence, which is what prevents a value
 * containing a closing script tag from terminating the block early and
 * injecting markup. JSON parses the escape back to `<`, so consumers see the
 * original string. This is the only sanctioned path from data to a script
 * element in this codebase.
 */
export const serialiseJsonLd = (data: JsonLdObject | readonly JsonLdObject[]): string =>
  JSON.stringify(data).replace(/</g, '\\u003c');
