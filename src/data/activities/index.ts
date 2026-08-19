/**
 * Activities for the calories-burned cluster.
 *
 * Every MET value and five-digit code below was extracted from the official
 * 2024 Adult Compendium tracking guide published at pacompendium.com, not
 * copied from another calculator. Where a code appears in several editions the
 * value used is the one in the 2024 column.
 *
 * Source: Herrmann SD, Willis EA, Ainsworth BE, et al. "2024 Adult Compendium
 * of Physical Activities: A third update of the energy costs of human
 * activities." Journal of Sport and Health Science 13(1), 2024, pp. 6-12.
 *
 * A note on what a MET value is not: these are population averages, and the
 * Compendium itself flags that individual cost varies substantially with
 * fitness, technique, terrain and body composition. Roughly 18% of the 2024
 * entries are estimated rather than measured. Each page says so.
 */

export interface ActivityDefinition {
  readonly slug: string;
  /** Page and link label. */
  readonly name: string;
  /** Compendium five-digit activity code. */
  readonly code: string;
  readonly met: number;
  /** The Compendium's own description, quoted so the value is checkable. */
  readonly compendiumDescription: string;
  /** Major heading in the Compendium. */
  readonly category: ActivityCategory;
  /** Five related activity slugs for the comparison block. */
  readonly related: readonly string[];
}

export const ACTIVITY_CATEGORIES = [
  'walking',
  'running',
  'cycling',
  'water',
  'gym',
  'sports',
  'home',
  'outdoor',
] as const;

export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];

export const ACTIVITIES: readonly ActivityDefinition[] = [
  // --- Walking -------------------------------------------------------------
  {
    slug: 'walking',
    name: 'Walking',
    code: '17190',
    met: 3.8,
    compendiumDescription: 'Walking, 2.8 to 3.4 mph, level, moderate pace, firm surface',
    category: 'walking',
    related: ['brisk-walking', 'walking-fast', 'hiking', 'walking-the-dog', 'stair-climbing'],
  },
  {
    slug: 'brisk-walking',
    name: 'Brisk walking',
    code: '17200',
    met: 4.8,
    compendiumDescription:
      'Walking, 3.5 to 3.9 mph, level, brisk, firm surface, walking for exercise',
    category: 'walking',
    related: ['walking', 'walking-fast', 'hiking', 'jogging', 'stair-climbing'],
  },
  {
    slug: 'walking-fast',
    name: 'Fast walking',
    code: '17220',
    met: 5.5,
    compendiumDescription:
      'Walking, 4.0 to 4.4 mph (6.4 to 7.0 km/h), level, firm surface, very brisk pace',
    category: 'walking',
    related: ['brisk-walking', 'walking', 'jogging', 'hiking', 'walking-the-dog'],
  },
  {
    slug: 'walking-the-dog',
    name: 'Walking the dog',
    code: '17165',
    met: 3.0,
    compendiumDescription: 'Walking the dog',
    category: 'walking',
    related: ['walking', 'brisk-walking', 'hiking', 'gardening', 'housework'],
  },
  {
    slug: 'stair-climbing',
    name: 'Stair climbing',
    code: '17131',
    met: 6.8,
    compendiumDescription: 'Stair climbing, general',
    category: 'walking',
    related: ['stair-machine', 'walking-fast', 'hiking', 'jogging', 'running-stairs'],
  },
  {
    slug: 'running-stairs',
    name: 'Running stairs',
    code: '12170',
    met: 15.0,
    compendiumDescription: 'Running, stairs, up',
    category: 'running',
    related: ['hiit', 'running-13kmh', 'jump-rope-fast', 'boxing', 'jogging'],
  },
  {
    slug: 'hiking',
    name: 'Hiking',
    code: '17080',
    met: 6.0,
    compendiumDescription: 'Hiking, cross country (Taylor Code 040)',
    category: 'outdoor',
    related: ['backpacking', 'walking-fast', 'brisk-walking', 'stair-climbing', 'walking'],
  },
  {
    slug: 'backpacking',
    name: 'Backpacking',
    code: '17010',
    met: 7.0,
    compendiumDescription: 'Backpacking (Taylor Code 050)',
    category: 'outdoor',
    related: ['hiking', 'walking-fast', 'stair-climbing', 'rock-climbing', 'brisk-walking'],
  },

  // --- Running -------------------------------------------------------------
  {
    slug: 'jogging',
    name: 'Jogging',
    code: '12020',
    met: 7.5,
    compendiumDescription: 'Jogging, general, self selected pace',
    category: 'running',
    related: ['running-11kmh', 'running-13kmh', 'walking-fast', 'elliptical', 'cycling-moderate'],
  },
  {
    slug: 'running-11kmh',
    name: 'Running at 11 km/h',
    code: '12070',
    met: 11.0,
    compendiumDescription: 'Running, 7 mph (8.5 min/mile)',
    category: 'running',
    related: ['jogging', 'running-13kmh', 'jump-rope', 'swimming-fast', 'boxing'],
  },
  {
    slug: 'running-13kmh',
    name: 'Running at 13 km/h',
    code: '12090',
    met: 12.0,
    compendiumDescription: 'Running, 8 mph (7.5 min/mile)',
    category: 'running',
    related: ['running-11kmh', 'jogging', 'jump-rope-fast', 'running-stairs', 'squash'],
  },

  // --- Cycling -------------------------------------------------------------
  {
    slug: 'cycling-leisure',
    name: 'Leisure cycling',
    code: '01010',
    met: 4.0,
    compendiumDescription: 'Bicycling, <10 mph, leisure, to work or for pleasure (Taylor Code 115)',
    category: 'cycling',
    related: ['cycling-moderate', 'cycling-fast', 'stationary-cycling', 'walking', 'swimming-slow'],
  },
  {
    slug: 'cycling-moderate',
    name: 'Cycling, moderate effort',
    code: '01030',
    met: 8.0,
    compendiumDescription: 'Bicycling, 12 13.9 mph, leisure, moderate effort',
    category: 'cycling',
    related: ['cycling-fast', 'cycling-leisure', 'stationary-cycling', 'jogging', 'rowing-machine'],
  },
  {
    slug: 'cycling-fast',
    name: 'Cycling, vigorous effort',
    code: '01040',
    met: 10.0,
    compendiumDescription: 'Bicycling, 14 15.9 mph, racing or leisure, fast, vigorous effort',
    category: 'cycling',
    related: ['cycling-moderate', 'spin-class', 'running-11kmh', 'rowing-machine', 'swimming-fast'],
  },
  {
    slug: 'stationary-cycling',
    name: 'Stationary cycling',
    code: '01200',
    met: 6.8,
    compendiumDescription: 'Bicycling, stationary, general',
    category: 'gym',
    related: ['spin-class', 'cycling-moderate', 'elliptical', 'rowing-machine', 'weight-training'],
  },
  {
    slug: 'spin-class',
    name: 'Indoor cycling class',
    code: '01228',
    met: 8.0,
    compendiumDescription: 'Bicycling, stationary, 126 150 watts',
    category: 'gym',
    related: ['stationary-cycling', 'cycling-fast', 'hiit', 'rowing-machine', 'elliptical'],
  },

  // --- Water ---------------------------------------------------------------
  {
    slug: 'swimming-slow',
    name: 'Swimming, slow freestyle',
    code: '18240',
    met: 5.8,
    compendiumDescription: 'Swimming laps, freestyle, slow, recreational',
    category: 'water',
    related: ['swimming-fast', 'water-aerobics', 'cycling-leisure', 'rowing-machine', 'kayaking'],
  },
  {
    slug: 'swimming-fast',
    name: 'Swimming, fast freestyle',
    code: '18230',
    met: 9.8,
    compendiumDescription: 'Swimming laps, freestyle, fast, vigorous effort',
    category: 'water',
    related: ['swimming-slow', 'rowing-machine', 'running-11kmh', 'cycling-fast', 'water-aerobics'],
  },
  {
    slug: 'water-aerobics',
    name: 'Water aerobics',
    code: '02120',
    met: 5.3,
    compendiumDescription: 'Water aerobics, water calisthenics, water exercise',
    category: 'water',
    related: ['swimming-slow', 'aerobics-low', 'pilates', 'yoga-power', 'swimming-fast'],
  },
  {
    slug: 'kayaking',
    name: 'Kayaking',
    code: '18100',
    met: 5.0,
    compendiumDescription: 'Kayaking, moderate effort',
    category: 'water',
    related: ['rowing-machine', 'swimming-slow', 'cycling-leisure', 'hiking', 'swimming-fast'],
  },

  // --- Gym and conditioning ------------------------------------------------
  {
    slug: 'weight-training',
    name: 'Weight training',
    code: '02054',
    met: 3.5,
    compendiumDescription:
      'Resistance (weight) training, multiple exercises, 8 15 reps at varied resistance',
    category: 'gym',
    related: ['powerlifting', 'circuit-training', 'calisthenics', 'hiit', 'stationary-cycling'],
  },
  {
    slug: 'powerlifting',
    name: 'Powerlifting',
    code: '02050',
    met: 6.0,
    compendiumDescription:
      'Resistance (weight lifting free weight, nautilus or universal type), power lifting or bodybuilding, vigorous effort',
    category: 'gym',
    related: ['weight-training', 'circuit-training', 'calisthenics', 'hiit', 'stationary-cycling'],
  },
  {
    slug: 'circuit-training',
    name: 'Circuit training',
    code: '02032',
    met: 6.0,
    compendiumDescription: 'Circuit training, body weight exercises',
    category: 'gym',
    related: ['hiit', 'calisthenics', 'weight-training', 'aerobics-high', 'rowing-machine'],
  },
  {
    slug: 'calisthenics',
    name: 'Calisthenics',
    code: '02020',
    met: 7.5,
    compendiumDescription:
      'Calisthenics (e.g., pushups, sit ups, pull ups, jumping jacks, burpees, battling ropes), vigorous effort',
    category: 'gym',
    related: ['circuit-training', 'hiit', 'weight-training', 'jump-rope', 'aerobics-high'],
  },
  {
    slug: 'hiit',
    name: 'HIIT',
    code: '02214',
    met: 11.0,
    compendiumDescription:
      'High intensity interval exercise, burpees, mountain climbers, squat jumps, Tabata, vigorous effort',
    category: 'gym',
    related: [
      'circuit-training',
      'calisthenics',
      'jump-rope-fast',
      'running-11kmh',
      'stationary-cycling',
    ],
  },
  {
    slug: 'rowing-machine',
    name: 'Rowing machine',
    code: '02070',
    met: 7.3,
    compendiumDescription: 'Rowing, stationary ergometer, general, vigorous effort',
    category: 'gym',
    related: ['elliptical', 'stationary-cycling', 'swimming-fast', 'hiit', 'spin-class'],
  },
  {
    slug: 'elliptical',
    name: 'Elliptical trainer',
    code: '02048',
    met: 5.0,
    compendiumDescription: 'Elliptical trainer, moderate effort',
    category: 'gym',
    related: ['stationary-cycling', 'rowing-machine', 'jogging', 'spin-class', 'weight-training'],
  },
  {
    slug: 'stair-machine',
    name: 'Stair machine',
    code: '02065',
    met: 9.3,
    compendiumDescription: 'Stair treadmill ergometer, general',
    category: 'gym',
    related: ['rowing-machine', 'hiit', 'running-11kmh', 'stationary-cycling', 'spin-class'],
  },
  {
    slug: 'aerobics-low',
    name: 'Low-impact aerobics',
    code: '02005',
    met: 4.8,
    compendiumDescription: 'Aerobic dance, low impact, moderate effort',
    category: 'gym',
    related: ['aerobics-high', 'step-aerobics', 'water-aerobics', 'dance-class', 'pilates'],
  },
  {
    slug: 'aerobics-high',
    name: 'High-impact aerobics',
    code: '02006',
    met: 8.0,
    compendiumDescription: 'Aerobic dance, high impact, vigorous effort',
    category: 'gym',
    related: ['aerobics-low', 'step-aerobics', 'hiit', 'jump-rope', 'circuit-training'],
  },
  {
    slug: 'step-aerobics',
    name: 'Step aerobics',
    code: '02001',
    met: 5.5,
    compendiumDescription: 'Aerobic, step, with 4 inch step',
    category: 'gym',
    related: ['aerobics-low', 'aerobics-high', 'stair-climbing', 'dance-class', 'circuit-training'],
  },
  {
    slug: 'jump-rope',
    name: 'Jump rope',
    code: '15551',
    met: 11.8,
    compendiumDescription:
      'Rope jumping, moderate pace, general, 100 to 120 skips/min, 2 foot skip, plain bounce',
    category: 'gym',
    related: ['jump-rope-fast', 'hiit', 'running-11kmh', 'boxing', 'stationary-cycling'],
  },
  {
    slug: 'jump-rope-fast',
    name: 'Jump rope, fast',
    code: '15550',
    met: 12.3,
    compendiumDescription: 'Rope jumping, fast pace, 120 160 skips/min',
    category: 'gym',
    related: ['jump-rope', 'hiit', 'boxing', 'running-13kmh', 'running-stairs'],
  },
  {
    slug: 'yoga',
    name: 'Yoga',
    code: '02175',
    met: 2.3,
    compendiumDescription: 'Yoga, General',
    category: 'gym',
    related: ['yoga-power', 'yoga-hot', 'pilates', 'tai-chi', 'stationary-cycling'],
  },
  {
    slug: 'yoga-power',
    name: 'Power yoga',
    code: '02160',
    met: 4.0,
    compendiumDescription: 'Yoga, Power',
    category: 'gym',
    related: ['yoga', 'yoga-hot', 'pilates', 'aerobics-low', 'calisthenics'],
  },
  {
    slug: 'yoga-hot',
    name: 'Hot yoga',
    code: '02155',
    met: 3.0,
    compendiumDescription: 'Yoga, Hot',
    category: 'gym',
    related: ['yoga', 'yoga-power', 'pilates', 'tai-chi', 'stationary-cycling'],
  },
  {
    slug: 'pilates',
    name: 'Pilates',
    code: '02105',
    met: 2.8,
    compendiumDescription: 'Pilates, general',
    category: 'gym',
    related: ['yoga', 'yoga-power', 'water-aerobics', 'tai-chi', 'stationary-cycling'],
  },
  {
    slug: 'tai-chi',
    name: 'Tai chi',
    code: '15670',
    met: 3.3,
    compendiumDescription: 'Tai chi, qi gong, general',
    category: 'gym',
    related: ['yoga', 'pilates', 'walking', 'yoga-hot', 'stationary-cycling'],
  },

  // --- Sports --------------------------------------------------------------
  {
    slug: 'basketball',
    name: 'Basketball',
    code: '15040',
    met: 8.0,
    compendiumDescription: 'Basketball, game (Taylor Code 490)',
    category: 'sports',
    related: ['football', 'soccer', 'tennis-singles', 'handball', 'squash'],
  },
  {
    slug: 'soccer',
    name: 'Soccer',
    code: '15610',
    met: 7.0,
    compendiumDescription: 'Soccer, casual, general (Taylor Code 540)',
    category: 'sports',
    related: ['basketball', 'football', 'tennis-singles', 'squash', 'handball'],
  },
  {
    slug: 'football',
    name: 'Football',
    code: '15210',
    met: 8.0,
    compendiumDescription: 'Football, competitive',
    category: 'sports',
    related: ['soccer', 'basketball', 'handball', 'tennis-singles', 'squash'],
  },
  {
    slug: 'tennis-singles',
    name: 'Tennis, singles',
    code: '15690',
    met: 8.0,
    compendiumDescription: 'Tennis, singles (Taylor Code 420)',
    category: 'sports',
    related: ['squash', 'badminton', 'basketball', 'soccer', 'football'],
  },
  {
    slug: 'squash',
    name: 'Squash',
    code: '15650',
    met: 12.0,
    compendiumDescription: 'Squash (Taylor Code 530)',
    category: 'sports',
    related: ['handball', 'tennis-singles', 'running-13kmh', 'boxing', 'basketball'],
  },
  {
    slug: 'handball',
    name: 'Handball',
    code: '15320',
    met: 12.0,
    compendiumDescription: 'Handball, general (Taylor Code 520)',
    category: 'sports',
    related: ['squash', 'basketball', 'boxing', 'soccer', 'football'],
  },
  {
    slug: 'badminton',
    name: 'Badminton',
    code: '15030',
    met: 5.5,
    compendiumDescription: 'Badminton, social singles and doubles, general',
    category: 'sports',
    related: ['table-tennis', 'volleyball', 'tennis-singles', 'basketball', 'soccer'],
  },
  {
    slug: 'table-tennis',
    name: 'Table tennis',
    code: '15660',
    met: 4.0,
    compendiumDescription: 'Table tennis, ping pong (Taylor Code 410)',
    category: 'sports',
    related: ['badminton', 'volleyball', 'golf', 'basketball', 'soccer'],
  },
  {
    slug: 'volleyball',
    name: 'Volleyball',
    code: '15720',
    met: 3.0,
    compendiumDescription: 'Volleyball, non competitive, 6 9 member team, general',
    category: 'sports',
    related: ['badminton', 'table-tennis', 'basketball', 'soccer', 'football'],
  },
  {
    slug: 'boxing',
    name: 'Boxing',
    code: '15100',
    met: 12.3,
    compendiumDescription: 'Boxing, in ring, general',
    category: 'sports',
    related: ['martial-arts', 'jump-rope-fast', 'hiit', 'squash', 'running-13kmh'],
  },
  {
    slug: 'martial-arts',
    name: 'Martial arts',
    code: '15425',
    met: 5.3,
    compendiumDescription:
      'Martial Arts, different types, slower pace, novice performers, practice',
    category: 'sports',
    related: ['boxing', 'tai-chi', 'circuit-training', 'calisthenics', 'yoga-power'],
  },
  {
    slug: 'rock-climbing',
    name: 'Rock climbing',
    code: '15534',
    met: 8.8,
    compendiumDescription: 'Rock climbing, free boulder',
    category: 'outdoor',
    related: ['backpacking', 'hiking', 'calisthenics', 'circuit-training', 'volleyball'],
  },
  {
    slug: 'golf',
    name: 'Golf',
    code: '15255',
    met: 4.5,
    compendiumDescription: 'Golf, general',
    category: 'sports',
    related: ['walking', 'table-tennis', 'brisk-walking', 'basketball', 'soccer'],
  },
  {
    slug: 'dance-class',
    name: 'Dance class',
    code: '03042',
    met: 6.0,
    compendiumDescription: 'Ballroom Dance, Recreational (Waltz, Foxtrot, Cha cha, Swing) Dancing',
    category: 'sports',
    related: ['aerobics-low', 'aerobics-high', 'step-aerobics', 'yoga-power', 'pilates'],
  },

  // --- Home and garden -----------------------------------------------------
  {
    slug: 'housework',
    name: 'Housework',
    code: '05010',
    met: 3.3,
    compendiumDescription: 'Cleaning, sweeping carpet or floors, general',
    category: 'home',
    related: ['vacuuming', 'cooking', 'gardening', 'walking', 'carrying-groceries'],
  },
  {
    slug: 'vacuuming',
    name: 'Vacuuming',
    code: '05043',
    met: 3.0,
    compendiumDescription: 'Vacuuming, general, moderate effort',
    category: 'home',
    related: ['housework', 'cooking', 'walking', 'carrying-groceries', 'gardening'],
  },
  {
    slug: 'cooking',
    name: 'Cooking',
    code: '05049',
    met: 3.5,
    compendiumDescription: 'Cooking or food preparation, moderate effort',
    category: 'home',
    related: ['housework', 'vacuuming', 'carrying-groceries', 'walking', 'gardening'],
  },
  {
    slug: 'carrying-groceries',
    name: 'Carrying groceries',
    code: '05054',
    met: 3.5,
    compendiumDescription: 'carrying groceries, on level ground, walking',
    category: 'home',
    related: ['cooking', 'housework', 'walking', 'stair-climbing', 'gardening'],
  },
  {
    slug: 'gardening',
    name: 'Gardening',
    code: '08239',
    met: 3.8,
    compendiumDescription: 'Weeding, cultivating garden, light to moderate effort',
    category: 'home',
    related: ['mowing-lawn', 'raking-leaves', 'shovelling', 'housework', 'walking'],
  },
  {
    slug: 'mowing-lawn',
    name: 'Mowing the lawn',
    code: '08095',
    met: 5.5,
    compendiumDescription: 'Mowing lawn, general, walking, moderate effort',
    category: 'home',
    related: ['gardening', 'raking-leaves', 'shovelling', 'brisk-walking', 'housework'],
  },
  {
    slug: 'raking-leaves',
    name: 'Raking leaves',
    code: '08160',
    met: 4.0,
    compendiumDescription: 'Raking lawn or leaves, moderate effort',
    category: 'home',
    related: ['gardening', 'mowing-lawn', 'shovelling', 'housework', 'walking'],
  },
  {
    slug: 'shovelling',
    name: 'Shovelling',
    code: '08192',
    met: 5.5,
    compendiumDescription: 'Shovelling dirt or mud',
    category: 'home',
    related: ['mowing-lawn', 'gardening', 'raking-leaves', 'stair-climbing', 'weight-training'],
  },
];

const BY_SLUG = new Map(ACTIVITIES.map((activity) => [activity.slug, activity]));

export const getActivity = (slug: string): ActivityDefinition | null => BY_SLUG.get(slug) ?? null;

export const activitySlugs: readonly string[] = ACTIVITIES.map((activity) => activity.slug);

export const CATEGORY_LABELS: Readonly<Record<ActivityCategory, string>> = {
  walking: 'Walking and stairs',
  running: 'Running',
  cycling: 'Cycling',
  water: 'Water',
  gym: 'Gym and studio',
  sports: 'Sports',
  home: 'Home and garden',
  outdoor: 'Outdoors',
};

export const activitiesByCategory = (): readonly {
  readonly id: ActivityCategory;
  readonly label: string;
  readonly items: readonly ActivityDefinition[];
}[] =>
  ACTIVITY_CATEGORIES.map((id) => ({
    id,
    label: CATEGORY_LABELS[id],
    items: ACTIVITIES.filter((activity) => activity.category === id),
  })).filter((group) => group.items.length > 0);
