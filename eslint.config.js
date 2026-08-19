import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

/**
 * The banned-API rules below are a hard security requirement, not style.
 * See SECURITY.md: this is a static site whose only untrusted inputs are URL
 * query params and localStorage, so the realistic XSS vector is an HTML sink.
 * Removing the sinks entirely is what lets the CSP stay free of 'unsafe-inline'.
 */
const bannedHtmlSinks = {
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-new-func': 'error',
  'no-script-url': 'error',
  'no-restricted-properties': [
    'error',
    {
      property: 'innerHTML',
      message: 'innerHTML is banned (XSS sink). Use textContent or build nodes with the DOM API.',
    },
    {
      property: 'outerHTML',
      message: 'outerHTML is banned (XSS sink). Use textContent or build nodes with the DOM API.',
    },
    {
      property: 'insertAdjacentHTML',
      message: 'insertAdjacentHTML is banned (XSS sink). Use insertAdjacentElement or DOM nodes.',
    },
  ],
  'no-restricted-syntax': [
    'error',
    {
      selector:
        'CallExpression[callee.name=/^(setTimeout|setInterval)$/] > Literal:first-child[value=/.+/]',
      message: 'String-argument setTimeout/setInterval is an implied eval. Pass a function.',
    },
    {
      selector: "CallExpression[callee.property.name='write'][callee.object.name='document']",
      message: 'document.write is banned.',
    },
  ],
};

export default defineConfig([
  globalIgnores([
    'dist/**',
    '.astro/**',
    'node_modules/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    '.lighthouseci/**',
  ]),

  // Baseline for every file type.
  {
    ...js.configs.recommended,
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    rules: { ...bannedHtmlSinks, eqeqeq: ['error', 'always'] },
  },

  /**
   * Type-aware linting is scoped to .ts only. astro-eslint-parser does not
   * support `projectService`, and pointing type-aware rules at .astro files
   * makes it fall back to `project: true` with a warning on every run.
   * .astro frontmatter is type-checked by `astro check` instead, which
   * understands the component model properly.
   */
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: false, allowNullish: false },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },

  {
    files: ['**/*.astro'],
    extends: [astro.configs.recommended],
    rules: {
      // The sole exception is the JSON-LD component, which is granted a targeted
      // override in its own file because it emits JSON.stringify output only.
      'astro/no-set-html-directive': 'error',
    },
  },

  {
    // Build scripts and config run in Node and legitimately log to stdout.
    files: ['scripts/**/*.{ts,js,mjs}', '*.config.{ts,js,mjs}'],
    rules: { 'no-console': 'off' },
  },

  {
    files: ['**/*.test.ts', 'tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  },
]);
