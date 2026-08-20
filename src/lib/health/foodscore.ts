/**
 * Food score from calories, fat and fibre.
 *
 * The formula is the one disclosed in US Patent 6,040,531 (filed 18 July 1997,
 * granted 21 March 2000) and its continuations, which describe a food scoring
 * process for weight management. The patents are the only primary public
 * document that states it — it has never appeared in a peer-reviewed journal,
 * and the clinical literature evaluating the programme built on it prints
 * outcomes, never the algorithm.
 *
 *   p = c/k₁ + f/k₂ − r/k₃, with k₁ = 50, k₂ = 12, k₃ = 5
 *
 * Two things about this implementation are deliberate and worth stating,
 * because both are places where the widely-copied version on the web differs
 * from the source.
 *
 * **There is no fibre cap.** Almost every reproduction of this formula clamps
 * fibre at 4 g. That cap appears in no claim and no part of the specification
 * of any patent in the family. It is most likely an artefact of the printed
 * cardboard slide rule sold alongside the programme, whose fibre scale stopped
 * at 4 g — note that the patent's own worked example happens to use exactly
 * 4 g. Implementing the cap would mean shipping an undocumented convention
 * while citing a patent that does not contain it.
 *
 * **The score floors at zero.** The formula is a difference, so enough fibre
 * against few enough calories drives it negative. A negative score is
 * meaningless as a food value and the patent's claims require a whole number,
 * so it is clamped — and the caller is told, rather than the clamp being
 * silent.
 *
 * The patent family expired on 1 November 2016, twenty years from the PCT
 * filing date. The arithmetic is free to implement. The names attached to it
 * commercially are trademarks and are not used anywhere in this module, on the
 * page it feeds, or in the URL.
 */

/** Divisors from the patent specification, which states them as k₁, k₂ and k₃. */
export const FOOD_SCORE_DIVISORS = {
  kcal: 50,
  fatGrams: 12,
  fibreGrams: 5,
} as const;

export interface FoodScoreInput {
  readonly kcal: number;
  readonly fatGrams: number;
  readonly fibreGrams: number;
}

export interface FoodScoreResult {
  /** The whole-number score, floored at zero. */
  readonly score: number;
  /** Before rounding and before the floor, for showing the working. */
  readonly raw: number;
  /** What each term contributed, so the reader can see where the score came from. */
  readonly fromCalories: number;
  readonly fromFat: number;
  readonly fromFibre: number;
  /** True when the raw score was negative and has been clamped to zero. */
  readonly floored: boolean;
}

/**
 * Rounds half away from zero.
 *
 * The specification says the result is "rounded up or down to an integer value"
 * and elsewhere that it rounds up at 0.50. `Math.round` rounds half up, which
 * agrees for the positive values this produces, but is asymmetric at negative
 * halves — and the raw score can be negative before the floor applies. Doing it
 * explicitly avoids depending on a behaviour that only happens to be right.
 */
const roundHalfAwayFromZero = (value: number): number =>
  value < 0 ? -Math.round(-value) : Math.round(value);

export const foodScore = ({ kcal, fatGrams, fibreGrams }: FoodScoreInput): FoodScoreResult => {
  const fromCalories = kcal / FOOD_SCORE_DIVISORS.kcal;
  const fromFat = fatGrams / FOOD_SCORE_DIVISORS.fatGrams;
  const fromFibre = fibreGrams / FOOD_SCORE_DIVISORS.fibreGrams;

  const raw = fromCalories + fromFat - fromFibre;
  const rounded = roundHalfAwayFromZero(raw);

  return {
    score: Math.max(0, rounded),
    raw,
    fromCalories,
    fromFat,
    fromFibre,
    floored: rounded < 0,
  };
};

/**
 * The fibre needed to cancel one point, at 5 g per point.
 *
 * Exposed because it is the one genuinely useful thing the formula implies: a
 * reader can see what the fibre term is worth without doing the division.
 */
export const fibrePerPoint = (): number => FOOD_SCORE_DIVISORS.fibreGrams;
