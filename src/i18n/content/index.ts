import type { Locale } from '../../config/locales';
import esContent from './es.json';
import ptBRContent from './pt-BR.json';
import frContent from './fr.json';
import deContent from './de.json';
import itContent from './it.json';
import hiContent from './hi.json';
import idContent from './id.json';
import jaContent from './ja.json';
import arContent from './ar.json';

/**
 * Per-locale content overrides for the data files.
 *
 * Flat `key -> string` maps, held as JSON rather than TypeScript. A translation
 * catalog is data: JSON merges cleanly, diffs one line per changed string, and
 * can be handed to a translator without them meeting a build system. The key
 * space is derived from the data files by `scripts/extract-i18n-keys.ts`, so it
 * cannot drift from what the pages actually ask for.
 *
 * English is absent by design. It lives in the data files, which are the source
 * of truth, and an English entry here could only ever drift away from it.
 *
 * `tests/unit/i18n-content.test.ts` fails on a key no data file asks for and on
 * a key a data file asks for but a locale is missing, so the catalogs cannot rot
 * as the data changes.
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
