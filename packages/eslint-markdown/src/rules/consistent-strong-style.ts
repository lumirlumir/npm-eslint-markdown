/**
 * @fileoverview Rule to enforce consistent strong style.
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

type StrongStyle = (typeof STRONG_STYLE)[number];
/**
 * Options for the `consistent-strong-style` rule.
 */
type RuleOptions = [
  {
    /**
     * When `style` is set to `'consistent'`, the rule enforces that all strong in the document use the same style as the first one encountered.
     * @default 'consistent'
     */
    style: 'consistent' | StrongStyle;
  },
];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const STRONG_STYLE = ['*', '_'] as const;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description: 'Enforce consistent strong style',
      dialects: ['CommonMark', 'GFM'],
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
            enum: ['consistent', ...STRONG_STYLE],
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
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    let strongStyle: StrongStyle | null = style === 'consistent' ? null : style;

    /**
     * @param startOffset Start offset of the style marker.
     * @param endOffset End offset of the style marker.
     */
    function reportStyle(startOffset: number, endOffset: number) {
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
        const currentStrongStyle = sourceCode.text[nodeStartOffset] as StrongStyle;

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
} as const satisfies RuleModule<RuleOptions, MessageIds>;
