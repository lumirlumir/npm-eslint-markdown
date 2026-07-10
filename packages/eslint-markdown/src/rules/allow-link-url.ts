/**
 * @fileoverview Rule to enforce the use of allowed or disallowed URLs for links.
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

type RuleOptions = [
  { allowUrls: RegExp[]; disallowUrls: RegExp[]; allowDefinitions: string[] },
];
type MessageIds = 'allowLinkUrl' | 'disallowLinkUrl';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const statefulRegexFlagRegex = /[gy]/u;

/**
 * Tests a regex without mutating the state stored in its `lastIndex`.
 * @param regex Regex to test.
 * @param text Text to test.
 * @returns Whether the regex matches the text.
 */
function testRegexStateless(regex: RegExp, text: string) {
  return statefulRegexFlagRegex.test(regex.flags)
    ? new RegExp(regex).test(text)
    : regex.test(text);
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

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

    const links = new Set<{ loc: Position; url: string }>();
    const linkReferenceIdentifiers = new Set<string>();
    const definitions = new Set<Definition>();

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
          if (!allowUrls.some(regex => testRegexStateless(regex, url))) {
            context.report({
              loc,
              messageId: 'allowLinkUrl',
              data: {
                url,
                patterns: allowUrls.map(regex => `\`${regex}\``).join(', '),
              },
            });
          }

          if (disallowUrls.some(regex => testRegexStateless(regex, url))) {
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
} as const satisfies RuleModule<RuleOptions, MessageIds>;
