/**
 * @fileoverview Rule to disallow dollar signs before commands without showing output.
 * @author Marry(uncoolclub)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.40.0/lib/md014.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getCodeStyle, isBlankLine } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `no-shell-dollar` rule.
 */
type RuleOptions = [
  {
    /**
     * An array of code block language identifiers to skip.
     * @default []
     */
    skipCode: string[];
  },
];
type MessageIds = 'noShellDollar';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const dollarCommandRegex = /^[ \t]*\$[ \t]+/u;
const promptRegex = /\$[ \t]+/u;
const trailingBackslashRegex = /\\+$/u;
// CommonMark accepts CR, LF, and CRLF as line endings, and `Code#value` keeps them as written.
const lineEndingRegex = /\r\n|[\r\n]/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow dollar signs before commands without showing output',
      url: URL_RULE_DOCS('no-shell-dollar'),
      recommended: false,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          skipCode: {
            type: 'array',
            items: {
              type: 'string',
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipCode: [],
      },
    ],

    messages: {
      noShellDollar:
        'Dollar sign should not be used before commands without showing output.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ skipCode }] = context.options;

    return {
      code(node) {
        if (node.lang && skipCode.includes(node.lang)) {
          return;
        }

        const [nodeStartOffset] = sourceCode.getRange(node);
        const {
          start: { line: nodeStartLine },
        } = sourceCode.getLoc(node);
        // A fenced code block starts its content on the second line, so its opening fence is skipped.
        const firstCodeLine =
          getCodeStyle(sourceCode.text[nodeStartOffset]) === 'indent'
            ? nodeStartLine
            : nodeStartLine + 1;

        const promptLocs: { line: number; column: number; endColumn: number }[] = [];
        let previousLineContinues = false;

        for (const [index, codeLine] of node.value.split(lineEndingRegex).entries()) {
          if (isBlankLine(codeLine)) {
            previousLineContinues = false;
            continue;
          }

          if (!previousLineContinues) {
            if (!dollarCommandRegex.test(codeLine)) {
              return;
            }

            // `Code#value` drops container markers and expands partial tabs, so the prompt is located on the
            // source line instead. Everything before it is `>`, spaces, or tabs, so the first `$` is the prompt.
            const line = firstCodeLine + index;
            const match = promptRegex.exec(sourceCode.lines[line - 1]) as RegExpExecArray;

            promptLocs.push({
              line,
              column: match.index + 1,
              endColumn: match.index + 1 + match[0].length,
            });
          }

          previousLineContinues =
            (trailingBackslashRegex.exec(codeLine)?.[0].length ?? 0) % 2 === 1;
        }

        for (const { line, column, endColumn } of promptLocs) {
          const start = { line, column };
          const end = { line, column: endColumn };

          context.report({
            loc: { start, end },

            messageId: 'noShellDollar',

            fix(fixer) {
              return fixer.removeRange([
                sourceCode.getIndexFromLoc(start),
                sourceCode.getIndexFromLoc(end),
              ]);
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
