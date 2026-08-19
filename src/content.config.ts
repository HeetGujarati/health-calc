import { defineCollection } from 'astro:content';
// Astro 7 deprecates the `z` re-export from astro:content.
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Content collections.
 *
 * zod runs here at build time only, where bundle size does not matter — the
 * client path uses hand-written guards instead, so zod never ships to the
 * browser. See DECISIONS.md.
 *
 * The schema is strict on purpose: a guide missing its description or dates
 * fails the build rather than producing a page with an empty meta description
 * and no Article timestamps.
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().min(10).max(80),
    /**
     * Optional shorter title for the <title> tag.
     *
     * A good H1 is often longer than the 60 characters a search result shows.
     * Rather than truncating the heading, a guide can carry both.
     */
    metaTitle: z.string().min(10).max(49).optional(),
    /**
     * Capped at 157 so the metadata builder's truncation never fires on a
     * guide — a description cut mid-sentence reads worse than one written to
     * fit.
     */
    description: z.string().min(50).max(157),
    keywords: z.array(z.string()).min(1).max(8),
    /**
     * Coerced rather than string-matched: YAML parses an unquoted 2026-08-20
     * as a Date, so a string schema rejects the natural way to write a date in
     * frontmatter. Coercion accepts both forms.
     */
    published: z.coerce.date(),
    updated: z.coerce.date(),
    /** Calculator slugs this guide should link to. Validated against the registry. */
    relatedCalculators: z.array(z.string()).min(1).max(6),
    /** Other guide slugs. */
    relatedGuides: z.array(z.string()).max(3).default([]),
    /** Roughly how long the guide is, used for the hub listing. */
    readingMinutes: z.number().int().min(3).max(12),
  }),
});

export const collections = { guides };
