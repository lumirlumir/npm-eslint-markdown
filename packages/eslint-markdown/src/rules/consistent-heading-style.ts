/**
 * @fileoverview Rule to enforce consistent heading style.
 * @author Ga eun Lee(tooth-is-silver)
 * @see https://github.com/DavidAnson/markdownlint/blob/v0.41.1/lib/md003.mjs
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

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
const closingSequenceRegex = /[ \t]#+[ \t]*$/;

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

    return {
      // The `heading` selector is more general, so it is visited before the other `heading[xxx]` selectors.
      heading(node) {
        const { start, end } = sourceCode.getLoc(node);

        if (start.line !== end.line /* Multiline Heading */) {
          currentHeadingStyle = 'setext';
        } else if (closingSequenceRegex.test(sourceCode.getText(node))) {
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
          return;
        }

        const [nodeStartOffset, nodeEndOffset] = sourceCode.getRange(node);
        const firstChildNode = node.children[0];
        const lastChildNode = node.children[node.children.length - 1];

        function reportStyle(
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

        /*
         * Possible combinations include:
         * - Converting `atx` to `atx-closed`.
         *   - If `atx` is empty, it can be converted to `atx-closed`. (O)
         *   - If `atx` is not empty, it can be converted to `atx-closed`. (O)
         * - Converting `atx` to `setext`.
         *   - If `atx` is empty, it cannot be converted to `setext`. (X)
         *   - If `atx` is not empty, it can be converted to `setext`. (O)
         * - Converting `atx-closed` to `atx`.
         *   - If `atx-closed` is empty, it can be converted to `atx`. (O)
         *   - If `atx-closed` is not empty, it can be converted to `atx`. (O)
         * - Converting `atx-closed` to `setext`.
         *   - If `atx-closed` is empty, it cannot be converted to `setext`. (X)
         *   - If `atx-closed` is not empty, it can be converted to `setext`. (O)
         * - Converting `setext` to `atx`.
         *   - Setext headings cannot be empty (https://spec.commonmark.org/0.31.2/#example-97)
         *   - If `setext` is not empty, it can be converted to `atx`. (O)
         * - Converting `setext` to `atx-closed`.
         *   - Setext headings cannot be empty (https://spec.commonmark.org/0.31.2/#example-97)
         *   - If `setext` is not empty, it can be converted to `atx-closed`. (O)
         */

        if (currentHeadingStyle === 'atx') {
          if (expectedHeadingStyle === 'atx-closed') {
            reportStyle(fixer =>
              fixer.replaceTextRange(
                [nodeEndOffset, nodeEndOffset],
                ` ${'#'.repeat(node.depth)}`,
              ),
            );
          } else if (expectedHeadingStyle === 'setext') {
            if (node.children.length === 0) {
              // Empty ATX headings cannot be converted to Setext headings,
              // so report the mismatch without a fix.
              reportStyle();
            } else {
              const [contentStartOffset] = sourceCode.getRange(firstChildNode);
              const [, contentEndOffset] = sourceCode.getRange(lastChildNode);

              const headingContent = sourceCode.text.slice(
                contentStartOffset,
                contentEndOffset,
              );

              {
                // Locations are one-based, while `lines` is zero-based; `-2` selects the preceding line.
                // Treat a missing preceding line at the start of the document as blank.
                const isPreviousLineBlank = isBlankLine(
                  sourceCode.lines[sourceCode.getLoc(node).start.line - 2] ?? '',
                );

                if (
                  !potentialBlockStartRegex.test(headingContent) &&
                  node.depth <= SETEXT_MAX_DEPTH &&
                  sourceCode.getParent(node)?.type === 'root' &&
                  isPreviousLineBlank
                ) {
                  const lineEnding = sourceCode.text.match(/\r\n|\r|\n/)?.[0] ?? '\n';

                  const underlineMarker = node.depth === 1 ? '=' : '-';

                  const replacementText = `${headingContent}${lineEnding}${underlineMarker.repeat(
                    headingContent.length,
                  )}`;

                  // Report every mismatch even when no semantics-preserving fix is available.
                  reportStyle(fixer =>
                    fixer.replaceTextRange(
                      [nodeStartOffset, nodeEndOffset],
                      replacementText,
                    ),
                  );
                } else {
                  reportStyle();
                }
              }
            }
          }
        } else if (currentHeadingStyle === 'atx-closed') {
          if (expectedHeadingStyle === 'atx') {
            // An empty closed heading has no child, so remove everything after its opening sequence.
            const closingStartOffset = lastChildNode
              ? sourceCode.getRange(lastChildNode)[1]
              : nodeStartOffset + node.depth;

            reportStyle(fixer =>
              fixer.replaceTextRange([closingStartOffset, nodeEndOffset], ''),
            );
          } else if (expectedHeadingStyle === 'setext') {
            if (node.children.length === 0) {
              // Empty ATX Closed headings cannot be converted to Setext headings,
              // so report the mismatch without a fix.
              reportStyle();
            } else {
              const [contentStartOffset] = sourceCode.getRange(firstChildNode);
              const [, contentEndOffset] = sourceCode.getRange(lastChildNode);

              const headingContent = sourceCode.text.slice(
                contentStartOffset,
                contentEndOffset,
              );

              {
                // Locations are one-based, while `lines` is zero-based; `-2` selects the preceding line.
                // Treat a missing preceding line at the start of the document as blank.
                const isPreviousLineBlank = isBlankLine(
                  sourceCode.lines[sourceCode.getLoc(node).start.line - 2] ?? '',
                );

                if (
                  !potentialBlockStartRegex.test(headingContent) &&
                  node.depth <= SETEXT_MAX_DEPTH &&
                  sourceCode.getParent(node)?.type === 'root' &&
                  isPreviousLineBlank
                ) {
                  const lineEnding = sourceCode.text.match(/\r\n|\r|\n/)?.[0] ?? '\n';

                  const underlineMarker = node.depth === 1 ? '=' : '-';

                  const replacementText = `${headingContent}${lineEnding}${underlineMarker.repeat(
                    headingContent.length,
                  )}`;

                  // Report every mismatch even when no semantics-preserving fix is available.
                  reportStyle(fixer =>
                    fixer.replaceTextRange(
                      [nodeStartOffset, nodeEndOffset],
                      replacementText,
                    ),
                  );
                } else {
                  reportStyle();
                }
              }
            }
          }
        } else if (currentHeadingStyle === 'setext') {
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

            reportStyle(fixer => {
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
            reportStyle(fixer => {
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
