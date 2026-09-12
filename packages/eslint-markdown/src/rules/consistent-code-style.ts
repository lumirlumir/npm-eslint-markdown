/**
 * @fileoverview Rule to enforce consistent code style.
 * @author lumir(lumirlumir)
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

import { isBlankLine } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type CodeStyle = (typeof CODE_STYLE)[number];

/**
 * Options for the `consistent-code-style` rule.
 */
type RuleOptions = [
  {
    /**
     * When `style` is set to `'consistent'`, the rule enforces that all code blocks in the document use the same style as the first one encountered.
     * @default 'consistent'
     */
    style: 'consistent' | CodeStyle;
    /**
     * Require a specific number of blank lines above each fenced code block.
     * @default false
     */
    blankLineAbove: number | false;
    /**
     * Require a specific number of blank lines below each fenced code block.
     * @default false
     */
    blankLineBelow: number | false;
  },
];
type MessageIds = 'style' | 'blankLineAbove' | 'blankLineBelow';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const CODE_STYLE = ['indent', 'fence-backtick', 'fence-tilde'] as const;

/**
 * Get the current code style based on the given text.
 * @param text The text to determine the code style from.
 * @returns The current code style.
 */
function getCurrentCodeStyle(text: string): CodeStyle {
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

export default {
  meta: {
    type: 'layout',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description: 'Enforce consistent code style',
      dialects: ['CommonMark', 'GFM'],
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
            enum: ['consistent', ...CODE_STYLE],
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
  },

  create(context) {
    const { sourceCode } = context;
    const { lines } = sourceCode;
    const [{ style, blankLineAbove, blankLineBelow }] = context.options;

    let codeStyle: CodeStyle | null = style === 'consistent' ? null : style;
    let blockquoteDepth = -1; // NOTE: Depth `0` is the first blockquote level, which is the top level.

    return {
      blockquote() {
        // When entering a `blockquote` node, increase the depth.
        blockquoteDepth++;
      },

      code(node) {
        // ------------------------------------------------------------------------
        // 1. Check code style consistency.
        // ------------------------------------------------------------------------

        const { start, end } = sourceCode.getLoc(node);
        const [nodeStartOffset] = sourceCode.getRange(node);
        const currentCodeFenceChar = sourceCode.text[nodeStartOffset];
        const currentCodeStyle = getCurrentCodeStyle(currentCodeFenceChar);
        const nodeStartLineIndex = start.line - 1;
        const nodeEndLineIndex = end.line - 1;

        if (codeStyle === null) {
          codeStyle = currentCodeStyle;
        }

        if (codeStyle !== currentCodeStyle) {
          context.report({
            loc: {
              start,
              end: {
                line: start.line,
                column: (() => {
                  const nodeStartLineText = lines[nodeStartLineIndex];

                  if (currentCodeStyle === 'indent') {
                    return nodeStartLineText.length + 1;
                  }

                  let { column } = start;

                  while (nodeStartLineText[column - 1] === currentCodeFenceChar) {
                    column++;
                  }

                  return column;
                })(),
              },
            },

            messageId: 'style',

            data: {
              style: codeStyle,
            },
          });
        }

        // ------------------------------------------------------------------------
        // 2. Check blank lines above the code block.
        // ------------------------------------------------------------------------

        // `markdownlint` doesn't check blank lines above indented code blocks, so we skip this check for the `indent` style.
        if (blankLineAbove !== false && currentCodeStyle !== 'indent') {
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
            if (isBlankLine(line, blockquoteDepth)) {
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
        // 3. Check blank lines below the code block.
        // ------------------------------------------------------------------------

        // `markdownlint` doesn't check blank lines below indented code blocks, so we skip this check for the `indent` style.
        if (blankLineBelow !== false && currentCodeStyle !== 'indent') {
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
            if (isBlankLine(line, blockquoteDepth)) {
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
      },

      'blockquote:exit'() {
        // When exiting a `blockquote` node, decrease the depth.
        blockquoteDepth--;
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
