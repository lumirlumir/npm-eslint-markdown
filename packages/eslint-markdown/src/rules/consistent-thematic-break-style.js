/**
 * @fileoverview Rule to enforce consistent thematic break style.
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
 * @typedef {[{ style: string }]} RuleOptions
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
      description: 'Enforce consistent thematic break style',
      url: URL_RULE_DOCS('consistent-thematic-break-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            type: 'string',
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
      style: 'Thematic break style should be `{{ style }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    /** @type {string | null} */
    let thematicBreakStyle = style === 'consistent' ? null : style;

    return {
      thematicBreak(node) {
        const currentThematicBreakStyle = sourceCode.getText(node);

        if (thematicBreakStyle === null) {
          thematicBreakStyle = currentThematicBreakStyle;
        }

        if (thematicBreakStyle !== currentThematicBreakStyle) {
          context.report({
            node,

            messageId: 'style',

            data: {
              style: thematicBreakStyle,
            },

            fix(fixer) {
              return fixer.replaceTextRange(
                sourceCode.getRange(node),
                String(thematicBreakStyle),
              );
            },
          });
        }
      },
    };
  },
};
