/**
 * @fileoverview Rule to enforce consistent code style.
 * @author 루밀LuMir(lumirlumir)
 */

/*
 * Note on autofix and suggestion safety:
 * - Converting `fence-backtick` to `fence-tilde` is safe.
 * - Converting `fence-backtick` to `indent` is not safe, as `lang` and `meta` information would be lost.
 * - Converting `fence-tilde` to `fence-backtick` is safe.
 * - Converting `fence-tilde` to `indent` is not safe, as `lang` and `meta` information would be lost.
 * - Converting `indent` to `fence-backtick` is safe.
 * - Converting `indent` to `fence-tilde` is safe.
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
 * @typedef {[{ style: 'consistent' | 'indent' | 'fence-backtick' | 'fence-tilde' }]} RuleOptions
 * @typedef {'style'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent code style',
      url: URL_RULE_DOCS('consistent-code-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    hasSuggestions: true,

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['consistent', 'indent', 'fence-backtick', 'fence-tilde'], // TODO: Add `fence` option?
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        style: 'consistent',
      },
    ],

    messages: {
      style: 'Code style should be `{{ style }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    /** @type {string | null} */
    let emphasisStyle = style === 'consistent' ? null : style;

    /**
     * @param {number} startOffset
     * @param {number} endOffset
     */
    function reportStyle(startOffset, endOffset) {
      const stringifiedEmphasisStyle = String(emphasisStyle);

      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(startOffset),
          end: sourceCode.getLocFromIndex(endOffset),
        },

        messageId: 'style',

        data: {
          style: stringifiedEmphasisStyle,
        },

        fix(fixer) {
          return fixer.replaceTextRange(
            [startOffset, endOffset],
            stringifiedEmphasisStyle,
          );
        },
      });
    }

    return {
      emphasis(node) {
        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);
        const currentEmphasisStyle = sourceCode.text[nodeStartOffset];

        if (emphasisStyle === null) {
          emphasisStyle = currentEmphasisStyle;
        }

        if (emphasisStyle !== currentEmphasisStyle) {
          reportStyle(nodeStartOffset, nodeStartOffset + 1);
          reportStyle(nodeEndOffset - 1, nodeEndOffset);
        }
      },
    };
  },
};
