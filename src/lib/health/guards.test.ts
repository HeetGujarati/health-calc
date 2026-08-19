import { describe, expect, it } from 'vitest';
import {
  CALORIE_FLOORS,
  GOAL_PRESETS,
  KCAL_PER_KG_BODY_MASS,
  MAX_DEFICIT_FRACTION_OF_TDEE,
  MAX_DEFICIT_KCAL,
  MINIMUM_ADULT_AGE,
  capDeficit,
  dailyEnergyChangeForPreset,
  enforceCalorieFloor,
  findContentPolicyViolations,
  findExtremeProtocolContent,
  findFabricatedCredentials,
  findJudgementLanguage,
  guardAdultAge,
  guardGoalWeight,
} from './guards';
import { asCentimetres, asKilograms, asYears } from './units';

/**
 * Every rule in section 4.3 of the brief, tested as enforced behaviour rather
 * than as documentation. These are the tests that must never be relaxed.
 */

describe('rule 1: calorie floor', () => {
  it('uses the specified floors', () => {
    expect(CALORIE_FLOORS.male).toBe(1500);
    expect(CALORIE_FLOORS.female).toBe(1200);
  });

  it('raises targets below the floor and reports the clamp', () => {
    expect(enforceCalorieFloor(1000, 'female')).toEqual({
      calories: 1200,
      clamped: true,
      floor: 1200,
    });
    expect(enforceCalorieFloor(1400, 'male')).toEqual({
      calories: 1500,
      clamped: true,
      floor: 1500,
    });
  });

  it('leaves targets at or above the floor untouched', () => {
    expect(enforceCalorieFloor(1200, 'female')).toEqual({
      calories: 1200,
      clamped: false,
      floor: 1200,
    });
    expect(enforceCalorieFloor(2200, 'male')).toEqual({
      calories: 2200,
      clamped: false,
      floor: 1500,
    });
  });

  it('never emits a number below the floor for any input, including absurd ones', () => {
    for (const requested of [-5000, -1, 0, 1, 900, 1199]) {
      expect(enforceCalorieFloor(requested, 'female').calories).toBeGreaterThanOrEqual(1200);
      expect(enforceCalorieFloor(requested, 'male').calories).toBeGreaterThanOrEqual(1500);
    }
  });
});

describe('rule 2: deficit cap', () => {
  it('uses the specified cap parameters', () => {
    expect(MAX_DEFICIT_FRACTION_OF_TDEE).toBe(0.25);
    expect(MAX_DEFICIT_KCAL).toBe(1000);
  });

  it('caps at 25 percent of TDEE when that is the lesser bound', () => {
    // 25% of 2000 = 500, which is below the 1000 absolute cap.
    expect(capDeficit(550, 2000)).toEqual({ deficit: 500, capped: true, cap: 500 });
  });

  it('caps at 1000 kcal when the percentage would exceed it', () => {
    // 25% of 8000 = 2000, so the absolute cap binds instead.
    expect(capDeficit(1500, 8000)).toEqual({ deficit: 1000, capped: true, cap: 1000 });
  });

  it('leaves deficits below the cap untouched', () => {
    // 25% of 3000 = 750, and 550 is under it.
    expect(capDeficit(550, 3000)).toEqual({ deficit: 550, capped: false, cap: 750 });
  });

  it('treats a negative requested deficit as zero rather than a surplus', () => {
    // Guards against a sign error upstream silently becoming a surplus.
    expect(capDeficit(-800, 2500).deficit).toBe(0);
  });

  it('offers no preset faster than 0.5 kg per week in either direction', () => {
    for (const preset of GOAL_PRESETS) {
      expect(Math.abs(preset.kgPerWeek)).toBeLessThanOrEqual(0.5);
    }
  });

  it('uses only the permitted preset identifiers', () => {
    // The brief fixes this list; no "aggressive", "extreme", "crash" or "rapid"
    // preset may be added without this test failing first.
    expect(GOAL_PRESETS.map((p) => p.id)).toEqual([
      'maintain',
      'gradual_loss',
      'steady_loss',
      'gradual_gain',
      'steady_gain',
    ]);
  });

  it('converts preset rates to daily energy using the published equivalent', () => {
    expect(KCAL_PER_KG_BODY_MASS).toBe(7700);
    expect(dailyEnergyChangeForPreset('maintain')).toBe(0);
    // 0.25 kg/week x 7700 / 7
    expect(dailyEnergyChangeForPreset('gradual_loss')).toBeCloseTo(-275, 10);
    expect(dailyEnergyChangeForPreset('steady_loss')).toBeCloseTo(-550, 10);
    expect(dailyEnergyChangeForPreset('gradual_gain')).toBeCloseTo(275, 10);
    expect(dailyEnergyChangeForPreset('steady_gain')).toBeCloseTo(550, 10);
  });
});

describe('rule 3: goal weight guard', () => {
  it('allows goals at or above BMI 18.5', () => {
    // 57 kg at 175 cm is BMI 18.61.
    expect(guardGoalWeight(asKilograms(57), asCentimetres(175))).toEqual({ allowed: true });
  });

  it('refuses goals below BMI 18.5 and returns the healthy range instead', () => {
    const verdict = guardGoalWeight(asKilograms(45), asCentimetres(175));
    expect(verdict.allowed).toBe(false);
    if (verdict.allowed) throw new Error('expected refusal');
    expect(verdict.reason).toBe('below_healthy_bmi');
    expect(verdict.goalBmi).toBeCloseTo(14.693878, 6);
    expect(verdict.healthyRange.minKg).toBeCloseTo(56.65625, 6);
    expect(verdict.healthyRange.maxKg).toBeCloseTo(76.5625, 6);
  });

  it('treats exactly BMI 18.5 as allowed', () => {
    // 18.5 * 1.75^2 = 56.65625 kg
    expect(guardGoalWeight(asKilograms(56.65625), asCentimetres(175)).allowed).toBe(true);
  });

  it('refuses a goal just below the boundary', () => {
    expect(guardGoalWeight(asKilograms(56.6), asCentimetres(175)).allowed).toBe(false);
  });
});

describe('rule 4: adult age gate', () => {
  it('gates below 18', () => {
    expect(MINIMUM_ADULT_AGE).toBe(18);
    for (const age of [0, 5, 12, 17, 17.9]) {
      const verdict = guardAdultAge(asYears(age));
      expect(verdict.allowed).toBe(false);
      if (!verdict.allowed) expect(verdict.reason).toBe('under_minimum_age');
    }
  });

  it('allows 18 and above', () => {
    for (const age of [18, 25, 65, 100]) {
      expect(guardAdultAge(asYears(age)).allowed).toBe(true);
    }
  });
});

describe('rule 5: neutral language', () => {
  it('flags judgement framing', () => {
    expect(findJudgementLanguage('You are obese according to this result.')).not.toHaveLength(0);
    expect(findJudgementLanguage('Reach your ideal body in six weeks.')).not.toHaveLength(0);
    expect(findJudgementLanguage('Target those problem areas.')).not.toHaveLength(0);
    expect(findJudgementLanguage('Enjoy a guilt-free treat.')).not.toHaveLength(0);
    expect(findJudgementLanguage('Burn off that pizza.')).not.toHaveLength(0);
  });

  it('permits factual, neutral statements of the same subject', () => {
    expect(
      findJudgementLanguage(
        'A BMI of 31 falls in the WHO obesity class I band. BMI does not distinguish muscle from fat.'
      )
    ).toHaveLength(0);
    expect(
      findJudgementLanguage('This estimate comes from a population-level equation.')
    ).toHaveLength(0);
  });
});

describe('rule 6: no extreme protocols', () => {
  it('flags prohibited protocol content', () => {
    expect(
      findExtremeProtocolContent('Try a very-low-calorie diet for fast results.')
    ).not.toHaveLength(0);
    expect(findExtremeProtocolContent('A 72-hour fast resets metabolism.')).not.toHaveLength(0);
    expect(findExtremeProtocolContent('Water cutting for weigh-ins works well.')).not.toHaveLength(
      0
    );
    expect(findExtremeProtocolContent('Use a sweat suit before the weigh-in.')).not.toHaveLength(0);
    expect(findExtremeProtocolContent('An appetite suppressant helps.')).not.toHaveLength(0);
  });

  it('permits neutral mention of eating patterns that are not extreme', () => {
    expect(
      findExtremeProtocolContent('Some people eat within an eight-hour window; evidence is mixed.')
    ).toHaveLength(0);
  });
});

describe('rule 8: no fabricated reviewers or credentials', () => {
  it('flags invented review and credential claims', () => {
    expect(findFabricatedCredentials('Medically reviewed by Dr. Jane Doe')).not.toHaveLength(0);
    expect(findFabricatedCredentials('Fact-checked by our clinical team')).not.toHaveLength(0);
    expect(findFabricatedCredentials('Our medical board approves this content.')).not.toHaveLength(
      0
    );
    expect(findFabricatedCredentials('Written by Dr. Smith')).not.toHaveLength(0);
  });

  it('permits honest sourcing of the equations themselves', () => {
    expect(
      findFabricatedCredentials(
        'The equation comes from Mifflin MD, St Jeor ST et al., Am J Clin Nutr 51(2), 1990.'
      )
    ).toHaveLength(0);
  });
});

describe('combined content gate', () => {
  it('reports the rule each violation belongs to', () => {
    const violations = findContentPolicyViolations(
      'Medically reviewed by Dr. Doe. Try a crash diet to fix those problem areas.'
    );
    const rules = new Set(violations.map((v) => v.rule));
    expect(rules.has('fabricated_credentials')).toBe(true);
    expect(rules.has('extreme_protocol')).toBe(true);
    expect(rules.has('neutral_language')).toBe(true);
  });

  it('passes clean, factual copy', () => {
    expect(
      findContentPolicyViolations(
        'This estimate uses the Mifflin-St Jeor equation. Individual needs vary, and this is not medical advice.'
      )
    ).toHaveLength(0);
  });
});
