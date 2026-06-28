/**
 * @fileoverview Rule to enforce consistent unordered list style.
 * @author hyoban
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ListItem } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

import type { RuleModule } from '../core/types.js';

type UnorderedListStyle = '*' | '+' | '-';
type RuleOptions = [{ style: 'consistent' | 'sublist' | UnorderedListStyle }];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Get the next unordered list style in sequence.
 * Inspired by [`markdownlint`](https://github.com/DavidAnson/markdownlint/blob/v0.40.0/lib/md004.mjs#L9).
 * @param currentUnorderedListStyle The current unordered list style.
 * @returns The next unordered list style.
 */
function getNextUnorderedListStyle(
  currentUnorderedListStyle: UnorderedListStyle,
): UnorderedListStyle {
  if (currentUnorderedListStyle === '-') {
    return '+';
  } else if (currentUnorderedListStyle === '+') {
    return '*';
  } else {
    return '-';
  }
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

const rule: RuleModule<RuleOptions, MessageIds> = {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent unordered list style',
      url: URL_RULE_DOCS('consistent-unordered-list-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['consistent', 'sublist', '*', '+', '-'],
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
      style: 'Unordered list style should be `{{ style }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    const unorderedListStyle: (UnorderedListStyle | null | undefined)[] = [
      style === 'consistent' || style === 'sublist' ? null : style,
    ];
    let listDepth = -1; // NOTE: Depth `0` is the first list level, which is the top level.

    return {
      list() {
        // When entering a `list` node, increase the depth.
        // Counts both ordered and unordered lists, which matches `markdownlint`'s behavior.
        listDepth++;
      },

      'list[ordered=false] > listItem'(node: ListItem) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const currentUnorderedListStyle = sourceCode.text[
          nodeStartOffset
        ] as UnorderedListStyle;
        const currentListDepth = style === 'sublist' ? listDepth : 0;

        // `unorderedListStyle[currentListDepth]` can be `null` or `undefined`.
        if (!unorderedListStyle[currentListDepth]) {
          unorderedListStyle[currentListDepth] =
            // If the previous depth used the same style, use the next style in sequence.
            unorderedListStyle[currentListDepth - 1] === currentUnorderedListStyle
              ? getNextUnorderedListStyle(currentUnorderedListStyle)
              : currentUnorderedListStyle;
        }

        if (unorderedListStyle[currentListDepth] !== currentUnorderedListStyle) {
          const stringifiedUnorderedListStyle = String(
            unorderedListStyle[currentListDepth],
          );

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(nodeStartOffset),
              end: sourceCode.getLocFromIndex(nodeStartOffset + 1),
            },

            messageId: 'style',

            data: {
              style: stringifiedUnorderedListStyle,
            },

            fix(fixer) {
              return fixer.replaceTextRange(
                [nodeStartOffset, nodeStartOffset + 1],
                stringifiedUnorderedListStyle,
              );
            },
          });
        }
      },

      'list:exit'() {
        // When exiting a `list` node, decrease the depth.
        // Counts both ordered and unordered lists, which matches `markdownlint`'s behavior.
        listDepth--;
      },
    };
  },
};

export default rule;
