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

    const trailingPunctuationRegex = new RegExp(`[${escapeStringRegexp(punctuation)}]+$`);

    return {
      heading(node) {
        const lastChildNode = node.children.at(-1);

        if (!lastChildNode) return;

        const match = trailingPunctuationRegex.exec(sourceCode.getText(lastChildNode));

        if (!match) return;

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
