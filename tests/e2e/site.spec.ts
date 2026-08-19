import { expect, test } from '@playwright/test';

/**
 * Sitewide behaviour: theme, search, structured data, 404, and the accessibility
 * checks that can only be made against a rendered page.
 */

test.describe('theme', () => {
  test('the toggle switches theme and persists the choice', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: /dark theme/i });
    await toggle.click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('no flash of the wrong theme on load', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /dark theme/i }).click();

    // The theme script runs before paint, so the attribute is present as soon
    // as the document is available rather than after hydration.
    await page.goto('/calculators/bmi/');
    const themeAtLoad = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(themeAtLoad).toBe('dark');
  });
});

test.describe('search', () => {
  test('the declared SearchAction URL actually works', async ({ page }) => {
    // The homepage advertises /search/?q= in its structured data, so this URL
    // has to return results rather than an empty page.
    await page.goto('/search/?q=bmi');

    const results = page.locator('[data-search-results]');
    await expect(results.getByRole('link').first()).toBeVisible();
    await expect(results).toContainText(/BMI/i);
  });

  test('typing filters results and updates the address bar', async ({ page }) => {
    await page.goto('/search/');

    await page.getByLabel('Search calculators and guides').fill('protein');
    await expect(page.locator('[data-search-results]')).toContainText(/protein/i);
    await expect(page).toHaveURL(/q=protein/);
  });

  test('a query with markup is rendered as text, never as HTML', async ({ page }) => {
    await page.goto('/search/');

    await page.getByLabel('Search calculators and guides').fill('<img src=x onerror=alert(1)>');

    // No element may be created from the query. The status line reports no
    // results, and nothing is injected.
    await expect(page.locator('[data-search-status]')).toContainText(/no results/i);
    await expect(page.locator('[data-search-results] img')).toHaveCount(0);
  });

  test('is excluded from the index', async ({ page }) => {
    await page.goto('/search/');
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /noindex/);
  });

  test('the full directory is present without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/search/');

    await expect(page.getByRole('heading', { name: 'Or browse everything' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'BMI calculator' })).toBeVisible();

    await context.close();
  });
});

test.describe('structured data', () => {
  test('a calculator page emits parseable JSON-LD with no fabricated rating', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length).toBeGreaterThan(0);

    interface LdNode {
      '@type': string;
      aggregateRating?: unknown;
    }
    const parsed: LdNode[] = blocks.flatMap((raw) => {
      const value = JSON.parse(raw) as LdNode | LdNode[];
      return Array.isArray(value) ? value : [value];
    });

    const types = parsed.map((node) => node['@type']);
    expect(types).toContain('SoftwareApplication');
    expect(types).toContain('HowTo');
    expect(types).toContain('FAQPage');
    expect(types).toContain('BreadcrumbList');

    for (const node of parsed) {
      expect(node.aggregateRating).toBeUndefined();
    }
  });

  test('every HowTo step anchor resolves in the DOM', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    interface HowToNode {
      '@type': string;
      step?: { url: string }[];
    }
    const nodes: HowToNode[] = blocks.flatMap((raw) => {
      const value = JSON.parse(raw) as HowToNode | HowToNode[];
      return Array.isArray(value) ? value : [value];
    });

    const howTo = nodes.find((node) => node['@type'] === 'HowTo');
    expect(howTo).toBeDefined();

    for (const step of howTo?.step ?? []) {
      const fragment = step.url.split('#')[1];
      expect(fragment).toBeTruthy();
      await expect(page.locator(`#${fragment ?? ''}`)).toHaveCount(1);
    }
  });
});

test.describe('page structure', () => {
  const pages = [
    '/',
    '/calculators/',
    '/calculators/bmi/',
    '/guides/',
    '/guides/how-bmr-is-calculated/',
    '/charts/',
    '/charts/bmi-chart/',
    '/calories-burned/walking/',
    '/one-rep-max/bench-press/',
    '/pace/5k/',
    '/about/',
  ];

  for (const path of pages) {
    test(`${path} has one h1, a canonical and a skip link`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('.skip-link')).toHaveCount(1);
      await expect(page.locator('main#main')).toHaveCount(1);
    });
  }

  test('the 404 page renders', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist/');
    // astro preview returns 404 with the custom page body.
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

test.describe('the calculator is usable above the fold on a phone', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) !== 360, 'mobile-360 project only');

  test('inputs and the result are both above the fold', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    const height = page.getByLabel('Height', { exact: true });
    await expect(height).toBeVisible();

    const inputBox = await height.boundingBox();
    expect(inputBox?.y ?? Infinity).toBeLessThan(740);

    // The number is what the page exists to show, so it has to be visible
    // without scrolling once the inputs are filled — not merely present.
    await height.fill('175');
    await page.getByLabel('Weight', { exact: true }).fill('70');

    const numeral = page.locator('[data-result] .numeral').first();
    await expect(numeral).toContainText('22.9');

    const resultBox = await numeral.boundingBox();
    expect(resultBox?.y ?? Infinity).toBeLessThan(740);
  });

  test('nothing overflows horizontally', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
