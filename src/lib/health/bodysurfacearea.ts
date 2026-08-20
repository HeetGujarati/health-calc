/**
 * Body surface area.
 *
 * BSA is the one body measurement that is routinely *used* rather than merely
 * reported: chemotherapy doses, cardiac index and burn assessment are all
 * expressed per square metre. That matters for how this module is written —
 * every formula here is the published one, unmodified, and none of them is
 * presented as the correct answer.
 *
 * None of these equations measures anything. Body surface area was measured
 * directly, on very small samples, and each formula is a curve fitted to one of
 * those samples. Du Bois and Du Bois fitted nine subjects, one of them a child
 * with rickets. Boyd fitted 411, which is why it is the most defensible for
 * children and the least convenient to compute. The spread between formulas on
 * the same person is real and is roughly 5%, which is why the page shows all of
 * them rather than picking one and hiding the disagreement.
 *
 * Sources are given in full in FORMULAS.md. Every equation takes height in
 * centimetres and mass in kilograms and returns square metres, so the callers
 * never have to remember which one wanted grams.
 */
import type { Centimetres, Kilograms } from './units';

/** Square metres. Not a branded unit elsewhere in the library, so declared here. */
export type SquareMetres = number;

export type BsaFormula = 'du_bois' | 'mosteller' | 'haycock' | 'gehan_george' | 'boyd';

/**
 * Du Bois & Du Bois, 1916. The original, and still the clinical default.
 *
 * BSA = 0.007184 × W^0.425 × H^0.725
 *
 * Fitted to nine subjects. It is known to under-read for the obese, because no
 * one in that sample was, and it is the formula most published reference data
 * is expressed against — which is the actual reason it remains the default.
 */
export const duBoisBsa = (heightCm: Centimetres, massKg: Kilograms): SquareMetres =>
  0.007184 * Math.pow(massKg, 0.425) * Math.pow(heightCm, 0.725);

/**
 * Mosteller, 1987. The one people can do in their head.
 *
 * BSA = √(H × W / 3600)
 *
 * Proposed as a simplification rather than a new fit, and it tracks Du Bois
 * closely enough through the adult range that the simplification costs nothing.
 * Its transparency is a safety property in its own right: a dosing error is
 * easier to catch in an equation you can check on paper.
 */
export const mostellerBsa = (heightCm: Centimetres, massKg: Kilograms): SquareMetres =>
  Math.sqrt((heightCm * massKg) / 3600);

/**
 * Haycock, Schwartz & Wisotsky, 1978.
 *
 * BSA = 0.024265 × H^0.3964 × W^0.5378
 *
 * Fitted across infants through adults, so it is the one that does not fall
 * apart at small body sizes. Paediatric practice generally prefers this or Boyd.
 */
export const haycockBsa = (heightCm: Centimetres, massKg: Kilograms): SquareMetres =>
  0.024265 * Math.pow(heightCm, 0.3964) * Math.pow(massKg, 0.5378);

/**
 * Gehan & George, 1970.
 *
 * BSA = 0.0235 × H^0.42246 × W^0.51456
 *
 * Refitted against 401 direct measurements, the largest set available at the
 * time, and derived specifically for chemotherapy dosing.
 */
export const gehanGeorgeBsa = (heightCm: Centimetres, massKg: Kilograms): SquareMetres =>
  0.0235 * Math.pow(heightCm, 0.42246) * Math.pow(massKg, 0.51456);

/**
 * Boyd, 1935.
 *
 * BSA = 0.0003207 × H^0.3 × Wg^(0.7285 − 0.0188 × log₁₀ Wg)
 *
 * The exponent on mass is itself a function of mass, which is what lets one
 * curve span a newborn and an adult. Mass enters in **grams**, not kilograms —
 * a detail that is easy to get wrong and produces a plausible-looking number
 * when you do, so the conversion happens here and nowhere else.
 */
export const boydBsa = (heightCm: Centimetres, massKg: Kilograms): SquareMetres => {
  const grams = massKg * 1000;
  const exponent = 0.7285 - 0.0188 * Math.log10(grams);
  return 0.0003207 * Math.pow(heightCm, 0.3) * Math.pow(grams, exponent);
};

const FORMULAS: Record<BsaFormula, (h: Centimetres, m: Kilograms) => SquareMetres> = {
  du_bois: duBoisBsa,
  mosteller: mostellerBsa,
  haycock: haycockBsa,
  gehan_george: gehanGeorgeBsa,
  boyd: boydBsa,
};

export const bodySurfaceArea = (
  formula: BsaFormula,
  heightCm: Centimetres,
  massKg: Kilograms
): SquareMetres => FORMULAS[formula](heightCm, massKg);

export interface BsaEstimate {
  readonly formula: BsaFormula;
  readonly squareMetres: SquareMetres;
}

/** Every formula, in the order the page lists them. */
export const allBsaEstimates = (heightCm: Centimetres, massKg: Kilograms): readonly BsaEstimate[] =>
  (Object.keys(FORMULAS) as BsaFormula[]).map((formula) => ({
    formula,
    squareMetres: FORMULAS[formula](heightCm, massKg),
  }));

/**
 * How far apart the formulas are for this person, as a share of the median.
 *
 * Reported on the page because the disagreement is the honest headline: a
 * single BSA figure to three decimal places implies a precision that the
 * underlying measurements never had.
 */
export const bsaSpread = (estimates: readonly BsaEstimate[]): number => {
  const values = estimates.map((estimate) => estimate.squareMetres).sort((a, b) => a - b);
  const lowest = values[0];
  const highest = values[values.length - 1];
  if (lowest === undefined || highest === undefined || values.length === 0) return 0;

  const middle = Math.floor(values.length / 2);
  const median =
    values.length % 2 === 0
      ? ((values[middle - 1] ?? 0) + (values[middle] ?? 0)) / 2
      : (values[middle] ?? 0);
  if (median === 0) return 0;

  return (highest - lowest) / median;
};
