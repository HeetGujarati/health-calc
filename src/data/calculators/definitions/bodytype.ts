import type { CalculatorDefinition, InputField } from '../types';
import { REVIEWED, heightInput, sexInput, steps, weightInput } from './fields';
import { bodyTypeTable } from '../referenceTables';

/**
 * Body type.
 *
 * The hardest page on the site to write honestly, because the thing people
 * search for does not exist in the form they expect. Somatotype came from
 * William Sheldon's constitutional psychology, which claimed physique predicted
 * temperament and criminality and was discredited; what survives in sports
 * science is Heath-Carter, which needs calipers at four skinfold sites, two bone
 * breadths and two girths, and cannot be done from a web form.
 *
 * So the page gives frame size from the height-to-wrist ratio — a real,
 * published measure — reports the familiar label second as the loose
 * description it is, and says what it does not predict. The alternative was to
 * refuse the page or to imply a measurement it cannot make.
 */

const wristInput: InputField = {
  name: 'wrist',
  label: 'Wrist circumference',
  hint: 'Measure around the wrist at its narrowest point, just below the bone that sticks out.',
  type: 'number',
  min: 10,
  max: 30,
  step: 0.1,
  unit: { metric: 'cm', imperial: 'in' },
};

export const bodyType: CalculatorDefinition = {
  slug: 'body-type',
  category: 'body-composition',
  heading: 'Body type calculator',
  metaTitle: 'Body type calculator — frame size',
  description:
    'Work out your frame size from height and wrist circumference, see which of the three body type labels fits closest, and read a straight account of what the labels do and do not mean.',
  keywords: [
    'body type calculator',
    'frame size calculator',
    'somatotype',
    'ectomorph mesomorph endomorph',
  ],
  applicationSubCategory: 'Body composition',
  intro:
    'Enter your height, weight and wrist measurement to get your frame size and the closest of the three familiar body type labels. Frame size is a measurement; the label is a description, and it predicts less than you have probably been told.',
  inputs: [heightInput, weightInput, wristInput, sexInput],
  formulas: [
    {
      id: 'frame-size',
      name: 'Frame size from height and wrist',
      expression: [
        'ratio = height (cm) / wrist circumference (cm)',
        'Male: small above 10.4, large below 9.6',
        'Female: small above 11.0, large below 10.1',
      ],
      source:
        'Height-to-wrist cut-points as reproduced in Grant J.P., "Handbook of Total Parenteral Nutrition", 2nd ed., 1992, derived from the Metropolitan Life frame-size tables.',
      year: 1992,
      assumes:
        'That wrist circumference stands in for skeletal build, and that the cut-points derived from a mid-century North American insurance population apply to you.',
      accuracy:
        'The wrist carries little muscle and almost no fat, so it is a reasonable proxy for skeletal size and changes little with weight. The cut-points are the weak part: they come from insurance-company reference tables rather than a modern population study, and the sex split reflects those reference groups rather than a difference in how skeletons scale. Treat the boundaries as approximate.',
      isDefault: true,
    },
    {
      id: 'build-label',
      name: 'Body type label',
      expression: [
        'Small frame with BMI below 20 → ectomorph',
        'Large frame with BMI 27 or above → endomorph',
        'Everything else → mesomorph',
      ],
      source:
        'Descriptive only. The three names are from Sheldon W.H., "The Varieties of Human Physique", 1940. The measurement method that survives in sports science is Heath B., Carter J.E.L., "A modified somatotype method", American Journal of Physical Anthropology 27(1), 1967, pp. 57–74, which this page does not implement.',
      year: 1967,
      assumes:
        'That two numbers — frame size and BMI — can stand in for a scheme originally built from photographs and, later, from seven anthropometric measurements.',
      accuracy:
        'Weak, and the page says so rather than dressing it up. This is not a Heath-Carter somatotype: that needs skinfold calipers at four sites, two bone breadths and two limb girths, and cannot be obtained from height, weight and a wrist. Most people come out mesomorph, which is a sign the three categories are too few rather than a finding about the population. Sheldon’s original claim — that physique predicts temperament — was discredited and is not repeated here.',
    },
  ],
  howToSteps: steps(
    'your height, weight and the circumference of your wrist at its narrowest point',
    'your frame size, the closest body type label, and the ratio and BMI behind both'
  ),
  faq: [
    {
      question: 'What is my body type actually telling me?',
      answer:
        'That your skeleton is slight, average or broad for your height, and roughly how much mass you carry on it. That is the whole of it. It does not tell you your metabolic rate, which foods suit you, how you respond to training, or anything about your character. The claim that physique predicts temperament came from Sheldon in the 1940s and was discredited.',
    },
    {
      question: 'Why does the calculator ask for my wrist?',
      answer:
        'Because it carries almost no muscle and very little fat, so its circumference tracks skeletal size and barely changes as weight does. That makes it one of the few measurements on the body that says something about frame rather than about current condition.',
    },
    {
      question: 'Is this a real somatotype?',
      answer:
        'No. A somatotype in the sense sports science uses it is the Heath-Carter method, which requires skinfold calipers at four sites, two bone breadths and two limb girths, and produces three ratings rather than one label. No calculator that asks only for height, weight and a wrist can produce one, and pages claiming otherwise are overstating what they have.',
    },
    {
      question: 'Should I train or eat differently for my body type?',
      answer:
        'There is no good evidence for body-type-specific training or diet, despite how commonly it is sold. What responds to training is training; what changes body composition is total energy intake and protein, both of which are set by your size and activity rather than by a category name. The calorie and macro calculators on this site work from those directly.',
    },
    {
      question: 'Why did I get mesomorph?',
      answer:
        'Most people do, because it is what the scheme returns whenever frame size and BMI do not both sit at an extreme. That is a limitation of sorting a continuous range of human builds into three boxes rather than a statement about you.',
    },
    {
      question: 'Can my body type change?',
      answer:
        'Frame size, essentially not — the skeleton is what it is once you are grown. The label can change, because it partly depends on BMI, which moves with weight. That is a good illustration of how much of the label reflects current condition rather than build.',
    },
  ],
  referenceTable: bodyTypeTable(),
  relatedCalculators: [
    'bmi',
    'body-fat',
    'lean-body-mass',
    'ideal-weight',
    'healthy-weight-range',
    'macro',
  ],
  relatedGuides: ['why-bmi-is-a-screening-tool', 'body-fat-methods-compared'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};
