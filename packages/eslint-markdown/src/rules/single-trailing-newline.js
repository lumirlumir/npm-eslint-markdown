/**
 * @fileoverview Rule to require files to end with a single newline character.
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
 * @typedef {[]} RuleOptions
 * @typedef {'singleTrailingNewline'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const lineFeed = '\n';
const carriageReturnLineFeed = '\r\n';
const trailingNewlineRegex = /(?:\r?\n)+$/u;

/**
 * @param {string} text
 * @returns {string}
 */
function getPreferredNewline(text) {
  const trailingNewlineMatch = trailingNewlineRegex.exec(text);

  if (trailingNewlineMatch?.[0].startsWith(carriageReturnLineFeed)) {
    return carriageReturnLineFeed;
  }

  return text.includes(carriageReturnLineFeed) ? carriageReturnLineFeed : lineFeed;
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Require files to end with a single newline character',
      url: URL_RULE_DOCS('single-trailing-newline'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    messages: {
      singleTrailingNewline: 'File should end with a single newline character.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    return {
      'root:exit'() {
        const { text } = sourceCode;

        if (text === '') {
          return;
        }

        const trailingNewlineMatch = trailingNewlineRegex.exec(text);
        const preferredNewline = getPreferredNewline(text);

        if (trailingNewlineMatch === null) {
          const eof = sourceCode.getLocFromIndex(text.length);

          context.report({
            loc: {
              start: eof,
              end: eof,
            },
            messageId: 'singleTrailingNewline',
            fix(fixer) {
              return fixer.insertTextAfterRange([0, text.length], preferredNewline);
            },
          });

          return;
        }

        if (
          trailingNewlineMatch[0] !== lineFeed &&
          trailingNewlineMatch[0] !== carriageReturnLineFeed
        ) {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(trailingNewlineMatch.index),
              end: sourceCode.getLocFromIndex(text.length),
            },
            messageId: 'singleTrailingNewline',
            fix(fixer) {
              return fixer.replaceTextRange(
                [trailingNewlineMatch.index, text.length],
                preferredNewline,
              );
            },
          });
        }
      },
    };
  },
};
