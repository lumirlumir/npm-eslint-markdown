/**
 * @fileoverview Rule to enforce consistent inline code style.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {'style'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const codeSpanRegex =
  /^(?<delimiter>`+)(?<leadingSpaces>[ \t]*)(?<value>[\s\S]*?)(?<trailingSpaces>[ \t]*)\k<delimiter>$/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<[], MessageIds>} */
export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent inline code style',
      url: URL_RULE_DOCS('consistent-inline-code-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    messages: {
      style: 'Inline code should not have extra spaces or tabs next to backticks.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    return {
      inlineCode(node) {
        const match = sourceCode.getText(node).match(codeSpanRegex);

        // Protect against unexpected cases, even though they should not occur in theory.
        if (!match || !match.groups) return;

        const { delimiter, leadingSpaces, value, trailingSpaces } = match.groups;

        if (!value) return;

        const preservePadding =
          leadingSpaces.includes(' ') &&
          trailingSpaces.includes(' ') &&
          !leadingSpaces.includes('\t') &&
          !trailingSpaces.includes('\t') &&
          (leadingSpaces.length === 1 ||
            trailingSpaces.length === 1 ||
            value.startsWith('`') ||
            value.endsWith('`'));

        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);
        const leadingKeep =
          preservePadding ||
          (trailingSpaces === '' &&
            !leadingSpaces.includes('\t') &&
            value.startsWith('`'))
            ? 1
            : 0;
        const trailingKeep =
          preservePadding ||
          (leadingSpaces === '' && !trailingSpaces.includes('\t') && value.endsWith('`'))
            ? 1
            : 0;

        if (leadingSpaces.length > leadingKeep) {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(
                nodeStartOffset + delimiter.length + leadingKeep,
              ),
              end: sourceCode.getLocFromIndex(
                nodeStartOffset + delimiter.length + leadingSpaces.length,
              ),
            },
            messageId: 'style',
            fix(fixer) {
              return fixer.removeRange([
                nodeStartOffset + delimiter.length + leadingKeep,
                nodeStartOffset + delimiter.length + leadingSpaces.length,
              ]);
            },
          });
        }

        if (trailingSpaces.length > trailingKeep) {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(
                nodeEndOffset - delimiter.length - trailingSpaces.length,
              ),
              end: sourceCode.getLocFromIndex(
                nodeEndOffset - delimiter.length - trailingKeep,
              ),
            },
            messageId: 'style',
            fix(fixer) {
              return fixer.removeRange([
                nodeEndOffset - delimiter.length - trailingSpaces.length,
                nodeEndOffset - delimiter.length - trailingKeep,
              ]);
            },
          });
        }
      },
    };
  },
};
