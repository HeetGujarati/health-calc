import {
  bmiCategory,
  bmiPrime,
  bodyMassIndex,
  healthyWeightRange,
  ponderalIndex,
} from '../../health/bmi';
import {
  deurenbergBodyFat,
  fatFreeMass,
  fatMass,
  jacksonPollock3SiteBodyFat,
  jacksonPollock7SiteBodyFat,
  usNavyBodyFat,
} from '../../health/bodyfat';
import { allLeanMassEstimates, leanBodyMass, type LeanMassFormula } from '../../health/leanmass';
import { allIdealWeightEstimates, idealWeightSummary } from '../../health/idealweight';
import { armyBodyComposition, ARMY_WHTR_THRESHOLD } from '../../health/armybodyfat';
import { assessBuild, type BuildLabel, type FrameSize } from '../../health/bodytype';
import { guardAdultAge } from '../../health/guards';
import { formatNumber, formatRange } from '../../health/rounding';
import {
  parseAge,
  parseHipCm,
  parseNeckCm,
  parseSkinfoldMm,
  parseWaistCm,
  parseWristCm,
  type Sex,
} from '../../health/validation';
import { parseSex } from '../../health/validation';
import {
  asCentimetres,
  asInches,
  centimetresToInches,
  inchesToCentimetres,
  type Centimetres,
  type Years,
} from '../../health/units';
import { readChoice, readHeight, readMass, unitSystemOf } from '../inputs';
import { failure, type CalculatorResult, type FormValues, type ResultNote } from '../result';

/**
 * Body composition calculators.
 *
 * The BMI category label is stated once, factually, using the WHO's own
 * terminology, alongside the caveat that BMI cannot distinguish muscle from
 * fat. It is never used as a verdict, and no colour is attached to it.
 */

const BMI_CATEGORY_LABELS: Record<string, string> = {
  underweight: 'Underweight',
  healthy_weight: 'Healthy weight',
  overweight: 'Overweight',
  obesity_class_1: 'Obesity class I',
  obesity_class_2: 'Obesity class II',
  obesity_class_3: 'Obesity class III',
};

/** Formats a mass in whichever system the user is working in. */
const massInUserUnits = (kg: number, values: FormValues, locale: string): string => {
  if (unitSystemOf(values) === 'imperial') {
    return `${formatNumber(kg / 0.45359237, locale, 'massLb')} lb`;
  }
  return `${formatNumber(kg, locale, 'massKg')} kg`;
};

export const computeBmi = (values: FormValues, locale: string): CalculatorResult => {
  const mass = readMass(values);
  if (!mass.ok) return failure(mass.error);
  const height = readHeight(values);
  if (!height.ok) return failure(height.error);

  const bmi = bodyMassIndex(mass.value, height.value);
  const category = bmiCategory(bmi);
  const range = healthyWeightRange(height.value);

  return {
    ok: true,
    primary: { label: 'Body mass index', value: formatNumber(bmi, locale, 'bmi') },
    summary: `Your BMI is ${formatNumber(bmi, locale, 'bmi')}. For your height, the healthy BMI range of 18.5 to 25 corresponds to ${massInUserUnits(range.minKg, values, locale)} to ${massInUserUnits(range.maxKg, values, locale)}.`,
    secondary: [
      {
        label: 'WHO category',
        value: category === null ? '—' : (BMI_CATEGORY_LABELS[category] ?? '—'),
      },
      { label: 'BMI Prime', value: formatNumber(bmiPrime(bmi), locale, 'bmiPrime') },
      {
        label: 'Ponderal index',
        value: formatNumber(ponderalIndex(mass.value, height.value), locale, 'ponderalIndex'),
        unit: 'kg/m³',
      },
      {
        label: 'Healthy weight range',
        value:
          unitSystemOf(values) === 'imperial'
            ? formatRange(range.minKg / 0.45359237, range.maxKg / 0.45359237, locale, 'massLb')
            : formatRange(range.minKg, range.maxKg, locale, 'massKg'),
        unit: unitSystemOf(values) === 'imperial' ? 'lb' : 'kg',
      },
    ],
    notes: [
      {
        tone: 'info',
        text: 'BMI compares mass to height and carries no information about what that mass is made of, so it does not distinguish muscle from fat. It is a population screening indicator, not a diagnosis.',
      },
    ],
  };
};

export const computeHealthyWeightRange = (values: FormValues, locale: string): CalculatorResult => {
  const height = readHeight(values);
  if (!height.ok) return failure(height.error);

  const range = healthyWeightRange(height.value);
  const imperial = unitSystemOf(values) === 'imperial';

  return {
    ok: true,
    primary: {
      label: 'Healthy weight range',
      value: imperial
        ? formatRange(range.minKg / 0.45359237, range.maxKg / 0.45359237, locale, 'massLb')
        : formatRange(range.minKg, range.maxKg, locale, 'massKg'),
      unit: imperial ? 'lb' : 'kg',
    },
    summary: `At your height, a BMI between 18.5 and 25 corresponds to ${massInUserUnits(range.minKg, values, locale)} to ${massInUserUnits(range.maxKg, values, locale)}.`,
    secondary: [
      { label: 'Lower bound (BMI 18.5)', value: massInUserUnits(range.minKg, values, locale) },
      { label: 'Upper bound (BMI 25)', value: massInUserUnits(range.maxKg, values, locale) },
      {
        label: 'Midpoint (BMI 21.75)',
        value: massInUserUnits((range.minKg + range.maxKg) / 2, values, locale),
      },
    ],
    notes: [
      {
        tone: 'info',
        text: 'This range comes from the WHO BMI cut-points applied to your height. It is a wide, population-level band, and a healthy weight for any individual can sit outside it.',
      },
    ],
  };
};

export const computeBodyFat = (values: FormValues, locale: string): CalculatorResult => {
  const method = readChoice(values, 'method', 'us_navy');
  const sex = parseSex(readChoice(values, 'sex', 'male'));
  if (!sex.ok) return failure(sex.error);

  const age = parseAge(values['age']);
  if (!age.ok) return failure(age.error);

  // Section 4.3 rule 4: no body-fat figure at all below 18.
  const ageGate = guardAdultAge(age.value);
  if (!ageGate.allowed) {
    return failure({
      code: 'below_minimum_age',
      message:
        'These equations were derived from and validated on adults. Body composition during growth depends on developmental stage in ways they do not model, so no estimate is shown under 18.',
      field: 'age',
    });
  }

  const height = readHeight(values);
  if (!height.ok) return failure(height.error);

  const percent = bodyFatByMethod(method, values, sex.value, age.value, height.value);
  if (percent === null || !Number.isFinite(percent)) {
    return failure({
      code: 'inconsistent_measurements',
      message:
        'Those measurements do not produce a result. Check the tape readings: the waist must be larger than the neck.',
    });
  }

  const mass = readMass(values);
  const secondary = [];
  if (mass.ok) {
    secondary.push(
      {
        label: 'Fat mass',
        value: massInUserUnits(fatMass(mass.value, percent), values, locale),
      },
      {
        label: 'Fat-free mass',
        value: massInUserUnits(fatFreeMass(mass.value, percent), values, locale),
      }
    );
  }

  return {
    ok: true,
    primary: {
      label: 'Body fat',
      value: formatNumber(percent, locale, 'bodyFatPercent'),
      unit: '%',
    },
    summary: `This method estimates your body fat at ${formatNumber(percent, locale, 'bodyFatPercent')}%.`,
    secondary,
    notes: [
      {
        tone: 'info',
        text: 'Circumference and skinfold methods estimate body fat from proxies rather than measuring it. Typical error against hydrostatic weighing is three to four percentage points, so treat the figure as a range rather than a point.',
      },
    ],
  };
};

const bodyFatByMethod = (
  method: string,
  values: FormValues,
  sex: Sex,
  age: Years,
  height: Centimetres
): number | null => {
  if (method === 'deurenberg') {
    const mass = readMass(values);
    if (!mass.ok) return null;
    return deurenbergBodyFat(mass.value, height, age, sex);
  }

  if (method === 'jackson_pollock_3') {
    const a = parseSkinfoldMm(values['siteA'], 'siteA');
    const b = parseSkinfoldMm(values['siteB'], 'siteB');
    const c = parseSkinfoldMm(values['siteC'], 'siteC');
    if (!a.ok || !b.ok || !c.ok) return null;
    return jacksonPollock3SiteBodyFat({ siteA: a.value, siteB: b.value, siteC: c.value }, age, sex);
  }

  if (method === 'jackson_pollock_7') {
    const chest = parseSkinfoldMm(values['chest'], 'chest');
    const midaxillary = parseSkinfoldMm(values['midaxillary'], 'midaxillary');
    const triceps = parseSkinfoldMm(values['triceps'], 'triceps');
    const subscapular = parseSkinfoldMm(values['subscapular'], 'subscapular');
    const abdomen = parseSkinfoldMm(values['abdomen'], 'abdomen');
    const suprailiac = parseSkinfoldMm(values['suprailiac'], 'suprailiac');
    const thigh = parseSkinfoldMm(values['thigh'], 'thigh');

    if (
      !chest.ok ||
      !midaxillary.ok ||
      !triceps.ok ||
      !subscapular.ok ||
      !abdomen.ok ||
      !suprailiac.ok ||
      !thigh.ok
    ) {
      return null;
    }

    return jacksonPollock7SiteBodyFat(
      {
        chest: chest.value,
        midaxillary: midaxillary.value,
        triceps: triceps.value,
        subscapular: subscapular.value,
        abdomen: abdomen.value,
        suprailiac: suprailiac.value,
        thigh: thigh.value,
      },
      age,
      sex
    );
  }

  // Default: US Navy circumference method.
  const neck = parseNeckCm(convertLength(values, 'neck'), 'neck');
  const waist = parseWaistCm(convertLength(values, 'waist'), 'waist');
  if (!neck.ok || !waist.ok) return null;

  if (sex === 'female') {
    const hip = parseHipCm(convertLength(values, 'hip'), 'hip');
    if (!hip.ok) return null;
    return usNavyBodyFat({ height, neck: neck.value, waist: waist.value, hip: hip.value, sex });
  }

  return usNavyBodyFat({ height, neck: neck.value, waist: waist.value, sex });
};

/** Circumference fields arrive in inches under imperial; the parsers want cm. */
const convertLength = (values: FormValues, field: string): unknown => {
  const raw = values[field];
  if (raw === undefined || raw.trim() === '') return raw;
  if (unitSystemOf(values) !== 'imperial') return raw;
  const inches = Number(raw);
  if (!Number.isFinite(inches)) return raw;
  return inchesToCentimetres(asInches(inches));
};

export const computeLeanBodyMass = (values: FormValues, locale: string): CalculatorResult => {
  const mass = readMass(values);
  if (!mass.ok) return failure(mass.error);
  const height = readHeight(values);
  if (!height.ok) return failure(height.error);

  const sex = parseSex(readChoice(values, 'sex', 'male'));
  if (!sex.ok) return failure(sex.error);

  const formula = readChoice(values, 'formula', 'boer') as LeanMassFormula;
  const lbm = leanBodyMass(mass.value, height.value, sex.value, formula);
  const all = allLeanMassEstimates(mass.value, height.value, sex.value);

  return {
    ok: true,
    primary: {
      label: 'Lean body mass',
      value: massInUserUnits(lbm, values, locale),
    },
    summary: `The ${formula === 'boer' ? 'Boer' : formula === 'james' ? 'James' : 'Hume'} equation estimates your lean body mass at ${massInUserUnits(lbm, values, locale)}.`,
    secondary: [
      { label: 'Boer (1984)', value: massInUserUnits(all.boer, values, locale) },
      { label: 'James (1976)', value: massInUserUnits(all.james, values, locale) },
      { label: 'Hume (1966)', value: massInUserUnits(all.hume, values, locale) },
      { label: 'Body fat by difference', value: massInUserUnits(mass.value - lbm, values, locale) },
    ],
    notes: [
      {
        tone: 'info',
        text: 'All three equations predict lean mass from height, weight and sex alone, so they cannot respond to training status: two people of the same height and weight get the same answer. If you know your body fat percentage, deriving lean mass from that is more accurate.',
      },
    ],
  };
};

export const computeIdealWeight = (values: FormValues, locale: string): CalculatorResult => {
  const height = readHeight(values);
  if (!height.ok) return failure(height.error);

  const sex = parseSex(readChoice(values, 'sex', 'male'));
  if (!sex.ok) return failure(sex.error);

  const summary = idealWeightSummary(height.value, sex.value);
  const all = allIdealWeightEstimates(height.value, sex.value);
  const range = summary.healthyBmiRange;
  const imperial = unitSystemOf(values) === 'imperial';

  const notes = [
    {
      tone: 'info' as const,
      text: 'None of these four equations was designed to tell anyone what to weigh. All come from clinical pharmacy, where they normalise drug doses, and each gives a single number per height with no range. The healthy BMI range above is the better answer to the question most people are asking.',
    },
  ];

  if (!summary.withinValidatedHeightRange) {
    notes.push({
      tone: 'info' as const,
      text: 'These equations are anchored at five feet and were not validated below it, so the figures for this height are extrapolations.',
    });
  }

  return {
    ok: true,
    primary: {
      label: 'Healthy weight range',
      value: imperial
        ? formatRange(range.minKg / 0.45359237, range.maxKg / 0.45359237, locale, 'massLb')
        : formatRange(range.minKg, range.maxKg, locale, 'massKg'),
      unit: imperial ? 'lb' : 'kg',
    },
    summary: `At your height a BMI of 18.5 to 25 corresponds to ${massInUserUnits(range.minKg, values, locale)} to ${massInUserUnits(range.maxKg, values, locale)}. The four clinical equations give single figures between ${massInUserUnits(Math.min(...Object.values(all)), values, locale)} and ${massInUserUnits(Math.max(...Object.values(all)), values, locale)}.`,
    secondary: [
      { label: 'Devine (1974)', value: massInUserUnits(all.devine, values, locale) },
      { label: 'Robinson (1983)', value: massInUserUnits(all.robinson, values, locale) },
      { label: 'Miller (1983)', value: massInUserUnits(all.miller, values, locale) },
      { label: 'Hamwi (1964)', value: massInUserUnits(all.hamwi, values, locale) },
    ],
    notes,
  };
};

export const computeArmyBodyFat = (values: FormValues, locale: string): CalculatorResult => {
  const height = readHeight(values);
  if (!height.ok) return failure(height.error);

  const waist = parseWaistCm(convertLength(values, 'waist'), 'waist');
  if (!waist.ok) return failure(waist.error);

  const result = armyBodyComposition(waist.value, height.value);
  const imperial = unitSystemOf(values) === 'imperial';

  return {
    ok: true,
    primary: {
      label: 'Waist-to-height ratio',
      value: formatNumber(result.recorded, locale, 'whtr'),
    },
    summary: `Your waist-to-height ratio is ${formatNumber(result.recorded, locale, 'whtr')}, recorded to three decimal places. The Army standard is below ${String(ARMY_WHTR_THRESHOLD)}.`,
    secondary: [
      {
        label: 'Meets the standard',
        value: result.meetsStandard ? 'Yes' : 'No',
      },
      { label: 'Standard', value: `Below ${String(ARMY_WHTR_THRESHOLD)}` },
      {
        label: 'Largest waist that meets it',
        value: imperial
          ? `${formatNumber(centimetresToInches(asCentimetres(result.maxWaistCm)), locale, 'heightIn')} in`
          : `${formatNumber(result.maxWaistCm, locale, 'massKg')} cm`,
      },
    ],
    notes: [
      {
        tone: 'info',
        text: 'Army Directive 2026-13, effective 7 July 2026, made waist-to-height ratio the Army’s only body composition assessment. It rescinded the tape test, the height and weight tables, and the supplemental methods. There is no age or sex adjustment.',
      },
    ],
  };
};

const FRAME_LABELS: Record<FrameSize, string> = {
  small: 'Small frame',
  medium: 'Medium frame',
  large: 'Large frame',
};

const BUILD_LABELS: Record<BuildLabel, string> = {
  ectomorph: 'Ectomorph',
  mesomorph: 'Mesomorph',
  endomorph: 'Endomorph',
};

/**
 * Build description from frame size and BMI.
 *
 * The result deliberately leads with frame size, which is a real measurement,
 * and reports the ectomorph/mesomorph/endomorph label second — that is the
 * order of confidence, and it is the opposite of how these pages usually read.
 * Where frame and BMI disagree the page says the scheme does not fit, rather
 * than forcing a label.
 */
export const computeBodyType = (values: FormValues, locale: string): CalculatorResult => {
  const height = readHeight(values);
  if (!height.ok) return failure(height.error);
  const mass = readMass(values);
  if (!mass.ok) return failure(mass.error);

  const imperial = unitSystemOf(values) === 'imperial';
  const rawWrist = values['wrist'];
  const wrist = parseWristCm(
    imperial && rawWrist !== undefined && rawWrist.trim() !== ''
      ? inchesToCentimetres(asInches(Number(rawWrist)))
      : rawWrist,
    'wrist'
  );
  if (!wrist.ok) return failure(wrist.error);

  const sex = parseSex(readChoice(values, 'sex', 'male'));
  if (!sex.ok) return failure(sex.error);

  const build = assessBuild(height.value, mass.value, wrist.value, sex.value);

  const notes: ResultNote[] = [
    {
      tone: 'info',
      text: 'Frame size is a measurement; the build label is a description. Neither predicts your metabolism, what training will suit you, or anything about your personality — the original claim that it did was discredited long ago.',
    },
  ];

  if (build.mixed) {
    notes.push({
      tone: 'caution',
      text: 'Your frame size and your BMI point in different directions, so none of the three labels describes you well. That is a limitation of a scheme with three categories, not a finding about you.',
    });
  }

  return {
    ok: true,
    primary: { label: 'Frame size', value: FRAME_LABELS[build.frame] },
    summary: `Your height-to-wrist ratio of ${formatNumber(build.ratio, locale, 'bmi')} puts you in the ${FRAME_LABELS[build.frame].toLowerCase()} band, with a BMI of ${formatNumber(build.bmi, locale, 'bmi')}.`,
    secondary: [
      { label: 'Closest build description', value: BUILD_LABELS[build.label] },
      { label: 'Height-to-wrist ratio', value: formatNumber(build.ratio, locale, 'bmi') },
      { label: 'Body mass index', value: formatNumber(build.bmi, locale, 'bmi') },
    ],
    notes,
  };
};
