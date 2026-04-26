/**
 * @fileoverview Rule to enforce the use of capital letters at the beginning of sentences.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { Node, Parent, Heading, Paragraph, TableCell, Text } from 'mdast';
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ skipBlockquote: boolean, skipFootnoteDefinition: boolean, skipHeading: boolean, skipListItem: boolean, skipParagraph: boolean, skipTableCell: boolean | 'th' | 'td' }]} RuleOptions
 * @typedef {'requireCapitalization'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const lowercaseRegex = /^[a-z]/u;

/**
 * Traverses the Markdown AST using a DFS pre-order approach to find the first text node.
 * @param {Node} node
 * @returns {Text | null}
 */
function findFirstTextNode(node) {
  // Base case: if the current node is a text node, return it.
  if (node.type === 'text') {
    return /** @type {Text} */ (node);
  }

  // Check if the current node has children to traverse.
  // In the Markdown AST (Mdast), if a node has children
  // they are always represented as an array even when empty.
  if ('children' in node) {
    const parentNode = /** @type {Parent} */ (node);

    for (const child of parentNode.children) {
      const textNode = findFirstTextNode(child);

      // Return the first text node found in the subtree.
      if (textNode) {
        return textNode;
      }
    }
  }

  // When no text node is found in the subtree, return `null`.
  return null;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of capital letters at the beginning of sentences',
      url: URL_RULE_DOCS('require-capitalization'),
      recommended: false,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          skipBlockquote: {
            type: 'boolean',
          },
          skipFootnoteDefinition: {
            type: 'boolean',
          },
          skipHeading: {
            type: 'boolean',
          },
          skipListItem: {
            type: 'boolean',
          },
          skipParagraph: {
            type: 'boolean',
          },
          skipTableCell: {
            oneOf: [
              {
                type: 'boolean',
              },
              {
                enum: ['th', 'td'],
              },
            ],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipBlockquote: false,
        skipFootnoteDefinition: false,
        skipHeading: false,
        skipListItem: false,
        skipParagraph: false,
        skipTableCell: false,
      },
    ],

    messages: {
      requireCapitalization: '`{{ lowercase }}` should be capitalized.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [
      {
        skipBlockquote,
        skipFootnoteDefinition,
        skipHeading,
        skipListItem,
        skipParagraph,
        skipTableCell,
      },
    ] = context.options;

    /** @param {Heading | Paragraph | TableCell} node */
    function report(node) {
      const textNode = findFirstTextNode(node);

      if (!textNode) return;

      const match = lowercaseRegex.exec(textNode.value);

      if (!match) return;

      const [nodeStartOffset] = sourceCode.getRange(textNode);
      const lowercase = match[0];
      const startOffset = nodeStartOffset + match.index;
      const endOffset = startOffset + lowercase.length;

      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(startOffset),
          end: sourceCode.getLocFromIndex(endOffset),
        },

        data: {
          lowercase,
        },

        messageId: 'requireCapitalization',

        fix(fixer) {
          return fixer.replaceTextRange(
            [startOffset, endOffset],
            lowercase.toUpperCase(),
          );
        },
      });
    }

    return {
      // blockquote
      'blockquote > paragraph'(/** @type {Paragraph} */ node) {
        if (skipBlockquote) return;

        report(node);
      },

      // footnoteDefinition
      'footnoteDefinition > paragraph'(/** @type {Paragraph} */ node) {
        if (skipFootnoteDefinition) return;

        report(node);
      },

      // heading
      heading(node) {
        if (skipHeading) return;

        report(node);
      },

      // listItem
      'listItem > paragraph'(/** @type {Paragraph} */ node) {
        if (skipListItem) return;

        report(node);
      },

      // paragraph
      'paragraph:not(blockquote > paragraph, footnoteDefinition > paragraph, listItem > paragraph)'(
        /** @type {Paragraph} */ node,
      ) {
        if (skipParagraph) return;

        report(node);
      },

      // tableCell: th (table header)
      'table > tableRow:first-child > tableCell'(node) {
        if (skipTableCell === true || skipTableCell === 'th') return;

        report(node);
      },

      // tableCell: td (table data)
      'table > tableRow:not(:first-child) > tableCell'(node) {
        if (skipTableCell === true || skipTableCell === 'td') return;

        report(node);
      },
    };
  },
};
