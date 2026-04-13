/**
 * @fileoverview Rule to disallow repeated punctuation in text.
 * @author 루밀LuMir(lumirlumir)
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
 * @typedef {[{ allow: string[] }]} RuleOptions
 * @typedef {'noDoublePunctuation'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const repeatedPunctuationChars = '！!~～.。,，·?？';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow repeated punctuation in text',
      url: URL_RULE_DOCS('no-double-punctuation'),
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
      noDoublePunctuation:
        'Double punctuation pattern `{{ punctuation }}` is not allowed.',
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
        const text = sourceCode.getText(node);

        for (let index = 1; index < text.length; index += 1) {
          const previousCharacter = text[index - 1];
          const currentCharacter = text[index];

          if (
            previousCharacter !== currentCharacter ||
            !repeatedPunctuationChars.includes(currentCharacter)
          ) {
            continue;
          }

          const punctuation = previousCharacter + currentCharacter;

          if (allow.includes(punctuation)) {
            continue;
          }

          const startOffset = nodeStartOffset + index;
          const endOffset = startOffset + currentCharacter.length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            data: {
              punctuation,
            },

            messageId: 'noDoublePunctuation',
          });
        }
      },
    };
  },
};
