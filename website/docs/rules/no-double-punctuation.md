<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows standalone two-character punctuation runs in text when both characters are one of these punctuation marks:

```txt
! , . : ; ?
```

It checks plain text content and ignores code blocks and inline code.

Examples of reported patterns include `!!`, `?!`, `..`, and `;:`.

> [!NOTE]
>
> The current implementation only reports exact two-character runs. Longer runs such as `...`, `!!!`, and `!!?` are not reported.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-double-punctuation: 'error' -->

Foo!!
Bar?!
Baz..
Qux;:
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

````md eslint-check
<!-- eslint md/no-double-punctuation: 'error' -->

Foo!
Bar?
Baz...
Qux!!!

`Foo??`

```md
Foo;:
```
````

#### With `{ allow: ['!!', '?!'] }` Option

```md eslint-check
<!-- eslint md/no-double-punctuation: ['error', { allow: ['!!', '?!'] }] -->

Foo!!
Bar?!
Baz.
```

## Options

```js
'md/no-double-punctuation': ['error', {
  allow: [],
}]
```

### `allow`

> Type: `string[]` / Default: `[]`

When `allow` is specified, the listed two-character punctuation patterns are ignored by this rule. This is useful when patterns such as `!!` or `?!` are intentionally used in your document.

## Prior Art

- [`remark-lint-no-repeat-punctuation`](https://github.com/laysent/remark-lint-plugins/tree/HEAD/packages/remark-lint-no-repeat-punctuation)
