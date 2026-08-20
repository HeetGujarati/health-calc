import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright runs against the built output served by `astro preview`, not the
 * dev server.
 *
 * That matters: the dev server transforms modules on the fly, so it can pass
 * while the production bundle is broken. These tests exist to catch exactly
 * that, so they test the artefact that ships.
 */

/**
 * 4321 is Astro's default, so any Astro project left running on this machine
 * owns it — including ones that are not this one. Overridable, and never
 * reused: see the `webServer` note below.
 */
const PORT = Number(process.env['PORT'] ?? 4321);
const BASE_URL = `http://localhost:${String(PORT)}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? [['list'], ['html', { open: 'never' }]] : 'list',

  use: {
    baseURL: BASE_URL,
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
    url: BASE_URL,
    env: { PORT: String(PORT) },

    /*
     * Never reuse whatever is already on the port, in CI or locally.
     *
     * Playwright cannot tell whose server answered — it asks for the URL and
     * takes a 200 as proof of life. An unrelated Astro dev server on 4321 is
     * therefore adopted as the thing under test, and since it serves its own
     * `/` and 404s everything else, the suite reports dozens of "element not
     * found" failures about a site it never loaded. That happened, and it cost
     * more time to diagnose than starting a server ever costs: this one binds
     * in under a second.
     *
     * With reuse off, an occupied port is a startup error naming the port,
     * which is the truth. Set `PORT` to run beside something else.
     */
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
