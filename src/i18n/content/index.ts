import type { Locale } from '../../config/locales';
import { esContent } from './es';
import { ptBRContent } from './pt-BR';
import { frContent } from './fr';
import { deContent } from './de';
import { itContent } from './it';
import { hiContent } from './hi';
import { idContent } from './id';
import { jaContent } from './ja';
import { arContent } from './ar';

/**
 * Per-locale content overrides.
 *
 * Flat `key → string` maps. English is absent by design: it lives in the data
 * files, which are the source of truth, and an English entry here could only
 * ever drift away from it.
 *
 * A key that no data file asks for is dead weight and a key a data file asks
 * for but is missing here is a gap; `tests/unit/i18n-content.test.ts` fails on
 * either, so the catalogs cannot rot as the data changes.
 */
export type ContentMessages = Readonly<Record<string, string>>;

export const CONTENT_MESSAGES: Readonly<Record<Locale, ContentMessages>> = {
  en: {},
  es: esContent,
  'pt-BR': ptBRContent,
  fr: frContent,
  de: deContent,
  it: itContent,
  hi: hiContent,
  id: idContent,
  ja: jaContent,
  ar: arContent,
};
