// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
// Astro loads this config through Vite, so the locale definitions can be shared
// with the SEO module rather than restated here. Restating them would let the
// routing config and the hreflang map drift apart silently — the failure mode
// being hreflang tags pointing at routes that do not exist, on every page.
import { ASTRO_I18N_LOCALES } from './src/config/locales.ts';

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

/**
 * Annotated as AstroUserConfig so `defaultLocale` types as a plain string.
 *
 * Without it, Astro derives that field's type by extracting literal members
 * from the `locales` array, which only works when the array is a literal at
 * this call site. `locales` is derived from src/config/locales.ts to prevent
 * drift, so the extraction yields `never` and rejects every value — including
 * the correct one.
 *
 * @type {import('astro').AstroUserConfig}
 */
const config = {
  site: SITE_URL,
  output: 'static',
  // Pick one URL form and enforce it everywhere; the SEO module asserts against this.
  trailingSlash: 'always',
  integrations: [mdx()],
  i18n: {
    /*
     * Written as a literal, not as the imported DEFAULT_LOCALE.
     *
     * Astro derives the type of `defaultLocale` from the `locales` array by
     * extracting its literal member types, which only works when that array is
     * a literal at this call site. `locales` is derived from src/config/locales.ts
     * to prevent drift, so the extraction yields `never` and any value is
     * rejected. The list is the thing that could realistically drift; a single
     * locale code is not, and the astro-config test asserts this value still
     * equals DEFAULT_LOCALE so the two cannot diverge unnoticed.
     */
    defaultLocale: 'en',
    // `pt-BR` ships as the lowercase path segment /pt-br/ while hreflang and
    // og:locale keep the correctly-cased BCP-47 code. See src/config/locales.ts.
    locales: ASTRO_I18N_LOCALES,
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
};

export default defineConfig(config);
