/**
 * @fileoverview Rule to disallow curly quotes(`“`, `”`, `‘` or `’`) in text.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [
  {
    checkLeftDoubleQuotationMark: boolean;
    checkRightDoubleQuotationMark: boolean;
    checkLeftSingleQuotationMark: boolean;
    checkRightSingleQuotationMark: boolean;
  },
];
type MessageIds = 'noCurlyQuote';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const leftDoubleQuotationMark = '\u201C'; // `“`
const rightDoubleQuotationMark = '\u201D'; // `”`
const leftSingleQuotationMark = '\u2018'; // `‘`
const rightSingleQuotationMark = '\u2019'; // `’`
const doubleQuotationMark = '"';
const singleQuotationMark = "'";

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow curly quotes(`“`, `”`, `‘` or `’`) in text',
      url: URL_RULE_DOCS('no-curly-quote'),
      recommended: true,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          checkLeftDoubleQuotationMark: {
            type: 'boolean',
          },
          checkRightDoubleQuotationMark: {
            type: 'boolean',
          },
          checkLeftSingleQuotationMark: {
            type: 'boolean',
          },
          checkRightSingleQuotationMark: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        checkLeftDoubleQuotationMark: true,
        checkRightDoubleQuotationMark: true,
        checkLeftSingleQuotationMark: true,
        checkRightSingleQuotationMark: true,
      },
    ],

    messages: {
      noCurlyQuote:
        'Curly quotes(`“`, `”`, `‘` or `’`) are not allowed. Use straight quotes(`"` or `\'`) instead.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [
      {
        checkLeftDoubleQuotationMark,
        checkRightDoubleQuotationMark,
        checkLeftSingleQuotationMark,
        checkRightSingleQuotationMark,
      },
    ] = context.options;
    const regexString = [
      checkLeftDoubleQuotationMark ? leftDoubleQuotationMark : '',
      checkRightDoubleQuotationMark ? rightDoubleQuotationMark : '',
      checkLeftSingleQuotationMark ? leftSingleQuotationMark : '',
      checkRightSingleQuotationMark ? rightSingleQuotationMark : '',
    ].join('');
    const quotationMarkRegex =
      regexString === '' ? null : new RegExp(`[${regexString}]`, 'g');

    return {
      text(node) {
        if (quotationMarkRegex === null) {
          return;
        }

        const [nodeStartOffset] = sourceCode.getRange(node);
        const matches = sourceCode.getText(node).matchAll(quotationMarkRegex);

        for (const match of matches) {
          const startOffset = nodeStartOffset + match.index;
          const endOffset = startOffset + match[0].length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            messageId: 'noCurlyQuote',

            fix(fixer) {
              return fixer.replaceTextRange(
                [startOffset, endOffset],
                [leftDoubleQuotationMark, rightDoubleQuotationMark].includes(match[0])
                  ? doubleQuotationMark
                  : singleQuotationMark,
              );
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
