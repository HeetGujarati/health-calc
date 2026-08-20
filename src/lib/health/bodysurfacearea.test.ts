import { describe, expect, it } from 'vitest';
import {
  allBsaEstimates,
  bodySurfaceArea,
  boydBsa,
  bsaSpread,
  duBoisBsa,
  gehanGeorgeBsa,
  haycockBsa,
  mostellerBsa,
  type BsaFormula,
} from './bodysurfacearea';
import { asCentimetres, asKilograms } from './units';

/**
 * Body surface area.
 *
 * The anchor case is 180 cm and 80 kg, chosen because Mosteller is exactly 2.0
 * there — 180 × 80 / 3600 = 4 — so one assertion in this file is an identity
 * rather than a number copied from a calculator. Every other formula is pinned
 * against the same person, which is also the property the page depends on: five
 * equations fitted to five different samples should agree to within a few per
 * cent on an ordinary adult, and visibly disagree at the extremes.
 */

const H = asCentimetres(180);
const W = asKilograms(80);

describe('body surface area', () => {
  it('computes Mosteller as an exact square root', () => {
    // 180 × 80 = 14,400; / 3600 = 4; √4 = 2. No rounding anywhere in the path.
    expect(mostellerBsa(H, W)).toBe(2);
  });

  it('puts every formula within 5% of Mosteller for an ordinary adult', () => {
    for (const estimate of allBsaEstimates(H, W)) {
      expect(estimate.squareMetres).toBeGreaterThan(1.9);
      expect(estimate.squareMetres).toBeLessThan(2.1);
    }
  });

  it('reproduces each published equation', () => {
    expect(duBoisBsa(H, W)).toBeCloseTo(0.007184 * 80 ** 0.425 * 180 ** 0.725, 10);
    expect(haycockBsa(H, W)).toBeCloseTo(0.024265 * 180 ** 0.3964 * 80 ** 0.5378, 10);
    expect(gehanGeorgeBsa(H, W)).toBeCloseTo(0.0235 * 180 ** 0.42246 * 80 ** 0.51456, 10);
  });

  it('feeds Boyd grams rather than kilograms', () => {
    // The exponent is a function of mass, so passing kg would not merely rescale
    // the answer — it would change the curve. This is the easiest error to make
    // in this module and the hardest to spot, because the wrong answer is
    // roughly the right size.
    const grams = 80_000;
    const exponent = 0.7285 - 0.0188 * Math.log10(grams);
    expect(boydBsa(H, W)).toBeCloseTo(0.0003207 * 180 ** 0.3 * grams ** exponent, 10);

    const asIfKilograms = 0.0003207 * 180 ** 0.3 * 80 ** (0.7285 - 0.0188 * Math.log10(80));
    expect(boydBsa(H, W)).not.toBeCloseTo(asIfKilograms, 1);
  });

  it('grows with both height and mass', () => {
    const formulas: BsaFormula[] = ['du_bois', 'mosteller', 'haycock', 'gehan_george', 'boyd'];
    for (const formula of formulas) {
      const base = bodySurfaceArea(formula, H, W);
      expect(bodySurfaceArea(formula, asCentimetres(190), W)).toBeGreaterThan(base);
      expect(bodySurfaceArea(formula, H, asKilograms(90))).toBeGreaterThan(base);
    }
  });

  it('offers every formula exactly once', () => {
    const estimates = allBsaEstimates(H, W);
    expect(estimates).toHaveLength(5);
    expect(new Set(estimates.map((estimate) => estimate.formula)).size).toBe(5);
  });

  it('reports the spread between formulas as a share of the median', () => {
    const spread = bsaSpread(allBsaEstimates(H, W));
    // Ordinary adult: the formulas agree closely, but not exactly.
    expect(spread).toBeGreaterThan(0);
    expect(spread).toBeLessThan(0.05);
  });

  it('reports a wider spread at a body size none of the samples covered', () => {
    // Du Bois fitted nine people, none of them this size. The page says the
    // formulas disagree more at the extremes; this is that claim, tested.
    const ordinary = bsaSpread(allBsaEstimates(H, W));
    const extreme = bsaSpread(allBsaEstimates(asCentimetres(140), asKilograms(150)));
    expect(extreme).toBeGreaterThan(ordinary);
  });

  it('returns zero spread for a single estimate and for an empty set', () => {
    expect(bsaSpread([{ formula: 'mosteller', squareMetres: 2 }])).toBe(0);
    expect(bsaSpread([])).toBe(0);
  });

  it('takes the mean of the middle two when the count is even', () => {
    const spread = bsaSpread([
      { formula: 'du_bois', squareMetres: 1 },
      { formula: 'mosteller', squareMetres: 2 },
      { formula: 'haycock', squareMetres: 2 },
      { formula: 'boyd', squareMetres: 3 },
    ]);
    // Median 2, range 2: the even-length branch has to average 2 and 2.
    expect(spread).toBe(1);
  });
});
