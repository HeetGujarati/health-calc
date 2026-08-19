/**
 * Guide slugs and titles.
 *
 * Kept separate from the guide content itself so calculator pages can link to
 * guides by slug and render the correct title without importing every guide's
 * body. The content collection in phase 7 validates that each slug here has a
 * matching entry, so a related-guide link can never point at a guide that does
 * not exist.
 */
export const GUIDE_TITLES: Readonly<Record<string, string>> = {
  'how-bmr-is-calculated': 'How BMR is calculated, and why the equations disagree',
  'bmr-equations-compared': 'Mifflin-St Jeor vs Harris-Benedict vs Katch-McArdle',
  'what-activity-multipliers-mean': 'What TDEE activity multipliers actually mean',
  'how-to-set-a-protein-target': 'How to set a protein target',
  'why-bmi-is-a-screening-tool': 'Why BMI is a screening tool, not a diagnosis',
  'body-fat-methods-compared': 'How body fat measurement methods compare on accuracy',
  'how-the-navy-method-works': 'How the US Navy body fat method works',
  'understanding-heart-rate-zones': 'Understanding heart rate zones',
  'one-rep-max-formulas-compared': 'How 1RM formulas differ, and when each is most accurate',
  'met-values-explained': 'MET values explained',
  'how-to-read-a-pace-chart': 'How to read a pace chart',
  'the-maintenance-calories-misconception': 'The maintenance calories misconception',
  'why-scale-weight-fluctuates': 'Why scale weight fluctuates day to day',
  'building-a-sustainable-calorie-target': 'How to build a calorie target that is sustainable',
};

export const GUIDE_SLUGS = Object.keys(GUIDE_TITLES);
