/**
 * @fileoverview Rule to enforce the use of heading IDs.
 * @author 루밀LuMir(lumirlumir)
 */

// @ts-nocheck -- TODO

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { Heading } from 'mdast';
 * @import { RuleModule } from '../core/types.js';
 * @typedef {['always' | 'never', { leftDelimiter: string, rightDelimiter: string, ignoreDepth: Heading['depth'][] }]} RuleOptions
 * @typedef {'headingIdAlways' | 'headingIdNever'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of heading IDs',
      url: URL_RULE_DOCS('require-heading-id'),
      recommended: false,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        enum: ['always', 'never'],
      },
      {
        type: 'object',
        properties: {
          leftDelimiter: {
            type: 'string',
          },
          rightDelimiter: {
            type: 'string',
          },
          ignoreDepth: {
            type: 'array',
            items: {
              enum: [1, 2, 3, 4, 5, 6],
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      'always',
      {
        leftDelimiter: '{',
        rightDelimiter: '}',
        ignoreDepth: [],
      },
    ],

    messages: {
      headingIdAlways: 'Headings should have an ID attribute.',
      headingIdNever:
        'Headings should not have an ID attribute. Remove the `{{ headingId }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [mode, { leftDelimiter, rightDelimiter, ignoreDepth }] = context.options;

    return {
      heading(node) {
        if (ignoreDepth.includes(node.depth)) return;

        const regex = new RegExp(
          `${leftDelimiter}#[^${rightDelimiter}]+${rightDelimiter}[ \t]*$`,
        );
        const match = sourceCode.getText(node).match(regex);

        if (mode === 'always' && match === null) {
          context.report({
            loc: {
              start: {
                line: node.position.start.line,
                column: node.position.end.column,
              },
              end: {
                line: node.position.start.line,
                column: node.position.end.column,
              },
            },

            messageId: 'headingIdAlways',
          });
        } else if (mode === 'never' && match !== null) {
          const headingIdLength = match[0].length;

          const matchIndexStart = match.index;
          const matchIndexEnd = matchIndexStart + headingIdLength;

          context.report({
            loc: {
              start: {
                line: node.position.start.line,
                column: node.position.start.column + matchIndexStart,
              },
              end: {
                line: node.position.start.line,
                column: node.position.start.column + matchIndexEnd,
              },
            },

            data: {
              headingId: match[0],
            },

            messageId: 'headingIdNever',

            fix(fixer) {
              return fixer.replaceTextRange(
                [
                  node.position.start.offset + matchIndexStart,
                  node.position.start.offset + matchIndexEnd,
                ],
                '',
              );
            },
          });
        }
      },
    };
  },
};
