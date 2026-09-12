/**
 * @fileoverview Rule to disallow trailing punctuation in headings.
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { escapeStringRegexp } from '../core/utils/index.js';
import {
  URL_RULE_DOCS,
  punctuation as defaultPunctuation,
  gemojiRegex,
} from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `no-trailing-heading-punctuation` rule.
 */
type RuleOptions = [
  {
    /**
     * Specifies the characters that are not allowed at the end of headings.
     * @default ['.', ',', ';', ':', '!', '。', '，', '；', '：', '！']
     */
    punctuation: string[];
  },
];
type MessageIds = 'noTrailingHeadingPunctuation';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Regular expression for identifying a GitHub emoji code at the end of a line.
 */
const trailingGemojiRegex = new RegExp(`${gemojiRegex.source}$`, gemojiRegex.flags);

/**
 * Regular expression for identifying an HTML entity at the end of a line.
 * - NOTE: These patterns are based on the `markdownlint`.
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/helpers/helpers.cjs#L32-L34
 */
const trailingHtmlEntityRegex =
  /&(?:#\d+|#[xX][\da-fA-F]+|[a-zA-Z]{2,31}|blk\d{2}|emsp1[34]|frac\d{2}|sup\d|there4);$/;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description: 'Disallow trailing punctuation in headings',
      dialects: ['CommonMark', 'GFM'],
      url: URL_RULE_DOCS('no-trailing-heading-punctuation'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          punctuation: {
            type: 'array',
            items: {
              type: 'string',
              minLength: 1,
              maxLength: 1,
            },
            minItems: 1,
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        punctuation: [...defaultPunctuation],
      },
    ],

    messages: {
      noTrailingHeadingPunctuation:
        'Trailing punctuation `{{ punctuation }}` is not allowed in headings.',
    },
  },

  create(context) {
    const { sourceCode } = context;
    const [{ punctuation }] = context.options;

    const trailingPunctuationRegex = new RegExp(
      `[ \\t\\r\\n]*[${escapeStringRegexp(punctuation.join(''))}]+$`,
    );

    return {
      heading(node) {
        /*
         * NOTE: This behavior is consistent with the `markdownlint` rule `MD026`.
         *
         * Instead of using deep recursive traversal to find the final `text` node,
         * we simply access the node's last child directly with shallow traversal.
         *
         * This is because in the "Not OK" case, the `text` node is located
         * in the last position while DFS(Depth First Search) traversal,
         * but is located under `emphasis` or `strong` nodes.
         *
         * This is the situation we don't want to support.
         * The trailing punctuation must be in a plain `text` node at the end
         * of the heading without being wrapped by other nodes.
         *
         * OK:
         *
         * ```md
         * # heading .
         * ```
         *
         * Not OK:
         *
         * ```md
         * # heading *.*
         *           ^ ^
         *
         * # heading **.**
         *           ^^ ^^
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
        if (!lastChildNode || lastChildNode.type !== 'text') {
          // If there is no child node or trailing `text` node, intentionally skip the heading.
          return;
        }

        const lastChildText = sourceCode.getText(lastChildNode);
        const match = trailingPunctuationRegex.exec(lastChildText);

        if (!match) {
          return;
        }

        let trailingPunctuation = match[0];

        /*
         * Slice from the beginning of the trailing `text` node through the first
         * character matched by `trailingPunctuationRegex`, including that character.
         *
         * The first matched character can be the closing `:` of a gemoji or the
         * closing `;` of an HTML entity. Including it allows the end-anchored regular
         * expressions to recognize the construct while excluding any punctuation
         * that follows it.
         *
         * Gemoji:
         *
         * ```text
         * lastChildText:                       Heading :smile:.
         * textThroughFirstTrailingPunctuation: Heading :smile:
         * ```
         *
         * HTML entity:
         *
         * ```text
         * lastChildText:                       Copyright &copy;.
         * textThroughFirstTrailingPunctuation: Copyright &copy;
         * ```
         */
        const textThroughFirstTrailingPunctuation = lastChildText.slice(
          0,
          match.index + 1,
        );

        if (
          trailingGemojiRegex.test(textThroughFirstTrailingPunctuation) ||
          trailingHtmlEntityRegex.test(textThroughFirstTrailingPunctuation)
        ) {
          trailingPunctuation = trailingPunctuation.slice(1);
        }

        if (!trailingPunctuation) {
          // If the match contains only a gemoji or HTML entity terminator, skip it.
          return;
        }

        const [, endOffset] = sourceCode.getRange(lastChildNode);
        const startOffset = endOffset - trailingPunctuation.length;

        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(startOffset),
            end: sourceCode.getLocFromIndex(endOffset),
          },

          data: {
            punctuation: trailingPunctuation,
          },

          messageId: 'noTrailingHeadingPunctuation',

          fix(fixer) {
            return fixer.removeRange([startOffset, endOffset]);
          },
        });
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
