<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule allows or disallows specific URLs for links in Markdown documents using [configurable patterns](#options). It can help enforce or relax link URL policies in your documentation, for example, by restricting links to certain domains or preventing the use of particular URLs.

The rule examines all link elements in a Markdown document and reports any links that either don't match the allowed URL patterns or that match disallowed URL patterns. It checks:

- Standard Markdown link syntax: `[text](url "title")` or `<https://example.com>`
- Link reference definitions: `[ref]: url "title"`
- HTML link tags: `<a href="url" title="title">text</a>`

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### With `{ allowUrls: [/example.com/] }` Option

```md eslint-check
<!-- eslint md/allow-link-url: ['error', { allowUrls: [/example.com/] }] -->

[Text](https://foo.com)

<https://foo.com>

<a href="https://foo.com">Text</a>

<div>
  <a href="https://foo.com">Text</a>
</div>

[Text][reference]

[reference]: https://foo.com
```

#### With `{ disallowUrls: [/example.com/] }` Option

```md eslint-check
<!-- eslint md/allow-link-url: ['error', { disallowUrls: [/example.com/] }] -->

[Text](https://example.com)

<https://example.com>

<a href="https://example.com">Text</a>

<div>
  <a href="https://example.com">Text</a>
</div>

[Text][reference]

[reference]: https://example.com
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

::: warning

By default, this rule reports nothing. To use this rule, please configure the [`allowUrls`](#allowurls) or [`disallowUrls`](#disallowurls) options.

:::

```md
<!-- eslint md/allow-link-url: 'error' -->

[Text](https://example.com)

<https://example.com>

<a href="https://example.com">Text</a>

<div>
  <a href="https://example.com">Text</a>
</div>

[Text][reference]

[reference]: https://example.com
```

#### With `{ allowUrls: [/example.com/] }` Option

```md eslint-check
<!-- eslint md/allow-link-url: ['error', { allowUrls: [/example.com/] }] -->

[Text](https://example.com)

<https://example.com>

<a href="https://example.com">Text</a>

<div>
  <a href="https://example.com">Text</a>
</div>

[Text][reference]

[reference]: https://example.com
```

#### With `{ disallowUrls: [/example.com/] }` Option

```md eslint-check
<!-- eslint md/allow-link-url: ['error', { disallowUrls: [/example.com/] }] -->

[Text](https://foo.com)

<https://foo.com>

<a href="https://foo.com">Text</a>

<div>
  <a href="https://foo.com">Text</a>
</div>

[Text][reference]

[reference]: https://foo.com
```

#### With `{ allowDefinitions: ['reference'], disallowUrls: [/example.com/] }` Option

```md eslint-check
<!-- eslint md/allow-link-url: ['error', { allowDefinitions: ['reference'], disallowUrls: [/example.com/] }] -->

[Text][reference]

[reference]: https://example.com
```

::: tip NOTE

Please note that this rule doesn't report definition-style comments (e.g., `[//]: ...`) by default.

```md eslint-check
<!-- eslint md/allow-link-url: ['error', { disallowUrls: [/example.com/] }] -->

[Text][//]

[//]: https://example.com
```

:::

## Options

```js
'md/allow-link-url': ['error', {
  allowUrls: [/.*/u],
  disallowUrls: [],
  allowDefinitions: ['//'],
}]
```

### `allowUrls`

> Type: `RegExp[]` / Default: `[/.*/u]`

Allowed URLs act like a ***whitelist***. Only those written on the whitelist **can** pass through.

For example, if you pass an empty array to the option, it allows nothing. i.e. Every **link** will be detected.

### `disallowUrls`

> Type: `RegExp[]` / Default: `[]`

On the contrary, disallowed URLs act like a ***blacklist***. Only those written on the blacklist **cannot** pass through.

For example, if you pass an empty array to the option, it allows everything. i.e. no **link** will be detected.

### `allowDefinitions`

> Type: `string[]` / Default: `['//']`

When specified, specific definitions are allowed if they match one of the identifiers in this array. This is useful for ignoring definitions that are intentionally left, such as comments or placeholders.

## When Not To Use It

You might want to disable this rule if you don't need to enforce any specific URL policies for links in your Markdown documents.

## Prior Art

- [`textlint-rule-allowed-uris`](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris#readme)
