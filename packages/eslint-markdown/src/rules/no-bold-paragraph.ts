/**
 * @fileoverview Rule to disallow using fully bolded paragraphs as headings.
 * @author lumir(lumirlumir)
 */

/* eslint-disable -- TODO: This rule is not fully migrated to TypeScript yet. */
// @ts-nocheck -- TODO

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [];
type MessageIds = 'noBoldParagraph';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

const rule: RuleModule<RuleOptions, MessageIds> = {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow using fully bolded paragraphs as headings',
      url: URL_RULE_DOCS('no-bold-paragraph'),
      recommended: true,
      stylistic: false,
    },

    messages: {
      noBoldParagraph:
        'Fully bolded paragraphs should not be used as headings. Please use a heading instead.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    return {
      strong(node) {
        const parentNode = context.sourceCode.getParent(node);

        if (parentNode?.type !== 'paragraph') return;

        const ancestorNode = context.sourceCode.getParent(parentNode);
        const { position: parentPosition } = parentNode;
        const { position: nodePosition } = node;

        if (
          ancestorNode?.type !== 'listItem' &&
          parentPosition !== undefined &&
          nodePosition !== undefined &&
          parentPosition.start.line === parentPosition.end.line && // Should be a single line.
          parentPosition.start.offset === nodePosition.start.offset && // Should have the same start offset.
          parentPosition.end.offset === nodePosition.end.offset // Should have the same end offset.
        ) {
          context.report({
            node,

            messageId: 'noBoldParagraph',
          });
        }
      },
    };
  },
};

export default rule;
