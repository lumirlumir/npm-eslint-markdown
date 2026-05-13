/**
 * @fileoverview Rule to enforce consistent strong style.
 * @author lumir(lumirlumir)
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
 * @typedef {[{ style: 'consistent' | '*' | '_' }]} RuleOptions
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
      description: 'Enforce consistent strong style',
      url: URL_RULE_DOCS('consistent-strong-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['consistent', '*', '_'],
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
      style: 'Strong style should be `{{ style }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    /** @type {string | null} */
    let strongStyle = style === 'consistent' ? null : style;

    /**
     * @param {number} startOffset
     * @param {number} endOffset
     */
    function reportStyle(startOffset, endOffset) {
      const stringifiedStrongStyle = String(strongStyle).repeat(2);

      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(startOffset),
          end: sourceCode.getLocFromIndex(endOffset),
        },

        messageId: 'style',

        data: {
          style: stringifiedStrongStyle,
        },

        fix(fixer) {
          return fixer.replaceTextRange([startOffset, endOffset], stringifiedStrongStyle);
        },
      });
    }

    return {
      strong(node) {
        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);
        const currentStrongStyle = sourceCode.text[nodeStartOffset];

        if (strongStyle === null) {
          strongStyle = currentStrongStyle;
        }

        if (strongStyle !== currentStrongStyle) {
          reportStyle(nodeStartOffset, nodeStartOffset + 2);
          reportStyle(nodeEndOffset - 2, nodeEndOffset);
        }
      },
    };
  },
};
