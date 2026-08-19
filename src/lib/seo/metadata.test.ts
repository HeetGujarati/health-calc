import { describe, expect, it } from 'vitest';
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_KEYWORDS,
  buildArticleMetadata,
  buildBaseMetadata,
  buildToolMetadata,
  formatTitle,
  googleBotContent,
  mergeKeywords,
  robotsContent,
  truncateDescription,
} from './metadata';
import { SITE } from '../../config/site';

const baseInput = {
  title: 'BMI Calculator',
  description: 'Work out your body mass index and see the healthy range for your height.',
  path: '/calculators/bmi',
  locale: 'en' as const,
};

describe('title format', () => {
  it('appends the site name', () => {
    expect(formatTitle('BMI Calculator')).toBe(`BMI Calculator | ${SITE.name}`);
  });

  it('does not duplicate a site name already present', () => {
    expect(formatTitle(`${SITE.name} BMI Calculator`)).toBe(`${SITE.name} BMI Calculator`);
    expect(formatTitle(`BMI Calculator | ${SITE.name}`)).toBe(`BMI Calculator | ${SITE.name}`);
  });

  it('matches the site name case-insensitively', () => {
    expect(formatTitle('baseline metrics')).toBe('baseline metrics');
  });

  it('falls back to the site name for an empty title', () => {
    expect(formatTitle('')).toBe(SITE.name);
    expect(formatTitle('   ')).toBe(SITE.name);
  });
});

describe('description truncation', () => {
  it('leaves short descriptions untouched', () => {
    expect(truncateDescription('A short description.')).toBe('A short description.');
  });

  it('collapses whitespace', () => {
    expect(truncateDescription('Too   many\n\nspaces')).toBe('Too many spaces');
  });

  it('never exceeds the limit, including the ellipsis', () => {
    // The common bug is truncating to the limit and then appending "...",
    // which lands three characters over.
    const long = 'word '.repeat(100);
    const result = truncateDescription(long);
    expect(result.length).toBeLessThanOrEqual(MAX_DESCRIPTION_LENGTH);
    expect(result.endsWith('...')).toBe(true);
  });

  it('never cuts mid-word', () => {
    const long =
      'Estimate your basal metabolic rate using the Mifflin-St Jeor equation, then compare it against Harris-Benedict and Katch-McArdle to see how much published equations disagree.';
    const result = truncateDescription(long);
    const body = result.slice(0, -3);
    // The character after the cut in the source must be a space, meaning a
    // whole word boundary was used.
    expect(long.startsWith(body)).toBe(true);
    expect(long.charAt(body.length)).toBe(' ');
  });

  it('hard-cuts a single word longer than the budget rather than returning nothing', () => {
    const result = truncateDescription('x'.repeat(300));
    expect(result.length).toBeLessThanOrEqual(MAX_DESCRIPTION_LENGTH);
    expect(result.length).toBeGreaterThan(3);
  });

  it('strips trailing punctuation before the ellipsis', () => {
    const result = truncateDescription(`${'word '.repeat(30)}end, more words here`);
    expect(result).not.toMatch(/[,;:]\.\.\.$/);
  });
});

describe('keyword merging', () => {
  it('puts global keywords first and preserves order', () => {
    const merged = mergeKeywords(['navy body fat']);
    expect(merged[0]).toBe(SITE.globalKeywords[0]);
    expect(merged).toContain('navy body fat');
  });

  it('deduplicates case-insensitively, keeping the first casing', () => {
    const merged = mergeKeywords(['BMI Calculator', 'bmi calculator']);
    const occurrences = merged.filter((k) => k.toLowerCase() === 'bmi calculator');
    expect(occurrences).toHaveLength(1);
    // The global list supplies the lowercase form first, so that one wins.
    expect(occurrences[0]).toBe('bmi calculator');
  });

  it('caps the list', () => {
    const many = Array.from({ length: 40 }, (_, i) => `keyword ${String(i)}`);
    expect(mergeKeywords(many)).toHaveLength(MAX_KEYWORDS);
  });

  it('drops empty and whitespace-only entries', () => {
    const merged = mergeKeywords(['', '   ', 'real keyword']);
    expect(merged).toContain('real keyword');
    expect(merged.some((k) => k.trim() === '')).toBe(false);
  });
});

describe('base metadata', () => {
  const meta = buildBaseMetadata(baseInput);

  it('produces an absolute canonical with a trailing slash', () => {
    expect(meta.alternates.canonical).toBe(`${SITE.baseUrl}/calculators/bmi/`);
  });

  it('emits a complete Open Graph object', () => {
    expect(meta.openGraph.type).toBe('website');
    expect(meta.openGraph.siteName).toBe(SITE.name);
    expect(meta.openGraph.url).toBe(meta.alternates.canonical);
    expect(meta.openGraph.locale).toBe('en_US');
    expect(meta.openGraph.images[0]?.url).toMatch(/^https:\/\//);
    expect(meta.openGraph.images[0]?.width).toBe(SITE.ogImageDimensions.width);
    expect(meta.openGraph.images[0]?.alt.length).toBeGreaterThan(0);
  });

  it('lists every other locale as an OG alternate', () => {
    expect(meta.openGraph.alternateLocale).toHaveLength(SITE.locales.length - 1);
    expect(meta.openGraph.alternateLocale).toContain('ar_AR');
    expect(meta.openGraph.alternateLocale).not.toContain('en_US');
  });

  it('emits a summary_large_image Twitter card', () => {
    expect(meta.twitter.card).toBe('summary_large_image');
    expect(meta.twitter.images).toHaveLength(1);
  });

  it('omits Twitter site and creator rather than inventing a handle', () => {
    // SITE.twitterHandle is null until the owner supplies a real account.
    expect(SITE.twitterHandle).toBeNull();
    expect(meta.twitter.site).toBeUndefined();
    expect(meta.twitter.creator).toBeUndefined();
  });

  it('defaults to indexable with the expanded googleBot directives', () => {
    expect(meta.robots.index).toBe(true);
    expect(meta.robots.follow).toBe(true);
    expect(robotsContent(meta.robots)).toBe('index, follow');
    expect(googleBotContent(meta.robots)).toBe(
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );
  });

  it('emits a self-referencing hreflang plus x-default', () => {
    const tags = meta.alternates.languages.map((l) => l.hreflang);
    expect(tags).toContain('en');
    expect(tags).toContain('x-default');
    const self = meta.alternates.languages.find((l) => l.hreflang === 'en');
    expect(self?.href).toBe(meta.alternates.canonical);
  });

  it('points x-default at the English URL', () => {
    const xDefault = meta.alternates.languages.find((l) => l.hreflang === 'x-default');
    expect(xDefault?.href).toBe(`${SITE.baseUrl}/calculators/bmi/`);
  });
});

describe('locale handling', () => {
  it('prefixes non-default locales', () => {
    const meta = buildToolMetadata({ ...baseInput, locale: 'de' });
    expect(meta.alternates.canonical).toBe(`${SITE.baseUrl}/de/calculators/bmi/`);
    expect(meta.openGraph.locale).toBe('de_DE');
  });

  it('uses the lowercase path for pt-BR while keeping the cased hreflang', () => {
    // availableLocales is stated explicitly because it now defaults to the
    // locales actually built, which is English only until phase 8 lands.
    const meta = buildToolMetadata({
      ...baseInput,
      locale: 'pt-BR',
      availableLocales: ['en', 'pt-BR'],
    });
    expect(meta.alternates.canonical).toBe(`${SITE.baseUrl}/pt-br/calculators/bmi/`);
    const self = meta.alternates.languages.find((l) => l.href === meta.alternates.canonical);
    expect(self?.hreflang).toBe('pt-BR');
    expect(meta.openGraph.locale).toBe('pt_BR');
  });

  it('emits alternates only for locales where the page exists', () => {
    const meta = buildToolMetadata({ ...baseInput, availableLocales: ['en', 'es'] });
    const tags = meta.alternates.languages.map((l) => l.hreflang);
    expect(tags.sort()).toEqual(['en', 'es', 'x-default']);
    expect(tags).not.toContain('ja');
  });

  it('omits x-default when the page does not exist in the default locale', () => {
    // Advertising an x-default that 404s is worse than advertising none.
    const meta = buildToolMetadata({ ...baseInput, locale: 'es', availableLocales: ['es', 'fr'] });
    const tags = meta.alternates.languages.map((l) => l.hreflang);
    expect(tags).not.toContain('x-default');
  });
});

describe('noIndex suppression', () => {
  const meta = buildBaseMetadata({ ...baseInput, noIndex: true });

  it('flips the robots directives', () => {
    expect(meta.robots.index).toBe(false);
    expect(meta.robots.follow).toBe(false);
    expect(meta.robots.googleBot.index).toBe(false);
    expect(robotsContent(meta.robots)).toBe('noindex, nofollow');
  });

  it('suppresses every hreflang alternate', () => {
    // Section 6.2.6: a noindex page must never be advertised as an hreflang
    // target, including by itself.
    expect(meta.alternates.languages).toHaveLength(0);
  });

  it('keeps a canonical, which a noindex page still needs', () => {
    expect(meta.alternates.canonical).toBe(`${SITE.baseUrl}/calculators/bmi/`);
  });

  it('exposes the flag so the sitemap can exclude the page', () => {
    expect(meta.noIndex).toBe(true);
    expect(buildBaseMetadata(baseInput).noIndex).toBe(false);
  });
});

describe('article metadata', () => {
  const meta = buildArticleMetadata({
    ...baseInput,
    path: '/guides/how-bmr-is-calculated',
    title: 'How BMR is calculated',
    publishedTime: '2026-08-01T00:00:00.000Z',
    modifiedTime: '2026-08-15T00:00:00.000Z',
  });

  it('uses the article Open Graph type', () => {
    expect(meta.openGraph.type).toBe('article');
  });

  it('carries publication timestamps', () => {
    expect(meta.openGraph.publishedTime).toBe('2026-08-01T00:00:00.000Z');
    expect(meta.openGraph.modifiedTime).toBe('2026-08-15T00:00:00.000Z');
  });

  it('omits timestamp fields entirely on non-article pages', () => {
    // exactOptionalPropertyTypes means these must be absent, not undefined.
    const tool = buildToolMetadata(baseInput);
    expect('publishedTime' in tool.openGraph).toBe(false);
    expect('modifiedTime' in tool.openGraph).toBe(false);
  });
});
