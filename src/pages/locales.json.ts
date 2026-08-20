import type { APIRoute } from 'astro';
import { LOCALES, DEFAULT_LOCALE } from '../config/locales';

/**
 * The URL path segment of every non-default locale.
 *
 * Emitted so build-time audits can tell "/de/guides/" (a German page) from
 * "/guides/" (an English one) without keeping their own copy of the locale
 * list, which would silently go stale the moment a locale is added.
 *
 * Not linked from anywhere and not in any sitemap; it is build metadata that
 * happens to be served, the same as the sitemap index itself.
 */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      LOCALES.filter((locale) => locale.code !== DEFAULT_LOCALE).map((locale) => locale.path)
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  );
