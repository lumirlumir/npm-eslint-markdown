<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule allows or disallows specific URLs for images in Markdown documents using [configurable patterns](#options). It can help enforce or relax image URL policies in your documentation, for example, by restricting images to certain domains or preventing the use of particular URLs.

The rule examines all image elements in a Markdown document and reports any images that either don't match the allowed URL patterns or that match disallowed URL patterns. It checks:

- Standard Markdown image syntax: `![alt text](url "title")`
- Image reference definitions: `[ref]: url "title"`
- HTML image tags: `<img src="url" alt="alt text" title="title">`

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### With `{ allowUrls: [/example.com/] }` Option

```md eslint-check
<!-- eslint md/allow-image-url: ['error', { allowUrls: [/example.com/] }] -->

![Alt text](https://foo.com/image.png)

<img src="https://foo.com/image.png" alt="Alt text">

<div>
  <img src="https://foo.com/image.png" alt="Alt text">
</div>

![Alt text][reference]

[reference]: https://foo.com/image.png
```

#### With `{ disallowUrls: [/example.com/] }` Option

```md eslint-check
<!-- eslint md/allow-image-url: ['error', { disallowUrls: [/example.com/] }] -->

![Alt text](https://example.com/image.png)

<img src="https://example.com/image.png" alt="Alt text">

<div>
  <img src="https://example.com/image.png" alt="Alt text">
</div>

![Alt text][reference]

[reference]: https://example.com/image.png
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

::: warning

By default, this rule reports nothing. To use this rule, please configure the [`allowUrls`](#allowurls) or [`disallowUrls`](#disallowurls) options.

:::

```md
<!-- eslint md/allow-image-url: 'error' -->

![Alt text](https://example.com/image.png)

<img src="https://example.com/image.png" alt="Alt text">

<div>
  <img src="https://example.com/image.png" alt="Alt text">
</div>

![Alt text][reference]

[reference]: https://example.com/image.png
```

#### With `{ allowUrls: [/example.com/] }` Option

```md eslint-check
<!-- eslint md/allow-image-url: ['error', { allowUrls: [/example.com/] }] -->

![Alt text](https://example.com/image.png)

<img src="https://example.com/image.png" alt="Alt text">

<div>
  <img src="https://example.com/image.png" alt="Alt text">
</div>

![Alt text][reference]

[reference]: https://example.com/image.png
```

#### With `{ disallowUrls: [/example.com/] }` Option

```md eslint-check
<!-- eslint md/allow-image-url: ['error', { disallowUrls: [/example.com/] }] -->

![Alt text](https://foo.com/image.png)

<img src="https://foo.com/image.png" alt="Alt text">

<div>
  <img src="https://foo.com/image.png" alt="Alt text">
</div>

![Alt text][reference]

[reference]: https://foo.com/image.png
```

#### With `{ allowDefinitions: ['reference'], disallowUrls: [/example.com/] }` Option

```md eslint-check
<!-- eslint md/allow-image-url: ['error', { allowDefinitions: ['reference'], disallowUrls: [/example.com/] }] -->

![Alt text][reference]

[reference]: https://example.com/image.png
```

::: tip NOTE

Please note that this rule doesn't report definition-style comments (e.g., `[//]: ...`) by default.

```md eslint-check
<!-- eslint md/allow-image-url: ['error', { disallowUrls: [/example.com/] }] -->

![Alt text][//]

[//]: https://example.com/image.png
```

:::

## Options

```js
'md/allow-image-url': ['error', {
  allowUrls: [/.*/u],
  disallowUrls: [],
  allowDefinitions: ['//'],
}]
```

### `allowUrls`

> Type: `RegExp[]` / Default: `[/.*/u]`

Allowed URLs act like a ***whitelist***. Only those written on the whitelist **can** pass through.

For example, if you pass an empty array to the option, it allows nothing. i.e. Every **image** will be detected.

### `disallowUrls`

> Type: `RegExp[]` / Default: `[]`

On the contrary, disallowed URLs act like a ***blacklist***. Only those written on the blacklist **cannot** pass through.

For example, if you pass an empty array to the option, it allows everything. i.e. no **image** will be detected.

### `allowDefinitions`

> Type: `string[]` / Default: `['//']`

When specified, specific definitions are allowed if they match one of the identifiers in this array. This is useful for ignoring definitions that are intentionally left, such as comments or placeholders.

## When Not To Use It

You might want to disable this rule if you don't need to enforce any specific URL policies for images in your Markdown documents.

## Prior Art

- [`textlint-rule-allowed-uris`](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris#readme)
