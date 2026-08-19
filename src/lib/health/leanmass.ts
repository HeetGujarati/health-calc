import type { Centimetres, Kilograms } from './units';
import type { Sex } from './validation';

/**
 * Lean body mass predicted from height, weight and sex.
 *
 * All three equations predict lean mass from stature alone, so none of them
 * responds to training status: two people of identical height and weight get
 * identical answers regardless of body composition. When body fat percentage is
 * actually known, `fatFreeMass` in bodyfat.ts is the better number, and the
 * pages say so.
 *
 * Sources:
 * - Boer P. "Estimated lean body mass as an index for normalization of body
 *   fluid volumes in humans." American Journal of Physiology 247(4 Pt 2), 1984,
 *   pp. F632-F636.
 * - James WPT. "Research on Obesity: a report of the DHSS/MRC group." Her
 *   Majesty's Stationery Office, London, 1976.
 * - Hume R. "Prediction of lean body mass from height and weight." Journal of
 *   Clinical Pathology 19(4), 1966, pp. 389-391.
 *
 * Default is Boer: it was derived for normalising body fluid volumes and
 * performs most consistently across the range of body sizes this site sees.
 */

export const LEAN_MASS_FORMULAS = ['boer', 'james', 'hume'] as const;
export type LeanMassFormula = (typeof LEAN_MASS_FORMULAS)[number];
export const DEFAULT_LEAN_MASS_FORMULA: LeanMassFormula = 'boer';

/**
 * Boer (1984). Mass in kg, height in cm.
 *
 *   men:   0.407W + 0.267H - 19.2
 *   women: 0.252W + 0.473H - 48.3
 */
export const boerLeanBodyMass = (mass: Kilograms, height: Centimetres, sex: Sex): number =>
  sex === 'male' ? 0.407 * mass + 0.267 * height - 19.2 : 0.252 * mass + 0.473 * height - 48.3;

/**
 * James (1976). Mass in kg, height in cm.
 *
 *   men:   1.10W - 128 (W/H)^2
 *   women: 1.07W - 148 (W/H)^2
 *
 * The squared weight-to-height term means this equation turns over at high body
 * masses — past roughly 150 kg it begins predicting *less* lean mass for more
 * total mass, which is not physiologically meaningful. Callers should prefer
 * Boer outside the normal range; the comparison table notes this.
 */
export const jamesLeanBodyMass = (mass: Kilograms, height: Centimetres, sex: Sex): number => {
  const ratio = mass / height;
  return sex === 'male' ? 1.1 * mass - 128 * ratio * ratio : 1.07 * mass - 148 * ratio * ratio;
};

/**
 * Hume (1966). Mass in kg, height in cm.
 *
 *   men:   0.32810W + 0.33929H - 29.5336
 *   women: 0.29569W + 0.41813H - 43.2933
 */
export const humeLeanBodyMass = (mass: Kilograms, height: Centimetres, sex: Sex): number =>
  sex === 'male'
    ? 0.3281 * mass + 0.33929 * height - 29.5336
    : 0.29569 * mass + 0.41813 * height - 43.2933;

export const leanBodyMass = (
  mass: Kilograms,
  height: Centimetres,
  sex: Sex,
  formula: LeanMassFormula
): number => {
  switch (formula) {
    case 'boer':
      return boerLeanBodyMass(mass, height, sex);
    case 'james':
      return jamesLeanBodyMass(mass, height, sex);
    case 'hume':
      return humeLeanBodyMass(mass, height, sex);
  }
};

export const allLeanMassEstimates = (
  mass: Kilograms,
  height: Centimetres,
  sex: Sex
): Record<LeanMassFormula, number> => ({
  boer: boerLeanBodyMass(mass, height, sex),
  james: jamesLeanBodyMass(mass, height, sex),
  hume: humeLeanBodyMass(mass, height, sex),
});
