import { describe, expect, it } from 'vitest';
import { CALCULATOR_DEFINITIONS, getCalculator } from '../../src/data/calculators';
import { GUIDE_SLUGS } from '../../src/data/guides/titles';

/**
 * Related-link integrity across the calculator set.
 *
 * `CalculatorLayout.astro` resolves `relatedCalculators` and `relatedGuides`
 * through `getCalculator` and the guide list, then filters out anything that
 * does not resolve. That is the right behaviour at render time — a broken link
 * should never reach a reader — but it means a misspelt slug silently renders
 * five links where six were intended, and nothing anywhere reports it. The link
 * audit cannot catch it either: the anchor is never emitted, so there is no
 * href to find broken.
 *
 * The programmatic data has had this check since it was written
 * (`templates.test.ts`, "resolves every related reference"). The calculators
 * never did. This closes that gap.
 *
 * Inbound links are asserted too. A calculator nothing links to is reachable
 * only from the directory, the search index and the sitemap, which is a real
 * loss for a page meant to sit in a web of related tools — and it is the exact
 * state a newly added calculator is in until someone remembers to wire it up.
 */

const SLUGS = new Set(CALCULATOR_DEFINITIONS.map((definition) => definition.slug));
const GUIDES = new Set(GUIDE_SLUGS);

/** Six, per section 7 requirement 9 of the brief. */
const REQUIRED_RELATED = 6;

describe('calculator related links', () => {
  it('has a unique slug for every calculator', () => {
    expect(SLUGS.size).toBe(CALCULATOR_DEFINITIONS.length);
  });

  it.each(CALCULATOR_DEFINITIONS.map((definition) => definition.slug))(
    '%s links to exactly six calculators that all exist',
    (slug) => {
      const definition = getCalculator(slug);
      expect(definition).not.toBeNull();
      if (definition === null) return;

      expect(definition.relatedCalculators).toHaveLength(REQUIRED_RELATED);

      for (const related of definition.relatedCalculators) {
        // The message matters more than the assertion here: a bare "expected
        // true" would send someone hunting through eighteen definitions.
        expect(SLUGS.has(related), `${slug} → ${related} does not exist`).toBe(true);
        expect(related, `${slug} lists itself as related`).not.toBe(slug);
      }

      expect(
        new Set(definition.relatedCalculators).size,
        `${slug} lists the same calculator twice`
      ).toBe(definition.relatedCalculators.length);
    }
  );

  it.each(CALCULATOR_DEFINITIONS.map((definition) => definition.slug))(
    '%s links only to guides that exist',
    (slug) => {
      const definition = getCalculator(slug);
      if (definition === null) return;

      expect(definition.relatedGuides.length).toBeGreaterThan(0);
      for (const guide of definition.relatedGuides) {
        expect(GUIDES.has(guide), `${slug} → guide ${guide} does not exist`).toBe(true);
      }

      expect(new Set(definition.relatedGuides).size, `${slug} lists the same guide twice`).toBe(
        definition.relatedGuides.length
      );
    }
  );

  it('leaves no calculator without an inbound link', () => {
    const inbound = new Map<string, number>([...SLUGS].map((slug) => [slug, 0]));
    for (const definition of CALCULATOR_DEFINITIONS) {
      for (const related of definition.relatedCalculators) {
        inbound.set(related, (inbound.get(related) ?? 0) + 1);
      }
    }

    const orphans = [...inbound].filter(([, count]) => count === 0).map(([slug]) => slug);
    expect(orphans, `nothing links to: ${orphans.join(', ')}`).toEqual([]);
  });
});
