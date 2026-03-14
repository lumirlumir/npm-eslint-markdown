/**
 * @fileoverview Rule to enforce consistent inline code style.
 * @author 루밀LuMir(lumirlumir)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.40.0/lib/md038.mjs
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

// `\s` in regular expressions matches whitespace characters beyond `\r`, `\n`, ` `, and `\t`,
// so we explicitly using `[\r\n \t]` to match those characters to avoid unexpected matches.
const leadingInlineCodeRegex =
  /^(?<leadingBackticks>`*)(?<leadingSpaces>[\r\n \t]+)(?<firstChar>[^\r\n \t])/;
const trailingInlineCodeRegex =
  /(?<lastChar>[^\r\n \t])(?<trailingSpaces>[\r\n \t]+)(?<trailingBackticks>`*)$/;

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
        const startPaddingLength = /** @type {0 | 1} */ (
          leadingSpacesText.length - leadingSpacesValue.length
        );
        const startBacktickSpaceAdjustment = startBacktick && !startPaddingLength ? 1 : 0;
        const startSpaces = leadingSpacesValue.length > startBacktickSpaceAdjustment;

        const { trailingSpaces: trailingSpacesText = '', trailingBackticks = '' } =
          text.match(trailingInlineCodeRegex)?.groups ?? {};
        const { lastChar = '', trailingSpaces: trailingSpacesValue = '' } =
          node.value.match(trailingInlineCodeRegex)?.groups ?? {};

        const endBacktick = lastChar === '`';
        const endPaddingLength = /** @type {0 | 1} */ (
          trailingSpacesText.length - trailingSpacesValue.length
        );
        const endBacktickSpaceAdjustment = endBacktick && !endPaddingLength ? 1 : 0;
        const endSpaces = trailingSpacesValue.length > endBacktickSpaceAdjustment;

        const removePadding = startSpaces && endSpaces && !startBacktick && !endBacktick;

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
            baseOffset - trailingSpacesText.length + endBacktickSpaceAdjustment,
            baseOffset - (removePadding ? 0 : endPaddingLength),
          );
        }
      },
    };
  },
};
