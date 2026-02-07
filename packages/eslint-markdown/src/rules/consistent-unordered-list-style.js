/**
 * @fileoverview Rule to enforce consistent unordered list style.
 * @author hyoban
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { ListItem } from 'mdast';
 * @import { RuleModule } from '../core/types.js';
 * @typedef {'*' | '+' | '-'} UnorderedListMarker
 * @typedef {[{ style: 'consistent' | 'sublist' | UnorderedListMarker }]} RuleOptions
 * @typedef {'style'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Get the next unordered list marker in sequence. Inspired by [`markdownlint`](https://github.com/DavidAnson/markdownlint/blob/v0.40.0/lib/md004.mjs#L9).
 * @param {UnorderedListMarker} currentUnorderedListMarker The current unordered list marker.
 * @returns {UnorderedListMarker} The next unordered list marker.
 */
function getNextUnorderedListMarker(currentUnorderedListMarker) {
  if (currentUnorderedListMarker === '-') {
    return '+';
  } else if (currentUnorderedListMarker === '+') {
    return '*';
  } else {
    return '-';
  }
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
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

    /** @type {Array<UnorderedListMarker | null | undefined>} */
    const unorderedListStyle = [
      style === 'consistent' || style === 'sublist' ? null : style,
    ];
    let listDepth = -1;

    return {
      list() {
        // When entering a list node, increase the depth.
        listDepth++;
      },

      'list[ordered=false] > listItem'(/** @type {ListItem} */ node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const currentUnorderedListStyle = /** @type {UnorderedListMarker} */ (
          sourceCode.text[nodeStartOffset]
        );
        const currentListDepth = style === 'sublist' ? listDepth : 0;

        // `unorderedListStyle[currentListDepth]` can be `null` or `undefined`.
        if (!unorderedListStyle[currentListDepth]) {
          unorderedListStyle[currentListDepth] =
            unorderedListStyle[currentListDepth - 1] === currentUnorderedListStyle
              ? getNextUnorderedListMarker(currentUnorderedListStyle)
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
        // When exiting a list node, decrease the depth.
        listDepth--;
      },
    };
  },
};
