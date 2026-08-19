import { describe, expect, it } from 'vitest';
import { calorieGoal } from './calories';
import { asCentimetres, asKilograms, asYears } from './units';

/**
 * The composition of every safety guard. These tests assert the guards fire
 * through the public entry point that the UI actually calls, not just in
 * isolation — a guard that works alone but is bypassed by the caller protects
 * nobody.
 */
describe('calorie goal', () => {
  const adult = { sex: 'male' as const, age: asYears(30) };

  it('returns maintenance calories for the maintain preset', () => {
    const result = calorieGoal({ tdee: 2500, ...adult, preset: 'maintain' });
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error('expected success');
    expect(result.calories).toBe(2500);
    expect(result.dailyChange).toBe(0);
    expect(result.adjustments).toHaveLength(0);
  });

  it('applies an uncapped deficit when it sits under the cap', () => {
    // 25% of 3000 is 750; the 550 kcal steady-loss deficit is below it.
    const result = calorieGoal({ tdee: 3000, ...adult, preset: 'steady_loss' });
    if (!result.ok) throw new Error('expected success');
    expect(result.calories).toBeCloseTo(2450, 10);
    expect(result.adjustments).toHaveLength(0);
  });

  it('caps a deficit that exceeds 25 percent of TDEE', () => {
    // 25% of 2000 is 500, so the 550 kcal preset is trimmed.
    const result = calorieGoal({ tdee: 2000, ...adult, preset: 'steady_loss' });
    if (!result.ok) throw new Error('expected success');
    expect(result.calories).toBe(1500);
    expect(result.adjustments).toContainEqual({
      id: 'deficit_capped',
      requested: 550,
      cap: 500,
    });
  });

  it('applies the calorie floor and reports it', () => {
    // TDEE 1400, female: 25% cap is 350, implying 1050, which is below the
    // 1200 floor.
    const result = calorieGoal({
      tdee: 1400,
      sex: 'female',
      age: asYears(30),
      preset: 'steady_loss',
    });
    if (!result.ok) throw new Error('expected success');
    expect(result.calories).toBe(1200);
    expect(result.adjustments).toContainEqual({
      id: 'calorie_floor_applied',
      floor: 1200,
      implied: 1050,
    });
  });

  it('never returns a target below the floor, across the whole plausible range', () => {
    for (let tdee = 800; tdee <= 4000; tdee += 100) {
      for (const preset of ['gradual_loss', 'steady_loss'] as const) {
        const male = calorieGoal({ tdee, sex: 'male', age: asYears(30), preset });
        const female = calorieGoal({ tdee, sex: 'female', age: asYears(30), preset });
        if (male.ok) expect(male.calories).toBeGreaterThanOrEqual(1500);
        if (female.ok) expect(female.calories).toBeGreaterThanOrEqual(1200);
      }
    }
  });

  it('never applies a deficit greater than the cap, across the whole range', () => {
    for (let tdee = 1200; tdee <= 5000; tdee += 100) {
      const result = calorieGoal({ tdee, ...adult, preset: 'steady_loss' });
      if (!result.ok) continue;
      const appliedDeficit = tdee - result.calories;
      // The floor can raise the target, which only ever shrinks the deficit.
      expect(appliedDeficit).toBeLessThanOrEqual(Math.min(0.25 * tdee, 1000) + 1e-9);
    }
  });

  it('adds a surplus for gain presets', () => {
    const result = calorieGoal({ tdee: 2500, ...adult, preset: 'steady_gain' });
    if (!result.ok) throw new Error('expected success');
    expect(result.calories).toBeCloseTo(3050, 10);
  });

  it('does not cap surpluses using the deficit cap', () => {
    // 25% of 1600 is 400, below the 550 surplus; the cap must not apply here.
    const result = calorieGoal({ tdee: 1600, ...adult, preset: 'steady_gain' });
    if (!result.ok) throw new Error('expected success');
    expect(result.calories).toBeCloseTo(2150, 10);
    expect(result.adjustments).toHaveLength(0);
  });
});

describe('refusals', () => {
  it('produces no calorie figure at all under 18', () => {
    const result = calorieGoal({
      tdee: 2200,
      sex: 'male',
      age: asYears(16),
      preset: 'steady_loss',
    });
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('expected refusal');
    expect(result.refusal.reason).toBe('under_minimum_age');
    // Critically, there is no number anywhere on the result to render.
    expect(result).not.toHaveProperty('calories');
  });

  it('refuses to plan toward a goal weight below the healthy BMI band', () => {
    const result = calorieGoal({
      tdee: 2200,
      sex: 'female',
      age: asYears(30),
      preset: 'steady_loss',
      height: asCentimetres(170),
      goalWeight: asKilograms(45),
    });
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('expected refusal');
    if (result.refusal.reason !== 'goal_below_healthy_bmi') throw new Error('wrong refusal');
    expect(result.refusal.goalBmi).toBeCloseTo(15.570934, 6);
    expect(result.refusal.healthyRange.minKg).toBeCloseTo(53.465, 3);
    expect(result.refusal.healthyRange.maxKg).toBeCloseTo(72.25, 3);
  });

  it('allows a goal weight inside the healthy band', () => {
    const result = calorieGoal({
      tdee: 2200,
      sex: 'female',
      age: asYears(30),
      preset: 'steady_loss',
      height: asCentimetres(170),
      goalWeight: asKilograms(60),
    });
    expect(result.ok).toBe(true);
  });

  it('checks age before goal weight, so a minor never sees a weight target', () => {
    const result = calorieGoal({
      tdee: 2200,
      sex: 'female',
      age: asYears(15),
      preset: 'steady_loss',
      height: asCentimetres(170),
      goalWeight: asKilograms(45),
    });
    if (result.ok) throw new Error('expected refusal');
    expect(result.refusal.reason).toBe('under_minimum_age');
  });
});
