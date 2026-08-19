import { describe, expect, it } from 'vitest';
import {
  deurenbergBodyFat,
  fatFreeMass,
  fatMass,
  jacksonPollock3SiteBodyFat,
  jacksonPollock3SiteDensity,
  jacksonPollock7SiteBodyFat,
  jacksonPollock7SiteDensity,
  siriBodyFat,
  usNavyBodyFat,
} from './bodyfat';
import { asCentimetres, asKilograms, asMillimetres, asYears } from './units';

/**
 * Expected values are computed from an independent restatement of each
 * published equation, which catches coefficient transcription errors and unit
 * conversion mistakes — the two failure modes that produce plausible but wrong
 * numbers.
 */

describe('Siri equation (1961)', () => {
  it('converts body density to fat percentage', () => {
    expect(siriBodyFat(1.07)).toBeCloseTo(12.61682, 5);
    expect(siriBodyFat(1.05)).toBeCloseTo(21.42857, 5);
    // Density 1.1 is the assumed fat-free mass density, giving zero fat.
    expect(siriBodyFat(1.1)).toBeCloseTo(0, 10);
  });
});

describe('US Navy circumference method (Hodgdon & Beckett, 1984)', () => {
  it('matches worked examples for men', () => {
    expect(
      usNavyBodyFat({
        height: asCentimetres(180),
        neck: asCentimetres(38),
        waist: asCentimetres(85),
        sex: 'male',
      })
    ).toBeCloseTo(16.150806, 5);

    expect(
      usNavyBodyFat({
        height: asCentimetres(175),
        neck: asCentimetres(40),
        waist: asCentimetres(94),
        sex: 'male',
      })
    ).toBeCloseTo(22.19377, 5);
  });

  it('matches a worked example for women, which uses the hip measurement', () => {
    expect(
      usNavyBodyFat({
        height: asCentimetres(165),
        neck: asCentimetres(32),
        waist: asCentimetres(75),
        hip: asCentimetres(95),
        sex: 'female',
      })
    ).toBeCloseTo(27.714155, 5);
  });

  it('returns null for women when the hip measurement is missing', () => {
    // The female equation has no defined value without it; guessing would
    // silently produce a men's-equation answer under a women's label.
    expect(
      usNavyBodyFat({
        height: asCentimetres(165),
        neck: asCentimetres(32),
        waist: asCentimetres(75),
        sex: 'female',
      })
    ).toBeNull();
  });

  it('returns null rather than NaN when the girth difference is not positive', () => {
    // log10 of zero or a negative is not a real number. A neck measured wider
    // than the waist means the tape was misread, not that body fat is undefined.
    expect(
      usNavyBodyFat({
        height: asCentimetres(180),
        neck: asCentimetres(40),
        waist: asCentimetres(40),
        sex: 'male',
      })
    ).toBeNull();

    expect(
      usNavyBodyFat({
        height: asCentimetres(180),
        neck: asCentimetres(45),
        waist: asCentimetres(40),
        sex: 'male',
      })
    ).toBeNull();
  });

  it('increases with waist and decreases with neck, as the equation requires', () => {
    const base = {
      height: asCentimetres(180),
      neck: asCentimetres(38),
      waist: asCentimetres(85),
      sex: 'male' as const,
    };
    expect(usNavyBodyFat({ ...base, waist: asCentimetres(95) })!).toBeGreaterThan(
      usNavyBodyFat(base)!
    );
    expect(usNavyBodyFat({ ...base, neck: asCentimetres(42) })!).toBeLessThan(usNavyBodyFat(base)!);
  });
});

describe('Deurenberg BMI-based estimate (1991)', () => {
  it('matches worked examples', () => {
    // 80 kg, 180 cm => BMI 24.691358; 1.2(24.691358) + 0.23(30) - 10.8 - 5.4
    expect(deurenbergBodyFat(asKilograms(80), asCentimetres(180), asYears(30), 'male')).toBeCloseTo(
      20.32963,
      5
    );

    // 65 kg, 165 cm => BMI 23.875115; 1.2*23.875115 + 0.23*30 - 0 - 5.4
    expect(
      deurenbergBodyFat(asKilograms(65), asCentimetres(165), asYears(30), 'female')
    ).toBeCloseTo(30.150138, 5);

    expect(deurenbergBodyFat(asKilograms(70), asCentimetres(175), asYears(45), 'male')).toBeCloseTo(
      21.578571,
      5
    );
  });

  it('separates the sexes by exactly the published 10.8 coefficient', () => {
    const male = deurenbergBodyFat(asKilograms(70), asCentimetres(175), asYears(40), 'male');
    const female = deurenbergBodyFat(asKilograms(70), asCentimetres(175), asYears(40), 'female');
    expect(female - male).toBeCloseTo(10.8, 10);
  });

  it('rises with age at the published 0.23 per year', () => {
    const younger = deurenbergBodyFat(asKilograms(70), asCentimetres(175), asYears(30), 'male');
    const older = deurenbergBodyFat(asKilograms(70), asCentimetres(175), asYears(40), 'male');
    expect(older - younger).toBeCloseTo(2.3, 10);
  });
});

describe('Jackson-Pollock 3-site (1978, 1980)', () => {
  it('matches a worked example for men', () => {
    const skinfolds = {
      siteA: asMillimetres(12),
      siteB: asMillimetres(20),
      siteC: asMillimetres(15),
    };
    expect(jacksonPollock3SiteDensity(skinfolds, asYears(30), 'male')).toBeCloseTo(1.0663375, 7);
    expect(jacksonPollock3SiteBodyFat(skinfolds, asYears(30), 'male')).toBeCloseTo(14.205751, 5);
  });

  it('matches a worked example for women', () => {
    const skinfolds = {
      siteA: asMillimetres(18),
      siteB: asMillimetres(14),
      siteC: asMillimetres(22),
    };
    expect(jacksonPollock3SiteDensity(skinfolds, asYears(28), 'female')).toBeCloseTo(1.0486847, 7);
    expect(jacksonPollock3SiteBodyFat(skinfolds, asYears(28), 'female')).toBeCloseTo(22.019855, 5);
  });

  it('uses sex-specific coefficients, not a shared equation', () => {
    const skinfolds = {
      siteA: asMillimetres(15),
      siteB: asMillimetres(15),
      siteC: asMillimetres(15),
    };
    expect(jacksonPollock3SiteDensity(skinfolds, asYears(30), 'male')).not.toBeCloseTo(
      jacksonPollock3SiteDensity(skinfolds, asYears(30), 'female'),
      4
    );
  });
});

describe('Jackson-Pollock 7-site (1978, 1980)', () => {
  const sevenSites = {
    chest: asMillimetres(10),
    midaxillary: asMillimetres(12),
    triceps: asMillimetres(14),
    subscapular: asMillimetres(16),
    abdomen: asMillimetres(18),
    suprailiac: asMillimetres(15),
    thigh: asMillimetres(15),
  };

  it('matches a worked example for men, summing to 100 mm', () => {
    expect(jacksonPollock7SiteDensity(sevenSites, asYears(35), 'male')).toBeCloseTo(1.0639119, 7);
    expect(jacksonPollock7SiteBodyFat(sevenSites, asYears(35), 'male')).toBeCloseTo(15.264088, 5);
  });

  it('produces a higher fat estimate for women at the same skinfolds', () => {
    expect(jacksonPollock7SiteBodyFat(sevenSites, asYears(35), 'female')).toBeGreaterThan(
      jacksonPollock7SiteBodyFat(sevenSites, asYears(35), 'male')
    );
  });

  it('rises as skinfolds rise', () => {
    const thicker = { ...sevenSites, abdomen: asMillimetres(30) };
    expect(jacksonPollock7SiteBodyFat(thicker, asYears(35), 'male')).toBeGreaterThan(
      jacksonPollock7SiteBodyFat(sevenSites, asYears(35), 'male')
    );
  });
});

describe('mass partitioning', () => {
  it('splits total mass into fat and fat-free components', () => {
    expect(fatMass(asKilograms(80), 20)).toBeCloseTo(16, 10);
    expect(fatFreeMass(asKilograms(80), 20)).toBeCloseTo(64, 10);
  });

  it('always sums back to total mass', () => {
    for (const percent of [0, 5, 17.5, 30, 45]) {
      expect(fatMass(asKilograms(72), percent) + fatFreeMass(asKilograms(72), percent)).toBeCloseTo(
        72,
        10
      );
    }
  });
});
