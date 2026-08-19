import {
  capDeficit,
  dailyEnergyChangeForPreset,
  enforceCalorieFloor,
  guardAdultAge,
  guardGoalWeight,
  type GoalPresetId,
} from './guards';
import type { Centimetres, Kilograms, Years } from './units';
import type { Sex } from './validation';

/**
 * Daily calorie target for a goal.
 *
 * This is the single most safety-sensitive output on the site, so every guard in
 * guards.ts converges here. The order matters: refusals are evaluated before
 * any number is computed, and the calorie floor is applied last so that it
 * cannot be undone by a later adjustment.
 */

/**
 * Reasons the calculator declines to produce a target at all.
 * Each carries the data the page needs to show something useful instead.
 */
export type CalorieGoalRefusal =
  | { readonly reason: 'under_minimum_age'; readonly minimumAge: number }
  | {
      readonly reason: 'goal_below_healthy_bmi';
      readonly goalBmi: number;
      readonly healthyRange: { readonly minKg: number; readonly maxKg: number };
    };

/**
 * Adjustments applied to the requested plan.
 *
 * Returned as identifiers with parameters rather than prose, so the same result
 * renders correctly in all ten locales without English leaking through.
 */
export type CalorieAdjustment =
  | { readonly id: 'deficit_capped'; readonly requested: number; readonly cap: number }
  | { readonly id: 'calorie_floor_applied'; readonly floor: number; readonly implied: number };

export type CalorieGoalResult =
  | { readonly ok: false; readonly refusal: CalorieGoalRefusal }
  | {
      readonly ok: true;
      readonly calories: number;
      readonly maintenanceCalories: number;
      readonly dailyChange: number;
      readonly adjustments: readonly CalorieAdjustment[];
    };

export interface CalorieGoalInput {
  readonly tdee: number;
  readonly sex: Sex;
  readonly age: Years;
  readonly preset: GoalPresetId;
  /** Supplied together to enable the goal-weight guard; both or neither. */
  readonly height?: Centimetres;
  readonly goalWeight?: Kilograms;
}

export const calorieGoal = (input: CalorieGoalInput): CalorieGoalResult => {
  // Rule 4 first: under 18, no energy result is produced at all.
  const ageVerdict = guardAdultAge(input.age);
  if (!ageVerdict.allowed) {
    return {
      ok: false,
      refusal: { reason: 'under_minimum_age', minimumAge: ageVerdict.minimumAge },
    };
  }

  // Rule 3: never plan toward a target below the healthy BMI band.
  if (input.height !== undefined && input.goalWeight !== undefined) {
    const goalVerdict = guardGoalWeight(input.goalWeight, input.height);
    if (!goalVerdict.allowed) {
      return {
        ok: false,
        refusal: {
          reason: 'goal_below_healthy_bmi',
          goalBmi: goalVerdict.goalBmi,
          healthyRange: goalVerdict.healthyRange,
        },
      };
    }
  }

  const adjustments: CalorieAdjustment[] = [];
  const requestedChange = dailyEnergyChangeForPreset(input.preset);

  let dailyChange = requestedChange;

  // Rule 2: cap deficits. Surpluses are not capped by this rule, but they are
  // bounded by the preset set, which offers no aggressive gain option.
  if (requestedChange < 0) {
    const requestedDeficit = Math.abs(requestedChange);
    const capped = capDeficit(requestedDeficit, input.tdee);
    if (capped.capped) {
      adjustments.push({ id: 'deficit_capped', requested: requestedDeficit, cap: capped.cap });
    }
    dailyChange = -capped.deficit;
  }

  const impliedCalories = input.tdee + dailyChange;

  // Rule 1 last, so nothing can lower the result afterwards.
  const floored = enforceCalorieFloor(impliedCalories, input.sex);
  if (floored.clamped) {
    adjustments.push({
      id: 'calorie_floor_applied',
      floor: floored.floor,
      implied: impliedCalories,
    });
  }

  return {
    ok: true,
    calories: floored.calories,
    maintenanceCalories: input.tdee,
    dailyChange: floored.calories - input.tdee,
    adjustments,
  };
};
