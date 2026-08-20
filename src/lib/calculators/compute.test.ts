import { describe, expect, it } from 'vitest';
import { computeFor, CALCULATORS, calculatorSlugs } from './registry';
import { CALCULATOR_DEFINITIONS } from '../../data/calculators';
import type { FormValues } from './result';

/**
 * The compute layer, tested through the same entry point the island calls.
 *
 * The guard tests in health/guards.test.ts prove the rules work in isolation.
 * These prove they are actually reached: a guard that works alone but is
 * bypassed by the caller protects nobody.
 */

const run = (slug: string, values: FormValues) => {
  const compute = computeFor(slug);
  expect(compute, `no compute function registered for ${slug}`).not.toBeNull();
  return compute!(values, 'en-US');
};

const adult: FormValues = {
  units: 'metric',
  sex: 'male',
  age: '30',
  height: '180',
  weight: '80',
};

describe('registry', () => {
  it('has a compute function for every shipped calculator', () => {
    for (const definition of CALCULATOR_DEFINITIONS) {
      expect(
        computeFor(definition.slug),
        `${definition.slug} has a page but no compute function`
      ).not.toBeNull();
    }
  });

  it('has a page for every registered compute function', () => {
    // The reverse direction: a compute function with no page is dead code that
    // still ships in the client bundle.
    const slugs = new Set(CALCULATOR_DEFINITIONS.map((definition) => definition.slug));
    for (const slug of calculatorSlugs) {
      expect(slugs.has(slug), `${slug} is registered but has no page`).toBe(true);
    }
  });

  it('registers a compute function for every page and no others', () => {
    // A count assertion here would have to be edited every time a calculator is
    // added, which makes it a chore rather than a check — and a chore gets
    // updated reflexively, which is exactly when it stops catching anything.
    // What actually matters is that the two lists agree, and that is asserted
    // in both directions above and here.
    expect(Object.keys(CALCULATORS)).toHaveLength(CALCULATOR_DEFINITIONS.length);
  });

  it('returns null for an unknown slug rather than throwing', () => {
    expect(computeFor('not-a-calculator')).toBeNull();
  });
});

describe('every calculator handles empty input without producing a number', () => {
  it.each(calculatorSlugs)('%s', (slug) => {
    const result = run(slug, { units: 'metric' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.message.length).toBeGreaterThan(0);
  });
});

describe('every calculator rejects hostile input', () => {
  const hostile: FormValues = {
    units: 'metric',
    sex: 'male',
    age: 'NaN',
    height: 'Infinity',
    weight: '-999',
    load: 'abc',
    reps: '',
    waist: '   ',
    time: 'not-a-time',
  };

  it.each(calculatorSlugs)('%s', (slug) => {
    const result = run(slug, hostile);
    expect(result.ok).toBe(false);
  });
});

describe('BMI', () => {
  it('produces the documented value', () => {
    const result = run('bmi', { units: 'metric', height: '175', weight: '70' });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    // 70 / 1.75^2 = 22.857 -> 22.9 at one decimal.
    expect(result.primary.value).toBe('22.9');
  });

  it('converts imperial input to the same answer', () => {
    // 5 ft 9 in = 175.26 cm; 154.32 lb = 70 kg.
    const result = run('bmi', {
      units: 'imperial',
      heightFeet: '5',
      heightInches: '9',
      weight: '154.324',
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(Number(result.primary.value)).toBeCloseTo(22.8, 1);
  });

  it('always carries the screening-tool caveat', () => {
    const result = run('bmi', { units: 'metric', height: '175', weight: '70' });
    if (!result.ok) return;
    expect(result.notes.some((note) => note.text.includes('screening'))).toBe(true);
  });
});

describe('calorie target guards fire through the UI entry point', () => {
  it('refuses to produce any number under 18', () => {
    const result = run('calorie', { ...adult, age: '16', goal: 'steady_loss' });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('below_minimum_age');
    // There must be no number anywhere on the result for the page to render.
    expect(result).not.toHaveProperty('primary');
  });

  it('caps the deficit and says so', () => {
    // A small person with a low TDEE: the 25% cap binds before 1,000 kcal.
    const result = run('calorie', {
      units: 'metric',
      sex: 'female',
      age: '30',
      height: '155',
      weight: '50',
      activity: 'sedentary',
      goal: 'steady_loss',
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.notes.some((note) => note.tone === 'caution')).toBe(true);
  });

  it('never emits a target below the floor across the whole input range', () => {
    for (const weight of [45, 60, 75, 90, 110]) {
      for (const activity of ['sedentary', 'moderately_active', 'extra_active']) {
        for (const sex of ['male', 'female']) {
          const result = run('calorie', {
            units: 'metric',
            sex,
            age: '30',
            height: '165',
            weight: String(weight),
            activity,
            goal: 'steady_loss',
          });
          if (!result.ok) continue;
          const floor = sex === 'male' ? 1500 : 1200;
          const value = Number(result.primary.value.replace(/[^0-9.]/g, ''));
          expect(value, `${sex} ${String(weight)}kg ${activity}`).toBeGreaterThanOrEqual(floor);
        }
      }
    }
  });

  it('refuses a goal weight below the healthy BMI band and offers the range', () => {
    const result = run('calorie', {
      ...adult,
      goal: 'steady_loss',
      goalWeight: '50',
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.field).toBe('goalWeight');
    expect(result.error.message).toContain('18.5');
  });

  it('allows a goal weight inside the band', () => {
    const result = run('calorie', { ...adult, goal: 'steady_loss', goalWeight: '75' });
    expect(result.ok).toBe(true);
  });
});

describe('body fat age gate', () => {
  it('produces no estimate under 18', () => {
    const result = run('body-fat', {
      ...adult,
      age: '15',
      method: 'us_navy',
      neck: '38',
      waist: '85',
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe('below_minimum_age');
  });

  it('rejects a neck wider than the waist with an actionable message', () => {
    const result = run('body-fat', {
      ...adult,
      method: 'us_navy',
      neck: '95',
      waist: '85',
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.message).toContain('waist');
  });
});

describe('army body composition', () => {
  it('applies the strict inequality at the boundary', () => {
    // 99 cm at 180 cm is exactly 0.550, which does not meet the standard.
    const result = run('army-body-fat', { units: 'metric', height: '180', waist: '99' });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.primary.value).toBe('0.550');
    expect(result.secondary[0]?.value).toBe('No');
  });

  it('passes just below the boundary', () => {
    const result = run('army-body-fat', { units: 'metric', height: '180', waist: '98.8' });
    if (!result.ok) return;
    expect(result.secondary[0]?.value).toBe('Yes');
  });
});

describe('one rep max', () => {
  it('matches the Epley worked example', () => {
    const result = run('one-rep-max', {
      units: 'metric',
      load: '100',
      reps: '5',
      formula: 'epley',
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.primary.value).toContain('116.7');
  });

  it('warns above the validated repetition ceiling', () => {
    const result = run('one-rep-max', { units: 'metric', load: '100', reps: '15' });
    if (!result.ok) return;
    expect(result.notes.some((note) => note.tone === 'caution')).toBe(true);
  });
});

describe('running pace', () => {
  it('converts a 25 minute 5k to pace per kilometre', () => {
    const result = run('running-pace', { distance: '5k', time: '25:00' });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.primary.value).toBe('5:00');
  });

  it('rejects a malformed time rather than guessing', () => {
    const result = run('running-pace', { distance: '5k', time: '1:75' });
    expect(result.ok).toBe(false);
  });
});

describe('unit handling', () => {
  it('validates in the unit the user typed, so messages quote a range they recognise', () => {
    // 500 lb is out of range; the message must say lb, not kg.
    const result = run('bmi', {
      units: 'imperial',
      heightFeet: '5',
      heightInches: '9',
      weight: '5000',
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.message).toContain('lb');
  });

  it('falls back to metric for an unrecognised unit system', () => {
    // The toggle is not something the user types, so a bad value must not fail
    // the whole calculation.
    const result = run('bmi', { units: 'furlongs', height: '175', weight: '70' });
    expect(result.ok).toBe(true);
  });
});
