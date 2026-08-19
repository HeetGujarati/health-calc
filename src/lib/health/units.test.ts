import { describe, expect, it } from 'vitest';
import {
  CM_PER_INCH,
  KG_PER_POUND,
  asCentimetres,
  asGrams,
  asInches,
  asKilograms,
  asPounds,
  asSeconds,
  centimetresToInches,
  centimetresToMetres,
  feetAndInchesToInches,
  gramsToKilograms,
  inchesToCentimetres,
  inchesToFeetAndInches,
  kilogramsToGrams,
  kilogramsToPounds,
  poundsToKilograms,
  secondsToHours,
} from './units';

/**
 * The conversion factors are exact by international agreement (1959), so these
 * assert exact equality where the arithmetic permits it, and full
 * floating-point closeness on round trips.
 */
describe('unit conversions', () => {
  it('uses the exact internationally defined factors', () => {
    expect(KG_PER_POUND).toBe(0.45359237);
    expect(CM_PER_INCH).toBe(2.54);
  });

  it('converts mass against known reference values', () => {
    // 1 lb is exactly 0.45359237 kg by definition.
    expect(poundsToKilograms(asPounds(1))).toBe(0.45359237);
    // 220.462... lb is about 100 kg.
    expect(kilogramsToPounds(asKilograms(100))).toBeCloseTo(220.462262, 6);
    expect(kilogramsToGrams(asKilograms(2.5))).toBe(2500);
    expect(gramsToKilograms(asGrams(2500))).toBe(2.5);
  });

  it('converts length against known reference values', () => {
    expect(inchesToCentimetres(asInches(1))).toBe(2.54);
    // 6 ft = 72 in = 182.88 cm exactly.
    expect(inchesToCentimetres(asInches(72))).toBeCloseTo(182.88, 10);
    expect(centimetresToInches(asCentimetres(182.88))).toBeCloseTo(72, 10);
    expect(centimetresToMetres(asCentimetres(175))).toBe(1.75);
  });

  it('round-trips mass without meaningful precision loss', () => {
    for (const kg of [45, 63.5, 70, 82.3, 120, 399.9]) {
      const roundTripped = poundsToKilograms(kilogramsToPounds(asKilograms(kg)));
      expect(roundTripped).toBeCloseTo(kg, 10);
    }
  });

  it('round-trips length without meaningful precision loss', () => {
    for (const cm of [50, 152.4, 175, 180.5, 259.9]) {
      const roundTripped = inchesToCentimetres(centimetresToInches(asCentimetres(cm)));
      expect(roundTripped).toBeCloseTo(cm, 10);
    }
  });

  it('composes and decomposes feet and inches', () => {
    expect(feetAndInchesToInches(5, 10)).toBe(70);
    expect(feetAndInchesToInches(6, 0)).toBe(72);
    expect(inchesToFeetAndInches(asInches(70))).toEqual({ feet: 5, inches: 10 });
    expect(inchesToFeetAndInches(asInches(72))).toEqual({ feet: 6, inches: 0 });
  });

  it('rolls 11.6 inches up to the next foot rather than reporting 12 inches', () => {
    // Rounding happens on the total before splitting, so the display can never
    // read "5 ft 12 in".
    expect(inchesToFeetAndInches(asInches(71.6))).toEqual({ feet: 6, inches: 0 });
  });

  it('converts durations', () => {
    expect(secondsToHours(asSeconds(3600))).toBe(1);
    expect(secondsToHours(asSeconds(1800))).toBe(0.5);
  });
});
