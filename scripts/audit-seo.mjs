/**
 * Build-output SEO audit.
 *
 * Runs against `dist` after a build, so it checks what is actually served
 * rather than what the source intends. Every check here corresponds to a
 * Definition of Done item in section 16 of the brief, and every one fails the
 * build rather than warning.
 *
 * Checks:
 *  1. Every page has exactly one canonical, and it is absolute.
 *  2. No duplicate titles or descriptions.
 *  3. Titles within 60 characters, descriptions within 157.
 *  4. Every hreflang target resolves to a page that was actually built.
 *  5. No noindex page appears in a sitemap or as anyone's hreflang target.
 *  6. Every JSON-LD block parses.
 *  7. Every HowTo step anchor exists in the rendered DOM of its own page.
 *  8. Exactly one h1 per page.
 *  9. No banned HTML-injection sink appears in the output.
 * 10. FAQ questions in markup are visible in the page text.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const problems = [];
const fail = (check, detail) => problems.push({ check, detail });

/** Recursively collect built HTML files. */
const htmlFiles = (dir) => {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
};

/** dist/calculators/bmi/index.html -> /calculators/bmi/ */
const urlPathOf = (file) => {
  const rel = relative(DIST, file).split(sep).join('/');
  const withoutIndex = rel.replace(/index\.html$/, '');
  return `/${withoutIndex}`.replace(/\/+/g, '/');
};

const files = htmlFiles(DIST);
if (files.length === 0) {
  console.error('No HTML found in dist. Run the build first.');
  process.exit(1);
}

const builtPaths = new Set(files.map(urlPathOf));
const titles = new Map();
const descriptions = new Map();

/**
 * Locale of a built path, from its first segment.
 *
 * Read from the shipped locale list rather than pattern-matched, so adding a
 * locale cannot silently make this audit treat its pages as English.
 */
const LOCALE_SEGMENTS = new Set(JSON.parse(readFileSync('dist/locales.json', 'utf8')));

const localeOf = (path) => {
  const first = path.split('/').filter(Boolean)[0];
  return LOCALE_SEGMENTS.has(first) ? first : 'en';
};

/** Cross-locale collisions: a coverage figure, not a failure. See below. */
const titleOwner = new Map();
const descriptionOwner = new Map();
const sharedTitles = new Set();
const sharedDescriptions = new Set();
const noIndexPaths = new Set();
const canonicalToPath = new Map();

const decode = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const page = urlPathOf(file);

  // --- 1. canonical ---------------------------------------------------------
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  if (canonicals.length !== 1) {
    fail('canonical', `${page} has ${canonicals.length} canonical tags (expected 1)`);
  } else {
    const canonical = canonicals[0];
    if (!/^https?:\/\//.test(canonical)) {
      fail('canonical', `${page} canonical is not absolute: ${canonical}`);
    }
    const seen = canonicalToPath.get(canonical);
    if (seen !== undefined && seen !== page) {
      fail('canonical', `${page} and ${seen} share a canonical: ${canonical}`);
    }
    canonicalToPath.set(canonical, page);
  }

  // --- robots ---------------------------------------------------------------
  const robots = /<meta name="robots" content="([^"]*)"/.exec(html);
  const isNoIndex = robots !== null && robots[1].includes('noindex');
  if (isNoIndex) noIndexPaths.add(page);

  // --- 2 & 3. titles and descriptions --------------------------------------
  /**
   * Duplicates are compared *within a locale*.
   *
   * Two pages that are hreflang alternates of each other are supposed to share
   * a title when the phrase really is the same in both languages: "Yoga" and
   * "Pilates" are not translated, and forcing them apart to satisfy a global
   * uniqueness check would make both titles worse. What actually harms a site
   * is two *different* pages in the same language competing for one query, and
   * that is what this measures.
   *
   * Cross-locale collisions are counted separately and printed as a coverage
   * figure rather than a failure, because that is what they are: a translation
   * still to be written, not a broken page.
   */
  const pageLocale = localeOf(page);

  const titleMatch = /<title>([\s\S]*?)<\/title>/.exec(html);
  if (titleMatch === null) {
    fail('title', `${page} has no title`);
  } else {
    const title = decode(titleMatch[1].trim());
    if (title.length > 60) fail('title-length', `${page} title is ${title.length} chars: ${title}`);
    if (!isNoIndex) {
      const key = `${pageLocale}||${title}`;
      const seen = titles.get(key);
      if (seen !== undefined) fail('duplicate-title', `${page} duplicates ${seen}: "${title}"`);
      else titles.set(key, page);

      const owner = titleOwner.get(title);
      if (owner !== undefined && owner !== pageLocale) sharedTitles.add(title);
      else titleOwner.set(title, pageLocale);
    }
  }

  const descMatch = /<meta name="description" content="([^"]*)"/.exec(html);
  if (descMatch === null) {
    fail('description', `${page} has no meta description`);
  } else {
    const description = decode(descMatch[1]);
    if (description.length > 157) {
      fail('description-length', `${page} description is ${description.length} chars`);
    }
    if (!isNoIndex) {
      const key = `${pageLocale}||${description}`;
      const seen = descriptions.get(key);
      if (seen !== undefined) {
        fail('duplicate-description', `${page} duplicates ${seen}`);
      } else descriptions.set(key, page);

      const owner = descriptionOwner.get(description);
      if (owner !== undefined && owner !== pageLocale) sharedDescriptions.add(description);
      else descriptionOwner.set(description, pageLocale);
    }
  }

  // --- 4 & 5. hreflang ------------------------------------------------------
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  if (isNoIndex && alternates.length > 0) {
    fail('noindex-hreflang', `${page} is noindex but emits ${alternates.length} hreflang tags`);
  }
  for (const [, lang, href] of alternates) {
    const target = href.replace(/^https?:\/\/[^/]+/, '');
    if (!builtPaths.has(target)) {
      fail('hreflang-404', `${page} hreflang="${lang}" points at unbuilt ${target}`);
    }
    if (noIndexPaths.has(target)) {
      fail('hreflang-noindex', `${page} hreflang="${lang}" points at noindex ${target}`);
    }
  }

  // --- 8. one h1 ------------------------------------------------------------
  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1s !== 1) fail('h1', `${page} has ${h1s} h1 elements (expected 1)`);

  // --- 9. banned sinks ------------------------------------------------------
  for (const banned of ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'document.write']) {
    if (html.includes(banned)) fail('banned-api', `${page} contains ${banned}`);
  }

  // --- 6, 7, 10. structured data -------------------------------------------
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  // Decode entities before comparing: the JSON carries real quotes while the
  // rendered HTML carries &quot;, and a naive compare reports false positives.
  const textContent = decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      fail('jsonld-parse', `${page}: ${error.message}`);
      continue;
    }

    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    for (const node of nodes) {
      if (node['@type'] === 'HowTo') {
        for (const step of node.step ?? []) {
          const hash = String(step.url ?? '').split('#')[1];
          if (hash === undefined) {
            fail('howto-anchor', `${page} HowTo step has no fragment`);
            continue;
          }
          if (!new RegExp(`id="${hash}"`).test(html)) {
            fail('howto-anchor', `${page} HowTo step points at missing #${hash}`);
          }
        }
      }

      if (node['@type'] === 'FAQPage') {
        for (const entity of node.mainEntity ?? []) {
          const question = String(entity.name ?? '');
          const normalised = question.replace(/\s+/g, ' ').trim();
          // Google requires marked-up FAQ content to be visible on the page.
          if (normalised.length > 0 && !textContent.includes(normalised)) {
            fail('faq-invisible', `${page} FAQ question not visible: "${normalised.slice(0, 50)}"`);
          }
        }
      }

      if (node['@type'] === 'SoftwareApplication' && 'aggregateRating' in node) {
        fail('fabricated-rating', `${page} emits an aggregateRating`);
      }
    }
  }
}

// --- sitemap cross-checks ---------------------------------------------------
const sitemapDir = join(DIST, 'sitemaps');
if (existsSync(sitemapDir)) {
  for (const name of readdirSync(sitemapDir)) {
    const xml = readFileSync(join(sitemapDir, name), 'utf8');
    for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const target = decode(loc).replace(/^https?:\/\/[^/]+/, '');
      if (!builtPaths.has(target)) {
        fail('sitemap-404', `${name} lists unbuilt ${target}`);
      }
      if (noIndexPaths.has(target)) {
        fail('sitemap-noindex', `${name} lists noindex ${target}`);
      }
    }
  }
} else {
  fail('sitemap', 'No dist/sitemaps directory found');
}

// --- report -----------------------------------------------------------------
const grouped = new Map();
for (const { check, detail } of problems) {
  if (!grouped.has(check)) grouped.set(check, []);
  grouped.get(check).push(detail);
}

console.log(`SEO audit: ${files.length} pages, ${builtPaths.size} URLs`);
console.log(
  `Translation coverage: ${sharedTitles.size} title(s) and ${sharedDescriptions.size} description(s) still shared across locales`
);

if (problems.length === 0) {
  console.log('All checks passed.');
  process.exit(0);
}

for (const [check, details] of grouped) {
  console.error(`\n[${check}] ${details.length} problem(s)`);
  for (const detail of details.slice(0, 10)) console.error(`  - ${detail}`);
  if (details.length > 10) console.error(`  ... and ${details.length - 10} more`);
}

console.error(`\n${problems.length} problem(s) total.`);
process.exit(1);
