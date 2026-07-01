/**
 * @fileoverview Rule to enforce the use of capital letters at the beginning of sentences.
 * @author lumir(lumirlumir)
 */

/* eslint-disable -- TODO: This rule is not fully migrated to TypeScript yet. */
// @ts-nocheck -- TODO

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Heading, Paragraph, Text } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [{ skipHeading: boolean; skipListItem: boolean }];
type MessageIds = 'enCapitalization';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const lowercaseRegex = /^[a-z]/u;

function hasChildren(node: unknown): node is { children: unknown[] } {
  return (
    typeof node === 'object' &&
    node !== null &&
    'children' in node &&
    Array.isArray(node.children)
  );
}

function isTextNode(node: unknown): node is Text {
  return (
    typeof node === 'object' && node !== null && 'type' in node && node.type === 'text'
  );
}

/**
 * Traverses the Markdown AST using a DFS pre-order approach to find the first text node.
 * @param node The node to start searching from.
 * @returns The first text node, if present.
 */
function findFirstLeafTextNode(node: unknown): Text | null {
  // Base case: if this is a text node, return it
  if (isTextNode(node)) return node;

  // Check if node has children to traverse
  if (hasChildren(node) && node.children.length > 0)
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

const rule: RuleModule<RuleOptions, MessageIds> = {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of capital letters at the beginning of sentences',
      url: URL_RULE_DOCS('en-capitalization'),
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
      enCapitalization: '`{{ lowercase }}` should be capitalized.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    /** @param node The heading or paragraph node to report. */
    function report(node: Heading | Paragraph) {
      const textNode = findFirstLeafTextNode(node);

      if (!textNode) return;

      const { position } = textNode;
      const startOffset = position?.start.offset;

      if (position === undefined || startOffset === undefined) return;

      const match = textNode.value.match(lowercaseRegex);

      if (!match) return;

      const lowercase = match[0];

      context.report({
        loc: {
          start: {
            line: position.start.line,
            column: position.start.column,
          },
          end: {
            line: position.start.line,
            column: position.start.column + lowercase.length,
          },
        },

        data: {
          lowercase: match[0],
        },

        messageId: 'enCapitalization',

        fix(fixer) {
          return fixer.replaceTextRange(
            [startOffset, startOffset + lowercase.length],
            lowercase.toUpperCase(),
          );
        },
      });
    }

    const [{ skipHeading, skipListItem }] = context.options;

    return {
      paragraph(node) {
        if (context.sourceCode.getParent(node)?.type === 'listItem' && skipListItem)
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

export default rule;
