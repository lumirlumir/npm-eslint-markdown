/**
 * @fileoverview Rule to disallow double consecutive punctuation in text.
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

/**
 * This pattern is based on the punctuation list used by `remark-lint`.
 * @see https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-heading-punctuation#parameters
 */
const doublePunctuationRegex = /(?:^|(?<=[^!,.:;?]))[!,.:;?]{2}(?:$|(?=[^!,.:;?]))/g;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow double consecutive punctuation in text',
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
              minLength: 2,
              maxLength: 2,
              pattern: '^[!,.:;?]{2}$',
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
        'Double punctuation marks `{{ punctuation }}` are not allowed.',
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
        const matches = sourceCode.getText(node).matchAll(doublePunctuationRegex);

        for (const match of matches) {
          const punctuation = match[0];

          const startOffset = nodeStartOffset + match.index;
          const endOffset = startOffset + punctuation.length;

          if (allow.includes(punctuation)) continue;

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
