/**
 * @fileoverview Rule to enforce consistent thematic break style.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [{ style: string }];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

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

    let thematicBreakStyle: string | null = style === 'consistent' ? null : style;

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
} as const satisfies RuleModule<RuleOptions, MessageIds>;
