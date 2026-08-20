/**
 * Somatotype — ectomorph, mesomorph, endomorph.
 *
 * This module needs a warning its neighbours do not. Every other formula on
 * this site is a regression fitted to measured data, and the accuracy notes
 * argue about how well it generalises. Somatotype is not that. It began as
 * William Sheldon's constitutional psychology in the 1940s, which claimed
 * physique predicted temperament and criminality, and that claim was discredited
 * — the photographic method it rested on is now better known as a scandal than
 * as science.
 *
 * What survives is the Heath-Carter anthropometric method, which is a real
 * measurement protocol still used in sports science to describe physique. It
 * needs skinfold calipers at four sites, two bone breadths and two limb girths.
 * A web form asking for height, weight and a wrist measurement cannot produce a
 * Heath-Carter somatotype and should not pretend to.
 *
 * So this module implements what it can honestly implement: a **frame size**
 * classification from the wrist-to-height ratio, which is a real published
 * measure of skeletal build, plus body mass index. The three somatotype names
 * are reported as the loose descriptive labels they are, derived from those two
 * figures, and the page says in plain words that this is a description of build
 * rather than a measurement of anything and predicts nothing about personality,
 * metabolism or what training will work.
 *
 * Naming it honestly in the code matters as much as on the page: nothing here
 * is called `somatotype`, because that would imply Heath-Carter.
 */
import { bodyMassIndex } from './bmi';
import type { Centimetres, Kilograms } from './units';

export type FrameSize = 'small' | 'medium' | 'large';

/** The three descriptive build labels people arrive looking for. */
export type BuildLabel = 'ectomorph' | 'mesomorph' | 'endomorph';

/**
 * Frame size from the ratio of height to wrist circumference.
 *
 * The cut-points are the ones published in the Metropolitan Life tables and
 * still reproduced in clinical nutrition texts. They are sex-specific because
 * the reference populations were, not because the underlying skeleton scales
 * differently.
 *
 * Grant J.P., "Handbook of Total Parenteral Nutrition", 2nd ed., 1992 — the
 * height/wrist ratio cut-points as usually reproduced.
 */
export const FRAME_CUTOFFS = {
  male: { small: 10.4, large: 9.6 },
  female: { small: 11.0, large: 10.1 },
} as const;

export type FrameSex = keyof typeof FRAME_CUTOFFS;

/**
 * Height divided by wrist circumference, both in centimetres.
 *
 * A larger ratio means a slighter wrist for the height, which is the small
 * frame — the direction is counter-intuitive and worth stating.
 */
export const frameRatio = (heightCm: Centimetres, wristCm: Centimetres): number =>
  wristCm <= 0 ? 0 : heightCm / wristCm;

export const frameSize = (
  heightCm: Centimetres,
  wristCm: Centimetres,
  sex: FrameSex
): FrameSize => {
  const ratio = frameRatio(heightCm, wristCm);
  const cutoffs = FRAME_CUTOFFS[sex];

  if (ratio > cutoffs.small) return 'small';
  if (ratio < cutoffs.large) return 'large';
  return 'medium';
};

export interface BuildAssessment {
  readonly frame: FrameSize;
  readonly ratio: number;
  readonly bmi: number;
  readonly label: BuildLabel;
  /**
   * True when frame size and BMI point in different directions — a small frame
   * carrying a high BMI, or a large frame carrying a low one.
   *
   * Roughly a third of people land here, and it is the single most useful thing
   * the page can tell someone: the three-category scheme does not fit them, and
   * that is a fact about the scheme rather than about them.
   */
  readonly mixed: boolean;
}

/**
 * A descriptive build label from frame size and BMI.
 *
 * Deliberately crude, because the inputs cannot support anything finer. A slight
 * frame with a low BMI reads ectomorph; a broad frame with a high BMI reads
 * endomorph; everything else reads mesomorph, which is where most people land
 * and is precisely why the label carries so little information.
 */
export const assessBuild = (
  heightCm: Centimetres,
  massKg: Kilograms,
  wristCm: Centimetres,
  sex: FrameSex
): BuildAssessment => {
  const frame = frameSize(heightCm, wristCm, sex);
  const bmi = bodyMassIndex(massKg, heightCm);
  const ratio = frameRatio(heightCm, wristCm);

  const leanBmi = bmi < 20;
  const highBmi = bmi >= 27;

  const label: BuildLabel =
    frame === 'small' && leanBmi
      ? 'ectomorph'
      : frame === 'large' && highBmi
        ? 'endomorph'
        : 'mesomorph';

  const mixed = (frame === 'small' && highBmi) || (frame === 'large' && leanBmi);

  return { frame, ratio, bmi, label, mixed };
};
