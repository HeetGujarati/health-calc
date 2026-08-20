/**
 * Rewrites heading ids that are not safe to use as identifiers.
 *
 * Astro slugs a heading by lower-casing it and replacing runs of punctuation
 * with hyphens, keeping every letter it finds. For English that yields
 * `how-this-is-calculated`; for the translated guides it yields
 * `qué-encontraron-los-estudios-de-validación`, `検証研究が見いだしたこと`, and
 * `विभाजन-और-आख़िरी-195-मीटर`.
 *
 * Those are legal HTML5 — the spec allows any id without whitespace — but they
 * are not usable identifiers. A CSS rule or `querySelector` call has to escape
 * them, an id beginning with a digit needs escaping even in ASCII, and a link
 * to one percent-encodes into forty characters of noise when anyone copies it.
 * html-validate flags all of this under `valid-id`, and it is right to.
 *
 * So an id is rewritten only when it is not already `[A-Za-z][A-Za-z0-9_-]*`:
 *
 * - Latin scripts fold to ASCII, which is lossless in practice for a fragment:
 *   `la-excepción-de-katch-mcardle` becomes `la-excepcion-de-katch-mcardle`.
 *   Ligatures and letters with no decomposition are mapped by hand, because
 *   NFD leaves `ß` and `ø` exactly as they were.
 * - Non-Latin scripts keep whatever ASCII the heading contained — a Japanese
 *   heading about Katch-McArdle still anchors at `katch-mcardle` — and fall
 *   back to the heading's ordinal when nothing survives. `section-4` says less
 *   than the heading does, but it is stable across builds, which is what a
 *   fragment has to be.
 * - An id that would start with a digit gets a `section-` prefix rather than
 *   losing the digits: `220から年齢を引くの出どころ` anchors at `section-220`.
 *
 * English and Indonesian pass through untouched, so no existing anchor moves.
 *
 * Register this after `rehypeHeadingIds`, which is what assigns the ids in the
 * first place; user plugins run before Astro's own, so it has to be listed
 * explicitly ahead of this one.
 */

/** Letters NFD does not decompose, and the ASCII they conventionally stand in for. */
const FOLDED = new Map([
  ['ß', 'ss'],
  ['æ', 'ae'],
  ['œ', 'oe'],
  ['ø', 'o'],
  ['đ', 'd'],
  ['ð', 'd'],
  ['þ', 'th'],
  ['ł', 'l'],
  ['ħ', 'h'],
  ['ı', 'i'],
  ['ŋ', 'n'],
  ['ſ', 's'],
]);

const VALID_ID = /^[A-Za-z][A-Za-z0-9_-]*$/;

/** ASCII the id can be expressed as, or `''` when its script has no ASCII form. */
const toAscii = (value) =>
  [...value.toLowerCase()]
    .map((character) => FOLDED.get(character) ?? character)
    .join('')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** The first form of `candidate` not already spoken for on this page. */
const unique = (candidate, taken) => {
  if (!taken.has(candidate)) return candidate;
  let suffix = 2;
  while (taken.has(`${candidate}-${suffix}`)) suffix += 1;
  return `${candidate}-${suffix}`;
};

const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

const headingsOf = (node, found = []) => {
  if (node.type === 'element' && HEADINGS.has(node.tagName)) found.push(node);
  for (const child of node.children ?? []) headingsOf(child, found);
  return found;
};

export const rehypeAsciiHeadingIds = () => (tree) => {
  const headings = headingsOf(tree);
  const taken = new Set(
    headings.map((heading) => heading.properties?.id).filter((id) => typeof id === 'string')
  );

  headings.forEach((heading, index) => {
    const current = heading.properties?.id;
    if (typeof current !== 'string' || VALID_ID.test(current)) return;

    const ascii = toAscii(current);
    const base =
      ascii === ''
        ? `section-${String(index + 1)}`
        : /^[a-z]/.test(ascii)
          ? ascii
          : `section-${ascii}`;

    taken.delete(current);
    const id = unique(base, taken);
    taken.add(id);
    heading.properties.id = id;
  });
};
