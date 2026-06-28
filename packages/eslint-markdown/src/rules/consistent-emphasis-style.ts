/**
 * @fileoverview Rule to enforce consistent emphasis style.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

import type { RuleModule } from '../core/types.js';

type RuleOptions = [{ style: 'consistent' | '*' | '_' }];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

const rule: RuleModule<RuleOptions, MessageIds> = {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent emphasis style',
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
      style: 'Emphasis style should be `{{ style }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    let emphasisStyle: string | null = style === 'consistent' ? null : style;

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

export default rule;
