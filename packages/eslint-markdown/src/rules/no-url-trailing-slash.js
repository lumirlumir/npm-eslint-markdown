/**
 * @fileoverview Rule to disallow URL trailing slash.
 * @author lumir
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getElementsByTagName } from '../core/ast/index.js';
import { URL_RULE_DOCS } from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { Link, Image, Definition } from 'mdast';
 * @import { RuleModule } from '../core/types.js';
 * @typedef {[]} RuleOptions
 * @typedef {'noUrlTrailingSlash'} MessageIds
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Check whether the URL has a trailing slash.
 * - It returns `false` if the `URL` constructor cannot parse the given URL.
 * - This function trims the `search` and `hash` parts.
 * @param {string} url
 * @returns {boolean}
 */
function hasTrailingSlash(url) {
  try {
    /*
     * Please note that the `href` and `pathname` properties of a `URL` object
     * cannot be used directly to check for trailing slashes. For example:
     * - `new URL('https://foo.com')`'s `href` is `'https://foo.com/'` (with trailing slash) and `pathname` is `'/'`.
     * - `new URL('https://foo.com/')`'s `href` is `'https://foo.com/'` (with trailing slash) and `pathname` is `'/'`.
     * So, both `href` and `pathname` include trailing slashes, which is not what we want.
     */
    const { search, hash } = new URL(url);
    let urlWithoutSearchAndHash = url;

    /*
     * Remove the `hash` part first, since it always comes after the `search` part.
     *
     *     https://example.com/path/to/resource?query=string#fragment
     *     -------------------------------------------------^^^^^^^^^
     *
     * If there is no `hash` part but the URL ends with `#`, remove it too.
     * A lone `#` is treated as an empty string (`''`) in `hash` property.
     *
     *     https://example.com/path/to/resource?query=string#
     *     -------------------------------------------------^
     */
    if (hash) {
      urlWithoutSearchAndHash = urlWithoutSearchAndHash.slice(0, url.indexOf(hash));
    } else if (urlWithoutSearchAndHash.endsWith('#')) {
      urlWithoutSearchAndHash = urlWithoutSearchAndHash.slice(0, -1);
    }

    /*
     * Then, remove the `search` part, since it always comes after the `pathname` part.
     *
     *     https://example.com/path/to/resource?query=string
     *     ------------------------------------^^^^^^^^^^^^^
     *
     * If there is no `search` part but the URL ends with `?`, remove it too.
     * A lone `?` is treated as an empty string (`''`) in `search` property.
     *
     *     https://example.com/path/to/resource?
     *     ------------------------------------^
     */
    if (search) {
      urlWithoutSearchAndHash = urlWithoutSearchAndHash.slice(0, url.indexOf(search));
    } else if (urlWithoutSearchAndHash.endsWith('?')) {
      urlWithoutSearchAndHash = urlWithoutSearchAndHash.slice(0, -1);
    }

    return urlWithoutSearchAndHash.endsWith('/');
  } catch {
    return false;
  }
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

/** @type {RuleModule<RuleOptions, MessageIds>} */
export default {
  meta: {
    type: 'problem',

    docs: {
      description: 'Disallow URL trailing slash',
      url: URL_RULE_DOCS('no-url-trailing-slash'),
      recommended: false,
      stylistic: false,
    },

    messages: {
      noUrlTrailingSlash: 'URL trailing slash is not allowed.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;

    return {
      'link, image, definition'(/** @type {Link | Image | Definition} */ node) {
        if (hasTrailingSlash(node.url)) {
          context.report({
            node,
            messageId: 'noUrlTrailingSlash',
          });
        }
      },

      html(node) {
        const [nodeStartOffset] = sourceCode.getRange(node);
        const html = sourceCode.getText(node);

        for (const { attrs, sourceCodeLocation } of getElementsByTagName(html, 'a')) {
          for (const { name, value } of attrs) {
            if (name === 'href' && hasTrailingSlash(value) && sourceCodeLocation?.attrs) {
              context.report({
                loc: {
                  start: sourceCode.getLocFromIndex(
                    nodeStartOffset + sourceCodeLocation.attrs.href.startOffset,
                  ),
                  end: sourceCode.getLocFromIndex(
                    nodeStartOffset + sourceCodeLocation.attrs.href.endOffset,
                  ),
                },
                messageId: 'noUrlTrailingSlash',
              });
            }
          }
        }

        for (const { attrs, sourceCodeLocation } of getElementsByTagName(html, 'img')) {
          for (const { name, value } of attrs) {
            if (name === 'src' && hasTrailingSlash(value) && sourceCodeLocation?.attrs) {
              context.report({
                loc: {
                  start: sourceCode.getLocFromIndex(
                    nodeStartOffset + sourceCodeLocation.attrs.src.startOffset,
                  ),
                  end: sourceCode.getLocFromIndex(
                    nodeStartOffset + sourceCodeLocation.attrs.src.endOffset,
                  ),
                },
                messageId: 'noUrlTrailingSlash',
              });
            }
          }
        }
      },
    };
  },
};
