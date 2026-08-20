/**
 * Client-side search.
 *
 * The homepage declares a SearchAction in its structured data pointing at
 * /search/?q=, and Google's policies require a declared SearchAction to
 * actually work — so this has to be real, not decorative.
 *
 * The index is fetched once, on demand, from a static JSON file. Nothing is
 * sent anywhere: there is no search backend, and the query never leaves the
 * browser.
 *
 * Results are built with createElement and textContent. No innerHTML, so a
 * query string can never be interpreted as markup — which matters here more
 * than anywhere else on the site, because this is the one page that renders
 * user input back to the reader.
 */

interface SearchDocument {
  readonly t: string;
  readonly d: string;
  readonly u: string;
  readonly k: string;
  readonly c: 'calculator' | 'guide' | 'page';
}

/**
 * Copy comes from data attributes on the host element, filled in by the page in
 * the reader's locale. Bundling a ten-locale catalog into the island would cost
 * every reader the bytes for nine languages they cannot read, and this is the
 * only page-specific script on the site.
 */
const attr = (host: HTMLElement, name: string, fallback: string): string =>
  host.dataset[name] ?? fallback;

/** Queries longer than this are truncated before use. */
const MAX_QUERY_LENGTH = 64;
const MAX_RESULTS = 20;

const normalise = (value: string): string => value.toLowerCase().trim();

/**
 * Scores a document against the query terms.
 *
 * A title match outranks a keyword match, which outranks a description match.
 * Every term must appear somewhere, so a two-word query narrows rather than
 * widens — which is what people expect from a search box even though it is not
 * how a naive OR match behaves.
 */
const score = (doc: SearchDocument, terms: readonly string[]): number => {
  const title = normalise(doc.t);
  const keywords = normalise(doc.k);
  const description = normalise(doc.d);

  let total = 0;
  for (const term of terms) {
    if (title.startsWith(term)) total += 12;
    else if (title.includes(term)) total += 8;
    else if (keywords.includes(term)) total += 4;
    else if (description.includes(term)) total += 2;
    else return 0;
  }

  // Calculators rank above prose for the same match strength: someone typing
  // "bmi" on a calculator site wants the calculator.
  if (doc.c === 'calculator') total += 3;

  return total;
};

class SiteSearch extends HTMLElement {
  #input: HTMLInputElement | null = null;
  #results: HTMLElement | null = null;
  #status: HTMLElement | null = null;
  #documents: readonly SearchDocument[] | null = null;
  #loading = false;
  #labels: Record<SearchDocument['c'], string> = {
    calculator: 'Calculator',
    guide: 'Guide',
    page: 'Page',
  };
  #indexUrl = '/search-index.json';

  connectedCallback(): void {
    this.#indexUrl = attr(this, 'indexUrl', this.#indexUrl);
    this.#labels = {
      calculator: attr(this, 'labelCalculator', 'Calculator'),
      guide: attr(this, 'labelGuide', 'Guide'),
      page: attr(this, 'labelPage', 'Page'),
    };

    this.#input = this.querySelector('input[type="search"]');
    this.#results = this.querySelector('[data-search-results]');
    this.#status = this.querySelector('[data-search-status]');

    if (this.#input === null || this.#results === null) return;

    this.#input.addEventListener('input', this.#onInput);
    this.querySelector('form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      void this.#run();
    });

    // Run any query already in the address bar, so a shared or bookmarked
    // search URL works and the declared SearchAction behaves as advertised.
    const initial = this.#queryFromUrl();
    if (initial !== '') {
      this.#input.value = initial;
      void this.#run();
    }
  }

  #queryFromUrl(): string {
    try {
      return (new URLSearchParams(window.location.search).get('q') ?? '').slice(
        0,
        MAX_QUERY_LENGTH
      );
    } catch {
      return '';
    }
  }

  #onInput = (): void => {
    void this.#run();
  };

  async #load(): Promise<readonly SearchDocument[]> {
    if (this.#documents !== null) return this.#documents;
    if (this.#loading) return [];
    this.#loading = true;

    try {
      const response = await fetch(this.#indexUrl);
      if (!response.ok) throw new Error(`Index request failed: ${String(response.status)}`);
      this.#documents = (await response.json()) as readonly SearchDocument[];
      return this.#documents;
    } catch {
      this.#setStatus(attr(this, 'unavailable', 'Search is unavailable.'));
      return [];
    } finally {
      this.#loading = false;
    }
  }

  async #run(): Promise<void> {
    const raw = this.#input?.value ?? '';
    const query = normalise(raw).slice(0, MAX_QUERY_LENGTH);

    // Keep the address bar in step so a result set can be shared or bookmarked.
    this.#syncUrl(query);

    if (query === '') {
      this.#results?.replaceChildren();
      this.#setStatus('');
      return;
    }

    const documents = await this.#load();
    const terms = query.split(/\s+/).filter((term) => term !== '');

    const matches = documents
      .map((doc) => ({ doc, value: score(doc, terms) }))
      .filter((entry) => entry.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, MAX_RESULTS);

    this.#render(
      matches.map((entry) => entry.doc),
      query
    );
  }

  #syncUrl(query: string): void {
    try {
      const url = new URL(window.location.href);
      if (query === '') url.searchParams.delete('q');
      else url.searchParams.set('q', query);
      window.history.replaceState({}, '', url);
    } catch {
      /* History API unavailable; search still works. */
    }
  }

  #setStatus(message: string): void {
    if (this.#status !== null) this.#status.textContent = message;
  }

  #render(documents: readonly SearchDocument[], query: string): void {
    const results = this.#results;
    if (results === null) return;

    results.replaceChildren();

    if (documents.length === 0) {
      this.#setStatus(
        attr(this, 'noResults', 'No results for "{query}".').replace('{query}', query)
      );
      return;
    }

    const template =
      documents.length === 1
        ? attr(this, 'resultCountOne', '1 result for "{query}".')
        : attr(this, 'resultCount', '{count} results for "{query}".');
    this.#setStatus(
      template.replace('{count}', String(documents.length)).replace('{query}', query)
    );

    const list = document.createElement('ul');
    list.className = 'mt-6 list-none space-y-6 p-0';

    for (const doc of documents) {
      const item = document.createElement('li');
      item.className = 'border-b border-rule pb-6';

      const link = document.createElement('a');
      link.href = doc.u;
      link.className =
        'font-display text-lg font-semibold text-ink no-underline hover:text-signal hover:underline';
      link.textContent = doc.t;

      const type = document.createElement('span');
      type.className = 'ms-2 align-middle text-xs font-normal text-graphite';
      type.textContent = this.#labels[doc.c];

      const heading = document.createElement('p');
      heading.className = 'm-0';
      heading.append(link, type);

      const description = document.createElement('p');
      description.className = 'mt-2 max-w-[var(--measure)] text-base text-graphite';
      description.textContent = doc.d;

      item.append(heading, description);
      list.append(item);
    }

    results.append(list);
  }
}

if (!customElements.get('site-search')) {
  customElements.define('site-search', SiteSearch);
}
