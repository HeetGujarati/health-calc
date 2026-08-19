/**
 * Result type for everything that can reject user input.
 *
 * The brief requires hostile input to be "rejected cleanly with a helpful
 * message, never producing a number". Returning a Result rather than throwing
 * makes that the only reachable path: a caller cannot accidentally use a value
 * that was never computed, because there is no value to reach without first
 * narrowing on `ok`.
 */

export type HealthErrorCode =
  | 'missing'
  | 'not_a_number'
  | 'not_finite'
  | 'out_of_range'
  | 'below_minimum_age'
  | 'inconsistent_measurements'
  | 'unsupported_option';

export interface HealthError {
  readonly code: HealthErrorCode;
  /**
   * Plain-language, actionable text shown directly to the user.
   * Per the design brief: say what happened and how to fix it. No blame,
   * no exclamation marks, no jargon.
   */
  readonly message: string;
  /** Which input caused it, so the UI can attach the message to that field. */
  readonly field?: string;
}

export type Result<T> =
  { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: HealthError };

export const ok = <T>(value: T): Result<T> => ({ ok: true, value });

export const err = (code: HealthErrorCode, message: string, field?: string): Result<never> => ({
  ok: false,
  error: field === undefined ? { code, message } : { code, message, field },
});

/** Narrowing helper for callers that have already handled the error branch. */
export const isOk = <T>(result: Result<T>): result is { ok: true; value: T } => result.ok;

/**
 * Returns the first error across several results, or null if all succeeded.
 * Lets a calculator validate every field and surface one message at a time
 * without a cascade of nested conditionals.
 */
export const firstError = (...results: readonly Result<unknown>[]): HealthError | null => {
  for (const result of results) {
    if (!result.ok) return result.error;
  }
  return null;
};
