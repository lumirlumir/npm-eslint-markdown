/**
 * @fileoverview Rule to disallow trailing punctuation in headings.
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';
import escapeStringRegexp from '../core/utils/escape-string-regexp.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [{ punctuation: string }];
type MessageIds = 'noTrailingHeadingPunctuation';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * These patterns are based on the HTML entity and GitHub emoji code patterns used by `markdownlint`.
 * @see https://github.com/DavidAnson/markdownlint/blob/main/helpers/helpers.cjs#L32-L38
 */
const trailingHtmlEntityRegex =
  /&(?:#\d+|#[xX][\da-fA-F]+|[a-zA-Z]{2,31}|blk\d{2}|emsp1[34]|frac\d{2}|sup\d|there4);$/;

const trailingGemojiRegex =
  /:(?:[abmovx]|[-+]1|100|1234|(?:1st|2nd|3rd)_place_medal|8ball|clock\d{1,4}|e-mail|non-potable_water|o2|t-rex|u5272|u5408|u55b6|u6307|u6708|u6709|u6e80|u7121|u7533|u7981|u7a7a|[a-z]{2,15}2?|[a-z]{1,14}(?:_[a-z\d]{1,16})+):$/;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow trailing punctuation in headings',
      url: URL_RULE_DOCS('no-trailing-heading-punctuation'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          punctuation: {
            type: 'string',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        punctuation: '.,;:!。，；：！',
      },
    ],

    messages: {
      noTrailingHeadingPunctuation:
        'Trailing punctuation `{{ punctuation }}` is not allowed in headings.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ punctuation }] = context.options;

    if (punctuation === '') {
      return {};
    }

    const trailingPunctuationRegex = new RegExp(
      `\\s*[${escapeStringRegexp(punctuation)}]+$`,
    );

    return {
      heading(node) {
        const lastChildNode = node.children.at(-1);

        if (!lastChildNode) return;

        const lastChildText = sourceCode.getText(lastChildNode);
        const match = trailingPunctuationRegex.exec(lastChildText);

        if (!match) return;

        if (trailingHtmlEntityRegex.test(lastChildText)) return;

        if (trailingGemojiRegex.test(lastChildText)) return;

        const trailingPunctuation = match[0];

        const [, endOffset] = sourceCode.getRange(lastChildNode);
        const startOffset = endOffset - trailingPunctuation.length;

        const startLoc = sourceCode.getLocFromIndex(startOffset);
        const endLoc = sourceCode.getLocFromIndex(endOffset);

        context.report({
          loc: {
            start: startLoc,
            end: endLoc,
          },

          data: {
            punctuation: trailingPunctuation,
          },

          messageId: 'noTrailingHeadingPunctuation',

          fix(fixer) {
            return fixer.removeRange([startOffset, endOffset]);
          },
        });
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
