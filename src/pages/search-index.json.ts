import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { CALCULATOR_DEFINITIONS } from '../data/calculators';
import { getLocalePath } from '../lib/seo/urls';

/**
 * Prebuilt search index.
 *
 * Emitted as a static JSON file at build time and fetched by the search page on
 * demand, so it costs nothing on any page that is not the search page and stays
 * outside the sitewide JavaScript budget.
 *
 * Deliberately small: title, a short description, the URL and a type. Full-text
 * indexing of every guide would produce a file measured in hundreds of
 * kilobytes to serve a feature most visitors never use. Titles, descriptions
 * and keywords cover the queries people actually type on a calculator site.
 */
export interface SearchDocument {
  readonly t: string;
  readonly d: string;
  readonly u: string;
  readonly k: string;
  readonly c: 'calculator' | 'guide' | 'page';
}

export const GET: APIRoute = async () => {
  const locale = 'en' as const;

  const calculators: SearchDocument[] = CALCULATOR_DEFINITIONS.map((definition) => ({
    t: definition.heading,
    d: definition.intro,
    u: getLocalePath(`/calculators/${definition.slug}`, locale),
    k: definition.keywords.join(' '),
    c: 'calculator',
  }));

  const guideEntries = await getCollection('guides');
  const guides: SearchDocument[] = guideEntries.map((guide) => ({
    t: guide.data.title,
    d: guide.data.description,
    u: getLocalePath(`/guides/${guide.id}`, locale),
    k: guide.data.keywords.join(' '),
    c: 'guide',
  }));

  const pages: SearchDocument[] = [
    {
      t: 'All calculators',
      d: 'Every calculator on the site, grouped by category.',
      u: getLocalePath('/calculators', locale),
      k: 'calculator directory index',
      c: 'page',
    },
    {
      t: 'Guides',
      d: 'Explanations of the equations behind the calculators.',
      u: getLocalePath('/guides', locale),
      k: 'guides articles explanations',
      c: 'page',
    },
    {
      t: 'Editorial policy',
      d: 'How formulas are chosen, cited and reviewed, and what this site will not publish.',
      u: getLocalePath('/editorial-policy', locale),
      k: 'editorial policy sourcing citations',
      c: 'page',
    },
    {
      t: 'About',
      d: 'What this site is, what it leaves out, and how it is built.',
      u: getLocalePath('/about', locale),
      k: 'about',
      c: 'page',
    },
    {
      t: 'Accessibility',
      d: 'Accessibility commitments, what is verified automatically, and known limitations.',
      u: getLocalePath('/accessibility', locale),
      k: 'accessibility wcag',
      c: 'page',
    },
  ];

  return new Response(JSON.stringify([...calculators, ...guides, ...pages]), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
