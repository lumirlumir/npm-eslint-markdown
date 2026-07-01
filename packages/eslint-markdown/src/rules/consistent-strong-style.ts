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

type RuleOptions = [{ style: 'consistent' | '*' | '_' }];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

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

    let strongStyle: string | null = style === 'consistent' ? null : style;

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
} as const satisfies RuleModule<RuleOptions, MessageIds>;
