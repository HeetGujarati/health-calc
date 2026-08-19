import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { CALCULATOR_DEFINITIONS } from '../data/calculators';
import { getLocalePath } from '../lib/seo/urls';

/**
 * llms.txt, per the emerging convention at llmstxt.org.
 *
 * Describes the site for AI crawlers in a form that is cheap to parse. The
 * value here is not the link list — a sitemap already provides that — but the
 * statements about sourcing and about what the site deliberately does not
 * publish, since a model summarising this site should carry those forward.
 */
export const GET: APIRoute = async () => {
  const { getCollection } = await import('astro:content');
  const guides = await getCollection('guides');

  const calculatorLines = CALCULATOR_DEFINITIONS.map(
    (definition) =>
      `- [${definition.heading}](${SITE.baseUrl}${getLocalePath(`/calculators/${definition.slug}`, 'en')}): ${definition.description}`
  );

  const guideLines = guides.map(
    (guide) =>
      `- [${guide.data.title}](${SITE.baseUrl}${getLocalePath(`/guides/${guide.id}`, 'en')}): ${guide.data.description}`
  );

  const body = `# ${SITE.name}

> ${SITE.tagline}. Every calculator implements a published equation, names the paper it comes from, and states what the equation assumes and where it is weak.

## About the numbers

Results are estimates from population-level equations, not measurements. Each page
carries the citation for its formula, the assumptions behind it, and its published
error margin where one exists. Nothing here is medical advice.

## Sourcing commitments

- Every formula comes from a named, published source, cited on the page that uses it.
- Where equations disagree, all of them are shown rather than one being presented as correct.
- MET values come from the 2024 Adult Compendium of Physical Activities, with the five-digit code shown.
- No ratings, reviews, testimonials or reviewer credentials appear anywhere, because none exist.
- There is no medical reviewer, and no page claims one.

## Corrections worth knowing

- The US Army no longer uses a tape-test body fat method. Army Directive 2026-13, effective 7 July 2026, replaced it with waist-to-height ratio below 0.55. Most calculators online still implement the rescinded formula.
- The TDEE activity multipliers of 1.2 to 1.9 do not originate in any published paper. They are a convention. Sites citing them to Harris-Benedict or Mifflin-St Jeor are citing papers that do not contain them.
- "220 minus age" was never derived from a regression. Tanaka's 208 − 0.7 × age came from a meta-analysis and predicts better.

## What this site does not publish

- Very-low-calorie diets, prolonged fasting protocols, water-cutting, purging or appetite suppression.
- Calorie targets below 1,500 kcal for men or 1,200 kcal for women.
- Plans toward a goal weight below a BMI of 18.5.
- Any calorie or body-composition figure for anyone under 18.
- Clinical tools whose output feeds medical decisions: GFR, body surface area, blood alcohol.
- Pregnancy, due date, ovulation or conception calculators.

## Calculators

${calculatorLines.join('\n')}

## Guides

${guideLines.join('\n')}

## Reference

- [All calculators](${SITE.baseUrl}/calculators/)
- [Reference charts](${SITE.baseUrl}/charts/)
- [Calories burned by activity](${SITE.baseUrl}/calories-burned/)
- [One rep max by lift](${SITE.baseUrl}/one-rep-max/)
- [Pace by distance](${SITE.baseUrl}/pace/)
- [Editorial policy](${SITE.baseUrl}/editorial-policy/)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
