/**
 * @fileoverview HTML AST utilities.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { parseFragment } from 'parse5';
import type { DefaultTreeAdapterTypes } from 'parse5';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Mimics the behavior of `getElementsByTagName` in the DOM API.
 * @param html The HTML string to parse.
 * @param tagName The tag name to search for (case-insensitive).
 * @returns Matched elements.
 */
export default function getElementsByTagName(
  html: string,
  tagName: string,
): (DefaultTreeAdapterTypes.Element | DefaultTreeAdapterTypes.Template)[] {
  const ast = parseFragment(html, { sourceCodeLocationInfo: true });
  const normalizedTagName = tagName.toLowerCase();

  const nodes: (DefaultTreeAdapterTypes.Element | DefaultTreeAdapterTypes.Template)[] =
    [];

  function visit(node: DefaultTreeAdapterTypes.Node): void {
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
