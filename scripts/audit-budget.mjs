/**
 * Performance budget gate.
 *
 * Section 10 sets two limits: 35 KB of JavaScript gzipped sitewide, and 18 KB
 * per page. Both are measured here against the built output, gzipped, because
 * that is what a browser actually downloads.
 *
 * Per-page cost is the sum of every script the page pulls in: inline blocks,
 * scripts referenced by src, and anything those scripts static-import. Counting
 * only the tags in the HTML would miss the bulk of the calculator bundle, which
 * arrives through an import.
 */
import { gzipSync } from 'node:zlib';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep, posix } from 'node:path';

const DIST = 'dist';
const SITEWIDE_LIMIT = 35 * 1024;
const PER_PAGE_LIMIT = 18 * 1024;

const gzipSize = (buffer) => gzipSync(buffer, { level: 9 }).length;

const walk = (dir, ext) => {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full, ext));
    else if (name.endsWith(ext)) out.push(full);
  }
  return out;
};

if (!existsSync(DIST)) {
  console.error('No dist directory. Run the build first.');
  process.exit(1);
}

// --- Sitewide: every unique JavaScript asset shipped ------------------------
const assets = existsSync(join(DIST, '_astro')) ? walk(join(DIST, '_astro'), '.js') : [];
const assetSizes = new Map(
  assets.map((file) => [
    `/${relative(DIST, file).split(sep).join('/')}`,
    gzipSize(readFileSync(file)),
  ])
);

const sitewide = [...assetSizes.values()].reduce((total, size) => total + size, 0);

// --- Per page ---------------------------------------------------------------
/** Follows static imports so a page is charged for what it actually loads. */
const transitiveSize = (assetPath, seen) => {
  if (seen.has(assetPath)) return 0;
  seen.add(assetPath);

  const own = assetSizes.get(assetPath) ?? 0;
  const file = join(DIST, assetPath.replace(/^\//, ''));
  if (!existsSync(file)) return own;

  const source = readFileSync(file, 'utf8');
  let nested = 0;
  for (const [, spec] of source.matchAll(/(?:import|from)\s*["']([^"']+)["']/g)) {
    if (!spec.startsWith('.') && !spec.startsWith('/')) continue;
    const resolved = spec.startsWith('/')
      ? spec
      : posix.normalize(posix.join(posix.dirname(assetPath), spec));
    nested += transitiveSize(resolved, seen);
  }
  return own + nested;
};

const pages = walk(DIST, '.html');
const overBudget = [];
let worst = { page: '', bytes: 0 };

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const seen = new Set();
  let bytes = 0;

  for (const [, attrs, body] of html.matchAll(
    /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g
  )) {
    if (/application\/ld\+json/i.test(attrs)) continue;
    if (body.trim() !== '') bytes += gzipSize(Buffer.from(body, 'utf8'));
  }

  for (const [, src] of html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)) {
    if (/^https?:\/\//.test(src)) continue;
    bytes += transitiveSize(src, seen);
  }

  const label = `/${relative(DIST, page).split(sep).join('/')}`;
  if (bytes > worst.bytes) worst = { page: label, bytes };
  if (bytes > PER_PAGE_LIMIT) overBudget.push({ page: label, bytes });
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

console.log('JavaScript budget (gzipped)');
console.log(`  sitewide: ${kb(sitewide)} of ${kb(SITEWIDE_LIMIT)}`);
console.log(`  worst page: ${worst.page} at ${kb(worst.bytes)} of ${kb(PER_PAGE_LIMIT)}`);
console.log(`  ${pages.length} pages, ${assets.length} JavaScript assets`);

let failed = false;

if (sitewide > SITEWIDE_LIMIT) {
  console.error(`\nSitewide budget exceeded: ${kb(sitewide)} > ${kb(SITEWIDE_LIMIT)}`);
  failed = true;
}

if (overBudget.length > 0) {
  console.error(`\n${overBudget.length} page(s) over the per-page budget:`);
  for (const entry of overBudget.slice(0, 10)) {
    console.error(`  ${entry.page}: ${kb(entry.bytes)}`);
  }
  failed = true;
}

if (failed) process.exit(1);
console.log('Within budget.');
