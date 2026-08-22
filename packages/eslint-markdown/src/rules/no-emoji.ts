/**
 * @fileoverview Rule to disallow emojis in text.
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
 * Options for the `no-emoji` rule.
 */
type RuleOptions = [
  {
    /**
     * When specified, specific emoji sequences are allowed if they match one of the strings in this array.
     *
     * This is useful when a document intentionally uses a small set of raw Unicode emojis while still disallowing all others.
     * @default []
     */
    allow: string[];
  },
];
type MessageIds = 'noEmoji';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const emojiRegex = /\p{RGI_Emoji}/gv;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow emojis in text',
      url: URL_RULE_DOCS('no-emoji'),
      recommended: false,
      stylistic: false,
    },

    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              type: 'string',
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        allow: [],
      },
    ],

    messages: {
      noEmoji: 'Emojis are not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ allow }] = context.options;

    return {
      text(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const matches = sourceCode.getText(node).matchAll(emojiRegex);

        for (const match of matches) {
          const emoji = match[0];

          if (allow.includes(emoji)) continue;

          const startOffset = nodeStartOffset + match.index;
          const endOffset = startOffset + emoji.length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            messageId: 'noEmoji',
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
