/**
 * @fileoverview Rule to disallow multiple spaces after ATX heading markers.
 * @author Ga eun Lee(tooth-is-silver)
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
 * Options for the `no-multiple-atx-heading-space` rule.
 */
type RuleOptions = [
  {
    checkClosedHeadings: boolean;
  },
];
type MessageIds = 'noMultipleAtxHeadingSpace';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const leadingSpacesRegex = /^(?<hashes>#{1,6})(?<spaces>[ \t]{2,})/u;
const trailingSpacesRegex = /(?<spaces>[ \t]{2,})(?<hashes>#+)[ \t]*$/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Disallow multiple spaces after ATX heading markers',
      url: URL_RULE_DOCS('no-multiple-atx-heading-space'),
      recommended: true,
      stylistic: false,
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'object',
        properties: {
          checkClosedHeadings: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        checkClosedHeadings: false,
      },
    ],

    messages: {
      noMultipleAtxHeadingSpace:
        'Multiple spaces inside ATX heading markers are not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ checkClosedHeadings }] = context.options;

    return {
      heading(node) {
        const text = sourceCode.getText(node);
        const [startOffset] = sourceCode.getRange(node);
        const leadingSpacesMatch = leadingSpacesRegex.exec(text);

        if (leadingSpacesMatch) {
          // A successful match always contains both named capture groups.
          const { hashes, spaces } = leadingSpacesMatch.groups!;

          const spacesStartOffset = startOffset + hashes.length;
          const spacesEndOffset = spacesStartOffset + spaces.length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(spacesStartOffset),
              end: sourceCode.getLocFromIndex(spacesEndOffset),
            },

            messageId: 'noMultipleAtxHeadingSpace',

            fix(fixer) {
              return fixer.replaceTextRange([spacesStartOffset, spacesEndOffset], ' ');
            },
          });
        }

        if (!checkClosedHeadings) return;
        const trailingSpacesMatch = trailingSpacesRegex.exec(text);

        if (trailingSpacesMatch) {
          // A successful match always contains both named capture groups.
          const { spaces } = trailingSpacesMatch.groups!;
          const spacesStartOffset = startOffset + trailingSpacesMatch.index;
          const spacesEndOffset = spacesStartOffset + spaces.length;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(spacesStartOffset),
              end: sourceCode.getLocFromIndex(spacesEndOffset),
            },

            messageId: 'noMultipleAtxHeadingSpace',

            fix(fixer) {
              return fixer.replaceTextRange([spacesStartOffset, spacesEndOffset], ' ');
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
