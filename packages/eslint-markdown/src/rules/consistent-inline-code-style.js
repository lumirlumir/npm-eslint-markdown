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
 * @typedef {[]} RuleOptions
 * @typedef {'style'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const inlineCodeRegex =
  /^(?<delimiter>`+)(?<leadingSpaces>[ \t]*)(?<value>[\s\S]*?)(?<trailingSpaces>[ \t]*)\k<delimiter>$/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
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
    function reportStyle(startOffset, endOffset) {
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
        const match = sourceCode.getText(node).match(inlineCodeRegex);

        // Protect against unexpected cases, even though they should not occur in theory.
        if (!match || !match.groups) return;

        const { delimiter, leadingSpaces, value, trailingSpaces } = match.groups;

        if (!value) return;

        // eslint-disable-next-line -- TODO
        const startMatch = /^(\s+)(\S)/.exec(node.value) || [null, '', ''];
        const startBacktick = startMatch[2] === '`';
        const startPaddingLength = leadingSpaces.length - startMatch[1].length;
        const startCount =
          startMatch[1].length - (startBacktick && !startPaddingLength ? 1 : 0);
        const startSpaces = startCount > 0;

        // eslint-disable-next-line -- TODO
        const endMatch = /(\S)(\s+)$/.exec(node.value) || [null, '', ''];
        const endBacktick = endMatch[1] === '`';
        const endPaddingLength = trailingSpaces.length - endMatch[2].length;
        const endCount = endMatch[2].length - (endBacktick && !endPaddingLength ? 1 : 0);
        const endSpaces = endCount > 0;

        const removePadding =
          startSpaces &&
          endSpaces &&
          startPaddingLength &&
          endPaddingLength &&
          !startBacktick &&
          !endBacktick;

        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);

        if (startSpaces) {
          reportStyle(
            nodeStartOffset + delimiter.length + (removePadding ? 0 : startPaddingLength),
            nodeStartOffset + delimiter.length + startPaddingLength + startCount,
          );
        }

        if (endSpaces) {
          reportStyle(
            nodeEndOffset - delimiter.length - endPaddingLength - endCount,
            nodeEndOffset - delimiter.length - (removePadding ? 0 : endPaddingLength),
          );
        }
      },
    };
  },
};
