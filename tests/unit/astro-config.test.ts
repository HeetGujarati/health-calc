import { describe, expect, it } from 'vitest';
import config from '../../astro.config.mjs';
import { ASTRO_I18N_LOCALES, DEFAULT_LOCALE } from '../../src/config/locales';

/**
 * The SEO module builds canonicals, hreflang maps and sitemap entries directly
 * from these settings. If any of them drift, the failure shows up as subtly
 * wrong URLs across ~880 pages rather than as a build error, so they are locked
 * here rather than left implicit.
 */
describe('astro config invariants', () => {
  it('is a fully static build with no server runtime', () => {
    expect(config.output).toBe('static');
  });

  it('enforces one URL form so canonicals cannot disagree with real routes', () => {
    expect(config.trailingSlash).toBe('always');
    expect(config.build?.format).toBe('directory');
  });

  it('never inlines stylesheets, so style-src can stay self without hashes', () => {
    expect(config.build?.inlineStylesheets).toBe('never');
  });

  it('serves the default locale from the root with no prefix', () => {
    expect(config.i18n?.defaultLocale).toBe('en');
    // astro.config.mjs must write this as a literal for Astro's type inference
    // to work, so this assertion is what stops it drifting from the shared
    // constant the SEO module builds every canonical URL from.
    expect(config.i18n?.defaultLocale).toBe(DEFAULT_LOCALE);
    expect(config.i18n?.routing).toMatchObject({ prefixDefaultLocale: false });
  });

  it('derives its locale list from the shared definitions, not a copy', () => {
    expect(config.i18n?.locales).toBe(ASTRO_I18N_LOCALES);
  });

  it('ships exactly the ten launch locales', () => {
    const locales = config.i18n?.locales ?? [];
    const codes = locales.flatMap((locale) =>
      typeof locale === 'string' ? [locale] : locale.codes
    );
    expect(codes).toEqual(['en', 'es', 'pt-BR', 'fr', 'de', 'it', 'hi', 'id', 'ja', 'ar']);
  });

  it('maps pt-BR to a lowercase path segment while keeping the BCP-47 code', () => {
    const ptBr = (config.i18n?.locales ?? []).find(
      (locale) => typeof locale !== 'string' && locale.codes.includes('pt-BR')
    );
    expect(ptBr).toBeDefined();
    expect(typeof ptBr === 'string' ? null : ptBr?.path).toBe('pt-br');
  });

  it('resolves an absolute site origin for canonical URLs', () => {
    expect(config.site).toBeDefined();
    expect(() => new URL(config.site!)).not.toThrow();
    expect(config.site).toMatch(/^https:\/\//);
  });
});
