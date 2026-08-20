/**
 * Display rounding.
 *
 * The policy, applied everywhere: formulas return full precision, and rounding
 * happens exactly once, here, at the moment a value is shown. Rounding inside a
 * calculation and then feeding the rounded value into the next step compounds
 * error in ways that are invisible until a reference table disagrees with the
 * calculator that generated it.
 *
 * Precisions below are chosen for what the underlying estimate can actually
 * support. A BMR equation with a standard error of roughly 200 kcal has no
 * business displaying decimals, so calories round to whole numbers. BMI is
 * conventionally shown to one decimal. Waist-to-height ratio is shown to three
 * because the Army directive records it that way.
 */

export const DISPLAY_PRECISION = {
  bmi: 1,
  bmiPrime: 2,
  ponderalIndex: 1,
  calories: 0,
  macroGrams: 0,
  bodyFatPercent: 1,
  massKg: 1,
  massLb: 1,
  heightCm: 0,
  heightIn: 1,
  litres: 1,
  heartRate: 0,
  oneRepMax: 1,
  whtr: 3,
  percentage: 1,
  // Clinical convention is two decimals, and it is also about as far as the
  // formulas can be told apart: five of them on the same adult span roughly
  // 0.02 m², so a third decimal would be reporting the difference between
  // curves fitted to nine people and to 401.
  bodySurfaceArea: 2,
} as const;

export type DisplayQuantity = keyof typeof DISPLAY_PRECISION;

/**
 * Rounds half away from zero.
 *
 * JavaScript's Math.round rounds half *up*, so Math.round(-0.5) is -0 while
 * Math.round(0.5) is 1 — asymmetric around zero. Every quantity here is
 * non-negative in practice, but the asymmetry is worth removing rather than
 * relying on that staying true.
 */
export const roundTo = (value: number, decimals: number): number => {
  if (!Number.isFinite(value)) return Number.NaN;
  const factor = 10 ** decimals;
  const scaled = value * factor;
  const rounded = scaled < 0 ? -Math.round(-scaled) : Math.round(scaled);
  return rounded / factor;
};

/** Rounds a value for display using the precision registered for its quantity. */
export const forDisplay = (value: number, quantity: DisplayQuantity): number =>
  roundTo(value, DISPLAY_PRECISION[quantity]);

/**
 * Formats a number for a locale.
 *
 * Uses Intl so that decimal separators, digit grouping and numbering systems
 * follow the locale — Arabic, Hindi and the European locales all differ here,
 * and hard-coding a dot would be wrong in most of the ten locales shipped.
 */
export const formatNumber = (value: number, locale: string, quantity: DisplayQuantity): string => {
  const decimals = DISPLAY_PRECISION[quantity];
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(forDisplay(value, quantity));
};

/** Formats a range as a single localised string, e.g. "56.7-76.6". */
export const formatRange = (
  min: number,
  max: number,
  locale: string,
  quantity: DisplayQuantity
): string => `${formatNumber(min, locale, quantity)}–${formatNumber(max, locale, quantity)}`;
