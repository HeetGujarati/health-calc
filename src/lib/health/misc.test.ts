import { describe, expect, it } from 'vitest';
import {
  ACTIVITY_LEVELS,
  IOM_PAL_BANDS,
  activityEnergyAboveRest,
  activityMultiplier,
  allActivityEstimates,
  iomBandFor,
  totalDailyEnergyExpenditure,
} from './tdee';
import {
  allLeanMassEstimates,
  boerLeanBodyMass,
  humeLeanBodyMass,
  jamesLeanBodyMass,
  leanBodyMass,
} from './leanmass';
import {
  allIdealWeightEstimates,
  idealWeight,
  idealWeightSummary,
  isWithinValidatedHeightRange,
} from './idealweight';
import {
  allMaxHeartRateEstimates,
  foxMaxHeartRate,
  heartRateReserve,
  karvonenTargetHeartRate,
  karvonenZones,
  maxHeartRate,
  percentageOfMaxHeartRate,
  tanakaMaxHeartRate,
} from './heartrate';
import {
  REFERENCE_DURATIONS_MIN,
  REFERENCE_MASSES_KG,
  caloriesBurned,
  caloriesBurnedFromOxygenUptake,
  netCaloriesBurned,
  referenceTable,
} from './caloriesburned';
import { KCAL_PER_GRAM, macroPercentages, macroSplit, macroSplitFromPreset } from './macros';
import {
  PROTEIN_RDA_G_PER_KG,
  allProteinTargets,
  proteinRda,
  proteinTarget,
  proteinTargetFromLeanMass,
} from './protein';
import { CLIMATE_MULTIPLIERS, drinksOnlyFromTotalWater, waterIntake } from './water';
import {
  RACE_DISTANCES,
  finishTime,
  formatDuration,
  pacePerKilometre,
  pacePerMile,
  parseDuration,
  raceDistanceMetres,
  speedKph,
  speedMph,
  splits,
} from './pace';
import { DISPLAY_PRECISION, forDisplay, formatNumber, roundTo } from './rounding';
import { asBeatsPerMinute, asCentimetres, asKilograms, asMet, asSeconds, asYears } from './units';

describe('TDEE', () => {
  it('multiplies BMR by the activity level', () => {
    expect(totalDailyEnergyExpenditure(1780, 'sedentary')).toBeCloseTo(2136, 10);
    expect(totalDailyEnergyExpenditure(1780, 'moderately_active')).toBeCloseTo(2759, 10);
    expect(totalDailyEnergyExpenditure(1780, 'extra_active')).toBeCloseTo(3382, 10);
  });

  it('exposes the five documented levels with the conventional multipliers', () => {
    expect(ACTIVITY_LEVELS.map((l) => l.multiplier)).toEqual([1.2, 1.375, 1.55, 1.725, 1.9]);
    expect(activityMultiplier('sedentary')).toBe(1.2);
  });

  it('maps each multiplier to a published IOM band', () => {
    expect(iomBandFor(1.2)).toBe('sedentary');
    expect(iomBandFor(1.55)).toBe('low_active');
    expect(iomBandFor(1.725)).toBe('active');
    expect(iomBandFor(1.9)).toBe('very_active');
    expect(iomBandFor(3.0)).toBeNull();
  });

  it('keeps the declared IOM band on each level consistent with the bands table', () => {
    // Guards the honesty claim on the page: each conventional multiplier really
    // does sit in the IOM band it is labelled with.
    for (const level of ACTIVITY_LEVELS) {
      expect(iomBandFor(level.multiplier)).toBe(level.iomBand);
    }
    expect(IOM_PAL_BANDS).toHaveLength(4);
  });

  it('reports every level for the comparison table', () => {
    const estimates = allActivityEstimates(2000);
    expect(estimates.sedentary).toBe(2400);
    expect(estimates.extra_active).toBe(3800);
  });

  it('reports activity energy above rest, never negative', () => {
    expect(activityEnergyAboveRest(2400, 2000)).toBe(400);
    expect(activityEnergyAboveRest(1800, 2000)).toBe(0);
  });
});

describe('lean body mass', () => {
  it('matches worked examples for Boer (1984)', () => {
    // 0.407(80) + 0.267(180) - 19.2
    expect(boerLeanBodyMass(asKilograms(80), asCentimetres(180), 'male')).toBeCloseTo(61.42, 10);
    // 0.252(65) + 0.473(165) - 48.3
    expect(boerLeanBodyMass(asKilograms(65), asCentimetres(165), 'female')).toBeCloseTo(46.125, 10);
    expect(boerLeanBodyMass(asKilograms(70), asCentimetres(175), 'male')).toBeCloseTo(56.015, 10);
  });

  it('matches worked examples for James (1976)', () => {
    // 1.10(80) - 128(80/180)^2
    expect(jamesLeanBodyMass(asKilograms(80), asCentimetres(180), 'male')).toBeCloseTo(
      62.716049,
      6
    );
    expect(jamesLeanBodyMass(asKilograms(65), asCentimetres(165), 'female')).toBeCloseTo(
      46.58214,
      6
    );
  });

  it('matches worked examples for Hume (1966)', () => {
    // 0.32810(80) + 0.33929(180) - 29.5336
    expect(humeLeanBodyMass(asKilograms(80), asCentimetres(180), 'male')).toBeCloseTo(57.7866, 6);
    expect(humeLeanBodyMass(asKilograms(65), asCentimetres(165), 'female')).toBeCloseTo(44.918, 6);
  });

  it('turns over at extreme mass under James, which the page warns about', () => {
    // The squared W/H term makes James non-monotonic; documented, not hidden.
    const a = jamesLeanBodyMass(asKilograms(200), asCentimetres(175), 'male');
    const b = jamesLeanBodyMass(asKilograms(250), asCentimetres(175), 'male');
    expect(b).toBeLessThan(a);
  });

  it('dispatches to each formula', () => {
    const mass = asKilograms(80);
    const height = asCentimetres(180);
    expect(leanBodyMass(mass, height, 'male', 'boer')).toBeCloseTo(61.42, 10);
    expect(leanBodyMass(mass, height, 'male', 'james')).toBeCloseTo(62.716049, 6);
    expect(leanBodyMass(mass, height, 'male', 'hume')).toBeCloseTo(57.7866, 6);
    expect(Object.keys(allLeanMassEstimates(mass, height, 'male'))).toEqual([
      'boer',
      'james',
      'hume',
    ]);
  });
});

describe('ideal weight', () => {
  it('matches worked examples at 5 ft 10 in (177.8 cm)', () => {
    const height = asCentimetres(177.8); // exactly 70 inches
    // Devine male: 50 + 2.3 x 10
    expect(idealWeight(height, 'male', 'devine')).toBeCloseTo(73, 8);
    // Robinson male: 52 + 1.9 x 10
    expect(idealWeight(height, 'male', 'robinson')).toBeCloseTo(71, 8);
    // Miller male: 56.2 + 1.41 x 10
    expect(idealWeight(height, 'male', 'miller')).toBeCloseTo(70.3, 8);
    // Hamwi male: 48 + 2.7 x 10
    expect(idealWeight(height, 'male', 'hamwi')).toBeCloseTo(75, 8);
  });

  it('matches worked examples for women at 5 ft 5 in (165.1 cm)', () => {
    const height = asCentimetres(165.1); // exactly 65 inches
    expect(idealWeight(height, 'female', 'devine')).toBeCloseTo(57, 8); // 45.5 + 2.3 x 5
    expect(idealWeight(height, 'female', 'robinson')).toBeCloseTo(57.5, 8); // 49 + 1.7 x 5
    expect(idealWeight(height, 'female', 'miller')).toBeCloseTo(59.9, 8); // 53.1 + 1.36 x 5
    expect(idealWeight(height, 'female', 'hamwi')).toBeCloseTo(56.5, 8); // 45.5 + 2.2 x 5
  });

  it('returns the base value at exactly five feet', () => {
    const height = asCentimetres(152.4); // exactly 60 inches
    expect(idealWeight(height, 'male', 'devine')).toBeCloseTo(50, 8);
    expect(idealWeight(height, 'female', 'devine')).toBeCloseTo(45.5, 8);
  });

  it('flags heights below the range the equations were built for', () => {
    expect(isWithinValidatedHeightRange(asCentimetres(152.4))).toBe(true);
    expect(isWithinValidatedHeightRange(asCentimetres(145))).toBe(false);
  });

  it('always returns the healthy BMI range alongside the point estimates', () => {
    const summary = idealWeightSummary(asCentimetres(175), 'male');
    expect(summary.healthyBmiRange.minKg).toBeCloseTo(56.65625, 6);
    expect(summary.healthyBmiRange.maxKg).toBeCloseTo(76.5625, 6);
    expect(Object.keys(summary.estimates)).toHaveLength(4);
    expect(Object.keys(allIdealWeightEstimates(asCentimetres(175), 'male'))).toEqual([
      'devine',
      'robinson',
      'miller',
      'hamwi',
    ]);
  });
});

describe('heart rate', () => {
  it('matches Fox and Tanaka worked examples', () => {
    expect(foxMaxHeartRate(asYears(20))).toBe(200);
    expect(foxMaxHeartRate(asYears(40))).toBe(180);
    expect(foxMaxHeartRate(asYears(60))).toBe(160);

    expect(tanakaMaxHeartRate(asYears(20))).toBeCloseTo(194, 10);
    expect(tanakaMaxHeartRate(asYears(40))).toBeCloseTo(180, 10);
    expect(tanakaMaxHeartRate(asYears(60))).toBeCloseTo(166, 10);
  });

  it('crosses over at age 40, with Tanaka higher afterwards', () => {
    // The practical consequence of Fox under-predicting for older adults.
    expect(tanakaMaxHeartRate(asYears(40))).toBeCloseTo(foxMaxHeartRate(asYears(40)), 10);
    expect(tanakaMaxHeartRate(asYears(65))).toBeGreaterThan(foxMaxHeartRate(asYears(65)));
    expect(tanakaMaxHeartRate(asYears(25))).toBeLessThan(foxMaxHeartRate(asYears(25)));
  });

  it('computes Karvonen targets from heart rate reserve', () => {
    // (180 - 60) x 0.7 + 60
    expect(karvonenTargetHeartRate(asBeatsPerMinute(180), asBeatsPerMinute(60), 0.7)).toBeCloseTo(
      144,
      10
    );
    expect(karvonenTargetHeartRate(asBeatsPerMinute(180), asBeatsPerMinute(60), 0)).toBeCloseTo(
      60,
      10
    );
    expect(karvonenTargetHeartRate(asBeatsPerMinute(180), asBeatsPerMinute(60), 1)).toBeCloseTo(
      180,
      10
    );
  });

  it('differs from the plain percentage method, which is why Karvonen is default', () => {
    const max = asBeatsPerMinute(180);
    expect(karvonenTargetHeartRate(max, asBeatsPerMinute(60), 0.7)).not.toBeCloseTo(
      percentageOfMaxHeartRate(max, 0.7),
      1
    );
  });

  it('accounts for resting heart rate', () => {
    const max = asBeatsPerMinute(190);
    const fitter = karvonenTargetHeartRate(max, asBeatsPerMinute(50), 0.7);
    const lessFit = karvonenTargetHeartRate(max, asBeatsPerMinute(80), 0.7);
    expect(lessFit).toBeGreaterThan(fitter);
  });

  it('builds five contiguous zones', () => {
    const zones = karvonenZones(asBeatsPerMinute(180), asBeatsPerMinute(60));
    expect(zones).toHaveLength(5);
    expect(zones[0]?.minBpm).toBeCloseTo(120, 10);
    expect(zones[4]?.maxBpm).toBeCloseTo(180, 10);
    for (let i = 1; i < zones.length; i += 1) {
      expect(zones[i]?.minBpm).toBeCloseTo(zones[i - 1]!.maxBpm, 10);
    }
  });

  it('reports heart rate reserve and dispatches by formula', () => {
    expect(heartRateReserve(asBeatsPerMinute(190), asBeatsPerMinute(55))).toBe(135);
    expect(maxHeartRate(asYears(30), 'fox')).toBe(190);
    expect(maxHeartRate(asYears(30), 'tanaka')).toBeCloseTo(187, 10);
    expect(Object.keys(allMaxHeartRateEstimates(asYears(30)))).toEqual(['tanaka', 'fox']);
  });
});

describe('calories burned', () => {
  it('matches the simple MET form', () => {
    // 8 METs, 70 kg, 1 hour
    expect(caloriesBurned(asMet(8), asKilograms(70), asSeconds(3600))).toBeCloseTo(560, 10);
    // 3.5 METs, 80 kg, 30 minutes
    expect(caloriesBurned(asMet(3.5), asKilograms(80), asSeconds(1800))).toBeCloseTo(140, 10);
    expect(caloriesBurned(asMet(6), asKilograms(65), asSeconds(2700))).toBeCloseTo(292.5, 10);
  });

  it('reads about 5 percent higher via the oxygen-uptake form', () => {
    const simple = caloriesBurned(asMet(8), asKilograms(70), asSeconds(3600));
    const oxygen = caloriesBurnedFromOxygenUptake(asMet(8), asKilograms(70), asSeconds(3600));
    expect(oxygen).toBeCloseTo(588, 10);
    expect(oxygen / simple).toBeCloseTo(1.05, 10);
  });

  it('subtracts the resting cost for the net figure', () => {
    // An 8 MET hour adds seven METs' worth, not eight.
    expect(netCaloriesBurned(asMet(8), asKilograms(70), asSeconds(3600))).toBeCloseTo(490, 10);
    // Below resting the net can never go negative.
    expect(netCaloriesBurned(asMet(0.9), asKilograms(70), asSeconds(3600))).toBe(0);
  });

  it('builds the 6 by 6 reference grid', () => {
    const table = referenceTable(asMet(5));
    expect(REFERENCE_MASSES_KG).toHaveLength(6);
    expect(REFERENCE_DURATIONS_MIN).toHaveLength(6);
    expect(table).toHaveLength(36);
    // 5 METs, 55 kg, 15 min
    expect(table[0]).toEqual({ massKg: 55, minutes: 15, kcal: 68.75 });
  });
});

describe('macros', () => {
  it('uses the Atwater factors', () => {
    expect(KCAL_PER_GRAM).toEqual({ protein: 4, carbohydrate: 4, fat: 9 });
  });

  it('splits a target into grams', () => {
    // 2000 kcal, 80 kg, 1.6 g/kg protein, 30% fat
    const split = macroSplit(2000, asKilograms(80), 1.6, 0.3);
    expect(split.proteinGrams).toBeCloseTo(128, 10);
    expect(split.proteinKcal).toBeCloseTo(512, 10);
    expect(split.fatKcal).toBeCloseTo(600, 10);
    expect(split.fatGrams).toBeCloseTo(66.666667, 6);
    expect(split.carbohydrateKcal).toBeCloseTo(888, 10);
    expect(split.carbohydrateGrams).toBeCloseTo(222, 10);
    expect(split.carbohydrateFloored).toBe(false);
  });

  it('always sums the three macros back to the calorie target', () => {
    for (const calories of [1500, 2000, 2500, 3000]) {
      const split = macroSplit(calories, asKilograms(75), 1.8, 0.28);
      expect(split.proteinKcal + split.fatKcal + split.carbohydrateKcal).toBeCloseTo(calories, 8);
    }
  });

  it('floors carbohydrate at zero rather than going negative', () => {
    // High protein target against a low calorie target leaves no remainder.
    const split = macroSplit(1200, asKilograms(120), 2.2, 0.35);
    expect(split.carbohydrateGrams).toBe(0);
    expect(split.carbohydrateFloored).toBe(true);
  });

  it('applies each preset', () => {
    const split = macroSplitFromPreset(2200, asKilograms(70), 'cut');
    expect(split.proteinGrams).toBeCloseTo(140, 10); // 2.0 g/kg
    expect(split.fatKcal).toBeCloseTo(550, 10); // 25%
  });

  it('reports percentages summing to 100', () => {
    const percentages = macroPercentages(macroSplit(2000, asKilograms(80), 1.6, 0.3));
    expect(percentages.protein + percentages.fat + percentages.carbohydrate).toBeCloseTo(100, 8);
  });

  it('reports zeroes for an empty split rather than dividing by zero', () => {
    expect(macroPercentages(macroSplit(0, asKilograms(80), 0, 0))).toEqual({
      protein: 0,
      fat: 0,
      carbohydrate: 0,
    });
  });
});

describe('protein', () => {
  it('uses the published RDA', () => {
    expect(PROTEIN_RDA_G_PER_KG).toBe(0.8);
    expect(proteinRda(asKilograms(70))).toBeCloseTo(56, 10);
  });

  it('scales targets by level', () => {
    expect(proteinTarget(asKilograms(80), 'rda_baseline')).toBeCloseTo(64, 10);
    expect(proteinTarget(asKilograms(80), 'resistance_training')).toBeCloseTo(128, 10);
    expect(proteinTarget(asKilograms(80), 'training_in_a_deficit')).toBeCloseTo(176, 10);
  });

  it('rises monotonically across the levels', () => {
    const targets = Object.values(allProteinTargets(asKilograms(75)));
    for (let i = 1; i < targets.length; i += 1) {
      expect(targets[i]!).toBeGreaterThan(targets[i - 1]!);
    }
  });

  it('supports a lean-mass basis for higher body fat percentages', () => {
    expect(proteinTargetFromLeanMass(asKilograms(60))).toBeCloseTo(120, 10);
    expect(proteinTargetFromLeanMass(asKilograms(60), 2.4)).toBeCloseTo(144, 10);
  });
});

describe('water intake', () => {
  it('derives a baseline from body mass', () => {
    // Midpoint of 30-35 mL/kg is 32.5; 70 kg -> 2.275 L
    const result = waterIntake({ mass: asKilograms(70), sex: 'male' });
    expect(result.baselineLitres).toBeCloseTo(2.275, 10);
    expect(result.litres).toBeCloseTo(2.275, 10);
  });

  it('adds fluid for exercise', () => {
    const result = waterIntake({
      mass: asKilograms(70),
      sex: 'male',
      exerciseDuration: asSeconds(3600),
    });
    expect(result.exerciseLitres).toBeCloseTo(0.5, 10);
    expect(result.litres).toBeCloseTo(2.775, 10);
  });

  it('scales for climate', () => {
    const hot = waterIntake({ mass: asKilograms(70), sex: 'male', climate: 'hot' });
    expect(hot.litres).toBeCloseTo(2.275 * CLIMATE_MULTIPLIERS.hot, 10);
    expect(CLIMATE_MULTIPLIERS.temperate).toBe(1);
  });

  it('reports both published reference values for context', () => {
    const result = waterIntake({ mass: asKilograms(70), sex: 'female' });
    expect(result.iomTotalWaterLitres).toBe(2.7);
    expect(result.efsaTotalWaterLitres).toBe(2.0);
  });

  it('converts total water to drinks only', () => {
    expect(drinksOnlyFromTotalWater(3.7)).toBeCloseTo(2.96, 10);
  });
});

describe('pace', () => {
  it('knows the official race distances', () => {
    expect(raceDistanceMetres('marathon')).toBe(42_195);
    expect(raceDistanceMetres('half-marathon')).toBe(21_097.5);
    expect(raceDistanceMetres('5k')).toBe(5000);
    expect(raceDistanceMetres('1-mile')).toBeCloseTo(1609.344, 10);
    expect(RACE_DISTANCES).toHaveLength(10);
  });

  it('converts between pace, speed and time', () => {
    // 10 km in 50 minutes: 5:00 per km
    const time = asSeconds(3000);
    expect(pacePerKilometre(10_000, time)).toBeCloseTo(300, 10);
    expect(speedKph(10_000, time)).toBeCloseTo(12, 10);
    expect(pacePerMile(10_000, time)).toBeCloseTo(482.8032, 6);
    expect(speedMph(10_000, time)).toBeCloseTo(7.456454, 6);
  });

  it('round-trips pace back to finish time', () => {
    const pace = pacePerKilometre(42_195, asSeconds(14_400)); // 4 hour marathon
    expect(finishTime(42_195, pace)).toBeCloseTo(14_400, 8);
  });

  it('includes the partial final split of a marathon', () => {
    // 42.195 km in 1 km splits: 42 full plus a 195 m remainder.
    const marathonSplits = splits(42_195, asSeconds(14_400), 1000);
    expect(marathonSplits).toHaveLength(43);
    expect(marathonSplits[42]?.partial).toBe(true);
    expect(marathonSplits[42]?.cumulativeMetres).toBe(42_195);
    expect(marathonSplits[42]?.cumulativeSeconds).toBeCloseTo(14_400, 8);
  });

  it('emits no partial split when the distance divides exactly', () => {
    const tenK = splits(10_000, asSeconds(3000), 1000);
    expect(tenK).toHaveLength(10);
    expect(tenK.every((split) => !split.partial)).toBe(true);
  });

  it('returns nothing for nonsensical split parameters', () => {
    expect(splits(10_000, asSeconds(3000), 0)).toEqual([]);
    expect(splits(0, asSeconds(3000), 1000)).toEqual([]);
  });

  it('formats durations', () => {
    expect(formatDuration(3000)).toBe('50:00');
    expect(formatDuration(14_400)).toBe('4:00:00');
    expect(formatDuration(305)).toBe('5:05');
    expect(formatDuration(-1)).toBe('--');
    expect(formatDuration(Number.NaN)).toBe('--');
  });

  it('parses durations in the forms people type', () => {
    expect(parseDuration('50:00')).toBe(3000);
    expect(parseDuration('4:00:00')).toBe(14_400);
    expect(parseDuration('90')).toBe(90);
    expect(parseDuration(' 5:05 ')).toBe(305);
  });

  it('rejects malformed durations rather than guessing', () => {
    expect(parseDuration('')).toBeNull();
    expect(parseDuration('abc')).toBeNull();
    expect(parseDuration('1:2:3:4')).toBeNull();
    expect(parseDuration('-5:00')).toBeNull();
    // 1:75 must not silently become 135 seconds.
    expect(parseDuration('1:75')).toBeNull();
  });
});

describe('rounding', () => {
  it('rounds to the requested precision', () => {
    expect(roundTo(22.857143, 1)).toBe(22.9);
    expect(roundTo(1780.4, 0)).toBe(1780);
    expect(roundTo(0.472222, 3)).toBe(0.472);
  });

  it('rounds half away from zero, symmetrically', () => {
    // Math.round(-0.5) is -0, which is asymmetric; this must not be.
    expect(roundTo(0.5, 0)).toBe(1);
    expect(roundTo(-0.5, 0)).toBe(-1);
    expect(roundTo(2.5, 0)).toBe(3);
    expect(roundTo(-2.5, 0)).toBe(-3);
  });

  it('returns NaN for non-finite input rather than a misleading zero', () => {
    expect(roundTo(Number.NaN, 2)).toBeNaN();
    expect(roundTo(Number.POSITIVE_INFINITY, 2)).toBeNaN();
  });

  it('applies the registered precision per quantity', () => {
    expect(DISPLAY_PRECISION.calories).toBe(0);
    expect(DISPLAY_PRECISION.whtr).toBe(3);
    expect(forDisplay(1780.62, 'calories')).toBe(1781);
    expect(forDisplay(22.857143, 'bmi')).toBe(22.9);
    expect(forDisplay(0.4722222, 'whtr')).toBe(0.472);
  });

  it('formats numbers per locale', () => {
    expect(formatNumber(1780.62, 'en-US', 'calories')).toBe('1,781');
    expect(formatNumber(22.857143, 'en-US', 'bmi')).toBe('22.9');
    // German uses a comma as the decimal separator.
    expect(formatNumber(22.857143, 'de-DE', 'bmi')).toBe('22,9');
  });
});
