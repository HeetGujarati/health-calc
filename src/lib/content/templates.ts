/**
 * Deterministic sentence variation.
 *
 * Programmatic pages share a structure, and if they also shared their prose
 * they would be near-duplicates of each other — which is the failure mode that
 * gets a large programmatic cluster ignored or filtered rather than ranked.
 *
 * Section 7 of the brief requires at least four variants per slot, selected
 * deterministically from a hash of the slug so builds stay reproducible. Two
 * builds of the same page produce identical bytes; two different pages produce
 * different sentences.
 *
 * This is deliberately not randomness. A random selection would change the copy
 * on every rebuild, which would look to a crawler like a page that keeps
 * rewriting itself.
 */

/**
 * FNV-1a, 32-bit.
 *
 * Chosen because it is tiny, has good avalanche for short strings, and is
 * completely specified — so the same slug yields the same index on any machine,
 * in any runtime, forever. A hash whose output could vary across engines would
 * make builds non-reproducible.
 */
export const hashString = (value: string): number => {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    // 16777619, via shifts, to stay in 32-bit integer range.
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
};

/**
 * Picks one variant for a slug.
 *
 * `salt` distinguishes slots on the same page: without it, every slot on a page
 * would choose the same index and the page would read as a single rotation of
 * one template rather than a genuine mix.
 */
export const pickVariant = <T>(variants: readonly T[], slug: string, salt: string): T => {
  if (variants.length === 0) {
    throw new Error(`No variants supplied for slot "${salt}"`);
  }
  const index = hashString(`${slug}::${salt}`) % variants.length;
  const chosen = variants[index];
  // The modulo guarantees a valid index; the check keeps the type honest under
  // noUncheckedIndexedAccess without an assertion.
  if (chosen === undefined) throw new Error(`Variant index out of range for slot "${salt}"`);
  return chosen;
};

/**
 * Fills `{name}` placeholders in a template.
 *
 * Unknown placeholders throw rather than rendering literally, because a page
 * that ships the text "{activity}" is worse than a build that fails.
 */
export const fillTemplate = (
  template: string,
  values: Readonly<Record<string, string | number>>
): string =>
  template.replace(/\{(\w+)\}/g, (_match, key: string) => {
    const value = values[key];
    if (value === undefined) {
      throw new Error(`Template placeholder "{${key}}" has no value`);
    }
    return String(value);
  });

/** Selects a variant and fills it in one step. */
export const renderVariant = (
  variants: readonly string[],
  slug: string,
  salt: string,
  values: Readonly<Record<string, string | number>>
): string => fillTemplate(pickVariant(variants, slug, salt), values);

// --- Activity page copy ------------------------------------------------------

/**
 * Every slot below has at least four variants. They differ in structure and
 * emphasis rather than being the same sentence with synonyms swapped, because
 * synonym substitution produces text that reads as generated and does not
 * meaningfully reduce duplication.
 */

export const ACTIVITY_INTRO: readonly string[] = [
  'Work out how much energy {activity} uses for your body weight and how long you do it. The figure comes from the activity’s metabolic equivalent, published in the Compendium of Physical Activities.',
  '{Activity} is rated at {met} METs, meaning it costs about {met} times as much energy per minute as sitting still. Enter your weight and duration to turn that into kilocalories.',
  'This page turns the published MET value for {activity} into an energy figure for your body weight. Heavier bodies use more for the same activity, which is why weight is an input rather than an assumption.',
  'Energy used during {activity}, computed from its metabolic equivalent of {met}. The table below covers common weights and durations if you would rather not enter anything.',
];

export const ACTIVITY_MET_EXPLANATION: readonly string[] = [
  'A MET is a multiple of resting metabolic rate, defined as an oxygen uptake of 3.5 millilitres per kilogram per minute. At {met} METs, {activity} costs roughly {met} times what your body spends at rest.',
  'The Compendium assigns {activity} a value of {met} METs. One MET is what sitting quietly costs, so this activity is about {met} times that per minute of doing it.',
  'Metabolic equivalents express energy cost relative to rest. {Activity} sits at {met}, which places it {comparison} on the range the Compendium covers.',
  'At {met} METs, {activity} is {comparison} relative to the full range of activities the Compendium lists, which runs from 1.0 for sitting quietly to above 20 for elite competition.',
];

/**
 * Every variant must contain at least one per-page placeholder.
 *
 * A variant with no placeholder renders byte-identical on every page that
 * selects it — with four variants across sixty pages, that is fifteen verbatim
 * duplicates, which is exactly what this module exists to prevent. The
 * duplicate-paragraph gate in the test suite enforces it.
 */
export const ACTIVITY_ACCURACY: readonly string[] = [
  'The {met} MET figure for {activity} is a population average. The Compendium itself notes that individual energy cost varies with fitness, technique, terrain and body composition, so treat it as an order of magnitude rather than a measurement.',
  'This figure is an estimate built on an average. Two people doing {activity} at the same nominal intensity can differ by twenty per cent or more, and no equation using only weight and time can see that.',
  'Accuracy is limited by what a MET value can represent. It is one number standing in for everyone doing {activity}, and real cost shifts with how hard you work, how efficient you are, and the conditions.',
  'Read the result as approximate. Published comparisons of MET-derived estimates against indirect calorimetry commonly find individual discrepancies of twenty to thirty per cent, and {activity} is no exception.',
];

export const ACTIVITY_NET_NOTE: readonly string[] = [
  'The figure above is gross energy — everything spent during the session, including the resting metabolism you would have used anyway. Subtracting one MET-hour per hour gives what {activity} actually added.',
  'Your body spends energy whether or not you do {activity}. The net figure removes that baseline, and it is the honest number if you are adding this on top of a maintenance estimate.',
  'Gross and net differ by roughly one MET per hour. For {activity} at {met} METs, that means about {netShare} of the total is genuinely attributable to the activity.',
  'If you already chose an activity multiplier that assumes you train, adding this figure on top counts {activity} twice. Use the net figure, or set your activity level to sedentary and add sessions separately.',
];

// --- Lift page copy ----------------------------------------------------------

export const LIFT_INTRO: readonly string[] = [
  'Estimate your one rep max on the {lift} from a set you have already done. All five published equations are shown, because they agree at low repetitions and diverge above ten.',
  'Enter a weight and the repetitions you managed on the {lift}. The five equations below were fitted to different data and give different answers; the spread between them tells you how much to trust the estimate.',
  'A one rep max estimate for the {lift}, from any set between one and twenty repetitions. The estimate is most reliable from a heavy triple and least reliable from a set to failure at twelve.',
  'Work out an estimated maximum for the {lift} without testing one. The percentage table below converts that estimate into training loads.',
];

export const LIFT_ACCURACY: readonly string[] = [
  'The five equations were validated mostly on bench press and squat data. {biasNote}',
  'Estimates transfer imperfectly between lifts. {biasNote}',
  'How well these equations work depends on the lift. {biasNote}',
  'A caution specific to this movement: {biasNote}',
];

// --- Distance page copy ------------------------------------------------------

export const DISTANCE_INTRO: readonly string[] = [
  'Convert a {distance} finish time into pace per kilometre and per mile, with splits and what the same pace would give over other distances.',
  'Pace, speed and splits for the {distance}. Enter a target time to see what pace it requires, or a pace to see the finish time it produces.',
  'Everything pace-related for the {distance}: the conversion between pace and finish time, a full split table, and an honest note on why projections to other distances mislead.',
  'Work out {distance} pace from a finish time, or a finish time from a pace. The chart below covers the range most runners race in.',
];

export const DISTANCE_DEMANDS: readonly string[] = [
  'What limits performance here: {demands}',
  'Physiologically, the {distance} is bounded by {demandsLower}',
  'The constraint at this distance: {demandsLower}',
  '{demands}',
];

/**
 * Where a MET value sits on the Compendium's range, as a message key.
 *
 * Returns a key rather than a phrase because the result is dropped mid-sentence
 * into translated copy, and the four bands decline differently in different
 * languages. The caller resolves it through the locale's catalog.
 */
export const metBandKey = (
  met: number
): 'metBand.light' | 'metBand.moderate' | 'metBand.vigorous' | 'metBand.demanding' => {
  if (met < 3) return 'metBand.light';
  if (met < 6) return 'metBand.moderate';
  if (met < 9) return 'metBand.vigorous';
  return 'metBand.demanding';
};

/** Share of gross energy attributable to the activity itself, as a percentage. */
export const netSharePercent = (met: number): number | null =>
  met <= 1 ? null : Math.round(((met - 1) / met) * 100);

/** Lowercases the first character, for mid-sentence insertion. */
export const lowerFirst = (text: string): string =>
  text.length === 0 ? text : `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
