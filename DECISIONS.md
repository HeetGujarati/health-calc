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
