/**
 * @fileoverview HTML AST utilities.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { parseFragment } from 'parse5';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { DefaultTreeAdapterTypes } from 'parse5';
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Mimics the behavior of `getElementsByTagName` in the DOM API.
 * @param {string} html The HTML string to parse.
 * @param {string} tagName The tag name to search for (case-insensitive).
 * @returns {Array<DefaultTreeAdapterTypes.Element | DefaultTreeAdapterTypes.Template>}
 */
export default function getElementsByTagName(html, tagName) {
  const ast = parseFragment(html, { sourceCodeLocationInfo: true });
  const normalizedTagName = tagName.toLowerCase();

  /** @type {Array<DefaultTreeAdapterTypes.Element | DefaultTreeAdapterTypes.Template>} */
  const nodes = [];

  /**
   * @param {DefaultTreeAdapterTypes.Node} node
   * @returns {void}
   */
  function visit(node) {
    if ('tagName' in node && node.tagName === normalizedTagName) {
      nodes.push(node);
    }

    if ('childNodes' in node) {
      node.childNodes.forEach(visit);
    }
  }

  visit(ast);

  return nodes;
}
