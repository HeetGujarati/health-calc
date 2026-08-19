import type { HealthError } from '../health/errors';

/**
 * The shape every calculator returns.
 *
 * Deliberately presentation-agnostic: values are already formatted strings, and
 * notes are identifiers rather than prose, so the same result renders in any of
 * the ten locales without English leaking through.
 */

/** A note explaining that a guard adjusted the answer. Never alarming. */
export interface ResultNote {
  readonly tone: 'info' | 'caution';
  readonly text: string;
}

export interface ResultValue {
  readonly label: string;
  readonly value: string;
  readonly unit?: string;
}

export interface CalculatorSuccess {
  readonly ok: true;
  /** The one number the page exists to produce. Rendered as the hero numeral. */
  readonly primary: ResultValue;
  /**
   * The answer-first plain sentence, per section 7 requirement 3.
   * One sentence, no hedging, no interpretation of whether the number is good.
   */
  readonly summary: string;
  /** Supporting figures: alternative formulas, breakdowns, categories. */
  readonly secondary: readonly ResultValue[];
  readonly notes: readonly ResultNote[];
}

export interface CalculatorFailure {
  readonly ok: false;
  readonly error: HealthError;
}

export type CalculatorResult = CalculatorSuccess | CalculatorFailure;

/** Raw form state: every value arrives as a string, exactly as typed. */
export type FormValues = Readonly<Record<string, string>>;

/**
 * Locale is passed explicitly rather than read from a global, so the same
 * function is callable at build time (for reference tables) and in the browser
 * (for live results) and produces identically formatted numbers in both.
 */
export type ComputeFn = (values: FormValues, locale: string) => CalculatorResult;

export const failure = (error: HealthError): CalculatorFailure => ({ ok: false, error });
