import { describe, expect, it } from 'vitest';
import {
  ONE_REP_MAX_PERCENTAGES,
  RELIABLE_REP_CEILING,
  allOneRepMaxEstimates,
  averageOneRepMax,
  brzycki,
  epley,
  loadForReps,
  lombardi,
  oconner,
  oneRepMax,
  percentageTable,
  repsAtPercentage,
  wathan,
} from './onerepmax';
import { asKilograms } from './units';

describe('one rep max equations', () => {
  const load = asKilograms(100);

  it('matches worked examples at 5 repetitions', () => {
    expect(epley(load, 5)).toBeCloseTo(116.666667, 6); // 100 (1 + 5/30)
    expect(brzycki(load, 5)).toBeCloseTo(112.5, 10); // 100 x 36/32
    expect(lombardi(load, 5)).toBeCloseTo(117.461894, 6); // 100 x 5^0.10
    expect(oconner(load, 5)).toBeCloseTo(112.5, 10); // 100 (1 + 5/40)
    expect(wathan(load, 5)).toBeCloseTo(116.582505, 6);
  });

  it('matches worked examples at 3 repetitions', () => {
    expect(epley(load, 3)).toBeCloseTo(110, 10);
    expect(brzycki(load, 3)).toBeCloseTo(105.882353, 6); // 100 x 36/34
    expect(oconner(load, 3)).toBeCloseTo(107.5, 10);
  });

  it('matches worked examples at 10 repetitions', () => {
    expect(epley(load, 10)).toBeCloseTo(133.333333, 6);
    expect(brzycki(load, 10)).toBeCloseTo(133.333333, 6); // 100 x 36/27
    expect(oconner(load, 10)).toBeCloseTo(125, 10);
  });

  it('returns the load itself at one repetition, except for Epley', () => {
    // Brzycki, Lombardi and O'Conner are exact at a single rep. Epley is not:
    // it returns 103.3 for a 100 kg single, which is a known property of the
    // equation rather than a bug, and the page says so.
    expect(brzycki(load, 1)).toBeCloseTo(100, 10);
    expect(lombardi(load, 1)).toBeCloseTo(100, 10);
    expect(oconner(load, 1)).toBeCloseTo(102.5, 10);
    expect(epley(load, 1)).toBeCloseTo(103.333333, 6);
  });

  it('returns null from Brzycki at its undefined point rather than Infinity', () => {
    // The denominator 37 - r reaches zero at 37 reps.
    expect(brzycki(load, 37)).toBeNull();
    expect(brzycki(load, 40)).toBeNull();
    expect(brzycki(load, 36)).toBeCloseTo(3600, 10);
  });

  it('documents the validated repetition ceiling', () => {
    expect(RELIABLE_REP_CEILING).toBe(10);
  });

  it('diverges more as repetitions rise, which is the point of showing all five', () => {
    const spread = (reps: number): number => {
      const values = Object.values(allOneRepMaxEstimates(load, reps)).filter(
        (v): v is number => v !== null
      );
      return Math.max(...values) - Math.min(...values);
    };
    expect(spread(12)).toBeGreaterThan(spread(3));
  });
});

describe('dispatch and aggregation', () => {
  const load = asKilograms(100);

  it('routes to the requested equation', () => {
    expect(oneRepMax(load, 5, 'epley')).toBeCloseTo(116.666667, 6);
    expect(oneRepMax(load, 5, 'brzycki')).toBeCloseTo(112.5, 10);
    expect(oneRepMax(load, 5, 'lombardi')).toBeCloseTo(117.461894, 6);
    expect(oneRepMax(load, 5, 'oconner')).toBeCloseTo(112.5, 10);
    expect(oneRepMax(load, 5, 'wathan')).toBeCloseTo(116.582505, 6);
  });

  it('averages the defined estimates', () => {
    expect(averageOneRepMax(load, 5)).toBeCloseTo(115.142213, 6);
  });

  it('excludes undefined estimates from the average rather than treating them as zero', () => {
    // At 37 reps Brzycki is null; averaging it as 0 would drag the mean down.
    const average = averageOneRepMax(load, 20);
    const values = Object.values(allOneRepMaxEstimates(load, 20)).filter(
      (v): v is number => v !== null
    );
    expect(average).toBeCloseTo(
      values.reduce((total, value) => total + value, 0) / values.length,
      10
    );
  });
});

describe('percentage table', () => {
  it('covers 50 to 95 percent in steps of five', () => {
    expect(ONE_REP_MAX_PERCENTAGES).toEqual([50, 55, 60, 65, 70, 75, 80, 85, 90, 95]);
  });

  it('computes loads for each percentage', () => {
    const table = percentageTable(120);
    expect(table).toHaveLength(10);
    expect(table[0]).toEqual({ percent: 50, load: 60 });
    expect(table[9]).toEqual({ percent: 95, load: 114 });
  });

  it('inverts Epley consistently', () => {
    // A load computed for N reps should imply N reps when fed back.
    const oneRm = 150;
    for (const reps of [1, 3, 5, 8, 10]) {
      const load = loadForReps(oneRm, reps);
      expect(epley(asKilograms(load), reps)).toBeCloseTo(oneRm, 8);
    }
  });

  it('maps percentages back to repetition counts', () => {
    // At 100% the equation gives zero additional reps.
    expect(repsAtPercentage(100)).toBeCloseTo(0, 10);
    // 75% of 1RM: 30 x (100/75 - 1) = 10 reps.
    expect(repsAtPercentage(75)).toBeCloseTo(10, 10);
    expect(repsAtPercentage(50)).toBeCloseTo(30, 10);
  });

  it('rejects nonsensical percentages instead of returning a negative rep count', () => {
    expect(repsAtPercentage(0)).toBe(0);
    expect(repsAtPercentage(-10)).toBe(0);
    expect(repsAtPercentage(150)).toBe(0);
  });
});
