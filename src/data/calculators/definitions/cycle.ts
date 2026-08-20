import type { CalculatorDefinition, InputField } from '../types';
import { REVIEWED, steps } from './fields';
import { periodTable } from '../referenceTables';

/**
 * Menstrual cycle calculators.
 *
 * Scope is deliberately one page. The site states on `/about/` and in
 * `llms.txt` that it does not publish pregnancy, due date, ovulation or
 * conception calculators, and nothing here crosses that line: this projects
 * period dates forward and says nothing about fertility.
 *
 * The editorial problem specific to this page is that a reader may arrive
 * looking for exactly the thing the site declines to provide. The answer is to
 * say plainly what the page does not do, rather than to imply the projection
 * carries information it does not.
 */

const lastPeriodInput: InputField = {
  name: 'lastPeriod',
  label: 'First day of your last period',
  hint: 'The first day of bleeding, not the last.',
  type: 'date',
  // Fixed bounds rather than a rolling window: a value derived from the build
  // clock would change the emitted HTML on every build.
  dateMin: '2020-01-01',
  dateMax: '2035-12-31',
};

const cycleLengthInput: InputField = {
  name: 'cycle',
  label: 'Cycle length',
  hint: 'First day of one period to the first day of the next. 28 days is the textbook figure; anything from 21 to 35 is common.',
  type: 'number',
  defaultValue: '28',
  min: 20,
  max: 45,
  step: 1,
  unit: { metric: 'days', imperial: 'days' },
};

const periodLengthInput: InputField = {
  name: 'periodDays',
  label: 'Period length',
  hint: 'How many days the bleeding usually lasts. Used only to show an end date alongside each start date.',
  type: 'number',
  defaultValue: '5',
  min: 1,
  max: 10,
  step: 1,
  unit: { metric: 'days', imperial: 'days' },
};

export const period: CalculatorDefinition = {
  slug: 'period',
  category: 'cycle',
  heading: 'Period calculator',
  metaTitle: 'Period calculator — next period dates',
  description:
    'Project the start dates of your next six periods from the first day of your last one and your usual cycle length, with a plain account of how much a projection like this is worth.',
  keywords: [
    'period calculator',
    'menstrual cycle calculator',
    'next period date',
    'cycle tracker',
  ],
  applicationSubCategory: 'Menstrual cycle',
  intro:
    'Enter the first day of your last period and your usual cycle length to see when the next six are expected. This projects dates only — it does not estimate ovulation or a fertile window.',
  inputs: [lastPeriodInput, cycleLengthInput, periodLengthInput],
  formulas: [
    {
      id: 'cycle-projection',
      name: 'Cycle projection',
      expression: [
        'next period = first day of last period + cycle length',
        'nth period = first day of last period + (cycle length × n)',
      ],
      source:
        'Arithmetic rather than a published equation. Cycle length ranges are described in Mihm M., Gangooly S., Muttukrishna S., "The normal menstrual cycle in women", Animal Reproduction Science 124(3–4), 2011, pp. 229–236.',
      year: 2011,
      assumes:
        'That every future cycle is exactly as long as the one you entered. That is the only assumption, and it is a strong one: cycle length varies from one cycle to the next in most people.',
      accuracy:
        'Each projection is as accurate as the cycle length you gave, and no more. Cycle-to-cycle variation of a few days is normal, and because the arithmetic multiplies the interval, that error multiplies too — the sixth date is roughly six times as uncertain as the first. Projecting from an average of several recent cycles is better than projecting from one.',
      isDefault: true,
    },
  ],
  howToSteps: steps(
    'the first day of your last period and how long your cycle usually runs',
    'the expected start date of your next period and the five after it'
  ),
  faq: [
    {
      question: 'How accurate is a projected period date?',
      answer:
        'As accurate as the cycle length you entered, and it degrades the further ahead it looks. Cycle length varies by a few days from one cycle to the next in most people, and this arithmetic assumes it does not, so the error compounds across cycles. The first date is a reasonable estimate; the sixth is a rough one.',
    },
    {
      question: 'What counts as the first day of a period?',
      answer:
        'The first day of full bleeding. Spotting the day before is generally not counted. Using the same rule every time matters more than which rule you pick, because cycle length is measured from one first day to the next.',
    },
    {
      question: 'What is a normal cycle length?',
      answer:
        'Roughly 21 to 35 days in adults, with 28 as the commonly quoted midpoint rather than a target. Cycles are often longer and more variable in the years after menstruation begins and in the years approaching menopause. A cycle consistently outside that range, or a sudden change in it, is worth raising with a doctor.',
    },
    {
      question: 'Does this calculator show my fertile window or ovulation date?',
      answer:
        'No, and that is deliberate. This site does not publish ovulation, conception or due date calculators — they are the highest-scrutiny category in health and are properly served by established medical publishers. This page projects period start dates and nothing else.',
    },
    {
      question: 'Can I use this to avoid pregnancy?',
      answer:
        'No. This is not a contraceptive method and gives no information about fertility. Calendar-based methods of any kind are among the least reliable forms of contraception, and this page does not implement one. Talk to a doctor or a sexual health service about contraception.',
    },
    {
      question: 'Why did my period not arrive on the projected date?',
      answer:
        'Because the projection assumed a fixed cycle length and cycles vary. Illness, stress, travel, weight change, exercise load, hormonal contraception and perimenopause all shift timing. A single late or early period is common. A pattern of missed or very irregular periods is worth a conversation with a doctor.',
    },
  ],
  referenceTable: periodTable(),
  relatedCalculators: [
    'bmi',
    'healthy-weight-range',
    'bmr',
    'tdee',
    'water-intake',
    'target-heart-rate',
  ],
  relatedGuides: ['why-scale-weight-fluctuates', 'why-bmi-is-a-screening-tool'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};
