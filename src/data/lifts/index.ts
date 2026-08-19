/**
 * Lifts for the one-rep-max cluster.
 *
 * The `estimateBias` field is the honest part of these pages. The five 1RM
 * equations were derived largely from bench press and squat data, and they do
 * not transfer equally to every lift — a deadlift yields fewer repetitions at
 * the same percentage than the equations assume, so estimates read high.
 *
 * No numbers are invented here: the bias is described in words rather than as
 * a correction factor, because no published factor exists for most of these
 * lifts. Saying "expect this to read high" is honest; inventing a 0.93
 * multiplier would not be.
 */

export interface LiftDefinition {
  readonly slug: string;
  readonly name: string;
  readonly category: LiftCategory;
  /** One sentence on what the lift is, for the page intro. */
  readonly summary: string;
  /** How the 1RM equations behave on this lift specifically. */
  readonly estimateBias: string;
  /** Lift-specific notes on testing and technique. */
  readonly notes: readonly string[];
  /** Typical repetition range this lift is trained in. */
  readonly typicalReps: string;
  readonly related: readonly string[];
}

export const LIFT_CATEGORIES = ['push', 'pull', 'legs', 'olympic'] as const;
export type LiftCategory = (typeof LIFT_CATEGORIES)[number];

export const LIFT_CATEGORY_LABELS: Readonly<Record<LiftCategory, string>> = {
  push: 'Pressing',
  pull: 'Pulling',
  legs: 'Lower body',
  olympic: 'Olympic and power',
};

export const LIFTS: readonly LiftDefinition[] = [
  {
    slug: 'bench-press',
    name: 'Bench press',
    category: 'push',
    summary:
      'The barbell bench press is one of the two lifts the 1RM equations were principally derived from, which makes it the lift they predict best.',
    estimateBias:
      'Estimates are most reliable here. Much of the original validation data came from bench press testing, so the equations are working inside the range they were fitted on.',
    notes: [
      'Repetitions at a given percentage are fairly consistent between people on this lift, which is part of why it validates well.',
      'Touch-and-go repetitions allow more reps than paused ones at the same load. If you test paused and train touch-and-go, your estimate will read low.',
      'A spotter is essential for any attempt near a true maximum.',
    ],
    typicalReps: '3 to 10',
    related: ['incline-bench', 'dumbbell-bench', 'overhead-press', 'squat', 'barbell-row'],
  },
  {
    slug: 'squat',
    name: 'Back squat',
    category: 'legs',
    summary:
      'The back squat is the other lift the 1RM equations were largely built on, and estimates transfer well to it.',
    estimateBias:
      'Reliable, for the same reason as the bench press: it is well represented in the original validation data.',
    notes: [
      'Depth changes the answer. A set to parallel and a set well below it are different lifts, and comparing estimates across them is meaningless.',
      'High-bar and low-bar positions differ by several per cent for most lifters.',
      'Squats tend to allow more repetitions at a given percentage than upper-body lifts, so estimates from high-rep sets read high.',
    ],
    typicalReps: '3 to 8',
    related: ['front-squat', 'deadlift', 'romanian-deadlift', 'hip-thrust', 'bench-press'],
  },
  {
    slug: 'deadlift',
    name: 'Deadlift',
    category: 'pull',
    summary:
      'The conventional barbell deadlift is the lift where 1RM estimates diverge most from measured maxima.',
    estimateBias:
      'Estimates read high, often substantially. Deadlifts start from a dead stop with no stretch-shortening cycle, grip becomes limiting, and the systemic demand is higher — so most lifters manage fewer repetitions at a given percentage than the equations assume.',
    notes: [
      'Grip often fails before the legs and back do. A set that ended because the bar slipped does not tell you what your maximum is.',
      'Each repetition from a dead stop costs more than a touch-and-go repetition. Bouncing the bar off the floor inflates the count and therefore the estimate.',
      'Because of the bias, testing a heavy triple is more informative here than estimating from a set of eight.',
    ],
    typicalReps: '1 to 5',
    related: ['romanian-deadlift', 'squat', 'barbell-row', 'hip-thrust', 'front-squat'],
  },
  {
    slug: 'overhead-press',
    name: 'Overhead press',
    category: 'push',
    summary:
      'The standing barbell overhead press is a strict pressing movement with a small range of loading.',
    estimateBias:
      'Estimates read slightly high. The overhead press has a narrow load range and fatigues quickly, so repetitions drop off faster than the linear equations predict.',
    notes: [
      'Leg drive turns this into a push press and adds meaningfully to the load. Estimates only compare if the standard is consistent.',
      'The range between a one and a five repetition maximum is narrower here than on any other lift in this list.',
      'Because the load is light relative to other lifts, small absolute errors are a larger percentage.',
    ],
    typicalReps: '3 to 8',
    related: ['bench-press', 'incline-bench', 'dumbbell-bench', 'barbell-row', 'power-clean'],
  },
  {
    slug: 'front-squat',
    name: 'Front squat',
    category: 'legs',
    summary:
      'The front squat loads the bar across the shoulders, shifting demand toward the quadriceps and the upper back.',
    estimateBias:
      'Estimates read high. The limiting factor is often upper back and rack position rather than leg strength, and that fails faster under fatigue than the equations assume.',
    notes: [
      'Most lifters front squat somewhere between 70 and 85 per cent of their back squat, though the ratio varies widely with build.',
      'Rack position endurance frequently ends the set before the legs do, which understates leg capacity and overstates the max.',
      'Estimates from sets above five repetitions are unreliable on this lift.',
    ],
    typicalReps: '3 to 6',
    related: ['squat', 'deadlift', 'power-clean', 'hip-thrust', 'romanian-deadlift'],
  },
  {
    slug: 'incline-bench',
    name: 'Incline bench press',
    category: 'push',
    summary:
      'The incline bench press raises the bench angle, shifting emphasis toward the upper chest and front deltoids.',
    estimateBias:
      'Similar to the flat bench, marginally less reliable. The steeper angle recruits the shoulders more, and shoulder endurance differs more between lifters than chest endurance does.',
    notes: [
      'Bench angle changes the load substantially. A 30-degree and a 45-degree incline are effectively different lifts.',
      'Most lifters press 70 to 85 per cent of their flat bench on an incline.',
      'Set-up consistency matters more here than on the flat bench, since small angle changes move the number.',
    ],
    typicalReps: '5 to 10',
    related: ['bench-press', 'dumbbell-bench', 'overhead-press', 'barbell-row', 'weighted-pull-up'],
  },
  {
    slug: 'barbell-row',
    name: 'Barbell row',
    category: 'pull',
    summary:
      'The bent-over barbell row is a horizontal pull, usually trained in moderate repetition ranges.',
    estimateBias:
      'Estimates are unreliable, because form degrades predictably under fatigue. Torso angle rises as the set continues, which changes the lift rather than ending it.',
    notes: [
      'A true one-rep maximum is rarely tested on this lift, and the estimate is mostly useful for setting working loads.',
      'Strictness is the main variable. A strict row and a row with hip drive can differ by twenty per cent.',
      'Because the standard drifts within a set, estimates from sets above eight repetitions are close to meaningless here.',
    ],
    typicalReps: '6 to 12',
    related: ['weighted-pull-up', 'deadlift', 'romanian-deadlift', 'bench-press', 'incline-bench'],
  },
  {
    slug: 'romanian-deadlift',
    name: 'Romanian deadlift',
    category: 'pull',
    summary:
      'The Romanian deadlift is a hip-hinge trained through a partial range, loading the hamstrings and glutes under stretch.',
    estimateBias:
      'Estimates read high and a true maximum is rarely tested. This lift is trained for tension rather than for maximal load, and grip usually limits it before the hamstrings do.',
    notes: [
      'This is an accessory lift. Testing a genuine one-rep maximum is neither common nor especially useful.',
      'Range of motion is set by hamstring flexibility, so the same load is a different lift for two people.',
      'Straps change the answer substantially, since grip is often the binding constraint.',
    ],
    typicalReps: '6 to 12',
    related: ['deadlift', 'hip-thrust', 'squat', 'barbell-row', 'front-squat'],
  },
  {
    slug: 'dumbbell-bench',
    name: 'Dumbbell bench press',
    category: 'push',
    summary:
      'The dumbbell bench press allows a longer range of motion and demands stabilisation from each side independently.',
    estimateBias:
      'Estimates read high. Stabilisation demand rises with fatigue, so the set often ends because the dumbbells become unmanageable rather than because the chest failed.',
    notes: [
      'Getting heavy dumbbells into position is itself limiting, and it caps what can be tested safely alone.',
      'Loads are usually quoted per dumbbell. Doubling for a total is a common source of confusion when comparing to a barbell.',
      'Most lifters handle a combined dumbbell load below their barbell bench, largely because of the stabilisation cost.',
    ],
    typicalReps: '6 to 12',
    related: ['bench-press', 'incline-bench', 'overhead-press', 'weighted-pull-up', 'barbell-row'],
  },
  {
    slug: 'weighted-pull-up',
    name: 'Weighted pull-up',
    category: 'pull',
    summary:
      'The weighted pull-up adds external load to a bodyweight movement, which changes how a maximum should be calculated.',
    estimateBias:
      'The equations need total system load — bodyweight plus added weight — not the added weight alone. Feeding them only the added plate produces an answer that is wrong by the size of the lifter.',
    notes: [
      'Add your bodyweight to the added load before using any 1RM equation, then subtract it again from the result.',
      'Because bodyweight dominates the total, small changes in bodyweight move the estimate independently of strength.',
      'Grip width and whether the chin clears the bar both change the standard; keep them constant between tests.',
    ],
    typicalReps: '3 to 8',
    related: ['barbell-row', 'deadlift', 'incline-bench', 'dumbbell-bench', 'overhead-press'],
  },
  {
    slug: 'hip-thrust',
    name: 'Hip thrust',
    category: 'legs',
    summary:
      'The barbell hip thrust loads hip extension through a short range with the shoulders elevated.',
    estimateBias:
      'Estimates read high. The short range and strong leverage allow high repetition counts at loads close to maximal, which is exactly where the linear equations break down.',
    notes: [
      'Loads are high relative to other lifts, and the repetition range at a given percentage is unusually wide.',
      'Bar padding and setup consistency change the achievable load noticeably.',
      'Sets above ten repetitions produce estimates that diverge widely between the five equations, which is itself a useful signal.',
    ],
    typicalReps: '6 to 12',
    related: ['squat', 'romanian-deadlift', 'deadlift', 'front-squat', 'barbell-row'],
  },
  {
    slug: 'power-clean',
    name: 'Power clean',
    category: 'olympic',
    summary:
      'The power clean is an explosive pull from the floor to the shoulders, caught above parallel.',
    estimateBias:
      'These equations should not be used on this lift. It is limited by technique and rate of force development rather than by grinding capacity, and technique degrades under fatigue in ways a load-repetition model cannot represent.',
    notes: [
      'Olympic lifts are trained in low repetitions precisely because quality collapses quickly. A set of ten power cleans is a different exercise from a set of two.',
      'A missed lift is usually a technical miss rather than a strength failure, so repetitions-to-failure is not a meaningful measure here.',
      'For programming, test singles and doubles directly rather than estimating from a set.',
    ],
    typicalReps: '1 to 3',
    related: ['front-squat', 'deadlift', 'squat', 'overhead-press', 'romanian-deadlift'],
  },
];

const BY_SLUG = new Map(LIFTS.map((lift) => [lift.slug, lift]));

export const getLift = (slug: string): LiftDefinition | null => BY_SLUG.get(slug) ?? null;

export const liftSlugs: readonly string[] = LIFTS.map((lift) => lift.slug);

export const liftsByCategory = (): readonly {
  readonly id: LiftCategory;
  readonly label: string;
  readonly items: readonly LiftDefinition[];
}[] =>
  LIFT_CATEGORIES.map((id) => ({
    id,
    label: LIFT_CATEGORY_LABELS[id],
    items: LIFTS.filter((lift) => lift.category === id),
  })).filter((group) => group.items.length > 0);
