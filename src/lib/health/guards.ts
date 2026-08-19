import { HEALTHY_BMI_MIN, bodyMassIndex, healthyWeightRange } from './bmi';
import type { Centimetres, Kilograms, Years } from './units';
import type { Sex } from './validation';
import { indexById } from './lookup';

/**
 * Health safety guards.
 *
 * These are the brief's section 4.3 rules expressed as enforced logic. They live
 * here — not in components — so that no page, locale or future refactor can
 * route around them. Every one is unit tested.
 *
 * The guiding principle: when a requested output would be unsafe, this module
 * returns a *different, safe* output plus a plain explanation. It never returns
 * the unsafe number with a warning attached, because a number on screen is what
 * people act on.
 */

// --- Rule 1: calorie floor --------------------------------------------------

/**
 * Absolute daily intake floors.
 *
 * Intakes below these are used clinically, under supervision, with monitoring
 * for micronutrient deficiency and cardiac risk. A public web calculator has no
 * way to provide any of that, so it does not produce numbers in that range.
 */
export const CALORIE_FLOORS: Readonly<Record<Sex, number>> = {
  male: 1500,
  female: 1200,
};

export interface CalorieFloorResult {
  readonly calories: number;
  /** True when the requested target was below the floor and has been raised. */
  readonly clamped: boolean;
  readonly floor: number;
}

/**
 * Clamps a daily calorie target up to the floor for that equation set.
 *
 * Deliberately returns the floor rather than refusing outright: the user still
 * gets a usable number, and the accompanying note explains why it is not the
 * number their inputs implied.
 */
export const enforceCalorieFloor = (calories: number, sex: Sex): CalorieFloorResult => {
  const floor = CALORIE_FLOORS[sex];
  return calories < floor
    ? { calories: floor, clamped: true, floor }
    : { calories, clamped: false, floor };
};

// --- Rule 2: deficit cap ----------------------------------------------------

/** Deficits are capped at the lesser of this fraction of TDEE and the absolute cap. */
export const MAX_DEFICIT_FRACTION_OF_TDEE = 0.25;
export const MAX_DEFICIT_KCAL = 1000;

/**
 * Energy equivalent of one kilogram of body mass change.
 *
 * Derived from Wishnofsky M. "Caloric equivalents of gained or lost weight",
 * American Journal of Clinical Nutrition 6(5), 1958, pp. 542-546 — the "3,500
 * kcal per pound" rule, converted.
 *
 * This is a linear approximation and is known to overstate long-run loss,
 * because expenditure falls as body mass falls (see Hall KD et al., "Quantifying
 * the effect of energy imbalance on bodyweight change", The Lancet 378(9793),
 * 2011, pp. 826-837). It is used here only to translate preset labels into a
 * daily figure, and the pages say plainly that real rates diverge over time.
 */
export const KCAL_PER_KG_BODY_MASS = 7700;

/**
 * Goal presets.
 *
 * The brief fixes these labels and forbids "aggressive", "extreme", "crash" and
 * "rapid" framings. Rates are modest by design; the type below makes adding a
 * faster preset a deliberate act rather than an easy one.
 */
export const GOAL_PRESETS = [
  { id: 'maintain', kgPerWeek: 0 },
  { id: 'gradual_loss', kgPerWeek: -0.25 },
  { id: 'steady_loss', kgPerWeek: -0.5 },
  { id: 'gradual_gain', kgPerWeek: 0.25 },
  { id: 'steady_gain', kgPerWeek: 0.5 },
] as const;

export type GoalPresetId = (typeof GOAL_PRESETS)[number]['id'];

export const DEFAULT_GOAL_PRESET: GoalPresetId = 'maintain';

const PRESET_BY_ID = indexById(GOAL_PRESETS);

/** Daily energy change implied by a preset's weekly rate. Negative is a deficit. */
export const dailyEnergyChangeForPreset = (preset: GoalPresetId): number =>
  (PRESET_BY_ID[preset].kgPerWeek * KCAL_PER_KG_BODY_MASS) / 7;

export interface DeficitCapResult {
  /** The permitted deficit as a positive number of kcal. */
  readonly deficit: number;
  readonly capped: boolean;
  readonly cap: number;
}

/**
 * Caps a requested deficit at min(25% of TDEE, 1000 kcal).
 *
 * Takes the requested deficit as a positive magnitude. Negative or zero
 * requests are returned as zero rather than being treated as surpluses, so a
 * sign error upstream cannot become a surplus here.
 */
export const capDeficit = (requestedDeficit: number, tdee: number): DeficitCapResult => {
  const cap = Math.min(MAX_DEFICIT_FRACTION_OF_TDEE * tdee, MAX_DEFICIT_KCAL);
  const requested = Math.max(0, requestedDeficit);
  return requested > cap
    ? { deficit: cap, capped: true, cap }
    : { deficit: requested, capped: false, cap };
};

// --- Rule 3: goal weight guard ----------------------------------------------

export type GoalWeightVerdict =
  | { readonly allowed: true }
  | {
      readonly allowed: false;
      readonly reason: 'below_healthy_bmi';
      readonly goalBmi: number;
      readonly healthyRange: { readonly minKg: number; readonly maxKg: number };
    };

/**
 * Refuses to plan toward a goal weight below BMI 18.5 for that height.
 *
 * Returns the healthy range for the height instead, so the page has something
 * neutral and factual to show in place of the plan.
 */
export const guardGoalWeight = (goalWeight: Kilograms, height: Centimetres): GoalWeightVerdict => {
  const goalBmi = bodyMassIndex(goalWeight, height);
  if (goalBmi >= HEALTHY_BMI_MIN) return { allowed: true };
  return {
    allowed: false,
    reason: 'below_healthy_bmi',
    goalBmi,
    healthyRange: healthyWeightRange(height),
  };
};

// --- Rule 4: age gate -------------------------------------------------------

/**
 * Every equation in this library was derived from and validated on adults.
 * Under 18, energy and body-composition needs depend on growth stage in ways
 * these equations do not model, so no number is produced at all.
 */
export const MINIMUM_ADULT_AGE = 18;

export type AgeGateVerdict =
  | { readonly allowed: true }
  | { readonly allowed: false; readonly reason: 'under_minimum_age'; readonly minimumAge: number };

/**
 * Gates calorie and body-fat output on adult age.
 *
 * Applies to energy and body-composition results specifically. Height-only
 * outputs such as a pace chart are unaffected, which is why this is called at
 * the point of those calculations rather than globally.
 */
export const guardAdultAge = (age: Years): AgeGateVerdict =>
  age < MINIMUM_ADULT_AGE
    ? { allowed: false, reason: 'under_minimum_age', minimumAge: MINIMUM_ADULT_AGE }
    : { allowed: true };

// --- Rule 5: neutral language ----------------------------------------------

/**
 * Terms that must never appear in site copy as a description of a person.
 *
 * The WHO category identifiers themselves (obesity_class_1 and so on) are
 * stable data keys, never rendered; their user-facing labels come from the
 * message catalogues and are stated once, factually, on the BMI page only.
 *
 * This list is enforced by a build-time content gate, not just by review.
 */
export const JUDGEMENT_LANGUAGE_PATTERNS: readonly RegExp[] = [
  /\byou(?:'re| are) (?:obese|overweight|fat)\b/i,
  /\bideal body\b/i,
  /\bdream body\b/i,
  /\bbeach body\b/i,
  /\bproblem areas?\b/i,
  /\bguilt(?:y|-free)\b/i,
  /\bshame\b/i,
  /\bbad foods?\b/i,
  /\bcheat (?:day|meal)\b/i,
  /\bburn off (?:that|those|your)\b/i,
];

/** Returns every judgement-language pattern that matches the given copy. */
export const findJudgementLanguage = (text: string): readonly string[] =>
  JUDGEMENT_LANGUAGE_PATTERNS.filter((pattern) => pattern.test(text)).map((p) => p.source);

// --- Rule 6: no extreme protocols ------------------------------------------

/**
 * Topics this site does not publish guidance on, at any length, in any locale.
 *
 * Each of these has a documented association with harm when followed from
 * general-audience web content without supervision.
 */
export const EXTREME_PROTOCOL_PATTERNS: readonly RegExp[] = [
  /\bvery[- ]low[- ]calorie diet\b/i,
  /\bvlcd\b/i,
  /\bcrash diet\b/i,
  /\bstarvation (?:diet|mode protocol)\b/i,
  /\bprolonged fast(?:ing)?\b/i,
  /\b(?:72|48)[- ]hour fast\b/i,
  /\bdry fast(?:ing)?\b/i,
  // Plural forms matter here: "weigh-ins" is the far more common phrasing, and
  // a trailing \b after "weigh-in" does not match before the "s".
  /\bwater (?:cut|cutting|load(?:ing)?) (?:for )?(?:weigh[- ]?ins?|competitions?)\b/i,
  /\bdehydrat(?:e|ing|ion) (?:to|for) (?:make|making) weight\b/i,
  /\bsweat suit\b/i,
  /\bpurg(?:e|ing)\b/i,
  /\bappetite suppress(?:ant|ion)\b/i,
  /\blaxative\b/i,
];

/** Returns every extreme-protocol pattern that matches the given copy. */
export const findExtremeProtocolContent = (text: string): readonly string[] =>
  EXTREME_PROTOCOL_PATTERNS.filter((pattern) => pattern.test(text)).map((p) => p.source);

// --- Rule 8: no fabricated reviewers ---------------------------------------

/**
 * Claims of human medical review or credentials that this site cannot honestly
 * make. There is no medical reviewer; the honest E-E-A-T signal available is
 * citing the published equations, which every calculator page does.
 */
export const FABRICATED_CREDENTIAL_PATTERNS: readonly RegExp[] = [
  /\b(?:medically )?reviewed by\b/i,
  /\bfact[- ]checked by\b/i,
  /\bwritten by dr\.?\b/i,
  /\bour (?:medical|expert|clinical) (?:team|board|panel)\b/i,
  /\bboard[- ]certified\b/i,
  /\bregistered dietitian on staff\b/i,
  /\bMD,? (?:PhD|RD)\b/,
];

/** Returns every fabricated-credential pattern that matches the given copy. */
export const findFabricatedCredentials = (text: string): readonly string[] =>
  FABRICATED_CREDENTIAL_PATTERNS.filter((pattern) => pattern.test(text)).map((p) => p.source);

// --- Combined content gate --------------------------------------------------

export interface ContentPolicyViolation {
  readonly rule: 'neutral_language' | 'extreme_protocol' | 'fabricated_credentials';
  readonly pattern: string;
}

/**
 * Single entry point for the build-time content gate.
 *
 * Runs over every rendered page and every message catalogue so a violation
 * fails the build rather than reaching a reader.
 */
export const findContentPolicyViolations = (text: string): readonly ContentPolicyViolation[] => [
  ...findJudgementLanguage(text).map((pattern): ContentPolicyViolation => ({
    rule: 'neutral_language',
    pattern,
  })),
  ...findExtremeProtocolContent(text).map((pattern): ContentPolicyViolation => ({
    rule: 'extreme_protocol',
    pattern,
  })),
  ...findFabricatedCredentials(text).map((pattern): ContentPolicyViolation => ({
    rule: 'fabricated_credentials',
    pattern,
  })),
];
