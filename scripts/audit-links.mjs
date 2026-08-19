/**
 * Internal link and anchor audit.
 *
 * Walks every HTML file in dist, resolves every internal href/src against the
 * page's own URL, and asserts the target exists on disk. Fragment targets are
 * resolved too: a link to /guides/foo/#step-2 fails unless that document really
 * contains an element with id="step-2".
 *
 * This replaced linkinator, which reports "0 links" under --silent and returns
 * an empty array under --format json once --skip is applied, so it could pass
 * without having checked anything. See DECISIONS.md.
 *
 * External links are counted and listed but never fetched: the build must not
 * depend on third-party availability, and the site makes zero runtime requests
 * off-origin by design.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep, posix } from 'node:path';

const DIST = 'dist';

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

const toUrlPath = (file) => `/${relative(DIST, file).split(sep).join('/')}`;

const pages = walk(DIST, '.html');

/** id attributes per document, parsed once. */
const idsByPage = new Map();
const htmlByPage = new Map();
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  htmlByPage.set(toUrlPath(file), html);
  const ids = new Set();
  for (const [, id] of html.matchAll(/\sid="([^"]+)"/g)) ids.add(id);
  // <a name="..."> is still a valid fragment target in HTML5 parsing rules.
  for (const [, name] of html.matchAll(/<a[^>]*\sname="([^"]+)"/g)) ids.add(name);
  idsByPage.set(toUrlPath(file), ids);
}

/** Maps a site-absolute URL path to the file that would serve it. */
const resolveToFile = (urlPath) => {
  const clean = urlPath.replace(/\/+$/, '');
  const candidates =
    clean === ''
      ? [join(DIST, 'index.html')]
      : [join(DIST, clean), join(DIST, `${clean}.html`), join(DIST, clean, 'index.html')];
  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
};

const ATTRS = /\s(?:href|src|action|poster)="([^"]*)"/g;
const SRCSET = /\ssrcset="([^"]*)"/g;

const broken = [];
const brokenFragments = [];
let internal = 0;
let external = 0;
let fragments = 0;
const externalHosts = new Map();

for (const file of pages) {
  const pagePath = toUrlPath(file);
  const pageDir = posix.dirname(pagePath);
  const html = htmlByPage.get(pagePath);

  const raw = [];
  for (const [, value] of html.matchAll(ATTRS)) raw.push(value);
  for (const [, value] of html.matchAll(SRCSET)) {
    for (const entry of value.split(',')) {
      const url = entry.trim().split(/\s+/)[0];
      if (url) raw.push(url);
    }
  }

  for (const value of raw) {
    const href = value.trim();
    if (href === '') continue;
    if (/^(?:mailto:|tel:|data:|javascript:|blob:)/i.test(href)) continue;

    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) {
      external += 1;
      try {
        const host = new URL(href.startsWith('//') ? `https:${href}` : href).host;
        externalHosts.set(host, (externalHosts.get(host) ?? 0) + 1);
      } catch {
        broken.push({ page: pagePath, href, reason: 'unparseable URL' });
      }
      continue;
    }

    const [pathPart = '', hashPart] = href.split('#');
    const targetPath =
      pathPart === ''
        ? pagePath
        : pathPart.startsWith('/')
          ? pathPart.split('?')[0]
          : posix.normalize(posix.join(pageDir, pathPart.split('?')[0]));

    internal += 1;
    const targetFile = pathPart === '' ? file : resolveToFile(targetPath);
    if (targetFile === null) {
      broken.push({ page: pagePath, href, reason: 'target does not exist' });
      continue;
    }

    if (hashPart !== undefined && hashPart !== '' && hashPart !== 'top') {
      fragments += 1;
      const ids = idsByPage.get(toUrlPath(targetFile));
      // Only HTML targets carry ids; a fragment on an asset is meaningless.
      if (ids === undefined) {
        brokenFragments.push({ page: pagePath, href, reason: 'fragment on a non-HTML target' });
      } else if (!ids.has(decodeURIComponent(hashPart))) {
        brokenFragments.push({ page: pagePath, href, reason: 'no element with that id' });
      }
    }
  }
}

console.log('Link audit');
console.log(`  ${pages.length} pages`);
console.log(`  ${internal} internal links, ${fragments} of them with fragments`);
console.log(`  ${external} external links across ${externalHosts.size} host(s)`);
for (const [host, count] of [...externalHosts].sort((a, b) => b[1] - a[1])) {
  console.log(`    ${host}: ${count}`);
}

const failures = [...broken, ...brokenFragments];
if (failures.length > 0) {
  console.error(`\n${failures.length} broken link(s):`);
  for (const failure of failures.slice(0, 40)) {
    console.error(`  ${failure.page} -> ${failure.href} (${failure.reason})`);
  }
  if (failures.length > 40) console.error(`  ...and ${failures.length - 40} more`);
  process.exit(1);
}

console.log('No broken internal links or fragments.');
