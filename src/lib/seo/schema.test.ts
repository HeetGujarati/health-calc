import { describe, expect, it } from 'vitest';
import {
  buildAggregateRating,
  buildArticle,
  buildBreadcrumbList,
  buildFaqPage,
  buildHowTo,
  buildOrganization,
  buildSoftwareApplication,
  buildWebSite,
  serialiseJsonLd,
} from './schema';
import { SITE } from '../../config/site';

describe('Organization', () => {
  it('attributes to the organisation with no invented people', () => {
    const org = buildOrganization();
    expect(org['@type']).toBe('Organization');
    expect(org.name).toBe(SITE.name);
    // Section 4.3 rule 8: these properties are exactly where inventing a person
    // is tempting, so their absence is asserted.
    expect(org.founder).toBeUndefined();
    expect(org.employee).toBeUndefined();
  });
});

describe('WebSite SearchAction', () => {
  it('points at a real search URL with the query template', () => {
    const site = buildWebSite('en');
    const action = site.potentialAction as { target: { urlTemplate: string } };
    expect(action.target.urlTemplate).toBe(`${SITE.baseUrl}/search/?q={search_term_string}`);
    expect(site['query-input']).toBeUndefined();
  });

  it('localises the search URL', () => {
    const site = buildWebSite('de');
    const action = site.potentialAction as { target: { urlTemplate: string } };
    expect(action.target.urlTemplate).toContain('/de/search/');
  });
});

describe('AggregateRating', () => {
  it('emits nothing when there is no review data', () => {
    // The site ships with none, so no rating is ever emitted.
    expect(buildAggregateRating(null)).toBeNull();
  });

  it('refuses to emit a rating with no reviews behind it', () => {
    // This is precisely the fabrication case the original spec asked for.
    expect(buildAggregateRating({ ratingValue: 4.8, reviewCount: 0 })).toBeNull();
    expect(buildAggregateRating({ ratingValue: 4.8, reviewCount: -5 })).toBeNull();
  });

  it('rejects a non-finite rating', () => {
    expect(buildAggregateRating({ ratingValue: Number.NaN, reviewCount: 10 })).toBeNull();
  });

  it('produces valid markup when real review data exists', () => {
    const rating = buildAggregateRating({ ratingValue: 4.2, reviewCount: 17 });
    expect(rating).toEqual({
      '@type': 'AggregateRating',
      ratingValue: 4.2,
      reviewCount: 17,
      bestRating: 5,
      worstRating: 1,
    });
  });
});

describe('SoftwareApplication', () => {
  const app = buildSoftwareApplication({
    name: 'BMI Calculator',
    description: 'Work out your body mass index.',
    path: '/calculators/bmi',
    locale: 'en',
    applicationSubCategory: 'Body composition',
  });

  it('carries the required properties', () => {
    expect(app['@type']).toBe('SoftwareApplication');
    expect(app.applicationCategory).toBe('HealthApplication');
    expect(app.operatingSystem).toBe('Any (web browser)');
    expect(app.isAccessibleForFree).toBe(true);
    expect(app.inLanguage).toBe('en');
    expect(app.url).toBe(`${SITE.baseUrl}/calculators/bmi/`);
    expect(app.offers).toEqual({ '@type': 'Offer', price: '0', priceCurrency: 'USD' });
  });

  it('ships with no aggregateRating property at all', () => {
    expect('aggregateRating' in app).toBe(false);
  });

  it('includes a rating only when real review data is supplied', () => {
    const withRating = buildSoftwareApplication({
      name: 'BMI Calculator',
      description: 'Work out your body mass index.',
      path: '/calculators/bmi',
      locale: 'en',
      applicationSubCategory: 'Body composition',
      aggregateRating: { ratingValue: 4.2, reviewCount: 17 },
    });
    expect('aggregateRating' in withRating).toBe(true);
  });
});

describe('HowTo', () => {
  const howTo = buildHowTo({
    name: 'How to calculate your BMI',
    description: 'Three steps.',
    path: '/calculators/bmi',
    locale: 'en',
    totalTime: 'PT2M',
    steps: [
      { name: 'Enter your height', text: 'Type your height.', anchor: 'step-1' },
      { name: 'Enter your weight', text: 'Type your weight.', anchor: 'step-2' },
      { name: 'Read the result', text: 'The result updates as you type.', anchor: 'step-3' },
    ],
    supply: ['Your height', 'Your weight'],
  });

  it('numbers the steps from one', () => {
    const steps = howTo.step as { position: number; url: string }[];
    expect(steps).toHaveLength(3);
    expect(steps[0]?.position).toBe(1);
    expect(steps[2]?.position).toBe(3);
  });

  it('gives every step an absolute URL with a real fragment', () => {
    const steps = howTo.step as { url: string }[];
    expect(steps[0]?.url).toBe(`${SITE.baseUrl}/calculators/bmi/#step-1`);
    for (const step of steps) {
      expect(step.url).toMatch(/^https:\/\/.+#.+$/);
    }
  });

  it('carries an ISO 8601 duration', () => {
    expect(howTo.totalTime).toBe('PT2M');
    expect(howTo.totalTime).toMatch(/^P(T.*)?$/);
  });

  it('wraps supplies in HowToSupply', () => {
    expect(howTo.supply).toEqual([
      { '@type': 'HowToSupply', name: 'Your height' },
      { '@type': 'HowToSupply', name: 'Your weight' },
    ]);
  });

  it('omits supply and tool entirely when not provided', () => {
    const minimal = buildHowTo({
      name: 'x',
      description: 'y',
      path: '/a',
      locale: 'en',
      totalTime: 'PT1M',
      steps: [{ name: 'a', text: 'b', anchor: 'step-1' }],
    });
    expect('supply' in minimal).toBe(false);
    expect('tool' in minimal).toBe(false);
  });
});

describe('FAQPage', () => {
  it('pairs questions with answers', () => {
    const faq = buildFaqPage([{ question: 'Is BMI accurate?', answer: 'It is a screening tool.' }]);
    expect(faq?.['@type']).toBe('FAQPage');
    const entities = faq?.mainEntity as { '@type': string; acceptedAnswer: { text: string } }[];
    expect(entities[0]?.['@type']).toBe('Question');
    expect(entities[0]?.acceptedAnswer.text).toBe('It is a screening tool.');
  });

  it('emits nothing rather than an empty FAQPage', () => {
    // An FAQPage with no questions is invalid markup.
    expect(buildFaqPage([])).toBeNull();
  });
});

describe('BreadcrumbList', () => {
  it('reflects the hierarchy in order', () => {
    const crumbs = buildBreadcrumbList(
      [
        { name: 'Home', path: '/' },
        { name: 'Calculators', path: '/calculators' },
        { name: 'BMI', path: '/calculators/bmi' },
      ],
      'en'
    );
    const items = crumbs?.itemListElement as { position: number; item: string }[];
    expect(items).toHaveLength(3);
    expect(items[0]?.item).toBe(`${SITE.baseUrl}/`);
    expect(items[2]?.item).toBe(`${SITE.baseUrl}/calculators/bmi/`);
    expect(items.map((i) => i.position)).toEqual([1, 2, 3]);
  });

  it('localises every crumb', () => {
    const crumbs = buildBreadcrumbList([{ name: 'Inicio', path: '/' }], 'es');
    const items = crumbs?.itemListElement as { item: string }[];
    expect(items[0]?.item).toBe(`${SITE.baseUrl}/es/`);
  });

  it('emits nothing for an empty trail', () => {
    expect(buildBreadcrumbList([], 'en')).toBeNull();
  });
});

describe('Article', () => {
  const article = buildArticle({
    headline: 'How BMR is calculated',
    description: 'Why the equations disagree.',
    path: '/guides/how-bmr-is-calculated',
    locale: 'en',
    datePublished: '2026-08-01T00:00:00.000Z',
    dateModified: '2026-08-15T00:00:00.000Z',
  });

  it('attributes authorship to the organisation, never a person', () => {
    expect(article.author).toEqual({ '@id': `${SITE.baseUrl}/#organization` });
  });

  it('carries both dates and the language', () => {
    expect(article.datePublished).toBe('2026-08-01T00:00:00.000Z');
    expect(article.dateModified).toBe('2026-08-15T00:00:00.000Z');
    expect(article.inLanguage).toBe('en');
  });
});

describe('serialisation', () => {
  it('escapes angle brackets so a value cannot break out of the script block', () => {
    const serialised = serialiseJsonLd({
      '@type': 'Thing',
      name: '</script><img src=x onerror=alert(1)>',
    });
    expect(serialised).not.toContain('</script>');
    expect(serialised).not.toContain('<img');
    expect(serialised).toContain('\\u003c');
  });

  it('round-trips back to the original string through JSON.parse', () => {
    // The escape is a JSON escape, so consumers see the original value.
    const original = '</script>';
    const parsed = JSON.parse(serialiseJsonLd({ '@type': 'Thing', name: original })) as {
      name: string;
    };
    expect(parsed.name).toBe(original);
  });

  it('produces parseable JSON for every generator', () => {
    const blocks = [
      buildOrganization(),
      buildWebSite('en'),
      buildSoftwareApplication({
        name: 'a',
        description: 'b',
        path: '/c',
        locale: 'en',
        applicationSubCategory: 'd',
      }),
      buildArticle({
        headline: 'a',
        description: 'b',
        path: '/c',
        locale: 'en',
        datePublished: '2026-01-01',
        dateModified: '2026-01-02',
      }),
    ];
    for (const block of blocks) {
      expect(() => {
        JSON.parse(serialiseJsonLd(block));
      }).not.toThrow();
      expect(block['@context']).toBe('https://schema.org');
    }
  });
});
