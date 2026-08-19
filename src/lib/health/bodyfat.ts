import { bodyMassIndex } from './bmi';
import {
  centimetresToInches,
  type Centimetres,
  type Kilograms,
  type Millimetres,
  type Years,
} from './units';
import type { Sex } from './validation';

/**
 * Body fat percentage estimation.
 *
 * Four methods, in descending order of how much they actually measure:
 *
 * 1. Jackson-Pollock 7-site skinfold — samples fat at seven sites. Most
 *    accurate of the four, and the most dependent on caliper technique.
 * 2. Jackson-Pollock 3-site skinfold — same model, three sites. Slightly less
 *    accurate, considerably more practical.
 * 3. US Navy circumference — needs only a tape measure. Typical error 3-4
 *    percentage points against hydrostatic weighing.
 * 4. Deurenberg BMI-based — needs no measurement beyond height, weight and age,
 *    and correspondingly infers rather than measures. Included because it is
 *    widely cited, with its limitations stated plainly.
 *
 * The default is the US Navy method: it is the best accuracy available to
 * someone holding only a tape measure, which is most people.
 *
 * Sources:
 * - Hodgdon JA, Beckett MB. "Prediction of percent body fat for U.S. Navy men
 *   from body circumferences and height", Report No. 84-11, and the companion
 *   report for women, No. 84-29. Naval Health Research Center, San Diego, 1984.
 * - Deurenberg P, Weststrate JA, Seidell JC. "Body mass index as a measure of
 *   body fatness: age- and sex-specific prediction formulas." British Journal of
 *   Nutrition 65(2), 1991, pp. 105-114.
 * - Jackson AS, Pollock ML. "Generalized equations for predicting body density
 *   of men." British Journal of Nutrition 40(3), 1978, pp. 497-504.
 * - Jackson AS, Pollock ML, Ward A. "Generalized equations for predicting body
 *   density of women." Medicine and Science in Sports and Exercise 12(3), 1980,
 *   pp. 175-181.
 * - Siri WE. "Body composition from fluid spaces and density: analysis of
 *   methods." In: Techniques for Measuring Body Composition. National Academy
 *   of Sciences, Washington DC, 1961, pp. 223-244.
 */

export const BODY_FAT_METHODS = [
  'us_navy',
  'deurenberg',
  'jackson_pollock_3',
  'jackson_pollock_7',
] as const;

export type BodyFatMethod = (typeof BODY_FAT_METHODS)[number];

export const DEFAULT_BODY_FAT_METHOD: BodyFatMethod = 'us_navy';

/**
 * Siri equation: converts body density to fat percentage.
 *
 * Assumes fat mass has a density of 0.900 g/cm3 and fat-free mass 1.100 g/cm3.
 * Those constants were derived from a small, young, white reference population,
 * which is the main reason skinfold estimates drift for other groups.
 */
export const siriBodyFat = (bodyDensity: number): number => 495 / bodyDensity - 450;

/**
 * US Navy circumference method (Hodgdon & Beckett, 1984).
 *
 * Published in inches, so metric inputs are converted rather than the
 * coefficients being rewritten.
 *
 *   men:   86.010 x log10(waist - neck) - 70.041 x log10(height) + 36.76
 *   women: 163.205 x log10(waist + hip - neck) - 97.684 x log10(height) - 78.387
 *
 * Returns null when the circumference difference is not positive: log10 of zero
 * or a negative number is not a real value, and a neck measured larger than the
 * waist means the measurements are wrong, not that body fat is undefined.
 */
export const usNavyBodyFat = (input: {
  readonly height: Centimetres;
  readonly neck: Centimetres;
  readonly waist: Centimetres;
  readonly hip?: Centimetres;
  readonly sex: Sex;
}): number | null => {
  const heightIn = centimetresToInches(input.height);
  const neckIn = centimetresToInches(input.neck);
  const waistIn = centimetresToInches(input.waist);

  if (input.sex === 'male') {
    const girth = waistIn - neckIn;
    if (girth <= 0) return null;
    return 86.01 * Math.log10(girth) - 70.041 * Math.log10(heightIn) + 36.76;
  }

  if (input.hip === undefined) return null;
  const hipIn = centimetresToInches(input.hip);
  const girth = waistIn + hipIn - neckIn;
  if (girth <= 0) return null;
  return 163.205 * Math.log10(girth) - 97.684 * Math.log10(heightIn) - 78.387;
};

/**
 * Deurenberg BMI-based estimate (1991).
 *
 *   %BF = 1.20 x BMI + 0.23 x age - 10.8 x sex - 5.4      (sex: male 1, female 0)
 *
 * Inherits every limitation of BMI, because BMI is its only body input: it
 * cannot distinguish muscle from fat, so it over-reads for muscular people.
 */
export const deurenbergBodyFat = (
  mass: Kilograms,
  height: Centimetres,
  age: Years,
  sex: Sex
): number => {
  const bmi = bodyMassIndex(mass, height);
  return 1.2 * bmi + 0.23 * age - 10.8 * (sex === 'male' ? 1 : 0) - 5.4;
};

/** The three sites Jackson-Pollock 3 uses, which differ by sex. */
export interface ThreeSiteSkinfolds {
  /** Men: chest. Women: triceps. */
  readonly siteA: Millimetres;
  /** Men: abdomen. Women: suprailiac. */
  readonly siteB: Millimetres;
  /** Both: thigh. */
  readonly siteC: Millimetres;
}

/**
 * Jackson-Pollock 3-site.
 *
 *   men:   BD = 1.10938 - 0.0008267 S + 0.0000016 S^2 - 0.0002574 age
 *   women: BD = 1.0994921 - 0.0009929 S + 0.0000023 S^2 - 0.0001392 age
 *
 * S is the sum of the three skinfolds in millimetres. Body density is then
 * converted with Siri.
 */
export const jacksonPollock3SiteDensity = (
  skinfolds: ThreeSiteSkinfolds,
  age: Years,
  sex: Sex
): number => {
  const sum = skinfolds.siteA + skinfolds.siteB + skinfolds.siteC;
  return sex === 'male'
    ? 1.10938 - 0.0008267 * sum + 0.0000016 * sum * sum - 0.0002574 * age
    : 1.0994921 - 0.0009929 * sum + 0.0000023 * sum * sum - 0.0001392 * age;
};

export const jacksonPollock3SiteBodyFat = (
  skinfolds: ThreeSiteSkinfolds,
  age: Years,
  sex: Sex
): number => siriBodyFat(jacksonPollock3SiteDensity(skinfolds, age, sex));

/** The seven sites Jackson-Pollock 7 uses, identical for both sexes. */
export interface SevenSiteSkinfolds {
  readonly chest: Millimetres;
  readonly midaxillary: Millimetres;
  readonly triceps: Millimetres;
  readonly subscapular: Millimetres;
  readonly abdomen: Millimetres;
  readonly suprailiac: Millimetres;
  readonly thigh: Millimetres;
}

/**
 * Jackson-Pollock 7-site.
 *
 *   men:   BD = 1.112 - 0.00043499 S + 0.00000055 S^2 - 0.00028826 age
 *   women: BD = 1.097 - 0.00046971 S + 0.00000056 S^2 - 0.00012828 age
 */
export const jacksonPollock7SiteDensity = (
  skinfolds: SevenSiteSkinfolds,
  age: Years,
  sex: Sex
): number => {
  const sum =
    skinfolds.chest +
    skinfolds.midaxillary +
    skinfolds.triceps +
    skinfolds.subscapular +
    skinfolds.abdomen +
    skinfolds.suprailiac +
    skinfolds.thigh;
  return sex === 'male'
    ? 1.112 - 0.00043499 * sum + 0.00000055 * sum * sum - 0.00028826 * age
    : 1.097 - 0.00046971 * sum + 0.00000056 * sum * sum - 0.00012828 * age;
};

export const jacksonPollock7SiteBodyFat = (
  skinfolds: SevenSiteSkinfolds,
  age: Years,
  sex: Sex
): number => siriBodyFat(jacksonPollock7SiteDensity(skinfolds, age, sex));

/**
 * Fat mass and fat-free mass implied by a body fat percentage.
 *
 * Kept here rather than in leanmass.ts because this is measurement-derived,
 * whereas that module holds the equations that predict lean mass from height
 * and weight alone.
 */
export const fatMass = (mass: Kilograms, bodyFatPercent: number): number =>
  mass * (bodyFatPercent / 100);

export const fatFreeMass = (mass: Kilograms, bodyFatPercent: number): number =>
  mass * (1 - bodyFatPercent / 100);
