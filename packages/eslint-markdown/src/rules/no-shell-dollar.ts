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

const dollarCommandRegex = /^(?<indentation>[ \t]*)(?<prompt>\$[ \t]+)/;
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

        // An empty code block has no command to report, and its opening fence may be the only line.
        if (node.value === '') {
          return;
        }

        const [nodeStartOffset] = sourceCode.getRange(node);
        const nodeText = sourceCode.getText(node);
        const {
          start: { line: nodeStartLine },
        } = sourceCode.getLoc(node);

        // A fenced code block starts its content on the second line, and that opening fence is skipped
        // because its `lang` and `meta` can repeat the text of a code line.
        let searchOffset =
          getCodeStyle(nodeText) === 'indent'
            ? 0
            : sourceCode.getIndexFromLoc({ line: nodeStartLine + 1, column: 1 }) -
              nodeStartOffset;

        const commandRanges: [number, number][] = [];
        let previousLineContinues = false;

        for (const codeLine of node.value.split(lineEndingRegex)) {
          if (isBlankLine(codeLine)) {
            previousLineContinues = false;
            continue;
          }

          const codeLineOffset = nodeText.indexOf(codeLine, searchOffset);

          searchOffset = codeLineOffset + codeLine.length;

          if (!previousLineContinues) {
            const match = dollarCommandRegex.exec(codeLine);

            if (!match?.groups) {
              return;
            }

            const { indentation, prompt } = match.groups;
            const startOffset = nodeStartOffset + codeLineOffset + indentation.length;

            commandRanges.push([startOffset, startOffset + prompt.length]);
          }

          previousLineContinues =
            (trailingBackslashRegex.exec(codeLine)?.[0].length ?? 0) % 2 === 1;
        }

        for (const [startOffset, endOffset] of commandRanges) {
          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            messageId: 'noShellDollar',

            fix(fixer) {
              return fixer.removeRange([startOffset, endOffset]);
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
