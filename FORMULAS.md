# Formulas and sources

Every equation this site computes, with the publication it comes from. Nothing
is implemented here without a named, published source, and nothing is cited to a
paper that does not contain it.

Implementation lives in `src/lib/health/`. Each module carries these citations in
its header, and each is checked against worked examples in the adjacent test
file.

---

## Body mass index — `bmi.ts`

| Quantity            | Equation                                      | Source                                                                                                                                                                                                         |
| ------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BMI                 | mass(kg) / height(m)²                         | Quetelet A., _Sur l'homme et le développement de ses facultés_, 1835. Named "body mass index" by Keys A. et al., "Indices of relative weight and obesity", _Journal of Chronic Diseases_ 25(6), 1972, 329–343. |
| BMI Prime           | BMI / 25                                      | Gadzik J., "'How much should I weigh?' — Quetelet's equation, upper weight limits and BMI prime", _Connecticut Medicine_ 70(2), 2006, 81–88.                                                                   |
| Ponderal index      | mass(kg) / height(m)³                         | Rohrer F., "Der Index der Körperfülle als Maß des Ernährungszustandes", _Münchener Medizinische Wochenschrift_ 68, 1921.                                                                                       |
| Category cut-points | <18.5 / 18.5–25 / 25–30 / 30–35 / 35–40 / ≥40 | World Health Organization, _Obesity: preventing and managing the global epidemic_, WHO Technical Report Series 894, Geneva, 2000.                                                                              |

Cut-points are implemented as half-open intervals `[min, max)`. The widely
reproduced "18.5–24.9" shorthand is wrong at the boundary: the real upper limit
is 25.0 exactly, so a BMI of 24.95 is inside the healthy band.

**What BMI assumes.** It is a ratio of mass to height and contains no
information about what that mass is made of. It does not distinguish muscle from
fat, and says nothing about where body fat sits. It was derived from and
validated on populations, not individuals — a screening indicator, not a
diagnosis.

---

## Basal metabolic rate — `bmr.ts`

| Equation                      | Form                                                                             | Source                                                                                                                                                                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mifflin-St Jeor** (default) | men 10W + 6.25H − 5A + 5; women 10W + 6.25H − 5A − 161                           | Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO, "A new predictive equation for resting energy expenditure in healthy individuals", _American Journal of Clinical Nutrition_ 51(2), 1990, 241–247.            |
| Revised Harris-Benedict       | men 88.362 + 13.397W + 4.799H − 5.677A; women 447.593 + 9.247W + 3.098H − 4.330A | Roza AM, Shizgal HM, "The Harris Benedict equation reevaluated", _American Journal of Clinical Nutrition_ 40(1), 1984, 168–182. Revises Harris JA, Benedict FG, Carnegie Institution of Washington Publication No. 279, 1919. |
| Katch-McArdle                 | 370 + 21.6 × LBM(kg)                                                             | Katch FI, McArdle WD, _Nutrition, Weight Control, and Exercise_, Lea & Febiger, Philadelphia, 1977.                                                                                                                           |

W = kilograms, H = centimetres, A = years.

**Why Mifflin-St Jeor is the default.** It was derived from a modern population
and validated against indirect calorimetry. Harris-Benedict, even in the revised
form, rests on a 1919 cohort and tends to over-estimate. Katch-McArdle is the
most accurate of the three _when lean body mass is genuinely measured_, because
it is the only one that responds to body composition — but fed a guessed body
fat percentage it becomes the least accurate.

Katch-McArdle returns null rather than falling back to another equation when
lean mass is unavailable, so no number is ever reported under the wrong name.

---

## Total daily energy expenditure — `tdee.ts`

TDEE = BMR × physical activity level.

**Sourcing note, and it matters.** The five multipliers every consumer
calculator uses — 1.2, 1.375, 1.55, 1.725, 1.9 — do **not** originate in any
single published paper. They are a convention that propagated through fitness
literature. Sites that attribute them to Harris-Benedict or Mifflin-St Jeor are
citing papers that do not contain them. This site does not repeat that error.

What is published, and what the multipliers are checked against:

| Framework                 | Bands                                                                               | Source                                                                                                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IOM PAL categories        | sedentary ≥1.0 <1.4; low active ≥1.4 <1.6; active ≥1.6 <1.9; very active ≥1.9 <2.5  | Institute of Medicine, _Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids_, National Academies Press, Washington DC, 2005, ch. 12. Derived from doubly labelled water data. |
| FAO/WHO/UNU lifestyle PAL | sedentary/light 1.40–1.69; moderately active 1.70–1.99; vigorously active 2.00–2.40 | FAO/WHO/UNU Expert Consultation, _Human Energy Requirements_, FAO Food and Nutrition Technical Report Series 1, Rome, 2004.                                                                                                                  |

Each conventional multiplier is tagged with the IOM band it falls in, and a test
asserts the tags stay truthful. Note the conventional "sedentary" 1.2 sits inside
the IOM sedentary band but _below_ the FAO floor of 1.40 — a real discrepancy,
surfaced on the page rather than hidden.

---

## Calorie targets and safety guards — `calories.ts`, `guards.ts`

| Rule                    | Value                                   | Basis                                                                                                                                                                     |
| ----------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calorie floor           | 1,500 kcal men / 1,200 kcal women       | Build brief §4.3.1. Intakes below these are clinical tools requiring supervision and monitoring.                                                                          |
| Deficit cap             | lesser of 25% of TDEE or 1,000 kcal/day | Build brief §4.3.2.                                                                                                                                                       |
| Goal weight guard       | refuses targets below BMI 18.5          | Build brief §4.3.3, using the WHO lower bound.                                                                                                                            |
| Age gate                | no energy or body-fat output below 18   | Build brief §4.3.4. Every equation here was derived on adults.                                                                                                            |
| Energy per kg body mass | 7,700 kcal                              | Wishnofsky M., "Caloric equivalents of gained or lost weight", _American Journal of Clinical Nutrition_ 6(5), 1958, 542–546 — the "3,500 kcal per pound" rule, converted. |

**Honest caveat on the 7,700 figure.** It is a linear approximation and
overstates long-run loss, because expenditure falls as body mass falls. See
Hall KD et al., "Quantifying the effect of energy imbalance on bodyweight
change", _The Lancet_ 378(9793), 2011, 826–837. It is used only to translate
preset labels into a daily figure, and the pages say plainly that real rates
diverge over time.

Order of application is load-bearing: refusals first, then the deficit cap, then
the calorie floor last, so nothing can lower a target after the floor is applied.

---

## Body fat percentage — `bodyfat.ts`

| Method                 | Form                                                                                                                                            | Source                                                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US Navy** (default)  | men 86.010·log₁₀(waist − neck) − 70.041·log₁₀(height) + 36.76; women 163.205·log₁₀(waist + hip − neck) − 97.684·log₁₀(height) − 78.387. Inches. | Hodgdon JA, Beckett MB, Naval Health Research Center Reports 84-11 (men) and 84-29 (women), San Diego, 1984.                                                                     |
| Deurenberg             | 1.20·BMI + 0.23·age − 10.8·sex − 5.4 (sex: male 1, female 0)                                                                                    | Deurenberg P, Weststrate JA, Seidell JC, "Body mass index as a measure of body fatness", _British Journal of Nutrition_ 65(2), 1991, 105–114.                                    |
| Jackson-Pollock 3-site | men BD = 1.10938 − 0.0008267S + 0.0000016S² − 0.0002574·age; women BD = 1.0994921 − 0.0009929S + 0.0000023S² − 0.0001392·age                    | Jackson AS, Pollock ML, _British Journal of Nutrition_ 40(3), 1978, 497–504; Jackson AS, Pollock ML, Ward A, _Medicine and Science in Sports and Exercise_ 12(3), 1980, 175–181. |
| Jackson-Pollock 7-site | men BD = 1.112 − 0.00043499S + 0.00000055S² − 0.00028826·age; women BD = 1.097 − 0.00046971S + 0.00000056S² − 0.00012828·age                    | As above.                                                                                                                                                                        |
| Density → fat %        | 495/BD − 450                                                                                                                                    | Siri WE, "Body composition from fluid spaces and density", in _Techniques for Measuring Body Composition_, National Academy of Sciences, Washington DC, 1961, 223–244.           |

S = sum of skinfolds in millimetres.

An equivalent density form of the Navy equation exists
(`495 / (1.0324 − 0.19077·log₁₀(waist − neck) + 0.15456·log₁₀(height)) − 450`),
routed through Siri. Both trace to Hodgdon & Beckett 1984; the direct form is
implemented.

The Navy method returns null rather than NaN when the girth difference is not
positive — log₁₀ of zero or a negative is not a real number, and a neck measured
wider than a waist means the tape was misread.

**Siri's assumption.** Fat mass density 0.900 g/cm³, fat-free mass 1.100 g/cm³,
derived from a small, young reference population. This is the main reason
skinfold estimates drift for other groups.

---

## Lean body mass — `leanmass.ts`

| Equation           | Form                                                                   | Source                                                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Boer** (default) | men 0.407W + 0.267H − 19.2; women 0.252W + 0.473H − 48.3               | Boer P., "Estimated lean body mass as an index for normalization of body fluid volumes", _American Journal of Physiology_ 247(4 Pt 2), 1984, F632–F636. |
| James              | men 1.10W − 128(W/H)²; women 1.07W − 148(W/H)²                         | James WPT, _Research on Obesity: a report of the DHSS/MRC group_, HMSO, London, 1976.                                                                   |
| Hume               | men 0.32810W + 0.33929H − 29.5336; women 0.29569W + 0.41813H − 43.2933 | Hume R., "Prediction of lean body mass from height and weight", _Journal of Clinical Pathology_ 19(4), 1966, 389–391.                                   |

**Known limitation, tested and documented.** James's squared weight-to-height
term makes it non-monotonic: past roughly 150 kg it predicts _less_ lean mass for
more total mass, which is not physiologically meaningful. A test asserts this
turnover so the warning on the page cannot silently become false.

None of the three responds to training status — two people of the same height and
weight get identical answers. When body fat percentage is actually measured,
fat-free mass from `bodyfat.ts` is the better number.

---

## Ideal weight — `idealweight.ts`

All four share the form: base mass at 5 feet, plus a per-inch increment.

| Equation             | Men            | Women          | Source                                                                                                                                                  |
| -------------------- | -------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Devine** (default) | 50 + 2.3/in    | 45.5 + 2.3/in  | Devine BJ., "Gentamicin therapy", _Drug Intelligence and Clinical Pharmacy_ 8, 1974, 650–655.                                                           |
| Robinson             | 52 + 1.9/in    | 49 + 1.7/in    | Robinson JD et al., _American Journal of Hospital Pharmacy_ 40(6), 1983, 1016–1019.                                                                     |
| Miller               | 56.2 + 1.41/in | 53.1 + 1.36/in | Miller DR et al., _American Journal of Hospital Pharmacy_ 40(9), 1983, 1622.                                                                            |
| Hamwi                | 48 + 2.7/in    | 45.5 + 2.2/in  | Hamwi GJ., "Therapy: changing dietary concepts", in _Diabetes Mellitus: Diagnosis and Treatment_, American Diabetes Association, New York, 1964, 73–78. |

**None of these was designed to tell anyone what to weigh.** All four come from
clinical pharmacy and exist to normalise drug doses. They give a single number
per height with no range and no body composition. The healthy BMI range is
returned alongside every estimate and is what the page leads with.

Below five feet the per-inch term goes negative — these equations were never
validated below their anchor. The value is returned as defined and the height is
flagged, rather than silently clamped.

---

## One repetition maximum — `onerepmax.ts`

| Equation            | Form                             | Source                                                                                                                                             |
| ------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Epley** (default) | w(1 + r/30)                      | Epley B., _Poundage Chart_, Body Enterprises, Lincoln NE, 1985.                                                                                    |
| Brzycki             | w × 36/(37 − r)                  | Brzycki M., _JOPERD_ 64(1), 1993, 88–90.                                                                                                           |
| Lombardi            | w × r^0.10                       | Lombardi VP., _Beginning Weight Training_, Wm. C. Brown, Dubuque IA, 1989.                                                                         |
| O'Conner            | w(1 + r/40)                      | O'Conner B, Simmons J, O'Shea P., _Weight Training Today_, West Publishing, St. Paul MN, 1989.                                                     |
| Wathan              | 100w / (48.8 + 53.8·e^(−0.075r)) | Wathan D., "Load assignment", in Baechle TR (ed), _Essentials of Strength Training and Conditioning_, Human Kinetics, Champaign IL, 1994, 435–446. |

All five were validated in the **2–10 repetition** range. Above roughly 10 reps
the estimates are dominated by muscular endurance rather than maximal strength,
and they diverge from each other by more than any of them diverges from the
truth — which is why all five are always shown.

Two quirks, both tested: Epley is not exact at a single repetition (it returns
103.3 kg for a 100 kg single), and Brzycki is undefined at 37 reps where its
denominator reaches zero. Brzycki returns null there rather than Infinity.

---

## Heart rate — `heartrate.ts`

| Quantity                      | Form                                    | Source                                                                                                                                                |
| ----------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tanaka HRmax** (default)    | 208 − 0.7 × age                         | Tanaka H, Monahan KD, Seals DR., _Journal of the American College of Cardiology_ 37(1), 2001, 153–156. Meta-analysis of 351 studies, 18,712 subjects. |
| Fox HRmax                     | 220 − age                               | Fox SM, Naughton JP, Haskell WL., _Annals of Clinical Research_ 3(6), 1971, 404–432.                                                                  |
| **Karvonen target** (default) | ((HRmax − HRrest) × intensity) + HRrest | Karvonen MJ, Kentala E, Mustala O., _Annales Medicinae Experimentalis et Biologiae Fenniae_ 35(3), 1957, 307–315.                                     |

**On accuracy, because this is where most calculators mislead.** "220 minus age"
was never derived from a regression — Fox et al. presented it as an
approximation drawn by eye from scattered data. It carries a standard deviation
of roughly 10–12 bpm, so about a third of people sit more than 10 bpm from their
predicted maximum. Tanaka came from an actual meta-analysis and predicts better,
especially over 40 where Fox systematically under-predicts. The two cross at
exactly age 40, which is asserted in a test.

Neither substitutes for a measured maximum.

Zone bounds follow the five-zone model in ACSM's _Guidelines for Exercise Testing
and Prescription_, applied to heart rate reserve.

---

## Calories burned — `caloriesburned.ts`

| Form                | Equation                              |
| ------------------- | ------------------------------------- |
| Simple (default)    | kcal = MET × mass(kg) × hours         |
| Oxygen uptake       | kcal/min = MET × 3.5 × mass(kg) / 200 |
| Net of resting cost | kcal = (MET − 1) × mass(kg) × hours   |

MET values: Ainsworth BE, Haskell WL, Herrmann SD et al., "2011 Compendium of
Physical Activities", _Medicine and Science in Sports and Exercise_ 43(8), 2011,
1575–1581; and Herrmann SD, Willis EA, Ainsworth BE et al., "2024 Adult
Compendium of Physical Activities", _Journal of Sport and Health Science_ 13(1),
2024, 6–12.

The two forms differ by about 5%; both are shown with the difference explained.
The net figure is the honest one for "calories burned by this workout" — a 6 MET
hour adds five METs' worth over resting, not six.

---

## Macronutrients — `macros.ts`

| Value                                                                                         | Source                                                                                                                              |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 4 / 4 / 9 kcal per gram (protein / carbohydrate / fat)                                        | Atwater WO, Woods CD., _The chemical composition of American food materials_, USDA Office of Experiment Stations Bulletin 28, 1896. |
| Acceptable Macronutrient Distribution Ranges: protein 10–35%, fat 20–35%, carbohydrate 45–65% | Institute of Medicine, _Dietary Reference Intakes_, National Academies Press, 2005.                                                 |

No preset drops fat below 20% of energy, so no preset can generate a split
outside published guidance. Carbohydrate is floored at zero rather than allowed
to go negative, and the flooring is reported.

---

## Protein — `protein.ts`

| Level                       | g/kg      | Source                                                                                                                             |
| --------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| RDA baseline                | 0.8       | Institute of Medicine, _Dietary Reference Intakes_, 2005.                                                                          |
| Training populations        | 1.2–2.0   | Thomas DT, Erdman KA, Burke LM., _Journal of the Academy of Nutrition and Dietetics_ 116(3), 2016, 501–528.                        |
| Resistance-training plateau | ~1.6      | Morton RW et al., _British Journal of Sports Medicine_ 52(6), 2018, 376–384.                                                       |
| Training in a deficit       | up to 2.2 | Helms ER, Zinn C, Rowlands DS, Brown SR., _International Journal of Sport Nutrition and Exercise Metabolism_ 24(2), 2014, 127–138. |

**The distinction the page leads with:** the RDA is the amount that prevents
deficiency in most healthy adults, not the amount that is optimal for someone
training. Conflating those two is the most common error in protein advice.

---

## Water intake — `water.ts`

| Reference           | Value                                   | Source                                                                                                                                                            |
| ------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IOM total water AI  | 3.7 L/day men, 2.7 L/day women          | Institute of Medicine, _Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate_, National Academies Press, 2005.                           |
| EFSA total water AI | 2.5 L/day men, 2.0 L/day women          | EFSA Panel on Dietetic Products, Nutrition and Allergies, _EFSA Journal_ 8(3), 2010, 1459.                                                                        |
| Sweat replacement   | ~0.5 L/hour of exercise (range 0.3–2.4) | Sawka MN, Burke LM, Eichner ER et al., "ACSM position stand: Exercise and fluid replacement", _Medicine and Science in Sports and Exercise_ 39(2), 2007, 377–390. |

Roughly 20% of total water intake comes from food, per the IOM report; the page
converts total-water reference values to drinks-only figures on that basis.

**Two caveats carried on the page.** The "8 glasses a day" rule has no
identifiable source in the scientific literature. And the IOM report itself
states that the great majority of healthy people meet their needs by letting
thirst guide them — these are population reference values, not targets anyone
must hit.

Climate multipliers are directional, not derived: no published equation maps
ambient temperature to intake for the general public, and the page says so.

---

## Running pace — `pace.ts`

Pure arithmetic — pace is distance over time by definition, so there is no source
paper. Marathon (42,195 m) and half marathon (21,097.5 m) lengths are fixed by
World Athletics Competition Rule 55.

Everything is computed in metres and seconds internally and converted once at the
edges, so rounding cannot accumulate across a splits table. The partial final
segment of a race is flagged rather than dropped — a splits table that silently
omits the last 195 m of a marathon is wrong exactly where it matters.

---

## US Army body composition — `armybodyfat.ts`

**This is not the tape test, and that is deliberate.**

| Value       | Detail                                                |
| ----------- | ----------------------------------------------------- |
| Standard    | Waist-to-height ratio **< 0.55** (strictly less than) |
| Measurement | Waist at the navel ÷ standing height, both inches     |
| Precision   | Recorded to three decimal places                      |
| Adjustments | None — no age adjustment, no sex adjustment           |
| Frequency   | Twice per calendar year                               |
| Effective   | 7 July 2026                                           |

Source: **Army Directive 2026-13**, _Army Body Composition Program and
Standards_, Headquarters Department of the Army, effective 7 July 2026
(publication reference ARN47030). Corroborated by the Army Body Composition
Program FAQ and contemporaneous reporting in _Stars and Stripes_, 7 July 2026.

AD 2026-13 rescinded three things at once: the height and weight screening
tables, the circumference-based tape test, and every supplemental body fat method
(DXA, InBody, Bod Pod). It superseded Army Directive 2023-11, which had itself
replaced the older multi-site tape formula with a one-site abdominal measurement
from 8 June 2024.

**Why the rescinded formulas are not implemented.** Almost every "army body fat
calculator" online still computes the multi-site tape formula, which has been out
of use for over two years and rescinded outright for one. Shipping it would mean
producing a number the Army does not use and will not accept. Publishing figures
that cannot be sourced to a current authority is exactly what the build brief
forbids, and placing a historical number beside a live one invites the confusion
the page exists to resolve.

**A rounding subtlety, tested.** Because the ratio is recorded to three decimals
_and_ the inequality is strict, the passing ceiling is not 0.5495 — that records
as 0.550 and fails. Rounding is applied before comparison, so a raw ratio of
0.54996 correctly fails.

---

## Menstrual cycle dates — `cycle.ts`

**Not a published equation, and the page says so.** This is arithmetic in the
same sense pace is: there is no paper to cite for adding a number of days to a
date.

| Quantity          | Equation                                |
| ----------------- | --------------------------------------- |
| Next period start | last period start + cycle length        |
| nth period start  | last period start + (cycle length × n)  |
| Period end        | that period's start + period length − 1 |

What is published is the interval those figures sit in: Mihm M, Gangooly S,
Muttukrishna S., "The normal menstrual cycle in women", _Animal Reproduction
Science_ 124(3–4), 2011, 229–236. Adult cycles run roughly 21 to 35 days, with
28 the commonly quoted midpoint rather than a figure anyone is expected to hit.
The form accepts 20 to 45 days, wider at both ends, so that someone outside the
usual range gets an answer rather than a rejection.

**The one assumption, and it is a strong one.** Every future cycle is exactly as
long as the one entered. Cycle length varies from one cycle to the next in most
people, and because the projection multiplies the interval, the error multiplies
with it — the sixth date is roughly six times as uncertain as the first.
Projecting from an average of several recent cycles is better than projecting
from one.

Each date is projected from the original date rather than from the previous
projection, so rounding cannot accumulate across cycles. The end date counts the
first day: a three-day period starting on the 1st ends on the 3rd, not the 4th.

Dates enter and leave as `YYYY-MM-DD` and are UTC epoch days in between. The
same input worked out in Auckland and in Los Angeles has to give the same
calendar date, and local `Date` construction makes that untrue for several hours
a day. Dates that do not exist are rejected rather than rolled forward, because
`Date.UTC` turns 30 February into 2 March and would answer confidently for the
wrong day.

**What this deliberately does not compute.** No ovulation estimate, no fertile
window, no conception or due date. The site states on `/about/` and in
`llms.txt` that it does not publish those, and the arithmetic sitting unused in
a module would contradict that as loudly as a page would.

---

## Body type and frame size — `bodytype.ts`

| Quantity          | Form                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| Frame ratio       | height(cm) / wrist circumference(cm)                                                                  |
| Frame size, men   | small > 10.4; large < 9.6; medium in between                                                          |
| Frame size, women | small > 11.0; large < 10.1; medium in between                                                         |
| Build label       | small frame and BMI < 20 → ectomorph; large frame and BMI ≥ 27 → endomorph; anything else → mesomorph |

Cut-points as reproduced in Grant JP., _Handbook of Total Parenteral Nutrition_,
2nd ed., 1992, from the Metropolitan Life frame-size tables.

The direction inverts and is easy to get backwards: a **larger** ratio means a
slighter wrist for the height, which is the **small** frame.

**The label is a description, not a measurement.** The three names come from
Sheldon WH., _The Varieties of Human Physique_, 1940, whose claim that physique
predicts temperament was discredited; the photographic method it rested on is
better remembered as a scandal than as science. What survives in sports science
is the Heath-Carter anthropometric method — Heath B, Carter JEL., "A modified
somatotype method", _American Journal of Physical Anthropology_ 27(1), 1967,
57–74 — which needs skinfold calipers at four sites, two bone breadths and two
limb girths. **It is not implemented here**, because height, weight and a wrist
cannot produce it. Nothing in the module is named `somatotype`, since that would
imply the method this does not use.

**What the frame ratio is worth.** The wrist carries little muscle and almost no
fat, so its circumference tracks skeletal size and barely moves with weight —
which is what makes it usable at all. The cut-points are the weak part: they
come from mid-century insurance reference tables rather than a population study,
and the sex split reflects those reference groups rather than a difference in
how skeletons scale. Treat the boundaries as approximate.

Most people come out mesomorph, which is a fact about a three-category scheme
rather than about the population. Where frame size and BMI point in opposite
directions — a slight frame carrying a high BMI, or the reverse — the result is
flagged as mixed and says none of the three labels describes that person. A test
asserts that mixed and a non-mesomorph label can never both be true, since the
page would otherwise contradict itself.

---

## Display rounding — `rounding.ts`

Formulas return full precision. Rounding happens exactly once, at display.
Rounding mid-calculation and feeding the result into the next step compounds
error invisibly until a reference table disagrees with the calculator that
generated it.

Rounding is half-away-from-zero. JavaScript's `Math.round` rounds half _up_, so
`Math.round(-0.5)` is `-0` while `Math.round(0.5)` is `1` — asymmetric about
zero.

Number formatting goes through `Intl.NumberFormat` so decimal separators, digit
grouping and numbering systems follow the locale. Hard-coding a decimal point
would be wrong in most of the ten locales shipped.
