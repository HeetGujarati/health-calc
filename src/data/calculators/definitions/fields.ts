import type { HowToStep, InputField } from '../types';

/**
 * Field definitions shared across calculators.
 *
 * Defined once so the ranges, hints and units cannot drift between pages — a
 * height field that accepts a different range on two calculators is the kind of
 * inconsistency nobody notices until a user reports it.
 */

/**
 * Content review date.
 *
 * A fixed date, not a rolling "today". A lastmod that moves on every build
 * tells search engines the page changed when it did not, which the sitemap
 * specification explicitly warns against.
 */
export const REVIEWED = '2026-08-20';

export const heightInput: InputField = {
  name: 'height',
  label: 'Height',
  type: 'number',
  min: 50,
  max: 260,
  step: 0.5,
  unit: { metric: 'cm', imperial: 'in' },
};

export const weightInput: InputField = {
  name: 'weight',
  label: 'Weight',
  type: 'number',
  min: 20,
  max: 400,
  step: 0.1,
  unit: { metric: 'kg', imperial: 'lb' },
};

export const ageInput: InputField = {
  name: 'age',
  label: 'Age',
  type: 'number',
  min: 0,
  max: 120,
  step: 1,
  unit: { metric: 'years', imperial: 'years' },
};

export const sexInput: InputField = {
  name: 'sex',
  label: 'Equation set',
  hint: 'These equations were published with separate coefficients derived from male and female reference populations.',
  type: 'radio',
  defaultValue: 'male',
  options: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ],
};

export const activityInput: InputField = {
  name: 'activity',
  label: 'Activity level',
  hint: 'Pick the level that matches a typical week, not your best one.',
  type: 'select',
  defaultValue: 'moderately_active',
  options: [
    { value: 'sedentary', label: 'Sedentary — desk work, no deliberate exercise' },
    { value: 'lightly_active', label: 'Lightly active — exercise 1 to 3 days a week' },
    { value: 'moderately_active', label: 'Moderately active — exercise 3 to 5 days a week' },
    { value: 'very_active', label: 'Very active — exercise 6 to 7 days a week' },
    { value: 'extra_active', label: 'Extra active — hard daily training or physical work' },
  ],
};

/**
 * The three HowTo steps, identical in shape on every page and matching the DOM
 * anchors the template renders. A build gate asserts each anchor resolves.
 */
export const steps = (whatToEnter: string, whatYouGet: string): readonly HowToStep[] => [
  {
    name: 'Enter your details',
    text: `Choose metric or imperial, then enter ${whatToEnter}.`,
    anchor: 'step-1',
  },
  {
    name: 'Read the result',
    text: `The result updates as you type. It shows ${whatYouGet}.`,
    anchor: 'step-2',
  },
  {
    name: 'Check the formula and its source',
    text: 'The calculation, the paper it comes from, and what the equation assumes are set out below the calculator.',
    anchor: 'step-3',
  },
];
