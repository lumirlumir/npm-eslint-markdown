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
 * @import { RuleModule, Nullable } from '../core/types.js';
 * @typedef {'*' | '+' | '-'} UnorderedListMarker
 * @typedef {[{ style: 'consistent' | 'sublist' | UnorderedListMarker }]} RuleOptions
 * @typedef {'style'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Get the next unordered list marker in sequence. Inspired by `markdownlint`.
 * @param {UnorderedListMarker} currentUnorderedListMarker The current unordered list marker.
 * @returns {UnorderedListMarker} The next unordered list marker.
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.40.0/lib/md004.mjs#L9
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

    /** @type {[Nullable<UnorderedListMarker>, Nullable<UnorderedListMarker>, Nullable<UnorderedListMarker>]} */
    const unorderedListStyle = [
      style === 'consistent' || style === 'sublist' ? null : style,
      null,
      null,
    ];
    let unorderedListDepth = -1;

    return {
      'list[ordered=false]'() {
        // When entering an unordered list, increase depth.
        unorderedListDepth++;
      },

      'list[ordered=false] > listItem'(/** @type {ListItem} */ node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const currentUnorderedListStyle = /** @type {UnorderedListMarker} */ (
          sourceCode.text[nodeStartOffset]
        );
        const currentUnorderedListDepth =
          style === 'sublist' ? unorderedListDepth % 3 : 0;

        if (unorderedListStyle[currentUnorderedListDepth] === null) {
          // TODO: Simplify this logic.
          if (
            unorderedListStyle[(currentUnorderedListDepth + 2) % 3] ===
            currentUnorderedListStyle
          ) {
            unorderedListStyle[currentUnorderedListDepth] = getNextUnorderedListMarker(
              currentUnorderedListStyle,
            );
          } else {
            unorderedListStyle[currentUnorderedListDepth] = currentUnorderedListStyle;
          }
        }

        if (unorderedListStyle[currentUnorderedListDepth] !== currentUnorderedListStyle) {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(nodeStartOffset),
              end: sourceCode.getLocFromIndex(nodeStartOffset + 1),
            },

            messageId: 'style',

            data: {
              style: unorderedListStyle[currentUnorderedListDepth],
            },

            fix(fixer) {
              return fixer.replaceTextRange(
                [nodeStartOffset, nodeStartOffset + 1],
                // @ts-expect-error -- TODO
                unorderedListStyle[currentUnorderedListDepth],
              );
            },
          });
        }
      },

      'list[ordered=false]:exit'() {
        // When exiting an unordered list, decrease depth.
        unorderedListDepth--;
      },
    };
  },
};
