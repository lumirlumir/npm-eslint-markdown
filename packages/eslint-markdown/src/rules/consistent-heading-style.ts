/**
 * @fileoverview Rule to enforce consistent heading style.
 * @author Ga eun Lee(tooth-is-silver)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/lib/md003.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Heading } from 'mdast';
import { isBlankLine } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type HeadingStyle = (typeof HEADING_STYLE)[number];
type RuleOptions = [{ style: HeadingStyle }];
type MessageIds = 'style';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const SETEXT_MAX_DEPTH = 2;

const HEADING_STYLE = [
  'consistent',
  'atx',
  'atx-closed',
  'setext',
  'setext-with-atx',
  'setext-with-atx-closed',
] as const;

/**
 * Matches the closing sequence of a closed ATX heading.
 * @see https://spec.commonmark.org/0.31.2/#atx-headings
 */
const trailingAtxHeadingHashRegex = /[ \t]#+[ \t]*$/;

/**
 * Matches heading content that may start a block-level construct after conversion to Setext.
 * @see https://spec.commonmark.org/0.31.2/#blocks-and-inlines
 */
const potentialBlockStartRegex = /^(?:>|(?:[-+*]|\d{1,9}[.)])(?:[ \t]|$))/u;

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'layout',

    docs: {
      description: 'Enforce consistent heading style',
      url: URL_RULE_DOCS('consistent-heading-style'),
      recommended: false,
      stylistic: true,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          style: {
            enum: HEADING_STYLE,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        style: 'consistent',
      },
    ],

    messages: {
      style: 'Heading style should be `{{ style }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ style }] = context.options;

    let headingStyle = style === 'consistent' ? null : style;
    let currentHeadingStyle: 'atx' | 'atx-closed' | 'setext' | null = null;
    let expectedHeadingStyle: 'atx' | 'atx-closed' | 'setext' | null = null;

    function reportStyle(
      node: Heading,
      fix: NonNullable<Parameters<typeof context.report>[0]['fix']> | null = null,
    ) {
      context.report({
        node,

        messageId: 'style',

        data: {
          style: expectedHeadingStyle,
        },

        fix,
      });
    }

    return {
      // The `heading` selector is more general, so it is visited before the other `heading[xxx]` selectors.
      heading(node) {
        const { start, end } = sourceCode.getLoc(node);

        if (start.line !== end.line /* Multiline Heading */) {
          currentHeadingStyle = 'setext';
        } else if (trailingAtxHeadingHashRegex.test(sourceCode.getText(node))) {
          currentHeadingStyle = 'atx-closed';
        } else {
          currentHeadingStyle = 'atx';
        }

        if (headingStyle === null) {
          headingStyle = currentHeadingStyle;
        }
      },

      [`heading[depth<=${SETEXT_MAX_DEPTH}]`]() {
        if (
          headingStyle === 'setext-with-atx' ||
          headingStyle === 'setext-with-atx-closed'
        ) {
          expectedHeadingStyle = 'setext';
        } else {
          expectedHeadingStyle = headingStyle;
        }
      },

      [`heading[depth>${SETEXT_MAX_DEPTH}]`]() {
        if (headingStyle === 'setext-with-atx') {
          expectedHeadingStyle = 'atx';
        } else if (headingStyle === 'setext-with-atx-closed') {
          expectedHeadingStyle = 'atx-closed';
        } else {
          expectedHeadingStyle = headingStyle;
        }
      },

      'heading:exit'(node) {
        if (currentHeadingStyle === expectedHeadingStyle) {
          // Early return if the current heading style matches the expected heading style.
          return;
        }

        /*
         * Possible fix combinations include:
         *
         * - autofix: 🔧
         * - suggestion: 💡
         * - no fix: ❌
         *
         * 1. Converting `atx` to `atx-closed`.
         *   1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧)
         *   1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧)
         * 2. Converting `atx` to `setext`.
         *   2-1. If `atx` is empty, it cannot be converted to `setext`. (❌)
         *   2-2. If `atx` is not empty:
         *     2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡)
         *     2-2-2. If its depth is greater than 2, it cannot be converted to `setext`. (❌)
         * 3. Converting `atx-closed` to `atx`.
         *   3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧)
         *   3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧)
         * 4. Converting `atx-closed` to `setext`.
         *   4-1. If `atx-closed` is empty, it cannot be converted to `setext`. (❌)
         *   4-2. If `atx-closed` is not empty:
         *     4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡)
         *     4-2-2. If its depth is greater than 2, it cannot be converted to `setext`. (❌)
         * 5. Converting `setext` to `atx`.
         *   5-1. Setext headings cannot be empty (https://spec.commonmark.org/0.31.2/#example-97)
         *   5-2. If `setext` is not empty:
         *     5-2-1. If it is single-line, it can be converted to `atx`. (🔧)
         *     5-2-2. If it is multiline, it cannot be converted to `atx`. (❌)
         * 6. Converting `setext` to `atx-closed`.
         *   6-1. Setext headings cannot be empty (https://spec.commonmark.org/0.31.2/#example-97)
         *   6-2. If `setext` is not empty:
         *     6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧)
         *     6-2-2. If it is multiline, it cannot be converted to `atx-closed`. (❌)
         */

        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);

        if (currentHeadingStyle === 'atx') {
          if (expectedHeadingStyle === 'atx-closed') {
            if (node.children.length === 0) {
              reportStyle(node, function* fix(fixer) {
                if (nodeStartOffset + node.depth === nodeEndOffset) {
                  yield fixer.insertTextAfter(node, ' ');
                }

                yield fixer.insertTextAfter(node, '#'.repeat(node.depth));
              });
            } else {
              reportStyle(node, function* fix(fixer) {
                const [, lastChildNodeEndOffset] = sourceCode.getRange(
                  node.children[node.children.length - 1],
                );

                if (lastChildNodeEndOffset === nodeEndOffset) {
                  yield fixer.insertTextAfter(node, ' ');
                }

                yield fixer.insertTextAfter(node, '#'.repeat(node.depth));
              });
            }
          } else if (expectedHeadingStyle === 'setext') {
            if (node.children.length === 0) {
              // Empty ATX headings cannot be converted to Setext headings,
              // so report the mismatch without a fix.
              reportStyle(node);
            } else {
              const firstChildNode = node.children[0];
              const lastChildNode = node.children[node.children.length - 1];

              const [contentStartOffset] = sourceCode.getRange(firstChildNode);
              const [, contentEndOffset] = sourceCode.getRange(lastChildNode);

              const headingContent = sourceCode.text.slice(
                contentStartOffset,
                contentEndOffset,
              );

              if (
                !potentialBlockStartRegex.test(headingContent) &&
                node.depth <= SETEXT_MAX_DEPTH &&
                sourceCode.getParent(node)?.type === 'root' &&
                // Locations are one-based, while `lines` is zero-based; `-2` selects the preceding line.
                // Treat a missing preceding line at the start of the document as blank.
                isBlankLine(
                  sourceCode.lines[sourceCode.getLoc(node).start.line - 2] ?? '',
                )
              ) {
                const lineEnding = sourceCode.text.match(/\r\n|\r|\n/)?.[0] ?? '\n';

                const underlineMarker = node.depth === 1 ? '=' : '-';

                const replacementText = `${headingContent}${lineEnding}${underlineMarker.repeat(
                  headingContent.length,
                )}`;

                // Report every mismatch even when no semantics-preserving fix is available.
                reportStyle(node, fixer =>
                  fixer.replaceTextRange(
                    [nodeStartOffset, nodeEndOffset],
                    replacementText,
                  ),
                );
              } else {
                reportStyle(node);
              }
            }
          }
        } else if (currentHeadingStyle === 'atx-closed') {
          if (expectedHeadingStyle === 'atx') {
            if (node.children.length === 0) {
              reportStyle(node, function* fix(fixer) {
                yield fixer.removeRange([
                  nodeStartOffset + node.depth,
                  nodeEndOffset,
                ]);
              });
            } else {
              reportStyle(node, function* fix(fixer) {
                const [, lastChildNodeEndOffset] = sourceCode.getRange(
                  node.children[node.children.length - 1],
                );

                yield fixer.removeRange([lastChildNodeEndOffset, nodeEndOffset]);
              });
            }
          } else if (expectedHeadingStyle === 'setext') {
            if (node.children.length === 0) {
              // Empty ATX Closed headings cannot be converted to Setext headings,
              // so report the mismatch without a fix.
              reportStyle(node);
            } else {
              const firstChildNode = node.children[0];
              const lastChildNode = node.children[node.children.length - 1];

              const [contentStartOffset] = sourceCode.getRange(firstChildNode);
              const [, contentEndOffset] = sourceCode.getRange(lastChildNode);

              const headingContent = sourceCode.text.slice(
                contentStartOffset,
                contentEndOffset,
              );

              if (
                !potentialBlockStartRegex.test(headingContent) &&
                node.depth <= SETEXT_MAX_DEPTH &&
                sourceCode.getParent(node)?.type === 'root' &&
                // Locations are one-based, while `lines` is zero-based; `-2` selects the preceding line.
                // Treat a missing preceding line at the start of the document as blank.
                isBlankLine(
                  sourceCode.lines[sourceCode.getLoc(node).start.line - 2] ?? '',
                )
              ) {
                const lineEnding = sourceCode.text.match(/\r\n|\r|\n/)?.[0] ?? '\n';

                const underlineMarker = node.depth === 1 ? '=' : '-';

                const replacementText = `${headingContent}${lineEnding}${underlineMarker.repeat(
                  headingContent.length,
                )}`;

                // Report every mismatch even when no semantics-preserving fix is available.
                reportStyle(node, fixer =>
                  fixer.replaceTextRange(
                    [nodeStartOffset, nodeEndOffset],
                    replacementText,
                  ),
                );
              } else {
                reportStyle(node);
              }
            }
          }
        } else if (currentHeadingStyle === 'setext') {
          const firstChildNode = node.children[0];
          const lastChildNode = node.children[node.children.length - 1];

          const [contentStartOffset] = sourceCode.getRange(firstChildNode);
          const [, contentEndOffset] = sourceCode.getRange(lastChildNode);

          const headingContent = sourceCode.text.slice(
            contentStartOffset,
            contentEndOffset,
          );

          const { start } = sourceCode.getLoc(firstChildNode);
          const { end } = sourceCode.getLoc(lastChildNode);

          const headingMarker = '#'.repeat(node.depth);

          if (expectedHeadingStyle === 'atx') {
            // Prevent trailing hashes from becoming an ATX closing sequence.
            const escapedHeadingContent = headingContent.replace(
              /(?<=[ \t])(?=#+[ \t]*$)/u,
              '\\',
            );

            reportStyle(node, fixer => {
              if (start.line === end.line /* Singleline Heading */) {
                return fixer.replaceTextRange(
                  [nodeStartOffset, nodeEndOffset],
                  `${headingMarker} ${escapedHeadingContent}`,
                );
              } else /* Multiline Heading */ {
                return null;
              }
            });
          } else if (expectedHeadingStyle === 'atx-closed') {
            reportStyle(node, fixer => {
              if (start.line === end.line /* Singleline Heading */) {
                return fixer.replaceTextRange(
                  [nodeStartOffset, nodeEndOffset],
                  `${headingMarker} ${headingContent} ${headingMarker}`,
                );
              } else /* Multiline Heading */ {
                return null;
              }
            });
          }
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
