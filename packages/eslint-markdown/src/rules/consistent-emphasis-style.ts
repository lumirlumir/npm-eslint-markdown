/**
 * @fileoverview Rule to enforce consistent emphasis style.
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

type EmphasisStyle = (typeof EMPHASIS_STYLE)[number];
/**
 * Options for the `consistent-emphasis-style` rule.
 */
type RuleOptions = [
  {
    /**
     * When `style` is set to `'consistent'`, the rule enforces that all emphasis in the document use the same style as the first one encountered.
     * @default 'consistent'
     */
    style: 'consistent' | EmphasisStyle;
  },
];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const EMPHASIS_STYLE = ['*', '_'] as const;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description: 'Enforce consistent emphasis style',
      dialects: ['CommonMark', 'GFM'],
      url: URL_RULE_DOCS('consistent-emphasis-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['consistent', ...EMPHASIS_STYLE],
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
      style: 'Emphasis style should be `{{ style }}`.',
    },
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    let emphasisStyle: EmphasisStyle | null = style === 'consistent' ? null : style;

    /**
     * @param startOffset Start offset of the style marker.
     * @param endOffset End offset of the style marker.
     */
    function reportStyle(startOffset: number, endOffset: number) {
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
        const currentEmphasisStyle = sourceCode.text[nodeStartOffset] as EmphasisStyle;

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
} as const satisfies RuleModule<RuleOptions, MessageIds>;
