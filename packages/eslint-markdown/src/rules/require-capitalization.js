/**
 * @fileoverview Rule to enforce the use of capital letters at the beginning of sentences.
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
 * @import { Text, Heading, Paragraph } from 'mdast';
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ skipHeading: boolean, skipListItem: boolean }]} RuleOptions
 * @typedef {'requireCapitalization'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const lowercaseRegex = /^[a-z]/u;

/**
 * Traverses the Markdown AST using a DFS pre-order approach to find the first text node.
 * @param {any} node
 * @returns {Text | null}
 */
function findFirstLeafTextNode(node) {
  // Base case: if this is a text node, return it
  if (node.type === 'text') return node;

  // Check if node has children to traverse
  if (node.children && node.children.length > 0)
    // Iterate through children in order
    for (const child of node.children) {
      const textNode = findFirstLeafTextNode(child);
      // Return the first text node found in the subtree
      if (textNode) return textNode;
    }

  // No text node found in this subtree
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
          skipHeading: {
            type: 'boolean',
          },
          skipListItem: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipHeading: true,
        skipListItem: true,
      },
    ],

    messages: {
      requireCapitalization: '`{{ lowercase }}` should be capitalized.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    /** @param {Heading | Paragraph} node */
    function report(node) {
      const textNode = findFirstLeafTextNode(node);

      if (!textNode) return;

      const match = textNode.value.match(lowercaseRegex);

      if (!match) return;

      const lowercase = match[0];

      context.report({
        loc: {
          start: {
            line: textNode.position.start.line,
            column: textNode.position.start.column,
          },
          end: {
            line: textNode.position.start.line,
            column: textNode.position.start.column + lowercase.length,
          },
        },

        data: {
          lowercase: match[0],
        },

        messageId: 'requireCapitalization',

        fix(fixer) {
          return fixer.replaceTextRange(
            [
              textNode.position.start.offset,
              textNode.position.start.offset + lowercase.length,
            ],
            lowercase.toUpperCase(),
          );
        },
      });
    }

    const [{ skipHeading, skipListItem }] = context.options;

    return {
      paragraph(node) {
        if (context.sourceCode.getParent(node).type === 'listItem' && skipListItem)
          return;

        report(node);
      },

      heading(node) {
        if (skipHeading) return;

        report(node);
      },
    };
  },
};
