/**
 * @fileoverview Rule to enforce the use of allowed or disallowed headings.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Heading } from 'mdast';
import { normalizeRegexPattern, testRegexStateless } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface HeadingOptions {
  /**
   * Allowed heading patterns. Only headings matching at least one pattern are allowed.
   * @default [new RegExp('.*', 'u')]
   */
  allow: (RegExp | string)[];
  /**
   * Disallowed heading patterns. Headings matching any pattern are reported.
   * @default []
   */
  disallow: (RegExp | string)[];
}

/**
 * Options for the `allow-heading` rule, mapped by heading levels from `h1` to `h6`.
 */
type RuleOptions = [Record<`h${Heading['depth']}`, HeadingOptions>];
type MessageIds = 'allowHeading' | 'disallowHeading';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const headingOptionsSchema = {
  type: 'object',
  properties: {
    allow: {
      type: 'array',
      items: {
        oneOf: [{ type: 'object', additionalProperties: false }, { type: 'string' }],
      },
      uniqueItems: true,
    },
    disallow: {
      type: 'array',
      items: {
        oneOf: [{ type: 'object', additionalProperties: false }, { type: 'string' }],
      },
      uniqueItems: true,
    },
  },
  additionalProperties: false,
} as const;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of allowed or disallowed headings',
      url: URL_RULE_DOCS('allow-heading'),
      recommended: false,
      stylistic: false,
    },

    schema: [
      {
        type: 'object',
        properties: {
          h1: headingOptionsSchema,
          h2: headingOptionsSchema,
          h3: headingOptionsSchema,
          h4: headingOptionsSchema,
          h5: headingOptionsSchema,
          h6: headingOptionsSchema,
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        h1: { allow: [/.*/u], disallow: [] },
        h2: { allow: [/.*/u], disallow: [] },
        h3: { allow: [/.*/u], disallow: [] },
        h4: { allow: [/.*/u], disallow: [] },
        h5: { allow: [/.*/u], disallow: [] },
        h6: { allow: [/.*/u], disallow: [] },
      },
    ],

    messages: {
      allowHeading:
        'The level {{ depth }} heading `{{ heading }}` is not in the list of allowed headings. (Allow: {{ allow }}).',
      disallowHeading:
        'The level {{ depth }} heading `{{ heading }}` is in the list of disallowed headings. (Disallow: {{ disallow }}).',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ h1, h2, h3, h4, h5, h6 }] = context.options;
    const headingMap = [h1, h2, h3, h4, h5, h6].map(({ allow, disallow }) => ({
      allow: allow.map(normalizeRegexPattern),
      disallow: disallow.map(normalizeRegexPattern),
    }));

    return {
      heading(node) {
        const { depth } = node;
        const { allow, disallow } = headingMap[depth - 1];
        const headingText = sourceCode.getText(node);

        if (!allow.some(regex => testRegexStateless(regex, headingText))) {
          context.report({
            node,
            messageId: 'allowHeading',
            data: {
              depth,
              heading: headingText,
              allow: allow.map(regex => `\`${regex}\``).join(', '),
            },
          });
        }

        if (disallow.some(regex => testRegexStateless(regex, headingText))) {
          context.report({
            node,
            messageId: 'disallowHeading',
            data: {
              depth,
              heading: headingText,
              disallow: disallow.map(regex => `\`${regex}\``).join(', '),
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
