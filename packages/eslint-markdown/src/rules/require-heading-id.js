/**
 * @fileoverview Rule to enforce the use of heading IDs.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { escapeStringRegexp } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { Heading } from 'mdast';
 * @import { RuleModule } from '../core/types.js';
 * @typedef {['always' | 'never', { leftDelimiter: string, rightDelimiter: string, allowDepths: Heading['depth'][] }]} RuleOptions
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
          allowDepths: {
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
        allowDepths: [],
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
    const [mode, { leftDelimiter, rightDelimiter, allowDepths }] = context.options;

    return {
      heading(node) {
        // If the heading's depth is included in `allowDepths`, skip it.
        if (allowDepths.includes(node.depth)) {
          return;
        }

        /*
         * Instead of using deep recursive traversal to find the final `text` node,
         * we simply access the node's last child directly with shallow traversal.
         *
         * This is because in the "Not OK" case, the `text` node is located
         * in the last position while DFS(Depth First Search) traversal,
         * but is located under `emphasis` or `strong` nodes.
         *
         * This is the situation we don't want to support.
         * There must be pure ` #{custom-id}` text at the end of the heading
         * without being wrapped by other nodes.
         *
         * OK:
         *
         * ```md
         * # heading {#custom-id}
         * ```
         *
         * Not OK:
         *
         * ```md
         * # heading *{#custom-id}*
         *           ^            ^
         *
         * # heading **{#custom-id}**
         *           ^^            ^^
         * ```
         */
        const textNode = node.children.at(-1);

        const headingEndPosition = sourceCode.getLoc(node).end;

        // If the last child node is not a `text` node, report an error.
        if (textNode?.type !== 'text') {
          if (mode === 'always') {
            context.report({
              loc: {
                start: headingEndPosition,
                end: headingEndPosition,
              },

              messageId: 'headingIdAlways',
            });
          }

          return;
        }

        const escapedLeftDelimiter = escapeStringRegexp(leftDelimiter);
        const escapedRightDelimiter = escapeStringRegexp(rightDelimiter);

        /**
         * - We don't use the `[ \t]*$` pattern at the end of the regex because trailing
         *   whitespace is already removed from a `heading` node's child `text` node.
         */
        const headingIdRegex = new RegExp(
          `(?<=[ \t]+)${escapedLeftDelimiter}#[^${escapedRightDelimiter}]+${escapedRightDelimiter}$`,
        );

        const match = headingIdRegex.exec(textNode.value);

        if (!match) {
          if (mode === 'always') {
            context.report({
              loc: {
                start: headingEndPosition,
                end: headingEndPosition,
              },

              messageId: 'headingIdAlways',
            });
          }

          return;
        }

        if (mode === 'always' && match === null) {
          context.report({
            loc: {
              start: headingEndPosition,
              end: headingEndPosition,
            },

            messageId: 'headingIdAlways',
          });
        } else if (mode === 'never' && match !== null) {
          const [nodeStartOffset] = sourceCode.getRange(textNode);

          const headingId = match[0];

          const startOffset = nodeStartOffset + match.index;
          const endOffset = startOffset + headingId.length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            data: {
              headingId,
            },

            messageId: 'headingIdNever',

            fix(fixer) {
              return fixer.replaceTextRange([startOffset, endOffset], '');
            },
          });
        }
      },
    };
  },
};
