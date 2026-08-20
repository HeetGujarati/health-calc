import { writeFileSync } from 'node:fs';
import { CALCULATOR_DEFINITIONS } from '../src/data/calculators';
import { ACTIVITIES } from '../src/data/activities';
import { LIFTS } from '../src/data/lifts';
import { DISTANCES } from '../src/data/distances';
import { CHART_DEFINITIONS } from '../src/data/charts';
import {
  activityKeys,
  calculatorKeys,
  chartKeys,
  distanceKeys,
  liftKeys,
} from '../src/lib/i18n/content';

/**
 * Dumps every translatable content key with its English source string.
 *
 * The key space is derived from the data files rather than maintained by hand,
 * so it cannot drift from what the pages actually ask for. Run it to see what a
 * locale still owes:
 *
 *     npx vite-node scripts/extract-i18n-keys.ts -- out.json
 *
 * The English values in the output are the fallback the site renders today for
 * any key a locale has not supplied — see lib/i18n/content.ts.
 */

const english = new Map<string, string>();

const put = (key: string, value: string): void => {
  english.set(key, value);
};

for (const definition of CALCULATOR_DEFINITIONS) {
  const base = `calc.${definition.slug}`;
  put(`${base}.heading`, definition.heading);
  put(`${base}.metaTitle`, definition.metaTitle);
  put(`${base}.description`, definition.description);
  put(`${base}.intro`, definition.intro);
  put(`${base}.keywords`, definition.keywords.join(', '));
  put(`${base}.table.caption`, definition.referenceTable.caption);
  put(`${base}.table.note`, definition.referenceTable.note);
  put(`${base}.table.columnHeader`, definition.referenceTable.columnHeader);
  put(`${base}.table.rowHeader`, definition.referenceTable.rowHeader);

  for (const input of definition.inputs) {
    put(`${base}.input.${input.name}.label`, input.label);
    if (input.hint !== undefined) put(`${base}.input.${input.name}.hint`, input.hint);
    for (const option of input.options ?? []) {
      put(`${base}.input.${input.name}.option.${option.value}`, option.label);
    }
  }
  for (const formula of definition.formulas) {
    put(`${base}.formula.${formula.id}.assumes`, formula.assumes);
    put(`${base}.formula.${formula.id}.accuracy`, formula.accuracy);
  }
  for (const step of definition.howToSteps) {
    put(`${base}.step.${step.anchor}.name`, step.name);
    put(`${base}.step.${step.anchor}.text`, step.text);
  }
  definition.faq.forEach((entry, index) => {
    put(`${base}.faq.${String(index)}.q`, entry.question);
    put(`${base}.faq.${String(index)}.a`, entry.answer);
  });
  definition.referenceTable.rows.forEach((row, index) => {
    put(`${base}.table.row.${String(index)}`, row.label);
  });
}

for (const activity of ACTIVITIES) put(`activity.${activity.slug}.name`, activity.name);

for (const lift of LIFTS) {
  const base = `lift.${lift.slug}`;
  put(`${base}.name`, lift.name);
  put(`${base}.summary`, lift.summary);
  put(`${base}.estimateBias`, lift.estimateBias);
  put(`${base}.typicalReps`, lift.typicalReps);
  lift.notes.forEach((note, index) => {
    put(`${base}.note.${String(index)}`, note);
  });
}

for (const distance of DISTANCES) {
  const base = `distance.${distance.slug}`;
  put(`${base}.name`, distance.name);
  put(`${base}.shortName`, distance.shortName);
  put(`${base}.summary`, distance.summary);
  put(`${base}.demands`, distance.demands);
  put(`${base}.pacing`, distance.pacing);
}

for (const chart of CHART_DEFINITIONS) {
  const base = `chart.${chart.slug}`;
  put(`${base}.heading`, chart.heading);
  put(`${base}.metaTitle`, chart.metaTitle);
  put(`${base}.description`, chart.description);
  put(`${base}.keywords`, chart.keywords.join(', '));
  put(`${base}.intro`, chart.intro);
  chart.howToRead.forEach((line, index) => {
    put(`${base}.howToRead.${String(index)}`, line);
  });
}

/** Cross-check: every key the accessor functions ask for must be present. */
const expected = new Set<string>([
  ...CALCULATOR_DEFINITIONS.flatMap((definition) => calculatorKeys(definition)),
  ...ACTIVITIES.flatMap((activity) => activityKeys(activity)),
  ...LIFTS.flatMap((lift) => liftKeys(lift)),
  ...DISTANCES.flatMap((distance) => distanceKeys(distance)),
  ...CHART_DEFINITIONS.flatMap((chart) => chartKeys(chart)),
]);

const missing = [...expected].filter((key) => !english.has(key));
if (missing.length > 0) {
  throw new Error(`Accessor asks for keys this dump does not produce:\n${missing.join('\n')}`);
}

const output = process.argv[process.argv.length - 1] ?? 'i18n-keys.json';
writeFileSync(output, `${JSON.stringify(Object.fromEntries(english), null, 2)}\n`, 'utf8');
console.log(`${String(english.size)} keys written to ${output}`);
