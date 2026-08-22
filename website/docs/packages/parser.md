---
description: "Package documentation and configuration options for the `@eslint-markdown/parser` Markdown parser."
---

# `@eslint-markdown/parser`

> A blazing fast Markdown parser for ESLint.

`@eslint-markdown/parser` parses Markdown source text into an [mdast](https://github.com/syntax-tree/mdast#readme) syntax tree. It supports CommonMark and GitHub Flavored Markdown (GFM), with optional support for YAML, TOML, or JSON front matter and math syntax.

## Usage

The default export provides the parser metadata and the `parse` function. The same values are also available as named exports.

```js
import parser from '@eslint-markdown/parser';

const ast = parser.parse('# Hello, world!', {
  mode: 'gfm',
  frontmatter: 'yaml',
  math: true,
});
```

## Configuration

Pass parser options as the second argument to `parse`:

```ts
interface ParseOptions {
  mode?: 'commonmark' | 'gfm';
  frontmatter?: false | 'yaml' | 'toml' | 'json';
  math?: boolean;
}
```

### `mode`

> Default: `'commonmark'`

Controls the Markdown dialect. Use `'commonmark'` for [CommonMark](https://commonmark.org/) or `'gfm'` for [GitHub Flavored Markdown](https://github.github.com/gfm/).

### `frontmatter`

> Default: `false`

Controls front matter parsing. Use `false` to disable front matter, `'yaml'` or `'json'` for front matter delimited by `---`, or `'toml'` for front matter delimited by `+++`.

### `math`

> Default: `false`

Enables inline and block math syntax when set to `true`.

## Exports

| Name           | Description                                                                 |
| :------------- | :-------------------------------------------------------------------------- |
| `default`      | Parser object containing `meta` and `parse`.                                |
| `meta`         | Object containing the package `name` and `version`.                         |
| `parse`        | Function that parses Markdown source text into an mdast `Root` syntax tree. |
| `Json`         | TypeScript type for JSON front matter nodes.                                |
| `JsonData`     | TypeScript type for data associated with JSON front matter nodes.           |
| `ParseOptions` | TypeScript type for the options accepted by `parse`.                        |
