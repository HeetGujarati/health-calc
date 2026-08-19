# Decisions

Every material decision taken while building this site, with the reasoning that
produced it. Ordered by the phase in which it was made.

Ranking used whenever a call was ambiguous, per the build brief: **organic
search traffic, then correctness, then security** — except where a safety rule
in the brief's section 4.3 applies, which overrides all three.

---

## Phase 1 — Scaffold and tooling

### 1.1 Astro 7.2.4 instead of the specified Astro 5.x

**Decision:** build on Astro 7.2.4.

The brief's section 3 says "Astro 5.x — use exactly this". That table was written
when 5.x was the current major; 7.2.4 is current as of this build, and 5.18.2 is
two majors behind. For a site that is meant to ship and then sit largely
untouched, running the current major is the difference between receiving security
patches on the default support line and not.

Verified against the v7 upgrade guide before committing to it: `output: 'static'`,
content collections, `i18n.routing.prefixDefaultLocale` and `src/pages/*.ts`
endpoints are all unchanged from 5.x, so the architecture in the brief's sections
5, 6.5 and 8 ports across without redesign.

Confirmed with the owner before any code was written.

### 1.2 TypeScript pinned to 5.9.3, not the current 7.0.2

**Decision:** TypeScript 5.9.3.

Not a preference. `@astrojs/check@0.9.10` declares `peerDependencies:
{ typescript: '^5.0.0 || ^6.0.0' }`. TypeScript 7 would break `astro check`,
which the brief's Definition of Done item 2 requires to report zero errors.
The dependency graph decides this one.

### 1.3 `eslint-plugin-jsx-a11y` dropped

**Decision:** ship without it; get accessibility coverage from html-validate,
axe-core under Playwright, and the Lighthouse accessibility threshold.

`eslint-plugin-jsx-a11y@6.10.2` is the latest published version and declares
`peerDependencies: { eslint: '^3 || ... || ^9' }`. `eslint-plugin-astro@3.1.0`
requires `eslint >= 10`. The two cannot coexist, and no jsx-a11y release
supporting ESLint 10 exists yet.

Installing with `--force` or `--legacy-peer-deps` was rejected: it produces a
dependency tree npm has explicitly flagged as incorrect, which conflicts with
the supply-chain requirements in section 11.

The loss is smaller than it looks. jsx-a11y lints **JSX**; this codebase has no
JSX, because the brief bans React. Its rules would have inspected almost nothing.
Accessibility is instead enforced where it is actually observable — on rendered
HTML — by three gates the brief already requires: html-validate over every built
page, axe-core assertions in the Playwright suite, and Lighthouse Accessibility
held at ≥95. `eslint-plugin-astro`'s own rules are unaffected and remain enabled.

Revisit when jsx-a11y publishes ESLint 10 support.

### 1.4 Type-aware linting scoped to `.ts`, not `.astro`

**Decision:** `projectService` applies to `**/*.ts`; `.astro` files get
`eslint-plugin-astro`'s non-type-aware rules, and are type-checked by
`astro check` instead.

`astro-eslint-parser` does not support `projectService` and silently degrades to
`project: true`, printing a warning on every file, every run. Since `astro check`
already performs real type checking on `.astro` frontmatter — and understands the
component model better than the ESLint parser does — pointing type-aware ESLint
rules at `.astro` bought duplicate coverage in exchange for permanent warning
noise. The Definition of Done requires a clean, zero-warning gate.

### 1.5 Local Node is below the dependency tree's floor

**Decision:** proceed on Node v22.18.0; declare the true floor in
`package.json`'s `engines`; pin CI to current 22 LTS.

Four packages request a higher Node than this machine runs:
`eslint-plugin-astro@3.1.0` and `astro-eslint-parser@3.1.0` want
`^22.22.3 || ^24.16.0 || >=26.3.0`, `html-validate@11.8.0` wants
`^22.22.0 || >=24.8.0`, and `undici@8.10.0` wants `>=22.19.0`.

All four were verified to run correctly on 22.18.0 — `html-validate` and `eslint`
both execute and produce correct results, and the full gate passes. The warnings
appear only during `npm install`, not during build, lint, check or test, so
Definition of Done item 1 (a clean `npm run build`) is unaffected.

`engines.node` is set to `>=22.22.3` because that is what the tree honestly
requires, and CI runs current 22 LTS so the pipeline is warning-free.

**Owner action, optional:** upgrading local Node to 22.22.3 or newer silences the
install warnings. Nothing depends on it.

### 1.6 No `@astrojs/sitemap`

**Decision:** hand-build the sitemap index.

Section 6.5 requires `xhtml:link` alternates for every locale of every URL, real
content-derived `lastmod` values (explicitly _not_ `new Date()` at build time),
per-section priority and changefreq, and suppression of `noIndex` pages. The
integration cannot express that combination. Writing the endpoints directly is
both smaller and exactly controllable.

### 1.7 `pt-BR` ships at `/pt-br/`

**Decision:** lowercase path segment, correctly-cased BCP-47 code.

Astro's locale config separates `path` from `codes`, so the URL is `/pt-br/`
while `hreflang="pt-BR"` and `og:locale=pt_BR` keep their canonical casing. Mixed
case in URLs invites duplicate-URL problems on case-sensitive origins; the
language tag in markup must stay correctly cased for hreflang to be valid.

### 1.8 `PUBLIC_SITE_URL` fallback

**Decision:** fall back to `https://fitness-calculators.pages.dev`.

Absolute canonicals, OG image URLs and sitemap entries all need an origin at
build time. Falling back to a placeholder domain nobody controls would emit
canonicals pointing somewhere real and wrong, which is worse than any build
failure. The Cloudflare Pages project subdomain is where the site genuinely
resolves before a custom domain is attached, so an unset variable still yields
correct, working URLs. `DEPLOY.md` lists setting this as a required step.

### 1.9 Secret scanning is unavailable; gitleaks covers the gap

**Decision:** rely on a gitleaks CI step for secret detection, and record the
GitHub-side limitation rather than pretending it is configured.

`PATCH /repos/HITMAN5050/Health` with `secret_scanning` returns HTTP 422,
_"Secret scanning is not available for this repository."_ On a **private** repo,
GitHub gates secret scanning and push protection behind GitHub Advanced Security.
The brief requires the repository stay private (section 17), so this is not a
trade that can be made — privacy wins, and the feature is simply not reachable
on this plan.

What **was** enabled successfully, via `gh api`:

- Dependabot vulnerability alerts (`PUT /vulnerability-alerts`)
- Dependabot automated security fixes (`PUT /automated-security-fixes`)
- Weekly Dependabot update schedules for npm and GitHub Actions (`.github/dependabot.yml`)

The compensating control is a gitleaks scan in CI (added in phase 10), which
catches committed secrets on every push without needing Advanced Security.
Push protection — which blocks a secret _before_ it lands — has no free
equivalent; `DEPLOY.md` lists it under "Manual repo settings" as something the
owner can enable by making the repo public or purchasing GHAS. Neither is
recommended, and nothing in the build depends on it.

---

## Phase 1 — verified Astro 7 behaviour

Smoke-tested before anything was built on top, because the brief's architecture
assumes Astro 5 semantics. Results:

| Question                                                                   | Result                                                                                                                               |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Does `.mdx` route through MDX or Sätteri once `@astrojs/mdx` is installed? | **MDX.** An imported `.astro` component rendered correctly inside an `.mdx` page.                                                    |
| Are heading `id` anchors still generated?                                  | **Yes.** `## How this is calculated` emitted `<h2 id="how-this-is-calculated">`. The `HowTo` structured data in 6.4 depends on this. |
| Does `compressHTML: 'jsx'` (new v7 default) emit valid HTML?               | **Yes.** html-validate reports zero errors against the built output.                                                                 |
| Does `inlineStylesheets: 'never'` keep CSS external?                       | **Yes.** Emitted as `<link rel="stylesheet">`, so the CSP needs no style hashes.                                                     |
| Do `.ts` endpoints emit non-HTML under `output: 'static'`?                 | **Yes.** Content type honoured. robots.txt, llms.txt and all sitemaps depend on this.                                                |
| Does Tailwind v4 work via `@tailwindcss/vite`?                             | **Yes.** Utilities generated.                                                                                                        |

**Caught by the smoke test:** MDX frontmatter is _not_ spread as props onto a
layout — it arrives as `Astro.props.frontmatter`. A layout destructuring
`Astro.props.title` silently receives `undefined` and falls back to its default,
which would have produced wrong `<title>` tags on guide pages without any error.
Guides use content collections with explicit prop passing, so this is avoided by
construction, but it is recorded here because the failure mode is silent.

---

## Phase 2 — Health formula library

### 2.1 The Army calculator computes waist-to-height ratio, not the tape test

**Decision:** implement the current standard; do not implement the rescinded
tape formulas at all.

The brief's section 4.1 asks for the "Current US Army AR 600-9 tape method, male
and female". Researched before writing any code, per the plan's flagged research
item — and the method no longer exists.

**Army Directive 2026-13**, effective **7 July 2026**, six weeks before this
build, rescinded three things at once: the height and weight screening tables,
the circumference-based tape test, and every supplemental body fat method (DXA,
InBody, Bod Pod). It replaced all of them with waist-to-height ratio as the
Army's sole body composition assessment: waist at the navel divided by height,
passing at **less than, but not equal to, 0.55**, recorded to three decimal
places, with no age adjustment and no sex adjustment.

That directive superseded Army Directive 2023-11, which had itself replaced the
older multi-site tape formula with a one-site abdominal measurement from
8 June 2024. So the multi-site formula that virtually every "army body fat
calculator" online still computes has been out of use for over two years and
rescinded outright for one.

Sourcing: the first search results were SEO calculator farms, which are not
acceptable for a YMYL claim. Verified instead against Army publications
(ARN47030) and corroborated by _Stars and Stripes_, 7 July 2026, which
independently reports the directive number, effective date and 0.55 threshold.
Direct fetches to army.mil hosts failed with DNS errors from the build
environment; the citation is to the directive itself, corroborated across
independent sources.

**Why the rescinded formulas are not implemented at all.** Shipping the tape
method would produce a number the Army does not use and will not accept, which
rule 3 of the autonomy contract forbids. Placing a historical figure beside a
live one invites exactly the confusion the page exists to resolve. The page
instead explains what changed and when — which is the genuinely useful answer for
someone searching "army tape test calculator", and content no competitor
currently has.

This is a search opportunity rather than a compromise: the query has steady
volume and the incumbent results are all wrong.

### 2.2 TDEE activity multipliers are labelled a convention, not attributed to a paper

**Decision:** implement the conventional 1.2 / 1.375 / 1.55 / 1.725 / 1.9 set,
state plainly that it has no single published origin, and cite the real PAL
frameworks alongside it.

Researching a citation for these multipliers turned up only calculator sites
attributing them vaguely to "PAL research", or worse, to Harris-Benedict and
Mifflin-St Jeor — papers that do not contain them. Citing a paper that does not
support a number is fabrication, which rule 3 forbids.

What is published and is cited instead: the **IOM 2005** PAL categories from
doubly labelled water data (sedentary >= 1.0 < 1.4, low active >= 1.4 < 1.6,
active >= 1.6 < 1.9, very active >= 1.9 < 2.5), and the **FAO/WHO/UNU 2004**
lifestyle PAL bands. Each conventional multiplier is tagged with the IOM band it
falls in, and a unit test asserts those tags stay truthful.

This also surfaces a real discrepancy rather than hiding it: the conventional
"sedentary" 1.2 sits inside the IOM sedentary band but below the FAO floor of
1.40. That contradiction is page content, and it is the substance of one of the
14 guides the brief asks for.

### 2.3 Errors are returned, not thrown

**Decision:** every parse and guard returns a `Result<T>` discriminated union.

The brief requires hostile input to be "rejected cleanly with a helpful message,
never producing a number". A Result makes that the only reachable path: there is
no value to read without first narrowing on `ok`, so a caller cannot accidentally
render a number that was never computed. Thrown exceptions would depend on every
call site remembering a try/catch.

Adjustment notes and refusals are returned as identifiers with parameters rather
than English prose, so the same result renders correctly in all ten locales
without English leaking into a translated page.

### 2.4 Two defects found by writing the tests

Recorded because both were silent failures that no formula-level test would have
caught.

**`bmiCategory` mislabelled non-finite input.** The original table walk returned
the highest band as a fallback, so a NaN BMI — from a division by zero — would be
reported as the most severe category. Worse, the behaviour was asymmetric:
+Infinity fell outside `[40, Infinity)` and returned null, while -Infinity
satisfied `[-Infinity, 18.5)` and returned underweight. Now guarded explicitly on
`Number.isFinite`, giving one rule: finite input classifies, non-finite does not.

**`maxWaistForStandard` returned a failing waist.** The Army standard is recorded
to three decimals _and_ is a strict inequality, so the passing ceiling is not
height x 0.5495 — that records as 0.550 and fails. The function returned a waist
that failed the very standard it was describing. Now floored to a tenth of a
centimetre and verified, with a test that feeds every returned value back through
the assessment.

### 2.5 A typed lookup helper instead of non-null assertions

**Decision:** `indexById` in `lookup.ts`, replacing five `Map.get(id)!` sites.

Several modules keep an ordered array as the source of truth, because the order
is the order options appear in the UI, while also needing keyed access. A `Map`
forces a non-null assertion at every call site even though the key type
guarantees a hit — and those assertions are exactly what survives a refactor that
makes them false. The mapped return type makes the lookup total, containing the
single unavoidable cast inside one helper.
