import { bodyMassIndex, healthyWeightRange } from '../../lib/health/bmi';
import { mifflinStJeor } from '../../lib/health/bmr';
import { ACTIVITY_LEVELS, totalDailyEnergyExpenditure } from '../../lib/health/tdee';
import { calorieGoal } from '../../lib/health/calories';
import { GOAL_PRESETS } from '../../lib/health/guards';
import { macroSplitFromPreset, MACRO_PRESETS } from '../../lib/health/macros';
import { PROTEIN_LEVELS } from '../../lib/health/protein';
import { usNavyBodyFat } from '../../lib/health/bodyfat';
import { boerLeanBodyMass } from '../../lib/health/leanmass';
import { allIdealWeightEstimates } from '../../lib/health/idealweight';
import { caloriesBurned } from '../../lib/health/caloriesburned';
import { epley, ONE_REP_MAX_PERCENTAGES } from '../../lib/health/onerepmax';
import { karvonenZones, tanakaMaxHeartRate } from '../../lib/health/heartrate';
import { finishTime, formatDuration } from '../../lib/health/pace';
import { waterIntake } from '../../lib/health/water';
import { armyBodyComposition } from '../../lib/health/armybodyfat';
import { FRAME_CUTOFFS } from '../../lib/health/bodytype';
import { foodScore } from '../../lib/health/foodscore';
import { forDisplay, roundTo } from '../../lib/health/rounding';
import {
  asBeatsPerMinute,
  asCentimetres,
  asKilograms,
  asMet,
  asYears,
  minutesToSeconds,
} from '../../lib/health/units';
import type { ReferenceTable } from './types';

/**
 * Reference tables, computed at build time from the same functions the
 * calculator itself calls.
 *
 * This matters for two reasons. Hand-authored tables of numbers would be
 * inventing data, which the brief forbids outright. And a table maintained
 * separately from the calculator eventually disagrees with it — the reader
 * types the row's inputs, gets a different answer, and rightly stops trusting
 * both.
 *
 * These render into the prerendered HTML, so every calculator page carries real
 * substance with JavaScript disabled.
 */

const n = (value: number, decimals = 0): string => roundTo(value, decimals).toString();

export const bmiTable = (): ReferenceTable => {
  const heights = [155, 160, 165, 170, 175, 180, 185, 190];
  const weights = [50, 60, 70, 80, 90, 100, 110];
  return {
    caption: 'BMI by height and weight',
    note: 'Read across from your height and down from your weight. Values of 18.5 to 25 fall in the WHO healthy band. BMI cannot tell muscle from fat, so a very muscular person can read high without carrying excess fat.',
    rowHeader: 'Height',
    columnHeader: 'Weight',
    columns: weights.map((weight) => `${String(weight)} kg`),
    rows: heights.map((height) => ({
      label: `${String(height)} cm`,
      cells: weights.map((weight) =>
        n(bodyMassIndex(asKilograms(weight), asCentimetres(height)), 1)
      ),
    })),
  };
};

export const foodScoreTable = (): ReferenceTable => {
  const calories = [100, 150, 200, 250, 300, 400, 500];
  const fats = [0, 5, 10, 20];
  return {
    caption: 'Food score by calories and fat, at zero fibre',
    note: 'Read across from the calories in a serving and down from its fat. Fibre is not in this table because it only subtracts: every 5 g takes one point off whatever you find here. The pattern worth noticing is how little fat has to change to move the score compared with calories.',
    rowHeader: 'Calories',
    columnHeader: 'Fat',
    columns: fats.map((fat) => `${String(fat)} g`),
    rows: calories.map((kcal) => ({
      label: `${String(kcal)} kcal`,
      cells: fats.map((fat) => n(foodScore({ kcal, fatGrams: fat, fibreGrams: 0 }).score)),
    })),
  };
};

export const bodyTypeTable = (): ReferenceTable => {
  const heights = [155, 160, 165, 170, 175, 180, 185, 190];
  return {
    caption: 'Wrist circumference marking each frame size boundary, by height',
    note: 'The wrist measurement at which the frame classification changes. A wrist slimmer than the first figure reads as a small frame; thicker than the second reads as large; between them is medium. Note the direction: a slimmer wrist for a given height means a smaller frame, not a larger one.',
    rowHeader: 'Height',
    columnHeader: 'Boundary',
    columns: [
      'Small / medium (male)',
      'Medium / large (male)',
      'Small / medium (female)',
      'Medium / large (female)',
    ],
    rows: heights.map((height) => ({
      label: `${String(height)} cm`,
      cells: [
        `${n(height / FRAME_CUTOFFS.male.small, 1)} cm`,
        `${n(height / FRAME_CUTOFFS.male.large, 1)} cm`,
        `${n(height / FRAME_CUTOFFS.female.small, 1)} cm`,
        `${n(height / FRAME_CUTOFFS.female.large, 1)} cm`,
      ],
    })),
  };
};

export const periodTable = (): ReferenceTable => {
  const cycles = [21, 24, 26, 28, 30, 32, 35];
  const ahead = [1, 2, 3, 6, 12];
  return {
    caption: 'Days from the start of one period to a later one, by cycle length',
    note: 'Read across from your cycle length. The figures are simply the cycle length multiplied out, which is the whole of the arithmetic — and also its limitation. Cycle length varies from one cycle to the next, so the error in the twelfth column is roughly twelve times the error in the first.',
    rowHeader: 'Cycle length',
    columnHeader: 'Cycles ahead',
    columns: ahead.map((count) => (count === 1 ? '1 cycle' : `${String(count)} cycles`)),
    rows: cycles.map((cycle) => ({
      label: `${String(cycle)} days`,
      cells: ahead.map((count) => `${n(cycle * count)} days`),
    })),
  };
};

export const healthyWeightTable = (): ReferenceTable => {
  const heights = [150, 155, 160, 165, 170, 175, 180, 185, 190, 195];
  return {
    caption: 'Healthy weight range by height',
    note: 'The weight range corresponding to a BMI of 18.5 to 25 at each height. It is a wide population band, and a healthy weight for any individual can sit outside it.',
    rowHeader: 'Height',
    columnHeader: 'Range',
    columns: ['Lower (BMI 18.5)', 'Upper (BMI 25)', 'Midpoint'],
    rows: heights.map((height) => {
      const range = healthyWeightRange(asCentimetres(height));
      return {
        label: `${String(height)} cm`,
        cells: [
          `${n(range.minKg, 1)} kg`,
          `${n(range.maxKg, 1)} kg`,
          `${n((range.minKg + range.maxKg) / 2, 1)} kg`,
        ],
      };
    }),
  };
};

export const bmrTable = (): ReferenceTable => {
  const ages = [20, 30, 40, 50, 60, 70];
  const weights = [55, 70, 85, 100];
  return {
    caption: 'Basal metabolic rate by age and weight',
    note: 'Mifflin-St Jeor at a height of 175 cm, for men and women. BMR falls with age at about 5 kcal per year in this equation, which is why the columns shrink to the right.',
    rowHeader: 'Weight',
    columnHeader: 'Age',
    columns: ages.map((age) => `${String(age)} y`),
    rows: weights.flatMap((weight) =>
      (['male', 'female'] as const).map((sex) => ({
        label: `${String(weight)} kg, ${sex === 'male' ? 'men' : 'women'}`,
        cells: ages.map((age) =>
          n(mifflinStJeor(asKilograms(weight), asCentimetres(175), asYears(age), sex))
        ),
      }))
    ),
  };
};

export const tdeeTable = (): ReferenceTable => {
  const weights = [55, 70, 85, 100];
  return {
    caption: 'Daily energy use by weight and activity level',
    note: 'Mifflin-St Jeor at 175 cm and 30 years old, for men, multiplied by each activity level. Use it to see how much the activity multiplier moves the answer relative to body weight.',
    rowHeader: 'Weight',
    columnHeader: 'Activity',
    columns: ACTIVITY_LEVELS.map((level) => `×${String(level.multiplier)}`),
    rows: weights.map((weight) => {
      const bmr = mifflinStJeor(asKilograms(weight), asCentimetres(175), asYears(30), 'male');
      return {
        label: `${String(weight)} kg`,
        cells: ACTIVITY_LEVELS.map((level) => n(totalDailyEnergyExpenditure(bmr, level.id))),
      };
    }),
  };
};

export const calorieTable = (): ReferenceTable => {
  const maintenances = [1800, 2000, 2200, 2400, 2600, 2800, 3000];
  return {
    caption: 'Calorie target by maintenance level and goal',
    note: 'Every figure has the site’s safety rules applied: deficits are capped at the lesser of a quarter of maintenance or 1,000 kcal, and no target falls below 1,500 kcal for men or 1,200 for women. Where a row is flat across the loss columns, the cap is doing the work.',
    rowHeader: 'Maintenance',
    columnHeader: 'Goal',
    columns: GOAL_PRESETS.map((preset) =>
      preset.kgPerWeek === 0
        ? 'Maintain'
        : `${preset.kgPerWeek > 0 ? '+' : '−'}${String(Math.abs(preset.kgPerWeek))} kg/wk`
    ),
    rows: maintenances.map((tdee) => ({
      label: `${String(tdee)} kcal`,
      cells: GOAL_PRESETS.map((preset) => {
        const result = calorieGoal({
          tdee,
          sex: 'male',
          age: asYears(30),
          preset: preset.id,
        });
        return result.ok ? n(result.calories) : '—';
      }),
    })),
  };
};

export const macroTable = (): ReferenceTable => {
  const calories = 2200;
  const bodyMass = asKilograms(75);
  return {
    caption: 'Macronutrient split by preset',
    note: `Grams per day at ${String(calories)} kcal for a 75 kg person. Protein scales with body weight, fat is a share of energy, and carbohydrate takes what is left — so the carbohydrate column is the one that moves most.`,
    rowHeader: 'Preset',
    columnHeader: 'Macronutrient',
    columns: ['Protein', 'Fat', 'Carbohydrate'],
    rows: MACRO_PRESETS.map((preset) => {
      const split = macroSplitFromPreset(calories, bodyMass, preset.id);
      return {
        label: preset.id.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase()),
        cells: [
          `${n(split.proteinGrams)} g`,
          `${n(split.fatGrams)} g`,
          `${n(split.carbohydrateGrams)} g`,
        ],
      };
    }),
  };
};

export const proteinTable = (): ReferenceTable => {
  const weights = [50, 60, 70, 80, 90, 100, 110];
  return {
    caption: 'Daily protein by body weight and activity',
    note: 'Grams per day. The first column is the RDA, which is the amount that prevents deficiency in most healthy adults — not a target for someone training.',
    rowHeader: 'Body weight',
    columnHeader: 'Activity',
    columns: PROTEIN_LEVELS.map((level) => `${String(level.gramsPerKg)} g/kg`),
    rows: weights.map((weight) => ({
      label: `${String(weight)} kg`,
      cells: PROTEIN_LEVELS.map((level) => `${n(weight * level.gramsPerKg)} g`),
    })),
  };
};

export const bodyFatTable = (): ReferenceTable => {
  const waists = [75, 80, 85, 90, 95, 100, 105];
  const necks = [35, 38, 41];
  return {
    caption: 'US Navy body fat by waist and neck, men at 178 cm',
    note: 'The method works from the difference between waist and neck, so a larger neck at the same waist reads lower. Typical error against hydrostatic weighing is three to four percentage points.',
    rowHeader: 'Waist',
    columnHeader: 'Neck',
    columns: necks.map((neck) => `${String(neck)} cm`),
    rows: waists.map((waist) => ({
      label: `${String(waist)} cm`,
      cells: necks.map((neck) => {
        const value = usNavyBodyFat({
          height: asCentimetres(178),
          neck: asCentimetres(neck),
          waist: asCentimetres(waist),
          sex: 'male',
        });
        return value === null ? '—' : `${n(value, 1)}%`;
      }),
    })),
  };
};

export const leanMassTable = (): ReferenceTable => {
  const weights = [55, 65, 75, 85, 95];
  const heights = [165, 175, 185];
  return {
    caption: 'Lean body mass by weight and height (Boer)',
    note: 'The Boer equation predicts lean mass from height, weight and sex, so it cannot respond to training status: two people of the same size get the same figure. Rows are men; women read lower at the same dimensions.',
    rowHeader: 'Weight',
    columnHeader: 'Height',
    columns: heights.map((height) => `${String(height)} cm`),
    rows: weights.map((weight) => ({
      label: `${String(weight)} kg`,
      cells: heights.map(
        (height) =>
          `${n(boerLeanBodyMass(asKilograms(weight), asCentimetres(height), 'male'), 1)} kg`
      ),
    })),
  };
};

export const idealWeightTable = (): ReferenceTable => {
  const heights = [155, 160, 165, 170, 175, 180, 185, 190];
  return {
    caption: 'Ideal weight equations compared, men',
    note: 'The four clinical equations give a single number per height with no range. The final column is the healthy BMI range, which is the better answer to the question most people are asking.',
    rowHeader: 'Height',
    columnHeader: 'Equation',
    columns: ['Devine', 'Robinson', 'Miller', 'Hamwi', 'BMI 18.5–25'],
    rows: heights.map((height) => {
      const estimates = allIdealWeightEstimates(asCentimetres(height), 'male');
      const range = healthyWeightRange(asCentimetres(height));
      return {
        label: `${String(height)} cm`,
        cells: [
          `${n(estimates.devine, 1)} kg`,
          `${n(estimates.robinson, 1)} kg`,
          `${n(estimates.miller, 1)} kg`,
          `${n(estimates.hamwi, 1)} kg`,
          `${n(range.minKg)}–${n(range.maxKg)} kg`,
        ],
      };
    }),
  };
};

export const caloriesBurnedTable = (): ReferenceTable => {
  const mets = [3, 5, 7, 9, 11];
  const weights = [55, 70, 85, 100];
  return {
    caption: 'Energy used by MET value and body weight, per 30 minutes',
    note: 'A MET is a multiple of resting metabolic rate. Walking briskly is around 4, running at 10 km/h is around 10. Heavier bodies use more energy for the same activity, which is why the columns rise.',
    rowHeader: 'Activity intensity',
    columnHeader: 'Body weight',
    columns: weights.map((weight) => `${String(weight)} kg`),
    rows: mets.map((met) => ({
      label: `${String(met)} METs`,
      cells: weights.map((weight) =>
        n(caloriesBurned(asMet(met), asKilograms(weight), minutesToSeconds(30)))
      ),
    })),
  };
};

export const oneRepMaxTable = (): ReferenceTable => {
  const reps = [1, 2, 3, 5, 8, 10, 12];
  const loads = [60, 80, 100, 120, 140];
  return {
    caption: 'Estimated one rep max by load and repetitions (Epley)',
    note: 'Read across from the weight you lifted and down from the repetitions you managed. Above ten repetitions the estimate is dominated by endurance rather than maximal strength.',
    rowHeader: 'Weight lifted',
    columnHeader: 'Repetitions',
    columns: reps.map((rep) => `${String(rep)} reps`),
    rows: loads.map((load) => ({
      label: `${String(load)} kg`,
      cells: reps.map((rep) => `${n(epley(asKilograms(load), rep), 1)} kg`),
    })),
  };
};

export const percentageOfMaxTable = (): ReferenceTable => {
  const maxes = [80, 100, 120, 140, 160];
  return {
    caption: 'Percentage of one rep max',
    note: 'Training loads as a share of a one rep max. Most strength work sits between 70 and 90 per cent.',
    rowHeader: 'One rep max',
    columnHeader: 'Percentage',
    columns: ONE_REP_MAX_PERCENTAGES.map((percent) => `${String(percent)}%`),
    rows: maxes.map((max) => ({
      label: `${String(max)} kg`,
      cells: ONE_REP_MAX_PERCENTAGES.map((percent) => `${n((max * percent) / 100, 1)} kg`),
    })),
  };
};

export const heartRateTable = (): ReferenceTable => {
  const ages = [20, 30, 40, 50, 60, 70];
  const resting = asBeatsPerMinute(65);
  return {
    caption: 'Target heart rate zones by age (Karvonen, resting 65 bpm)',
    note: 'Zones are computed from heart rate reserve using the Tanaka maximum, at a resting rate of 65 bpm. A different resting rate shifts every zone, which is exactly why the Karvonen method is preferred over a flat percentage of maximum.',
    rowHeader: 'Age',
    columnHeader: 'Zone',
    columns: ['Max HR', 'Very light', 'Light', 'Moderate', 'Hard', 'Maximum'],
    rows: ages.map((age) => {
      const max = tanakaMaxHeartRate(asYears(age));
      const zones = karvonenZones(max, resting);
      return {
        label: `${String(age)} y`,
        cells: [n(max), ...zones.map((zone) => `${n(zone.minBpm)}–${n(zone.maxBpm)}`)],
      };
    }),
  };
};

export const paceTable = (): ReferenceTable => {
  const paces = [240, 270, 300, 330, 360, 390, 420];
  const distances = [
    { label: '5k', metres: 5000 },
    { label: '10k', metres: 10_000 },
    { label: 'Half', metres: 21_097.5 },
    { label: 'Marathon', metres: 42_195 },
  ];
  return {
    caption: 'Finish times by pace',
    note: 'Read down from your pace per kilometre to a finish time at each distance. These assume the pace holds, which it generally does not: pace falls as distance rises.',
    rowHeader: 'Pace per km',
    columnHeader: 'Distance',
    columns: distances.map((distance) => distance.label),
    rows: paces.map((pace) => ({
      label: formatDuration(pace),
      cells: distances.map((distance) => formatDuration(finishTime(distance.metres, pace))),
    })),
  };
};

export const waterTable = (): ReferenceTable => {
  const weights = [50, 60, 70, 80, 90, 100];
  const durations = [0, 30, 60, 90];
  return {
    caption: 'Daily fluid by body weight and exercise',
    note: 'Litres per day from drinks, in a temperate climate. The Institute of Medicine report behind these reference values notes that most healthy people meet their needs by letting thirst guide them.',
    rowHeader: 'Body weight',
    columnHeader: 'Exercise',
    columns: durations.map((minutes) => (minutes === 0 ? 'None' : `${String(minutes)} min`)),
    rows: weights.map((weight) => ({
      label: `${String(weight)} kg`,
      cells: durations.map((minutes) => {
        const result = waterIntake({
          mass: asKilograms(weight),
          sex: 'male',
          ...(minutes > 0 ? { exerciseDuration: minutesToSeconds(minutes) } : {}),
          climate: 'temperate',
        });
        return `${n(result.litres, 1)} L`;
      }),
    })),
  };
};

export const armyTable = (): ReferenceTable => {
  const heights = [160, 165, 170, 175, 180, 185, 190, 195];
  const waists = [75, 85, 95, 105];
  return {
    caption: 'Waist-to-height ratio against the Army standard',
    note: 'The standard is a ratio below 0.55, recorded to three decimal places, with no age or sex adjustment. The final column is the largest waist that meets it at that height.',
    rowHeader: 'Height',
    columnHeader: 'Waist',
    columns: [...waists.map((waist) => `${String(waist)} cm`), 'Max passing waist'],
    rows: heights.map((height) => {
      const cells = waists.map((waist) => {
        const result = armyBodyComposition(asCentimetres(waist), asCentimetres(height));
        return `${forDisplay(result.recorded, 'whtr').toFixed(3)}${result.meetsStandard ? '' : ' ✗'}`;
      });
      const max = armyBodyComposition(asCentimetres(80), asCentimetres(height)).maxWaistCm;
      return { label: `${String(height)} cm`, cells: [...cells, `${n(max, 1)} cm`] };
    }),
  };
};
