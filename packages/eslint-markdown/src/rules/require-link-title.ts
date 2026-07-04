/**
 * @fileoverview Rule to enforce the use of title attribute for links.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Definition } from 'mdast';
import { normalizeIdentifier } from 'micromark-util-normalize-identifier';
import type { Position } from 'unist';
import { getElementsByTagName } from '../core/utils/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [{ allowDefinitions: string[] }];
type MessageIds = 'requireLinkTitle';

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of title attribute for links',
      url: URL_RULE_DOCS('require-link-title'),
      recommended: false,
      stylistic: false,
    },

    schema: [
      {
        type: 'object',
        properties: {
          allowDefinitions: {
            type: 'array',
            items: {
              type: 'string',
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        allowDefinitions: ['//'],
      },
    ],

    messages: {
      requireLinkTitle: 'Links should have a title attribute.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const allowDefinitions = new Set(
      context.options[0].allowDefinitions.map(identifier =>
        normalizeIdentifier(identifier).toLowerCase(),
      ),
    );

    const linkReferenceIdentifiers = new Set<string>();
    const definitions = new Set<Definition>();

    /** @param loc Location to report. */
    function report(loc: Position) {
      context.report({
        loc,
        messageId: 'requireLinkTitle',
      });
    }

    return {
      link(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);

        // Exclude auto-link literals like `<https://example.com>` or `https://example.com`
        if (sourceCode.text[nodeStartOffset] === '[' && !node.title) {
          report(sourceCode.getLoc(node));
        }
      },

      html(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const html = sourceCode.getText(node);

        for (const { attrs, sourceCodeLocation } of getElementsByTagName(html, 'a')) {
          let hasTitle = false;

          for (const { name, value } of attrs) {
            if (name === 'title' && value) {
              hasTitle = true;
              break;
            }
          }

          if (!hasTitle && sourceCodeLocation?.startTag) {
            report({
              start: sourceCode.getLocFromIndex(
                nodeStartOffset + sourceCodeLocation.startTag.startOffset,
              ),
              end: sourceCode.getLocFromIndex(
                nodeStartOffset + sourceCodeLocation.startTag.endOffset,
              ),
            });
          }
        }
      },

      linkReference(node) {
        linkReferenceIdentifiers.add(node.identifier);
      },

      definition(node) {
        if (allowDefinitions.has(node.identifier)) return;

        definitions.add(node);
      },

      'root:exit'() {
        for (const definition of definitions) {
          if (linkReferenceIdentifiers.has(definition.identifier) && !definition.title) {
            report(sourceCode.getLoc(definition));
          }
        }
      },
    };
  },
} as const satisfies RuleModule<RuleOptions, MessageIds>;
