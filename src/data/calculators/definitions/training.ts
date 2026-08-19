import type { CalculatorDefinition } from '../types';
import { REVIEWED, ageInput, steps, weightInput } from './fields';
import { caloriesBurnedTable, heartRateTable, oneRepMaxTable, paceTable } from '../referenceTables';

/** Training calculators. */

export const oneRepMax: CalculatorDefinition = {
  slug: 'one-rep-max',
  category: 'training',
  heading: 'One rep max calculator',
  metaTitle: 'One rep max calculator — five formulas',
  description:
    'Estimate your one rep max from a set with Epley, Brzycki, Lombardi, O’Conner and Wathan, with a percentage table and an honest note on where each is reliable.',
  keywords: ['one rep max calculator', '1rm calculator', 'epley formula', 'brzycki formula'],
  applicationSubCategory: 'Strength training',
  intro:
    'Enter a weight and the repetitions you managed with it. All five published equations are shown, because they agree at low repetitions and diverge sharply above ten.',
  inputs: [
    {
      name: 'load',
      label: 'Weight lifted',
      type: 'number',
      min: 1,
      max: 1000,
      step: 0.5,
      unit: { metric: 'kg', imperial: 'lb' },
    },
    {
      name: 'reps',
      label: 'Repetitions',
      hint: 'The number completed with good form, at or near failure.',
      type: 'number',
      min: 1,
      max: 20,
      step: 1,
      defaultValue: '5',
    },
    {
      name: 'formula',
      label: 'Formula',
      type: 'select',
      defaultValue: 'epley',
      options: [
        { value: 'epley', label: 'Epley (1985)' },
        { value: 'brzycki', label: 'Brzycki (1993)' },
        { value: 'lombardi', label: 'Lombardi (1989)' },
        { value: 'oconner', label: "O'Conner (1989)" },
        { value: 'wathan', label: 'Wathan (1994)' },
      ],
    },
  ],
  formulas: [
    {
      id: 'epley',
      name: 'Epley',
      expression: ['1RM = w × (1 + r / 30)'],
      source: 'Epley B., "Poundage Chart", Body Enterprises, Lincoln NE, 1985.',
      year: 1985,
      assumes: 'A linear relationship between repetitions and load, which holds reasonably to ten.',
      accuracy:
        'The most widely used, and the default here. Note it is not exact at a single repetition: it returns 103.3 kg for a 100 kg single, which is a property of the equation rather than an error.',
      isDefault: true,
    },
    {
      id: 'brzycki',
      name: 'Brzycki',
      expression: ['1RM = w × 36 / (37 − r)'],
      source:
        'Brzycki M., Journal of Physical Education, Recreation and Dance 64(1), 1993, pp. 88–90.',
      year: 1993,
      assumes: 'The same linear model, expressed as a ratio.',
      accuracy:
        'Exact at one repetition, and generally the most conservative in the two-to-ten range. Undefined at 37 repetitions, where its denominator reaches zero.',
    },
    {
      id: 'lombardi',
      name: 'Lombardi',
      expression: ['1RM = w × r^0.10'],
      source: 'Lombardi VP., "Beginning Weight Training", Wm. C. Brown, Dubuque IA, 1989.',
      year: 1989,
      assumes: 'A power relationship rather than a linear one.',
      accuracy:
        'Reads highest of the five at moderate repetitions. Its power form makes it better behaved at high repetition counts than the linear equations, though all five are unreliable there.',
    },
    {
      id: 'oconner',
      name: "O'Conner",
      expression: ['1RM = w × (1 + r / 40)'],
      source: 'O\'Conner B, Simmons J, O\'Shea P., "Weight Training Today", West Publishing, 1989.',
      year: 1989,
      assumes: 'The same linear model as Epley with a gentler slope.',
      accuracy:
        'The most conservative of the five at higher repetitions, since dividing by 40 rather than 30 credits each repetition less.',
    },
    {
      id: 'wathan',
      name: 'Wathan',
      expression: ['1RM = 100w / (48.8 + 53.8 × e^(−0.075r))'],
      source:
        'Wathan D., "Load assignment", in Baechle TR (ed), Essentials of Strength Training and Conditioning, Human Kinetics, 1994, pp. 435–446.',
      year: 1994,
      assumes: 'An exponential decay in the relationship between repetitions and load.',
      accuracy:
        'The most sophisticated model of the five, and it tracks measured data well across a wider repetition range than the linear equations. Its exponential form means it never becomes undefined.',
    },
  ],
  howToSteps: steps(
    'the weight you lifted and the repetitions you completed',
    'your estimated one rep max under all five equations, plus a percentage table'
  ),
  faq: [
    {
      question: 'How accurate are one rep max estimates?',
      answer:
        'Within a few per cent in the two-to-five repetition range, and progressively worse above that. The honest way to read this page is to look at the spread between the five formulas: when they agree closely, the estimate is reliable; when they diverge, it is not.',
    },
    {
      question: 'Which formula is best?',
      answer:
        'Wathan and Epley track measured data well across the widest range. Brzycki is the most conservative and exact at a single repetition. For programming purposes, the average of all five is a more defensible single number than any one of them.',
    },
    {
      question: 'Why do the formulas disagree more at higher repetitions?',
      answer:
        'Because above roughly ten repetitions the limiting factor stops being maximal strength and becomes muscular endurance, which varies enormously between people and between exercises. The equations were fitted in the low-repetition range and are extrapolating beyond it.',
    },
    {
      question: 'Does the exercise matter?',
      answer:
        'Yes, considerably. These equations were derived largely from bench press and squat data. Exercises with a smaller range of motion or more technical demand — deadlifts, Olympic lifts — typically produce fewer repetitions at the same percentage, so estimates read high.',
    },
    {
      question: 'Should I test my actual one rep max?',
      answer:
        'Only if you need the number for competition, and only with a spotter and a proper warm-up. For programming purposes an estimate from a set of three to five is nearly as useful and carries far less risk.',
    },
    {
      question: 'Why is Epley not exact at one repetition?',
      answer:
        'Because its formula adds r/30 to a multiplier of 1, so at r = 1 it adds 3.3% rather than nothing. Brzycki, Lombardi and Wathan all return the load itself at a single repetition. It is a known quirk, not a bug in this calculator.',
    },
  ],
  referenceTable: oneRepMaxTable(),
  relatedCalculators: [
    'calories-burned',
    'target-heart-rate',
    'protein',
    'macro',
    'lean-body-mass',
    'tdee',
  ],
  relatedGuides: ['one-rep-max-formulas-compared', 'how-to-set-a-protein-target'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const caloriesBurnedCalc: CalculatorDefinition = {
  slug: 'calories-burned',
  category: 'training',
  heading: 'Calories burned calculator',
  metaTitle: 'Calories burned calculator — by MET value',
  description:
    'Work out energy used during an activity from its MET value, your body weight and duration, with the net figure above resting shown alongside the gross.',
  keywords: ['calories burned calculator', 'met calculator', 'exercise calories'],
  applicationSubCategory: 'Energy expenditure',
  intro:
    'Energy used during an activity, from its metabolic equivalent. The figure above resting is shown too, because that is the number that actually reflects what the activity added.',
  inputs: [
    weightInput,
    {
      name: 'met',
      label: 'Activity intensity',
      hint: 'A MET is a multiple of resting metabolic rate. Walking briskly is about 4; running at 10 km/h is about 10.',
      type: 'select',
      defaultValue: '5',
      options: [
        { value: '2', label: '2 METs — light housework, slow walking' },
        { value: '3', label: '3 METs — walking 4 km/h, light weights' },
        { value: '4', label: '4 METs — brisk walking, cycling 16 km/h' },
        { value: '5', label: '5 METs — vigorous weight training' },
        { value: '6', label: '6 METs — cycling 19 km/h, hiking' },
        { value: '8', label: '8 METs — running 8 km/h, swimming laps' },
        { value: '10', label: '10 METs — running 10 km/h, hard cycling' },
        { value: '12', label: '12 METs — running 12 km/h, jump rope' },
      ],
    },
    {
      name: 'minutes',
      label: 'Duration',
      type: 'number',
      min: 1,
      max: 480,
      step: 5,
      defaultValue: '30',
      unit: { metric: 'min', imperial: 'min' },
    },
  ],
  formulas: [
    {
      id: 'met-simple',
      name: 'MET method',
      expression: [
        'kcal = MET × body weight (kg) × hours',
        '',
        'net of resting:',
        'kcal = (MET − 1) × body weight (kg) × hours',
      ],
      source:
        'Ainsworth BE, Haskell WL, Herrmann SD et al., "2011 Compendium of Physical Activities", Medicine and Science in Sports and Exercise 43(8), 2011, pp. 1575–1581; Herrmann SD et al., "2024 Adult Compendium of Physical Activities", Journal of Sport and Health Science 13(1), 2024, pp. 6–12.',
      year: 2024,
      assumes:
        'That one MET costs about 1 kcal per kilogram per hour, and that a single MET value represents an activity for everyone doing it.',
      accuracy:
        'MET values are population averages from the Compendium, and individual cost varies with fitness, technique and terrain. The simple form under-reads by about 5% relative to the oxygen-uptake definition, which is also shown.',
      isDefault: true,
    },
    {
      id: 'met-oxygen',
      name: 'Oxygen-uptake method',
      expression: [
        'kcal/min = MET × 3.5 × body weight (kg) / 200',
        '',
        '1 MET = 3.5 mL O₂ per kg per minute',
        '1 L O₂ ≈ 5 kcal',
      ],
      source: 'Derived from the MET definition in Ainsworth et al., 2011.',
      year: 2011,
      assumes:
        'The standard caloric equivalent of oxygen, which varies slightly with substrate use.',
      accuracy:
        'Closer to the Compendium’s own definition than the simple form, and about 5% higher. Neither is more "true"; the difference is smaller than the variation between individuals doing the same activity.',
    },
  ],
  howToSteps: steps(
    'your body weight, the activity intensity and how long you trained',
    'energy used, the figure above resting, and an hourly rate'
  ),
  faq: [
    {
      question: 'What is a MET?',
      answer:
        'A multiple of resting metabolic rate. One MET is defined as an oxygen uptake of 3.5 mL per kilogram per minute, roughly what sitting quietly costs. An activity at 8 METs costs about eight times as much energy per minute as sitting still.',
    },
    {
      question: 'Why is the "above resting" figure lower?',
      answer:
        'Because your body would have spent the first MET anyway just being alive. An eight MET hour adds seven METs’ worth over what you would have used sitting down, not eight. That is the honest figure for what the workout added.',
    },
    {
      question: 'Why do the two methods disagree by 5%?',
      answer:
        'The simple form uses the approximation that one MET costs 1 kcal per kilogram per hour. Working from the oxygen-uptake definition gives about 1.05. Both are in common use, so both are shown rather than picking one silently.',
    },
    {
      question: 'Should I add these calories to my TDEE?',
      answer:
        'Usually not. If you chose an activity multiplier that already assumes you train, adding a workout figure on top double-counts it. That is the most common mistake people make using these two calculators together.',
    },
    {
      question: 'How accurate are MET values?',
      answer:
        'They are population averages. The Compendium itself notes that individual energy cost varies substantially with fitness, body composition, technique and environment. Treat a MET-derived figure as an order of magnitude, not a measurement.',
    },
  ],
  referenceTable: caloriesBurnedTable(),
  relatedCalculators: [
    'tdee',
    'calorie',
    'target-heart-rate',
    'running-pace',
    'water-intake',
    'bmr',
  ],
  relatedGuides: ['met-values-explained', 'the-maintenance-calories-misconception'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const targetHeartRate: CalculatorDefinition = {
  slug: 'target-heart-rate',
  category: 'training',
  heading: 'Target heart rate calculator',
  metaTitle: 'Target heart rate calculator — Karvonen zones',
  description:
    'Work out training heart rate zones with the Karvonen heart rate reserve method, and compare the Tanaka and Fox equations for maximum heart rate.',
  keywords: [
    'target heart rate calculator',
    'karvonen formula',
    'heart rate zones',
    'max heart rate',
  ],
  applicationSubCategory: 'Cardiovascular training',
  intro:
    'Five training zones from your heart rate reserve. Karvonen is the default because it accounts for your resting rate, which a flat percentage of maximum does not.',
  inputs: [
    ageInput,
    {
      name: 'restingHeartRate',
      label: 'Resting heart rate',
      hint: 'Measured on waking, before getting up. Leave blank to use 70 bpm.',
      type: 'number',
      min: 30,
      max: 220,
      step: 1,
      defaultValue: '65',
      unit: { metric: 'bpm', imperial: 'bpm' },
    },
    {
      name: 'formula',
      label: 'Maximum heart rate equation',
      type: 'select',
      defaultValue: 'tanaka',
      options: [
        { value: 'tanaka', label: 'Tanaka (2001) — 208 − 0.7 × age' },
        { value: 'fox', label: 'Fox (1971) — 220 − age' },
      ],
    },
  ],
  formulas: [
    {
      id: 'karvonen',
      name: 'Karvonen (heart rate reserve)',
      expression: [
        'target = ((HRmax − HRrest) × intensity) + HRrest',
        '',
        'zones as a share of heart rate reserve:',
        'very light 50–60% · light 60–70% · moderate 70–80%',
        'hard 80–90% · maximum 90–100%',
      ],
      source:
        'Karvonen MJ, Kentala E, Mustala O., Annales Medicinae Experimentalis et Biologiae Fenniae 35(3), 1957, pp. 307–315. Zone bands as used in ACSM’s Guidelines for Exercise Testing and Prescription.',
      year: 1957,
      assumes: 'That training intensity scales with the working range between rest and maximum.',
      accuracy:
        'More individualised than a flat percentage of maximum, because it responds to resting heart rate. Its accuracy still depends entirely on the maximum it is given.',
      isDefault: true,
    },
    {
      id: 'tanaka',
      name: 'Tanaka maximum heart rate',
      expression: ['HRmax = 208 − 0.7 × age'],
      source:
        'Tanaka H, Monahan KD, Seals DR., Journal of the American College of Cardiology 37(1), 2001, pp. 153–156.',
      year: 2001,
      assumes: 'A linear decline in maximum heart rate with age across the population.',
      accuracy:
        'Derived from a meta-analysis of 351 studies covering 18,712 subjects. The better predictor of the two, particularly over 40, where "220 minus age" systematically under-predicts.',
    },
    {
      id: 'fox',
      name: 'Fox maximum heart rate',
      expression: ['HRmax = 220 − age'],
      source:
        'Fox SM, Naughton JP, Haskell WL., Annals of Clinical Research 3(6), 1971, pp. 404–432.',
      year: 1971,
      assumes: 'The same linear decline, with a steeper slope.',
      accuracy:
        'Never derived from a regression — Fox and colleagues presented it as an approximation drawn by eye from scattered data. It carries a standard deviation of roughly 10 to 12 bpm, so about a third of people sit more than 10 bpm from the prediction. Included because it is ubiquitous, not because it is good.',
    },
  ],
  howToSteps: steps(
    'your age and resting heart rate',
    'five training zones in beats per minute, and both maximum heart rate estimates'
  ),
  faq: [
    {
      question: 'Is "220 minus age" accurate?',
      answer:
        'Not particularly. It was never derived from a regression — it was an approximation drawn by eye from scattered data in 1971, and it carries a standard deviation of 10 to 12 beats per minute. Tanaka came from an actual meta-analysis and predicts better, especially over 40.',
    },
    {
      question: 'Why does Karvonen need my resting heart rate?',
      answer:
        'Because it works from heart rate reserve, the range between rest and maximum, rather than from the maximum alone. A fit person resting at 50 and an unfit person resting at 80 need different target rates for the same relative effort, and the plain percentage method misses that entirely.',
    },
    {
      question: 'How do I measure my resting heart rate?',
      answer:
        'On waking, before getting out of bed, over a full minute. A wrist tracker averaged across several nights works too. Measuring after coffee or activity gives a figure that is not resting, and every zone shifts with it.',
    },
    {
      question: 'The two equations gave the same answer for me. Is that right?',
      answer:
        'If you are 40, yes. Tanaka and Fox cross at exactly age 40, where both give 180 bpm. Below 40 Fox reads higher; above 40 Tanaka does.',
    },
    {
      question: 'Should I train to these zones exactly?',
      answer:
        'They are a guide, not a prescription. Both maximum heart rate equations carry wide individual variation, so your real zones may sit several beats either side. Perceived effort is a useful cross-check: if a "moderate" zone feels hard, trust your body over the equation.',
    },
  ],
  referenceTable: heartRateTable(),
  relatedCalculators: [
    'calories-burned',
    'running-pace',
    'one-rep-max',
    'tdee',
    'bmr',
    'water-intake',
  ],
  relatedGuides: ['understanding-heart-rate-zones', 'met-values-explained'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const runningPace: CalculatorDefinition = {
  slug: 'running-pace',
  category: 'training',
  heading: 'Running pace calculator',
  metaTitle: 'Running pace calculator — pace, speed, time',
  description:
    'Convert between pace, speed and finish time for any distance, with kilometre splits and projections to 5k and marathon at the same pace.',
  keywords: ['running pace calculator', 'pace calculator', 'race time calculator', 'marathon pace'],
  applicationSubCategory: 'Endurance training',
  intro:
    'Enter a distance and a finish time to get pace per kilometre and per mile, speed, splits, and what the same pace would give over other distances.',
  inputs: [
    {
      name: 'distance',
      label: 'Distance',
      type: 'select',
      defaultValue: '5k',
      options: [
        { value: '100m', label: '100 m' },
        { value: '400m', label: '400 m' },
        { value: '1-mile', label: '1 mile' },
        { value: '3k', label: '3 km' },
        { value: '5k', label: '5 km' },
        { value: '10k', label: '10 km' },
        { value: '15k', label: '15 km' },
        { value: 'half-marathon', label: 'Half marathon' },
        { value: 'marathon', label: 'Marathon' },
        { value: '50k', label: '50 km' },
      ],
    },
    {
      name: 'customDistance',
      label: 'Or a custom distance',
      hint: 'In kilometres. Overrides the selection above when filled in.',
      type: 'number',
      min: 0.1,
      max: 500,
      step: 0.1,
      unit: { metric: 'km', imperial: 'km' },
    },
    {
      name: 'time',
      label: 'Finish time',
      hint: 'As h:mm:ss or m:ss, for example 25:30 or 1:45:00.',
      type: 'number',
      defaultValue: '25:00',
    },
  ],
  formulas: [
    {
      id: 'pace',
      name: 'Pace, speed and time',
      expression: [
        'pace per km  = time / distance (km)',
        'pace per mile = time / distance (miles)',
        'speed (km/h) = distance (km) / time (hours)',
        'finish time  = distance (km) × pace per km',
      ],
      source:
        'Arithmetic. Race distances are the official ones; marathon (42,195 m) and half marathon (21,097.5 m) are fixed by World Athletics Competition Rule 55.',
      year: 2026,
      assumes: 'A constant pace across the distance.',
      accuracy:
        'Exact by definition — pace is distance over time. Everything is computed in metres and seconds and converted once at the end, so no rounding accumulates down a splits table.',
      isDefault: true,
    },
  ],
  howToSteps: steps(
    'a distance and a finish time',
    'pace per kilometre and per mile, speed, splits and projections at the same pace'
  ),
  faq: [
    {
      question: 'How do I enter a time?',
      answer:
        'As h:mm:ss or m:ss — 25:30 for twenty-five and a half minutes, 1:45:00 for an hour and three quarters. A bare number is read as seconds. Malformed entries like 1:75 are rejected rather than silently read as 135 seconds.',
    },
    {
      question: 'Are the projections to other distances reliable?',
      answer:
        'No, and the page says so. They assume the same pace holds over a different distance, which it does not: pace falls as distance rises. They are a like-for-like comparison, not a race prediction. Riegel’s formula exists for actual prediction and applies a fatigue exponent.',
    },
    {
      question: 'Why is the last marathon split shorter?',
      answer:
        'Because a marathon is 42.195 km, so after 42 full kilometre splits there is 195 m left. That segment is shown and flagged as partial rather than dropped — a splits table that quietly omits the last 195 m of a marathon is wrong exactly where it matters most.',
    },
    {
      question: 'What is a good 5k time?',
      answer:
        'This site does not publish "good" times, because the answer depends entirely on age, training history and purpose. The pace chart lets you compare your own times across distances, which is the useful comparison.',
    },
    {
      question: 'Does this work for walking?',
      answer:
        'Yes. Pace is distance over time regardless of how you cover it. Walking paces typically fall between 9 and 15 minutes per kilometre, which is within the range of the chart.',
    },
  ],
  referenceTable: paceTable(),
  relatedCalculators: [
    'target-heart-rate',
    'calories-burned',
    'water-intake',
    'tdee',
    'calorie',
    'bmi',
  ],
  relatedGuides: ['how-to-read-a-pace-chart', 'understanding-heart-rate-zones'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};
