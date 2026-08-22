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

        /*
         * Possible combinations include:
         * - Converting `atx` to `atx-closed`.
         * - Converting `atx` to `setext`.
         * - Converting `atx-closed` to `atx`.
         * - Converting `atx-closed` to `setext`.
         * - Converting `setext` to `atx`.
         * - Converting `setext` to `atx-closed`.
         */

        let replacementRange = sourceCode.getRange(node);
        let replacementText: string | null = null;

        const [nodeStartOffset, nodeEndOffset] = replacementRange;

        const lastChildNode = node.children.at(-1);

        if (currentHeadingStyle === 'atx' && expectedHeadingStyle === 'atx-closed') {
          replacementRange = [nodeEndOffset, nodeEndOffset];

          replacementText = ` ${'#'.repeat(node.depth)}`;
        } else if (
          currentHeadingStyle === 'atx-closed' &&
          expectedHeadingStyle === 'atx'
        ) {
          // An empty closed heading has no child, so remove everything after its opening sequence.
          const closingStartOffset = lastChildNode
            ? sourceCode.getRange(lastChildNode)[1]
            : nodeStartOffset + node.depth;

          replacementRange = [closingStartOffset, nodeEndOffset];

          replacementText = '';
        } else {
          const firstChildNode = node.children[0];

          if (firstChildNode && lastChildNode) {
            const [contentStartOffset] = sourceCode.getRange(firstChildNode);
            const [, contentEndOffset] = sourceCode.getRange(lastChildNode);

            const headingContent = sourceCode.text.slice(
              contentStartOffset,
              contentEndOffset,
            );

            if (currentHeadingStyle === 'setext') {
              const { start } = sourceCode.getLoc(firstChildNode);
              const { end } = sourceCode.getLoc(lastChildNode);

              if (start.line === end.line /* Singleline Heading */) {
                const headingMarker = '#'.repeat(node.depth);

                if (expectedHeadingStyle === 'atx-closed') {
                  replacementText = `${headingMarker} ${headingContent} ${headingMarker}`;
                } else {
                  // Prevent trailing hashes from becoming an ATX closing sequence.
                  const escapedHeadingContent = headingContent.replace(
                    /(?<=[ \t])(?=#+[ \t]*$)/u,
                    '\\',
                  );
                  replacementText = `${headingMarker} ${escapedHeadingContent}`;
                }
              }
            } else {
              const isPotentialBlockStart = potentialBlockStartRegex.test(headingContent);
              // Locations are one-based, while `lines` is zero-based; `-2` selects the preceding line.
              // Treat a missing preceding line at the start of the document as blank.
              const isPreviousLineBlank = isBlankLine(
                sourceCode.lines[sourceCode.getLoc(node).start.line - 2] ?? '',
              );

              const canConvertToSetext =
                !isPotentialBlockStart &&
                node.depth <= SETEXT_MAX_DEPTH &&
                sourceCode.getParent(node)?.type === 'root' &&
                isPreviousLineBlank;

              if (canConvertToSetext) {
                const lineEnding = sourceCode.text.match(/\r\n|\r|\n/)?.[0] ?? '\n';

                const underlineMarker = node.depth === 1 ? '=' : '-';

                replacementText = `${headingContent}${lineEnding}${underlineMarker.repeat(
                  headingContent.length,
                )}`;
              }
            }
          }
        }

        // Report every mismatch even when no semantics-preserving fix is available.
        context.report({
          node,
          messageId: 'style',
          data: {
            style: expectedHeadingStyle,
          },
          fix(fixer) {
            if (replacementText === null) {
              return null;
            }

            return fixer.replaceTextRange(replacementRange, replacementText);
          },
        });
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
