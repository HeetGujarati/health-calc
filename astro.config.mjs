// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

/**
 * The canonical origin for the site.
 *
 * Read from PUBLIC_SITE_URL so the deployed host controls it (see DEPLOY.md).
 * The documented fallback is the Cloudflare Pages preview subdomain, which is
 * where the site is genuinely reachable before a custom domain is attached —
 * so an unset variable still produces working absolute URLs rather than
 * canonicals pointing at a domain nobody owns.
 */
const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'https://fitness-calculators.pages.dev';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  // Pick one URL form and enforce it everywhere; the SEO module asserts against this.
  trailingSlash: 'always',
  integrations: [mdx()],
  i18n: {
    defaultLocale: 'en',
    // `pt-BR` ships as the lowercase path segment /pt-br/ while hreflang and
    // og:locale keep the correctly-cased BCP-47 code. Same for the rest.
    locales: [
      'en',
      'es',
      { path: 'pt-br', codes: ['pt-BR'] },
      'fr',
      'de',
      'it',
      'hi',
      'id',
      'ja',
      'ar',
    ],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  build: {
    // Required by the CSP in SECURITY.md: no inline <style> means style-src can
    // stay 'self' with no hashes or nonces to maintain.
    inlineStylesheets: 'never',
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Surface anything approaching the per-page JS budget (18 KB gzipped).
      chunkSizeWarningLimit: 60,
    },
  },
});
