import { DEFAULT_LOCALE, type Locale } from '../../config/locales';
import { CONTENT_MESSAGES } from '../../i18n/content';
import type { CalculatorDefinition } from '../../data/calculators/types';
import type { ActivityDefinition } from '../../data/activities';
import type { LiftDefinition } from '../../data/lifts';
import type { DistanceDefinition } from '../../data/distances';
import type { ChartDefinition } from '../../data/charts';

/**
 * Content translation.
 *
 * The English data files stay the source of truth: they hold the MET values,
 * the citations, the equations and the prose, and nothing here can change a
 * number. Each locale supplies a flat map of overrides keyed by
 * `<type>.<slug>.<field>`, and the functions below return a definition with the
 * prose swapped and everything else untouched.
 *
 * Doing it this way means the page templates never learn about translation.
 * They receive a `CalculatorDefinition` and render it; whether its `intro` came
 * from the data file or the Spanish catalog is not their problem.
 *
 * **What is deliberately not translated**, because translating it would be
 * wrong rather than merely expensive:
 *
 * - Formula names. "Mifflin-St Jeor", "Katch-McArdle" and "US Navy" are proper
 *   nouns and are cited that way in every language's literature.
 * - Citations. A bibliographic reference points at a specific English-language
 *   paper; translating its title makes it unfindable.
 * - Equation expressions, MET values, Compendium codes and numeric table cells.
 *
 * A missing key falls back to English rather than throwing. A build that dies
 * because one FAQ answer is untranslated helps nobody; a page that shows one
 * English paragraph is degraded but useful. `i18n-content.test.ts` asserts the
 * miss count is zero, so the gap is caught by the gate rather than by a reader.
 */

/** Reads an override, or returns the English source unchanged. */
export const contentText = (key: string, english: string, locale: Locale): string => {
  if (locale === DEFAULT_LOCALE) return english;
  return CONTENT_MESSAGES[locale][key] ?? english;
};

/** Every key a calculator definition can be translated through. */
export const calculatorKeys = (definition: CalculatorDefinition): readonly string[] => {
  const base = `calc.${definition.slug}`;
  const keys: string[] = [
    `${base}.heading`,
    `${base}.metaTitle`,
    `${base}.description`,
    `${base}.intro`,
    `${base}.keywords`,
    `${base}.table.caption`,
    `${base}.table.note`,
    `${base}.table.columnHeader`,
    `${base}.table.rowHeader`,
  ];

  for (const input of definition.inputs) {
    keys.push(`${base}.input.${input.name}.label`);
    if (input.hint !== undefined) keys.push(`${base}.input.${input.name}.hint`);
    for (const option of input.options ?? []) {
      keys.push(`${base}.input.${input.name}.option.${option.value}`);
    }
  }

  for (const formula of definition.formulas) {
    keys.push(`${base}.formula.${formula.id}.assumes`);
    keys.push(`${base}.formula.${formula.id}.accuracy`);
  }

  for (const step of definition.howToSteps) {
    keys.push(`${base}.step.${step.anchor}.name`);
    keys.push(`${base}.step.${step.anchor}.text`);
  }

  definition.faq.forEach((_entry, index) => {
    keys.push(`${base}.faq.${String(index)}.q`);
    keys.push(`${base}.faq.${String(index)}.a`);
  });

  definition.referenceTable.rows.forEach((_row, index) => {
    keys.push(`${base}.table.row.${String(index)}`);
  });

  return keys;
};

/** A calculator definition with its prose in the requested locale. */
export const translateCalculator = (
  definition: CalculatorDefinition,
  locale: Locale
): CalculatorDefinition => {
  if (locale === DEFAULT_LOCALE) return definition;

  const base = `calc.${definition.slug}`;
  const text = (key: string, english: string): string => contentText(key, english, locale);

  // Keywords are one comma-separated string in the catalog: a translator
  // editing a list of search terms should see them together, not as fifteen
  // numbered keys.
  const keywords = CONTENT_MESSAGES[locale][`${base}.keywords`];

  return {
    ...definition,
    heading: text(`${base}.heading`, definition.heading),
    metaTitle: text(`${base}.metaTitle`, definition.metaTitle),
    description: text(`${base}.description`, definition.description),
    intro: text(`${base}.intro`, definition.intro),
    keywords:
      keywords === undefined
        ? definition.keywords
        : keywords
            .split(',')
            .map((keyword) => keyword.trim())
            .filter((keyword) => keyword !== ''),

    inputs: definition.inputs.map((input) => ({
      ...input,
      label: text(`${base}.input.${input.name}.label`, input.label),
      ...(input.hint === undefined
        ? {}
        : { hint: text(`${base}.input.${input.name}.hint`, input.hint) }),
      ...(input.options === undefined
        ? {}
        : {
            options: input.options.map((option) => ({
              ...option,
              label: text(`${base}.input.${input.name}.option.${option.value}`, option.label),
            })),
          }),
    })),

    formulas: definition.formulas.map((formula) => ({
      ...formula,
      assumes: text(`${base}.formula.${formula.id}.assumes`, formula.assumes),
      accuracy: text(`${base}.formula.${formula.id}.accuracy`, formula.accuracy),
    })),

    howToSteps: definition.howToSteps.map((step) => ({
      ...step,
      name: text(`${base}.step.${step.anchor}.name`, step.name),
      text: text(`${base}.step.${step.anchor}.text`, step.text),
    })),

    faq: definition.faq.map((entry, index) => ({
      question: text(`${base}.faq.${String(index)}.q`, entry.question),
      answer: text(`${base}.faq.${String(index)}.a`, entry.answer),
    })),

    referenceTable: {
      ...definition.referenceTable,
      caption: text(`${base}.table.caption`, definition.referenceTable.caption),
      note: text(`${base}.table.note`, definition.referenceTable.note),
      columnHeader: text(`${base}.table.columnHeader`, definition.referenceTable.columnHeader),
      rowHeader: text(`${base}.table.rowHeader`, definition.referenceTable.rowHeader),
      rows: definition.referenceTable.rows.map((row, index) => ({
        ...row,
        label: text(`${base}.table.row.${String(index)}`, row.label),
      })),
    },
  };
};

/** Single-field accessor, for lists that only need one string per item. */
export const calculatorText = (
  slug: string,
  field: 'heading' | 'intro' | 'description',
  locale: Locale,
  english = ''
): string => contentText(`calc.${slug}.${field}`, english, locale);

export const activityKeys = (activity: ActivityDefinition): readonly string[] => [
  `activity.${activity.slug}.name`,
];

export const translateActivity = (
  activity: ActivityDefinition,
  locale: Locale
): ActivityDefinition => {
  if (locale === DEFAULT_LOCALE) return activity;
  return {
    ...activity,
    name: contentText(`activity.${activity.slug}.name`, activity.name, locale),
    // compendiumDescription is a verbatim quotation from the Compendium and is
    // left in English on purpose: it is the evidence for the MET value, and a
    // translated quotation is no longer checkable against the source.
  };
};

export const liftKeys = (lift: LiftDefinition): readonly string[] => [
  `lift.${lift.slug}.name`,
  `lift.${lift.slug}.summary`,
  `lift.${lift.slug}.estimateBias`,
  `lift.${lift.slug}.typicalReps`,
  ...lift.notes.map((_note, index) => `lift.${lift.slug}.note.${String(index)}`),
];

export const translateLift = (lift: LiftDefinition, locale: Locale): LiftDefinition => {
  if (locale === DEFAULT_LOCALE) return lift;
  const base = `lift.${lift.slug}`;
  return {
    ...lift,
    name: contentText(`${base}.name`, lift.name, locale),
    summary: contentText(`${base}.summary`, lift.summary, locale),
    estimateBias: contentText(`${base}.estimateBias`, lift.estimateBias, locale),
    typicalReps: contentText(`${base}.typicalReps`, lift.typicalReps, locale),
    notes: lift.notes.map((note, index) =>
      contentText(`${base}.note.${String(index)}`, note, locale)
    ),
  };
};

export const distanceKeys = (distance: DistanceDefinition): readonly string[] => [
  `distance.${distance.slug}.name`,
  `distance.${distance.slug}.shortName`,
  `distance.${distance.slug}.summary`,
  `distance.${distance.slug}.demands`,
  `distance.${distance.slug}.pacing`,
];

export const translateDistance = (
  distance: DistanceDefinition,
  locale: Locale
): DistanceDefinition => {
  if (locale === DEFAULT_LOCALE) return distance;
  const base = `distance.${distance.slug}`;
  return {
    ...distance,
    name: contentText(`${base}.name`, distance.name, locale),
    shortName: contentText(`${base}.shortName`, distance.shortName, locale),
    summary: contentText(`${base}.summary`, distance.summary, locale),
    demands: contentText(`${base}.demands`, distance.demands, locale),
    pacing: contentText(`${base}.pacing`, distance.pacing, locale),
  };
};

export const chartKeys = (chart: ChartDefinition): readonly string[] => [
  `chart.${chart.slug}.heading`,
  `chart.${chart.slug}.metaTitle`,
  `chart.${chart.slug}.description`,
  `chart.${chart.slug}.keywords`,
  `chart.${chart.slug}.intro`,
  ...chart.howToRead.map((_line, index) => `chart.${chart.slug}.howToRead.${String(index)}`),
  // The table itself is shared with the calculator that owns it, so its
  // caption and labels are translated once, there, and not again here.
];

export const translateChart = (chart: ChartDefinition, locale: Locale): ChartDefinition => {
  if (locale === DEFAULT_LOCALE) return chart;
  const base = `chart.${chart.slug}`;
  const keywords = CONTENT_MESSAGES[locale][`${base}.keywords`];
  return {
    ...chart,
    heading: contentText(`${base}.heading`, chart.heading, locale),
    metaTitle: contentText(`${base}.metaTitle`, chart.metaTitle, locale),
    description: contentText(`${base}.description`, chart.description, locale),
    intro: contentText(`${base}.intro`, chart.intro, locale),
    howToRead: chart.howToRead.map((line, index) =>
      contentText(`${base}.howToRead.${String(index)}`, line, locale)
    ),
    keywords:
      keywords === undefined
        ? chart.keywords
        : keywords
            .split(',')
            .map((keyword) => keyword.trim())
            .filter((keyword) => keyword !== ''),
  };
};
