/**
 * @fileoverview Rule to disallow consecutive blank lines.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { isBlankLine, SkipRanges } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ max: number, skipCode: boolean | string[] }]} RuleOptions
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
            minimum: 0,
          },
          skipCode: {
            oneOf: [
              {
                type: 'boolean',
              },
              {
                type: 'array',
                items: {
                  type: 'string',
                },
                uniqueItems: true,
              },
            ],
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
    const { options, sourceCode } = context;
    const [{ max, skipCode }] = options;
    const { lines } = sourceCode;

    const skipRanges = new SkipRanges();

    return {
      code(node) {
        if (
          Array.isArray(skipCode) ? node.lang && skipCode.includes(node.lang) : skipCode
        )
          skipRanges.push(sourceCode.getRange(node)); // Store range information of `Code`.
      },

      'root:exit'() {
        let consecutiveBlankLineCount = 0;

        for (let currentLineIdx = 0; currentLineIdx < lines.length; currentLineIdx++) {
          const startLoc = {
            line: currentLineIdx + 1,
            column: 1,
          };
          const endLoc =
            currentLineIdx + 1 === lines.length // When the current line is the last line.
              ? {
                  line: currentLineIdx + 1,
                  column: lines[currentLineIdx].length + 1,
                }
              : {
                  line: currentLineIdx + 2,
                  column: 1,
                };

          if (
            skipRanges.includes(sourceCode.getIndexFromLoc(startLoc)) ||
            !isBlankLine(lines[currentLineIdx])
          ) {
            consecutiveBlankLineCount = 0;
          } else {
            consecutiveBlankLineCount++;
          }

          if (max < consecutiveBlankLineCount) {
            context.report({
              loc: {
                start: startLoc,
                end: endLoc,
              },

              messageId: 'noConsecutiveBlankLine',

              fix(fixer) {
                return fixer.removeRange([
                  sourceCode.getIndexFromLoc(startLoc),
                  sourceCode.getIndexFromLoc(endLoc),
                ]);
              },
            });
          }
        }
      },
    };
  },
};
