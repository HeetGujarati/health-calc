import type { APIRoute } from 'astro';
import { SITE } from '../../config/site';

/**
 * security.txt, per RFC 9116.
 *
 * Served as an endpoint rather than a static file so the contact address and
 * canonical URL come from site config — a security contact that has drifted
 * out of date is worse than none, because a researcher will try it and give up.
 *
 * `Expires` is required by the RFC. It is set to a fixed date rather than
 * computed from the build time: a value that moves on every rebuild would keep
 * the file permanently fresh without anyone ever reviewing it, which defeats
 * the purpose of the field.
 */
const EXPIRES = '2027-08-20T00:00:00.000Z';

export const GET: APIRoute = () => {
  const body = [
    `Contact: mailto:${SITE.contactEmail}`,
    `Expires: ${EXPIRES}`,
    'Preferred-Languages: en',
    `Canonical: ${SITE.baseUrl}/.well-known/security.txt`,
    `Policy: ${SITE.baseUrl}/terms/`,
    '',
    '# This site is a set of static files. There is no backend, no database and',
    '# no user accounts, so the realistic attack surface is the supply chain,',
    '# reflected input via URL query parameters, and the hosting configuration.',
    '# See SECURITY.md in the repository for the full threat model.',
    '',
    '# Please report privately in the first instance. Testing is welcome, but',
    '# please do not run automated scanning that places load on the host.',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
