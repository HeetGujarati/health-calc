import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { SITEMAP_SECTIONS, entriesForSection } from '../lib/seo/pages';
import { latestLastmod, renderSitemapIndex, xmlResponse } from '../lib/seo/sitemap';

/**
 * Sitemap index.
 *
 * Split by section so a change to one cluster does not invalidate the others,
 * and so each child stays far below the 50,000 URL limit. Sections with no
 * pages are omitted rather than emitted empty.
 */
export const GET: APIRoute = async () => {
  const children = [];

  for (const section of SITEMAP_SECTIONS) {
    const entries = await entriesForSection(section);
    if (entries.length === 0) continue;
    children.push({
      loc: `${SITE.baseUrl}/sitemaps/${section}.xml`,
      lastmod: latestLastmod(entries),
    });
  }

  return xmlResponse(renderSitemapIndex(children));
};
