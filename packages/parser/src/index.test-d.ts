/**
 * @fileoverview Type test for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import parser, {
  meta,
  parse,
  type Json,
  type JsonData,
  type ParseOptions,
} from '@eslint-markdown/parser';
import type {
  Json as ESLintMarkdownJson,
  JsonData as ESLintMarkdownJsonData,
  MarkdownLanguageOptions,
} from '@eslint/markdown';
import type { Data, FrontmatterContent, PhrasingContent, Root, RootContent } from 'mdast';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region Json (type)

({}) as Json satisfies Extract<RootContent, { type: 'json' }>;
({}) as Json satisfies Extract<FrontmatterContent, { type: 'json' }>;

({}) as Json satisfies ESLintMarkdownJson;

// #endregion Json (type)
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region JsonData (type)

({}) as JsonData satisfies Data;

({}) as JsonData satisfies ESLintMarkdownJsonData;

// #endregion JsonData (type)
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region satteri mdast augmentation (type)

'toml' satisfies RootContent['type'];
'math' satisfies RootContent['type'];
'inlineMath' satisfies PhrasingContent['type'];

// #endregion satteri mdast augmentation (type)
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region ParseOptions (type)

let parseOptions: ParseOptions;

parseOptions = {};
parseOptions = {
  mode: 'commonmark',
};
parseOptions = {
  mode: 'gfm',
};
parseOptions = {
  frontmatter: false,
};
parseOptions = {
  frontmatter: 'yaml',
};
parseOptions = {
  frontmatter: 'toml',
};
parseOptions = {
  frontmatter: 'json',
};
parseOptions = {
  math: false,
};
parseOptions = {
  math: true,
};
parseOptions = {
  mode: 'gfm',
  frontmatter: 'json',
  math: true,
};

// @ts-expect-error -- `mode` only accepts supported Markdown modes.
parseOptions = { mode: 'mdx' };
// @ts-expect-error -- `frontmatter` does not accept `true`.
parseOptions = { frontmatter: true };
// @ts-expect-error -- `frontmatter` only accepts supported front matter formats.
parseOptions = { frontmatter: 'xml' };
// @ts-expect-error -- `math` must be a boolean.
parseOptions = { math: 'true' };

({}) as MarkdownLanguageOptions['frontmatter'] satisfies ParseOptions['frontmatter'];

// #endregion ParseOptions (type)
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region meta (named export)

meta.name satisfies string;
meta.name satisfies '@eslint-markdown/parser';

meta.version satisfies string;

// #endregion meta (named export)
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region parse (named export)

parse satisfies Function;
parse satisfies (text: string, options?: ParseOptions) => Root;

// #endregion parse (named export)
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region parser (default export)

parser satisfies object;
parser.meta satisfies typeof meta;
parser.parse satisfies typeof parse;

// #endregion parser (default export)
// --------------------------------------------------------------------------------
