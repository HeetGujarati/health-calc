import { allBmrEstimates, basalMetabolicRate, type BmrFormula } from '../../health/bmr';
import {
  ACTIVITY_LEVELS,
  allActivityEstimates,
  totalDailyEnergyExpenditure,
  type ActivityLevelId,
} from '../../health/tdee';
import { calorieGoal } from '../../health/calories';
import { GOAL_PRESETS, guardAdultAge, type GoalPresetId } from '../../health/guards';
import { macroSplitFromPreset, macroPercentages, type MacroPresetId } from '../../health/macros';
import {
  allProteinTargets,
  proteinRda,
  proteinTarget,
  type ProteinLevelId,
} from '../../health/protein';
import { waterIntake, type Climate } from '../../health/water';
import { fibrePerPoint, foodScore } from '../../health/foodscore';
import { boerLeanBodyMass } from '../../health/leanmass';
import { formatNumber } from '../../health/rounding';
import { firstError } from '../../health/errors';
import { parseAge, parseDurationSeconds, parseSex } from '../../health/validation';
import { asKilograms, asSeconds, minutesToSeconds } from '../../health/units';
import { readChoice, readHeight, readMass, unitSystemOf } from '../inputs';
import { failure, type CalculatorResult, type FormValues, type ResultNote } from '../result';

/**
 * Energy and intake calculators.
 *
 * Every one of these routes through the guards in health/guards.ts. The calorie
 * calculator in particular is the most safety-sensitive output on the site, and
 * its refusals produce no number at all rather than a number with a warning.
 */

const ACTIVITY_LABELS: Record<ActivityLevelId, string> = {
  sedentary: 'Sedentary',
  lightly_active: 'Lightly active',
  moderately_active: 'Moderately active',
  very_active: 'Very active',
  extra_active: 'Extra active',
};

const GOAL_LABELS: Record<GoalPresetId, string> = {
  maintain: 'Maintain',
  gradual_loss: 'Gradual loss (0.25 kg/week)',
  steady_loss: 'Steady loss (0.5 kg/week)',
  gradual_gain: 'Gradual gain',
  steady_gain: 'Steady gain',
};

const kcal = (value: number, locale: string): string => formatNumber(value, locale, 'calories');

/** Shared reader for the height/weight/age/sex quartet the BMR equations need. */
const readPerson = (values: FormValues) => {
  const mass = readMass(values);
  const height = readHeight(values);
  const age = parseAge(values['age']);
  const sex = parseSex(readChoice(values, 'sex', 'male'));
  const error = firstError(mass, height, age, sex);
  return { mass, height, age, sex, error };
};

export const computeBmr = (values: FormValues, locale: string): CalculatorResult => {
  const person = readPerson(values);
  if (!person.mass.ok) return failure(person.mass.error);
  if (!person.height.ok) return failure(person.height.error);
  if (!person.age.ok) return failure(person.age.error);
  if (!person.sex.ok) return failure(person.sex.error);

  const formula = readChoice(values, 'formula', 'mifflin_st_jeor') as BmrFormula;

  // Katch-McArdle needs lean body mass. Where the user has not supplied a body
  // fat percentage, Boer provides an estimate — and the note says so, rather
  // than presenting a derived figure as if it were measured.
  const leanBodyMass = asKilograms(
    boerLeanBodyMass(person.mass.value, person.height.value, person.sex.value)
  );

  const input = {
    mass: person.mass.value,
    height: person.height.value,
    age: person.age.value,
    sex: person.sex.value,
    leanBodyMass,
  };

  const bmr = basalMetabolicRate(input, formula);
  if (bmr === null) {
    return failure({
      code: 'missing',
      message:
        'Katch-McArdle needs lean body mass. Enter a body fat percentage, or pick another equation.',
      field: 'formula',
    });
  }

  const all = allBmrEstimates(input);

  return {
    ok: true,
    primary: { label: 'Basal metabolic rate', value: kcal(bmr, locale), unit: 'kcal/day' },
    summary: `Your basal metabolic rate is about ${kcal(bmr, locale)} kcal a day — the energy your body uses at complete rest.`,
    secondary: [
      { label: 'Mifflin-St Jeor (1990)', value: kcal(all.mifflin_st_jeor, locale), unit: 'kcal' },
      {
        label: 'Revised Harris-Benedict (1984)',
        value: kcal(all.revised_harris_benedict, locale),
        unit: 'kcal',
      },
      {
        label: 'Katch-McArdle (1977)',
        value: all.katch_mcardle === null ? '—' : kcal(all.katch_mcardle, locale),
        unit: 'kcal',
      },
    ],
    notes: [
      {
        tone: 'info',
        text: 'The three equations disagree by 100 to 300 kcal for the same person, which is why all three are shown. Mifflin-St Jeor is the default because it was derived from a modern population and validated against indirect calorimetry.',
      },
      {
        tone: 'info',
        text: 'The Katch-McArdle figure uses lean mass estimated by the Boer equation rather than a measurement. It is only the most accurate of the three when lean mass is genuinely measured.',
      },
    ],
  };
};

export const computeTdee = (values: FormValues, locale: string): CalculatorResult => {
  const person = readPerson(values);
  if (!person.mass.ok) return failure(person.mass.error);
  if (!person.height.ok) return failure(person.height.error);
  if (!person.age.ok) return failure(person.age.error);
  if (!person.sex.ok) return failure(person.sex.error);

  const activity = readChoice(values, 'activity', 'moderately_active') as ActivityLevelId;
  const bmr = basalMetabolicRate(
    {
      mass: person.mass.value,
      height: person.height.value,
      age: person.age.value,
      sex: person.sex.value,
    },
    'mifflin_st_jeor'
  );
  if (bmr === null) return failure({ code: 'missing', message: 'Enter your details.' });

  const tdee = totalDailyEnergyExpenditure(bmr, activity);
  const all = allActivityEstimates(bmr);

  return {
    ok: true,
    primary: { label: 'Daily energy use', value: kcal(tdee, locale), unit: 'kcal/day' },
    summary: `At a ${ACTIVITY_LABELS[activity].toLowerCase()} activity level, you use about ${kcal(tdee, locale)} kcal a day.`,
    secondary: ACTIVITY_LEVELS.map((level) => ({
      label: `${ACTIVITY_LABELS[level.id]} (x${String(level.multiplier)})`,
      value: kcal(all[level.id], locale),
      unit: 'kcal',
    })),
    notes: [
      {
        tone: 'info',
        text: 'The activity multipliers are the conventional consumer-calculator set. They do not come from a single published paper, though they sit inside the physical activity level bands the Institute of Medicine derived from doubly labelled water data. Treat the figure as a starting point to adjust from, not a measurement.',
      },
    ],
  };
};

export const computeCalorieGoal = (values: FormValues, locale: string): CalculatorResult => {
  const person = readPerson(values);
  if (!person.mass.ok) return failure(person.mass.error);
  if (!person.height.ok) return failure(person.height.error);
  if (!person.age.ok) return failure(person.age.error);
  if (!person.sex.ok) return failure(person.sex.error);

  // Rule 4 gates before anything is computed.
  if (!guardAdultAge(person.age.value).allowed) {
    return failure({
      code: 'below_minimum_age',
      message:
        'These equations were derived from and validated on adults, and energy needs during growth differ in ways they do not model. No calorie target is shown under 18. A doctor or a registered dietitian is the right place to take this.',
      field: 'age',
    });
  }

  // Hoisted after the guards above so the narrowed values are available inside
  // the callbacks below, where TypeScript cannot re-narrow the Result.
  const sex = person.sex.value;
  const age = person.age.value;

  const activity = readChoice(values, 'activity', 'moderately_active') as ActivityLevelId;
  const preset = readChoice(values, 'goal', 'maintain') as GoalPresetId;

  const bmr = basalMetabolicRate(
    {
      mass: person.mass.value,
      height: person.height.value,
      age: person.age.value,
      sex: person.sex.value,
    },
    'mifflin_st_jeor'
  );
  if (bmr === null) return failure({ code: 'missing', message: 'Enter your details.' });

  const tdee = totalDailyEnergyExpenditure(bmr, activity);

  const goalWeightRaw = values['goalWeight'];
  const goalWeight =
    goalWeightRaw !== undefined && goalWeightRaw.trim() !== ''
      ? readMass(values, 'goalWeight')
      : null;

  const result = calorieGoal({
    tdee,
    sex: person.sex.value,
    age: person.age.value,
    preset,
    ...(goalWeight?.ok === true
      ? { height: person.height.value, goalWeight: goalWeight.value }
      : {}),
  });

  if (!result.ok) {
    // Rule 3: show the healthy range instead of a plan toward an unsafe target.
    if (result.refusal.reason === 'goal_below_healthy_bmi') {
      const imperial = unitSystemOf(values) === 'imperial';
      const toUnit = (value: number): string =>
        imperial
          ? `${formatNumber(value / 0.45359237, locale, 'massLb')} lb`
          : `${formatNumber(value, locale, 'massKg')} kg`;
      return failure({
        code: 'out_of_range',
        message: `That goal weight is below a BMI of 18.5 for your height, so no plan toward it is shown. For your height, the healthy BMI range corresponds to ${toUnit(result.refusal.healthyRange.minKg)} to ${toUnit(result.refusal.healthyRange.maxKg)}.`,
        field: 'goalWeight',
      });
    }
    return failure({
      code: 'below_minimum_age',
      message: 'No calorie target is shown under 18.',
      field: 'age',
    });
  }

  const notes = result.adjustments.map((adjustment) =>
    adjustment.id === 'deficit_capped'
      ? {
          tone: 'caution' as const,
          text: `The deficit has been set to ${kcal(adjustment.cap, locale)} kcal rather than ${kcal(adjustment.requested, locale)}, which is the larger of the two limits this site applies: a quarter of your daily energy use, or 1,000 kcal.`,
        }
      : {
          tone: 'caution' as const,
          text: `Your inputs implied ${kcal(adjustment.implied, locale)} kcal a day. The figure shown is ${kcal(adjustment.floor, locale)} kcal, which is the lowest this site will suggest. Lower intakes are used clinically, with supervision and monitoring, and are worth discussing with a doctor rather than starting alone.`,
        }
  );

  return {
    ok: true,
    primary: {
      label: 'Daily calorie target',
      value: kcal(result.calories, locale),
      unit: 'kcal/day',
    },
    summary: `To ${GOAL_LABELS[preset].toLowerCase().replace(/\s*\(.*\)/, '')}, aim for about ${kcal(result.calories, locale)} kcal a day. Your maintenance level is ${kcal(result.maintenanceCalories, locale)} kcal.`,
    secondary: [
      { label: 'Maintenance', value: kcal(result.maintenanceCalories, locale), unit: 'kcal' },
      {
        label: 'Daily change',
        value: `${result.dailyChange >= 0 ? '+' : '−'}${kcal(Math.abs(result.dailyChange), locale)}`,
        unit: 'kcal',
      },
      // Every preset alongside the chosen one, so the effect of switching is
      // visible without re-running the calculator.
      ...GOAL_PRESETS.map((option) => {
        const alternative = calorieGoal({ tdee, sex, age, preset: option.id });
        return {
          label: GOAL_LABELS[option.id],
          value: kcal(alternative.ok ? alternative.calories : tdee, locale),
          unit: 'kcal',
        };
      }),
    ],
    notes,
  };
};

export const computeMacros = (values: FormValues, locale: string): CalculatorResult => {
  const person = readPerson(values);
  if (!person.mass.ok) return failure(person.mass.error);
  if (!person.height.ok) return failure(person.height.error);
  if (!person.age.ok) return failure(person.age.error);
  if (!person.sex.ok) return failure(person.sex.error);

  if (!guardAdultAge(person.age.value).allowed) {
    return failure({
      code: 'below_minimum_age',
      message:
        'No intake target is shown under 18, because these equations were validated on adults.',
      field: 'age',
    });
  }

  const activity = readChoice(values, 'activity', 'moderately_active') as ActivityLevelId;
  const preset = readChoice(values, 'preset', 'maintenance') as MacroPresetId;

  const bmr = basalMetabolicRate(
    {
      mass: person.mass.value,
      height: person.height.value,
      age: person.age.value,
      sex: person.sex.value,
    },
    'mifflin_st_jeor'
  );
  if (bmr === null) return failure({ code: 'missing', message: 'Enter your details.' });

  const tdee = totalDailyEnergyExpenditure(bmr, activity);
  const goal = calorieGoal({
    tdee,
    sex: person.sex.value,
    age: person.age.value,
    preset: preset === 'cut' ? 'steady_loss' : preset === 'bulk' ? 'steady_gain' : 'maintain',
  });
  const calories = goal.ok ? goal.calories : tdee;

  const split = macroSplitFromPreset(calories, person.mass.value, preset);
  const percentages = macroPercentages(split);

  const grams = (value: number): string => formatNumber(value, locale, 'macroGrams');
  const pct = (value: number): string => formatNumber(value, locale, 'percentage');

  const notes = [
    {
      tone: 'info' as const,
      text: 'Protein is set per kilogram of body weight, fat as a share of energy, and carbohydrate takes the remainder. No preset drops fat below 20% of energy, the lower bound of the Institute of Medicine range.',
    },
  ];

  if (split.carbohydrateFloored) {
    notes.push({
      tone: 'info' as const,
      text: 'The protein and fat targets already account for the whole calorie total at this intake, so carbohydrate comes out at zero. Lowering the protein target per kilogram will open room for it.',
    });
  }

  return {
    ok: true,
    primary: { label: 'Daily calories', value: kcal(calories, locale), unit: 'kcal/day' },
    summary: `On this split you would eat about ${grams(split.proteinGrams)} g of protein, ${grams(split.fatGrams)} g of fat and ${grams(split.carbohydrateGrams)} g of carbohydrate a day.`,
    secondary: [
      {
        label: `Protein (${pct(percentages.protein)}%)`,
        value: grams(split.proteinGrams),
        unit: 'g',
      },
      { label: `Fat (${pct(percentages.fat)}%)`, value: grams(split.fatGrams), unit: 'g' },
      {
        label: `Carbohydrate (${pct(percentages.carbohydrate)}%)`,
        value: grams(split.carbohydrateGrams),
        unit: 'g',
      },
    ],
    notes,
  };
};

export const computeProtein = (values: FormValues, locale: string): CalculatorResult => {
  const mass = readMass(values);
  if (!mass.ok) return failure(mass.error);

  const level = readChoice(values, 'level', 'resistance_training') as ProteinLevelId;
  const target = proteinTarget(mass.value, level);
  const all = allProteinTargets(mass.value);
  const grams = (value: number): string => formatNumber(value, locale, 'macroGrams');

  return {
    ok: true,
    primary: { label: 'Daily protein', value: grams(target), unit: 'g/day' },
    summary: `At this activity level, aim for about ${grams(target)} g of protein a day. The RDA for your body weight is ${grams(proteinRda(mass.value))} g.`,
    secondary: [
      { label: 'RDA (0.8 g/kg)', value: grams(all.rda_baseline), unit: 'g' },
      { label: 'Lightly active (1.2 g/kg)', value: grams(all.lightly_active), unit: 'g' },
      { label: 'Endurance training (1.4 g/kg)', value: grams(all.endurance_training), unit: 'g' },
      { label: 'Resistance training (1.6 g/kg)', value: grams(all.resistance_training), unit: 'g' },
      { label: 'Building muscle (1.8 g/kg)', value: grams(all.building_muscle), unit: 'g' },
      {
        label: 'Training in a deficit (2.2 g/kg)',
        value: grams(all.training_in_a_deficit),
        unit: 'g',
      },
    ],
    notes: [
      {
        tone: 'info',
        text: 'The RDA is the amount that prevents deficiency in most healthy adults, not the amount that is optimal for someone training. Those are different questions, and treating the RDA as a target for a lifter is the most common error in protein advice.',
      },
    ],
  };
};

export const computeWaterIntake = (values: FormValues, locale: string): CalculatorResult => {
  const mass = readMass(values);
  if (!mass.ok) return failure(mass.error);

  const sex = parseSex(readChoice(values, 'sex', 'male'));
  if (!sex.ok) return failure(sex.error);

  const climate = readChoice(values, 'climate', 'temperate') as Climate;
  const minutesRaw = readChoice(values, 'exerciseMinutes', '0');
  const minutes = Number(minutesRaw);
  const duration =
    Number.isFinite(minutes) && minutes > 0 ? minutesToSeconds(minutes) : asSeconds(0);

  const durationCheck = minutes > 0 ? parseDurationSeconds(duration, 'exerciseMinutes') : null;
  if (durationCheck !== null && !durationCheck.ok) return failure(durationCheck.error);

  const result = waterIntake({
    mass: mass.value,
    sex: sex.value,
    ...(minutes > 0 ? { exerciseDuration: duration } : {}),
    climate,
  });

  const litres = (value: number): string => formatNumber(value, locale, 'litres');

  return {
    ok: true,
    primary: { label: 'Daily fluid', value: litres(result.litres), unit: 'litres' },
    summary: `A reasonable daily target is about ${litres(result.litres)} litres of fluid from drinks.`,
    secondary: [
      { label: 'From body weight', value: litres(result.baselineLitres), unit: 'L' },
      { label: 'Added for exercise', value: litres(result.exerciseLitres), unit: 'L' },
      {
        label: 'IOM total water reference',
        value: litres(result.iomTotalWaterLitres),
        unit: 'L',
      },
      {
        label: 'EFSA total water reference',
        value: litres(result.efsaTotalWaterLitres),
        unit: 'L',
      },
    ],
    notes: [
      {
        tone: 'info',
        text: 'The Institute of Medicine report that supplies the reference values also states that the great majority of healthy people meet their needs by letting thirst guide them. These are population reference values, not a target anyone has to hit. The "eight glasses a day" rule has no identifiable source in the literature.',
      },
    ],
  };
};

/**
 * Reads a non-negative nutrition figure straight off a label.
 *
 * Values arrive as typed strings and can also come from the query string, so an
 * unparseable or negative entry is rejected rather than coerced — a negative
 * fat figure would quietly subtract from the score.
 */
const readNutritionValue = (values: FormValues, field: string, max: number): number | null => {
  const raw = values[field];
  if (raw === undefined || raw.trim() === '') return null;

  const parsed = Number(raw.trim());
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > max) return null;
  return parsed;
};

/**
 * Food score from calories, fat and fibre.
 *
 * The result shows all three contributions rather than only the total, because
 * the single useful thing this formula says is how it weighs them against each
 * other — a gram of fibre cancels 2.4 times what a gram of fat adds — and that
 * is invisible in a bare number.
 */
export const computeFoodScore = (values: FormValues, locale: string): CalculatorResult => {
  const kcal = readNutritionValue(values, 'kcal', 5000);
  if (kcal === null) {
    return failure({
      code: 'not_a_number',
      message: 'Enter the calories per serving, as a number of kcal.',
      field: 'kcal',
    });
  }

  const fatGrams = readNutritionValue(values, 'fat', 500) ?? 0;
  const fibreGrams = readNutritionValue(values, 'fibre', 200) ?? 0;

  const result = foodScore({ kcal, fatGrams, fibreGrams });

  const notes: ResultNote[] = [
    {
      tone: 'info',
      text: `This formula counts calories and fat, and gives credit for fibre. It knows nothing about protein, sugar, salt, or whether the food is a vegetable or a biscuit — two foods with the same calories, fat and fibre score identically. Every ${String(fibrePerPoint())} g of fibre cancels one point.`,
    },
  ];

  if (result.floored) {
    notes.push({
      tone: 'info',
      text: 'The fibre subtracted more than the calories and fat added, so the arithmetic went below zero. The score is shown as zero, which is the lowest value the formula was defined to produce.',
    });
  }

  return {
    ok: true,
    primary: { label: 'Food score', value: formatNumber(result.score, locale, 'calories') },
    summary: `This serving scores ${formatNumber(result.score, locale, 'calories')}.`,
    secondary: [
      {
        label: 'From calories',
        value: `+${formatNumber(result.fromCalories, locale, 'bmiPrime')}`,
      },
      { label: 'From fat', value: `+${formatNumber(result.fromFat, locale, 'bmiPrime')}` },
      { label: 'From fibre', value: `−${formatNumber(result.fromFibre, locale, 'bmiPrime')}` },
      { label: 'Before rounding', value: formatNumber(result.raw, locale, 'bmiPrime') },
    ],
    notes,
  };
};
