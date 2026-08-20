# SEO

What the site does, why, and what to do next. Written to be actionable rather
than exhaustive: everything here is either implemented and verifiable in the
build output, or a specific next step with a trigger.

---

## The architecture in one page

| Concern                 | Where it lives                                            | Gate that proves it       |
| ----------------------- | --------------------------------------------------------- | ------------------------- |
| Canonical URLs          | `src/lib/seo/urls.ts`                                     | `audit:seo` check 1       |
| Titles and descriptions | `src/lib/seo/metadata.ts`                                 | `audit:seo` checks 2, 3   |
| hreflang                | `getHreflangMap`, fed by `localesFor()`                   | `audit:seo` checks 4, 5   |
| JSON-LD                 | `src/lib/seo/schema.ts`, rendered by `JsonLd.astro`       | `audit:seo` checks 6, 7   |
| Sitemaps                | `src/pages/sitemap-index.xml.ts` and `sitemaps/[section]` | `audit:seo` check 5       |
| Internal links          | every page; `audit:links` walks all of them               | 41,172 links, zero broken |

One rule holds the whole thing together: **routing, sitemaps and hreflang all
call `localesFor()`**. There is exactly one answer to "does this page exist in
Japanese", so the three cannot disagree. The failure this prevents — advertising
a translation that 404s — is the most common way a multilingual site wastes its
crawl budget.

---

## Keyword to URL map

The top of each cluster, with the page that owns the intent. Nothing here claims
a search volume: no keyword tool was consulted, and inventing numbers would be
worse than having none. The ranking is by head-term breadth and commercial
intent, which is judgement, and is labelled as such.

### Core calculators

| Intent                                | URL                                  |
| ------------------------------------- | ------------------------------------ |
| bmi calculator                        | `/calculators/bmi/`                  |
| tdee calculator                       | `/calculators/tdee/`                 |
| calorie calculator, calorie deficit   | `/calculators/calorie/`              |
| bmr calculator, basal metabolic rate  | `/calculators/bmr/`                  |
| macro calculator, iifym               | `/calculators/macro/`                |
| body fat calculator, us navy body fat | `/calculators/body-fat/`             |
| protein calculator, protein per kg    | `/calculators/protein/`              |
| one rep max calculator, 1rm           | `/calculators/one-rep-max/`          |
| ideal weight calculator               | `/calculators/ideal-weight/`         |
| water intake calculator               | `/calculators/water-intake/`         |
| target heart rate, karvonen           | `/calculators/target-heart-rate/`    |
| running pace calculator               | `/calculators/running-pace/`         |
| lean body mass calculator             | `/calculators/lean-body-mass/`       |
| calories burned calculator            | `/calculators/calories-burned/`      |
| healthy weight range                  | `/calculators/healthy-weight-range/` |
| army body fat, army tape test         | `/calculators/army-body-fat/`        |

The army page is the one with a live news hook: the tape test was rescinded in
July 2026 and most competing pages still compute it. That page states the
current standard and says the tape test is gone, which is both correct and the
reason it is worth having.

### Programmatic clusters

| Pattern                      | Count | Example                     |
| ---------------------------- | ----- | --------------------------- |
| `calories burned {activity}` | 60    | `/calories-burned/walking/` |
| `{lift} one rep max`         | 12    | `/one-rep-max/bench-press/` |
| `{distance} pace calculator` | 10    | `/pace/marathon/`           |
| `{topic} chart`              | 11    | `/charts/bmi-chart/`        |

### Guides

Fourteen, at `/guides/{slug}/`. These target the explanatory queries the
calculators cannot answer inline — "why do BMR calculators disagree", "how
accurate is the navy method" — and they exist to be the page a calculator can
honestly link to rather than to rank on their own.

---

## Worked examples

### A calculator page

`/calculators/bmi/` carries, in order: the H1, a working calculator above the
fold at 360px, an answer-first sentence, the disclaimer, "How this is
calculated" with the formula visible and its source cited, a comparison of the
alternatives, a precomputed reference table, five to seven FAQs, six related
calculators and two guides, and a real last-reviewed date.

Its structured data is `SoftwareApplication`, `HowTo` whose step anchors all
resolve to real elements, `FAQPage` matching the visible FAQ, and
`BreadcrumbList` matching the visible breadcrumbs. All four are asserted by
`audit:seo`; a `HowToStep` pointing at a missing anchor fails the build.

### A programmatic page

`/calories-burned/walking/` gets its MET value and Compendium code from the
published source, renders a 6 × 6 weight-by-duration table into the HTML, and
compares against five related activities. Its prose is assembled from
parameterised templates selected by a hash of the slug, so no paragraph repeats
verbatim across the sixty pages, and two builds of the same page are
byte-identical.

### What is deliberately absent

`buildAggregateRating()` exists, is typed and is tested — and emits nothing.
Rating markup without real on-page reviews is the most common cause of a
spammy-structured-markup manual action. To turn it on you need genuine review
data displayed on the page, at which point the function takes it. Do not switch
it on before then.

---

## Locale expansion

Non-English locales ship the full core set — eighteen calculators, eleven
charts, fourteen guides, all the legal and policy pages — plus the thirty
highest-value programmatic pages. English ships all 82. That is 86 pages per
locale against 141 for English, 933 in total.

The list is `src/data/programmatic-priority.ts`, and it is editorial judgement,
documented as such in the file.

### When to expand

**Trigger: the locale's core pages are indexed and getting impressions.** Check
Search Console → Performance → filter by page containing `/es/`. If the
calculator pages are appearing for queries, the locale has established itself
and more pages will be crawled rather than ignored.

**Do not expand before that.** Adding 52 more thin translated pages to a locale
Google has not yet decided to trust is how a programmatic cluster gets filtered
instead of ranked.

### How to expand

One line in `src/config/site.ts`:

```ts
FULL_PROGRAMMATIC_LOCALES: ['es'],
```

Rebuild. Routing, sitemaps, hreflang, the hub listings and the language switcher
all follow, because they all read `localesFor()`. Nothing else changes.

### Replacing the priority list with real data

Once Search Console has enough impressions, export Performance → Pages filtered
to `/calories-burned/`, sort by impressions, and rewrite the arrays in
`programmatic-priority.ts`. Then the ranking is measured rather than judged, and
the comment at the top of that file should be updated to say so.

---

## Translation coverage

`npm run audit:seo` prints a line like:

```
Translation coverage: 10 title(s) shared across locales (coincidences), 0 description(s) shared (must be 0)
```

The two halves mean different things.

**Shared titles are not a failure.** Two pages that are hreflang alternates are
_supposed_ to share a title where the phrase is genuinely the same in both
languages. The ten remaining are exactly that: "Privacy" is the same word in
English and Italian, "Cookies" in five Latin-script locales, "Buscar" in Spanish
and Portuguese. Failing on those would force worse titles to satisfy a check.
Expect the number to move a little as titles are edited; a jump of dozens means
a locale stopped translating something, and that is worth looking into.

**Shared descriptions are a failure**, reported as `untranslated-description`
with both pages and both locales named. A description is 50 to 157 characters of
original prose, so two locales cannot arrive at the same one by accident — a
match means a page is shipping English inside a translated shell. The count is 0
and this gate is what keeps it there.

Duplicate titles **within** a locale are also a failure. That is where a
duplicate actually costs something — two different pages in one language
competing for one query.

Catalog coverage is gated separately, in `tests/unit/i18n-content.test.ts`, at
100%: a key added to a data file without a translation in all nine catalogs
fails the build. See `CONTENT.md`.

---

## Enabling ratings legitimately

If you ever want `AggregateRating` markup, the order matters:

1. Collect real reviews from real people, with a mechanism that ties each to a
   verifiable action.
2. Display them on the page, visible to a reader, not only in markup.
3. Only then pass the real count and average to `buildAggregateRating()`.

Google's structured data policy requires the rating to be about the specific
item, visible on the page, and sourced from genuine users. A calculator is a
`SoftwareApplication`, which is eligible — but the eligibility does not survive
invented data, and a manual action costs more than the rich result is worth.

---

## Things that would help, in rough order

1. **Get a native speaker over each locale.** Translation coverage is complete —
   all fourteen guides in all ten languages, and every catalog string with it —
   but none of it has had native review, and that is now the largest quality gap
   in the non-English pages. Prioritise by traffic once Search Console has it.
2. **Get the domain into Search Console** and watch the hreflang report.
3. **Build external links to the guides, not the calculators.** Calculator pages
   attract few natural links; an explanation of why BMR equations disagree
   attracts some.
4. **Revisit the army page when the standard next changes.** It is the page most
   likely to go stale and the one where staleness is most visible.
5. **Leave `changefreq` and `priority` alone.** They are set per section from
   the brief's table. Google largely ignores both; they are there because the
   sitemap spec includes them, not because they do anything.
