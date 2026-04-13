<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Repeated punctuation such as `!!`, `??`, `...`, and `~~` can make Markdown content look noisy and inconsistent.

This rule disallows repeated punctuation in text for the following characters:

```txt
！ ! ~ ～ . 。 , ， · ? ？
```

It checks plain text content and ignores code blocks and inline code.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-double-punctuation: 'error' -->

Hello!!
Are you sure??
Maybe...
This is fine~~
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-double-punctuation: 'error' -->

Hello!
Are you sure?
Maybe.
This is fine~
```

#### With `{ allow: ['!!', '??'] }` Option

```md eslint-check
<!-- eslint md/no-double-punctuation: ['error', { allow: ['!!', '??'] }] -->

Hello!!
Are you sure??
Maybe.
This is fine~
```

## Options

```js
'md/no-double-punctuation': ['error', {
  allow: [],
}]
```

### `allow`

> Type: `string[]` / Default: `[]`

When `allow` is specified, the listed repeated punctuation patterns are ignored by this rule. This is useful when patterns such as `!!` or `??` are intentionally used in your document.

## Prior Art

- [`remark-lint-no-repeat-punctuation`](https://github.com/laysent/remark-lint-plugins/tree/HEAD/packages/remark-lint-no-repeat-punctuation)
