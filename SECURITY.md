# Security

## Reporting

Report privately in the first instance, to the address in
[security.txt](/.well-known/security.txt). Testing against the deployed site is
welcome; please do not run automated scanning that places load on the host.

There is no bug bounty. Reports are read and acted on.

---

## Threat model

This is a static site. There is no server, no database, no user accounts, no
sessions and no API. Nothing a visitor types is transmitted anywhere — every
calculation runs in the browser, and there is nowhere for it to be sent.

That removes most of the usual web attack surface. What remains is worth being
precise about.

### 1. Supply chain

**The largest realistic risk.** The site ships third-party code from npm, and a
compromised package would execute in every visitor's browser with full access to
the page.

Mitigations:

- Every dependency pinned to an exact version, with the lockfile committed.
  Nothing floats.
- `npm ci` in CI, so builds install exactly the locked tree.
- `npm run audit:deps` fails the build. Anything in `dependencies` — the code
  that ships or builds the artifact — is held to **zero** advisories at any
  severity. Anything in `devDependencies` fails at high and above unless it is
  listed in `scripts/audit-deps.mjs` with a package, a reason and a review date;
  an exception that stops matching any advisory fails too, so the list cannot
  outlive the problem. Two are currently accepted, both reached only through
  `@lhci/cli` and both absent from the production tree.
- Dependabot alerts, automated security fixes, and weekly update PRs for both npm
  and GitHub Actions.
- CodeQL scans JavaScript and TypeScript weekly and on every push. The analysis
  runs, but publishing its results needs code scanning enabled on the
  repository, which is Advanced Security on a private repo — see the known gaps
  below. Until it is enabled the job fails at the upload step and no alert is
  ever raised.
- Runtime dependencies are deliberately few. The site ships **zero** third-party
  JavaScript to the browser: no analytics, no tag manager, no ad script, no
  embedded widgets, no font CDN. Every byte executed in a visitor's browser was
  written in this repository.

### 2. GitHub Actions

A compromised action runs with repository access.

- Every action pinned to a **full commit SHA**, not a tag. A retagged release
  cannot silently change what executes.
- Workflows declare `permissions: contents: read` at the top level and raise it
  only where a job genuinely needs more.
- No secrets are used by the build. There is nothing in CI worth stealing.

### 3. Reflected input via URL parameters

Calculators accept prefilled state from the query string, and the search page
renders a query back to the reader. That is the one place untrusted input
reaches the DOM.

- Every HTML-injection sink is banned by an ESLint rule that fails CI:
  `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `eval`, `new Function`,
  string-argument `setTimeout`/`setInterval`, `document.write`, and Astro's
  `set:html`. The build audit re-checks the emitted HTML for the same strings.
- All rendering uses `createElement` and `textContent`, so a value cannot be
  parsed as markup regardless of its contents.
- Query parameters are length-capped before use and validated at the boundary.
  Anything unparseable falls back to a default rather than propagating.
- The single exception to the `set:html` ban is `JsonLd.astro`, which emits
  `JSON.stringify` output with `<` escaped to `<` — so a value containing a
  closing script tag cannot terminate the block. It is exempted by name, not by
  disabling the rule.

### 4. Stored preferences

Two values live in `localStorage`: `theme` and `units`.

- Both are validated against a known set on read. An unexpected value is ignored
  and the default applies.
- Every access is wrapped, because `localStorage` throws rather than returning
  null in Safari's private mode, and an unhandled exception there would block the
  rest of the page.
- Neither value identifies anyone. No cookies are set.

### 5. Clickjacking and framing

`X-Frame-Options: DENY` and `frame-ancestors 'none'`. There is no reason to
embed a calculator in a frame, and a framed calculator is a plausible vector for
misattributing results.

### 6. Transport

`Strict-Transport-Security` with a two-year max-age, `includeSubDomains` and
`preload`, plus `upgrade-insecure-requests` in the CSP.

---

## Content Security Policy

```
default-src 'none';
script-src 'self' 'sha256-…' (one hash per inline script);
style-src 'self';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
manifest-src 'self';
form-action 'none';
frame-ancestors 'none';
base-uri 'none';
object-src 'none';
upgrade-insecure-requests
```

**`'unsafe-inline'` and `'unsafe-eval'` are never present.** If a script appears
that cannot be hashed, the header generator fails the build rather than widening
the policy.

Three details worth explaining:

**Hashes are computed from the built output, not from source.** If Astro ever
changes how it emits an inline script — whitespace, ordering, minification — a
source-derived hash silently stops matching, and the script is blocked in
production while every local check still passes. `scripts/generate-headers.mjs`
reads `dist`, so the hash is of exactly the bytes served.

**`style-src 'self'` carries no hashes**, which is only possible because no
element has a `style` attribute and no `<style>` block is emitted.
`inlineStylesheets: 'never'` handles the second, and html-validate's
`no-inline-style` rule enforces the first — it caught Shiki emitting inline
styles on code blocks, which would have rendered them unstyled under this policy.

**`default-src 'none'`** rather than `'self'`, so any resource type not
explicitly listed is denied. Adding a new kind of resource requires a deliberate
change here.

The generator also fails if more than four distinct inline scripts appear, since
each one widens the policy and the count should stay small enough to review.

---

## What is deliberately absent

- No cookies.
- No analytics, in any form.
- No third-party requests of any kind. Fonts are self-hosted precisely so that
  loading a page contacts nobody else.
- No `target="_blank"` without `rel="noopener noreferrer"`.
- No user-generated content, so no moderation or injection surface.

---

## Known limitations

Stated because a security document that claims completeness is not credible.

**Secret scanning is unavailable.** GitHub gates it behind Advanced Security on
private repositories, and this repository must stay private. A gitleaks step in
CI catches committed secrets on every push, but it detects them _after_ the
commit rather than blocking the push. There is no free equivalent of push
protection.

**CodeQL results are not published.** Uploading them needs code scanning
enabled, which is the same Advanced Security gate. The analysis has run and
failed at the upload on every commit since it was added, so no CodeQL finding
has ever been reported. Enabling code scanning in the repository settings is the
only fix; nothing in this repo can grant it.

**gitleaks does not read the translation catalogs.** `.gitleaks.toml` excludes
`src/i18n/content/`, `src/i18n/ui/` and the guide MDX, because the
`generic-api-key` heuristic scores natural language as a credential and ten
locales of prose produce a steady supply of false positives. Those paths hold
translated content and nothing else. Everything a secret could plausibly reach
is still scanned.

**No external penetration test.** The site has not been reviewed by a third
party.

**Host-level configuration is outside this repository.** Headers are generated
into `_headers` and `netlify.toml`, but whether they are actually applied depends
on the host honouring them. `DEPLOY.md` includes the `curl -I` commands to verify
they are live after deployment, and that check should be run.

**Adding advertising would change this model materially.** An ad script is
third-party code with network access, and it would require relaxing the CSP.
`DEPLOY.md` sets out exactly which directives would need to change, and the
consent mechanism ships inactive so that nothing loads before a choice is made.
