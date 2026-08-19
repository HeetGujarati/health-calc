import type { APIRoute } from 'astro';
import { SITEMAP_SECTIONS, entriesForSection, type SitemapSection } from '../../lib/seo/pages';
import { renderUrlset, xmlResponse } from '../../lib/seo/sitemap';

/**
 * Per-section sitemaps.
 *
 * The section parameter is validated against the static allowlist by
 * construction: getStaticPaths only emits the known sections, so an unknown one
 * is never built and therefore 404s.
 */
export function getStaticPaths() {
  return SITEMAP_SECTIONS.map((section) => ({ params: { section } }));
}

export const GET: APIRoute = async ({ params }) => {
  const section = params['section'] as SitemapSection | undefined;
  if (section === undefined || !SITEMAP_SECTIONS.includes(section)) {
    return new Response('Not found', { status: 404 });
  }

  const entries = await entriesForSection(section);
  return xmlResponse(renderUrlset(entries));
};
