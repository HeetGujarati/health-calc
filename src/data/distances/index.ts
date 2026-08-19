import { RACE_DISTANCES, type RaceDistanceId } from '../../lib/health/pace';

/**
 * Race distances for the pace cluster.
 *
 * Distances come from the pace module rather than being restated, so a page and
 * the calculator it links to cannot disagree about how long a marathon is.
 *
 * The finish-time bands below are deliberately vague and labelled as such.
 * There is no authoritative published distribution of amateur finish times that
 * covers every distance, and inventing precise percentiles would be exactly the
 * fabrication the brief forbids. What the pages give instead is the arithmetic
 * that maps a pace to a time, which is exact.
 */

export interface DistanceDefinition {
  readonly slug: string;
  readonly raceId: RaceDistanceId;
  readonly name: string;
  /** Short label for tables and breadcrumbs. */
  readonly shortName: string;
  readonly metres: number;
  readonly summary: string;
  /** What limits performance at this distance, physiologically. */
  readonly demands: string;
  /** Pacing advice specific to the distance. */
  readonly pacing: string;
  /** Split interval that makes sense for this distance, in metres. */
  readonly splitMetres: number;
  /** Paces to tabulate, in seconds per kilometre. */
  readonly paceRange: readonly number[];
  readonly related: readonly string[];
}

const metresFor = (id: RaceDistanceId): number => {
  const race = RACE_DISTANCES.find((entry) => entry.id === id);
  // Unreachable for a valid RaceDistanceId, but throwing here means a typo in a
  // definition fails the build rather than producing a page for a zero-length race.
  if (race === undefined) throw new Error(`Unknown race distance: ${id}`);
  return race.metres;
};

export const DISTANCES: readonly DistanceDefinition[] = [
  {
    slug: '100m',
    raceId: '100m',
    name: '100 metres',
    shortName: '100 m',
    metres: metresFor('100m'),
    summary:
      'The 100 metres is a pure sprint, over in seconds, and effectively unpaced — the race is run at maximum from the first stride.',
    demands:
      'Almost entirely anaerobic. Performance is set by rate of force development, stride mechanics and the ability to reach and briefly hold top speed. Aerobic fitness is close to irrelevant.',
    pacing:
      'There is no pacing strategy in the usual sense. Most runners reach top speed somewhere between 50 and 70 metres and then decelerate slightly; the race is won by decelerating least.',
    splitMetres: 20,
    paceRange: [60, 70, 80, 90, 100, 110, 120],
    related: ['400m', '1-mile', '3k', '5k', '10k'],
  },
  {
    slug: '400m',
    raceId: '400m',
    name: '400 metres',
    shortName: '400 m',
    metres: metresFor('400m'),
    summary:
      'The 400 metres sits between a sprint and a middle-distance event, and is widely considered the most painful race on the track.',
    demands:
      'Predominantly anaerobic, with substantial lactate accumulation. The limiting factor is tolerance of that accumulation as much as speed itself.',
    pacing:
      'Almost every 400 is a positive split — the second half is slower. The skill is going out fast enough to be competitive without arriving at 300 metres unable to hold form.',
    splitMetres: 100,
    paceRange: [130, 145, 160, 175, 190, 205, 220],
    related: ['100m', '1-mile', '3k', '5k', '10k'],
  },
  {
    slug: '1-mile',
    raceId: '1-mile',
    name: '1 mile',
    shortName: '1 mile',
    metres: metresFor('1-mile'),
    summary:
      'The mile is the classic middle-distance race, and the one distance where the imperial unit has outlived metrication in common use.',
    demands:
      'A roughly even split between aerobic and anaerobic contribution, which is what makes it hard to train for. It rewards both endurance and speed and forgives neither weakness.',
    pacing:
      'Even pacing produces the fastest times for most runners, though championship miles are often run as a slow first half and a fast finish. For a time trial, aim to run the four quarters within a couple of seconds of each other.',
    splitMetres: 400,
    paceRange: [180, 200, 220, 240, 270, 300, 330],
    related: ['3k', '400m', '5k', '10k', '100m'],
  },
  {
    slug: '3k',
    raceId: '3k',
    name: '3 kilometres',
    shortName: '3 km',
    metres: metresFor('3k'),
    summary:
      'The 3,000 metres is a middle-distance track race, often used as a fitness test and as a stepping stone to the 5k.',
    demands:
      'Predominantly aerobic, run at or slightly above lactate threshold. It is close to the shortest distance where aerobic capacity dominates.',
    pacing:
      'Even pacing, with a slight negative split if anything. Going out at 5k pace and holding it is a common error that costs more in the final kilometre than it gained in the first.',
    splitMetres: 1000,
    paceRange: [180, 210, 240, 270, 300, 330, 360],
    related: ['5k', '1-mile', '10k', '15k', '400m'],
  },
  {
    slug: '5k',
    raceId: '5k',
    name: '5 kilometres',
    shortName: '5 km',
    metres: metresFor('5k'),
    summary:
      'The 5k is the most widely run race distance in the world, largely because of parkrun and because it is achievable on modest training.',
    demands:
      'Aerobic, run close to lactate threshold. It is short enough that glycogen depletion is not a factor and long enough that pure speed is not the limiter.',
    pacing:
      'Even pacing, or a very slight negative split. Most amateur 5ks are lost in the first kilometre, run 15 to 20 seconds too fast on adrenaline.',
    splitMetres: 1000,
    paceRange: [180, 210, 240, 270, 300, 330, 360, 390, 420],
    related: ['10k', '3k', 'half-marathon', '1-mile', '15k'],
  },
  {
    slug: '10k',
    raceId: '10k',
    name: '10 kilometres',
    shortName: '10 km',
    metres: metresFor('10k'),
    summary:
      'The 10k is the standard road racing distance above the 5k, and a common benchmark for general endurance fitness.',
    demands:
      'Almost entirely aerobic, run just below lactate threshold for most runners. Fuelling is not usually a factor at this duration.',
    pacing:
      'Even pacing. A useful rule of thumb is that 10k pace sits roughly 15 to 20 seconds per kilometre slower than 5k pace for most runners.',
    splitMetres: 1000,
    paceRange: [210, 240, 270, 300, 330, 360, 390, 420, 450],
    related: ['5k', 'half-marathon', '15k', '3k', 'marathon'],
  },
  {
    slug: '15k',
    raceId: '15k',
    name: '15 kilometres',
    shortName: '15 km',
    metres: metresFor('15k'),
    summary:
      'The 15k is a less common road distance that sits between the 10k and the half marathon, and is often used as a half marathon tune-up.',
    demands:
      'Aerobic, below threshold. Long enough that pacing discipline and fuelling start to matter, short enough that neither dominates.',
    pacing:
      'Even pacing, at roughly half marathon effort. It is a useful rehearsal for half marathon pacing without the recovery cost.',
    splitMetres: 1000,
    paceRange: [240, 270, 300, 330, 360, 390, 420, 450],
    related: ['10k', 'half-marathon', '5k', 'marathon', '3k'],
  },
  {
    slug: 'half-marathon',
    raceId: 'half-marathon',
    name: 'Half marathon',
    shortName: 'Half',
    metres: metresFor('half-marathon'),
    summary:
      'The half marathon is 21.0975 km, a distance fixed by World Athletics, and the most popular long road race.',
    demands:
      'Aerobic endurance below threshold. Glycogen becomes relevant toward the end for slower runners, and pacing errors early are punished heavily in the final five kilometres.',
    pacing:
      'Even pacing, ideally with a marginally faster final third. Most runners can hold roughly 88 to 92 per cent of their 10k pace over this distance.',
    splitMetres: 1000,
    paceRange: [240, 270, 300, 330, 360, 390, 420, 450, 480],
    related: ['marathon', '10k', '15k', '5k', '50k'],
  },
  {
    slug: 'marathon',
    raceId: 'marathon',
    name: 'Marathon',
    shortName: 'Marathon',
    metres: metresFor('marathon'),
    summary:
      'The marathon is 42.195 km — a distance fixed by World Athletics, and the reason the last 195 metres exist as a separate split.',
    demands:
      'Aerobic endurance, fuelling and thermoregulation. Glycogen depletion is the defining constraint: most runners store enough for roughly 30 km at race pace, which is why the wall appears where it does.',
    pacing:
      'Even pacing, and the discipline to run the first 10 km slower than feels natural. A marathon run at even effort will show a slight positive split in time terms as fatigue accumulates, which is normal.',
    splitMetres: 1000,
    paceRange: [240, 270, 300, 330, 360, 390, 420, 450, 480, 510],
    related: ['half-marathon', '50k', '15k', '10k', '5k'],
  },
  {
    slug: '50k',
    raceId: '50k',
    name: '50 kilometres',
    shortName: '50 km',
    metres: metresFor('50k'),
    summary:
      'The 50k is the shortest standard ultramarathon distance, and the point at which racing strategy stops resembling road running.',
    demands:
      'Aerobic endurance, fuelling and gastrointestinal tolerance. At this duration the limiting factor is often whether you can keep eating rather than how fast you can run.',
    pacing:
      'Substantially slower than marathon pace, and often with deliberate walking on climbs. Constant-pace projections from shorter races are least useful at this distance.',
    splitMetres: 5000,
    paceRange: [300, 330, 360, 390, 420, 450, 480, 510, 540],
    related: ['marathon', 'half-marathon', '15k', '10k', '5k'],
  },
];

const BY_SLUG = new Map(DISTANCES.map((distance) => [distance.slug, distance]));

export const getDistance = (slug: string): DistanceDefinition | null => BY_SLUG.get(slug) ?? null;

export const distanceSlugs: readonly string[] = DISTANCES.map((distance) => distance.slug);
