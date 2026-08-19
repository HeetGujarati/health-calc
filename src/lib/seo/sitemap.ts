import { getCanonicalUrl } from './urls';
import type { PageEntry } from './pages';

/**
 * Sitemap XML generation.
 *
 * Built by hand rather than with @astrojs/sitemap, because section 6.5 needs
 * xhtml:link alternates for every locale of every URL, real content-derived
 * lastmod values, and per-section priority — a combination the integration
 * cannot express.
 *
 * XML escaping is applied to every interpolated value. URLs on this site are
 * slug-safe today, but a sitemap that breaks the moment a slug contains an
 * ampersand is a trap left for later.
 */

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/**
 * One `<url>` block, with an `xhtml:link` for every locale the page exists in.
 *
 * Self-referencing alternates are included, which the specification requires:
 * every URL in an alternate set must list every member of that set, itself
 * included.
 */
const urlBlock = (entry: PageEntry, locale: PageEntry['locales'][number]): string => {
  const loc = getCanonicalUrl(entry.path, locale);

  const alternates = entry.locales
    .map(
      (alternate) =>
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate)}" href="${escapeXml(getCanonicalUrl(entry.path, alternate))}"/>`
    )
    .join('\n');

  // x-default points at the default locale, but only when the page exists there.
  const xDefault = entry.locales.includes('en')
    ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(getCanonicalUrl(entry.path, 'en'))}"/>`
    : '';

  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority.toFixed(1)}</priority>`,
    alternates + xDefault,
    '  </url>',
  ].join('\n');
};

/** A complete urlset document for one section. */
export const renderUrlset = (entries: readonly PageEntry[]): string => {
  const urls = entries
    .flatMap((entry) => entry.locales.map((locale) => urlBlock(entry, locale)))
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
};

/** The sitemap index, pointing at one child per section. */
export const renderSitemapIndex = (
  children: readonly { readonly loc: string; readonly lastmod: string }[]
): string => {
  const entries = children
    .map(
      (child) =>
        `  <sitemap>\n    <loc>${escapeXml(child.loc)}</loc>\n    <lastmod>${escapeXml(child.lastmod)}</lastmod>\n  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;
};

/** Most recent lastmod in a set, for the index entry. */
export const latestLastmod = (entries: readonly PageEntry[]): string =>
  entries.reduce(
    (latest, entry) => (entry.lastmod > latest ? entry.lastmod : latest),
    '1970-01-01'
  );

export const xmlResponse = (body: string): Response =>
  new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
