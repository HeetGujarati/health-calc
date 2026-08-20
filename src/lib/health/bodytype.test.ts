import { describe, expect, it } from 'vitest';
import { assessBuild, FRAME_CUTOFFS, frameRatio, frameSize } from './bodytype';
import { asCentimetres, asKilograms } from './units';

/**
 * Build and frame size.
 *
 * The behaviour worth pinning here is not accuracy — the module makes no
 * accuracy claim — but that the classification is monotonic, that the
 * counter-intuitive direction of the ratio holds, and that the `mixed` flag
 * fires whenever frame and BMI disagree. That flag is the most useful output on
 * the page, because it is the case where the three-label scheme does not
 * describe the person in front of it.
 */

const H = asCentimetres(175);

describe('frame ratio', () => {
  it('is height divided by wrist circumference', () => {
    expect(frameRatio(H, asCentimetres(17.5))).toBe(10);
  });

  it('returns zero rather than infinity for a zero wrist', () => {
    // Not reachable through the form, but the compute function is callable with
    // query-string values and a division by zero would render as "Infinity".
    expect(frameRatio(H, asCentimetres(0))).toBe(0);
    expect(frameRatio(H, asCentimetres(-4))).toBe(0);
  });

  it('rises as the wrist gets slighter for a given height', () => {
    expect(frameRatio(H, asCentimetres(16))).toBeGreaterThan(frameRatio(H, asCentimetres(19)));
  });
});

describe('frame size', () => {
  it('reads a slighter wrist as a smaller frame, not a larger one', () => {
    // The direction is counter-intuitive: a *higher* height-to-wrist ratio means
    // a small frame. Getting this backwards would invert every result.
    expect(frameSize(H, asCentimetres(15), 'male')).toBe('small');
    expect(frameSize(H, asCentimetres(21), 'male')).toBe('large');
  });

  it('places the medium band between the two cut-points', () => {
    const { small, large } = FRAME_CUTOFFS.male;
    const wristFor = (ratio: number) => asCentimetres(175 / ratio);

    expect(frameSize(H, wristFor(small + 0.5), 'male')).toBe('small');
    expect(frameSize(H, wristFor((small + large) / 2), 'male')).toBe('medium');
    expect(frameSize(H, wristFor(large - 0.5), 'male')).toBe('large');
  });

  it('treats a ratio exactly on a cut-point as medium', () => {
    const { small, large } = FRAME_CUTOFFS.female;
    const wristFor = (ratio: number) => asCentimetres(175 / ratio);

    expect(frameSize(H, wristFor(small), 'female')).toBe('medium');
    expect(frameSize(H, wristFor(large), 'female')).toBe('medium');
  });

  it('uses different cut-points for the two reference populations', () => {
    // The same measurements classify differently, which is a property of the
    // published tables rather than of the skeleton.
    const wrist = asCentimetres(16.5);
    expect(FRAME_CUTOFFS.male.small).not.toBe(FRAME_CUTOFFS.female.small);
    expect(frameSize(H, wrist, 'male')).not.toBe(frameSize(H, wrist, 'female'));
  });
});

describe('build assessment', () => {
  const slight = asCentimetres(15);
  const broad = asCentimetres(21);

  it('reads a slight frame carrying little mass as ectomorph', () => {
    const result = assessBuild(H, asKilograms(55), slight, 'male');
    expect(result.frame).toBe('small');
    expect(result.label).toBe('ectomorph');
    expect(result.mixed).toBe(false);
  });

  it('reads a broad frame carrying more mass as endomorph', () => {
    const result = assessBuild(H, asKilograms(95), broad, 'male');
    expect(result.frame).toBe('large');
    expect(result.label).toBe('endomorph');
    expect(result.mixed).toBe(false);
  });

  it('falls back to mesomorph for everything in between', () => {
    const result = assessBuild(H, asKilograms(72), asCentimetres(17.5), 'male');
    expect(result.label).toBe('mesomorph');
  });

  it('flags a slight frame carrying a high BMI as mixed', () => {
    // The most useful output the page has: the scheme does not fit this person,
    // and that is a fact about the scheme.
    const result = assessBuild(H, asKilograms(95), slight, 'male');
    expect(result.frame).toBe('small');
    expect(result.mixed).toBe(true);
  });

  it('flags a broad frame carrying a low BMI as mixed', () => {
    const result = assessBuild(H, asKilograms(55), broad, 'male');
    expect(result.frame).toBe('large');
    expect(result.mixed).toBe(true);
  });

  it('never reports mixed and a non-mesomorph label together', () => {
    // A mixed result means frame and BMI disagree, so neither extreme label can
    // apply. If both were ever true the page would contradict itself.
    for (const wrist of [15, 16, 17, 18, 19, 20, 21]) {
      for (const mass of [50, 60, 70, 80, 90, 100]) {
        for (const sex of ['male', 'female'] as const) {
          const result = assessBuild(H, asKilograms(mass), asCentimetres(wrist), sex);
          if (result.mixed) expect(result.label).toBe('mesomorph');
        }
      }
    }
  });

  it('reports the BMI it used, so the label can be checked against it', () => {
    const result = assessBuild(H, asKilograms(70), asCentimetres(17), 'female');
    expect(result.bmi).toBeCloseTo(70 / 1.75 ** 2, 6);
    expect(result.ratio).toBeCloseTo(175 / 17, 6);
  });
});
