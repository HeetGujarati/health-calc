# Design

The brief asks for something that feels like a precise, calm instrument — not a
fitness brand, not a landing page. Two audiences share the page: someone who
wants one number, fast, on a phone, and lifters and runners who will return to
the same reference table repeatedly. Both are served by the same thing: get out
of the way, then show the number clearly.

Every value below is justified against that. Nothing here is decorative by
default.

---

## What this deliberately is not

The brief names two ditches, and both are worth stating explicitly because they
are the paths of least resistance.

**The default AI look** — cream and terracotta, near-black with acid green, a
gradient hero. Avoided. The palette is a cool neutral, and there is no hero.

**The fitness-industry look** — neon on black, red and orange urgency,
photographs of muscle. Avoided. There is no photography anywhere on the site,
no colour that signals urgency, and no motivational copy. Red in particular is
never used: a red number next to someone's body measurement reads as a verdict,
and section 4.3 rule 5 rules that out.

A third thing it is not: a dashboard. Data-dense chrome, cards with drop
shadows, sparklines in the corner. The pages have one job each.

---

## Colour

Six named values, each with a light and dark form, plus two structural
variants that WCAG requires (see below).

### Light

| Token      | Hex       | Role                                                 |
| ---------- | --------- | ---------------------------------------------------- |
| `paper`    | `#f6f7f8` | Page surface. Cool-neutral off-white, not cream.     |
| `raised`   | `#ffffff` | Result panel and cards, lifted off the page surface. |
| `ink`      | `#14161a` | Primary text.                                        |
| `graphite` | `#5b6472` | Secondary text, captions, table labels.              |
| `rule`     | `#dfe3e8` | Decorative dividers and table rules.                 |
| `edge`     | `#78838f` | Input and control borders.                           |
| `signal`   | `#0e6f83` | The accent. Results, links, focus.                   |
| `caution`  | `#7a5a10` | Safety notes, when a guard has adjusted a number.    |

### Dark

| Token      | Hex       | Role                    |
| ---------- | --------- | ----------------------- |
| `paper`    | `#15171b` | Page surface.           |
| `raised`   | `#1e2126` | Result panel and cards. |
| `ink`      | `#e9ecef` | Primary text.           |
| `graphite` | `#98a2b0` | Secondary text.         |
| `rule`     | `#2b2f36` | Dividers.               |
| `edge`     | `#68707e` | Control borders.        |
| `signal`   | `#5fd0e6` | Accent.                 |
| `caution`  | `#e0b64a` | Safety notes.           |

### Measured contrast

Chosen by computing ratios, not by eye. Every pairing that carries text clears
WCAG AA's 4.5:1, and a test in the suite recomputes these so a future tweak
cannot quietly break one.

| Pair                  | Light | Dark  |
| --------------------- | ----- | ----- |
| `ink` on `paper`      | 16.89 | 15.13 |
| `graphite` on `paper` | 5.58  | 6.95  |
| `signal` on `paper`   | 5.41  | 9.96  |
| `caution` on `paper`  | 5.94  | 9.36  |
| `edge` on `paper`     | 3.60  | 3.60  |

**Why `edge` exists separately from `rule`.** WCAG 2.2 rule 1.4.11 requires 3:1
for the boundary of a UI component — an input border is how you know where the
field is. `rule` sits at 1.20:1, which is correct for a decorative table divider
(the data is readable without it) and wrong for an input. Collapsing the two
into one token would mean either illegible fields or heavy-handed table rules.
So there are two tokens, and `edge` is measured against the 3:1 bar.

**`caution` is amber, not red.** It appears when a guard has adjusted a number —
a deficit capped, a calorie floor applied. The brief requires those notes to be
plain and non-alarming. Amber reads as "here is something to know"; red reads as
"you have done something wrong", which is exactly the framing section 4.3 rules
out.

### Where the boldness goes

The brief says to spend boldness in one place, and that the results display is
the natural candidate because the numerals are the product. That is what
happens: `signal` is used almost nowhere except the result readout, links, and
focus rings. Headings are `ink`. Buttons are `ink` on `paper` with an `edge`
border. Nothing else competes with the number.

---

## Type

Three faces, all self-hosted through `@fontsource-variable`, subset to Latin,
`woff2`, preloaded, `font-display: swap`. Zero external font requests, which the
CSP requires (`font-src 'self'`) and the performance budget assumes.

| Role     | Face               | Why                                                                                                                                                                                                                            |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Display  | **Space Grotesk**  | Headings only. A grotesque with drawn-not-derived detailing — it reads engineered rather than corporate, which is the instrument register the brief asks for, without the loudness of a fitness typeface.                      |
| Body     | **Public Sans**    | Body copy, labels, tables. Designed for US government services, so it is optimised for being read rather than for having a personality. That is exactly the job here.                                                          |
| Numerals | **JetBrains Mono** | The result readout, every reference table, every chart axis. Chosen for its digits: tall x-height, unambiguous 1/7 and 0/O, and monospaced by construction so figures align down a column without any tabular-numeral coaxing. |

Variable fonts are used so weight is a single axis rather than several separate
files — one request per family covers 400 through 700.

### Scale

A 1.25 ratio (major third), which is tight enough that a page of body copy and
an `h2` feel like the same document, and wide enough that hierarchy is
unambiguous at 360px.

| Step     | Size                         | Use                            |
| -------- | ---------------------------- | ------------------------------ |
| `-1`     | 0.833rem                     | Table labels, footnotes, units |
| `0`      | 1rem                         | Body                           |
| `1`      | 1.25rem                      | Lead paragraph, `h3`           |
| `2`      | 1.563rem                     | `h2`                           |
| `3`      | 1.953rem                     | `h1`                           |
| `4`      | 2.441rem                     | `h1` on wide viewports         |
| `result` | `clamp(2.5rem, 9vw, 4.5rem)` | The signature element          |

The result step is fluid rather than stepped because it is the one element that
should fill the space available to it on any screen. Everything else steps, so
line lengths stay predictable.

Body measure is capped at 68 characters. Longer lines cost re-reads, and the
guides run to 1,600 words.

---

## Spacing

A 4px base unit, scaled 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64.

4px because it divides cleanly into the two constraints that actually matter
here: a 44px touch target is 11 units, and 16px body text on 24px leading is 4
and 6 units. A base of 5 or 6 makes both of those fractional.

The scale is deliberately short. Eight values is enough to build every layout on
this site, and a longer scale just invites inconsistent choices between two
values that differ by 2px.

---

## Interaction and accessibility

Targeting **WCAG 2.2 AA**, with the specific commitments the brief names:

- **Focus** is a 2px `signal` outline with a 2px offset, never removed, and
  visible against both surfaces (5.41:1 light, 9.96:1 dark). `:focus-visible` so
  it does not fire on mouse clicks.
- **Every input has a real `<label>`**, not a placeholder standing in for one.
  Placeholders vanish on focus, which strands anyone who loses their place.
- **Results are announced** via `aria-live="polite"` on the result region, so a
  screen reader hears the new number without the focus being stolen mid-typing.
- **Touch targets** are 44px on primary controls, comfortably above the 24px
  that rule 2.5.8 requires.
- **`prefers-reduced-motion`** disables the only two transitions on the site.
- **Fully keyboard operable**, verified end to end in the Playwright suite.
- **Contrast** verified by a unit test that recomputes every pairing above.

### Dark mode

Follows `prefers-color-scheme` by default, with a persisted manual toggle that
overrides it. The theme is applied by a tiny inline script that runs before
first paint, so there is no flash of the wrong theme. That script is the single
inline script on the site and is allowed through the CSP by SHA-256 hash rather
than by weakening the policy — `unsafe-inline` is never added.

`color-scheme` is set alongside the tokens so form controls, scrollbars and
focus rings supplied by the browser match the page instead of fighting it.

---

## Copy

Active voice, sentence case, plain verbs. No hype, no motivational filler.

Errors say what happened and how to fix it — "Height should be between 50 and
260 cm. Check the units and try again." rather than "Invalid input". The message
names the accepted range, because a message that does not is just a refusal.

Numbers are never editorialised. The site reports what an equation produced and
what that equation assumes; it does not tell anyone whether the number is good.
