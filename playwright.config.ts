import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright runs against the built output served by `astro preview`, not the
 * dev server.
 *
 * That matters: the dev server transforms modules on the fly, so it can pass
 * while the production bundle is broken. These tests exist to catch exactly
 * that, so they test the artefact that ships.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? [['list'], ['html', { open: 'never' }]] : 'list',

  use: {
    baseURL: 'http://localhost:4321',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // The brief requires the calculator to be usable above the fold on a
      // 360px phone, so one project runs at exactly that width.
      name: 'mobile-360',
      use: { ...devices['Desktop Chrome'], viewport: { width: 360, height: 740 } },
    },
  ],

  webServer: {
    // A small static server rather than `astro preview`: Astro 7 daemonises the
    // preview server and returns immediately, so Playwright sees the process
    // exit and gives up before any test runs.
    command: 'npm run serve',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
  },
});
