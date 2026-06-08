/**
 * @fileoverview Rule to disallow consecutive blank lines.
 * @author 루밀LuMir(lumirlumir)
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
 * @typedef {[{ max: number, skipCode: boolean }]} RuleOptions
 * @typedef {'noConsecutiveBlankLine'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Disallow consecutive blank lines',
      url: URL_RULE_DOCS('no-consecutive-blank-line'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 0, // TODO: Think about proper minimum value
          },
          skipCode: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        max: 1,
        skipCode: true,
      },
    ],

    messages: {
      noConsecutiveBlankLine: 'Consecutive blank lines are not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const {
      sourceCode: { lines },
    } = context;
    const [{ max /* skipCode */ }] = context.options;

    return {
      'root:exit'() {
        /** @type {number | null} */
        let startIdx = null;

        for (let currentIdx = 0; currentIdx < lines.length; currentIdx++) {
          if (isBlankLine(lines[currentIdx])) {
            if (startIdx === null) {
              startIdx = currentIdx;
            }
          } else if (startIdx !== null) {
            if (currentIdx - startIdx > max) {
              context.report({
                loc: {
                  start: { line: startIdx + max + 1, column: 1 },
                  end: {
                    line: currentIdx + 1,
                    column: 1,
                  },
                },
                messageId: 'noConsecutiveBlankLine',
              });
            }

            startIdx = null;
          }
        }

        /*
         * Handle the case where the file ends with blank lines.
         * Now, `currentIdx` is equal to `lines.length`.
         */
        if (startIdx !== null && lines.length - startIdx > max) {
          context.report({
            loc: {
              start: { line: startIdx + max + 1, column: 1 },
              end: {
                line: lines.length + 1,
                column: 1,
              },
            },
            messageId: 'noConsecutiveBlankLine',
          });
        }
      },
    };
  },
};
