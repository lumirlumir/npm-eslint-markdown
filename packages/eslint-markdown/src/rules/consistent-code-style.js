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

import { isBlankLine } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {'indent' | 'fence-backtick' | 'fence-tilde'} CodeStyle
 * @typedef {[{ style: 'consistent' | CodeStyle, blankLineAbove: number | false, blankLineBelow: number | false }]} RuleOptions
 * @typedef {'style' | 'blankLineAbove' | 'blankLineBelow'} MessageIds
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
          blankLineAbove: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'integer',
                minimum: 1,
              },
            ],
          },
          blankLineBelow: {
            oneOf: [
              {
                enum: [false],
              },
              {
                type: 'integer',
                minimum: 1,
              },
            ],
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        style: 'consistent',
        blankLineAbove: false,
        blankLineBelow: false,
      },
    ],

    messages: {
      style: 'Code style should be `{{ style }}`.',
      blankLineAbove:
        'Code should be surrounded by {{ blankLineAbove }} blank line(s) above.',
      blankLineBelow:
        'Code should be surrounded by {{ blankLineBelow }} blank line(s) below.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const { lines } = sourceCode;
    const [{ style, blankLineAbove, blankLineBelow }] = context.options;

    /** @type {CodeStyle | null} */
    let codeStyle = style === 'consistent' ? null : style;

    return {
      code(node) {
        const {
          start: { line: nodeStartLine },
          end: { line: nodeEndLine },
        } = sourceCode.getLoc(node);

        // ------------------------------------------------------------------------
        // 1. Check blank lines above the code block.
        // ------------------------------------------------------------------------

        if (blankLineAbove !== false) {
          const nodeStartLineIndex = nodeStartLine - 1;

          for (
            let i = nodeStartLineIndex - 1; // Start checking from the line above the code block.
            i >= nodeStartLineIndex - blankLineAbove; // Check up to the specified number of blank lines.
            i-- // Move upwards through the lines.
          ) {
            const line = lines[i];

            // If the line is `undefined`, it means we've reached the beginning of the file.
            if (line === undefined) {
              break;
            }

            // If the line is blank, continue checking the next line. If it's not blank, report the issue.
            if (isBlankLine(line)) {
              continue;
            }

            context.report({
              node,

              messageId: 'blankLineAbove',

              data: {
                blankLineAbove,
              },
            });

            // No need to check further once we've found a non-blank line.
            break;
          }
        }

        // ------------------------------------------------------------------------
        // 2. Check blank lines below the code block.
        // ------------------------------------------------------------------------

        if (blankLineBelow !== false) {
          const nodeEndLineIndex = nodeEndLine - 1;

          for (
            let i = nodeEndLineIndex + 1; // Start checking from the line below the code block.
            i <= nodeEndLineIndex + blankLineBelow; // Check up to the specified number of blank lines.
            i++ // Move downwards through the lines.
          ) {
            const line = lines[i];

            // If the line is `undefined`, it means we've reached the end of the file.
            if (line === undefined) {
              break;
            }

            // If the line is blank, continue checking the next line. If it's not blank, report the issue.
            if (isBlankLine(line)) {
              continue;
            }

            context.report({
              node,

              messageId: 'blankLineBelow',

              data: {
                blankLineBelow,
              },
            });

            // No need to check further once we've found a non-blank line.
            break;
          }
        }

        // ------------------------------------------------------------------------
        // 3. Check code style consistency.
        // ------------------------------------------------------------------------

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
