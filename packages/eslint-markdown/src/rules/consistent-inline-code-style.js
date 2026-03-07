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

const whitespaceRegex = /^[ \t]+|[ \t]+$/gu;
const openingDelimiterRegex = /^`+/u;
const closingDelimiterRegex = /`+$/u;
const leadingWhitespaceRegex = /^[ \t]+/u;
const trailingWhitespaceRegex = /[ \t]+$/u;

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

    schema: [],

    defaultOptions: [],

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
        const text = sourceCode.getText(node);

        const openingDelimiter = text.match(openingDelimiterRegex)?.[0] ?? '';
        const closingDelimiter = text.match(closingDelimiterRegex)?.[0] ?? '';
        const content = text.slice(openingDelimiter.length, -closingDelimiter.length);

        const leadingWhitespace = content.match(leadingWhitespaceRegex)?.[0] ?? '';
        const trailingWhitespace = content.match(trailingWhitespaceRegex)?.[0] ?? '';

        const isSingleSurroundingSpace =
          leadingWhitespace === ' ' && trailingWhitespace === ' ';

        if (
          (leadingWhitespace === '' && trailingWhitespace === '') ||
          isSingleSurroundingSpace
        )
          return;

        context.report({
          node,
          messageId: 'style',
          fix(fixer) {
            return fixer.replaceText(
              node,
              `${openingDelimiter}${content.replace(whitespaceRegex, '')}${closingDelimiter}`,
            );
          },
        });
      },
    };
  },
};
