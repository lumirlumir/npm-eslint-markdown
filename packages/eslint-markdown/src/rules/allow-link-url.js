/**
 * @fileoverview Rule to enforce the use of allowed or disallowed URLs for links.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { normalizeIdentifier } from 'micromark-util-normalize-identifier';
import { getElementsByTagName } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Position } from 'unist';
 * @import { Definition } from 'mdast';
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[{ allowUrls: RegExp[], disallowUrls: RegExp[], allowDefinitions: string[] }]} RuleOptions
 * @typedef {'allowLinkUrl' | 'disallowLinkUrl'} MessageIds
 */

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of allowed or disallowed URLs for links',
      url: URL_RULE_DOCS('allow-link-url'),
      recommended: false,
      stylistic: false,
    },

    schema: [
      {
        type: 'object',
        properties: {
          allowUrls: {
            type: 'array',
            items: {
              type: 'object',
            },
            uniqueItems: true,
          },
          disallowUrls: {
            type: 'array',
            items: {
              type: 'object',
            },
            uniqueItems: true,
          },
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
        allowUrls: [/.*/u],
        disallowUrls: [],
        allowDefinitions: ['//'],
      },
    ],

    messages: {
      allowLinkUrl:
        'The URL `{{ url }}` is not in the list of allowed URLs. (Allow: {{ patterns }}).',
      disallowLinkUrl:
        'The URL `{{ url }}` is in the list of disallowed URLs. (Disallow: {{ patterns }}).',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ allowUrls, disallowUrls }] = context.options;
    const allowDefinitions = new Set(
      context.options[0].allowDefinitions.map(identifier =>
        normalizeIdentifier(identifier).toLowerCase(),
      ),
    );
    /**
     * @param {RegExp} regex
     * @param {string} url
     * @returns {boolean}
     */
    const testUrl = (regex, url) =>
      new RegExp(regex.source, regex.flags.replace(/[gy]/gu, '')).test(url);

    /** @type {Set<{ loc: Position, url: string }>} */
    const links = new Set();
    /** @type {Set<string>} */
    const linkReferenceIdentifiers = new Set();
    /** @type {Set<Definition>} */
    const definitions = new Set();

    return {
      link(node) {
        links.add({
          loc: sourceCode.getLoc(node),
          url: node.url,
        });
      },

      html(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const html = sourceCode.getText(node);

        for (const { attrs, sourceCodeLocation } of getElementsByTagName(html, 'a')) {
          for (const { name, value } of attrs) {
            if (name === 'href' && sourceCodeLocation?.attrs) {
              links.add({
                loc: {
                  start: sourceCode.getLocFromIndex(
                    nodeStartOffset + sourceCodeLocation.attrs.href.startOffset,
                  ),
                  end: sourceCode.getLocFromIndex(
                    nodeStartOffset + sourceCodeLocation.attrs.href.endOffset,
                  ),
                },
                url: value,
              });
            }
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
          if (linkReferenceIdentifiers.has(definition.identifier)) {
            links.add({
              loc: sourceCode.getLoc(definition),
              url: definition.url,
            });
          }
        }

        /*
         * The `some` method returns `true` if any element in the array satisfies the given condition.
         * In the case of an empty array, there are no elements to satisfy the condition, so the method returns `false`.
         * Therefore, calling the `some` method on an empty array will always return `false`.
         */

        for (const { loc, url } of links) {
          if (!allowUrls.some(regex => testUrl(regex, url))) {
            context.report({
              loc,
              messageId: 'allowLinkUrl',
              data: {
                url,
                patterns: allowUrls.map(regex => `\`${regex}\``).join(', '),
              },
            });
          }

          if (disallowUrls.some(regex => testUrl(regex, url))) {
            context.report({
              loc,
              messageId: 'disallowLinkUrl',
              data: {
                url,
                patterns: disallowUrls.map(regex => `\`${regex}\``).join(', '),
              },
            });
          }
        }
      },
    };
  },
};
