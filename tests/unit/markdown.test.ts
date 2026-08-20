import { describe, expect, it } from 'vitest';
import { rehypeAsciiHeadingIds } from '../../src/lib/markdown/ascii-heading-ids.mjs';

/**
 * Heading ids on translated guides.
 *
 * Astro slugs a heading by keeping every letter it finds, which is fine for
 * English and produces `検証研究が見いだしたこと` for Japanese. The rewrite runs at
 * build time over 140 guide files in ten languages, so the cases below are the
 * ones that actually occur in the corpus rather than invented ones — and the
 * invariant every one of them shares is at the bottom: whatever comes out is a
 * usable identifier.
 *
 * A fragment is also a URL that people copy, link and bookmark, so the second
 * thing asserted here is stability: the same heading must produce the same id on
 * every build, and an id that is already fine must not move.
 */

interface HastNode {
  type: string;
  tagName?: string;
  properties: Record<string, unknown>;
  children: HastNode[];
}

const VALID_ID = /^[A-Za-z][A-Za-z0-9_-]*$/;

const heading = (id: string | undefined, tagName = 'h2'): HastNode => ({
  type: 'element',
  tagName,
  properties: id === undefined ? {} : { id },
  children: [],
});

const root = (children: HastNode[]): HastNode => ({ type: 'root', properties: {}, children });

/** Runs the plugin over a document of headings and returns the resulting ids. */
const rewrite = (ids: (string | undefined)[]): (string | undefined)[] => {
  const headings = ids.map((id) => heading(id));
  rehypeAsciiHeadingIds()(root(headings));
  return headings.map((node) => node.properties['id'] as string | undefined);
};

describe('rehypeAsciiHeadingIds', () => {
  it('leaves an id that is already a usable identifier alone', () => {
    // Every English and Indonesian anchor is in this shape. If this test fails,
    // links published against the site have moved.
    expect(rewrite(['how-this-is-calculated', 'faq', 'sources_and_limits', 'Katch'])).toEqual([
      'how-this-is-calculated',
      'faq',
      'sources_and_limits',
      'Katch',
    ]);
  });

  it('folds accented Latin to its ASCII spelling', () => {
    expect(
      rewrite([
        'qué-encontraron-los-estudios-de-validación',
        'la-excepción-de-katch-mcardle',
        'précision-et-marge-derreur',
      ])
    ).toEqual([
      'que-encontraron-los-estudios-de-validacion',
      'la-excepcion-de-katch-mcardle',
      'precision-et-marge-derreur',
    ]);
  });

  it('maps the letters NFD does not decompose', () => {
    // NFD leaves ß, ø, æ and friends exactly as they were, so stripping combining
    // marks alone would drop them and silently shorten the id.
    expect(rewrite(['maß-und-größe', 'øst-og-æble', 'œuvre'])).toEqual([
      'mass-und-grosse',
      'ost-og-aeble',
      'oeuvre',
    ]);
  });

  it('keeps whatever ASCII a non-Latin heading contained', () => {
    // A Japanese heading about Katch-McArdle still anchors at the formula name,
    // which is both stable and readable in a copied link.
    expect(rewrite(['katch-mcardleの例外', 'bmiとは何か'])).toEqual(['katch-mcardle', 'bmi']);
  });

  it('falls back to the heading ordinal when no ASCII survives', () => {
    expect(
      rewrite(['what-this-measures', '検証研究が見いだしたこと', 'विभाजन-और-आख़िरी-मीटर'])
    ).toEqual(['what-this-measures', 'section-2', 'section-3']);
  });

  it('prefixes rather than discards an id that would start with a digit', () => {
    expect(rewrite(['220から年齢を引くの出どころ', '10-000-steps'])).toEqual([
      'section-220',
      'section-10-000-steps',
    ]);
  });

  it('does not collide with an id that is already taken', () => {
    expect(rewrite(['seccion', 'sección', 'seccíon'])).toEqual([
      'seccion',
      'seccion-2',
      'seccion-3',
    ]);
  });

  it('numbers repeated fallbacks by position, so two builds agree', () => {
    const first = rewrite(['検証研究', '検証研究']);
    expect(first).toEqual(['section-1', 'section-2']);
    expect(rewrite(['検証研究', '検証研究'])).toEqual(first);
  });

  it('finds headings anywhere in the tree, not only at the top level', () => {
    const nested = heading('la-excepción');
    const tree = root([
      { type: 'element', tagName: 'section', properties: {}, children: [nested] },
    ]);
    rehypeAsciiHeadingIds()(tree);
    expect(nested.properties['id']).toBe('la-excepcion');
  });

  it('ignores a heading with no id and a non-heading element with one', () => {
    const headings = [heading(undefined), heading('ゼロ')];
    const paragraph: HastNode = {
      type: 'element',
      tagName: 'p',
      properties: { id: 'párrafo' },
      children: [],
    };
    rehypeAsciiHeadingIds()(root([...headings, paragraph]));

    expect(headings[0]?.properties['id']).toBeUndefined();
    expect(headings[1]?.properties['id']).toBe('section-2');
    expect(paragraph.properties['id']).toBe('párrafo');
  });

  it('emits a usable identifier for every heading in every script it ships', () => {
    const ids = rewrite([
      'how-this-is-calculated',
      'qué-encontraron-los-estudios-de-validación',
      'précision',
      'maß-und-größe',
      'perché-il-bmi-è-uno-strumento-di-screening',
      'क्यों-वज़न-बदलता-है',
      '検証研究が見いだしたこと',
      '220から年齢を引くの出どころ',
      'لماذا-يتغير-وزن-الميزان',
      'katch-mcardleの例外',
    ]);

    for (const id of ids) expect(id).toMatch(VALID_ID);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
