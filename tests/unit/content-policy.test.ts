import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, LOCALE_CODES, type Locale } from '../../src/config/locales';
import { CALCULATOR_DEFINITIONS } from '../../src/data/calculators';
import type { CalculatorDefinition } from '../../src/data/calculators/types';
import { CHART_DEFINITIONS, type ChartDefinition } from '../../src/data/charts';
import { CONTENT_MESSAGES } from '../../src/i18n/content';
import { MESSAGE_KEYS, UI_MESSAGES } from '../../src/lib/i18n';
import { calculatorKeys, chartKeys } from '../../src/lib/i18n/content';
import {
  findContentPolicyViolations,
  type ContentPolicyViolation,
} from '../../src/lib/health/guards';

/**
 * The content gate, run over the actual content.
 *
 * `guards.ts` calls `findContentPolicyViolations` "the single entry point for
 * the build-time content gate", and CONTENT.md says the extreme-protocol and
 * fabricated-credential patterns "fail the build". Neither sentence was true
 * before this file existed: the function's only caller was `guards.test.ts`,
 * over two string literals written specifically to trip the regexes. Rules 5,
 * 6 and 8 were enforced against test fixtures and nothing else, while the real
 * corpus — eighteen calculators, eleven charts, ten UI catalogs and nine
 * content catalogs — shipped unchecked in every locale.
 *
 * This file is what makes the claim true. It walks the same data the page
 * templates render and fails on a match, so the language rules are enforced the
 * way the numeric rules already are: by something that stops the build, rather
 * than by someone remembering during review.
 *
 * Two things it does deliberately, both about how it behaves when it fires:
 *
 * - **Failures name the key, the rule and the pattern.** A bare "expected 0"
 *   would leave you grepping twenty thousand strings for the one that matched,
 *   which is exactly the moment you can least afford it.
 * - **Coverage is asserted separately from cleanliness.** A field added to
 *   `CalculatorDefinition` and not collected below would otherwise leave this
 *   file passing forever over a corpus quietly missing a page's copy. The
 *   coverage assertions derive their expectation from `calculatorKeys` and
 *   `chartKeys` — the same functions the translation catalogs are generated
 *   from — so "everything translatable is also scanned" is checked against a
 *   list nobody maintains by hand.
 */

interface AllowlistEntry {
  /** Exact scanned key, in the same form the failure message prints. */
  readonly key: string;
  /** Exact `RegExp.source` reported by the guard, not a paraphrase of it. */
  readonly pattern: string;
  /** Why this string is right as written. One line, no hedging. */
  readonly reason: string;
}

/**
 * Matches that are correct copy and stay as they are.
 *
 * The guard patterns are blunt on purpose: a regex cannot tell copy warning
 * against a practice from copy recommending it, and teaching it to try would
 * weaken it against the copy it exists to catch. So the regexes are left alone
 * and the exceptions are enumerated here — exact key, exact pattern, and the
 * reason the string is correct.
 *
 * This is not somewhere to park a real violation until there is time to fix
 * it. `has no stale entry` below fails when an entry stops matching, so a
 * rewritten or deleted string cannot leave a standing exemption behind it for
 * the next violation to slip through.
 */
const ALLOWLIST: readonly AllowlistEntry[] = [
  {
    key: 'calc.ideal-weight.keywords',
    pattern: '\\bideal body\\b',
    reason:
      '"ideal body weight" is the clinical name of the quantity the Devine and Hamwi equations return, and is what people search; the page itself leads with the healthy BMI range and says the equations were never validated as targets.',
  },
];

interface ScannedField {
  readonly key: string;
  readonly text: string;
}

interface PolicyMatch {
  readonly key: string;
  /** Narrowed to the guard's own union, so a renamed rule is a type error here. */
  readonly rule: ContentPolicyViolation['rule'];
  readonly pattern: string;
}

const scan = (fields: readonly ScannedField[]): readonly PolicyMatch[] =>
  fields.flatMap((field) =>
    findContentPolicyViolations(field.text).map((violation): PolicyMatch => ({
      key: field.key,
      rule: violation.rule,
      pattern: violation.pattern,
    }))
  );

const isAllowed = (match: PolicyMatch): boolean =>
  ALLOWLIST.some((entry) => entry.key === match.key && entry.pattern === match.pattern);

/**
 * Every violation, one readable line each.
 *
 * The line carries the three things needed to act on it: where the copy lives,
 * which of the eight rules it breaks, and the pattern that fired — the last
 * because the same rule holds a dozen patterns and knowing which one matched is
 * the difference between rewriting a sentence and hunting for the word.
 */
const report = (fields: readonly ScannedField[]): readonly string[] =>
  scan(fields)
    .filter((match) => !isAllowed(match))
    .map((match) => `${match.key}: ${match.rule} matched /${match.pattern}/`);

/**
 * Every rendered string of a calculator page.
 *
 * Keys match `calculatorKeys` exactly wherever the field is translatable, so a
 * failure here names the same key a translator would edit, and the coverage
 * test below can compare the two lists directly.
 *
 * Three kinds of field are left out, all for the same reason — they are quoted
 * matter rather than site copy, and rewriting one to satisfy a regex would
 * falsify it:
 *
 * - `formula.source`, which is a bibliographic citation.
 * - `formula.expression`, which is the published equation, rendered verbatim.
 * - Reference table cells, which are numbers computed by the same functions the
 *   calculators use.
 *
 * Formula *names* are scanned even though they are never translated: they are
 * proper nouns, but they are still rendered to a reader.
 */
const calculatorFields = (definition: CalculatorDefinition): readonly ScannedField[] => {
  const base = `calc.${definition.slug}`;
  const fields: ScannedField[] = [
    { key: `${base}.heading`, text: definition.heading },
    { key: `${base}.metaTitle`, text: definition.metaTitle },
    { key: `${base}.description`, text: definition.description },
    { key: `${base}.intro`, text: definition.intro },
    // The catalogs hold keywords as one comma-separated string, so scanning the
    // joined form is scanning exactly what a translator sees and edits.
    { key: `${base}.keywords`, text: definition.keywords.join(', ') },
  ];

  for (const input of definition.inputs) {
    fields.push({ key: `${base}.input.${input.name}.label`, text: input.label });
    if (input.hint !== undefined) {
      fields.push({ key: `${base}.input.${input.name}.hint`, text: input.hint });
    }
    for (const option of input.options ?? []) {
      fields.push({
        key: `${base}.input.${input.name}.option.${option.value}`,
        text: option.label,
      });
    }
  }

  for (const formula of definition.formulas) {
    fields.push({ key: `${base}.formula.${formula.id}.name`, text: formula.name });
    fields.push({ key: `${base}.formula.${formula.id}.assumes`, text: formula.assumes });
    fields.push({ key: `${base}.formula.${formula.id}.accuracy`, text: formula.accuracy });
  }

  for (const step of definition.howToSteps) {
    fields.push({ key: `${base}.step.${step.anchor}.name`, text: step.name });
    fields.push({ key: `${base}.step.${step.anchor}.text`, text: step.text });
  }

  definition.faq.forEach((entry, index) => {
    fields.push({ key: `${base}.faq.${String(index)}.q`, text: entry.question });
    fields.push({ key: `${base}.faq.${String(index)}.a`, text: entry.answer });
  });

  const table = definition.referenceTable;
  fields.push({ key: `${base}.table.caption`, text: table.caption });
  fields.push({ key: `${base}.table.note`, text: table.note });
  fields.push({ key: `${base}.table.columnHeader`, text: table.columnHeader });
  fields.push({ key: `${base}.table.rowHeader`, text: table.rowHeader });
  table.columns.forEach((column, index) => {
    fields.push({ key: `${base}.table.column.${String(index)}`, text: column });
  });
  table.rows.forEach((row, index) => {
    fields.push({ key: `${base}.table.row.${String(index)}`, text: row.label });
  });

  return fields;
};

/**
 * Every rendered string of a chart page.
 *
 * The table is not scanned here. A chart shares its table object with the
 * calculator that owns it — that sharing is what stops the two pages disagreeing
 * — so scanning it again would report the same caption twice under two keys,
 * and an allowlist entry would then have to name both.
 */
const chartFields = (chart: ChartDefinition): readonly ScannedField[] => {
  const base = `chart.${chart.slug}`;
  return [
    { key: `${base}.heading`, text: chart.heading },
    { key: `${base}.metaTitle`, text: chart.metaTitle },
    { key: `${base}.description`, text: chart.description },
    { key: `${base}.intro`, text: chart.intro },
    { key: `${base}.keywords`, text: chart.keywords.join(', ') },
    ...chart.howToRead.map((line, index) => ({
      key: `${base}.howToRead.${String(index)}`,
      text: line,
    })),
  ];
};

/** The chrome, the legal pages and everything else in a UI catalog. */
const uiFields = (locale: Locale): readonly ScannedField[] =>
  MESSAGE_KEYS.map((key) => ({ key: `ui.${locale}.${key}`, text: UI_MESSAGES[locale][key] }));

/** A locale's overrides for the data files — the translated half of the corpus. */
const contentFields = (locale: Locale): readonly ScannedField[] =>
  Object.entries(CONTENT_MESSAGES[locale]).map(([key, text]) => ({
    key: `content.${locale}.${key}`,
    text,
  }));

/** English has no content catalog; the data files are its source of truth. */
const TRANSLATED: readonly Locale[] = LOCALE_CODES.filter((code) => code !== DEFAULT_LOCALE);

const ALL_FIELDS: readonly ScannedField[] = [
  ...CALCULATOR_DEFINITIONS.flatMap(calculatorFields),
  ...CHART_DEFINITIONS.flatMap(chartFields),
  ...LOCALE_CODES.flatMap(uiFields),
  ...TRANSLATED.flatMap(contentFields),
];

describe('content policy gate', () => {
  /**
   * Vacuity guards. Everything below asserts an empty list, and an empty list
   * is also what a collector that stopped collecting produces.
   */
  it('scans the whole corpus rather than a surviving fragment of it', () => {
    expect(ALL_FIELDS.length).toBeGreaterThan(14000);
    expect(new Set(ALL_FIELDS.map((field) => field.key)).size).toBe(ALL_FIELDS.length);
    expect(ALL_FIELDS.every((field) => field.text.trim() !== '')).toBe(true);
  });

  it.each(CALCULATOR_DEFINITIONS)(
    '$slug is scanned everywhere it is translatable',
    (definition) => {
      const scanned = new Set(calculatorFields(definition).map((field) => field.key));
      expect(calculatorKeys(definition).filter((key) => !scanned.has(key))).toEqual([]);
    }
  );

  it.each(CHART_DEFINITIONS)('$slug is scanned everywhere it is translatable', (chart) => {
    const scanned = new Set(chartFields(chart).map((field) => field.key));
    expect(chartKeys(chart).filter((key) => !scanned.has(key))).toEqual([]);
  });

  it.each(CALCULATOR_DEFINITIONS)('$slug breaks no content rule', (definition) => {
    expect(report(calculatorFields(definition))).toEqual([]);
  });

  it.each(CHART_DEFINITIONS)('the $slug page breaks no content rule', (chart) => {
    expect(report(chartFields(chart))).toEqual([]);
  });

  it.each(LOCALE_CODES)('the %s UI catalog breaks no content rule', (locale) => {
    expect(report(uiFields(locale))).toEqual([]);
  });

  it.each(TRANSLATED)('the %s content catalog breaks no content rule', (locale) => {
    expect(report(contentFields(locale))).toEqual([]);
  });
});

describe('content policy allowlist', () => {
  it('has no stale entry', () => {
    // An entry that no longer matches is an exemption nobody is watching: the
    // string it was written for has been rewritten or deleted, and the next
    // violation to land on that key would pass silently.
    const matched = new Set(scan(ALL_FIELDS).map((match) => `${match.key} ${match.pattern}`));
    const stale = ALLOWLIST.filter((entry) => !matched.has(`${entry.key} ${entry.pattern}`)).map(
      (entry) => `${entry.key}: /${entry.pattern}/`
    );
    expect(stale).toEqual([]);
  });

  it('documents a reason for every entry', () => {
    // A reason short enough to be a shrug ("fine", "ok") is how this list turns
    // into a suppression file. Every exemption argues for itself in a sentence.
    const undocumented = ALLOWLIST.filter((entry) => entry.reason.trim().length < 40).map(
      (entry) => entry.key
    );
    expect(undocumented).toEqual([]);
  });
});
