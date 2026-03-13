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

    /**
     * @param {number} startOffset
     * @param {number} endOffset
     */
    function reportPadding(startOffset, endOffset) {
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

    return {
      inlineCode(node) {
        const match = sourceCode.getText(node).match(codeSpanRegex);

        // Protect against unexpected cases, even though they should not occur in theory.
        if (!match || !match.groups) return;

        const { delimiter, leadingSpaces, value, trailingSpaces } = match.groups;

        if (!value) return;

        const startsWithBacktick = value.startsWith('`');
        const endsWithBacktick = value.endsWith('`');
        const hasLeadingTab = leadingSpaces.includes('\t');
        const hasTrailingTab = trailingSpaces.includes('\t');
        const keepPadding =
          leadingSpaces.includes(' ') &&
          trailingSpaces.includes(' ') &&
          !hasLeadingTab &&
          !hasTrailingTab &&
          (leadingSpaces.length === 1 ||
            trailingSpaces.length === 1 ||
            startsWithBacktick ||
            endsWithBacktick);

        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);
        const leadingKeep =
          keepPadding || (trailingSpaces === '' && !hasLeadingTab && startsWithBacktick)
            ? 1
            : 0;
        const trailingKeep =
          keepPadding || (leadingSpaces === '' && !hasTrailingTab && endsWithBacktick)
            ? 1
            : 0;

        if (leadingSpaces.length > leadingKeep) {
          reportPadding(
            nodeStartOffset + delimiter.length + leadingKeep,
            nodeStartOffset + delimiter.length + leadingSpaces.length,
          );
        }

        if (trailingSpaces.length > trailingKeep) {
          reportPadding(
            nodeEndOffset - delimiter.length - trailingSpaces.length,
            nodeEndOffset - delimiter.length - trailingKeep,
          );
        }
      },
    };
  },
};
