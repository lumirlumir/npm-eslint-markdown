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
  /^(?<delimiter>`+)(?<leadingSpaces>[ \t]*)(?<value>[\s\S]*?)(?<trailingSpaces>[ \t]*)\k<delimiter>$/u;

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
        if (!match || !match.groups) return;

        const { delimiter, leadingSpaces, value, trailingSpaces } = match.groups;

        if (!value) return;

        if (leadingSpaces === ' ' && trailingSpaces === ' ') return;

        const [nodeStartOffset] = sourceCode.getRange(node);

        const leadingSpacesStartOffset = nodeStartOffset + delimiter.length;
        const leadingSpacesEndOffset = leadingSpacesStartOffset + leadingSpaces.length;
        const trailingSpacesStartOffset = leadingSpacesEndOffset + value.length;
        const trailingSpacesEndOffset = trailingSpacesStartOffset + trailingSpaces.length;

        if (leadingSpaces !== '') {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(leadingSpacesStartOffset),
              end: sourceCode.getLocFromIndex(leadingSpacesEndOffset),
            },
            messageId: 'style',
            fix(fixer) {
              return fixer.removeRange([
                leadingSpacesStartOffset,
                leadingSpacesEndOffset,
              ]);
            },
          });
        }

        if (trailingSpaces !== '') {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(trailingSpacesStartOffset),
              end: sourceCode.getLocFromIndex(trailingSpacesEndOffset),
            },
            messageId: 'style',
            fix(fixer) {
              return fixer.removeRange([
                trailingSpacesStartOffset,
                trailingSpacesEndOffset,
              ]);
            },
          });
        }
      },
    };
  },
};
