import { describe, expect, it } from 'vitest';
import {
  ARMY_ASSESSMENTS_PER_YEAR,
  ARMY_STANDARD_EFFECTIVE_DATE,
  ARMY_WHTR_PRECISION,
  ARMY_WHTR_THRESHOLD,
  armyBodyComposition,
  maxWaistForStandard,
  recordedWhtr,
  waistToHeightRatio,
} from './armybodyfat';
import { asCentimetres } from './units';

/**
 * Army Directive 2026-13, effective 7 July 2026. Waist-to-height ratio is the
 * Army's sole body composition assessment; the tape test, the height and weight
 * tables and all supplemental methods were rescinded.
 */
describe('current Army standard', () => {
  it('uses the published threshold and precision', () => {
    expect(ARMY_WHTR_THRESHOLD).toBe(0.55);
    expect(ARMY_WHTR_PRECISION).toBe(3);
    expect(ARMY_STANDARD_EFFECTIVE_DATE).toBe('2026-07-07');
    expect(ARMY_ASSESSMENTS_PER_YEAR).toBe(2);
  });

  it('computes waist divided by height', () => {
    expect(waistToHeightRatio(asCentimetres(85), asCentimetres(180))).toBeCloseTo(0.472222, 6);
    expect(waistToHeightRatio(asCentimetres(100), asCentimetres(180))).toBeCloseTo(0.555556, 6);
    expect(waistToHeightRatio(asCentimetres(80), asCentimetres(170))).toBeCloseTo(0.470588, 6);
  });

  it('is dimensionless, so unit choice cannot change the answer', () => {
    // The directive specifies inches, but a ratio of two lengths is unit-free.
    const inCm = waistToHeightRatio(asCentimetres(85), asCentimetres(180));
    expect(inCm).toBeCloseTo(85 / 180, 10);
  });

  it('applies no age or sex adjustment', () => {
    // Unlike every method it replaced, there is one threshold for everyone.
    // Asserted structurally: the function takes neither argument.
    expect(waistToHeightRatio.length).toBe(2);
  });
});

describe('recording precision', () => {
  it('records to three decimal places', () => {
    expect(recordedWhtr(0.472222)).toBe(0.472);
    expect(recordedWhtr(0.5555)).toBe(0.556);
    expect(recordedWhtr(0.5494)).toBe(0.549);
  });

  it('rounds before comparing, not after', () => {
    // 0.54996 is below 0.55 unrounded, but records as 0.550, which does not
    // meet a "less than, but not equal to" standard. Comparing the raw ratio
    // would pass someone the Army would not.
    expect(recordedWhtr(0.54996)).toBe(0.55);
    expect(recordedWhtr(0.54996) < ARMY_WHTR_THRESHOLD).toBe(false);
  });
});

describe('meeting the standard', () => {
  it('passes a ratio below the threshold', () => {
    const result = armyBodyComposition(asCentimetres(85), asCentimetres(180));
    expect(result.recorded).toBe(0.472);
    expect(result.meetsStandard).toBe(true);
  });

  it('fails a ratio above the threshold', () => {
    const result = armyBodyComposition(asCentimetres(100), asCentimetres(180));
    expect(result.recorded).toBe(0.556);
    expect(result.meetsStandard).toBe(false);
  });

  it('fails a ratio of exactly 0.550, because the inequality is strict', () => {
    // 99 cm at 180 cm is exactly 0.55.
    const result = armyBodyComposition(asCentimetres(99), asCentimetres(180));
    expect(result.recorded).toBe(0.55);
    expect(result.meetsStandard).toBe(false);
  });

  it('passes the largest recorded value below the threshold', () => {
    const height = asCentimetres(180);
    // 0.549 x 180 = 98.82 cm
    const result = armyBodyComposition(asCentimetres(98.82), height);
    expect(result.recorded).toBe(0.549);
    expect(result.meetsStandard).toBe(true);
  });
});

describe('largest passing waist', () => {
  it('returns a waist that actually meets the standard', () => {
    // The naive supremum height x 0.5495 records as 0.550 and fails; the
    // returned value must pass when fed back through the assessment.
    for (const heightCm of [155, 160, 165, 170, 175, 180, 185, 190, 195, 200]) {
      const height = asCentimetres(heightCm);
      const maxWaist = maxWaistForStandard(height);
      const check = armyBodyComposition(asCentimetres(maxWaist), height);
      expect(check.meetsStandard).toBe(true);
    }
  });

  it('returns a value one tenth of a centimetre below a failing waist', () => {
    for (const heightCm of [160, 175, 180, 190]) {
      const height = asCentimetres(heightCm);
      const maxWaist = maxWaistForStandard(height);
      const justOver = Math.round((maxWaist + 0.1) * 10) / 10;
      expect(armyBodyComposition(asCentimetres(justOver), height).meetsStandard).toBe(false);
    }
  });

  it('scales with height', () => {
    expect(maxWaistForStandard(asCentimetres(190))).toBeGreaterThan(
      maxWaistForStandard(asCentimetres(170))
    );
  });

  it('is reported alongside every assessment', () => {
    const result = armyBodyComposition(asCentimetres(85), asCentimetres(180));
    expect(result.maxWaistCm).toBe(maxWaistForStandard(asCentimetres(180)));
  });
});
