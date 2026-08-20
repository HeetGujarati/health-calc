import type { CalculatorDefinition, InputField } from '../types';
import { REVIEWED, heightInput, steps, weightInput } from './fields';
import { bodySurfaceAreaTable } from '../referenceTables';

/**
 * Clinical reference calculators.
 *
 * These reproduce equations that are used in dosing and clinical scoring. The
 * editorial line is the same as everywhere else on the site — show the formula,
 * cite it, say what it assumes — but the accuracy notes carry more weight here,
 * because a reader may be checking arithmetic that matters. Where the published
 * equations disagree, the page shows all of them rather than choosing one.
 */

const bsaFormulaInput: InputField = {
  name: 'formula',
  label: 'Formula',
  hint: 'Du Bois is the clinical default and the one most reference data is expressed against. All five are shown whichever you pick.',
  type: 'select',
  defaultValue: 'du_bois',
  options: [
    { value: 'du_bois', label: 'Du Bois & Du Bois (1916)' },
    { value: 'mosteller', label: 'Mosteller (1987)' },
    { value: 'haycock', label: 'Haycock (1978)' },
    { value: 'gehan_george', label: 'Gehan & George (1970)' },
    { value: 'boyd', label: 'Boyd (1935)' },
  ],
};

export const bodySurfaceArea: CalculatorDefinition = {
  slug: 'body-surface-area',
  category: 'clinical',
  heading: 'Body surface area calculator',
  metaTitle: 'Body surface area calculator — five formulas',
  description:
    'Work out body surface area in square metres from height and weight using Du Bois, Mosteller, Haycock, Gehan-George and Boyd, with the disagreement between them shown rather than hidden.',
  keywords: [
    'body surface area calculator',
    'bsa calculator',
    'du bois formula',
    'mosteller formula',
  ],
  applicationSubCategory: 'Clinical reference',
  intro:
    'Enter your height and weight to get body surface area in square metres. Five published formulas are shown together, because they disagree by a few per cent and choosing one silently would hide that.',
  inputs: [heightInput, weightInput, bsaFormulaInput],
  formulas: [
    {
      id: 'du_bois',
      name: 'Du Bois & Du Bois',
      expression: ['BSA (m²) = 0.007184 × mass (kg)^0.425 × height (cm)^0.725'],
      source:
        'Du Bois D., Du Bois E.F., "A formula to estimate the approximate surface area if height and weight be known", Archives of Internal Medicine 17(6), 1916, pp. 863–871.',
      year: 1916,
      assumes:
        'That the relationship fitted to nine directly measured subjects generalises. One of the nine was a child with rickets, and none was obese.',
      accuracy:
        'The clinical default, and the equation most published reference data is expressed against — which is the practical reason to keep using it. It is known to under-read in obesity, by around 5% at the high end of body mass, because that range is outside the sample it was fitted to.',
      isDefault: true,
    },
    {
      id: 'mosteller',
      name: 'Mosteller',
      expression: ['BSA (m²) = √(height (cm) × mass (kg) / 3600)'],
      source:
        'Mosteller R.D., "Simplified calculation of body-surface area", New England Journal of Medicine 317(17), 1987, p. 1098.',
      year: 1987,
      assumes:
        'The same relationship as Du Bois, deliberately simplified rather than refitted to new measurements.',
      accuracy:
        'Tracks Du Bois within about 2% across the adult range, so the simplification costs almost nothing. Being checkable on paper is a safety property in itself: an arithmetic slip in a dose calculation is easier to catch in this equation than in any of the others.',
    },
    {
      id: 'haycock',
      name: 'Haycock, Schwartz & Wisotsky',
      expression: ['BSA (m²) = 0.024265 × height (cm)^0.3964 × mass (kg)^0.5378'],
      source:
        'Haycock G.B., Schwartz G.J., Wisotsky D.H., "Geometric method for measuring body surface area", The Journal of Pediatrics 93(1), 1978, pp. 62–66.',
      year: 1978,
      assumes: 'One curve can span infants through adults.',
      accuracy:
        'Fitted across a range of body sizes that included infants, so it holds up at small body sizes where Du Bois does not. Commonly preferred in paediatric practice alongside Boyd.',
    },
    {
      id: 'gehan_george',
      name: 'Gehan & George',
      expression: ['BSA (m²) = 0.0235 × height (cm)^0.42246 × mass (kg)^0.51456'],
      source:
        'Gehan E.A., George S.L., "Estimation of human body surface area from height and weight", Cancer Chemotherapy Reports 54(4), 1970, pp. 225–235.',
      year: 1970,
      assumes: 'That a refit to a larger sample improves on the 1916 coefficients.',
      accuracy:
        'Derived from 401 direct measurements, far more than Du Bois had, and specifically for chemotherapy dosing. The larger sample is a genuine argument for it, and it remains less widely adopted than the equation it was meant to replace.',
    },
    {
      id: 'boyd',
      name: 'Boyd',
      expression: [
        'BSA (m²) = 0.0003207 × height (cm)^0.3 × mass (g)^(0.7285 − 0.0188 × log₁₀ mass (g))',
        'Mass enters in grams, not kilograms.',
      ],
      source:
        'Boyd E., "The Growth of the Surface Area of the Human Body", University of Minnesota Press, 1935.',
      year: 1935,
      assumes:
        'That the exponent on mass itself varies with mass, which is what lets a single curve cover a newborn and an adult.',
      accuracy:
        'Fitted to 411 measurements, the largest of these samples, and the most defensible across the full range of body sizes. The cost is that it cannot be done in your head, and the grams-not-kilograms detail is an easy mistake that produces a plausible-looking wrong answer.',
    },
  ],
  howToSteps: steps(
    'your height and weight, then pick a formula if you need a specific one',
    'body surface area in square metres for the formula you chose, the other four for comparison, and how far apart they are'
  ),
  faq: [
    {
      question: 'Which body surface area formula should I use?',
      answer:
        'Du Bois unless something specific tells you otherwise, because it is what most published reference ranges assume. Use Mosteller when the calculation needs to be checkable by hand, and Haycock or Boyd for children. What matters more than the choice is using the same formula consistently, since switching between them shifts the answer by a few per cent on its own.',
    },
    {
      question: 'Why do the five formulas give different answers?',
      answer:
        'Each is a curve fitted to a different set of directly measured people, and those sets were small — nine subjects for Du Bois, 401 for Gehan-George, 411 for Boyd. None of the equations measures surface area. They interpolate between measurements taken decades ago on populations that do not match everyone the formulas are now applied to.',
    },
    {
      question: 'What is body surface area used for?',
      answer:
        'Chemotherapy dosing is the most common use, along with cardiac index, burn assessment and some renal measures. It is preferred over body weight for these because it tracks metabolic rate and blood volume more closely than mass alone does.',
    },
    {
      question: 'Is a higher or lower body surface area better?',
      answer:
        'Neither. It is a measure of body size, not of health, and there is no target value. A tall person has more surface area than a short one and nothing follows from that.',
    },
    {
      question: 'Does this calculator work for children?',
      answer:
        'The Haycock and Boyd equations were fitted across infants through adults and are the ones normally used in paediatrics. Du Bois was not, and it is less reliable at small body sizes. This page reproduces published equations; it is not a dosing tool and should not be used as one.',
    },
  ],
  referenceTable: bodySurfaceAreaTable(),
  relatedCalculators: [
    'bmi',
    'healthy-weight-range',
    'lean-body-mass',
    'body-fat',
    'ideal-weight',
    'bmr',
  ],
  relatedGuides: ['why-bmi-is-a-screening-tool', 'body-fat-methods-compared'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};
