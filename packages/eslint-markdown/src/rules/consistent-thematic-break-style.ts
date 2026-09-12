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

/**
 * Options for the `consistent-thematic-break-style` rule.
 */
type RuleOptions = [
  {
    /**
     * When `style` is set to `'consistent'`, the rule enforces that all thematic breaks in the document use the same style as the first one encountered.
     *
     * You can also specify a particular style by setting style to `'---'`, `'***'`, `'___'`, or any other valid thematic break, which will enforce that all thematic breaks use the specified style. A valid thematic break is a sequence of three or more matching `-`, `*`, or `_` characters, each optionally followed by any number of spaces or tabs.
     * @default 'consistent'
     */
    style: string;
  },
];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Matches `consistent` or a valid CommonMark thematic break style
 * (3+ identical `-`, `*`, or `_` characters, each optionally followed by spaces/tabs).
 * @see https://spec.commonmark.org/0.31.2/#thematic-breaks
 */
const thematicBreakStylePattern =
  '^(?:consistent|(?:-[ \\t]*){3,}|(?:\\*[ \\t]*){3,}|(?:_[ \\t]*){3,})$';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description: 'Enforce consistent thematic break style',
      dialects: ['CommonMark', 'GFM'],
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
            pattern: thematicBreakStylePattern,
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
