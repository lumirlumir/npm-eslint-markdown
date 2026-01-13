/**
 * @fileoverview Rule to disallow git conflict markers.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { SkipRanges } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ skipCode: boolean | string[] }]} RuleOptions
 * @typedef {'noGitConflictMarker'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const gitConflictMarkerRegex = /(?:^|(?<=[\r\n]))(?:<{7}(?!<)|={7}(?!=)|>{7}(?!>))/gu;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow git conflict markers',
      url: URL_RULE_DOCS('no-git-conflict-marker'),
      recommended: true,
      stylistic: false,
    },

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
          const gitConflictMarker = match[0];

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
          });
        }
      },
    };
  },
};
