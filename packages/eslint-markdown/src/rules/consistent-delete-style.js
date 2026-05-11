/**
 * @fileoverview Rule to enforce consistent delete style.
 * @author lumir
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
 * @typedef {[{ style: 'consistent' | '~' | '~~' }]} RuleOptions
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
      description: 'Enforce consistent delete style',
      url: URL_RULE_DOCS('consistent-delete-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['consistent', '~', '~~'],
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
      style: 'Delete style should be `{{ style }}`.',
    },

    language: 'markdown',

    dialects: ['gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    /** @type {string | null} */
    let deleteStyle = style === 'consistent' ? null : style;

    /**
     * @param {number} startOffset
     * @param {number} endOffset
     */
    function reportStyle(startOffset, endOffset) {
      const stringifiedDeleteStyle = String(deleteStyle);

      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(startOffset),
          end: sourceCode.getLocFromIndex(endOffset),
        },

        messageId: 'style',

        data: {
          style: stringifiedDeleteStyle,
        },

        fix(fixer) {
          return fixer.replaceTextRange([startOffset, endOffset], stringifiedDeleteStyle);
        },
      });
    }

    return {
      delete(node) {
        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);
        const currentDeleteStyle =
          sourceCode.text[nodeStartOffset] === sourceCode.text[nodeStartOffset + 1]
            ? '~~'
            : '~';

        if (deleteStyle === null) {
          deleteStyle = currentDeleteStyle;
        }

        if (deleteStyle !== currentDeleteStyle) {
          reportStyle(nodeStartOffset, nodeStartOffset + currentDeleteStyle.length);
          reportStyle(nodeEndOffset - currentDeleteStyle.length, nodeEndOffset);
        }
      },
    };
  },
};
