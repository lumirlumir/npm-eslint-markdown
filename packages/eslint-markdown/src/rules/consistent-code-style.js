/**
 * @fileoverview Rule to enforce consistent code style.
 * @author 루밀LuMir(lumirlumir)
 */

/*
 * Note on autofix and suggestion safety:
 * - Converting `fence-backtick` to `fence-tilde` is safe.
 * - Converting `fence-backtick` to `indent` is not safe, as `lang` and `meta` information would be lost.
 * - Converting `fence-tilde` to `fence-backtick` is safe.
 * - Converting `fence-tilde` to `indent` is not safe, as `lang` and `meta` information would be lost.
 * - Converting `indent` to `fence-backtick` is safe.
 * - Converting `indent` to `fence-tilde` is safe.
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
 * @typedef {'indent' | 'fence-backtick' | 'fence-tilde'} CodeStyle
 * @typedef {[{ style: 'consistent' | CodeStyle }]} RuleOptions
 * @typedef {'style'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Get the current code style based on the given text.
 * @param {string} text The text to determine the code style from.
 * @returns {CodeStyle} The current code style.
 */
function getCurrentCodeStyle(text) {
  if (text === '`') {
    return 'fence-backtick';
  } else if (text === '~') {
    return 'fence-tilde';
  } else {
    return 'indent';
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
      description: 'Enforce consistent code style',
      url: URL_RULE_DOCS('consistent-code-style'),
      recommended: false,
      stylistic: true,
    },

    // fixable: 'code', // TODO

    // hasSuggestions: true, // TODO

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: ['consistent', 'indent', 'fence-backtick', 'fence-tilde'],
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
      style: 'Code style should be `{{ style }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    /** @type {CodeStyle | null} */
    let codeStyle = style === 'consistent' ? null : style;

    return {
      code(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const currentCodeStyle = getCurrentCodeStyle(sourceCode.text[nodeStartOffset]);

        if (codeStyle === null) {
          codeStyle = currentCodeStyle;
        }

        if (codeStyle !== currentCodeStyle) {
          context.report({
            node,

            messageId: 'style',

            data: {
              style: codeStyle,
            },
          });
        }
      },
    };
  },
};
