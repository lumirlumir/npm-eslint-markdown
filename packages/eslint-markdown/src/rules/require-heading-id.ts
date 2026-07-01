/**
 * @fileoverview Rule to enforce the use of heading IDs.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Heading } from 'mdast';
import { escapeStringRegexp } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [
  'always' | 'never',
  { leftDelimiter: string; rightDelimiter: string; allowDepths: Heading['depth'][] },
];
type MessageIds = 'headingIdAlways' | 'headingIdNever';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

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

    const escapedLeftDelimiter = escapeStringRegexp(leftDelimiter);
    const escapedRightDelimiter = escapeStringRegexp(rightDelimiter);

    /**
     * We don't use the `[ \t]*$` pattern at the end of the regex because trailing
     * whitespace is already removed from a `heading` node's child `text` node.
     */
    const headingIdRegex = new RegExp(
      `(?<leadingSpaces>[ \t]+)(?<headingId>${escapedLeftDelimiter}#[^${escapedRightDelimiter}]+${escapedRightDelimiter})$`,
    );

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
        const lastChildNode = node.children.at(-1);

        /*
         * ATX headings and closed ATX headings that contain no content have no child nodes.
         *
         * ATX Headings:
         *
         * ```md
         * #
         *
         * ##
         *
         * ###
         * ```
         *
         * ATX Closed Headings:
         *
         * ```md
         * # #
         *
         * ## ##
         *
         * ### ###
         * ```
         */
        if (!lastChildNode) {
          // If there are no child nodes, intentionally skip it.
          // This is not the part we want to report.
          return;
        }

        /*
         * Missing heading IDs are reported on the last character of the last child
         * node rather than as a zero-width location (i.e. `column === endColumn`)
         * at the end of that node, because some editors such as VSCode render
         * zero-width diagnostics incorrectly.
         */
        const [lastChildNodeStartOffset, lastChildNodeEndOffset] =
          sourceCode.getRange(lastChildNode);

        // If the last child node is not a `text` node, report an error.
        if (lastChildNode.type !== 'text') {
          if (mode === 'always') {
            context.report({
              loc: {
                start: sourceCode.getLocFromIndex(lastChildNodeEndOffset - 1),
                end: sourceCode.getLocFromIndex(lastChildNodeEndOffset),
              },

              messageId: 'headingIdAlways',
            });
          }

          return;
        }

        const match = headingIdRegex.exec(sourceCode.getText(lastChildNode));

        if (!match || !match.groups) {
          if (mode === 'always') {
            context.report({
              loc: {
                start: sourceCode.getLocFromIndex(lastChildNodeEndOffset - 1),
                end: sourceCode.getLocFromIndex(lastChildNodeEndOffset),
              },

              messageId: 'headingIdAlways',
            });
          }

          return;
        }

        if (mode === 'never') {
          const { leadingSpaces, headingId } = match.groups;
          const leadingSpacesStartOffset = lastChildNodeStartOffset + match.index;
          const headingIdStartOffset = leadingSpacesStartOffset + leadingSpaces.length;
          const headingIdEndOffset = headingIdStartOffset + headingId.length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(headingIdStartOffset),
              end: sourceCode.getLocFromIndex(headingIdEndOffset),
            },

            data: {
              headingId,
            },

            messageId: 'headingIdNever',

            fix(fixer) {
              return fixer.replaceTextRange(
                [leadingSpacesStartOffset, headingIdEndOffset],
                '',
              );
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
