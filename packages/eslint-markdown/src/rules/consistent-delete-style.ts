/**
 * @fileoverview Rule to enforce consistent delete style.
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

type RuleOptions = [{ style: 'consistent' | '~' | '~~' }];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

const rule: RuleModule<RuleOptions, MessageIds> = {
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

    let deleteStyle: string | null = style === 'consistent' ? null : style;

    /**
     * @param startOffset Start offset of the style marker.
     * @param endOffset End offset of the style marker.
     */
    function reportStyle(startOffset: number, endOffset: number) {
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

export default rule;
