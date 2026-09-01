/**
 * @fileoverview Rule to disallow irregular dash.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { SkipRanges } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Options for the `no-irregular-dash` rule.
 */
type RuleOptions = [
  {
    /**
     * When specified, specific irregular dash characters are allowed if they match one of the characters in this array.
     *
     * This is useful for ignoring certain irregular dashes that are intentionally used in the document.
     * @default []
     */
    allow: string[];
    /**
     * An object where the **key** is an irregular dash character and the **value** is the string that replaces it.
     * @default {}
     */
    override: Record<string, string>;
    /**
     * `true` allows irregular dashes in all code blocks, while `string[]` allows irregular dashes only in code blocks for the specified languages.
     * @default true
     */
    skipCode: boolean | string[];
    /**
     * `true` allows irregular dashes in all inline code.
     * @default true
     */
    skipInlineCode: boolean;
  },
];
type MessageIds = 'noIrregularDash';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const irregularDashes = [
  '\u2010',
  '\u2011',
  '\u2012',
  '\u2013',
  '\u2014',
  '\u2015',
  '\u2043',
  '\u2212',
  '\u23af',
  '\u2e3a',
  '\u2e3b',
  '\u30fc',
  '\ufe58',
  '\ufe63',
  '\uff0d',
] as const;

const irregularDashMap: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(irregularDashes.map(irregularDash => [irregularDash, '-'])),
);

const irregularDashRegex = new RegExp(`[${irregularDashes.join('')}]`, 'gu');

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow irregular dash',
      url: URL_RULE_DOCS('no-irregular-dash'),
      recommended: true,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              type: 'string',
            },
            uniqueItems: true,
          },
          override: {
            type: 'object',
            properties: Object.fromEntries(
              irregularDashes.map(key => [key, { type: 'string' }]),
            ),
            additionalProperties: false,
          },
          skipCode: {
            oneOf: [
              {
                type: 'boolean',
              },
              {
                type: 'array',
                items: {
                  type: 'string',
                },
                uniqueItems: true,
              },
            ],
          },
          skipInlineCode: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        allow: [],
        override: {},
        skipCode: true,
        skipInlineCode: true,
      },
    ],

    messages: {
      noIrregularDash: 'Irregular dash `{{ irregularDash }}` is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ allow, override, skipCode, skipInlineCode }] = context.options;

    const skipRanges = new SkipRanges();

    const mergedIrregularDashMap = {
      ...irregularDashMap,
      ...override,
    };

    return {
      code(node) {
        if (
          Array.isArray(skipCode) ? node.lang && skipCode.includes(node.lang) : skipCode
        )
          skipRanges.push(sourceCode.getRange(node)); // Store range information of `Code`.
      },

      inlineCode(node) {
        if (skipInlineCode) skipRanges.push(sourceCode.getRange(node)); // Store range information of `InlineCode`.
      },

      'root:exit'() {
        const matches = sourceCode.text.matchAll(irregularDashRegex);

        for (const match of matches) {
          const irregularDash = match[0];

          if (allow.includes(irregularDash)) continue;

          const startOffset = match.index;
          const endOffset = startOffset + irregularDash.length;

          if (skipRanges.includes(startOffset)) continue;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            data: {
              irregularDash: `U+${irregularDash.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}`,
            },

            messageId: 'noIrregularDash',

            fix(fixer) {
              return fixer.replaceTextRange(
                [startOffset, endOffset],
                mergedIrregularDashMap[irregularDash],
              );
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
