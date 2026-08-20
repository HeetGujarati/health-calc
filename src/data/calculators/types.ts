/**
 * Calculator page definitions.
 *
 * Every calculator page is generated from one of these, so the ten required
 * blocks in section 7 of the brief are structural rather than a checklist
 * someone has to remember. A calculator that omits its citation or its FAQ does
 * not typecheck.
 */

export const CALCULATOR_CATEGORIES = [
  { id: 'body-composition', label: 'Body composition' },
  { id: 'energy', label: 'Energy and intake' },
  { id: 'training', label: 'Training' },
  { id: 'weight-reference', label: 'Weight reference' },
] as const;

export type CalculatorCategoryId = (typeof CALCULATOR_CATEGORIES)[number]['id'];

/** A form control on the calculator. */
export interface InputField {
  readonly name: string;
  readonly label: string;
  /** Shown under the field. Explains what to measure, not how to use a form. */
  readonly hint?: string;
  readonly type: 'number' | 'select' | 'radio';
  /** Options for select and radio. */
  readonly options?: readonly { readonly value: string; readonly label: string }[];
  readonly defaultValue?: string;
  /** Unit shown beside the field, switched by the metric/imperial toggle. */
  readonly unit?: { readonly metric: string; readonly imperial: string };
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  /** Only rendered when this other field has one of these values. */
  readonly showWhen?: { readonly field: string; readonly equals: readonly string[] };
}

/**
 * A published equation offered by the calculator.
 *
 * `expression` is rendered verbatim on the page — the brief requires the actual
 * formula to be visible, not described.
 */
export interface FormulaInfo {
  readonly id: string;
  readonly name: string;
  readonly expression: readonly string[];
  /** Full citation, as it appears in FORMULAS.md. */
  readonly source: string;
  readonly year: number;
  /** What the equation takes for granted about the person it is applied to. */
  readonly assumes: string;
  /** Honest note on accuracy relative to the alternatives. */
  readonly accuracy: string;
  readonly isDefault?: boolean;
}

export interface HowToStep {
  readonly name: string;
  readonly text: string;
  /** Fragment id; a build gate asserts the element exists in the rendered DOM. */
  readonly anchor: string;
}

export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

/**
 * A precomputed reference table.
 *
 * Rendered as real values in the prerendered HTML so the page carries substance
 * with JavaScript disabled, per section 7 requirement 7.
 */
export interface ReferenceTable {
  readonly caption: string;
  /** Explains how to read the table. Never an image-only or unexplained grid. */
  readonly note: string;
  readonly columnHeader: string;
  readonly rowHeader: string;
  readonly columns: readonly string[];
  readonly rows: readonly {
    readonly label: string;
    readonly cells: readonly string[];
  }[];
}

export interface CalculatorDefinition {
  readonly slug: string;
  readonly category: CalculatorCategoryId;

  /** The H1. Plain, sentence case, names the calculator. */
  readonly heading: string;
  /** Page title for SEO; may differ from the H1 to carry intent keywords. */
  readonly metaTitle: string;
  readonly description: string;
  readonly keywords: readonly string[];
  /** schema.org applicationSubCategory. */
  readonly applicationSubCategory: string;

  /** Lead paragraph under the H1. One or two plain sentences. */
  readonly intro: string;

  readonly inputs: readonly InputField[];

  readonly formulas: readonly FormulaInfo[];
  readonly howToSteps: readonly HowToStep[];
  readonly faq: readonly FaqEntry[];
  readonly referenceTable: ReferenceTable;

  /** Six related calculator slugs, per section 7 requirement 9. */
  readonly relatedCalculators: readonly string[];
  /** Two related guide slugs. */
  readonly relatedGuides: readonly string[];

  /** Real date this page's content was last reviewed. ISO 8601. */
  readonly lastUpdated: string;
  /** First publication date, for Article and sitemap lastmod. */
  readonly published: string;
}
