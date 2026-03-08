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

const codeSpanRegex = /^(?<delimiter>`+)(?<content>[\s\S]*?)\k<delimiter>$/u;
const contentPaddingRegex = /^(?<leading>[ \t]*)(?<value>[\s\S]*?)(?<trailing>[ \t]*)$/u;
const trimPaddingRegex = /^[ \t]+|[ \t]+$/gu;

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
        const text = sourceCode.getText(node);
        const codeSpanMatch = text.match(codeSpanRegex);

        if (!codeSpanMatch) return;
        if (!codeSpanMatch.groups) return;

        const { delimiter: openingDelimiter, content } = codeSpanMatch.groups;
        const closingDelimiter = openingDelimiter;
        const {
          leading = '',
          value = '',
          trailing = '',
        } = content.match(contentPaddingRegex)?.groups ?? {};

        const isNoSurroundingPadding = leading === '' && trailing === '';
        const isSingleSurroundingSpace = leading === ' ' && trailing === ' ';
        const isOnlySpaces =
          value === '' && !leading.includes('\t') && !trailing.includes('\t');

        if (isNoSurroundingPadding || isSingleSurroundingSpace || isOnlySpaces) return;

        context.report({
          node,
          messageId: 'style',
          fix(fixer) {
            return fixer.replaceText(
              node,
              `${openingDelimiter}${content.replace(trimPaddingRegex, '')}${closingDelimiter}`,
            );
          },
        });
      },
    };
  },
};
