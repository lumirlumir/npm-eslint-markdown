/**
 * @fileoverview Rule to enforce consistent inline code style.
 * @author 루밀LuMir(lumirlumir)
 * @see https://github.com/DavidAnson/markdownlint/blob/main/lib/md038.mjs
 */

// TODO: Multiline inline code with `\n` is possible.

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
  /^(?<delimiter>`+)(?<leadingSpaces>[ \t]*)(?:[\s\S]*?)(?<trailingSpaces>[ \t]*)\k<delimiter>$/u;

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

        const { delimiter, leadingSpaces, trailingSpaces } = match.groups;

        // eslint-disable-next-line -- TODO
        const startMatch = /^(\s+)(\S)/.exec(node.value) || [null, '', ''];
        const startBacktick = startMatch[2] === '`';
        const startPaddingLength = leadingSpaces.length - startMatch[1].length;
        const startBacktickSpaceAdjustment = startBacktick && !startPaddingLength ? 1 : 0;
        const startSpaces = startMatch[1].length > startBacktickSpaceAdjustment;

        // eslint-disable-next-line -- TODO
        const endMatch = /(\S)(\s+)$/.exec(node.value) || [null, '', ''];
        const endBacktick = endMatch[1] === '`';
        const endPaddingLength = trailingSpaces.length - endMatch[2].length;
        const endBacktickSpaceAdjustment = endBacktick && !endPaddingLength ? 1 : 0;
        const endSpaces = endMatch[2].length > endBacktickSpaceAdjustment;

        const removePadding =
          startPaddingLength &&
          endPaddingLength &&
          startSpaces &&
          endSpaces &&
          !startBacktick &&
          !endBacktick;

        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);

        if (startSpaces) {
          const baseOffset = nodeStartOffset + delimiter.length;

          reportStyle(
            baseOffset + (removePadding ? 0 : startPaddingLength),
            baseOffset + leadingSpaces.length - startBacktickSpaceAdjustment,
          );
        }

        if (endSpaces) {
          const baseOffset = nodeEndOffset - delimiter.length;

          reportStyle(
            baseOffset - trailingSpaces.length + endBacktickSpaceAdjustment,
            baseOffset - (removePadding ? 0 : endPaddingLength),
          );
        }
      },
    };
  },
};
