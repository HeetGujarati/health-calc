import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * WCAG contrast verification.
 *
 * Parses the real `tokens.css` rather than a copy of the palette. A test that
 * asserted against duplicated constants would pass happily while the shipped
 * stylesheet drifted, which is precisely the failure it exists to prevent.
 *
 * Ratios are computed from the WCAG 2.x relative luminance definition.
 */

const tokensPath = fileURLToPath(new URL('../../src/styles/tokens.css', import.meta.url));
const css = readFileSync(tokensPath, 'utf8');

/**
 * Extracts the custom properties from a specific rule block.
 *
 * Matches the selector then takes everything up to the closing brace, so the
 * light block and the two dark blocks are read independently.
 */
const extractBlock = (selector: string): Record<string, string> => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`).exec(css);
  if (match === null) throw new Error(`No rule block found for selector: ${selector}`);

  const declarations: Record<string, string> = {};
  const body = match[1] ?? '';
  for (const [, name, value] of body.matchAll(/(--c-[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
    if (name !== undefined && value !== undefined) declarations[name] = value;
  }
  return declarations;
};

const light = extractBlock(':root');
const dark = extractBlock(":root[data-theme='dark']");

const channels = (hex: string): [number, number, number] => {
  const normalised = hex.replace('#', '');
  const expanded =
    normalised.length === 3
      ? normalised
          .split('')
          .map((c) => c + c)
          .join('')
      : normalised;
  return [0, 2, 4].map((i) => parseInt(expanded.slice(i, i + 2), 16) / 255) as [
    number,
    number,
    number,
  ];
};

const relativeLuminance = (hex: string): number => {
  const [r, g, b] = channels(hex).map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
  ) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (a: string, b: string): number => {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (hi + 0.05) / (lo + 0.05);
};

/** WCAG 2.2 AA, rule 1.4.3: normal-size text. */
const AA_TEXT = 4.5;
/** WCAG 2.2 AA, rule 1.4.11: UI component boundaries and graphical objects. */
const AA_NON_TEXT = 3;

const surfaces = ['--c-paper', '--c-raised'] as const;
const textTokens = ['--c-ink', '--c-graphite', '--c-signal', '--c-caution'] as const;

describe.each([
  ['light', light],
  ['dark', dark],
])('%s theme', (themeName, palette) => {
  it('defines every token the theme needs', () => {
    for (const token of [...surfaces, ...textTokens, '--c-rule', '--c-edge']) {
      expect(palette[token], `${themeName} is missing ${token}`).toBeDefined();
    }
  });

  it.each(textTokens)('%s meets 4.5:1 against every surface', (token) => {
    for (const surface of surfaces) {
      const ratio = contrastRatio(palette[token]!, palette[surface]!);
      expect(
        ratio,
        `${themeName}: ${token} on ${surface} is ${ratio.toFixed(2)}:1`
      ).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });

  it('gives interactive borders 3:1 against every surface', () => {
    // --c-edge exists precisely because --c-rule cannot meet this. An input
    // border is how a user knows where the control is, so rule 1.4.11 applies.
    for (const surface of surfaces) {
      const ratio = contrastRatio(palette['--c-edge']!, palette[surface]!);
      expect(
        ratio,
        `${themeName}: --c-edge on ${surface} is ${ratio.toFixed(2)}:1`
      ).toBeGreaterThanOrEqual(AA_NON_TEXT);
    }
  });

  it('gives the focus ring 3:1 against every surface', () => {
    for (const surface of surfaces) {
      expect(contrastRatio(palette['--c-signal']!, palette[surface]!)).toBeGreaterThanOrEqual(
        AA_NON_TEXT
      );
    }
  });

  it('keeps caution legible on its own surface', () => {
    const ratio = contrastRatio(palette['--c-caution']!, palette['--c-caution-surface']!);
    expect(
      ratio,
      `${themeName}: caution on its surface is ${ratio.toFixed(2)}:1`
    ).toBeGreaterThanOrEqual(AA_TEXT);
  });
});

describe('palette structure', () => {
  it('keeps the two dark blocks identical', () => {
    // The media-query block and the explicit data-theme block must define the
    // same values, or the manual toggle would render a different dark theme
    // from the one the system preference produces.
    const mediaDark = extractBlock(":root:not([data-theme='light'])");
    expect(mediaDark).toEqual(dark);
  });

  it('inverts the surface and text relationship between themes', () => {
    // A sanity check that dark mode is genuinely dark, rather than a palette
    // that was edited in one place and not the other.
    expect(relativeLuminance(dark['--c-paper']!)).toBeLessThan(
      relativeLuminance(light['--c-paper']!)
    );
    expect(relativeLuminance(dark['--c-ink']!)).toBeGreaterThan(
      relativeLuminance(light['--c-ink']!)
    );
  });

  it('matches the theme-color values declared in site config', async () => {
    // The browser chrome colour must match the page surface, or the two band
    // against each other at the top of the viewport.
    const { SITE } = await import('../../src/config/site');
    expect(SITE.themeColor.light.toLowerCase()).toBe(light['--c-paper']?.toLowerCase());
    expect(SITE.themeColor.dark.toLowerCase()).toBe(dark['--c-paper']?.toLowerCase());
  });
});
