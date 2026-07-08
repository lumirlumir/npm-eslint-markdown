/**
 * @fileoverview Rule to enforce the use of allowed or disallowed headings.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Heading } from 'mdast';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface HeadingOptions {
  allow: RegExp[];
  disallow: RegExp[];
}
type RuleOptions = [Record<`h${Heading['depth']}`, HeadingOptions>];
type MessageIds = 'allowHeading' | 'disallowHeading';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const statefulRegexFlagRegex = /[gy]/u;

const headingOptionsSchema = {
  type: 'object',
  properties: {
    allow: {
      type: 'array',
      items: {
        type: 'object',
      },
      uniqueItems: true,
    },
    disallow: {
      type: 'array',
      items: {
        type: 'object',
      },
      uniqueItems: true,
    },
  },
  additionalProperties: false,
} as const;

/**
 * Tests a regex without mutating the state stored in its `lastIndex`.
 * @param regex Regex to test.
 * @param text Text to test.
 * @returns Whether the regex matches the text.
 */
function testRegexStateless(regex: RegExp, text: string) {
  return statefulRegexFlagRegex.test(regex.flags)
    ? new RegExp(regex).test(text)
    : regex.test(text);
}

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
    const headingMap = {
      1: h1,
      2: h2,
      3: h3,
      4: h4,
      5: h5,
      6: h6,
    } as const satisfies Record<Heading['depth'], HeadingOptions>;

    return {
      heading(node) {
        const { depth } = node;
        const { allow, disallow } = headingMap[depth];
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
