import type { CalculatorDefinition } from '../types';
import {
  REVIEWED,
  activityInput,
  ageInput,
  heightInput,
  sexInput,
  steps,
  weightInput,
} from './fields';
import {
  bmrTable,
  calorieTable,
  macroTable,
  proteinTable,
  tdeeTable,
  waterTable,
} from '../referenceTables';

/** Energy and intake calculators. Every one routes through the safety guards. */

export const bmr: CalculatorDefinition = {
  slug: 'bmr',
  category: 'energy',
  heading: 'BMR calculator',
  metaTitle: 'BMR calculator — three equations compared',
  description:
    'Work out your basal metabolic rate with three published equations shown side by side, so you can see how much they disagree and why the default is Mifflin-St Jeor.',
  keywords: ['bmr calculator', 'basal metabolic rate', 'mifflin st jeor', 'harris benedict'],
  applicationSubCategory: 'Energy expenditure',
  intro:
    'Your basal metabolic rate is the energy your body uses at complete rest. Three equations are shown together because they genuinely disagree, by 100 to 300 kcal for the same person.',
  inputs: [
    sexInput,
    ageInput,
    heightInput,
    weightInput,
    {
      name: 'formula',
      label: 'Equation',
      type: 'select',
      defaultValue: 'mifflin_st_jeor',
      options: [
        { value: 'mifflin_st_jeor', label: 'Mifflin-St Jeor (1990)' },
        { value: 'revised_harris_benedict', label: 'Revised Harris-Benedict (1984)' },
        { value: 'katch_mcardle', label: 'Katch-McArdle (1977)' },
      ],
    },
  ],
  formulas: [
    {
      id: 'mifflin',
      name: 'Mifflin-St Jeor',
      expression: [
        'men:   BMR = 10W + 6.25H − 5A + 5',
        'women: BMR = 10W + 6.25H − 5A − 161',
        '(W in kg, H in cm, A in years)',
      ],
      source:
        'Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO, American Journal of Clinical Nutrition 51(2), 1990, pp. 241–247.',
      year: 1990,
      assumes: 'A healthy adult of average body composition. It has no input for muscle mass.',
      accuracy:
        'The most accurate of the three for the general population. It was derived from a modern cohort and validated against indirect calorimetry, and it is the equation the Academy of Nutrition and Dietetics recommends.',
      isDefault: true,
    },
    {
      id: 'harris-benedict',
      name: 'Revised Harris-Benedict',
      expression: [
        'men:   BMR = 88.362 + 13.397W + 4.799H − 5.677A',
        'women: BMR = 447.593 + 9.247W + 3.098H − 4.330A',
      ],
      source:
        'Roza AM, Shizgal HM, American Journal of Clinical Nutrition 40(1), 1984, pp. 168–182, revising Harris JA and Benedict FG, 1919.',
      year: 1984,
      assumes: 'The same, fitted to a cohort measured in 1919 and re-analysed in 1984.',
      accuracy:
        'Tends to over-estimate, typically by around 5%, because the original cohort differed from modern populations in body composition. Still widely quoted, which is why it is here.',
    },
    {
      id: 'katch-mcardle',
      name: 'Katch-McArdle',
      expression: ['BMR = 370 + 21.6 × lean body mass (kg)'],
      source:
        'Katch FI, McArdle WD, "Nutrition, Weight Control, and Exercise", Lea & Febiger, 1977.',
      year: 1977,
      assumes:
        'That lean mass is known. It takes no sex argument, because lean mass already carries that difference.',
      accuracy:
        'The most accurate of the three when lean mass is genuinely measured, because it is the only one that responds to body composition. Fed a guessed body fat percentage it becomes the least accurate. This page estimates lean mass with the Boer equation and says so.',
    },
  ],
  howToSteps: steps(
    'your age, height, weight and which equation set to use',
    'your basal metabolic rate under all three equations'
  ),
  faq: [
    {
      question: 'What is the difference between BMR and TDEE?',
      answer:
        'BMR is the energy you would use lying still all day. TDEE adds everything else — moving, digesting, training — and is typically 20% to 90% higher. TDEE is the number to work from when setting intake.',
    },
    {
      question: 'Which BMR equation should I use?',
      answer:
        'Mifflin-St Jeor unless you have a measured body fat percentage, in which case Katch-McArdle is better because it responds to body composition. Harris-Benedict is included for comparison but tends to read high.',
    },
    {
      question: 'Why do the three equations give different answers?',
      answer:
        'They were fitted to different populations using different methods, decades apart. The spread between them, usually 100 to 300 kcal, is a fair indication of how much uncertainty any single BMR estimate carries.',
    },
    {
      question: 'How accurate is a BMR estimate?',
      answer:
        'Predictive equations typically land within about 10% of measured resting energy expenditure for most people, but individual error can be larger. Body composition, thyroid function and genetics all move the real figure in ways height and weight cannot capture.',
    },
    {
      question: 'Should I eat my BMR?',
      answer:
        'No. BMR is what you would need lying motionless all day. Eating at BMR while living a normal life is a substantial deficit, usually a larger one than intended. Use TDEE, and apply a deficit from there.',
    },
    {
      question: 'Does BMR fall as you lose weight?',
      answer:
        'Yes — a smaller body costs less to run, and every equation here reflects that through the weight term. There is also evidence of adaptive reduction beyond what body size alone predicts, which is one reason weight loss slows over time even at constant intake.',
    },
  ],
  referenceTable: bmrTable(),
  relatedCalculators: ['tdee', 'calorie', 'macro', 'protein', 'lean-body-mass', 'body-fat'],
  relatedGuides: ['how-bmr-is-calculated', 'bmr-equations-compared'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const tdee: CalculatorDefinition = {
  slug: 'tdee',
  category: 'energy',
  heading: 'TDEE calculator',
  metaTitle: 'TDEE calculator — total daily energy expenditure',
  description:
    'Estimate total daily energy expenditure from your BMR and activity level, with all five activity multipliers shown and their published basis explained honestly.',
  keywords: ['tdee calculator', 'total daily energy expenditure', 'maintenance calories'],
  applicationSubCategory: 'Energy expenditure',
  intro:
    'Your total daily energy expenditure is your BMR multiplied by an activity level. All five levels are shown, so you can see how much the choice moves the answer.',
  inputs: [sexInput, ageInput, heightInput, weightInput, activityInput],
  formulas: [
    {
      id: 'tdee',
      name: 'BMR × activity multiplier',
      expression: [
        'TDEE = BMR × PAL',
        '',
        'sedentary         × 1.2',
        'lightly active    × 1.375',
        'moderately active × 1.55',
        'very active       × 1.725',
        'extra active      × 1.9',
      ],
      source:
        'BMR from Mifflin-St Jeor (1990). The multipliers are the conventional consumer-calculator set; they are checked against the physical activity level bands in Institute of Medicine, Dietary Reference Intakes, National Academies Press, 2005, ch. 12, and FAO/WHO/UNU, Human Energy Requirements, 2004.',
      year: 2005,
      assumes:
        'That a single multiplier can represent a week of varied activity. It cannot capture non-exercise movement, which varies enormously between people.',
      accuracy:
        'The weakest link in the chain. The multipliers do not come from a single published paper — they are a convention, and calculators that cite them to Harris-Benedict or Mifflin-St Jeor are citing papers that do not contain them. They sit inside the published IOM bands, and this page says which band each falls in.',
      isDefault: true,
    },
  ],
  howToSteps: steps(
    'your age, height, weight and typical activity level',
    'your estimated daily energy use, plus the figure at every other activity level'
  ),
  faq: [
    {
      question: 'Where do the activity multipliers come from?',
      answer:
        'Not from a single paper, despite what most calculators imply. The 1.2 to 1.9 set is a convention that spread through fitness literature. The published frameworks are the Institute of Medicine physical activity level categories, derived from doubly labelled water studies, and the FAO/WHO/UNU lifestyle bands. This page tags each multiplier with the IOM band it falls in.',
    },
    {
      question: 'Which activity level should I pick?',
      answer:
        'The one matching a typical week rather than your best one. Most people overestimate. If your weight is stable, your real TDEE is whatever you are currently eating — that is a better starting figure than any multiplier.',
    },
    {
      question: 'Why is the sedentary multiplier 1.2 when FAO says 1.40 is the floor?',
      answer:
        'A genuine discrepancy, and worth knowing about. The conventional 1.2 sits inside the IOM sedentary band, which starts at 1.0, but below the FAO/WHO/UNU floor of 1.40. Neither framework is wrong; they define their categories differently. It is one reason the sedentary figure is the least reliable of the five.',
    },
    {
      question: 'Does TDEE include exercise?',
      answer:
        'Yes — that is what the multiplier is for. Adding a separate calories-burned figure for a workout on top of a TDEE that already assumes you train double-counts it, which is the most common error people make with these two calculators together.',
    },
    {
      question: 'How accurate is a TDEE estimate?',
      answer:
        'Less accurate than the BMR estimate it is built on, because the multiplier adds its own error. Treat it as a starting point: eat at it for two or three weeks, track weight, and adjust from what actually happens.',
    },
  ],
  referenceTable: tdeeTable(),
  relatedCalculators: ['bmr', 'calorie', 'macro', 'calories-burned', 'protein', 'bmi'],
  relatedGuides: ['what-activity-multipliers-mean', 'the-maintenance-calories-misconception'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const calorie: CalculatorDefinition = {
  slug: 'calorie',
  category: 'energy',
  heading: 'Calorie calculator',
  metaTitle: 'Calorie calculator — daily target for your goal',
  description:
    'Work out a daily calorie target from your energy needs and goal. Deficits are capped and floors applied, so the number shown is one that can be followed safely.',
  keywords: [
    'calorie calculator',
    'daily calorie target',
    'calorie deficit',
    'maintenance calories',
  ],
  applicationSubCategory: 'Energy intake',
  intro:
    'A daily calorie target based on your energy use and your goal. Deficits are capped at the lesser of a quarter of your maintenance level or 1,000 kcal, and no target falls below 1,500 kcal for men or 1,200 for women.',
  inputs: [
    sexInput,
    ageInput,
    heightInput,
    weightInput,
    activityInput,
    {
      name: 'goal',
      label: 'Goal',
      type: 'select',
      defaultValue: 'maintain',
      options: [
        { value: 'maintain', label: 'Maintain' },
        { value: 'gradual_loss', label: 'Gradual loss — 0.25 kg a week' },
        { value: 'steady_loss', label: 'Steady loss — 0.5 kg a week' },
        { value: 'gradual_gain', label: 'Gradual gain — 0.25 kg a week' },
        { value: 'steady_gain', label: 'Steady gain — 0.5 kg a week' },
      ],
    },
    {
      name: 'goalWeight',
      label: 'Goal weight (optional)',
      hint: 'Used only to check the target sits within a healthy range for your height.',
      type: 'number',
      min: 20,
      max: 400,
      step: 0.1,
      unit: { metric: 'kg', imperial: 'lb' },
    },
  ],
  formulas: [
    {
      id: 'calorie-goal',
      name: 'Calorie target with safety limits',
      expression: [
        'target = TDEE + daily change',
        'daily change = weekly rate (kg) × 7700 / 7',
        '',
        'deficit capped at min(0.25 × TDEE, 1000 kcal)',
        'floor: 1500 kcal (men), 1200 kcal (women)',
      ],
      source:
        'TDEE from Mifflin-St Jeor (1990). Energy equivalent of body mass from Wishnofsky M., American Journal of Clinical Nutrition 6(5), 1958, pp. 542–546.',
      year: 1958,
      assumes:
        'That 7,700 kcal corresponds to one kilogram of body mass change, and that the relationship stays linear over time. Neither holds exactly.',
      accuracy:
        'The 7,700 figure overstates long-run loss, because energy expenditure falls as body mass falls (Hall et al., The Lancet, 2011). Real rates diverge from the projection within weeks. Use it to set a starting point, then adjust from measured results.',
      isDefault: true,
    },
  ],
  howToSteps: steps(
    'your details, activity level and goal',
    'a daily calorie target with the safety limits applied, and every other goal for comparison'
  ),
  faq: [
    {
      question: 'Why was my deficit reduced?',
      answer:
        'Because it exceeded one of two limits: a quarter of your maintenance level, or 1,000 kcal a day, whichever is smaller. Larger deficits increase lean mass loss and are harder to sustain, and this site does not produce them.',
    },
    {
      question: 'Why will it not show a number below 1,200 or 1,500 kcal?',
      answer:
        'Intakes below those floors are used clinically, under supervision, with monitoring for micronutrient deficiency. A web calculator cannot provide any of that. If your inputs imply a lower figure, the floor is shown instead, and it is worth discussing with a doctor rather than starting alone.',
    },
    {
      question: 'Why is there no aggressive or rapid option?',
      answer:
        'Because faster is not better here. The evidence for very large deficits is poor on both adherence and lean mass retention, and the labels themselves encourage a framing this site avoids. The fastest preset is 0.5 kg a week in either direction.',
    },
    {
      question: 'Is 3,500 kcal really a pound of fat?',
      answer:
        'It is a useful approximation and a poor model. The figure comes from Wishnofsky in 1958 and assumes the deficit comes entirely from fat and that expenditure stays constant. In practice expenditure falls as you lose weight, so a fixed deficit yields progressively less loss.',
    },
    {
      question: 'Why does entering a goal weight sometimes stop the calculation?',
      answer:
        'If the goal weight would put you below a BMI of 18.5 for your height, no plan toward it is shown. The healthy range for your height is shown instead. That is a deliberate limit, not a bug.',
    },
    {
      question: 'How long should I stay in a deficit?',
      answer:
        'This site does not prescribe that, because the answer depends on circumstances it cannot see. What it can say: adherence matters more than size of deficit, and periods at maintenance are a normal part of a long process rather than a failure.',
    },
  ],
  referenceTable: calorieTable(),
  relatedCalculators: ['tdee', 'bmr', 'macro', 'protein', 'healthy-weight-range', 'bmi'],
  relatedGuides: [
    'building-a-sustainable-calorie-target',
    'the-maintenance-calories-misconception',
  ],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const macro: CalculatorDefinition = {
  slug: 'macro',
  category: 'energy',
  heading: 'Macro calculator',
  metaTitle: 'Macro calculator — protein, fat and carbs',
  description:
    'Split a daily calorie target into protein, fat and carbohydrate. Presets for maintenance, cutting, bulking, high protein and low carb, all within published guidance ranges.',
  keywords: ['macro calculator', 'macronutrient calculator', 'iifym', 'protein fat carb split'],
  applicationSubCategory: 'Energy intake',
  intro:
    'Protein is set per kilogram of body weight, fat as a share of energy, and carbohydrate takes the remainder. No preset drops fat below the lower bound of the published range.',
  inputs: [
    sexInput,
    ageInput,
    heightInput,
    weightInput,
    activityInput,
    {
      name: 'preset',
      label: 'Preset',
      type: 'select',
      defaultValue: 'maintenance',
      options: [
        { value: 'maintenance', label: 'Maintenance — 1.6 g/kg protein, 30% fat' },
        { value: 'cut', label: 'Cutting — 2.0 g/kg protein, 25% fat' },
        { value: 'bulk', label: 'Building — 1.6 g/kg protein, 25% fat' },
        { value: 'high_protein', label: 'High protein — 2.2 g/kg, 25% fat' },
        { value: 'low_carb', label: 'Lower carbohydrate — 2.0 g/kg, 45% fat' },
      ],
    },
  ],
  formulas: [
    {
      id: 'macro-split',
      name: 'Macronutrient split',
      expression: [
        'protein (g)      = g/kg × body weight',
        'fat (g)          = (calories × fat share) / 9',
        'carbohydrate (g) = (calories − protein kcal − fat kcal) / 4',
        '',
        'protein 4 kcal/g · carbohydrate 4 kcal/g · fat 9 kcal/g',
      ],
      source:
        'Energy densities: Atwater WO, Woods CD, USDA Bulletin 28, 1896. Distribution ranges: Institute of Medicine, Dietary Reference Intakes, National Academies Press, 2005 — protein 10–35%, fat 20–35%, carbohydrate 45–65% of energy.',
      year: 2005,
      assumes:
        'The Atwater general factors, which are population averages. Real absorption varies with food matrix and preparation.',
      accuracy:
        'The arithmetic is exact. The judgement is in the targets: protein per kilogram is well supported, the fat share less so, and carbohydrate is simply the remainder because the body is most flexible about it.',
      isDefault: true,
    },
  ],
  howToSteps: steps(
    'your details, activity level and preferred split',
    'daily grams of protein, fat and carbohydrate, with the percentage each contributes'
  ),
  faq: [
    {
      question: 'Why is protein set per kilogram rather than as a percentage?',
      answer:
        'Because protein need tracks body size, not energy intake. Setting it as a percentage means your protein target falls when you eat less — exactly backwards, since protein needs rise slightly in a deficit.',
    },
    {
      question: 'Why does the fat share never go below 20%?',
      answer:
        'That is the lower bound of the Institute of Medicine acceptable distribution range. Below it, absorption of fat-soluble vitamins and hormone production can suffer. No preset here crosses it.',
    },
    {
      question: 'Do macros matter more than total calories?',
      answer:
        'For body weight, no — energy balance dominates. Macros matter for body composition, training performance and how full you feel at a given intake, which is why protein gets a target of its own.',
    },
    {
      question: 'Why did my carbohydrate figure come out at zero?',
      answer:
        'Because protein and fat together already account for the full calorie target. That happens at low intakes with high body weight and a high protein setting. Lowering the protein per kilogram opens room for carbohydrate.',
    },
    {
      question: 'Is a low-carbohydrate split better for fat loss?',
      answer:
        'Controlled trials that match calories and protein find little difference in fat loss between higher and lower carbohydrate splits. Choose whichever you find easier to stick to; adherence is the variable that actually moves results.',
    },
  ],
  referenceTable: macroTable(),
  relatedCalculators: ['calorie', 'protein', 'tdee', 'bmr', 'body-fat', 'lean-body-mass'],
  relatedGuides: ['how-to-set-a-protein-target', 'building-a-sustainable-calorie-target'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const protein: CalculatorDefinition = {
  slug: 'protein',
  category: 'energy',
  heading: 'Protein intake calculator',
  metaTitle: 'Protein calculator — daily protein by body weight',
  description:
    'Work out a daily protein target in grams from your body weight and training, with the RDA shown alongside so the difference between the two is clear.',
  keywords: ['protein calculator', 'protein intake', 'grams of protein per day', 'protein per kg'],
  applicationSubCategory: 'Energy intake',
  intro:
    'A daily protein target in grams. The RDA is shown alongside, because it answers a different question from the one most people are asking.',
  inputs: [
    weightInput,
    {
      name: 'level',
      label: 'Activity',
      type: 'select',
      defaultValue: 'resistance_training',
      options: [
        { value: 'rda_baseline', label: 'RDA baseline — 0.8 g/kg' },
        { value: 'lightly_active', label: 'Lightly active — 1.2 g/kg' },
        { value: 'endurance_training', label: 'Endurance training — 1.4 g/kg' },
        { value: 'resistance_training', label: 'Resistance training — 1.6 g/kg' },
        { value: 'building_muscle', label: 'Building muscle — 1.8 g/kg' },
        { value: 'training_in_a_deficit', label: 'Training in a deficit — 2.2 g/kg' },
      ],
    },
  ],
  formulas: [
    {
      id: 'protein-target',
      name: 'Protein per kilogram of body weight',
      expression: [
        'protein (g/day) = g/kg × body weight (kg)',
        '',
        'RDA                    0.8 g/kg',
        'training populations   1.2–2.0 g/kg',
        'resistance plateau     ~1.6 g/kg',
        'training in a deficit  up to 2.2 g/kg',
      ],
      source:
        'RDA: Institute of Medicine, Dietary Reference Intakes, 2005. Training ranges: Thomas DT, Erdman KA, Burke LM, Journal of the Academy of Nutrition and Dietetics 116(3), 2016, pp. 501–528. Plateau: Morton RW et al., British Journal of Sports Medicine 52(6), 2018, pp. 376–384. Deficit: Helms ER et al., International Journal of Sport Nutrition and Exercise Metabolism 24(2), 2014, pp. 127–138.',
      year: 2018,
      assumes:
        'Healthy kidney function and that protein need scales with total body mass. At high body fat percentages, scaling to lean mass is more defensible.',
      accuracy:
        'The 1.6 g/kg plateau comes from a meta-regression with a confidence interval extending to about 2.2 g/kg, so the exact figure is less certain than it looks. Anywhere in the 1.6 to 2.2 range is well supported for someone training.',
      isDefault: true,
    },
  ],
  howToSteps: steps(
    'your body weight and how you train',
    'a daily protein target in grams, with every other level for comparison'
  ),
  faq: [
    {
      question: 'Is the RDA enough protein?',
      answer:
        'It depends what for. The RDA of 0.8 g/kg is the amount that prevents deficiency in most healthy adults — it is a floor, not an optimum. For someone training, the evidence supports roughly double that. Treating the RDA as a target for a lifter is the most common error in protein advice.',
    },
    {
      question: 'Is more protein always better?',
      answer:
        'No. Morton and colleagues found gains in muscle mass plateau around 1.6 g/kg, with the confidence interval reaching about 2.2. Beyond that there is no measured additional benefit for muscle gain, though higher intakes are not harmful in healthy people.',
    },
    {
      question: 'Should I use body weight or lean mass?',
      answer:
        'At a typical body composition it makes little difference. At a high body fat percentage, scaling to total weight inflates the target, because fat tissue has minimal protein requirement. Lean mass is the better basis there.',
    },
    {
      question: 'Does high protein damage the kidneys?',
      answer:
        'In people with healthy kidneys, controlled trials have not shown harm from intakes in this range. The concern comes from people with existing kidney disease, for whom protein restriction is sometimes prescribed. If you have kidney problems, this is a question for your doctor.',
    },
    {
      question: 'Why does protein go up when calories go down?',
      answer:
        'Because in a deficit the body is more likely to break down lean tissue for energy, and a higher protein intake reduces that. It also helps with fullness at a lower total intake, which makes the deficit easier to hold.',
    },
  ],
  referenceTable: proteinTable(),
  relatedCalculators: ['macro', 'calorie', 'tdee', 'bmr', 'lean-body-mass', 'body-fat'],
  relatedGuides: ['how-to-set-a-protein-target', 'building-a-sustainable-calorie-target'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const waterIntakeCalc: CalculatorDefinition = {
  slug: 'water-intake',
  category: 'energy',
  heading: 'Water intake calculator',
  metaTitle: 'Water intake calculator — daily fluid needs',
  description:
    'Estimate daily fluid intake from body weight, with adjustments for exercise and climate, shown alongside the published IOM and EFSA reference values.',
  keywords: ['water intake calculator', 'daily water intake', 'how much water should i drink'],
  applicationSubCategory: 'Hydration',
  intro:
    'A body-weight-based estimate with adjustments for exercise and climate. The published reference values are shown alongside, because they answer the same question differently.',
  inputs: [
    sexInput,
    weightInput,
    {
      name: 'exerciseMinutes',
      label: 'Exercise',
      hint: 'Minutes of training on a typical day.',
      type: 'number',
      min: 0,
      max: 480,
      step: 5,
      defaultValue: '0',
      unit: { metric: 'min', imperial: 'min' },
    },
    {
      name: 'climate',
      label: 'Climate',
      type: 'select',
      defaultValue: 'temperate',
      options: [
        { value: 'temperate', label: 'Temperate' },
        { value: 'hot', label: 'Hot' },
        { value: 'very_hot', label: 'Very hot' },
      ],
    },
  ],
  formulas: [
    {
      id: 'water',
      name: 'Body-weight-based fluid estimate',
      expression: [
        'baseline (L) = body weight (kg) × 32.5 mL / 1000',
        'exercise (L) = hours × 0.5',
        'total = (baseline + exercise) × climate factor',
        '',
        'climate: temperate ×1.0 · hot ×1.15 · very hot ×1.3',
      ],
      source:
        'Reference values: Institute of Medicine, Dietary Reference Intakes for Water, Potassium, Sodium, Chloride and Sulfate, 2005 (3.7 L/day men, 2.7 L/day women, total water); EFSA Journal 8(3), 2010, 1459 (2.5 L and 2.0 L). Sweat replacement: Sawka MN et al., ACSM position stand, Medicine and Science in Sports and Exercise 39(2), 2007, pp. 377–390.',
      year: 2007,
      assumes:
        'An average sweat rate. The ACSM stand declines to give a single figure because real rates range from about 0.3 to 2.4 L per hour.',
      accuracy:
        'The least precise calculator on this site, and honestly so. The climate multipliers are directional rather than derived — no published equation maps ambient temperature to intake for the general public. Weighing yourself before and after a session is the only way to know your own sweat rate.',
      isDefault: true,
    },
  ],
  howToSteps: steps(
    'your body weight, typical exercise and climate',
    'a daily fluid target with the published reference values alongside'
  ),
  faq: [
    {
      question: 'Is eight glasses a day correct?',
      answer:
        'It has no identifiable source in the scientific literature. Nobody has been able to trace it to a study. It is not harmful advice, but it is not evidence either.',
    },
    {
      question: 'Do I need to hit this number exactly?',
      answer:
        'No. The Institute of Medicine report behind these reference values states plainly that the great majority of healthy people meet their needs by letting thirst guide them. These are population reference values, not targets.',
    },
    {
      question: 'Does coffee count?',
      answer:
        'Yes. The diuretic effect of caffeine at normal intakes is smaller than the fluid volume of the drink, so caffeinated drinks contribute net positively to hydration. So does food, at roughly 20% of total water intake.',
    },
    {
      question: 'Why do the IOM and EFSA figures differ?',
      answer:
        'They used different methods and different reference populations. The IOM values are based on median intakes from US survey data; EFSA derived theirs from observed intakes and desirable urine osmolality in European populations. Both are shown rather than picking one.',
    },
    {
      question: 'Can you drink too much water?',
      answer:
        'Yes. Drinking far beyond need, particularly during endurance events, can dilute blood sodium — exercise-associated hyponatraemia — which is dangerous. It is rare, but it is the reason "drink as much as possible" is bad advice.',
    },
  ],
  referenceTable: waterTable(),
  relatedCalculators: ['calories-burned', 'tdee', 'calorie', 'protein', 'macro', 'bmr'],
  relatedGuides: ['met-values-explained', 'why-scale-weight-fluctuates'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};
