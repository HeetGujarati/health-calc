import { describe, expect, it } from 'vitest';
import {
  BMI_PRIME_REFERENCE,
  HEALTHY_BMI_MAX,
  HEALTHY_BMI_MIN,
  bmiCategory,
  bmiPrime,
  bodyMassIndex,
  healthyWeightRange,
  ponderalIndex,
  weightForBmi,
} from './bmi';
import { asCentimetres, asKilograms } from './units';

/**
 * Worked examples computed from the defining equation, BMI = kg / m^2
 * (Quetelet 1835; named by Keys et al. 1972). Category boundaries are the WHO
 * adult cut-points, WHO Technical Report Series 894, 2000.
 */
describe('body mass index', () => {
  it('matches worked examples', () => {
    // 70 kg at 1.75 m: 70 / 3.0625
    expect(bodyMassIndex(asKilograms(70), asCentimetres(175))).toBeCloseTo(22.857143, 6);
    // 100 kg at 1.80 m: 100 / 3.24
    expect(bodyMassIndex(asKilograms(100), asCentimetres(180))).toBeCloseTo(30.864198, 6);
    // 50 kg at 1.60 m: 50 / 2.56
    expect(bodyMassIndex(asKilograms(50), asCentimetres(160))).toBeCloseTo(19.53125, 6);
  });

  it('computes BMI Prime relative to the upper healthy bound', () => {
    expect(BMI_PRIME_REFERENCE).toBe(25);
    expect(bmiPrime(25)).toBe(1);
    expect(bmiPrime(22.857143)).toBeCloseTo(0.914286, 6);
    expect(bmiPrime(30)).toBeCloseTo(1.2, 10);
  });

  it('computes the ponderal index as mass over height cubed', () => {
    // 70 / 1.75^3 = 70 / 5.359375
    expect(ponderalIndex(asKilograms(70), asCentimetres(175))).toBeCloseTo(13.0612245, 6);
    // 100 / 1.80^3 = 100 / 5.832
    expect(ponderalIndex(asKilograms(100), asCentimetres(180))).toBeCloseTo(17.1467764, 6);
    // 50 / 1.60^3 = 50 / 4.096
    expect(ponderalIndex(asKilograms(50), asCentimetres(160))).toBeCloseTo(12.20703125, 6);
  });
});

describe('WHO category boundaries', () => {
  it('classifies values inside each band', () => {
    expect(bmiCategory(17)).toBe('underweight');
    expect(bmiCategory(22)).toBe('healthy_weight');
    expect(bmiCategory(27)).toBe('overweight');
    expect(bmiCategory(32)).toBe('obesity_class_1');
    expect(bmiCategory(37)).toBe('obesity_class_2');
    expect(bmiCategory(45)).toBe('obesity_class_3');
  });

  it('treats each boundary as the inclusive start of the higher band', () => {
    expect(bmiCategory(18.5)).toBe('healthy_weight');
    expect(bmiCategory(25)).toBe('overweight');
    expect(bmiCategory(30)).toBe('obesity_class_1');
    expect(bmiCategory(35)).toBe('obesity_class_2');
    expect(bmiCategory(40)).toBe('obesity_class_3');
  });

  it('keeps 24.95 in the healthy band', () => {
    // The "18.5-24.9" shorthand seen in summaries would misclassify this.
    // The real upper bound is 25.0 exclusive.
    expect(bmiCategory(24.95)).toBe('healthy_weight');
    expect(bmiCategory(24.999)).toBe('healthy_weight');
  });

  it('keeps 18.49 below the healthy band', () => {
    expect(bmiCategory(18.49)).toBe('underweight');
  });
});

describe('healthy weight range', () => {
  it('derives the range from the same constants the guard uses', () => {
    expect(HEALTHY_BMI_MIN).toBe(18.5);
    expect(HEALTHY_BMI_MAX).toBe(25);

    // At 1.75 m: 18.5 * 3.0625 and 25 * 3.0625
    const range = healthyWeightRange(asCentimetres(175));
    expect(range.minKg).toBeCloseTo(56.65625, 6);
    expect(range.maxKg).toBeCloseTo(76.5625, 6);
  });

  it('round-trips against weightForBmi', () => {
    const height = asCentimetres(168);
    const range = healthyWeightRange(height);
    expect(bodyMassIndex(asKilograms(range.minKg), height)).toBeCloseTo(18.5, 10);
    expect(bodyMassIndex(asKilograms(range.maxKg), height)).toBeCloseTo(25, 10);
    expect(weightForBmi(22, height)).toBeCloseTo(62.0928, 4);
  });
});
