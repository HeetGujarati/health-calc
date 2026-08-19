import {
  allOneRepMaxEstimates,
  averageOneRepMax,
  oneRepMax,
  percentageTable,
  RELIABLE_REP_CEILING,
  type OneRepMaxFormula,
} from '../../health/onerepmax';
import {
  allMaxHeartRateEstimates,
  karvonenTargetHeartRate,
  karvonenZones,
  maxHeartRate,
  percentageOfMaxHeartRate,
  type MaxHeartRateFormula,
} from '../../health/heartrate';
import {
  caloriesBurned,
  caloriesBurnedFromOxygenUptake,
  netCaloriesBurned,
} from '../../health/caloriesburned';
import {
  finishTime,
  formatDuration,
  pacePerKilometre,
  pacePerMile,
  parseDuration,
  raceDistanceMetres,
  speedKph,
  speedMph,
  splits,
  type RaceDistanceId,
} from '../../health/pace';
import { formatNumber } from '../../health/rounding';
import {
  parseAge,
  parseHeartRate,
  parseLoadKg,
  parseMassLb,
  parseMet,
  parseReps,
} from '../../health/validation';
import { minutesToSeconds, poundsToKilograms } from '../../health/units';
import { readChoice, readMass, unitSystemOf } from '../inputs';
import { failure, type CalculatorResult, type FormValues, type ResultNote } from '../result';

/**
 * Training calculators.
 *
 * These carry no age gate: a pace chart or a percentage table is arithmetic
 * about a barbell or a distance, not an inference about someone's body, so the
 * section 4.3 rule 4 gate does not apply. The heart rate calculator does take
 * age, but produces a training range rather than a body-composition estimate.
 */

const ZONE_LABELS: Record<string, string> = {
  very_light: 'Very light (50–60%)',
  light: 'Light (60–70%)',
  moderate: 'Moderate (70–80%)',
  hard: 'Hard (80–90%)',
  maximum: 'Maximum (90–100%)',
};

export const computeOneRepMax = (values: FormValues, locale: string): CalculatorResult => {
  const imperial = unitSystemOf(values) === 'imperial';

  // The load is a barbell weight, not a body weight, so it uses its own range.
  const rawLoad = values['load'];
  const load = imperial
    ? (() => {
        const pounds = parseMassLb(rawLoad, 'load');
        return pounds.ok ? { ok: true as const, value: poundsToKilograms(pounds.value) } : pounds;
      })()
    : parseLoadKg(rawLoad, 'load');

  if (!load.ok) return failure(load.error);
  const reps = parseReps(values['reps'], 'reps');
  if (!reps.ok) return failure(reps.error);

  const formula = readChoice(values, 'formula', 'epley') as OneRepMaxFormula;
  const estimate = oneRepMax(load.value, reps.value, formula);
  if (estimate === null) {
    return failure({
      code: 'out_of_range',
      message: 'The Brzycki equation is undefined at this repetition count. Pick another formula.',
      field: 'formula',
    });
  }

  const all = allOneRepMaxEstimates(load.value, reps.value);
  const average = averageOneRepMax(load.value, reps.value);

  const asLoad = (kg: number): string =>
    imperial
      ? `${formatNumber(kg / 0.45359237, locale, 'oneRepMax')} lb`
      : `${formatNumber(kg, locale, 'oneRepMax')} kg`;

  const notes: ResultNote[] = [
    {
      tone: 'info',
      text: 'All five equations were validated in the two-to-ten repetition range. The spread between them is usually wider than the error of any one, which is why the average is shown alongside.',
    },
  ];

  if (reps.value > RELIABLE_REP_CEILING) {
    notes.push({
      tone: 'caution',
      text: `Above ${String(RELIABLE_REP_CEILING)} repetitions these estimates are dominated by muscular endurance rather than maximal strength, and they diverge from each other by more than they diverge from the truth. Treat this as a rough indication.`,
    });
  }

  return {
    ok: true,
    primary: { label: 'Estimated one rep max', value: asLoad(estimate) },
    summary: `Lifting ${asLoad(load.value)} for ${String(reps.value)} repetitions estimates a one rep max of about ${asLoad(estimate)}.`,
    secondary: [
      { label: 'Average of all five', value: asLoad(average) },
      { label: 'Epley (1985)', value: asLoad(all.epley) },
      { label: 'Brzycki (1993)', value: all.brzycki === null ? '—' : asLoad(all.brzycki) },
      { label: 'Lombardi (1989)', value: asLoad(all.lombardi) },
      { label: "O'Conner (1989)", value: asLoad(all.oconner) },
      { label: 'Wathan (1994)', value: asLoad(all.wathan) },
      ...percentageTable(estimate)
        .filter((row) => row.percent % 10 === 0)
        .map((row) => ({ label: `${String(row.percent)}% of 1RM`, value: asLoad(row.load) })),
    ],
    notes,
  };
};

export const computeTargetHeartRate = (values: FormValues, locale: string): CalculatorResult => {
  const age = parseAge(values['age']);
  if (!age.ok) return failure(age.error);

  const restingRaw = values['restingHeartRate'];
  const resting =
    restingRaw !== undefined && restingRaw.trim() !== ''
      ? parseHeartRate(restingRaw, 'restingHeartRate')
      : parseHeartRate(70, 'restingHeartRate');
  if (!resting.ok) return failure(resting.error);

  const formula = readChoice(values, 'formula', 'tanaka') as MaxHeartRateFormula;
  const max = maxHeartRate(age.value, formula);
  const all = allMaxHeartRateEstimates(age.value);
  const zones = karvonenZones(max, resting.value);

  const bpm = (value: number): string => formatNumber(value, locale, 'heartRate');
  const moderate = zones.find((zone) => zone.id === 'moderate');

  return {
    ok: true,
    primary: { label: 'Maximum heart rate', value: bpm(max), unit: 'bpm' },
    summary:
      moderate === undefined
        ? `Your estimated maximum heart rate is ${bpm(max)} beats per minute.`
        : `Your estimated maximum heart rate is ${bpm(max)} bpm. A moderate training zone runs from ${bpm(moderate.minBpm)} to ${bpm(moderate.maxBpm)} bpm.`,
    secondary: [
      ...zones.map((zone) => ({
        label: ZONE_LABELS[zone.id] ?? zone.id,
        value: `${bpm(zone.minBpm)}–${bpm(zone.maxBpm)}`,
        unit: 'bpm',
      })),
      { label: 'Tanaka (2001) maximum', value: bpm(all.tanaka), unit: 'bpm' },
      { label: 'Fox (1971) maximum', value: bpm(all.fox), unit: 'bpm' },
      {
        label: '70% of maximum, plain method',
        value: bpm(percentageOfMaxHeartRate(max, 0.7)),
        unit: 'bpm',
      },
      {
        label: '70% by Karvonen',
        value: bpm(karvonenTargetHeartRate(max, resting.value, 0.7)),
        unit: 'bpm',
      },
    ],
    notes: [
      {
        tone: 'info',
        text: '"220 minus age" was never derived from a regression — it was drawn by eye from scattered data and carries a standard deviation of 10 to 12 beats per minute. Tanaka came from a meta-analysis of 351 studies and predicts better, especially over 40. Neither substitutes for a measured maximum.',
      },
      {
        tone: 'info',
        text: 'Karvonen works from heart rate reserve, so it accounts for your resting rate. That is why it is the default: at the same nominal intensity it gives a fitter person a different target from an unfit one.',
      },
    ],
  };
};

export const computeCaloriesBurned = (values: FormValues, locale: string): CalculatorResult => {
  const mass = readMass(values);
  if (!mass.ok) return failure(mass.error);

  const met = parseMet(readChoice(values, 'met', '5'), 'met');
  if (!met.ok) return failure(met.error);

  const minutesRaw = readChoice(values, 'minutes', '30');
  const minutes = Number(minutesRaw);
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return failure({
      code: 'not_a_number',
      message: 'Enter a duration in minutes.',
      field: 'minutes',
    });
  }

  const duration = minutesToSeconds(minutes);
  const gross = caloriesBurned(met.value, mass.value, duration);
  const net = netCaloriesBurned(met.value, mass.value, duration);
  const oxygen = caloriesBurnedFromOxygenUptake(met.value, mass.value, duration);

  const kcal = (value: number): string => formatNumber(value, locale, 'calories');

  return {
    ok: true,
    primary: { label: 'Energy used', value: kcal(gross), unit: 'kcal' },
    summary: `At ${formatNumber(met.value, locale, 'bmi')} METs for ${formatNumber(minutes, locale, 'calories')} minutes, you use about ${kcal(gross)} kcal.`,
    secondary: [
      { label: 'Above resting', value: kcal(net), unit: 'kcal' },
      { label: 'Oxygen-uptake method', value: kcal(oxygen), unit: 'kcal' },
      {
        label: 'Per hour',
        value: kcal(caloriesBurned(met.value, mass.value, minutesToSeconds(60))),
        unit: 'kcal',
      },
    ],
    notes: [
      {
        tone: 'info',
        text: 'The "above resting" figure is the honest one for what an activity added: your body would have spent the first MET lying still, so a six MET hour adds five METs’ worth, not six.',
      },
    ],
  };
};

export const computeRunningPace = (values: FormValues, locale: string): CalculatorResult => {
  // A custom distance, when supplied, wins over the race preset — the select
  // keeps its value so switching back does not lose the chosen race.
  const customDistanceRaw = values['customDistance'];
  const hasCustom = customDistanceRaw !== undefined && customDistanceRaw.trim() !== '';
  const metres = hasCustom
    ? Number(customDistanceRaw) * 1000
    : raceDistanceMetres(readChoice(values, 'distance', '5k') as RaceDistanceId);

  if (!Number.isFinite(metres) || metres <= 0) {
    return failure({ code: 'not_a_number', message: 'Enter a distance.', field: 'distance' });
  }

  const time = parseDuration(readChoice(values, 'time', ''));
  if (time === null) {
    return failure({
      code: 'not_a_number',
      message: 'Enter a finish time as h:mm:ss or m:ss, for example 25:30.',
      field: 'time',
    });
  }

  const perKm = pacePerKilometre(metres, time);
  const perMile = pacePerMile(metres, time);
  const raceSplits = splits(metres, time, 1000);

  return {
    ok: true,
    primary: { label: 'Pace per kilometre', value: formatDuration(perKm), unit: 'min/km' },
    summary: `Covering ${formatNumber(metres / 1000, locale, 'bmi')} km in ${formatDuration(time)} is a pace of ${formatDuration(perKm)} per kilometre, or ${formatDuration(perMile)} per mile.`,
    secondary: [
      { label: 'Pace per mile', value: formatDuration(perMile), unit: 'min/mi' },
      { label: 'Speed', value: formatNumber(speedKph(metres, time), locale, 'bmi'), unit: 'km/h' },
      { label: 'Speed', value: formatNumber(speedMph(metres, time), locale, 'bmi'), unit: 'mph' },
      {
        label: 'Projected 5k at this pace',
        value: formatDuration(finishTime(5000, perKm)),
      },
      {
        label: 'Projected marathon at this pace',
        value: formatDuration(finishTime(42195, perKm)),
      },
      ...raceSplits
        .filter((split) => split.index % 5 === 0 || split.partial)
        .map((split) => ({
          label: split.partial
            ? `Finish (${formatNumber(split.cumulativeMetres / 1000, locale, 'bmi')} km)`
            : `${String(split.cumulativeMetres / 1000)} km`,
          value: formatDuration(split.cumulativeSeconds),
        })),
    ],
    notes: [
      {
        tone: 'info',
        text: 'The projections above assume the same pace holds over the new distance, which it generally does not — pace falls as distance rises. They are a like-for-like comparison, not a race prediction.',
      },
    ],
  };
};
