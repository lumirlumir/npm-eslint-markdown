/**
 * @fileoverview Rule to disallow consecutive blank lines.
 * @author lumir(lumirlumir)
 * @see https://github.com/DavidAnson/markdownlint/blob/main/lib/md012.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { isBlankLine, SkipRanges } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [{ max: number; skipCode: boolean | string[] }];
type MessageIds = 'noConsecutiveBlankLine';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

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
            minimum: 1,
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
      noConsecutiveBlankLine:
        'More than {{ max }} consecutive blank line(s) are not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { options, sourceCode } = context;
    const [{ max, skipCode }] = options;
    const { lines, text } = sourceCode;

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
          } as const;
          const endLoc = {
            line: currentLineIdx + 2,
            column: 1,
          } as const;

          if (
            skipRanges.includes(sourceCode.getIndexFromLoc(startLoc)) ||
            !isBlankLine(lines[currentLineIdx])
          ) {
            consecutiveBlankLineCount = 0;
          } else {
            consecutiveBlankLineCount++;
          }

          if (max < consecutiveBlankLineCount) {
            const lastAllowedBlankLineIdx =
              currentLineIdx - consecutiveBlankLineCount + max;

            context.report({
              loc: {
                start: startLoc,
                end: endLoc,
              },

              data: {
                max,
              },

              messageId: 'noConsecutiveBlankLine',

              fix(fixer) {
                /*
                 * When the consecutive blank-line run reaches EOF, the fixer must remove the
                 * whole excess tail at once instead of removing only the current line.
                 *
                 * `currentLineIdx + 1 === lines.length` means the current line is the final
                 * logical line in `sourceCode.lines`. In a case like `foo\n\n\n  ` with
                 * `max: 1`, the final line is still a blank line, but it may contain spaces.
                 * If we only remove from the current line start, those trailing spaces can
                 * survive and produce `foo\n  ` instead of the intended `foo\n`.
                 *
                 * The start of the removal range is calculated from the last blank line that
                 * is still allowed by `max`:
                 *
                 *   currentLineIdx - consecutiveBlankLineCount
                 *     -> zero-based index of the first line in the current blank-line run
                 *
                 *   + max
                 *     -> zero-based index of the last blank line we want to keep
                 *
                 *   + 1
                 *     -> convert the zero-based line index to ESLint's one-based loc line
                 *
                 * The column is `lines[lastAllowedBlankLineIdx].length + 1`, which points to the
                 * end of that allowed blank line. The range then ends at `text.length`, so
                 * everything after the allowed blank line is removed, including remaining blank
                 * lines, line endings, and any spaces on the final blank line.
                 *
                 * Example with `foo\n\n\n  ` and `max: 1`:
                 *
                 *   lines = ['foo', '', '', '  ']
                 *   currentLineIdx = 3
                 *   consecutiveBlankLineCount = 3
                 *   max = 1
                 *
                 *   lastAllowedBlankLineIdx = 3 - 3 + 1 = 1
                 *
                 * So the fixer removes from the end of line 2 to EOF, producing `foo\n`.
                 */
                if (currentLineIdx + 1 === lines.length) {
                  return fixer.removeRange([
                    sourceCode.getIndexFromLoc({
                      line: lastAllowedBlankLineIdx + 1,
                      column: lines[lastAllowedBlankLineIdx].length + 1,
                    }),
                    text.length,
                  ]);
                } else {
                  return fixer.removeRange([
                    sourceCode.getIndexFromLoc(startLoc),
                    sourceCode.getIndexFromLoc(endLoc),
                  ]);
                }
              },
            });
          }
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
