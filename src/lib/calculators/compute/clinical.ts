import {
  allBsaEstimates,
  bodySurfaceArea,
  bsaSpread,
  type BsaFormula,
} from '../../health/bodysurfacearea';
import { formatNumber } from '../../health/rounding';
import { readChoice, readHeight, readMass } from '../inputs';
import { failure, type CalculatorResult, type FormValues, type ResultNote } from '../result';

/**
 * Clinical reference calculators.
 *
 * These produce numbers that are used in dosing and in clinical scoring
 * elsewhere, which sets a different bar from the fitness calculators: the page
 * has to be explicit that it is reproducing a published equation, not advising
 * anyone. The guard against misuse is honesty about the spread rather than a
 * refusal to compute — a clinician checking an arithmetic result is a real and
 * legitimate use, and hiding the number serves nobody.
 */

const BSA_FORMULA_LABELS: Record<BsaFormula, string> = {
  du_bois: 'Du Bois & Du Bois',
  mosteller: 'Mosteller',
  haycock: 'Haycock',
  gehan_george: 'Gehan & George',
  boyd: 'Boyd',
};

const BSA_FORMULAS = new Set<string>(Object.keys(BSA_FORMULA_LABELS));

const isBsaFormula = (value: string): value is BsaFormula => BSA_FORMULAS.has(value);

export const computeBodySurfaceArea = (values: FormValues, locale: string): CalculatorResult => {
  const height = readHeight(values);
  if (!height.ok) return failure(height.error);
  const mass = readMass(values);
  if (!mass.ok) return failure(mass.error);

  const selected = readChoice(values, 'formula', 'du_bois');
  const formula: BsaFormula = isBsaFormula(selected) ? selected : 'du_bois';

  const area = bodySurfaceArea(formula, height.value, mass.value);
  const estimates = allBsaEstimates(height.value, mass.value);
  const spread = bsaSpread(estimates);

  const notes: ResultNote[] = [
    {
      tone: 'info',
      text: `The five published formulas span ${formatNumber(spread * 100, locale, 'percentage')}% for these measurements. None of them measures surface area; each is a curve fitted to a small sample of direct measurements, so the disagreement is the honest margin.`,
    },
  ];

  return {
    ok: true,
    primary: {
      label: `Body surface area (${BSA_FORMULA_LABELS[formula]})`,
      value: formatNumber(area, locale, 'bodySurfaceArea'),
      unit: 'm²',
    },
    summary: `Using ${BSA_FORMULA_LABELS[formula]}, your body surface area is ${formatNumber(area, locale, 'bodySurfaceArea')} m².`,
    secondary: estimates
      .filter((estimate) => estimate.formula !== formula)
      .map((estimate) => ({
        label: BSA_FORMULA_LABELS[estimate.formula],
        value: formatNumber(estimate.squareMetres, locale, 'bodySurfaceArea'),
        unit: 'm²',
      })),
    notes,
  };
};
