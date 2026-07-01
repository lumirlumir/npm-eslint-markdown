import { defineConfig, globalIgnores } from 'eslint/config';
import js from 'eslint-config-bananass/js';
import ts from 'eslint-config-bananass/ts';
import json from 'eslint-config-bananass/json';
import jsonc from 'eslint-config-bananass/jsonc';
import json5 from 'eslint-config-bananass/json5';
import md from 'eslint-markdown';

export default defineConfig([
  globalIgnores(
    ['**/build/', '**/coverage/', '**/.vitepress/.temp/', '**/.vitepress/cache/'],
    'global/ignores',
  ),

  js,
  ts,
  json,
  jsonc,
  json5,
  md.configs.recommended,
  md.configs.stylistic,

  // js
  {
    name: 'js/global',
    rules: {
      'import/no-cycle': 'off', // Too computationally expensive. TODO: Remove this in shared config.
      'import/no-extraneous-dependencies': 'off', // Too computationally expensive. TODO: Remove this in shared config.
    },
  },

  // md
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
            'Further Reading',
            'Prior Art',
          ],
        },
      ],
      */
    },
  },
]);
