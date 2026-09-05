/**
 * @fileoverview Rule to enforce consistent ordered list style.
 * @author Ga eun Lee
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { List } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type OrderedListStyle = (typeof ORDERED_LIST_STYLE)[number];
/**
 * Options for the `consistent-ordered-list-style` rule.
 */
type RuleOptions = [
  {
    /**
     * When `style` is set to `'one_or_ordered'`, the rule allows either the `'one'` or `'ordered'` style based on the first two list item prefixes.
     *
     * You can also specify `'one'` to require every prefix to be `1`, `'ordered'` to require prefixes to increase sequentially, starting from `1` or from `0` when the list has two or more items, or `'zero'` to require every prefix to be `0`.
     * @default 'one_or_ordered'
     */
    style: 'one_or_ordered' | OrderedListStyle;
  },
];
type MessageIds = 'style';
interface OrderedListItemPrefix {
  startOffset: number;
  text: string;
  number: number;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ORDERED_LIST_STYLE = ['one', 'ordered', 'zero'] as const;
const orderedListItemPrefixRegex = /^\d{1,9}/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent ordered list style',
      url: URL_RULE_DOCS('consistent-ordered-list-style'),
      recommended: false,
      stylistic: true,
    },

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['one_or_ordered', ...ORDERED_LIST_STYLE],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        style: 'one_or_ordered',
      },
    ],

    messages: {
      style:
        'Ordered list item prefix should be `{{ expected }}`, but found `{{ actual }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    return {
      'list[ordered=true]'(node: List) {
        const prefixes: OrderedListItemPrefix[] = [];

        for (const listItem of node.children) {
          const [itemStartOffset] = sourceCode.getRange(listItem);
          // `match` is never null because this visitor only runs for `list[ordered=true]`, whose items always start with a numeric marker.
          const match = orderedListItemPrefixRegex.exec(
            sourceCode.text.slice(itemStartOffset),
          )!;

          const [text] = match;

          prefixes.push({
            startOffset: itemStartOffset,
            text,
            number: Number(text),
          });
        }

        let expectedNumber = 1;
        let incrementing = false;

        if (prefixes.length > 1) {
          const [firstPrefix, secondPrefix] = prefixes;
          if (secondPrefix.number !== 1 || firstPrefix.number === 0) {
            incrementing = true;
            if (firstPrefix.number === 0) {
              expectedNumber = 0;
            }
          }
        }

        let listStyle: OrderedListStyle | null =
          style === 'one_or_ordered' ? null : style;

        if (listStyle === null) {
          listStyle = incrementing ? 'ordered' : 'one';
        }

        if (listStyle === 'zero') {
          expectedNumber = 0;
        } else if (listStyle === 'one') {
          expectedNumber = 1;
        }

        for (const listItemPrefix of prefixes) {
          const { startOffset, text, number } = listItemPrefix;

          if (number !== expectedNumber) {
            context.report({
              loc: {
                start: sourceCode.getLocFromIndex(startOffset),
                end: sourceCode.getLocFromIndex(startOffset + text.length),
              },

              messageId: 'style',

              data: {
                expected: expectedNumber,
                actual: number,
              },
            });
          }
          if (listStyle === 'ordered') {
            expectedNumber++;
          }
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
