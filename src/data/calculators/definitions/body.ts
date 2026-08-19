import type { CalculatorDefinition, InputField } from '../types';
import { REVIEWED, ageInput, heightInput, sexInput, steps, weightInput } from './fields';
import {
  armyTable,
  bmiTable,
  bodyFatTable,
  healthyWeightTable,
  idealWeightTable,
  leanMassTable,
} from '../referenceTables';

/**
 * Body composition and weight reference calculators.
 */

export const bmi: CalculatorDefinition = {
  slug: 'bmi',
  category: 'body-composition',
  heading: 'BMI calculator',
  metaTitle: 'BMI calculator — metric and imperial',
  description:
    'Work out your body mass index from height and weight, see the WHO category, and find the healthy weight range for your height. Shows BMI Prime and the ponderal index too.',
  keywords: ['bmi calculator', 'body mass index', 'bmi chart', 'healthy bmi range'],
  applicationSubCategory: 'Body composition',
  intro:
    'Enter your height and weight to get your body mass index, the WHO category it falls in, and the weight range that corresponds to a healthy BMI at your height.',
  inputs: [heightInput, weightInput],
  formulas: [
    {
      id: 'bmi',
      name: 'Body mass index',
      expression: ['BMI = mass (kg) / height (m)²'],
      source:
        'Quetelet A., 1835. Named "body mass index" by Keys A. et al., Journal of Chronic Diseases 25(6), 1972, pp. 329–343. Category cut-points: WHO Technical Report Series 894, 2000.',
      year: 1972,
      assumes:
        'That mass scales with the square of height across the population. It carries no information about what the mass is made of.',
      accuracy:
        'Reliable as a population screening indicator. For an individual it cannot distinguish muscle from fat, and it systematically over-reads for tall people and under-reads for short ones, because human bodies do not scale exactly with the square of height.',
      isDefault: true,
    },
    {
      id: 'bmi-prime',
      name: 'BMI Prime',
      expression: ['BMI Prime = BMI / 25'],
      source: 'Gadzik J., "How much should I weigh?", Connecticut Medicine 70(2), 2006, pp. 81–88.',
      year: 2006,
      assumes: 'The same as BMI, expressed relative to the upper healthy bound.',
      accuracy:
        'Adds no new information — it is BMI rescaled — but makes distance from the band edge readable without memorising cut-points. A value of 1.0 sits exactly at BMI 25.',
    },
    {
      id: 'ponderal',
      name: 'Ponderal index',
      expression: ['PI = mass (kg) / height (m)³'],
      source: 'Rohrer F., Münchener Medizinische Wochenschrift 68, 1921.',
      year: 1921,
      assumes: 'That mass scales with the cube of height rather than the square.',
      accuracy:
        'More stable than BMI at the extremes of height, which is exactly where BMI is weakest. Less useful in the middle of the range, where BMI has far more published reference data behind it.',
    },
  ],
  howToSteps: steps(
    'your height and weight',
    'your BMI, its category, and the healthy weight range for your height'
  ),
  faq: [
    {
      question: 'Is BMI accurate for muscular people?',
      answer:
        'No. BMI is a ratio of mass to height and contains no information about body composition, so muscle and fat count identically. A trained athlete can read in the overweight or obese range while carrying very little body fat. If body composition is the question, the body fat calculator answers it more directly.',
    },
    {
      question: 'What is a healthy BMI?',
      answer:
        'The WHO healthy band runs from 18.5 up to but not including 25. The widely repeated "18.5 to 24.9" is a rounding of the same thing: the real boundary is 25.0, so a BMI of 24.95 is inside the band.',
    },
    {
      question: 'Does BMI work the same for everyone?',
      answer:
        'The cut-points were derived largely from European-descent populations. The WHO itself notes that the relationship between BMI and health risk differs across populations, and several countries use lower thresholds for people of South and East Asian descent. Treat the categories as a rough screening step rather than a fixed rule.',
    },
    {
      question: 'Should children use this?',
      answer:
        'No. Adult BMI categories do not apply to anyone under 18, because body composition changes substantially with growth stage. Paediatric assessment uses age and sex-specific percentile charts instead, which a doctor can interpret properly.',
    },
    {
      question: 'What is the difference between BMI and BMI Prime?',
      answer:
        'None mathematically — BMI Prime is BMI divided by 25. Its only advantage is readability: 1.10 immediately says "10% above the upper healthy bound", where a BMI of 27.5 requires you to remember where the boundary sits.',
    },
    {
      question: 'Why does BMI over-read for tall people?',
      answer:
        'Because it divides by height squared, while human bodies scale closer to height cubed in some dimensions and less than squared in others. The exponent of 2 was chosen because it fit the population data of the time, not because it describes an individual body. The ponderal index uses a cube and behaves better at the extremes.',
    },
  ],
  referenceTable: bmiTable(),
  relatedCalculators: [
    'healthy-weight-range',
    'body-fat',
    'ideal-weight',
    'lean-body-mass',
    'bmr',
    'tdee',
  ],
  relatedGuides: ['why-bmi-is-a-screening-tool', 'why-scale-weight-fluctuates'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const bodyFat: CalculatorDefinition = {
  slug: 'body-fat',
  category: 'body-composition',
  heading: 'Body fat percentage calculator',
  metaTitle: 'Body fat calculator — US Navy and skinfold',
  description:
    'Estimate body fat percentage with the US Navy tape method, Jackson-Pollock 3 or 7-site skinfolds, or the Deurenberg BMI equation. Shows fat mass and fat-free mass.',
  keywords: [
    'body fat calculator',
    'us navy body fat',
    'body fat percentage',
    'jackson pollock skinfold',
  ],
  applicationSubCategory: 'Body composition',
  intro:
    'Four published methods, in descending order of how much they actually measure. The US Navy method needs only a tape measure, which is why it is the default.',
  inputs: [
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      defaultValue: 'us_navy',
      options: [
        { value: 'us_navy', label: 'US Navy tape method' },
        { value: 'jackson_pollock_3', label: 'Jackson-Pollock, 3 sites' },
        { value: 'jackson_pollock_7', label: 'Jackson-Pollock, 7 sites' },
        { value: 'deurenberg', label: 'Deurenberg (BMI-based)' },
      ],
    },
    sexInput,
    ageInput,
    heightInput,
    weightInput,
    {
      name: 'neck',
      label: 'Neck',
      hint: 'Measured just below the larynx, tape sloping slightly down at the front.',
      type: 'number',
      min: 20,
      max: 80,
      step: 0.5,
      unit: { metric: 'cm', imperial: 'in' },
      showWhen: { field: 'method', equals: ['us_navy'] },
    },
    {
      name: 'waist',
      label: 'Waist',
      hint: 'Men: at the navel. Women: at the narrowest point.',
      type: 'number',
      min: 40,
      max: 200,
      step: 0.5,
      unit: { metric: 'cm', imperial: 'in' },
      showWhen: { field: 'method', equals: ['us_navy'] },
    },
    {
      name: 'hip',
      label: 'Hip',
      hint: 'At the widest point. Used by the women’s equation only.',
      type: 'number',
      min: 50,
      max: 200,
      step: 0.5,
      unit: { metric: 'cm', imperial: 'in' },
      showWhen: { field: 'method', equals: ['us_navy'] },
    },
    {
      name: 'siteA',
      label: 'Chest (men) or triceps (women)',
      type: 'number',
      min: 1,
      max: 100,
      step: 0.5,
      unit: { metric: 'mm', imperial: 'mm' },
      showWhen: { field: 'method', equals: ['jackson_pollock_3'] },
    },
    {
      name: 'siteB',
      label: 'Abdomen (men) or suprailiac (women)',
      type: 'number',
      min: 1,
      max: 100,
      step: 0.5,
      unit: { metric: 'mm', imperial: 'mm' },
      showWhen: { field: 'method', equals: ['jackson_pollock_3'] },
    },
    {
      name: 'siteC',
      label: 'Thigh',
      type: 'number',
      min: 1,
      max: 100,
      step: 0.5,
      unit: { metric: 'mm', imperial: 'mm' },
      showWhen: { field: 'method', equals: ['jackson_pollock_3'] },
    },
    ...(
      ['chest', 'midaxillary', 'triceps', 'subscapular', 'abdomen', 'suprailiac', 'thigh'] as const
    ).map((site): InputField => ({
      name: site,
      label: `${site.charAt(0).toUpperCase()}${site.slice(1)} skinfold`,
      type: 'number',
      min: 1,
      max: 100,
      step: 0.5,
      unit: { metric: 'mm', imperial: 'mm' },
      showWhen: { field: 'method', equals: ['jackson_pollock_7'] },
    })),
  ],
  formulas: [
    {
      id: 'us-navy',
      name: 'US Navy circumference method',
      expression: [
        'men:   %BF = 86.010 × log₁₀(waist − neck) − 70.041 × log₁₀(height) + 36.76',
        'women: %BF = 163.205 × log₁₀(waist + hip − neck) − 97.684 × log₁₀(height) − 78.387',
        '(measurements in inches)',
      ],
      source:
        'Hodgdon JA, Beckett MB. Naval Health Research Center Reports 84-11 (men) and 84-29 (women), San Diego, 1984.',
      year: 1984,
      assumes:
        'That the distribution of fat around the waist and neck is representative of total body fat. It was derived on US Navy personnel.',
      accuracy:
        'Typical error of three to four percentage points against hydrostatic weighing, with a correlation around 0.90. The best accuracy available to someone holding only a tape measure, which is why it is the default.',
      isDefault: true,
    },
    {
      id: 'jackson-pollock-7',
      name: 'Jackson-Pollock, 7 sites',
      expression: [
        'men:   BD = 1.112 − 0.00043499·S + 0.00000055·S² − 0.00028826·age',
        'women: BD = 1.097 − 0.00046971·S + 0.00000056·S² − 0.00012828·age',
        '%BF = 495 / BD − 450        (S = sum of 7 skinfolds, mm)',
      ],
      source:
        'Jackson AS, Pollock ML, British Journal of Nutrition 40(3), 1978; Jackson AS, Pollock ML, Ward A, Medicine and Science in Sports and Exercise 12(3), 1980. Density converted by Siri WE, 1961.',
      year: 1980,
      assumes:
        'That fat mass has a density of 0.900 g/cm³ and fat-free mass 1.100 g/cm³ — constants derived from a small, young reference population.',
      accuracy:
        'The most accurate of the four when the calipers are used correctly, and the most dependent on technique. Measurement error at seven sites compounds, so an inconsistent pinch matters more here than anywhere else.',
    },
    {
      id: 'jackson-pollock-3',
      name: 'Jackson-Pollock, 3 sites',
      expression: [
        'men:   BD = 1.10938 − 0.0008267·S + 0.0000016·S² − 0.0002574·age',
        'women: BD = 1.0994921 − 0.0009929·S + 0.0000023·S² − 0.0001392·age',
        '%BF = 495 / BD − 450        (S = sum of 3 skinfolds, mm)',
      ],
      source:
        'Jackson AS, Pollock ML, British Journal of Nutrition 40(3), 1978; Jackson AS, Pollock ML, Ward A, Medicine and Science in Sports and Exercise 12(3), 1980.',
      year: 1980,
      assumes: 'The same density constants as the 7-site equation.',
      accuracy:
        'Slightly less accurate than the 7-site version and considerably more practical. For most people the difference between the two is smaller than the error introduced by inconsistent caliper technique.',
    },
    {
      id: 'deurenberg',
      name: 'Deurenberg (BMI-based)',
      expression: [
        '%BF = 1.20 × BMI + 0.23 × age − 10.8 × sex − 5.4',
        '(sex: male = 1, female = 0)',
      ],
      source:
        'Deurenberg P, Weststrate JA, Seidell JC, British Journal of Nutrition 65(2), 1991, pp. 105–114.',
      year: 1991,
      assumes:
        'That body fat can be inferred from BMI, age and sex alone, with no direct measurement of the body.',
      accuracy:
        'The least accurate of the four, and it inherits every limitation of BMI because BMI is its only body input. It over-reads substantially for muscular people. Included because it is widely cited and needs no tape measure.',
    },
  ],
  howToSteps: steps(
    'your measurements for the chosen method',
    'your estimated body fat percentage, plus fat mass and fat-free mass'
  ),
  faq: [
    {
      question: 'Which body fat method is most accurate?',
      answer:
        'Of the four here, the 7-site skinfold method, when the calipers are used consistently by someone who knows how. But none of them measures body fat — they all estimate it from proxies. DXA is the practical reference standard, and even that varies between machines.',
    },
    {
      question: 'Why does the US Navy method need my neck measurement?',
      answer:
        'The equation works from the difference between waist and neck girth. The neck acts as a proxy for frame size, so two people with the same waist but different builds do not get the same answer. It is also why a neck measured larger than the waist produces no result: the equation takes a logarithm of that difference.',
    },
    {
      question: 'How accurate is the tape method?',
      answer:
        'Hodgdon and Beckett reported a correlation around 0.90 against hydrostatic weighing, with a typical error of three to four percentage points. So a reading of 20% is realistically somewhere between 16% and 24%. Treat it as a band, and track the direction it moves over time rather than the single figure.',
    },
    {
      question: 'What is a healthy body fat percentage?',
      answer:
        'Published reference ranges vary by source and by age, and there is no single agreed cut-point the way there is for BMI. Essential fat is around 3% for men and 12% for women, below which health suffers. Beyond that, this site does not publish target ranges, because a target number invites chasing it.',
    },
    {
      question: 'Why is there no result under 18?',
      answer:
        'All four equations were derived from and validated on adults. Body composition during growth depends on developmental stage in ways these equations do not model, so applying them to a 15-year-old produces a number with no meaning behind it.',
    },
    {
      question: 'Do I measure my waist at the navel or the narrowest point?',
      answer:
        'For the US Navy method: men measure at the navel, women at the narrowest point. That asymmetry is in the original protocol, not a mistake — the two equations were derived against measurements taken that way, so using a different site changes the answer.',
    },
  ],
  referenceTable: bodyFatTable(),
  relatedCalculators: ['bmi', 'lean-body-mass', 'army-body-fat', 'ideal-weight', 'bmr', 'macro'],
  relatedGuides: ['body-fat-methods-compared', 'how-the-navy-method-works'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const leanBodyMass: CalculatorDefinition = {
  slug: 'lean-body-mass',
  category: 'body-composition',
  heading: 'Lean body mass calculator',
  metaTitle: 'Lean body mass calculator — Boer, James and Hume',
  description:
    'Estimate lean body mass from height, weight and sex using the Boer, James or Hume equations, with all three shown side by side for comparison.',
  keywords: ['lean body mass calculator', 'lbm calculator', 'boer formula', 'fat free mass'],
  applicationSubCategory: 'Body composition',
  intro:
    'Three published equations that predict lean mass from height, weight and sex. All three are shown together, because they disagree and the disagreement is informative.',
  inputs: [
    sexInput,
    heightInput,
    weightInput,
    {
      name: 'formula',
      label: 'Equation',
      type: 'select',
      defaultValue: 'boer',
      options: [
        { value: 'boer', label: 'Boer (1984)' },
        { value: 'james', label: 'James (1976)' },
        { value: 'hume', label: 'Hume (1966)' },
      ],
    },
  ],
  formulas: [
    {
      id: 'boer',
      name: 'Boer',
      expression: [
        'men:   LBM = 0.407 × W + 0.267 × H − 19.2',
        'women: LBM = 0.252 × W + 0.473 × H − 48.3',
        '(W in kg, H in cm)',
      ],
      source:
        'Boer P., "Estimated lean body mass as an index for normalization of body fluid volumes in humans", American Journal of Physiology 247(4 Pt 2), 1984, pp. F632–F636.',
      year: 1984,
      assumes:
        'That lean mass can be predicted from stature and total mass alone, with no information about training status.',
      accuracy:
        'The most consistent of the three across the range of body sizes this site sees, and the reason it is the default. It was derived for normalising body fluid volumes rather than for fitness purposes.',
      isDefault: true,
    },
    {
      id: 'james',
      name: 'James',
      expression: [
        'men:   LBM = 1.10 × W − 128 × (W / H)²',
        'women: LBM = 1.07 × W − 148 × (W / H)²',
      ],
      source: 'James WPT, "Research on Obesity", HMSO, London, 1976.',
      year: 1976,
      assumes: 'The same, with a quadratic correction term for the weight-to-height ratio.',
      accuracy:
        'Reasonable in the middle of the range, but the squared term makes it turn over at high body masses: past roughly 150 kg it predicts less lean mass for more total mass, which is not physiologically meaningful. Prefer Boer outside the normal range.',
    },
    {
      id: 'hume',
      name: 'Hume',
      expression: [
        'men:   LBM = 0.32810 × W + 0.33929 × H − 29.5336',
        'women: LBM = 0.29569 × W + 0.41813 × H − 43.2933',
      ],
      source:
        'Hume R., "Prediction of lean body mass from height and weight", Journal of Clinical Pathology 19(4), 1966, pp. 389–391.',
      year: 1966,
      assumes: 'The same as Boer, with different coefficients from an older cohort.',
      accuracy:
        'The oldest of the three and generally the lowest reading. Still widely used in clinical dosing contexts, which is where it came from.',
    },
  ],
  howToSteps: steps(
    'your height, weight and which equation set to use',
    'your estimated lean body mass under all three equations'
  ),
  faq: [
    {
      question: 'What is lean body mass?',
      answer:
        'Everything in the body that is not fat: muscle, bone, organs, water and connective tissue. It is not the same as muscle mass, which is a subset of it, and the difference is large — muscle is roughly half of lean mass in a typical adult.',
    },
    {
      question: 'Why do the three equations disagree?',
      answer:
        'They were fitted to different populations at different times, using different reference methods. None is more "correct" than the others; they are three attempts at the same estimate. The spread between them is a reasonable indication of the uncertainty involved.',
    },
    {
      question: 'Can these tell me how much muscle I have gained?',
      answer:
        'No. All three predict lean mass from height, weight and sex only, so nothing you do in training changes the answer except by changing your body weight. If you gain 2 kg, the equation credits a fixed share of it to lean mass regardless of what that 2 kg actually was.',
    },
    {
      question: 'What should I use instead if I know my body fat percentage?',
      answer:
        'Fat-free mass computed directly from that measurement: body weight × (1 − body fat percentage / 100). That responds to real changes in composition, which these equations cannot.',
    },
    {
      question: 'Why does the James equation behave strangely at high weights?',
      answer:
        'Its correction term subtracts a multiple of the squared weight-to-height ratio, and past about 150 kg that term grows faster than the linear weight term. The result is a curve that peaks and then falls. It is a known limitation of fitting a quadratic outside the range it was derived on.',
    },
  ],
  referenceTable: leanMassTable(),
  relatedCalculators: ['body-fat', 'bmi', 'bmr', 'protein', 'ideal-weight', 'healthy-weight-range'],
  relatedGuides: ['body-fat-methods-compared', 'how-to-set-a-protein-target'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const idealWeight: CalculatorDefinition = {
  slug: 'ideal-weight',
  category: 'weight-reference',
  heading: 'Ideal weight calculator',
  metaTitle: 'Ideal weight calculator — four equations',
  description:
    'Compare the four clinical ideal-weight equations against the healthy BMI range for your height. Shows why a range is a better answer than a single number.',
  keywords: ['ideal weight calculator', 'devine formula', 'ideal body weight', 'hamwi formula'],
  applicationSubCategory: 'Weight reference',
  intro:
    'The four equations below all come from clinical pharmacy, where they normalise drug doses. None was designed to tell anyone what to weigh, so the healthy BMI range is shown first.',
  inputs: [sexInput, heightInput],
  formulas: [
    {
      id: 'devine',
      name: 'Devine',
      expression: [
        'men:   50.0 kg + 2.3 kg per inch over 5 ft',
        'women: 45.5 kg + 2.3 kg per inch over 5 ft',
      ],
      source:
        'Devine BJ., "Gentamicin therapy", Drug Intelligence and Clinical Pharmacy 8, 1974, pp. 650–655.',
      year: 1974,
      assumes:
        'A fixed increment of mass per inch of height above five feet, identical for everyone of the same sex.',
      accuracy:
        'The most widely used of the four, and the one most drug dosing protocols are built on. As a health target it has no validation behind it at all — it was never studied for that purpose.',
      isDefault: true,
    },
    {
      id: 'robinson',
      name: 'Robinson',
      expression: [
        'men:   52.0 kg + 1.9 kg per inch over 5 ft',
        'women: 49.0 kg + 1.7 kg per inch over 5 ft',
      ],
      source:
        'Robinson JD et al., American Journal of Hospital Pharmacy 40(6), 1983, pp. 1016–1019.',
      year: 1983,
      assumes: 'The same shape as Devine, refitted.',
      accuracy:
        'A refinement of Devine intended to improve dosing accuracy. Reads slightly lower at tall heights and slightly higher at short ones.',
    },
    {
      id: 'miller',
      name: 'Miller',
      expression: [
        'men:   56.2 kg + 1.41 kg per inch over 5 ft',
        'women: 53.1 kg + 1.36 kg per inch over 5 ft',
      ],
      source: 'Miller DR et al., American Journal of Hospital Pharmacy 40(9), 1983, p. 1622.',
      year: 1983,
      assumes: 'The same shape, with the flattest slope of the four.',
      accuracy:
        'The least sensitive to height, so it converges with the others near 5 ft 8 in and diverges most at the extremes.',
    },
    {
      id: 'hamwi',
      name: 'Hamwi',
      expression: [
        'men:   48.0 kg + 2.7 kg per inch over 5 ft',
        'women: 45.5 kg + 2.2 kg per inch over 5 ft',
      ],
      source:
        'Hamwi GJ., "Therapy: changing dietary concepts", American Diabetes Association, New York, 1964, pp. 73–78.',
      year: 1964,
      assumes: 'The same shape, with the steepest slope of the four.',
      accuracy:
        'The oldest of the four, developed for diabetes dietary planning. Its steeper slope means it reads highest of all four for tall people.',
    },
  ],
  howToSteps: steps(
    'your height and which equation set to use',
    'the healthy BMI range for your height, plus all four clinical estimates'
  ),
  faq: [
    {
      question: 'Is there such a thing as an ideal weight?',
      answer:
        'Not as a single number. Health outcomes across large populations relate to weight as a broad band, not a point, and the band is wide. That is why this page leads with the BMI range and treats the four equations as historical reference.',
    },
    {
      question: 'Why do these equations come from pharmacy?',
      answer:
        "Because drug doses often need to be scaled to lean mass rather than total mass, and clinicians needed a quick estimate from height alone. Devine's original appeared in a paper about gentamicin dosing. The fitness industry adopted them later, for a purpose they were never validated for.",
    },
    {
      question: 'Which equation should I use?',
      answer:
        'For a health target, none of them — use the healthy BMI range. If you need one for a dosing calculation, use whichever your local protocol specifies, because consistency matters more than the choice.',
    },
    {
      question: 'Why do the equations disagree by several kilograms?',
      answer:
        'They were fitted to different data with different goals, and they differ mainly in slope. At 5 ft 4 in they sit within about 3 kg of each other; at 6 ft 4 in the spread widens to nearly 10 kg, because a steeper per-inch increment compounds with height.',
    },
    {
      question: 'What about people under five feet?',
      answer:
        'All four are anchored at five feet and were not validated below it. Applied to shorter heights they extrapolate downward, and the page flags that. The BMI range remains meaningful at any height.',
    },
  ],
  referenceTable: idealWeightTable(),
  relatedCalculators: [
    'healthy-weight-range',
    'bmi',
    'body-fat',
    'lean-body-mass',
    'calorie',
    'tdee',
  ],
  relatedGuides: ['why-bmi-is-a-screening-tool', 'why-scale-weight-fluctuates'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const healthyWeightRange: CalculatorDefinition = {
  slug: 'healthy-weight-range',
  category: 'weight-reference',
  heading: 'Healthy weight range calculator',
  metaTitle: 'Healthy weight range calculator by height',
  description:
    'Find the weight range corresponding to a healthy BMI of 18.5 to 25 at your height, in kilograms or pounds, with the boundaries and midpoint shown.',
  keywords: ['healthy weight range', 'weight for height', 'healthy weight calculator'],
  applicationSubCategory: 'Weight reference',
  intro:
    'The WHO healthy BMI band, converted to a weight range at your height. It is a wide, population-level band rather than a target.',
  inputs: [heightInput],
  formulas: [
    {
      id: 'healthy-range',
      name: 'Healthy weight range',
      expression: ['lower = 18.5 × height (m)²', 'upper = 25.0 × height (m)²'],
      source:
        'WHO, "Obesity: preventing and managing the global epidemic", Technical Report Series 894, Geneva, 2000.',
      year: 2000,
      assumes:
        'That the WHO adult BMI cut-points apply. They were derived largely from European-descent populations.',
      accuracy:
        'Exact arithmetic given the cut-points. The uncertainty is entirely in the cut-points themselves, which are a screening convention rather than a biological boundary.',
      isDefault: true,
    },
  ],
  howToSteps: steps('your height', 'the weight range corresponding to a BMI of 18.5 to 25'),
  faq: [
    {
      question: 'Why is the range so wide?',
      answer:
        'Because it spans a BMI of 18.5 to 25, and at 175 cm that is about 20 kg. The width is honest: population data does not support a narrower healthy band, and any single number inside it would be arbitrary.',
    },
    {
      question: 'Is it unhealthy to be outside this range?',
      answer:
        'Not necessarily. The range is a screening band derived from population averages. Muscular people commonly sit above it with no excess fat, and plenty of people sit slightly outside it in good health. It flags where a closer look might be worthwhile, nothing more.',
    },
    {
      question: 'Should I aim for the middle of the range?',
      answer:
        'There is no evidence that the midpoint is better than anywhere else in the band. The midpoint is shown because people ask for it, not because it is a target.',
    },
    {
      question: 'Does this range apply to older adults?',
      answer:
        'Less well. Several large analyses find the lowest mortality in older adults sits at a slightly higher BMI than in younger ones, and unintentional weight loss in later life is itself a risk signal. The band is least applicable at the extremes of age.',
    },
    {
      question: 'How does this differ from an ideal weight calculator?',
      answer:
        'This gives a range from a screening standard. Ideal weight equations give a single number from clinical dosing formulas that were never validated as health targets. A range is the more honest answer to "what should I weigh".',
    },
  ],
  referenceTable: healthyWeightTable(),
  relatedCalculators: ['bmi', 'ideal-weight', 'body-fat', 'calorie', 'tdee', 'lean-body-mass'],
  relatedGuides: ['why-bmi-is-a-screening-tool', 'building-a-sustainable-calorie-target'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};

export const armyBodyFat: CalculatorDefinition = {
  slug: 'army-body-fat',
  category: 'body-composition',
  heading: 'Army body composition calculator',
  metaTitle: 'Army body fat calculator — 2026 WHtR standard',
  description:
    'The current US Army body composition standard is waist-to-height ratio below 0.55, not the tape test. Army Directive 2026-13 rescinded the tape test in July 2026.',
  keywords: [
    'army body fat calculator',
    'army tape test',
    'ar 600-9',
    'army waist to height ratio',
    'abcp standard',
  ],
  applicationSubCategory: 'Body composition',
  intro:
    'The Army no longer uses the tape test. Since 7 July 2026 the only body composition assessment is waist-to-height ratio, and the standard is a ratio below 0.55.',
  inputs: [
    heightInput,
    {
      name: 'waist',
      label: 'Waist',
      hint: 'Measured horizontally at the navel, at the end of a normal breath out.',
      type: 'number',
      min: 40,
      max: 200,
      step: 0.5,
      unit: { metric: 'cm', imperial: 'in' },
    },
  ],
  formulas: [
    {
      id: 'whtr',
      name: 'Waist-to-height ratio',
      expression: [
        'WHtR = waist circumference / height',
        'standard: WHtR < 0.550, recorded to three decimal places',
        '(no age adjustment, no sex adjustment)',
      ],
      source:
        'Army Directive 2026-13, "Army Body Composition Program and Standards", Headquarters Department of the Army, effective 7 July 2026 (ARN47030).',
      year: 2026,
      assumes:
        'That central adiposity, which waist circumference tracks, is the component of body composition that matters for readiness and health risk.',
      accuracy:
        'It is a standard rather than an estimate: the ratio is the measurement, not a prediction of body fat. That is the point of the change — it removes the estimation error that every tape formula carried.',
      isDefault: true,
    },
  ],
  howToSteps: steps(
    'your height and your waist measured at the navel',
    'your waist-to-height ratio to three decimal places and whether it meets the standard'
  ),
  faq: [
    {
      question: 'Is the Army tape test still used?',
      answer:
        'No. Army Directive 2026-13, effective 7 July 2026, rescinded the circumference-based tape test, the height and weight screening tables, and every supplemental body fat method including DXA, InBody and Bod Pod. Waist-to-height ratio replaced all of them as the sole assessment.',
    },
    {
      question: 'What happened to the one-site tape test from 2024?',
      answer:
        'It was superseded. Army Directive 2023-11 had replaced the older multi-site formula with a single abdominal measurement from 8 June 2024, and that method was itself rescinded by AD 2026-13 two years later. Most calculators online still implement the multi-site formula, which has now been out of use since 2024.',
    },
    {
      question: 'What is the passing standard?',
      answer:
        'A waist-to-height ratio of less than 0.55. The wording is "less than, but not equal to", and the ratio is recorded to three decimal places — so a recorded 0.550 does not meet the standard.',
    },
    {
      question: 'Is the standard different for men and women, or by age?',
      answer:
        'No. Unlike every method it replaced, there is one threshold for everyone. No age adjustment and no sex adjustment.',
    },
    {
      question: 'How often is it assessed?',
      answer: 'Twice per calendar year, per the directive.',
    },
    {
      question: 'Why does this calculator not show my body fat percentage?',
      answer:
        'Because the Army no longer estimates one. The standard is the ratio itself. Showing a body fat percentage alongside it would imply the Army still assesses that, which it does not. If you want a body fat estimate for your own purposes, the body fat calculator covers four published methods.',
    },
  ],
  referenceTable: armyTable(),
  relatedCalculators: [
    'body-fat',
    'bmi',
    'lean-body-mass',
    'healthy-weight-range',
    'tdee',
    'calorie',
  ],
  relatedGuides: ['body-fat-methods-compared', 'why-bmi-is-a-screening-tool'],
  lastUpdated: REVIEWED,
  published: REVIEWED,
};
