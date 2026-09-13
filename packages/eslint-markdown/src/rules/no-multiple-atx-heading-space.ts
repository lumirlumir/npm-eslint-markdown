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
    /**
     * When `checkClosedHeading` is set to `true`, this rule also checks for multiple consecutive spaces or tabs before the closing hash characters in closed ATX headings.
     * @default false
     */
    checkClosedHeading: boolean;
  },
];
type MessageIds = 'noMultipleAtxHeadingSpace';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const leadingSpacesRegex = /^#{1,6}(?<spaces>[ \t]{2,})/u;
const trailingSpacesRegex = /(?<spaces>[ \t]{2,})#+[ \t]*$/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Disallow multiple spaces after ATX heading markers',
      url: URL_RULE_DOCS('no-multiple-atx-heading-space'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'whitespace',

    schema: [
      {
        type: 'object',
        properties: {
          checkClosedHeading: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        checkClosedHeading: false,
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
    const [{ checkClosedHeading }] = context.options;

    return {
      heading(node) {
        const text = sourceCode.getText(node);
        const [startOffset] = sourceCode.getRange(node);
        const leadingSpacesMatch = leadingSpacesRegex.exec(text);

        if (leadingSpacesMatch) {
          // A successful match always contains the named capture group.
          const { spaces } = leadingSpacesMatch.groups!;
          const spacesStartOffset = startOffset + node.depth;
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

        if (!checkClosedHeading || node.children.length === 0) return;

        const trailingSpacesMatch = trailingSpacesRegex.exec(text);

        if (trailingSpacesMatch) {
          // A successful match always contains the named capture group.
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
