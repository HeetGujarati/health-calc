import { computeFor } from '../../lib/calculators/registry';
import type { CalculatorResult, FormValues } from '../../lib/calculators/result';

/**
 * The calculator island.
 *
 * Progressive enhancement, strictly: the server renders the form, the reference
 * table and the disclaimer. This adds live results. With JavaScript disabled
 * the page is still a complete, useful reference page — which is what section 7
 * requires, and why the reference tables are precomputed rather than rendered
 * here.
 *
 * No innerHTML anywhere. Result rows are built with createElement and
 * textContent, so a value can never be interpreted as markup. That is enforced
 * by the ESLint ban rather than left to discipline.
 */

const UNIT_STORAGE_KEY = 'units';
const UNIT_SYSTEMS = ['metric', 'imperial'] as const;
type UnitSystem = (typeof UNIT_SYSTEMS)[number];

const isUnitSystem = (value: unknown): value is UnitSystem =>
  typeof value === 'string' && (UNIT_SYSTEMS as readonly string[]).includes(value);

/** Stored values are untrusted: validated on read, and access is wrapped. */
const readStoredUnits = (): UnitSystem | null => {
  try {
    const stored = localStorage.getItem(UNIT_STORAGE_KEY);
    return isUnitSystem(stored) ? stored : null;
  } catch {
    return null;
  }
};

const writeStoredUnits = (units: UnitSystem): void => {
  try {
    localStorage.setItem(UNIT_STORAGE_KEY, units);
  } catch {
    /* Preference cannot persist; the toggle still works for this page view. */
  }
};

/**
 * Reads prefilled state from the query string.
 *
 * Every value is length-capped before it goes anywhere near a form field. The
 * compute layer validates and clamps each one properly, so this only has to
 * stop an absurdly long string being written into the DOM in the first place.
 */
const MAX_PARAM_LENGTH = 32;

const readQueryPrefill = (): FormValues => {
  const values: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of params) {
      if (key.length > MAX_PARAM_LENGTH) continue;
      values[key] = value.slice(0, MAX_PARAM_LENGTH);
    }
  } catch {
    /* Malformed query string; fall back to the form defaults. */
  }
  return values;
};

class CalculatorWidget extends HTMLElement {
  #form: HTMLFormElement | null = null;
  #output: HTMLElement | null = null;
  #slug = '';
  #locale = 'en';

  connectedCallback(): void {
    this.#slug = this.dataset['calculator'] ?? '';
    this.#locale = document.documentElement.lang || 'en';
    this.#form = this.querySelector('form');
    this.#output = this.querySelector('[data-result]');

    if (this.#form === null || this.#output === null) return;

    this.#applyStoredUnits();
    this.#applyQueryPrefill();

    this.#form.addEventListener('input', this.#onChange);
    this.#form.addEventListener('change', this.#onChange);
    // The form does nothing on submit: results are live. Preventing default
    // stops Enter from reloading the page and discarding the entered values.
    this.#form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#recompute();
    });

    this.#syncConditionalFields();
    this.#syncUnitLabels();
    this.#recompute();
  }

  #onChange = (event: Event): void => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.name === 'units') {
      if (isUnitSystem(target.value)) writeStoredUnits(target.value);
      this.#syncUnitLabels();
    }
    this.#syncConditionalFields();
    this.#recompute();
  };

  /** Restores the persisted unit preference before the first calculation. */
  #applyStoredUnits(): void {
    const stored = readStoredUnits();
    if (stored === null || this.#form === null) return;
    const radio = this.#form.querySelector<HTMLInputElement>(
      `input[name="units"][value="${stored}"]`
    );
    if (radio !== null) radio.checked = true;
  }

  /** Fills fields named in the query string, so a result can be shared. */
  #applyQueryPrefill(): void {
    if (this.#form === null) return;
    const prefill = readQueryPrefill();

    for (const [name, value] of Object.entries(prefill)) {
      const field = this.#form.elements.namedItem(name);
      if (field instanceof HTMLInputElement) {
        if (field.type === 'radio') {
          const match = this.#form.querySelector<HTMLInputElement>(
            `input[name="${name}"][value="${CSS.escape(value)}"]`
          );
          if (match !== null) match.checked = true;
        } else {
          field.value = value;
        }
      } else if (field instanceof HTMLSelectElement) {
        field.value = value;
      }
    }
  }

  /** Shows or hides fields that only apply to certain method choices. */
  #syncConditionalFields(): void {
    if (this.#form === null) return;
    const values = this.#readValues();

    for (const group of this.querySelectorAll<HTMLElement>('[data-show-when-field]')) {
      const field = group.dataset['showWhenField'];
      const equals = (group.dataset['showWhenEquals'] ?? '').split('|');
      if (field === undefined) continue;
      const visible = equals.includes(values[field] ?? '');
      group.hidden = !visible;
      // Hidden fields must not be submitted or validated.
      for (const input of group.querySelectorAll<HTMLInputElement>('input, select')) {
        input.disabled = !visible;
      }
    }
  }

  /** Swaps the unit suffix beside each field when the system changes. */
  #syncUnitLabels(): void {
    const units = this.#readValues()['units'] === 'imperial' ? 'imperial' : 'metric';
    for (const element of this.querySelectorAll<HTMLElement>('[data-unit-metric]')) {
      const label =
        units === 'imperial' ? element.dataset['unitImperial'] : element.dataset['unitMetric'];
      element.textContent = label ?? '';
    }
    for (const group of this.querySelectorAll<HTMLElement>('[data-units-only]')) {
      const visible = group.dataset['unitsOnly'] === units;
      group.hidden = !visible;
      for (const input of group.querySelectorAll<HTMLInputElement>('input, select')) {
        input.disabled = !visible;
      }
    }
  }

  #readValues(): FormValues {
    if (this.#form === null) return {};
    const values: Record<string, string> = {};
    for (const [key, value] of new FormData(this.#form)) {
      if (typeof value === 'string') values[key] = value;
    }
    return values;
  }

  #recompute(): void {
    if (this.#output === null) return;
    const compute = computeFor(this.#slug);
    if (compute === null) return;
    this.#render(compute(this.#readValues(), this.#locale));
  }

  /**
   * Renders a result.
   *
   * The output region carries aria-live="polite" in the server-rendered markup,
   * so a screen reader announces the new figure without stealing focus from the
   * field being typed into.
   */
  #render(result: CalculatorResult): void {
    const output = this.#output;
    if (output === null) return;

    output.replaceChildren();

    if (!result.ok) {
      // An incomplete form is the normal state on first load, not an error, so
      // nothing is announced until the user has actually entered something.
      const hasInput = Object.values(this.#readValues()).some(
        (value) => value.trim() !== '' && value !== 'metric' && value !== 'imperial'
      );
      if (!hasInput) return;

      const message = document.createElement('p');
      message.className = 'text-base text-caution';
      message.textContent = result.error.message;
      output.append(message);
      return;
    }

    const primary = document.createElement('p');
    primary.className = 'numeral text-signal';
    primary.style.fontSize = 'var(--text-result)';
    primary.style.lineHeight = '1';
    primary.style.letterSpacing = '-0.03em';
    primary.textContent = result.primary.unit
      ? `${result.primary.value} ${result.primary.unit}`
      : result.primary.value;
    output.append(primary);

    const summary = document.createElement('p');
    summary.className = 'mt-3 max-w-[var(--measure)] text-base';
    summary.textContent = result.summary;
    output.append(summary);

    if (result.secondary.length > 0) {
      const list = document.createElement('dl');
      list.className = 'mt-6 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-t border-rule pt-4';
      for (const entry of result.secondary) {
        const term = document.createElement('dt');
        term.className = 'text-xs text-graphite';
        term.textContent = entry.label;

        const value = document.createElement('dd');
        value.className = 'numeral m-0 text-right text-base';
        value.textContent = entry.unit ? `${entry.value} ${entry.unit}` : entry.value;

        list.append(term, value);
      }
      output.append(list);
    }

    for (const note of result.notes) {
      const element = document.createElement('p');
      element.className =
        note.tone === 'caution'
          ? 'mt-4 max-w-[var(--measure)] rounded-md border border-caution/40 bg-caution-surface p-3 text-xs text-caution'
          : 'mt-4 max-w-[var(--measure)] text-xs text-graphite';
      element.textContent = note.text;
      output.append(element);
    }
  }
}

if (!customElements.get('calculator-widget')) {
  customElements.define('calculator-widget', CalculatorWidget);
}
