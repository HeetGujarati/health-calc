import { DEFAULT_LOCALE, type Locale } from '../../config/locales';
import { en } from '../../i18n/ui/en';
import { es } from '../../i18n/ui/es';
import { ptBR } from '../../i18n/ui/pt-BR';
import { fr } from '../../i18n/ui/fr';
import { de } from '../../i18n/ui/de';
import { it } from '../../i18n/ui/it';
import { hi } from '../../i18n/ui/hi';
import { id } from '../../i18n/ui/id';
import { ja } from '../../i18n/ui/ja';
import { ar } from '../../i18n/ui/ar';

/**
 * The translation runtime.
 *
 * `Messages` is derived from the English catalog, so every locale file is
 * checked by the compiler for exact key coverage: a missing key is a type
 * error, and a key that no longer exists in English is a type error too. That
 * is the "no untranslated key" gate from the brief, enforced at compile time
 * rather than by a test that could be skipped.
 */

export type MessageKey = keyof typeof en;
export type Messages = Record<MessageKey, string>;

export const UI_MESSAGES: Readonly<Record<Locale, Messages>> = {
  en,
  es,
  'pt-BR': ptBR,
  fr,
  de,
  it,
  hi,
  id,
  ja,
  ar,
};

export const MESSAGE_KEYS = Object.keys(en) as readonly MessageKey[];

/** Values substituted into `{placeholder}` slots. */
export type Interpolations = Readonly<Record<string, string | number>>;

const PLACEHOLDER = /\{(\w+)\}/g;

/**
 * Substitutes `{name}` placeholders.
 *
 * An unmatched placeholder is left in place rather than blanked, so a missing
 * value shows up as a visible `{count}` on the page and in the HTML gate,
 * instead of silently producing " results for".
 */
export const interpolate = (template: string, values: Interpolations = {}): string =>
  template.replace(PLACEHOLDER, (match, name: string) => {
    const value = values[name];
    return value === undefined ? match : String(value);
  });

export interface Translator {
  (key: MessageKey, values?: Interpolations): string;
  readonly locale: Locale;
}

/**
 * Translator bound to a locale.
 *
 * There is no runtime fallback to English: every locale file is complete by
 * construction, so a fallback could only ever mask a bug. `Messages` being a
 * total record is what makes the lookup safe under `noUncheckedIndexedAccess`.
 */
export const useTranslations = (locale: Locale): Translator => {
  const messages = UI_MESSAGES[locale];
  const translate = (key: MessageKey, values?: Interpolations): string =>
    interpolate(messages[key], values);
  return Object.assign(translate, { locale });
};

export const t = useTranslations(DEFAULT_LOCALE);
