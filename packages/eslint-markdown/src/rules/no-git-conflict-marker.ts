/**
 * @fileoverview Rule to disallow git conflict markers.
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
 * Options for the `no-git-conflict-marker` rule.
 */
type RuleOptions = [
  {
    /**
     * `true` allows Git conflict markers in all code blocks, while `string[]` allows Git conflict markers only in code blocks for the specified languages.
     * @default true
     */
    skipCode: boolean | string[];
    /**
     * `true` allows Git conflict markers in all math blocks.
     * @default true
     */
    skipMath: boolean;
  },
];
type MessageIds = 'noGitConflictMarker';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const gitConflictMarkerRegex =
  /(?:^|(?<=[\r\n]))(?<gitConflictMarker><{7}(?!<)|={7}(?!=)|>{7}(?!>))[^\r\n]*\r?\n?/gu;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    languages: ['markdown/commonmark', 'markdown/gfm'],

    docs: {
      description: 'Disallow git conflict markers',
      dialects: ['CommonMark', 'GFM'],
      url: URL_RULE_DOCS('no-git-conflict-marker'),
      recommended: true,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
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
          skipMath: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipCode: true,
        skipMath: true,
      },
    ],

    messages: {
      noGitConflictMarker:
        'Git conflict marker `{{ gitConflictMarker }}` is not allowed.',
    },
  },

  create(context) {
    const { sourceCode } = context;
    const [{ skipCode, skipMath }] = context.options;

    const skipRanges = new SkipRanges();

    return {
      code(node) {
        if (
          Array.isArray(skipCode) ? node.lang && skipCode.includes(node.lang) : skipCode
        )
          skipRanges.push(sourceCode.getRange(node)); // Store range information of `Code`.
      },

      math(node) {
        if (skipMath) skipRanges.push(sourceCode.getRange(node)); // Store range information of `Math`.
      },

      'root:exit'() {
        const matches = sourceCode.text.matchAll(gitConflictMarkerRegex);

        for (const match of matches) {
          const gitConflictMarker = match[1];

          const startOffset = match.index;
          const endOffset = startOffset + gitConflictMarker.length;

          if (skipRanges.includes(startOffset)) continue;

          context.report({
            loc: {
              start: sourceCode.getLocFromIndex(startOffset),
              end: sourceCode.getLocFromIndex(endOffset),
            },

            data: {
              gitConflictMarker,
            },

            messageId: 'noGitConflictMarker',

            fix(fixer) {
              // Remove the entire line containing the git conflict marker, including the newline character.
              return fixer.removeRange([startOffset, startOffset + match[0].length]);
            },
          });
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
