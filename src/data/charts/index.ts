import type { ReferenceTable } from '../calculators/types';
import {
  armyTable,
  bmiTable,
  bmrTable,
  bodyFatTable,
  caloriesBurnedTable,
  healthyWeightTable,
  heartRateTable,
  macroTable,
  paceTable,
  percentageOfMaxTable,
  proteinTable,
} from '../calculators/referenceTables';

/**
 * Reference charts.
 *
 * Each chart is a real rendered table computed from the same functions the
 * calculators use — never an image, and never a grid without an explanation of
 * how to read it. Both of those are section 5.2 requirements, and both are
 * things chart pages on other sites routinely get wrong.
 *
 * The tables are shared with the calculator pages rather than duplicated, so a
 * chart and the calculator it belongs to cannot disagree.
 */
export interface ChartDefinition {
  readonly slug: string;
  readonly heading: string;
  readonly metaTitle: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly intro: string;
  /** How to read this chart, and what it cannot tell you. */
  readonly howToRead: readonly string[];
  readonly table: ReferenceTable;
  /** The calculator this chart is the static counterpart of. */
  readonly calculatorSlug: string;
  readonly relatedGuides: readonly string[];
  readonly lastUpdated: string;
}

const REVIEWED = '2026-08-20';

export const CHART_DEFINITIONS: readonly ChartDefinition[] = [
  {
    slug: 'bmi-chart',
    heading: 'BMI chart for adults',
    metaTitle: 'BMI chart — body mass index by height and weight',
    description:
      'A full BMI table by height and weight, with the WHO categories and an explanation of what the number can and cannot tell you.',
    keywords: ['bmi chart', 'bmi table', 'body mass index chart'],
    intro:
      'Body mass index for every combination of common heights and weights, computed from the standard equation.',
    howToRead: [
      'Find your height down the left edge and your weight across the top. The cell where they meet is your BMI.',
      'Values from 18.5 up to but not including 25 fall in the WHO healthy band. The commonly seen "18.5 to 24.9" is a rounding of the same boundary.',
      'The chart cannot distinguish muscle from fat. A muscular person reads high while carrying very little body fat, which is a limitation of the index rather than an error in the table.',
    ],
    table: bmiTable(),
    calculatorSlug: 'bmi',
    relatedGuides: ['why-bmi-is-a-screening-tool', 'why-scale-weight-fluctuates'],
    lastUpdated: REVIEWED,
  },
  {
    slug: 'healthy-weight-by-height',
    heading: 'Healthy weight by height',
    metaTitle: 'Healthy weight chart by height',
    description:
      'The weight range corresponding to a BMI of 18.5 to 25 at each height, with the lower bound, upper bound and midpoint.',
    keywords: ['healthy weight chart', 'weight for height chart', 'ideal weight by height'],
    intro:
      'The WHO healthy BMI band converted to a weight range at each height. A wide population band, not a target.',
    howToRead: [
      'Find your height on the left. The first two columns are the weights corresponding to a BMI of 18.5 and 25.',
      'The midpoint is shown because people ask for it. There is no evidence that the middle of the band is better than anywhere else in it.',
      'A healthy weight for an individual can sit outside this range, particularly for muscular people and for older adults.',
    ],
    table: healthyWeightTable(),
    calculatorSlug: 'healthy-weight-range',
    relatedGuides: ['why-bmi-is-a-screening-tool', 'building-a-sustainable-calorie-target'],
    lastUpdated: REVIEWED,
  },
  {
    slug: 'body-fat-chart',
    heading: 'Body fat percentage by waist and neck',
    metaTitle: 'Body fat chart — US Navy method by measurement',
    description:
      'Body fat percentage from the US Navy circumference method across a range of waist and neck measurements, with its error margin stated.',
    keywords: ['body fat chart', 'body fat percentage table', 'navy body fat chart'],
    intro:
      'The US Navy circumference method applied across common waist and neck measurements, for men at 178 cm.',
    howToRead: [
      'Find your waist down the left edge and your neck across the top. The method works from the difference between the two, so a larger neck at the same waist reads lower.',
      'Typical error against hydrostatic weighing is three to four percentage points, so read each figure as a band rather than a point.',
      'The table is computed at a single height. Taller people read slightly lower at the same measurements, shorter people slightly higher.',
    ],
    table: bodyFatTable(),
    calculatorSlug: 'body-fat',
    relatedGuides: ['how-the-navy-method-works', 'body-fat-methods-compared'],
    lastUpdated: REVIEWED,
  },
  {
    slug: 'met-values-chart',
    heading: 'MET values and energy used by activity',
    metaTitle: 'MET values chart — energy by activity and weight',
    description:
      'Energy used per thirty minutes across a range of activity intensities and body weights, computed from published MET values.',
    keywords: ['met values chart', 'calories burned chart', 'met table'],
    intro:
      'Energy used in thirty minutes at each activity intensity, by body weight. A MET is a multiple of resting metabolic rate.',
    howToRead: [
      'Find the intensity of your activity on the left and your body weight across the top.',
      'Walking briskly is around 4 METs, running at 10 km/h is around 10, and vigorous weight training is around 6.',
      'These are gross figures: they include the resting energy you would have spent anyway. Subtract roughly one MET-hour to get what the activity actually added.',
    ],
    table: caloriesBurnedTable(),
    calculatorSlug: 'calories-burned',
    relatedGuides: ['met-values-explained', 'the-maintenance-calories-misconception'],
    lastUpdated: REVIEWED,
  },
  {
    slug: 'one-rep-max-percentage-chart',
    heading: 'One rep max percentage chart',
    metaTitle: '1RM percentage chart — training loads',
    description:
      'Training loads as a percentage of a one rep max, from 50 to 95 per cent, across common maximum values.',
    keywords: ['1rm percentage chart', 'percentage of max chart', 'training load chart'],
    intro:
      'Training loads at each percentage of a one rep max. Most strength work sits between 70 and 90 per cent.',
    howToRead: [
      'Find your one rep max down the left edge and read across to the percentage you want.',
      'Roughly: 50 to 65 per cent for technique and speed work, 70 to 80 for hypertrophy, 80 to 90 for strength, above 90 for peaking.',
      'These sit on top of an estimated maximum that already carries error. If a prescribed load feels much heavier than expected, adjust the weight rather than trusting the arithmetic.',
    ],
    table: percentageOfMaxTable(),
    calculatorSlug: 'one-rep-max',
    relatedGuides: ['one-rep-max-formulas-compared', 'how-to-set-a-protein-target'],
    lastUpdated: REVIEWED,
  },
  {
    slug: 'heart-rate-zones-chart',
    heading: 'Target heart rate zones by age',
    metaTitle: 'Heart rate zone chart by age',
    description:
      'Training heart rate zones by age, computed with the Karvonen heart rate reserve method from the Tanaka maximum.',
    keywords: ['heart rate zone chart', 'target heart rate by age', 'karvonen chart'],
    intro:
      'Five training zones by age, using heart rate reserve at a resting rate of 65 beats per minute.',
    howToRead: [
      'Find your age on the left. The first column is the estimated maximum; the rest are training zones in beats per minute.',
      'These assume a resting heart rate of 65. A different resting rate shifts every zone, which is exactly why the Karvonen method is preferred over a flat percentage of maximum.',
      'Maximum heart rate carries roughly ten beats of individual variation, so treat the boundaries as approximate and cross-check against perceived effort.',
    ],
    table: heartRateTable(),
    calculatorSlug: 'target-heart-rate',
    relatedGuides: ['understanding-heart-rate-zones', 'met-values-explained'],
    lastUpdated: REVIEWED,
  },
  {
    slug: 'protein-needs-chart',
    heading: 'Protein needs by body weight',
    metaTitle: 'Protein chart — daily grams by body weight',
    description:
      'Daily protein in grams across body weights and activity levels, from the RDA baseline to intakes for training in a deficit.',
    keywords: ['protein chart', 'protein by body weight', 'protein per kg table'],
    intro:
      'Daily protein in grams for each body weight and activity level. The first column is the RDA, which is a deficiency floor rather than a target.',
    howToRead: [
      'Find your body weight on the left and read across to the intake per kilogram that matches how you train.',
      'The 0.8 g/kg column prevents deficiency in sedentary adults. It is not a target for someone training.',
      'Evidence supports around 1.6 g/kg for resistance training, with benefit up to roughly 2.2 g/kg, and the upper end during a calorie deficit.',
    ],
    table: proteinTable(),
    calculatorSlug: 'protein',
    relatedGuides: ['how-to-set-a-protein-target', 'building-a-sustainable-calorie-target'],
    lastUpdated: REVIEWED,
  },
  {
    slug: 'calorie-needs-chart',
    heading: 'Calorie needs by age and weight',
    metaTitle: 'Calorie needs chart by age and weight',
    description:
      'Basal metabolic rate by age and body weight for men and women, computed with the Mifflin-St Jeor equation.',
    keywords: ['calorie needs chart', 'bmr chart', 'calories by age'],
    intro:
      'Basal metabolic rate by age and weight, at a height of 175 cm. Multiply by an activity level to get daily energy use.',
    howToRead: [
      'Find your weight and equation set on the left, then read across to your age.',
      'These are basal rates — what the body uses at complete rest. They are not intake targets.',
      'BMR falls by about 5 kcal per year of age in this equation, which is why the figures shrink to the right.',
    ],
    table: bmrTable(),
    calculatorSlug: 'bmr',
    relatedGuides: ['how-bmr-is-calculated', 'bmr-equations-compared'],
    lastUpdated: REVIEWED,
  },
  {
    slug: 'marathon-pace-chart',
    heading: 'Race pace chart',
    metaTitle: 'Marathon pace chart — finish times by pace',
    description:
      'Finish times at each pace across 5k, 10k, half marathon and marathon, with a note on why constant-pace projections mislead.',
    keywords: ['marathon pace chart', 'pace chart', 'race pace table'],
    intro: 'Finish times at each pace per kilometre, across the four most common race distances.',
    howToRead: [
      'Find your pace per kilometre on the left and read across to the distance you are racing.',
      'Every column assumes the pace holds for the whole distance. It generally does not — pace falls as distance rises.',
      'For an actual prediction across distances, Riegel’s formula applies a fatigue exponent rather than assuming constant pace.',
    ],
    table: paceTable(),
    calculatorSlug: 'running-pace',
    relatedGuides: ['how-to-read-a-pace-chart', 'understanding-heart-rate-zones'],
    lastUpdated: REVIEWED,
  },
  {
    slug: 'macro-split-chart',
    heading: 'Macro split comparison',
    metaTitle: 'Macro split chart — grams by preset',
    description:
      'Daily protein, fat and carbohydrate in grams for each macronutrient preset, at a fixed calorie level and body weight.',
    keywords: ['macro split chart', 'macro comparison', 'macronutrient table'],
    intro:
      'Grams per day for each preset at 2,200 kcal for a 75 kg person, so the presets can be compared directly.',
    howToRead: [
      'Each row is a preset. Protein scales with body weight, fat is a share of energy, and carbohydrate takes the remainder.',
      'The carbohydrate column moves most, because it absorbs whatever protein and fat leave behind.',
      'No preset drops fat below 20 per cent of energy, the lower bound of the Institute of Medicine range.',
    ],
    table: macroTable(),
    calculatorSlug: 'macro',
    relatedGuides: ['how-to-set-a-protein-target', 'building-a-sustainable-calorie-target'],
    lastUpdated: REVIEWED,
  },
  {
    slug: 'army-body-composition-chart',
    heading: 'Army waist-to-height standard',
    metaTitle: 'Army body composition chart — WHtR standard',
    description:
      'Waist-to-height ratio against the current Army standard of below 0.55, with the largest passing waist at each height.',
    keywords: ['army body fat chart', 'army whtr chart', 'army tape test chart'],
    intro:
      'Waist-to-height ratio at each height and waist, against the standard set by Army Directive 2026-13.',
    howToRead: [
      'Find your height on the left and your waist across the top. Values marked ✗ do not meet the standard.',
      'The standard is a ratio below 0.55, recorded to three decimal places, with no age or sex adjustment.',
      'The final column is the largest waist that meets the standard at that height, to the nearest tenth of a centimetre.',
    ],
    table: armyTable(),
    calculatorSlug: 'army-body-fat',
    relatedGuides: ['body-fat-methods-compared', 'how-the-navy-method-works'],
    lastUpdated: REVIEWED,
  },
];

const BY_SLUG = new Map(CHART_DEFINITIONS.map((chart) => [chart.slug, chart]));

export const getChart = (slug: string): ChartDefinition | null => BY_SLUG.get(slug) ?? null;
