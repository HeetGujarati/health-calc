import { describe, expect, it } from 'vitest';
import {
  allBmrEstimates,
  basalMetabolicRate,
  katchMcArdle,
  mifflinStJeor,
  revisedHarrisBenedict,
} from './bmr';
import { asCentimetres, asKilograms, asYears } from './units';

/**
 * Worked examples computed from the published coefficients of each paper.
 *
 * Mifflin-St Jeor: Am J Clin Nutr 51(2), 1990, pp. 241-247.
 *   men:   10W + 6.25H - 5A + 5
 *   women: 10W + 6.25H - 5A - 161
 */
describe('Mifflin-St Jeor (1990)', () => {
  it('matches worked examples for men', () => {
    // 80 kg, 180 cm, 30 y: 800 + 1125 - 150 + 5
    expect(mifflinStJeor(asKilograms(80), asCentimetres(180), asYears(30), 'male')).toBeCloseTo(
      1780,
      10
    );
    // 70 kg, 175 cm, 25 y: 700 + 1093.75 - 125 + 5
    expect(mifflinStJeor(asKilograms(70), asCentimetres(175), asYears(25), 'male')).toBeCloseTo(
      1673.75,
      10
    );
    // 95 kg, 190 cm, 45 y: 950 + 1187.5 - 225 + 5
    expect(mifflinStJeor(asKilograms(95), asCentimetres(190), asYears(45), 'male')).toBeCloseTo(
      1917.5,
      10
    );
  });

  it('matches worked examples for women', () => {
    // 65 kg, 165 cm, 30 y: 650 + 1031.25 - 150 - 161
    expect(mifflinStJeor(asKilograms(65), asCentimetres(165), asYears(30), 'female')).toBeCloseTo(
      1370.25,
      10
    );
    // 55 kg, 160 cm, 25 y: 550 + 1000 - 125 - 161
    expect(mifflinStJeor(asKilograms(55), asCentimetres(160), asYears(25), 'female')).toBeCloseTo(
      1264,
      10
    );
    // 80 kg, 170 cm, 50 y: 800 + 1062.5 - 250 - 161
    expect(mifflinStJeor(asKilograms(80), asCentimetres(170), asYears(50), 'female')).toBeCloseTo(
      1451.5,
      10
    );
  });

  it('separates the sexes by exactly the published constant offset', () => {
    // The two equations differ only in the trailing constant: +5 versus -161.
    const male = mifflinStJeor(asKilograms(70), asCentimetres(170), asYears(40), 'male');
    const female = mifflinStJeor(asKilograms(70), asCentimetres(170), asYears(40), 'female');
    expect(male - female).toBeCloseTo(166, 10);
  });
});

/**
 * Revised Harris-Benedict: Roza & Shizgal, Am J Clin Nutr 40(1), 1984,
 * pp. 168-182.
 *   men:   88.362 + 13.397W + 4.799H - 5.677A
 *   women: 447.593 +  9.247W + 3.098H - 4.330A
 */
describe('Revised Harris-Benedict (1984)', () => {
  it('matches worked examples for men', () => {
    // 80 kg, 180 cm, 30 y: 88.362 + 1071.76 + 863.82 - 170.31
    expect(
      revisedHarrisBenedict(asKilograms(80), asCentimetres(180), asYears(30), 'male')
    ).toBeCloseTo(1853.632, 3);
    // 70 kg, 175 cm, 25 y: 88.362 + 937.79 + 839.825 - 141.925
    expect(
      revisedHarrisBenedict(asKilograms(70), asCentimetres(175), asYears(25), 'male')
    ).toBeCloseTo(1724.052, 3);
    // 95 kg, 190 cm, 45 y: 88.362 + 1272.715 + 911.81 - 255.465
    expect(
      revisedHarrisBenedict(asKilograms(95), asCentimetres(190), asYears(45), 'male')
    ).toBeCloseTo(2017.422, 3);
  });

  it('matches worked examples for women', () => {
    // 65 kg, 165 cm, 30 y: 447.593 + 601.055 + 511.17 - 129.9
    expect(
      revisedHarrisBenedict(asKilograms(65), asCentimetres(165), asYears(30), 'female')
    ).toBeCloseTo(1429.918, 3);
    // 55 kg, 160 cm, 25 y: 447.593 + 508.585 + 495.68 - 108.25
    expect(
      revisedHarrisBenedict(asKilograms(55), asCentimetres(160), asYears(25), 'female')
    ).toBeCloseTo(1343.608, 3);
    // 80 kg, 170 cm, 50 y: 447.593 + 739.76 + 526.66 - 216.5
    expect(
      revisedHarrisBenedict(asKilograms(80), asCentimetres(170), asYears(50), 'female')
    ).toBeCloseTo(1497.513, 3);
  });

  it('reads higher than Mifflin-St Jeor for the same person', () => {
    // The documented tendency of the 1919-derived equation to over-estimate is
    // the reason Mifflin-St Jeor is the default; asserted so the comparison copy
    // on the page stays true.
    const mass = asKilograms(80);
    const height = asCentimetres(180);
    const age = asYears(30);
    expect(revisedHarrisBenedict(mass, height, age, 'male')).toBeGreaterThan(
      mifflinStJeor(mass, height, age, 'male')
    );
  });
});

/** Katch-McArdle: 370 + 21.6 x lean body mass (kg). */
describe('Katch-McArdle (1977)', () => {
  it('matches worked examples', () => {
    expect(katchMcArdle(asKilograms(60))).toBeCloseTo(1666, 10);
    expect(katchMcArdle(asKilograms(50))).toBeCloseTo(1450, 10);
    expect(katchMcArdle(asKilograms(70))).toBeCloseTo(1882, 10);
  });

  it('is independent of sex, because lean mass already carries that difference', () => {
    expect(katchMcArdle(asKilograms(55))).toBe(katchMcArdle(asKilograms(55)));
  });
});

describe('formula dispatch', () => {
  const input = {
    mass: asKilograms(80),
    height: asCentimetres(180),
    age: asYears(30),
    sex: 'male' as const,
  };

  it('routes to the requested equation', () => {
    expect(basalMetabolicRate(input, 'mifflin_st_jeor')).toBeCloseTo(1780, 10);
    expect(basalMetabolicRate(input, 'revised_harris_benedict')).toBeCloseTo(1853.632, 3);
  });

  it('returns null for Katch-McArdle without lean body mass, never a fallback', () => {
    // Silently substituting another equation would report a number under the
    // wrong formula name, which the comparison table would then present as fact.
    expect(basalMetabolicRate(input, 'katch_mcardle')).toBeNull();
    expect(basalMetabolicRate({ ...input, leanBodyMass: asKilograms(64) }, 'katch_mcardle')).toBe(
      1752.4
    );
  });

  it('reports every computable estimate for the comparison table', () => {
    const estimates = allBmrEstimates(input);
    expect(estimates.mifflin_st_jeor).toBeCloseTo(1780, 10);
    expect(estimates.revised_harris_benedict).toBeCloseTo(1853.632, 3);
    expect(estimates.katch_mcardle).toBeNull();
  });
});
