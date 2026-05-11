/**
 * @fileoverview Rule to enforce the use of allowed text for headings.
 * @author lumir
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ h1: HeadingOption, h2: HeadingOption, h3: HeadingOption, h4: HeadingOption, h5: HeadingOption, h6: HeadingOption }]} RuleOptions
 * @typedef {'allowHeading' | 'allowHeadingDepth'} MessageIds
 * @typedef {false | string[]} HeadingOption
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const headingRegex = /^#{1,6}\s+/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of allowed text for headings',
      url: URL_RULE_DOCS('allow-heading'),
      recommended: false,
      stylistic: false,
    },

    schema: [
      {
        type: 'object',
        properties: {
          h1: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
                uniqueItems: true,
              },
            ],
          },
          h2: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
                uniqueItems: true,
              },
            ],
          },
          h3: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
                uniqueItems: true,
              },
            ],
          },
          h4: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
                uniqueItems: true,
              },
            ],
          },
          h5: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
                uniqueItems: true,
              },
            ],
          },
          h6: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'array',
                items: { type: 'string' },
                uniqueItems: true,
              },
            ],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        h1: false,
        h2: false,
        h3: false,
        h4: false,
        h5: false,
        h6: false,
      },
    ],

    messages: {
      allowHeading:
        'The heading text `{{ heading }}` is not allowed. Please use one of the following text: {{ allow }}.',
      allowHeadingDepth: 'The heading depth `h{{ depth }}` is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const [{ h1, h2, h3, h4, h5, h6 }] = context.options;
    const headingMap = {
      1: h1,
      2: h2,
      3: h3,
      4: h4,
      5: h5,
      6: h6,
    };

    return {
      heading(node) {
        const actualHeadingText = context.sourceCode
          .getText(node)
          .replace(headingRegex, '');
        const expectedHeadingTexts = headingMap[node.depth];

        if (expectedHeadingTexts === false) return;

        if (expectedHeadingTexts.length === 0) {
          context.report({
            node,

            messageId: 'allowHeadingDepth',

            data: {
              depth: String(node.depth),
            },
          });
        } else if (!expectedHeadingTexts.includes(actualHeadingText)) {
          context.report({
            node,

            messageId: 'allowHeading',

            data: {
              heading: actualHeadingText,
              allow: expectedHeadingTexts.map(text => `\`${text}\``).join(', '),
            },
          });
        }
      },
    };
  },
};
