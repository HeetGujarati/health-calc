import { describe, expect, it } from 'vitest';
import {
  absoluteUrl,
  getCanonicalUrl,
  getHreflangMap,
  getLocalePath,
  normalisePath,
  splitLocaleFromPath,
} from './urls';
import { SITE } from '../../config/site';
import { LOCALE_CODES } from '../../config/locales';

describe('path normalisation', () => {
  it('produces one consistent shape from sloppy input', () => {
    for (const input of [
      'calculators/bmi',
      '/calculators/bmi',
      'calculators/bmi/',
      '/calculators/bmi/',
      '//calculators//bmi//',
    ]) {
      expect(normalisePath(input)).toBe('/calculators/bmi/');
    }
  });

  it('maps every empty form to root', () => {
    for (const input of ['', '/', '//', '///']) {
      expect(normalisePath(input)).toBe('/');
    }
  });

  it('strips query strings and fragments, which canonicals never carry', () => {
    expect(normalisePath('/calculators/bmi/?units=metric')).toBe('/calculators/bmi/');
    expect(normalisePath('/calculators/bmi/#results')).toBe('/calculators/bmi/');
  });
});

describe('locale paths', () => {
  it('serves the default locale from the root with no prefix', () => {
    expect(getLocalePath('/calculators/bmi', 'en')).toBe('/calculators/bmi/');
    expect(getLocalePath('/', 'en')).toBe('/');
  });

  it('prefixes other locales', () => {
    expect(getLocalePath('/calculators/bmi', 'de')).toBe('/de/calculators/bmi/');
    expect(getLocalePath('/', 'de')).toBe('/de/');
  });

  it('uses the lowercase path segment for pt-BR', () => {
    expect(getLocalePath('/calculators/bmi', 'pt-BR')).toBe('/pt-br/calculators/bmi/');
    expect(getLocalePath('/', 'pt-BR')).toBe('/pt-br/');
  });

  it('always ends with exactly one trailing slash', () => {
    for (const locale of LOCALE_CODES) {
      for (const path of ['/', '/a', '/a/b/c']) {
        const result = getLocalePath(path, locale);
        expect(result.endsWith('/')).toBe(true);
        expect(result.endsWith('//')).toBe(false);
        expect(result.startsWith('/')).toBe(true);
      }
    }
  });
});

describe('canonical URLs', () => {
  it('is absolute and origin-prefixed', () => {
    expect(getCanonicalUrl('/calculators/bmi', 'en')).toBe(`${SITE.baseUrl}/calculators/bmi/`);
    expect(getCanonicalUrl('/calculators/bmi', 'ja')).toBe(`${SITE.baseUrl}/ja/calculators/bmi/`);
  });

  it('never produces a double slash at the origin join', () => {
    for (const locale of LOCALE_CODES) {
      const url = getCanonicalUrl('/', locale);
      expect(url.replace(/^https:\/\//, '')).not.toContain('//');
    }
  });

  it('resolves relative asset paths and passes absolute ones through', () => {
    expect(absoluteUrl('/og/default.png')).toBe(`${SITE.baseUrl}/og/default.png`);
    expect(absoluteUrl('og/default.png')).toBe(`${SITE.baseUrl}/og/default.png`);
    expect(absoluteUrl('https://cdn.example.com/a.png')).toBe('https://cdn.example.com/a.png');
  });
});

describe('hreflang map', () => {
  it('includes a self-referencing entry', () => {
    const map = getHreflangMap('/calculators/bmi', LOCALE_CODES);
    const self = map.find((entry) => entry.hreflang === 'de');
    expect(self?.href).toBe(getCanonicalUrl('/calculators/bmi', 'de'));
  });

  it('emits one entry per available locale plus x-default', () => {
    const map = getHreflangMap('/calculators/bmi', LOCALE_CODES);
    expect(map).toHaveLength(LOCALE_CODES.length + 1);
  });

  it('points x-default at the English URL', () => {
    const map = getHreflangMap('/calculators/bmi', LOCALE_CODES);
    const xDefault = map.find((entry) => entry.hreflang === 'x-default');
    expect(xDefault?.href).toBe(getCanonicalUrl('/calculators/bmi', 'en'));
  });

  it('uses the cased BCP-47 tag while the URL stays lowercase', () => {
    const map = getHreflangMap('/calculators/bmi', LOCALE_CODES);
    const ptBr = map.find((entry) => entry.hreflang === 'pt-BR');
    expect(ptBr).toBeDefined();
    expect(ptBr?.href).toContain('/pt-br/');
  });

  it('omits locales where the page does not exist', () => {
    const map = getHreflangMap('/calculators/bmi', ['en', 'es']);
    const tags = map.map((entry) => entry.hreflang);
    expect(tags).toEqual(['en', 'es', 'x-default']);
  });

  it('omits x-default when English is not among the available locales', () => {
    const map = getHreflangMap('/calculators/bmi', ['es', 'fr']);
    expect(map.map((e) => e.hreflang)).toEqual(['es', 'fr']);
  });

  it('returns nothing for an empty locale list', () => {
    expect(getHreflangMap('/calculators/bmi', [])).toEqual([]);
  });

  it('never emits two entries for the same hreflang', () => {
    const map = getHreflangMap('/calculators/bmi', LOCALE_CODES);
    const tags = map.map((e) => e.hreflang);
    expect(new Set(tags).size).toBe(tags.length);
  });
});

describe('splitting a locale from a path', () => {
  it('recognises a prefixed locale', () => {
    expect(splitLocaleFromPath('/de/calculators/bmi/')).toEqual({
      locale: 'de',
      path: '/calculators/bmi/',
    });
  });

  it('recognises the lowercase pt-br segment as pt-BR', () => {
    expect(splitLocaleFromPath('/pt-br/calculators/bmi/')).toEqual({
      locale: 'pt-BR',
      path: '/calculators/bmi/',
    });
  });

  it('treats an unprefixed path as the default locale', () => {
    expect(splitLocaleFromPath('/calculators/bmi/')).toEqual({
      locale: 'en',
      path: '/calculators/bmi/',
    });
  });

  it('handles a bare locale root', () => {
    expect(splitLocaleFromPath('/ja/')).toEqual({ locale: 'ja', path: '/' });
  });

  it('does not mistake a page slug for a locale', () => {
    // A path segment that merely looks like a language code must not be eaten.
    expect(splitLocaleFromPath('/calculators/id/')).toEqual({
      locale: 'en',
      path: '/calculators/id/',
    });
  });

  it('round-trips with getLocalePath for every locale', () => {
    for (const locale of LOCALE_CODES) {
      const full = getLocalePath('/calculators/bmi', locale);
      expect(splitLocaleFromPath(full)).toEqual({ locale, path: '/calculators/bmi/' });
    }
  });
});
