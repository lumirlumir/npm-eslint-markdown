/**
 * @fileoverview Rule to disallow double or multiple consecutive spaces in text, except for leading and trailing spaces.
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

/**
 * Options for the `no-double-space` rule.
 */
type RuleOptions = [
  {
    /**
     * When `checkMultipleSpace` is set to `true`, this rule will also check for multiple consecutive spaces (more than two) within a sentence.
     * @default false
     */
    checkMultipleSpace: boolean;
  },
];
type MessageIds = 'noDoubleSpace' | 'noMultipleSpace';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const doubleSpaceRegex = /(?<=[^ \r\n]) {2}(?=[^ \r\n])/g; // Exactly two spaces. No more, no less. (lookbehind and lookahead to ensure not leading or trailing).
const multipleSpaceRegex = /(?<=[^ \r\n]) {2,}(?=[^ \r\n])/g; // More than two spaces. (lookbehind and lookahead to ensure not leading or trailing).
const singleSpace = ' ';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description:
        'Disallow double or multiple consecutive spaces in text, except for leading and trailing spaces',
      dialects: ['CommonMark', 'GFM'],
      url: URL_RULE_DOCS('no-double-space'),
      recommended: true,
      stylistic: false,
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'object',
        properties: {
          checkMultipleSpace: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        checkMultipleSpace: false,
      },
    ],

    messages: {
      noDoubleSpace:
        'Double spaces are not allowed except for leading and trailing spaces.',
      noMultipleSpace:
        'Multiple spaces are not allowed except for leading and trailing spaces.',
    },
  },

  create(context) {
    const { sourceCode } = context;
    const [{ checkMultipleSpace }] = context.options;

    const spaceRegex = checkMultipleSpace ? multipleSpaceRegex : doubleSpaceRegex;
    const messageId = checkMultipleSpace ? 'noMultipleSpace' : 'noDoubleSpace';

    return {
      text(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const matches = sourceCode.getText(node).matchAll(spaceRegex);

        for (const match of matches) {
          const startOffset = nodeStartOffset + match.index;
          const endOffset = startOffset + match[0].length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            messageId,

            fix(fixer) {
              return fixer.replaceTextRange([startOffset, endOffset], singleSpace);
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
