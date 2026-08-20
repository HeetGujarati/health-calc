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

---

## Phase 3 — SEO module

### 3.1 One component writes `<head>`, and nothing else may

**Decision:** `Seo.astro` is the only place head tags are emitted; pages pass a
`SeoMeta` object and never write their own.

The guarantees the brief asks for are only checkable if they have one shape to
check. With metadata centralised, "every page has exactly one canonical" and
"every noindex page has zero hreflang alternates" become properties of one
function rather than of 913 pages, and `audit:seo` can parse for them.

### 3.2 `noIndex` suppresses the sitemap entry and the hreflang alternates too

**Decision:** setting `noIndex` empties `alternates.languages` and removes the
page from the sitemap, in the metadata builder rather than at each call site.

A page excluded from the index must not be advertised as the translation to
serve for any locale, and must not sit in a file whose entire purpose is to ask
for crawling. Coupling all three to one flag makes them consistent by
construction. `/search/` is the case that exercises it.

### 3.3 `buildAggregateRating` ships, and emits nothing

**Decision:** implement, type and test it; wire it to emit only when real
on-page review data exists; ship with no reviews and therefore no output.

Rating markup with invented numbers is the most common route to a
spammy-structured-markup manual action, and the brief forbids fabrication
outright. Building it now and leaving it dark means enabling it later is a data
problem rather than a code problem. `SEO.md` documents the order of operations.

### 3.4 A hand-built sitemap instead of `@astrojs/sitemap`

**Decision:** generate the index and children from a page registry in
`src/lib/seo/pages.ts`.

Section 6.5 needs `xhtml:link` alternates for every locale of every URL, real
content-derived `lastmod`, and per-section priority. The integration cannot
express the first or the third. More importantly it derives `lastmod` from the
build, and a `lastmod` that moves on every build tells search engines every page
changed when none did — they learn to ignore it. The registry carries the real
content date next to the data that produces the page.

---

## Phase 4 — Design system

### 4.1 Boldness spent in exactly one place

**Decision:** a restrained palette and type scale everywhere, with the result
readout as the single deliberate exception.

The numeral is the product. Someone arrives to get a number; everything between
them and it is overhead. Spending the visual budget on the answer rather than on
a hero image is also what makes the calculator fit above the fold on a 360px
phone, which is a hard requirement rather than a preference.

### 4.2 Contrast ratios are recomputed by a test, not eyeballed

**Decision:** `contrast.test.ts` parses the real `tokens.css` and recomputes
every WCAG ratio.

A colour change that breaks contrast is invisible in review and obvious to
someone who cannot read the result. Parsing the actual stylesheet rather than a
copy of the values means the test cannot drift from what ships.

### 4.3 Logical CSS properties throughout

**Decision:** `ms`/`me`, `ps`/`pe`, `text-start`/`text-end`, `border-s`/`border-e`
rather than left and right.

Arabic was always in scope. Writing directional properties and fixing them later
means auditing every template; writing logical ones from the start means the RTL
build is a `dir` attribute. The Playwright overflow check on
`/ar/calculators/bmi/` is what proves it held.

---

## Phase 5 — Calculator pages

### 5.1 The ten required blocks are structural, not a checklist

**Decision:** every calculator page renders through `CalculatorLayout.astro`,
which emits the ten blocks in the required order from a `CalculatorDefinition`.

A calculator that omits its citation or its FAQ does not typecheck. The
alternative — remembering the checklist sixteen times, and again for every future
calculator — fails on the seventeenth.

### 5.2 Vanilla custom elements rather than a framework

**Decision:** the islands are plain classes extending `HTMLElement`.

The whole site's JavaScript budget is 35 KB gzipped. A framework runtime spends
most of that before any of the site's own logic exists. The islands are small
enough that a framework would add indirection rather than remove it, and
progressive enhancement is easier to guarantee when the server-rendered form is
the real form.

### 5.3 A real submit button, even though results are live

**Decision:** every calculator form has a working submit control.

WCAG technique H32 and html-validate both want one, but the real reason is that a
form with no submit control leaves keyboard and screen-reader users with no
explicit action to take, and many people expect to press something. The island
intercepts submit and recomputes rather than navigating.

---

## Phase 6 — Programmatic pages

### 6.1 MET values extracted from the Compendium PDF, not from memory

**Decision:** download the official 2024 Adult Compendium, parse it, and verify
all sixty codes and values programmatically.

An LLM summary of the paper disagreed with the primary source on code 16050 —
2.5 for truck driving in the PDF against 6.8 for an e-bike in the summary. The
PDF is the source of record and won. This is the concrete reason the brief's
"never invent data" rule needed a process rather than an intention.

### 6.2 Deterministic sentence variation, not randomness

**Decision:** FNV-1a over the slug picks one of at least four variants per slot.

Random selection would change the copy on every rebuild, which to a crawler looks
like a page that keeps rewriting itself. A hash gives byte-identical rebuilds and
different sentences per page — the two properties actually wanted. FNV-1a because
it is fully specified, so the same slug yields the same index on any machine, in
any runtime, forever.

### 6.3 Every variant must contain a per-page placeholder

**Decision:** enforced by test.

A variant with no placeholder renders byte-identical on every page that selects
it. With four variants across sixty pages that is fifteen verbatim duplicates —
precisely what the module exists to prevent.

---

## Phase 7 — Guides, hubs and search

### 7.1 The `SearchAction` is declared because search actually works

**Decision:** build a real client-side search over a prebuilt static index.

Declaring a `SearchAction` that does not function is a structured-data violation.
The index is fetched on demand, so it costs nothing on the 912 pages that are not
the search page and stays outside the sitewide JavaScript budget.

### 7.2 Search results are built with `createElement` and `textContent`

**Decision:** no `innerHTML`, enforced by ESLint rather than by discipline.

This is the one page that renders user input back to the reader. Everywhere else
the ban is prudent; here it is the difference between a search box and an XSS
sink.

---

## Phase 8 — Internationalisation

### 8.1 Flat message catalogs, not nested

**Decision:** `Record<MessageKey, string>` with dotted keys.

A nested catalog lets a locale drift structurally — an object where a string was
expected, an array one element short, a branch quietly missing — and `Record<>`
then cannot express the contract. Flat keys make every locale the same shape, so
`Record<keyof typeof en, string>` is complete and sufficient, and the compiler
rejects a locale the moment a key is missing or misspelled.

### 8.2 UI catalogs in TypeScript, content catalogs in JSON

**Decision:** two different formats on purpose.

UI strings are hand-written and benefit from compile-time key coverage, which
needs TypeScript. Content strings are derived from the data files and are pure
data: JSON merges cleanly, diffs one line per changed string, and can be handed
to a translator without them meeting a build system. The key space for the JSON
side is generated by `scripts/extract-i18n-keys.ts`, so it cannot drift from what
the pages ask for.

### 8.3 A missing content translation falls back to English rather than failing

**Decision:** `contentText` returns the English source when a key is absent;
`i18n-content.test.ts` gates identity strings and reports the rest as coverage.

A build that dies because one FAQ answer is untranslated helps nobody. A page
that shows one English paragraph is degraded but useful, and translation can land
incrementally. Titles, descriptions, headings and intros _are_ gated, because
those are what a cross-locale duplicate genuinely costs something.

### 8.4 The duplicate-title gate was wrong, and shipping ten locales proved it

**Decision:** compare titles within a locale, not globally; report cross-locale
collisions as a coverage figure.

The original check flagged `/es/calculators/bmi/` against `/calculators/bmi/` —
two pages that are hreflang alternates of each other and are supposed to share a
title where the phrase is genuinely the same in both languages. "Yoga" and
"Pilates" are not translated. Forcing them apart to satisfy a uniqueness check
would make both titles worse. What actually harms a site is two _different_ pages
in one language competing for one query, and that is now what the gate measures.

### 8.5 `toLowerCase()` on a noun is a spelling error in German

**Decision:** `nameInSentence()` lowercases only where the orthography wants it.

English copy reads "calories burned walking", so the activity name is lowercased
before interpolation. German capitalises every noun, and "radfahren" is simply
misspelled. Scripts without letter case are unaffected either way. The SEO
title-length check is what drew attention to the page.

### 8.6 Locale-specific meta titles, distinct from the H1

**Decision:** activity and lift pages carry a short `metaTitle` separate from
their heading.

A good H1 routinely exceeds the 60 characters a search result shows, and
translations run longer than English — six Spanish and French lift titles
overflowed. Truncating the heading reads worse than writing a title that fits, so
both exist.

### 8.7 The language switcher is a `<details>` element

**Decision:** no JavaScript in the one control most likely to be needed by
someone who landed on the wrong language.

`<details>` opens, closes and is keyboard-operable natively. It also lists only
locales where the current page genuinely exists, so it never offers a link that
404s — on an activity outside the priority thirty it renders nothing at all.

### 8.8 Latin fonts are preloaded only for Latin-script locales

**Decision:** Hindi, Japanese and Arabic pages skip the three font preloads.

Those pages fall back to the system stack for their scripts. Preloading 30 KB of
a face they barely use would spend bandwidth before first paint for nothing. The
`@font-face` declarations still apply to any Latin text on the page; they are
just fetched normally. The cost is recorded honestly on `/accessibility/`: those
pages do not match the Latin ones typographically.

### 8.9 A translation-provenance notice on non-English pages

**Decision:** a short line at the foot linking to the English original.

These translations were produced in one pass without native review. On a health
site, saying so is the honest thing to do, and it gives a reader who hits an
awkward phrase somewhere to go rather than doubting the number.

### 8.10 Thirty programmatic pages per locale, ranked by judgement and labelled

**Decision:** `src/data/programmatic-priority.ts`, with the reasoning in the file.

The brief asks for "the top 30 by search value". No keyword tool was consulted,
so the file says so in as many words and gives the grounds that do not require
one: head terms over long tail, universal activities over regional, base
movements over variants. Inventing volume figures to justify the ordering would
have been the fabrication the brief forbids. `SEO.md` documents how to replace it
with measured data once Search Console has impressions.

---

## Phase 9 — Sitemaps and metadata audit

### 9.1 `dist/locales.json` so audits do not keep their own locale list

**Decision:** emit the locale path segments as build metadata.

`audit-seo.mjs` needs to tell `/de/guides/` from `/guides/`. A hardcoded list in
the script would go stale the moment a locale is added, and the failure would be
silent: German pages would be treated as English and the duplicate check would
fire wrongly. Reading it from the build removes the possibility.

---

## Phase 10 — Security

### 10.1 CSP hashes computed from built output, not from source

**Decision:** `generate-headers.mjs` hashes the inline scripts in `dist`.

Hashing the source assumes Astro emits it unchanged. It usually does — and the
build that stops doing so would ship a CSP that blocks the theme script, in
production, silently. Hashing what actually shipped removes the assumption. The
script fails if more than four distinct inline scripts appear, which is the
number the design permits.

### 10.2 zod at build time only

**Decision:** content collections validate with zod; the client path uses
hand-written guards.

zod is about 12 KB gzipped against an 18 KB per-page budget, and it was doing two
`z.enum` calls in the URL parser. Array membership checks replaced them.
Build-time schema validation is where zod earns its size, and none of it reaches
the browser.

---

## Phase 11 — Legal and monetisation

### 11.1 Prose pages render from the catalog, in every locale including English

**Decision:** `ProseBlocks.astro` renders a declared list of blocks.

Seven hand-written `.astro` files per locale is seventy files that can diverge.
Declaring the pages as a block list means the ten versions render the same
headings in the same order, and the compiler already guarantees every key exists.
`OWNER PLACEHOLDER` callouts are styled distinctly so nobody ships a site with
"add your legal entity here" reading as body copy.

### 11.2 The 404 is English-only, at the root

**Decision:** one `/404.html`, no per-locale variants.

Static hosts serve one not-found document for every path. A per-locale 404 needs
host-level routing rules that Cloudflare Pages and Netlify express differently,
which would put host-specific configuration into `DEPLOY.md` for a page that is
`noindex` and excluded from every sitemap. It also passes
`availableLocales={[DEFAULT_LOCALE]}` so its language switcher does not offer
nine pages that were never built — a bug the link audit caught.

---

## Phase 12 — Performance, verification and release

### 12.1 linkinator removed; the link audit is ours

**Decision:** `scripts/audit-links.mjs` replaces it.

linkinator 8 printed "scanned 0 links" under `--silent`, and returned an empty
array under `--format json` once `--skip` was applied. The gate had been passing
without checking anything. The replacement additionally resolves fragment
targets: a link to a `#heading` now fails the build unless that id exists in the
target document. 41,172 internal links and 913 fragments, verified.

### 12.2 The JavaScript budget follows static imports

**Decision:** charge a page for what it actually loads, not for what its script
tags name.

Counting only the tags in the HTML would miss the bulk of the calculator bundle,
which arrives through an import. The audit walks the import graph from each entry
point and gzips at level 9, because that is what a browser downloads.

### 12.3 Lighthouse samples an RTL and a CJK locale

**Decision:** ten URLs, including `/ar/calculators/bmi/` and
`/ja/calculators/bmi/`.

Eight English URLs scoring 100 says nothing about the two locales most likely to
break: Arabic, where the whole layout mirrors, and Japanese, where the
self-hosted faces do not apply. Adding them immediately found a real defect — the
German breadcrumb read "Start", which is on Lighthouse's
non-descriptive-link-text list and scored that page 92 on SEO.

### 12.4 Vitest diff truncation disabled

**Decision:** `chaiConfig: { truncateThreshold: 0 }`.

A test that reports `expected [ 'a', …(5) ]` makes you re-run it to find out what
failed, which is exactly when you least want to. This cost real time while
building out the locale catalogs.

### 12.5 A description shared across locales fails the build; a shared title does not

**Decision:** `audit-seo.mjs` treats the two collisions differently.

Both used to be printed as one coverage figure, which was right while the
translation backlog existed and wrong the moment it closed. They are not the same
signal. A title is a few words, and a handful of genuine coincidences survive
full translation — "Privacy" is the same word in English and Italian, "Cookies"
in five Latin-script locales, "Buscar" in Spanish and Portuguese. Failing on
those would force worse titles to satisfy a check; ten remain and they are all
real.

A description is 50 to 157 characters of original prose. Two locales do not
arrive at the same one by coincidence, so a match means a page is shipping
English inside a translated shell — the exact defect the translation work
existed to remove, and one that is invisible in the rendered page unless you read
the language. It is now a named failure, `untranslated-description`, reporting
both pages and both locales. The count is 0 and the gate is what keeps it there.

### 12.6 Heading ids are rewritten to ASCII

**Decision:** a rehype plugin, `src/lib/markdown/ascii-heading-ids.mjs`, runs
after `rehypeHeadingIds`.

Astro slugs a heading by lower-casing it and keeping every letter, so the
translated guides produced ids like `qué-encontraron-los-estudios-de-validación`
and `検証研究が見いだしたこと`. Those are legal HTML5 — the spec allows any id
without whitespace — but they are not usable identifiers: `querySelector` and CSS
have to escape them, and a copied link percent-encodes into forty characters of
noise. html-validate flags them under `valid-id`.

An id is rewritten only when it is not already `[A-Za-z][A-Za-z0-9_-]*`, so no
English or Indonesian anchor moves. Latin scripts fold to ASCII, which is
lossless in practice for a fragment. Non-Latin scripts keep whatever ASCII the
heading contained — a Japanese heading about Katch-McArdle still anchors at
`katch-mcardle` — and fall back to the heading's ordinal when nothing survives.
`section-4` says less than the heading does, but it is stable across builds,
which is the property a fragment actually needs. The alternative, hand-writing an
`id` into 126 translated files, has no such guarantee.

Astro runs user rehype plugins before its own, so `rehypeHeadingIds` — the plugin
that assigns the ids being rewritten — has to be listed explicitly ahead of this
one or it sees nothing.

### 12.7 The dependency gate splits what ships from what builds

**Decision:** `scripts/audit-deps.mjs` replaces `npm audit --audit-level=high`.

The control section 12 asks for could never pass on this tree. Every high
advisory arrives through one dev dependency, `@lhci/cli`, and one of them — the
symlink path traversal in `extract-zip` — has no patched release at all; npm's
suggested remedy is `@lhci/cli@0.1.0`, from 2019. A gate that fails every build
for a reason nobody can act on is a gate everyone learns to ignore, which is
worse than not having one.

So the check splits along the line that matters. Anything in `dependencies` ends
up in the artifact or in the process that writes it, and is held to zero
advisories at any severity. Anything in `devDependencies` fails at high and above
too — CI holds a token — unless it is listed with a package, a reason and a
review date. Two are, both reached only through `@lhci/cli` and both absent from
the production tree.

An exception that no longer matches any advisory is itself a failure, so the list
cannot outlive the problem it describes: whoever upgrades `@lhci/cli` past this
is told to delete the entry rather than discovering it years later.

### 12.8 `astro check` runs through a wrapper that bounds the V8 heap

**Decision:** `npm run check` is `node scripts/check.mjs`, not `astro check`.

The Astro language service holds every `.astro`, `.ts` and content-collection
type in one process, peaking around 300 MB here — unremarkable, except that V8
sizes its young generation from total system RAM rather than free memory and will
try to grow new space 16 MB at a time. Near the commit limit that allocation
fails and Node aborts with `NewSpace::EnsureCurrentCapacity Allocation failed`,
which reads as "out of memory" at 300 MB of heap and sends you looking in
entirely the wrong place. Capping the semi-space keeps the growth steps small
enough to succeed.

A wrapper rather than a `NODE_OPTIONS=` prefix in the npm script because npm runs
scripts through `cmd.exe` on Windows, where that prefix is a syntax error and not
an assignment. An existing `NODE_OPTIONS` wins, so CI can override it without
editing the file.

### 12.9 sharp's cache and thread pool are turned off

**Decision:** `sharp.cache(false)` and `sharp.concurrency(1)` in
`generate-images.mjs`.

libvips sizes both for a machine doing bulk image work. This script writes ten
small PNGs, one at a time, immediately after a build that has just held 913 pages
in memory — so the pixel cache is never read twice and the extra threads only
compete for allocations. Turning both off costs nothing measurable here (232 ms
for ten images) and keeps the step inside the memory a modest CI runner has left
at the end of a build.

### 12.10 The e2e suite never reuses a server it did not start

**Decision:** `reuseExistingServer: false`, and the port is overridable with
`PORT`.

`reuseExistingServer: !process.env.CI` is the Playwright default and it is
unsafe on a developer machine. Playwright asks for the URL and treats a 200 as
proof of life; it cannot tell whose server answered. 4321 is Astro's default
port, so any Astro project left running on the machine owns it — and an
unrelated one was, during this phase. The suite adopted it, loaded a site that
serves its own `/` and 404s everything else, and reported 59 failures about
elements missing from pages it had never opened. Every one of them was a lie
about this repository.

That is the same failure as 12.1 wearing different clothes: a verification step
that reports on something other than what it claims to be checking. With reuse
off, an occupied port is a startup error naming the port. The cost is starting a
static server per run, which binds in under a second, against a class of failure
that reads as a real regression and is not.

`PORT` is threaded through to `scripts/serve.mjs` so the suite can still be run
beside something else deliberately, which is the legitimate case reuse was
covering.
