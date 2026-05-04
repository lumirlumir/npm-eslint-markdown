/**
 * @fileoverview Build time data for the `rules`.
 * @see https://vitepress.dev/guide/data-loading#data-from-local-files
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import md from 'eslint-markdown';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @typedef {object} RuleMeta
 * @property {string} name
 * @property {string} description
 * @property {boolean} recommended
 * @property {boolean} fixable
 * @property {boolean} suggestion
 * @property {boolean} commonmark
 * @property {boolean} gfm
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const { rules } = md;
const ruleMetas = Object.keys(rules).map(
  rule =>
    /** @type {RuleMeta} */ ({
      name: rule,
      description: rules[rule].meta.docs.description ?? '',
      recommended: rules[rule].meta.docs.recommended ?? false,
      stylistic: rules[rule].meta.docs.stylistic ?? false,
      fixable: rules[rule].meta.fixable ?? false,
      suggestion: rules[rule].meta.hasSuggestions ?? false,
      commonmark: rules[rule].meta.dialects.includes('commonmark') ?? false,
      gfm: rules[rule].meta.dialects.includes('gfm') ?? false,
    }),
);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default {
  load() {
    return {
      rules,
      ruleMetas,
    };
  },
};
