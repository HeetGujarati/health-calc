import { describe, expect, it } from 'vitest';
import {
  ACTIVITY_ACCURACY,
  ACTIVITY_INTRO,
  ACTIVITY_MET_EXPLANATION,
  ACTIVITY_NET_NOTE,
  DISTANCE_DEMANDS,
  DISTANCE_INTRO,
  LIFT_ACCURACY,
  LIFT_INTRO,
  fillTemplate,
  hashString,
  pickVariant,
  renderVariant,
} from '../../src/lib/content/templates';
import { ACTIVITIES } from '../../src/data/activities';
import { LIFTS } from '../../src/data/lifts';
import { DISTANCES } from '../../src/data/distances';

/**
 * The anti-duplication engine.
 *
 * Section 7 requires at least four variants per slot, chosen deterministically
 * from a hash of the slug, and no paragraph repeated verbatim across pages.
 * These tests enforce all three, including the subtle one: a variant with no
 * per-page placeholder renders identically everywhere it is selected, which
 * defeats the whole mechanism.
 */

const ALL_SLOTS = {
  ACTIVITY_INTRO,
  ACTIVITY_MET_EXPLANATION,
  ACTIVITY_ACCURACY,
  ACTIVITY_NET_NOTE,
  LIFT_INTRO,
  LIFT_ACCURACY,
  DISTANCE_INTRO,
  DISTANCE_DEMANDS,
};

describe('template slots', () => {
  it.each(Object.entries(ALL_SLOTS))('%s offers at least four variants', (_name, variants) => {
    expect(variants.length).toBeGreaterThanOrEqual(4);
  });

  it.each(Object.entries(ALL_SLOTS))('%s has no duplicate variants', (_name, variants) => {
    expect(new Set(variants).size).toBe(variants.length);
  });

  it.each(Object.entries(ALL_SLOTS))(
    '%s gives every variant a per-page placeholder',
    (name, variants) => {
      // A variant without a placeholder renders byte-identical on every page
      // that selects it. With four variants over sixty pages that is fifteen
      // verbatim duplicates.
      for (const variant of variants) {
        expect(variant, `${name} variant lacks a placeholder: "${variant.slice(0, 60)}"`).toMatch(
          /\{\w+\}/
        );
      }
    }
  );
});

describe('deterministic selection', () => {
  it('returns the same variant for the same slug and salt, every time', () => {
    for (let run = 0; run < 50; run += 1) {
      expect(pickVariant(ACTIVITY_INTRO, 'walking', 'intro')).toBe(
        pickVariant(ACTIVITY_INTRO, 'walking', 'intro')
      );
    }
  });

  it('varies the choice across slugs', () => {
    const chosen = new Set(ACTIVITIES.map((a) => pickVariant(ACTIVITY_INTRO, a.slug, 'intro')));
    // With sixty slugs over four variants, all four should be reached.
    expect(chosen.size).toBe(ACTIVITY_INTRO.length);
  });

  it('varies the choice across slots on the same page', () => {
    // Without the salt every slot on a page would pick the same index, and the
    // page would read as one template rotated rather than a genuine mix.
    const sameSalt = ACTIVITIES.map((a) =>
      ACTIVITY_INTRO.indexOf(pickVariant(ACTIVITY_INTRO, a.slug, 'intro'))
    );
    const otherSalt = ACTIVITIES.map((a) =>
      ACTIVITY_ACCURACY.indexOf(pickVariant(ACTIVITY_ACCURACY, a.slug, 'accuracy'))
    );
    expect(sameSalt).not.toEqual(otherSalt);
  });

  it('distributes reasonably evenly across variants', () => {
    const counts = new Map<string, number>();
    for (const activity of ACTIVITIES) {
      const chosen = pickVariant(ACTIVITY_INTRO, activity.slug, 'intro');
      counts.set(chosen, (counts.get(chosen) ?? 0) + 1);
    }
    // Sixty pages over four variants averages fifteen. A wildly skewed hash
    // would concentrate pages on one variant.
    for (const count of counts.values()) {
      expect(count).toBeGreaterThan(4);
    }
  });

  it('hashes identically regardless of how many times it is called', () => {
    expect(hashString('marathon')).toBe(hashString('marathon'));
    expect(hashString('marathon')).not.toBe(hashString('half-marathon'));
  });
});

describe('placeholder filling', () => {
  it('substitutes named values', () => {
    expect(fillTemplate('{a} then {b}', { a: 'one', b: 2 })).toBe('one then 2');
  });

  it('throws on an unknown placeholder rather than shipping it literally', () => {
    // A page that renders the text "{activity}" is worse than a failed build.
    expect(() => fillTemplate('{missing}', {})).toThrow('has no value');
  });

  it('throws when a slot has no variants', () => {
    expect(() => pickVariant([], 'x', 'y')).toThrow('No variants');
  });
});

describe('no verbatim duplication across pages', () => {
  const renderAll = (
    variants: readonly string[],
    salt: string,
    items: readonly { slug: string }[],
    valuesFor: (item: never) => Record<string, string | number>
  ): string[] =>
    items.map((item) => renderVariant(variants, item.slug, salt, valuesFor(item as never)));

  it('produces a distinct intro for every activity', () => {
    const rendered = renderAll(
      ACTIVITY_INTRO,
      'intro',
      ACTIVITIES,
      (a: (typeof ACTIVITIES)[number]) => ({
        activity: a.name.toLowerCase(),
        Activity: a.name,
        met: a.met,
      })
    );
    expect(new Set(rendered).size).toBe(rendered.length);
  });

  it('produces a distinct accuracy paragraph for every activity', () => {
    const rendered = renderAll(
      ACTIVITY_ACCURACY,
      'accuracy',
      ACTIVITIES,
      (a: (typeof ACTIVITIES)[number]) => ({ activity: a.name.toLowerCase(), met: a.met })
    );
    expect(new Set(rendered).size).toBe(rendered.length);
  });

  it('produces a distinct intro for every lift', () => {
    const rendered = renderAll(LIFT_INTRO, 'intro', LIFTS, (l: (typeof LIFTS)[number]) => ({
      lift: l.name.toLowerCase(),
    }));
    expect(new Set(rendered).size).toBe(rendered.length);
  });

  it('produces a distinct intro for every distance', () => {
    const rendered = renderAll(
      DISTANCE_INTRO,
      'intro',
      DISTANCES,
      (d: (typeof DISTANCES)[number]) => ({
        distance: d.name.toLowerCase(),
      })
    );
    expect(new Set(rendered).size).toBe(rendered.length);
  });
});

describe('data integrity', () => {
  it('ships exactly the counts the brief specifies', () => {
    expect(ACTIVITIES).toHaveLength(60);
    expect(LIFTS).toHaveLength(12);
    expect(DISTANCES).toHaveLength(10);
  });

  it('gives every activity a five-digit Compendium code and a plausible MET', () => {
    for (const activity of ACTIVITIES) {
      expect(activity.code, activity.slug).toMatch(/^\d{5}$/);
      expect(activity.met, activity.slug).toBeGreaterThanOrEqual(0.9);
      expect(activity.met, activity.slug).toBeLessThanOrEqual(30);
      expect(activity.compendiumDescription.length, activity.slug).toBeGreaterThan(4);
    }
  });

  it('uses unique slugs and codes', () => {
    const slugs = ACTIVITIES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const codes = ACTIVITIES.map((a) => a.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('resolves every related reference', () => {
    const known = new Set(ACTIVITIES.map((a) => a.slug));
    for (const activity of ACTIVITIES) {
      expect(activity.related, activity.slug).toHaveLength(5);
      for (const related of activity.related) {
        expect(known.has(related), `${activity.slug} -> ${related}`).toBe(true);
        expect(related).not.toBe(activity.slug);
      }
    }

    const liftSlugs = new Set(LIFTS.map((l) => l.slug));
    for (const lift of LIFTS) {
      for (const related of lift.related) {
        expect(liftSlugs.has(related), `${lift.slug} -> ${related}`).toBe(true);
      }
    }

    const distanceSlugs = new Set(DISTANCES.map((d) => d.slug));
    for (const distance of DISTANCES) {
      for (const related of distance.related) {
        expect(distanceSlugs.has(related), `${distance.slug} -> ${related}`).toBe(true);
      }
    }
  });
});
