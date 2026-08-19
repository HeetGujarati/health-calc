/**
 * Theme toggle.
 *
 * A vanilla custom element — no framework, per the brief's stack constraints.
 * It enhances markup that already works: the button is rendered server-side
 * with a label, so with JavaScript disabled the page still renders in the
 * reader's system theme and nothing appears broken. Only the ability to
 * override that is lost.
 *
 * Storage is treated as untrusted on both read and write: the value is
 * validated against the known set, and every access is wrapped because
 * localStorage throws rather than returning null in Safari's private mode.
 */

const STORAGE_KEY = 'theme';
const THEMES = ['light', 'dark'] as const;
type Theme = (typeof THEMES)[number];

const isTheme = (value: unknown): value is Theme =>
  typeof value === 'string' && (THEMES as readonly string[]).includes(value);

const readStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
};

const writeStoredTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Preference cannot persist; the toggle still works for this page view. */
  }
};

/** The theme actually in effect, whether chosen or inherited from the system. */
const activeTheme = (): Theme => {
  const stored = readStoredTheme();
  if (stored !== null) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

class ThemeToggle extends HTMLElement {
  #button: HTMLButtonElement | null = null;

  connectedCallback(): void {
    this.#button = this.querySelector('button');
    if (this.#button === null) return;

    this.#sync(activeTheme());
    this.#button.addEventListener('click', this.#onClick);
  }

  disconnectedCallback(): void {
    this.#button?.removeEventListener('click', this.#onClick);
  }

  #onClick = (): void => {
    const next: Theme = activeTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    writeStoredTheme(next);
    this.#sync(next);
  };

  /**
   * Reflects state on the button.
   *
   * aria-pressed carries the state rather than the label changing, so a screen
   * reader announces "dark theme, pressed" instead of the label shifting under
   * the user between "switch to dark" and "switch to light" — which reads as
   * the control moving rather than toggling.
   */
  #sync(theme: Theme): void {
    this.#button?.setAttribute('aria-pressed', String(theme === 'dark'));
  }
}

if (!customElements.get('theme-toggle')) {
  customElements.define('theme-toggle', ThemeToggle);
}

// Marks this file as a module. Without it TypeScript treats a file with no
// imports as a global script, and its top-level constants collide with those
// in the other islands.
export {};
