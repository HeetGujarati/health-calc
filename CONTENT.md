# Content

Where every string on the site comes from, and how to change one.

---

## The four places content lives

| Kind                                                | Where                                    | Translated via                      |
| --------------------------------------------------- | ---------------------------------------- | ----------------------------------- |
| UI chrome, legal and policy prose                   | `src/i18n/ui/{locale}.ts`                | Typed catalogs, checked by `tsc`    |
| Calculator, chart, activity, lift and distance copy | `src/data/**` (English)                  | `src/i18n/content/{locale}.json`    |
| Programmatic page prose                             | `src/lib/content/templates.ts` (English) | `src/i18n/templates/{locale}.ts`    |
| Guides                                              | `src/content/guides/*.mdx`               | `src/content/guides/{locale}/*.mdx` |

English is never duplicated into a catalog. For UI strings English _is_ the
catalog; for everything else English lives in the data files and the catalogs
hold overrides. A missing override falls back to English, so a partially
translated locale degrades to a working page with an English paragraph rather
than to a 404.

---

## Changing a UI string

Edit `src/i18n/ui/en.ts`. If you add a key, `tsc` immediately fails the other
nine catalogs until they have it too — that is the point, and it is why they are
TypeScript rather than JSON.

Two things `tsc` cannot see are covered by `tests/unit/i18n.test.ts`:

- **Placeholders must survive translation.** A dropped `{count}` silently
  renders " results for" and nothing complains.
- **No value may equal its English source** unless it is a genuine loanword.
  The exemptions are enumerated with the reason — "Imperial" and "Legal" in
  Spanish, "Questions" and "Source" in French, "Privacy" and "Home" as ordinary
  Italian, "Cookies" across the Latin-script locales, "kcal / 30 min" as unit
  notation. Adding an exemption is a decision on the record; leaving a string
  untranslated is a test failure.

---

## Changing calculator or chart copy

The English source is a `CalculatorDefinition` in
`src/data/calculators/definitions/`. Edit it there.

To see what the translations owe:

```
npx vite-node scripts/extract-i18n-keys.ts -- keys.json
```

That writes every translatable key with its English value — 1,047 of them,
derived from the data files rather than maintained by hand, so the list cannot
drift from what the pages actually ask for.

Then add the keys to `src/i18n/content/{locale}.json` and run:

```
npx vitest run tests/unit/i18n-content.test.ts
```

which fails on a key no page needs (a typo, or a leftover from deleted content)
and on any missing title, description, heading, intro or keyword set. Body prose
is tracked by a coverage percentage rather than gated, so translation can land
incrementally without ever breaking a build.

### What is deliberately not translated

- **Formula names.** "Mifflin-St Jeor", "Katch-McArdle", "US Navy" are proper
  nouns and are cited that way in every language's literature.
- **Citations.** A reference points at a specific English-language paper;
  translating its title makes it unfindable.
- **Equation expressions, MET values, Compendium codes, numeric table cells.**
- **The Compendium's own activity descriptions.** These are quoted verbatim as
  the evidence for a MET value, and a translated quotation is no longer
  checkable against the source. They are marked `lang="en"` so a screen reader
  switches voice.

Strings that are genuinely identical across languages — cited formula names,
metric distances — are listed explicitly as identical in the translation
payloads rather than left blank, so "no translation needed" is a decision on the
record instead of a gap that looks like one.

---

## Programmatic page prose

Sixty activity pages sharing one paragraph would be sixty near-duplicates. They
do not, because `src/lib/content/templates.ts` selects one of at least four
variants per slot from an FNV-1a hash of the slug. Two builds of the same page
are byte-identical; two different pages get different sentences.

That property has to survive translation, so `src/i18n/templates/{locale}.ts`
supplies the same number of variants per slot, and every variant carries at
least one per-page placeholder. A locale shipping three variants where English
has four would produce more duplicates in that language than in English, which
is exactly where duplicate-content filtering bites.

`tests/unit/templates.test.ts` asserts no paragraph repeats verbatim across the
corpus.

---

## Guides

English guides are `src/content/guides/{slug}.mdx`. Translations are
`src/content/guides/{locale}/{slug}.mdx` — same slug, same frontmatter schema,
same zod validation. A guide missing its description or its dates fails the
build whatever language it is in.

A locale with no translation of a guide falls back to the English entry rather
than dropping the page, because the guide is linked from calculator pages in
every locale and a missing translation should degrade to English prose, not to a 404.

### Writing one

Frontmatter, all required unless noted:

```yaml
title: 10 to 80 characters
metaTitle: 10 to 49 characters (optional; use when the H1 is too long for a SERP)
description: 50 to 157 characters
keywords: 1 to 8 strings
published: YYYY-MM-DD
updated: YYYY-MM-DD
relatedCalculators: 1 to 6 calculator slugs
relatedGuides: up to 3 guide slugs (optional)
readingMinutes: 3 to 12
```

Body rules:

- **1,000 to 1,600 words.** Shorter does not answer the question; longer is
  padding.
- **No styling vocabulary in the markdown.** Prose styling is applied by
  descendant selectors in the layout, which is what keeps the files translatable.
- **Cite what you assert.** A claim about an equation's error margin needs the
  paper it came from, named in the text.
- **Say what you do not know.** "No published distribution covers this" is a
  legitimate sentence and appears more than once on the site.

Then update `src/data/guides/titles.ts` if the title changed, and run
`npm run gate`.

---

## The eight content rules, enforced in code

These are section 4.3 of the brief, implemented in `src/lib/health/guards.ts`
and covered by tests. They are not editorial guidance; a calculator cannot
violate them.

1. Calorie targets floor at 1,500 kcal for men and 1,200 for women.
2. Deficits cap at the lesser of 25% of maintenance or 1,000 kcal per day.
3. No plan is produced toward a goal weight below a BMI of 18.5, and the page
   says why rather than silently refusing.
4. No calorie or body-fat output for anyone under 18.
5. Categories are named as the published standard names them — never "good",
   "bad", "ideal" or "needs fixing".
6. No extreme protocols. `EXTREME_PROTOCOL_PATTERNS` fails the build on copy
   that describes one.
7. Every calculator page carries the disclaimer in the results area, above the
   fold.
8. No invented author, medical reviewer, rating or review count.
   `FABRICATED_CREDENTIAL_PATTERNS` fails the build on copy that adds one.

`findContentPolicyViolations()` runs these patterns over the copy. Rule 8 is
why `Article` and `Organization` schema attribute to the organisation: there is
no author to name, and naming one would be a lie.

---

## Translation provenance

Non-English pages carry a short notice at the foot linking to the English
original. These translations were produced in one pass and have not been
reviewed by a native speaker of each language. Saying so on a health site is the
honest thing to do, and it gives a reader who hits an awkward phrase somewhere
to go rather than doubting the number.

Remove the notice when a locale has had a native review — it is one key,
`translation.notice`, and one component, `TranslationNotice.astro`.

---

## Advertising, if it is ever enabled

The code exists and renders nothing. `PUBLIC_ADS_ENABLED` defaults to false; the
slots reserve their dimensions so switching them on cannot shift layout or hurt
CLS.

Before enabling:

1. Fill `public/ads.txt` with a real publisher ID. AdSense rejects the site
   without it.
2. Update `/cookies/` and `/privacy/` **first**. Both currently say no cookies
   are set, which would stop being true.
3. For EEA and UK traffic, Google requires a certified Consent Management
   Platform. The banner in `ConsentBanner.astro` is a mechanism for the
   non-EEA case and a placeholder for where a certified CMP mounts. It is not
   one, and `SECURITY.md` says so.
4. Keep refusing to advertise anything the site's own content policy would not
   endorse. A page that caps a calorie deficit at 25% and then carries an ad for
   a 900 kcal meal plan has undone its own guard.
