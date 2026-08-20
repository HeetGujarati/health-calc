import { describe, expect, it } from 'vitest';
import { fibrePerPoint, FOOD_SCORE_DIVISORS, foodScore } from './foodscore';

/**
 * Food score.
 *
 * The anchor is the worked example in the patent specification itself —
 * 270 kcal, 14 g fat, 4 g fibre — which the document carries through to a
 * result. Pinning against the source rather than against another calculator is
 * the whole point: every reproduction of this formula on the web adds a 4 g
 * fibre cap that appears nowhere in the patent, so agreeing with them would be
 * evidence of nothing.
 *
 * The absence of that cap is therefore tested directly, as is the zero floor,
 * because both are places where this implementation deliberately differs from
 * what a reader might expect if they have seen the formula elsewhere.
 */

describe('food score', () => {
  it('reproduces the worked example from the patent specification', () => {
    // 270/50 + 14/12 − 4/5 = 5.4 + 1.1667 − 0.8 = 5.7667 → 6
    const result = foodScore({ kcal: 270, fatGrams: 14, fibreGrams: 4 });
    expect(result.raw).toBeCloseTo(5.766_67, 4);
    expect(result.score).toBe(6);
  });

  it('uses the divisors the specification states', () => {
    expect(FOOD_SCORE_DIVISORS).toEqual({ kcal: 50, fatGrams: 12, fibreGrams: 5 });
  });

  it('breaks the score into the three terms that produced it', () => {
    const result = foodScore({ kcal: 200, fatGrams: 6, fibreGrams: 10 });
    expect(result.fromCalories).toBeCloseTo(4, 10);
    expect(result.fromFat).toBeCloseTo(0.5, 10);
    expect(result.fromFibre).toBeCloseTo(2, 10);
    expect(result.raw).toBeCloseTo(2.5, 10);
  });

  it('does not cap fibre at four grams', () => {
    // The single most-copied error in reproductions of this formula. With a cap
    // these two would score the same; without one, fibre keeps subtracting.
    const capped = foodScore({ kcal: 300, fatGrams: 10, fibreGrams: 4 });
    const uncapped = foodScore({ kcal: 300, fatGrams: 10, fibreGrams: 12 });
    expect(uncapped.raw).toBeLessThan(capped.raw);
    expect(uncapped.raw).toBeCloseTo(capped.raw - 8 / 5, 10);
  });

  it('rounds half away from zero', () => {
    // 275/50 = 5.5 exactly, no fat, no fibre.
    expect(foodScore({ kcal: 275, fatGrams: 0, fibreGrams: 0 }).score).toBe(6);
    // 225/50 = 4.5 exactly.
    expect(foodScore({ kcal: 225, fatGrams: 0, fibreGrams: 0 }).score).toBe(5);
  });

  it('floors a negative score at zero and says it did', () => {
    // Enough fibre against few enough calories drives the difference negative.
    // A negative food value is meaningless, and the patent's claims require a
    // whole number, so it is clamped — but not silently.
    const result = foodScore({ kcal: 20, fatGrams: 0, fibreGrams: 30 });
    expect(result.raw).toBeLessThan(0);
    expect(result.score).toBe(0);
    expect(result.floored).toBe(true);
  });

  it('does not report flooring when the score is legitimately zero', () => {
    const result = foodScore({ kcal: 0, fatGrams: 0, fibreGrams: 0 });
    expect(result.score).toBe(0);
    expect(result.floored).toBe(false);
  });

  it('rises with calories and fat, falls with fibre', () => {
    const base = foodScore({ kcal: 200, fatGrams: 8, fibreGrams: 2 }).raw;
    expect(foodScore({ kcal: 300, fatGrams: 8, fibreGrams: 2 }).raw).toBeGreaterThan(base);
    expect(foodScore({ kcal: 200, fatGrams: 16, fibreGrams: 2 }).raw).toBeGreaterThan(base);
    expect(foodScore({ kcal: 200, fatGrams: 8, fibreGrams: 6 }).raw).toBeLessThan(base);
  });

  it('weights a gram of fat at roughly four times a gram of fibre', () => {
    // 1/12 against 1/5. Worth pinning because it is the formula's one real
    // editorial claim, and the page states it in words.
    const perFatGram = 1 / FOOD_SCORE_DIVISORS.fatGrams;
    const perFibreGram = 1 / FOOD_SCORE_DIVISORS.fibreGrams;
    expect(perFibreGram / perFatGram).toBeCloseTo(2.4, 10);
  });

  it('reports how much fibre cancels one point', () => {
    expect(fibrePerPoint()).toBe(5);
    const withoutFibre = foodScore({ kcal: 250, fatGrams: 0, fibreGrams: 0 }).raw;
    const withFibre = foodScore({ kcal: 250, fatGrams: 0, fibreGrams: fibrePerPoint() }).raw;
    expect(withoutFibre - withFibre).toBeCloseTo(1, 10);
  });
});
