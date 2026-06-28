/**
 * @fileoverview Entry file for the `eslint-markdown` package.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint } from 'eslint';
import { PKG_NAME as name, PKG_VERSION as version } from './core/constants.js';
import { all, base, recommended, stylistic } from './configs/index.js';
import rules from './rules/index.js';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

const plugin = {
  meta: {
    name,
    version,
  },

  rules,

  configs: {
    get all(): ReturnType<typeof all> {
      return all(plugin);
    },
    get base(): ReturnType<typeof base> {
      return base(plugin);
    },
    get recommended(): ReturnType<typeof recommended> {
      return recommended(plugin);
    },
    get stylistic(): ReturnType<typeof stylistic> {
      return stylistic(plugin);
    },
  },
} as const satisfies ESLint.Plugin;

export default plugin;
