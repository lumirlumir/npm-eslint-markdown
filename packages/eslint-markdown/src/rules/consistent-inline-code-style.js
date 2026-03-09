/**
 * @fileoverview Rule to enforce consistent inline code style.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {'style'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const codeSpanRegex =
  /^(?<delimiter>`+)(?<leadingSpaces>[ \t]*)(?<value>[\s\S]*?)(?<trailingSpaces>[ \t]*)\k<delimiter>$/du;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<[], MessageIds>} */
export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent inline code style',
      url: URL_RULE_DOCS('consistent-inline-code-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    messages: {
      style: 'Inline code should not have extra spaces or tabs next to backticks.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    return {
      inlineCode(node) {
        const match = sourceCode.getText(node).match(codeSpanRegex);

        // Protect against unexpected cases, even though they should not occur in theory.
        if (!match || !match.groups || !match.indices || !match.indices.groups) return;

        const { leadingSpaces, value, trailingSpaces } = match.groups;
        // const { leadingSpaces, value, trailingSpaces } = match.indices.groups;

        if (!value) return;

        if (leadingSpaces === ' ' && trailingSpaces === ' ') return;

        if (leadingSpaces !== '') {
          const [startOffset, endOffset] = match.indices.groups.leadingSpaces;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },
            messageId: 'style',
            fix(fixer) {
              return fixer.removeRange([startOffset, endOffset]);
            },
          });
        }

        if (trailingSpaces !== '') {
          const [startOffset, endOffset] = match.indices.groups.trailingSpaces;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },
            messageId: 'style',
            fix(fixer) {
              return fixer.removeRange([startOffset, endOffset]);
            },
          });
        }
      },
    };
  },
};
