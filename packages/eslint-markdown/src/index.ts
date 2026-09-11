/**
 * @fileoverview Entry file for the `eslint-markdown` package.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ESLint } from 'eslint';
import { all, base, recommended, stylistic } from './configs/index.js';
import rules from './rules/index.js';
import pkg from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

const plugin = {
  meta: {
    name: pkg.name as 'eslint-markdown' satisfies string,
    namespace: 'md',
    version: pkg.version satisfies string,
  },

  // Keep rule metadata precise without exposing version-specific rule contexts.
  rules: rules as {
    [RuleName in keyof typeof rules]: {
      meta: (typeof rules)[RuleName]['meta'];
      create: (context: unknown) => ReturnType<(typeof rules)[RuleName]['create']>;
    };
  },

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
