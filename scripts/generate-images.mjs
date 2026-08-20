/**
 * Build-time image generation: OG cards, raster icons and the web manifest.
 *
 * Written against sharp directly rather than using astro-og-canvas, because the
 * output needed here is a flat composition of rectangles and text — a whole
 * canvas layer would be a dependency earning its keep on nothing.
 *
 * Runs after the build and writes into `dist`, so nothing is committed and the
 * images always match the current page set.
 *
 * Font note: SVG text is rendered by sharp's SVG backend using system fonts, so
 * the exact face differs between a Windows dev machine and Linux CI. That is
 * acceptable for an OG card — it is an image, not content — and the stack below
 * lists faces that exist on both. What must not differ is the text itself.
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

/*
 * libvips sizes its pixel cache and its thread pool for a machine doing bulk
 * image work. This script writes ten small PNGs, one at a time, immediately
 * after a build that has just held the whole page set in memory — so the cache
 * is never read twice and the extra threads only compete for allocations. Both
 * are turned off: it costs nothing here and keeps the step inside the memory a
 * modest CI runner has left at the end of a build.
 */
sharp.cache(false);
sharp.concurrency(1);

const DIST = 'dist';
const OG_DIR = join(DIST, 'og');

// Design tokens, mirrored from src/styles/tokens.css.
const INK = '#15171b';
const PAPER = '#f6f7f8';
const SIGNAL = '#0e6f83';
const GRAPHITE = '#98a2b0';

const FONT_STACK = 'DejaVu Sans, Liberation Sans, Segoe UI, Arial, Helvetica, sans-serif';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/**
 * Greedy word wrap.
 *
 * SVG has no text wrapping, so lines are measured by an approximation: at this
 * size, an average glyph is a little over half the font size wide. It does not
 * need to be exact — it needs to never overflow the card, so the estimate errs
 * toward breaking early.
 */
const wrap = (text, maxChars, maxLines) => {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current === '' ? word : `${current} ${word}`;
    if (candidate.length > maxChars && current !== '') {
      lines.push(current);
      current = word;
      if (lines.length === maxLines) break;
    } else {
      current = candidate;
    }
  }
  if (lines.length < maxLines && current !== '') lines.push(current);

  // Mark truncation honestly rather than silently dropping words.
  if (lines.length === maxLines) {
    const consumed = lines.join(' ').split(/\s+/).length;
    if (consumed < words.length) {
      lines[maxLines - 1] = `${lines[maxLines - 1]}…`;
    }
  }
  return lines;
};

/** One OG card: title, an eyebrow label, and the wordmark. */
const ogSvg = (title, eyebrow) => {
  const lines = wrap(title, 30, 3);
  const fontSize = lines.length >= 3 ? 62 : 72;
  const startY = 300 - (lines.length - 1) * (fontSize * 0.6);

  const tspans = lines
    .map(
      (line, index) =>
        `<text x="80" y="${startY + index * (fontSize * 1.2)}" font-family="${FONT_STACK}" font-size="${fontSize}" font-weight="700" fill="${INK}">${escapeXml(line)}</text>`
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}">
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${PAPER}"/>
  <rect x="0" y="0" width="16" height="${OG_HEIGHT}" fill="${SIGNAL}"/>
  <text x="80" y="140" font-family="${FONT_STACK}" font-size="26" font-weight="600" letter-spacing="2" fill="${SIGNAL}">${escapeXml(eyebrow.toUpperCase())}</text>
  ${tspans}
  <rect x="80" y="500" width="64" height="4" fill="${SIGNAL}"/>
  <text x="80" y="560" font-family="${FONT_STACK}" font-size="32" font-weight="700" fill="${INK}">Baseline</text>
  <text x="230" y="560" font-family="${FONT_STACK}" font-size="26" fill="${GRAPHITE}">health and fitness calculators</text>
</svg>`;
};

/** The app icon, reused at every raster size. */
const iconSvg = (
  size
) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}">
  <rect width="32" height="32" rx="7" fill="${SIGNAL}"/>
  <rect x="6" y="21" width="20" height="2" rx="1" fill="${PAPER}"/>
  <rect x="8" y="15" width="3" height="4" rx="1" fill="${PAPER}" opacity="0.55"/>
  <rect x="14" y="11" width="3" height="8" rx="1" fill="${PAPER}" opacity="0.8"/>
  <rect x="20" y="7" width="3" height="12" rx="1" fill="${PAPER}"/>
</svg>`;

const writePng = async (svg, outPath) => {
  const buffer = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(outPath, buffer);
  return buffer.length;
};

const main = async () => {
  if (!existsSync(DIST)) {
    console.error('No dist directory. Run the build first.');
    process.exit(1);
  }

  mkdirSync(OG_DIR, { recursive: true });

  const started = Date.now();
  let count = 0;
  let bytes = 0;

  // Default card, referenced by SITE.defaultOgImage.
  bytes += await writePng(
    ogSvg('Health and fitness calculators, with the working shown', 'Baseline'),
    join(OG_DIR, 'default.png')
  );
  count += 1;

  /**
   * Section cards.
   *
   * One per section rather than one per page. A per-page card for all 138 pages
   * would add roughly seven seconds to every build to produce images that differ
   * only in a line of text most people never see — and the per-page title is
   * already carried by og:title, which is what the card renders alongside.
   * If that trade changes, the loop below is the only thing that needs to.
   */
  const sections = [
    ['calculators', 'Calculators', 'Every calculator built on a published equation'],
    ['guides', 'Guides', 'What sits behind the numbers, explained'],
    ['charts', 'Charts', 'Reference tables computed from the same equations'],
    ['calories-burned', 'Activity', 'Energy used, from published MET values'],
    ['one-rep-max', 'Strength', 'One rep max, five equations compared'],
    ['pace', 'Running', 'Pace, splits and finish times'],
  ];

  for (const [slug, eyebrow, title] of sections) {
    bytes += await writePng(ogSvg(title, eyebrow), join(OG_DIR, `${slug}.png`));
    count += 1;
  }

  // Raster icons.
  for (const size of [180, 192, 512]) {
    bytes += await writePng(iconSvg(size), join(DIST, `icon-${size}.png`));
    count += 1;
  }

  // Web manifest, written here so it can reference the icons just generated.
  const manifest = {
    name: 'Baseline — health and fitness calculators',
    short_name: 'Baseline',
    description:
      'Health and fitness calculators built on published equations, each one cited on the page that uses it.',
    start_url: '/',
    display: 'standalone',
    background_color: PAPER,
    theme_color: PAPER,
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
  writeFileSync(join(DIST, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2));

  console.log(
    `Generated ${count} images (${Math.round(bytes / 1024)} KB) and the manifest in ${Date.now() - started} ms`
  );
};

await main();
