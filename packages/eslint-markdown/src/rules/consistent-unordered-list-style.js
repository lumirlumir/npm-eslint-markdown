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
// Constant
// --------------------------------------------------------------------------------

const SUBLIST_MARKERS = ['*', '+', '-'];

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

    /** @type {string | null} */
    let unorderedListStyle = style === 'consistent' ? null : style;
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

        /** @type {string} */
        let expectedMarker;

        if (style === 'sublist') {
          expectedMarker = SUBLIST_MARKERS[unorderedListDepth % 3];
        } else if (style === 'consistent') {
          if (unorderedListStyle === null) {
            unorderedListStyle = currentUnorderedListStyle;
          }
          expectedMarker = unorderedListStyle;
        } else {
          expectedMarker = style;
        }

        if (expectedMarker !== currentUnorderedListStyle) {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(nodeStartOffset),
              end: sourceCode.getLocFromIndex(nodeStartOffset + 1),
            },

            messageId: 'style',

            data: {
              style: expectedMarker,
            },

            fix(fixer) {
              return fixer.replaceTextRange(
                [nodeStartOffset, nodeStartOffset + 1],
                expectedMarker,
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
