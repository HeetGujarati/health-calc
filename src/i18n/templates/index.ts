import { DEFAULT_LOCALE, type Locale } from '../../config/locales';
import {
  ACTIVITY_ACCURACY,
  ACTIVITY_INTRO,
  ACTIVITY_MET_EXPLANATION,
  ACTIVITY_NET_NOTE,
  DISTANCE_DEMANDS,
  DISTANCE_INTRO,
  LIFT_ACCURACY,
  LIFT_INTRO,
} from '../../lib/content/templates';
import { esTemplates } from './es';
import { ptBRTemplates } from './pt-BR';
import { frTemplates } from './fr';
import { deTemplates } from './de';
import { itTemplates } from './it';
import { hiTemplates } from './hi';
import { idTemplates } from './id';
import { jaTemplates } from './ja';
import { arTemplates } from './ar';

/**
 * Sentence-variation templates, per locale.
 *
 * The anti-duplication engine picks one variant per slot from a hash of the
 * slug, so sixty activity pages do not share a paragraph. That property has to
 * survive translation: a locale supplying three variants where English has four
 * would produce more duplicates in that language than in English, which is
 * where duplicate-content filtering actually bites.
 *
 * `TEMPLATE_SLOTS` therefore declares the arity, and `templates.test.ts`
 * asserts every locale matches it exactly — same number of variants, every one
 * carrying at least one per-page placeholder.
 */
export const TEMPLATE_SLOTS = [
  'activityIntro',
  'activityMet',
  'activityAccuracy',
  'activityNet',
  'liftIntro',
  'liftAccuracy',
  'distanceIntro',
  'distanceDemands',
] as const;

export type TemplateSlot = (typeof TEMPLATE_SLOTS)[number];

export type TemplateSet = Readonly<Record<TemplateSlot, readonly string[]>>;

/** English, read from the source module so there is one copy of it. */
export const enTemplates: TemplateSet = {
  activityIntro: ACTIVITY_INTRO,
  activityMet: ACTIVITY_MET_EXPLANATION,
  activityAccuracy: ACTIVITY_ACCURACY,
  activityNet: ACTIVITY_NET_NOTE,
  liftIntro: LIFT_INTRO,
  liftAccuracy: LIFT_ACCURACY,
  distanceIntro: DISTANCE_INTRO,
  distanceDemands: DISTANCE_DEMANDS,
};

export const TEMPLATES: Readonly<Record<Locale, TemplateSet>> = {
  en: enTemplates,
  es: esTemplates,
  'pt-BR': ptBRTemplates,
  fr: frTemplates,
  de: deTemplates,
  it: itTemplates,
  hi: hiTemplates,
  id: idTemplates,
  ja: jaTemplates,
  ar: arTemplates,
};

/** Variants for a slot in a locale. */
export const variantsFor = (slot: TemplateSlot, locale: Locale): readonly string[] => {
  const set = TEMPLATES[locale];
  const variants = set[slot];
  return variants.length > 0 ? variants : TEMPLATES[DEFAULT_LOCALE][slot];
};
