# Deploying

Written for someone who has never used Cloudflare Pages. Follow it top to
bottom; nothing is assumed.

The site is 943 static HTML files plus assets. Any static host will serve it.
Cloudflare Pages is the primary target because its free tier has no bandwidth
cap and it applies `_headers` without extra configuration. Netlify is documented
as a fallback because it reads the same two files.

---

## Before you deploy: the placeholder checklist

Four things in the repo say `OWNER PLACEHOLDER`. The site builds and works
without them, but do not point a real domain at it until they are real.

### 1. Contact email

`src/config/site.ts`:

```ts
contactEmail: 'hello@example.com',
```

Replace with an address you actually read. It appears on `/contact/`, in the
privacy policy, in the terms and in `/.well-known/security.txt`. Changing it in
this one file updates all four.

### 2. Legal entity and address

The privacy policy and terms both carry a marked callout. GDPR Article 13
requires the identity and contact details of the data controller, and most
jurisdictions expect the terms to name who is offering them and under whose law.

Edit `privacy.ownerNotice` and `terms.ownerNotice` in `src/i18n/ui/en.ts`,
then the same two keys in the other nine catalogs. `tsc` will not let you miss
one — the catalogs are typed against the English key set.

### 3. Twitter handle

`src/config/site.ts` has `twitterHandle: null`. Leave it null unless a real
account exists. The Twitter card renders correctly without `site` and `creator`;
inventing a handle attributes the site to whoever actually owns it.

### 4. ads.txt

`public/ads.txt` contains a comment and nothing else. AdSense will reject the
site while that is true. When you have a publisher ID:

```
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

Advertising is switched off in code as well — `PUBLIC_ADS_ENABLED` defaults to
false and the ad slots render nothing while reserving their dimensions, so
enabling them cannot shift layout. See `CONTENT.md` for what else has to happen
first, including the certified consent platform the EEA requires.

---

## Cloudflare Pages, click by click

### 1. Push to GitHub

The repo is already wired to `HITMAN5050/Health` and is private. Confirm the
branch you want deployed is pushed:

```
git push origin main
```

### 2. Create the project

1. Go to <https://dash.cloudflare.com> and sign in.
2. In the left sidebar choose **Workers & Pages**.
3. Click **Create application**, then the **Pages** tab, then
   **Connect to Git**.
4. Click **Connect GitHub**. A GitHub window opens asking for permission.
   Choose **Only select repositories**, pick `Health`, and click **Install &
   Authorize**.
5. Back on Cloudflare, select the `Health` repository and click
   **Begin setup**.

### 3. Build settings

Fill the form exactly like this:

| Field                  | Value                                          |
| ---------------------- | ---------------------------------------------- |
| Project name           | `baseline` (this becomes `baseline.pages.dev`) |
| Production branch      | `main`                                         |
| Framework preset       | **None**                                       |
| Build command          | `npm ci && npm run build`                      |
| Build output directory | `dist`                                         |
| Root directory         | leave blank                                    |

Then expand **Environment variables (advanced)** and add one:

| Variable name     | Value                        |
| ----------------- | ---------------------------- |
| `PUBLIC_SITE_URL` | `https://baseline.pages.dev` |

This is not optional. Canonical URLs, `hreflang`, the sitemap and the Open
Graph image URLs are all absolute, and they are built from this value. If you
skip it the build falls back to `https://fitness-calculators.pages.dev`, which
is a domain you do not own, and every canonical on the site will point at it.

Add a second variable so the build uses the right Node:

| Variable name  | Value |
| -------------- | ----- |
| `NODE_VERSION` | `22`  |

Click **Save and Deploy**. The first build takes two to four minutes.

### 4. Check it worked

When the build finishes Cloudflare shows a `*.pages.dev` URL. Open it and
verify:

- The homepage lists nineteen calculators.
- `/calculators/bmi/` computes: 175 cm and 70 kg gives 22.9.
- `/es/calculators/bmi/` is in Spanish and the URL kept the `bmi` slug.
- `/ar/calculators/bmi/` is laid out right to left.
- `/sitemap-index.xml` lists seven child sitemaps.
- `/robots.txt` names your domain in the `Sitemap:` line. If it names
  `fitness-calculators.pages.dev`, `PUBLIC_SITE_URL` was not set — fix it and
  redeploy.

Check the headers arrived. In your browser's developer tools, Network tab,
reload and click the document request. Under **Response Headers** you should
see `content-security-policy`, `strict-transport-security`,
`x-content-type-options` and `referrer-policy`. If they are missing, Cloudflare
did not read `public/_headers`; confirm the build output directory is `dist`
and that `dist/_headers` exists in the build log.

### 5. Custom domain

1. In the project, open the **Custom domains** tab.
2. Click **Set up a custom domain** and enter your domain.
3. If the domain's nameservers are already Cloudflare's, the DNS record is
   created for you. If not, Cloudflare shows a `CNAME` to add at your registrar.
4. Wait for the certificate. This is usually minutes and can be up to an hour.
5. **Update `PUBLIC_SITE_URL` to the custom domain** and trigger a redeploy
   (Deployments → the latest one → **Retry deployment**). Until you do, every
   canonical still points at `*.pages.dev`, and you will have two indexable
   copies of the site competing with each other.

### 6. Redirect the pages.dev subdomain

With a custom domain live, `baseline.pages.dev` still serves the whole site,
which is a duplicate of it. In the Cloudflare dashboard go to your domain →
**Rules** → **Redirect Rules** → **Create rule**:

- Field `Hostname`, operator `equals`, value `baseline.pages.dev`
- Then **Static redirect**, status **301**, target
  `https://yourdomain.com` with **Preserve path and query** on.

---

## Netlify, as a fallback

Netlify reads the same `public/_headers` and the repo already contains
`netlify.toml`.

1. <https://app.netlify.com> → **Add new site** → **Import an existing
   project** → **GitHub** → authorise → pick `Health`.
2. Build command `npm run build`, publish directory `dist`.
3. **Site configuration → Environment variables** → add `PUBLIC_SITE_URL` and
   `NODE_VERSION` exactly as above.
4. Deploy, then verify the same six things.

Netlify's free tier has a 100 GB monthly bandwidth cap. Cloudflare Pages does
not, which is the only reason it is the primary recommendation.

---

## Manual repository settings

Some GitHub settings cannot be set from a file. In the repository's
**Settings**:

- **Code security → Dependabot alerts** — on. `dependabot.yml` already
  schedules npm and Actions updates, but alerts are a separate switch.
- **Code security → Secret scanning and push protection** — these need GitHub
  Advanced Security on a private repository. If you do not have it, the
  `gitleaks` step in CI covers the same ground; `SECURITY.md` explains the gap.
- **Branches → Add branch protection rule** for `main`: require the `Verify`,
  `End to end` and `Lighthouse` checks to pass before merging.

---

## After launch

1. **Google Search Console** — add the domain property, verify by DNS TXT
   record, then submit `https://yourdomain.com/sitemap-index.xml`. Submit the
   index, not the children; Google follows it.
2. **Bing Webmaster Tools** — the same, and it can import from Search Console.
3. **Check `hreflang` in Search Console** after a week or two. It reports
   "no return tags" if two locales disagree about each other. They cannot here
   — routing, sitemaps and `hreflang` all read `localesFor()` — but a report is
   cheap and a silent break is not.
4. **Watch the translation coverage figure.** `npm run audit:seo` prints how
   many titles are still shared across locales. Ten are, and all ten are genuine
   coincidences between languages. Shared _descriptions_ are a build failure
   rather than a figure, so that half of the line should always read 0. See
   `SEO.md`.

---

## What to do when something breaks

**The build fails on Cloudflare but works locally.** Check `NODE_VERSION` is
`22`. Cloudflare's default is older than `engines` allows.

**Canonicals point at the wrong domain.** `PUBLIC_SITE_URL` is unset or stale
in the environment variables. Set it and redeploy — a rebuild is required
because the URLs are baked in at build time.

**Security headers are missing.** `dist/_headers` is generated by
`npm run headers`, which the build script runs. If they are missing from the
response, the host is not reading the file: check the publish directory.

**A page 404s that should not.** Every route is generated from a static
allowlist, so this means the page was never built. `npm run audit:links` catches
it before deploy; run it locally against a fresh `dist`.
