import { expect, test } from '@playwright/test';

/**
 * Calculator behaviour, tested against the production build.
 *
 * These cover the scenarios section 13 of the brief names explicitly, plus the
 * safety guards — because a guard that works in a unit test but is unreachable
 * through the interface protects nobody.
 */

/**
 * Clicks a radio whose input is visually hidden.
 *
 * The unit and sex toggles put the input in an sr-only span and style the
 * wrapping label, so the input itself is not actionable. A real user clicks the
 * label, and so does this.
 */
const chooseOption = async (page: import('@playwright/test').Page, label: string) => {
  await page
    .locator('label')
    .filter({ hasText: new RegExp(`^${label}$`) })
    .first()
    .click();
};

test.describe('BMI calculator', () => {
  test('produces the documented value for a known input', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    await page.getByLabel('Height', { exact: true }).fill('175');
    await page.getByLabel('Weight', { exact: true }).fill('70');

    // 70 / 1.75^2 = 22.857, displayed to one decimal.
    const result = page.locator('[data-result]');
    await expect(result).toContainText('22.9');
  });

  test('announces results in a live region without moving focus', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    const result = page.locator('[data-result]');
    await expect(result).toHaveAttribute('aria-live', 'polite');

    const height = page.getByLabel('Height', { exact: true });
    await height.fill('180');
    await page.getByLabel('Weight', { exact: true }).fill('80');
    await expect(result).toContainText('24.7');

    // Typing must not steal focus, or a screen reader user loses their place.
    await height.focus();
    await height.fill('181');
    await expect(height).toBeFocused();
  });

  test('converts imperial input to the same answer', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    await chooseOption(page, 'Imperial');

    await page.getByLabel('Height, feet').fill('5');
    await page.getByLabel('Height, inches').fill('9');
    await page.getByLabel('Weight', { exact: true }).fill('154.324');

    // 5 ft 9 in and 154.324 lb is 175.26 cm and 70 kg, so BMI is about 22.8.
    await expect(page.locator('[data-result]')).toContainText('22.8');
  });

  test('remembers the unit preference across pages', async ({ page }) => {
    await page.goto('/calculators/bmi/');
    await chooseOption(page, 'Imperial');

    await page.goto('/calculators/bmr/');
    await expect(page.getByRole('radio', { name: 'Imperial' })).toBeChecked();
  });

  test('rejects an absurd value with an actionable message', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    await page.getByLabel('Height', { exact: true }).fill('5');
    await page.getByLabel('Weight', { exact: true }).fill('70');

    const result = page.locator('[data-result]');
    // The message must name the accepted range, not just say "invalid".
    await expect(result).toContainText('50');
    await expect(result).toContainText('260');
  });
});

test.describe('safety guards fire in the interface', () => {
  test('the calorie floor triggers and explains itself', async ({ page }) => {
    await page.goto('/calculators/calorie/');

    // A small, sedentary person on the steady-loss preset lands under the floor.
    await chooseOption(page, 'Female');
    await page.getByLabel('Age', { exact: true }).fill('30');
    await page.getByLabel('Height', { exact: true }).fill('155');
    await page.getByLabel('Weight', { exact: true }).fill('50');
    await page.getByLabel('Activity level').selectOption('sedentary');
    await page.getByLabel('Goal', { exact: true }).selectOption('steady_loss');

    const result = page.locator('[data-result]');
    await expect(result).toContainText('1,200');

    // The adjustment has to be explained, not applied silently.
    await expect(result).toContainText(/lowest this site will suggest|deficit has been set/i);
  });

  test('no calorie target is produced under 18', async ({ page }) => {
    await page.goto('/calculators/calorie/');

    await page.getByLabel('Age', { exact: true }).fill('16');
    await page.getByLabel('Height', { exact: true }).fill('170');
    await page.getByLabel('Weight', { exact: true }).fill('60');

    const result = page.locator('[data-result]');
    await expect(result).toContainText(/adults/i);

    // Critically: no number at all, not a number with a warning attached.
    await expect(result.locator('.numeral')).toHaveCount(0);
  });

  test('a goal weight below the healthy band is refused with the range shown', async ({ page }) => {
    await page.goto('/calculators/calorie/');

    await page.getByLabel('Age', { exact: true }).fill('30');
    await page.getByLabel('Height', { exact: true }).fill('180');
    await page.getByLabel('Weight', { exact: true }).fill('80');
    await page.getByLabel('Goal weight (optional)').fill('50');

    const result = page.locator('[data-result]');
    await expect(result).toContainText('18.5');
    await expect(result).toContainText(/healthy/i);
  });

  test('body fat gives no estimate under 18', async ({ page }) => {
    await page.goto('/calculators/body-fat/');

    await page.getByLabel('Age', { exact: true }).fill('15');
    await page.getByLabel('Height', { exact: true }).fill('170');
    await page.getByLabel('Weight', { exact: true }).fill('60');
    await page.getByLabel('Neck', { exact: true }).fill('36');
    await page.getByLabel('Waist', { exact: true }).fill('80');

    await expect(page.locator('[data-result]')).toContainText(/adults/i);
  });
});

test.describe('the Army calculator applies the current standard', () => {
  test('a ratio of exactly 0.550 does not meet the standard', async ({ page }) => {
    await page.goto('/calculators/army-body-fat/');

    // 99 cm at 180 cm is exactly 0.550, and the inequality is strict.
    await page.getByLabel('Height', { exact: true }).fill('180');
    await page.getByLabel('Waist', { exact: true }).fill('99');

    const result = page.locator('[data-result]');
    await expect(result).toContainText('0.550');
    await expect(result).toContainText('No');
  });

  test('just below the boundary passes', async ({ page }) => {
    await page.goto('/calculators/army-body-fat/');

    await page.getByLabel('Height', { exact: true }).fill('180');
    await page.getByLabel('Waist', { exact: true }).fill('98.8');

    await expect(page.locator('[data-result]')).toContainText('Yes');
  });
});

test.describe('keyboard operation', () => {
  test('a calculator can be completed start to finish without a mouse', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    // The skip link is the first focusable element on every page.
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();

    // Tab until the height field has focus, then type.
    const height = page.getByLabel('Height', { exact: true });
    for (let i = 0; i < 25; i += 1) {
      if (await height.evaluate((el) => el === document.activeElement)) break;
      await page.keyboard.press('Tab');
    }
    await expect(height).toBeFocused();

    await page.keyboard.type('175');
    await page.keyboard.press('Tab');
    await page.keyboard.type('70');

    await expect(page.locator('[data-result]')).toContainText('22.9');
  });

  test('focus is visible when reached by keyboard', async ({ page }) => {
    await page.goto('/calculators/bmi/');
    await page.keyboard.press('Tab');

    const outline = await page
      .locator('.skip-link')
      .evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe('none');
  });
});

test.describe('works without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the page is readable and the reference table is intact', async ({ page }) => {
    await page.goto('/calculators/bmi/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // The precomputed table is real content, not rendered by the island.
    const table = page.locator('table').first();
    await expect(table).toBeVisible();
    await expect(table).toContainText('22.9');

    // And the reader is told why the live calculator is inert. Asserted against
    // the served HTML rather than the element's textContent: with scripting
    // disabled the parser does not expose noscript children through the DOM
    // query, even though a real reader sees them rendered.
    expect(await page.content()).toMatch(/Live results need JavaScript/i);
  });

  test('the formula and its citation are present', async ({ page }) => {
    await page.goto('/calculators/bmr/');
    await expect(page.locator('body')).toContainText('Mifflin');
    await expect(page.locator('body')).toContainText('1990');
  });
});
