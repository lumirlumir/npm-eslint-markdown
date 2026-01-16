import { defineConfig, globalIgnores } from 'eslint/config';
import bananass from 'eslint-config-bananass';
import md from 'eslint-markdown';

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
  globalIgnores(['**/build/', '**/coverage/', '**/.vitepress/cache/'], 'global/ignores'),

  bananass.configs.js,
  bananass.configs.ts,
  bananass.configs.json,
  bananass.configs.jsonc,
  bananass.configs.json5,
  md.configs.recommended,
  md.configs.stylistic,

  {
    name: 'md/global',
    files: ['**/*.md'],
    rules: {
      'md/allow-link-url': [
        'error',
        {
          disallowUrls: [/^\.\//],
        },
      ],
    },
  },
  {
    name: 'md/website',
    files: ['website/docs/**/*.md'],
    rules: {
      'md/no-emoji': 'error',
    },
  },
  {
    name: 'md/website/rules',
    files: ['website/docs/rules/**/*.md'],
    rules: {
      /* TODO: Turn this back on when `allow-heading` rule is stabilized.
      'md/allow-heading': [
        'error',
        {
          h2: [
            'Rule Details',
            'Examples',
            'Options',
            'Fix',
            'Limitations',
            'When Not To Use It',
            'Prior Art',
          ],
        },
      ],
      */
    },
  },
]);
