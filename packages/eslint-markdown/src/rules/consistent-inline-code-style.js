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

const leadingInlineCodeRegex =
  /^(?<leadingBackticks>`*)(?<leadingSpaces>\s+)(?<firstChar>\S)/;
const trailingInlineCodeRegex =
  /(?<lastChar>\S)(?<trailingSpaces>\s+)(?<trailingBackticks>`*)$/;

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
        const text = sourceCode.getText(node);
        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);

        const { leadingBackticks = '', leadingSpaces: leadingSpacesText = '' } =
          text.match(leadingInlineCodeRegex)?.groups ?? {};
        const { leadingSpaces: leadingSpacesValue = '', firstChar = '' } =
          node.value.match(leadingInlineCodeRegex)?.groups ?? {};

        const startBacktick = firstChar === '`';
        const startPaddingLength = leadingSpacesText.length - leadingSpacesValue.length;
        const startBacktickSpaceAdjustment = startBacktick && !startPaddingLength ? 1 : 0;
        const startSpaces = leadingSpacesValue.length > startBacktickSpaceAdjustment;

        const { trailingSpaces = '', trailingBackticks = '' } =
          text.match(trailingInlineCodeRegex)?.groups ?? {};
        const { lastChar = '', trailingSpaces: trailingSpacesValue = '' } =
          node.value.match(trailingInlineCodeRegex)?.groups ?? {};

        const endBacktick = lastChar === '`';
        const endPaddingLength = trailingSpaces.length - trailingSpacesValue.length;
        const endBacktickSpaceAdjustment = endBacktick && !endPaddingLength ? 1 : 0;
        const endSpaces = trailingSpacesValue.length > endBacktickSpaceAdjustment;

        const removePadding =
          startPaddingLength &&
          endPaddingLength &&
          startSpaces &&
          endSpaces &&
          !startBacktick &&
          !endBacktick;

        if (startSpaces) {
          const baseOffset = nodeStartOffset + leadingBackticks.length;

          reportStyle(
            baseOffset + (removePadding ? 0 : startPaddingLength),
            baseOffset + leadingSpacesText.length - startBacktickSpaceAdjustment,
          );
        }

        if (endSpaces) {
          const baseOffset = nodeEndOffset - trailingBackticks.length;

          reportStyle(
            baseOffset - trailingSpaces.length + endBacktickSpaceAdjustment,
            baseOffset - (removePadding ? 0 : endPaddingLength),
          );
        }
      },
    };
  },
};
