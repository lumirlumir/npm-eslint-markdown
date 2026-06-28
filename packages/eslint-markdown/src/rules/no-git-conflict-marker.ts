/**
 * @fileoverview Rule to disallow git conflict markers.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { SkipRanges } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

import type { RuleModule } from '../core/types.js';

type RuleOptions = [{ skipCode: boolean | string[] }];
type MessageIds = 'noGitConflictMarker';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const gitConflictMarkerRegex =
  /(?:^|(?<=[\r\n]))(?<gitConflictMarker><{7}(?!<)|={7}(?!=)|>{7}(?!>))[^\r\n]*\r?\n?/gu;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

const rule: RuleModule<RuleOptions, MessageIds> = {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow git conflict markers',
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
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        skipCode: true,
      },
    ],

    messages: {
      noGitConflictMarker:
        'Git conflict marker `{{ gitConflictMarker }}` is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ skipCode }] = context.options;

    const skipRanges = new SkipRanges();

    return {
      code(node) {
        if (
          Array.isArray(skipCode) ? node.lang && skipCode.includes(node.lang) : skipCode
        )
          skipRanges.push(sourceCode.getRange(node)); // Store range information of `Code`.
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
};

export default rule;
