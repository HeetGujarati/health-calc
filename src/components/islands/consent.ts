/**
 * Consent mechanism.
 *
 * Only loaded when advertising or analytics is enabled — while both are off,
 * this file is never imported and never ships.
 *
 * The important property is ordering: no gated script loads until a choice
 * exists. Recording a choice after the scripts have already run is what most
 * banners do, and it is not consent.
 *
 * The stored choice is treated as untrusted, like every other stored value on
 * this site: validated against a known set, and every access wrapped because
 * localStorage throws outright in Safari's private mode.
 */

const STORAGE_KEY = 'consent';
const CHOICES = ['accepted', 'rejected'] as const;
type Choice = (typeof CHOICES)[number];

const isChoice = (value: unknown): value is Choice =>
  typeof value === 'string' && (CHOICES as readonly string[]).includes(value);

const readChoice = (): Choice | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isChoice(stored) ? stored : null;
  } catch {
    return null;
  }
};

const writeChoice = (choice: Choice): void => {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* Cannot persist. The banner reappears next visit, which is the safe default. */
  }
};

/**
 * Loads the scripts a reader has consented to.
 *
 * Deliberately empty. Nothing is wired up because nothing is enabled, and a
 * placeholder that loads a real provider "for testing" is how a site ends up
 * shipping a tracker it did not mean to. When a provider is chosen, it mounts
 * here and nowhere else — so there is exactly one place where a third-party
 * script can enter the page.
 */
const loadConsentedScripts = (): void => {
  // Intentionally no-op until a provider is configured. See DEPLOY.md.
};

class ConsentBanner extends HTMLElement {
  connectedCallback(): void {
    const existing = readChoice();

    if (existing === 'accepted') {
      loadConsentedScripts();
      return;
    }
    if (existing === 'rejected') return;

    // No choice recorded: show the banner and load nothing until there is one.
    this.hidden = false;

    this.querySelector('[data-consent="accept"]')?.addEventListener('click', () => {
      writeChoice('accepted');
      this.hidden = true;
      loadConsentedScripts();
    });

    this.querySelector('[data-consent="reject"]')?.addEventListener('click', () => {
      writeChoice('rejected');
      this.hidden = true;
    });
  }
}

if (!customElements.get('consent-banner')) {
  customElements.define('consent-banner', ConsentBanner);
}

// Marks this file as a module. Without it TypeScript treats a file with no
// imports as a global script, and its top-level constants collide with those
// in the other islands.
export {};
