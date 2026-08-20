import { expect, test } from '@playwright/test';

/**
 * Locale behaviour, tested against the production build.
 *
 * Section 13 of the brief names locale switching and Arabic RTL overflow
 * explicitly. Both are things that look fine in a screenshot of the homepage
 * and break on a deep page, so these run against a calculator page.
 */

test.describe('language switching', () => {
  test('lands on the same page in the new locale, not the homepage', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    const switcher = page.locator('details').filter({ hasText: /en/i }).first();
    await switcher.locator('summary').click();

    await switcher.getByRole('link', { name: 'Español' }).click();

    await expect(page).toHaveURL(/\/es\/calculators\/bmi\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('h1')).toContainText('IMC');
  });

  test('offers every locale a page exists in, and no more', async ({ page }) => {
    // A core page exists in all ten.
    await page.goto('/calculators/bmi/');
    const coreLinks = page.locator('details ul a[hreflang]');
    await expect(coreLinks).toHaveCount(10);

    // An activity outside the priority thirty is English-only, so the switcher
    // must not offer nine links that 404.
    await page.goto('/calories-burned/raking-leaves/');
    await expect(page.locator('details ul a[hreflang]')).toHaveCount(0);
  });

  test('the switcher works with JavaScript disabled', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/calculators/bmi/');

    // A <details> element opens without script, which is why it was chosen for
    // the one control a reader on the wrong language most needs.
    await page.locator('details summary').first().click();
    await expect(page.getByRole('link', { name: '日本語' })).toBeVisible();

    await context.close();
  });
});

test.describe('right to left', () => {
  test('the Arabic build sets dir and does not overflow', async ({ page }) => {
    await page.goto('/ar/calculators/bmi/');

    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
  });

  test('the Arabic calculator still computes', async ({ page }) => {
    await page.goto('/ar/calculators/bmi/');

    await page.getByLabel('الطول', { exact: true }).fill('175');
    await page.getByLabel('الوزن', { exact: true }).fill('70');

    // Arabic uses Western digits in the ar-EG locale data used here, so the
    // same 22.9 appears. If that ever changes this test is the thing that says so.
    await expect(page.locator('[data-result]')).toContainText('22.9');
  });
});

test.describe('hreflang', () => {
  test('a core page advertises all ten locales plus x-default', async ({ page }) => {
    await page.goto('/calculators/bmi/');
    const alternates = page.locator('link[rel="alternate"][hreflang]');
    // Ten locales and one x-default.
    await expect(alternates).toHaveCount(11);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1);
  });

  test('a page outside the priority set advertises only English', async ({ page }) => {
    await page.goto('/calories-burned/raking-leaves/');
    // Self-referencing English plus x-default, and nothing that would 404.
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(2);
  });

  test('the search page is noindex and advertises nothing', async ({ page }) => {
    await page.goto('/es/search/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  });
});

test.describe('locale-aware formatting', () => {
  test('German renders a decimal comma', async ({ page }) => {
    await page.goto('/de/calories-burned/walking/');
    // The walking MET value is 3.8, which is "3,8" in German.
    await expect(page.locator('#step-3')).toContainText('3,8');
  });

  test('each locale fetches its own search index', async ({ page }) => {
    await page.goto('/fr/search/');
    await expect(page.locator('site-search')).toHaveAttribute(
      'data-index-url',
      '/fr/search-index.json'
    );
  });
});
