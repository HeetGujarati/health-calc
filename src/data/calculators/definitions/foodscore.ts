import type { CalculatorDefinition, InputField } from '../types';
import { REVIEWED, steps } from './fields';
import { foodScoreTable } from '../referenceTables';

/**
 * Food score.
 *
 * The formula is the one in US Patent 6,040,531 and its continuations, which
 * expired on 1 November 2016 — twenty years from the PCT filing. The arithmetic
 * is free to implement. The names the formula was sold under are trademarks
 * that do not expire, so none of them appears in the slug, the title, the copy
 * or the citation; the patent number does the identifying instead.
 *
 * Two editorial risks here, both handled in the copy rather than by leaving
 * things out. The first is implying the score means more than it does: it
 * counts calories and fat and credits fibre, and is blind to protein, sugar,
 * salt and everything else, so two very different foods can score identically.
 * The second is the language a food-scoring page invites — this site bans
 * "cheat day", "guilt-free", "bad foods" and the rest in code, and the content
 * policy test now runs those patterns over this page like every other.
 */

const kcalInput: InputField = {
  name: 'kcal',
  label: 'Calories per serving',
  hint: 'The energy figure on the label, in kcal, for the portion you are actually eating.',
  type: 'number',
  min: 0,
  max: 5000,
  step: 1,
  unit: { metric: 'kcal', imperial: 'kcal' },
};

const fatInput: InputField = {
  name: 'fat',
  label: 'Total fat',
  hint: 'Total fat, not saturated fat — the formula does not distinguish them.',
  type: 'number',
  defaultValue: '0',
  min: 0,
  max: 500,
  step: 0.1,
  unit: { metric: 'g', imperial: 'g' },
};

const fibreInput: InputField = {
  name: 'fibre',
  label: 'Dietary fibre',
  hint: 'Leave at zero if the label does not give it. Fibre only ever subtracts.',
  type: 'number',
  defaultValue: '0',
  min: 0,
  max: 200,
  step: 0.1,
  unit: { metric: 'g', imperial: 'g' },
};

export const foodScoreCalc: CalculatorDefinition = {
  slug: 'food-score',
  category: 'energy',
  heading: 'Food score calculator',
  metaTitle: 'Food score calculator — calories, fat, fibre',
  description:
    'Score a serving from its calories, fat and fibre using the formula published in a now-expired 1997 patent, with a plain account of what that score can and cannot tell you.',
  keywords: ['food score calculator', 'calorie fat fibre score', 'food points', 'nutrition score'],
  applicationSubCategory: 'Energy and intake',
  intro:
    'Enter the calories, fat and fibre from a nutrition label to score a serving. The formula counts calories and fat and gives credit for fibre — and knows nothing else about the food.',
  inputs: [kcalInput, fatInput, fibreInput],
  formulas: [
    {
      id: 'food-score',
      name: 'Calorie, fat and fibre score',
      expression: [
        'score = kcal / 50 + fat (g) / 12 − fibre (g) / 5',
        'Rounded to a whole number, and never below zero.',
      ],
      source:
        'US Patent 6,040,531, "Process for controlling body weight", filed 18 July 1997, granted 21 March 2000, priority GB 9522364.0 of 1 November 1995. The patent family expired on 1 November 2016. No peer-reviewed publication of this formula exists.',
      year: 1997,
      assumes:
        'That calories and fat are the two figures worth penalising and fibre the one worth crediting, and that the weights of 50, 12 and 5 balance them sensibly. Those constants were chosen by the formula’s authors; no derivation for them is given in the patent.',
      accuracy:
        'Not an accuracy question so much as a scope one. The formula is arithmetic, so it computes exactly what it defines — but it is blind to protein, sugar, salt, micronutrients and how processed a food is, which means two servings with the same calories, fat and fibre score identically however different they are. It is a rough energy-and-fat proxy that gives fibre credit, and reading it as a measure of how good a food is asks more of it than it can carry.',
      isDefault: true,
    },
  ],
  howToSteps: steps(
    'the calories, total fat and dietary fibre from the label, for the serving you are eating',
    'the score for that serving and how much each of the three figures contributed to it'
  ),
  faq: [
    {
      question: 'Where does this formula come from?',
      answer:
        'US Patent 6,040,531, filed in 1997, which describes a food scoring process for weight management. The patent is the only primary public document that states the formula — it has never been published in a peer-reviewed journal, and the clinical studies of the programme built around it report outcomes without printing the algorithm. The patent family expired on 1 November 2016.',
    },
    {
      question: 'Why does this page not cap fibre at 4 grams?',
      answer:
        'Because the patent contains no cap. Almost every version of this formula online clamps fibre at 4 g, but that limit appears in no claim and no part of the specification. It most likely comes from the printed cardboard slide rule sold alongside the programme, whose fibre scale simply stopped at 4 g. Implementing it would mean shipping an undocumented convention while citing a source that does not contain it.',
    },
    {
      question: 'What does the score actually measure?',
      answer:
        'Calories and fat, minus a credit for fibre. Nothing else. It has no information about protein, sugar, salt, vitamins, or how processed something is, so a serving of nuts and a serving of biscuits with the same calories, fat and fibre come out the same. It is useful as a quick, consistent way to compare portions, and it is not a nutrition assessment.',
    },
    {
      question: 'How much is fibre worth?',
      answer:
        'Every 5 g of fibre cancels one point. Because fat is divided by 12 and fibre by 5, a gram of fibre subtracts about 2.4 times what a gram of fat adds — which is the one real editorial claim the formula makes about food.',
    },
    {
      question: 'Can the score be negative?',
      answer:
        'The arithmetic can go below zero when fibre outweighs the calories and fat, which happens with high-fibre, low-calorie foods. The formula was defined to produce a whole number and zero is its floor, so the page shows zero and tells you the arithmetic went below it, rather than showing a negative and leaving you to interpret it.',
    },
    {
      question: 'Is this the current version of the system it came from?',
      answer:
        'No. The formula here is the 1997 one, which is the only version disclosed in a public document. Every revision since 2010 uses different inputs — protein and carbohydrate in one, saturated fat and sugar in another — and none of those algorithms has been published. Versions of them circulating online are reverse-engineered from published food values rather than sourced, so this page does not reproduce them.',
    },
  ],
  referenceTable: foodScoreTable(),
  relatedCalculators: ['calorie', 'macro', 'protein', 'tdee', 'bmr', 'water-intake'],
  relatedGuides: [
    'building-a-sustainable-calorie-target',
    'the-maintenance-calories-misconception',
  ],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};
