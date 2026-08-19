/**
 * Minimal static server for `dist`.
 *
 * Used by the Playwright suite instead of `astro preview`, which in Astro 7
 * daemonises itself and returns immediately — so Playwright's webServer sees the
 * process exit and gives up before any test runs.
 *
 * Written against node:http with no dependency, because the behaviour needed is
 * small and precise: resolve directory URLs to index.html, serve the custom 404
 * page *with* a 404 status, and refuse to serve anything outside dist.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

const DIST = resolve('dist');
const PORT = Number(process.env['PORT'] ?? 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

const contentType = (path) => TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream';

const readIfFile = async (path) => {
  try {
    const info = await stat(path);
    if (!info.isFile()) return null;
    return await readFile(path);
  } catch {
    return null;
  }
};

const server = createServer((req, res) => {
  void (async () => {
    const url = new URL(req.url ?? '/', `http://localhost:${String(PORT)}`);

    // Normalise and confine to dist: a request for ../../etc/passwd must not
    // escape the served directory.
    const decoded = decodeURIComponent(url.pathname);
    const candidate = resolve(join(DIST, normalize(decoded)));
    if (candidate !== DIST && !candidate.startsWith(DIST + sep)) {
      res.writeHead(403).end('Forbidden');
      return;
    }

    // Directory URLs resolve to index.html, matching the host's behaviour with
    // `build.format: 'directory'`.
    const targets = decoded.endsWith('/')
      ? [join(candidate, 'index.html')]
      : [candidate, join(candidate, 'index.html'), `${candidate}.html`];

    for (const target of targets) {
      const body = await readIfFile(target);
      if (body !== null) {
        res.writeHead(200, { 'Content-Type': contentType(target) }).end(body);
        return;
      }
    }

    // The custom 404 page, served with a genuine 404 status — a soft 404 would
    // make the e2e assertion meaningless and misrepresent production.
    const notFound = await readIfFile(join(DIST, '404.html'));
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(notFound ?? 'Not found');
  })();
});

server.listen(PORT, () => {
  console.log(`Serving dist on http://localhost:${String(PORT)}`);
});
