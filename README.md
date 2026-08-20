# Baseline

A static health and fitness calculator site. Sixteen calculators, eleven
reference charts, fourteen guides and 82 programmatic pages, in ten languages —
913 prerendered pages, no backend, no database, no third-party runtime requests.

Every calculator names the equation it uses, cites the paper it came from,
states what that equation assumes about the person it is applied to, and says
how accurate it is next to the alternatives. Where published equations disagree
— and for body fat and basal metabolic rate they disagree substantially — the
page shows the disagreement instead of hiding it behind one number.

## Quick start

```
npm ci
npm run dev      # http://localhost:4321
npm run gate     # everything CI runs, in order
```

Node 22.22.3 or newer. Several dependencies declare a floor above 22.18, and
`engines` enforces it.

## Scripts

| Script                    | What it does                                                    |
| ------------------------- | --------------------------------------------------------------- |
| `dev`                     | Astro dev server                                                |
| `build`                   | Static build, then generates OG images, icons and the manifest  |
| `preview`                 | Serves `dist`                                                   |
| `check`                   | `astro check` — TypeScript across `.ts` and `.astro`            |
| `lint`                    | ESLint, including the banned-API rules                          |
| `format` / `format:check` | Prettier                                                        |
| `test` / `test:coverage`  | Vitest, with a 95% floor on `src/lib/health/`                   |
| `test:e2e`                | Playwright, desktop and a 360px phone; `PORT` moves it off 4321 |
| `headers`                 | Regenerates `_headers` with CSP hashes from the built output    |
| `audit:html`              | html-validate, including WCAG rules                             |
| `audit:seo`               | Canonicals, duplicates, hreflang, JSON-LD, HowTo anchors        |
| `audit:budget`            | JavaScript budget, gzipped, following static imports            |
| `audit:links`             | Every internal link and fragment in `dist`                      |
| `audit:deps`              | Zero advisories in what ships; high and above in the dev tree   |
| `audit:lighthouse`        | Lighthouse CI over ten URLs                                     |
| `gate`                    | All of the above except e2e and Lighthouse, in CI order         |

## Layout

```
src/
  config/          locales.ts and site.ts — the two sources of truth
  lib/health/      pure formula modules, no dependencies, 99% covered
  lib/seo/         metadata, canonical URLs, hreflang, JSON-LD, sitemaps
  lib/i18n/        translator, route helpers, Intl formatting, guide lookup
  lib/content/     deterministic sentence variation
  lib/markdown/    rehype passes applied to guide MDX at build time
  i18n/ui/         ten typed UI catalogs, checked for key coverage by tsc
  i18n/content/    nine JSON content catalogs keyed off the data files
  i18n/templates/  per-locale sentence-variation variants
  data/            calculators, activities, lifts, distances, charts
  content/guides/  guide MDX, English at the root and translations per locale
  components/      Astro components; islands/ holds the vanilla TS elements
  pages/[...locale]/  every page; the rest param is undefined for English
scripts/           build-time audits and generators
docs               DEPLOY, SEO, CONTENT, DESIGN, FORMULAS, DECISIONS, SECURITY
```

## The two constraints everything else follows from

**No JavaScript is required to use the site.** The calculators are progressive
enhancement over server-rendered forms; every reference table is precomputed
into the HTML. With JavaScript off you lose live results and keep a complete
reference page. This is why the tables are real `<table>` elements rather than
canvas, and why the whole site fits in 13.5 KB of gzipped JavaScript against a
35 KB budget.

**Nothing you type leaves your device.** There is no server to send it to. That
rules out analytics, a contact form, and any third-party script — and it is
what makes the privacy policy short enough to be true.

## Verification

`npm run gate` is what CI runs. Current state on `main`:

- `astro check` — 0 errors, 0 warnings, 0 hints across 157 files
- ESLint and Prettier — clean
- 505 unit tests; `src/lib/health/` at 99.5% statements
- 94 Playwright tests across desktop and a 360px phone
- 913 pages built; 41,172 internal links and 913 fragments, zero broken
- SEO audit — all ten checks pass
- JavaScript — 13.5 KB sitewide, 14.0 KB worst page, against 35 / 18 KB
- Lighthouse — 100/100/100/100 on ten URLs including Arabic and Japanese

## Before it goes live

`DEPLOY.md` has the click-by-click. Four values need a real answer first, all
of them marked `OWNER PLACEHOLDER` in `src/config/site.ts`:

1. `contactEmail` — appears on the contact page, in the privacy policy, in the
   terms and in `security.txt`
2. `twitterHandle` — stays `null` until a real account exists; the Twitter card
   renders correctly without it
3. The legal entity name and address in the privacy policy and terms
4. `public/ads.txt` — a comment only, and AdSense will reject the site until a
   real publisher ID replaces it

## Licence

No licence has been chosen. Until one is, default copyright applies: the code
and prose here are the operator's, and the equations belong to the published
literature and are cited on the page that uses them.
