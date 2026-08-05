/**
 * @fileoverview Entry file for the `@eslint-markdown/parser` package.
 * @see https://eslint.org/docs/latest/use/configure/parser
 * @see https://eslint.org/docs/latest/extend/custom-parsers
 */

// --------------------------------------------------------------------------------
// Reference Directive
// --------------------------------------------------------------------------------

/// <reference types="satteri" preserve="true" />

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Data, Literal, Root } from 'mdast';
import { markdownToMdast } from 'satteri';
import pkg from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Markdown JSON.
 */
export interface Json extends Literal {
  /**
   * Node type of mdast JSON.
   */
  type: 'json';
  /**
   * Data associated with the mdast JSON.
   */
  data?: JsonData | undefined;
}

/**
 * Info associated with mdast JSON nodes by the ecosystem.
 */
export type JsonData = Data;

/**
 * Registers mdast JSON nodes as valid front matter and root content.
 */
declare module 'mdast' {
  interface FrontmatterContentMap {
    json: Json;
  }

  interface RootContentMap {
    json: Json;
  }
}

/**
 * The options for parsing markdown.
 */
export interface ParseOptions {
  /**
   * The options for parsing markdown.
   * @default 'commonmark'
   */
  mode?: 'commonmark' | 'gfm';

  /**
   * The options for parsing frontmatter.
   * @default false
   */
  frontmatter?: false | 'yaml' | 'toml' | 'json';

  /**
   * The options for parsing math.
   * @default false
   */
  math?: boolean;
}

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

/**
 * Metadata describing the parser.
 */
export const meta = {
  /**
   * The name of the parser.
   */
  name: '@eslint-markdown/parser',

  /**
   * The version of the parser.
   */
  version: pkg.version,
} as const;

/**
 * Parse Markdown source text into an mdast syntax tree at blazing-fast speed.
 *
 * @param text The Markdown source text to parse.
 * @param options The parsing options.
 * @returns The mdast syntax tree.
 * @example
 * ```js
 * import { parse } from '@eslint-markdown/parser';
 *
 * const ast = parse('# Hello, world!', {
 *   mode: 'commonmark',
 *   frontmatter: false,
 *   math: false,
 * });
 * ```
 */
export function parse(
  text: string,
  { mode = 'commonmark', frontmatter = false, math = false }: ParseOptions = {},
): Root {
  const ast = markdownToMdast(text, {
    features: {
      gfm: mode === 'gfm',
      frontmatter: frontmatter !== false,
      math,
    },
  });

  /*
   * `satteri` does not support JSON front matter. Because JSON and YAML front
   * matter both use `---` delimiters, we can reuse the YAML front matter handling.
   *
   * To ensure compatibility with `@eslint/markdown`, convert `yaml` node to a
   * `json` node when `frontmatter` is set to `'json'`.
   *
   * Front matter can only appear at the beginning of a document, so we can safely
   * assume that the root node's first child is the front matter node.
   */
  if (frontmatter === 'json' && ast.type === 'root' && ast.children[0]?.type === 'yaml') {
    ast.children[0] = {
      ...ast.children[0],
      type: 'json',
    };
  }

  // TODO: Remove `as Root` when https://github.com/bruits/satteri/issues/191 is resolved.
  return ast as Root;
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default {
  meta,
  parse,
};
