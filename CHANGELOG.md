# Changelog

Notable changes to this site. Dates are the date the work landed on `main`.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project uses [semantic versioning](https://semver.org/spec/v2.0.0.html)
— for a website, that means the major version changes when URLs change, the
minor when pages or calculators are added, and the patch for fixes and content
corrections.

## [1.0.0] — 2026-08-20

First release. 913 prerendered pages across ten locales.

### Added

**Calculators.** Sixteen, each built on a published equation with its source
cited on the page, the formula visible, its assumptions stated and its accuracy
named against the alternatives: BMI, body fat, lean body mass, army body
composition, BMR, TDEE, calorie target, macros, protein, water intake, one rep
max, calories burned, target heart rate, running pace, ideal weight and healthy
weight range.

**Programmatic pages.** 60 calories-burned pages, one per activity, each with
its MET value and five-digit code taken from the 2024 Adult Compendium; 12 one
rep max pages, one per lift; 10 pace pages, one per race distance.

**Reference charts.** Eleven, each computed from the same functions as the
calculator it belongs to, so the two cannot disagree. All are real rendered
tables with an explanation of how to read them, never an image.

**Guides.** Fourteen original articles, 1,000 to 1,600 words, on where the
equations come from and how much confidence they deserve — each translated into
all nine other locales, 140 files in total.

**Ten locales.** English at the root, plus Spanish, Brazilian Portuguese,
French, German, Italian, Hindi, Indonesian, Japanese and Arabic. Arabic is
right-to-left. Every locale gets all sixteen calculators, all eleven charts, all
fourteen guides, every core and legal page, and the thirty highest-value
programmatic pages. Nothing falls back to English: every title, description,
heading, FAQ answer, form field, reference table and guide body is written in
the language of the page it appears on.

**Search.** A real client-side search over a per-locale static index, which is
why the homepage can honestly declare a `SearchAction`.

**Safety guards, in code.** Calorie floors of 1,500 and 1,200 kcal; deficits
capped at the lesser of 25% of maintenance or 1,000 kcal; no plan toward a goal
weight below a BMI of 18.5; no calorie or body-fat output under 18; neutral
category naming; no extreme protocols; a disclaimer above the fold on every
calculator; and no invented author, reviewer or rating anywhere.

**Security.** A strict CSP with no `unsafe-inline` and no `unsafe-eval`, its
hashes computed from the built output. HSTS, `nosniff`, `Referrer-Policy`,
`Permissions-Policy`, COOP, CORP and `X-Frame-Options: DENY`. ESLint fails the
build on `eval`, `new Function`, string `setTimeout`, `innerHTML`, `outerHTML`,
`insertAdjacentHTML` and `set:html`. All GitHub Actions pinned to full commit
SHAs.

**Verification.** 505 unit tests with a 95% floor on the formula library
(currently 99.5%); 94 Playwright tests across desktop and a 360px phone; and
gates for HTML validity, SEO output, internal links and fragments, the
JavaScript budget, and Lighthouse.

### Known limitations

- **Translations have not had native review.** They were produced in one pass.
  Non-English pages say so and link to the English original. This is now the
  only outstanding translation concern: coverage itself is complete, and both
  the content catalogs and the SEO audit fail the build if it regresses.
- **The three self-hosted typefaces cover Latin scripts only.** Hindi, Japanese
  and Arabic pages fall back to the system stack, which renders correctly but
  does not match the Latin pages typographically. Recorded on `/accessibility/`.
- **Four owner placeholders remain**, listed in `DEPLOY.md`: contact email,
  legal entity and address, Twitter handle, and `ads.txt`.

### Measured at release

|                          |                                                        |
| ------------------------ | ------------------------------------------------------ |
| Pages                    | 913 — 139 English, 86 in each of nine other locales    |
| Internal links verified  | 41,172, plus 913 fragments; zero broken                |
| JavaScript, gzipped      | 13.5 KB sitewide of 35 KB; 14.0 KB worst page of 18 KB |
| Lighthouse               | 100 / 100 / 100 / 100 across ten URLs, three runs each |
| `astro check`            | 0 errors, 0 warnings, 0 hints across 162 files         |
| Formula library coverage | 99.6% statements, 99.4% branches                       |

[1.0.0]: https://github.com/HITMAN5050/Health/releases/tag/v1.0.0
