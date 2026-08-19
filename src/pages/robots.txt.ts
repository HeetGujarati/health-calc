import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

/**
 * robots.txt.
 *
 * Section 6.5: allow everything, disallow the search results page and tracking
 * parameters, never block CSS or JavaScript, no crawl-delay, and point at the
 * absolute sitemap index URL.
 *
 * Blocking CSS or JS would stop search engines rendering the page as a user
 * sees it, which is why /_astro/ is explicitly *not* disallowed despite being
 * a build-artefact directory.
 */
export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Search results have no stable content and would index as thin duplicates.',
    'Disallow: /search/?',
    '',
    '# Tracking parameters create duplicate URLs for identical pages.',
    'Disallow: /*?utm_',
    'Disallow: /*?fbclid=',
    'Disallow: /*?gclid=',
    '',
    '# Note: /_astro/ is deliberately not blocked. It holds the CSS and',
    '# JavaScript needed to render pages as a reader sees them, and blocking it',
    '# would prevent search engines from doing so.',
    '',
    `Sitemap: ${SITE.baseUrl}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
