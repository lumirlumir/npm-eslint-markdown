<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule is triggered by any line that contains tab characters instead of spaces. To fix it, replace tab characters with spaces.

Regardless of debates in other languages about tabs versus spaces, tabs in Markdown don't behave as expected, especially with blockquotes, lists, and indented code.

For example, `>\ta` produces a paragraph with the text `a` in a blockquote, so one might expect `>\t\ta` to produce indented code containing `a` within the blockquote.

```md
>\ta

>\t\ta
```

The Markdown above is rendered as the following HTML:

```html
<blockquote>
<p>a</p>
</blockquote>
<blockquote>
<pre><code>  a
</code></pre>
</blockquote>
```

Because Markdown uses a hardcoded tab size of 4, the first tab can be represented as 3 spaces (because there is a `>` before it). One of those spaces is consumed because block quotes allow the `>` to be followed by one space, leaving 2 spaces. The next tab can be represented as 4 spaces, so together we have 6 spaces. Indented code uses 4 spaces, so there are 2 spaces left, which are shown in the indented code.

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Default

<!-- markdownlint-disable no-hard-tabs -->

```md eslint-check
<!-- eslint md/no-tab: 'error' -->

\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
```

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ skipCode: false }` Option

<!-- markdownlint-disable no-hard-tabs -->

`````md eslint-check
<!-- eslint md/no-tab: ['error', { skipCode: false }] -->

```md
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
```

````md
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
````

~~~txt
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
~~~

    \u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
`````

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ skipCode: ['js', 'ts'] }` Option

<!-- markdownlint-disable no-hard-tabs -->

````md eslint-check
<!-- eslint md/no-tab: ['error', { skipCode: ['js', 'ts'] }] -->

```md
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
```

```txt
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
```

    \u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
````

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ skipInlineCode: false }` Option

<!-- markdownlint-disable no-hard-tabs -->

```md eslint-check
<!-- eslint md/no-tab: ['error', { skipInlineCode: false }] -->

\u0009 - Horizontal Tab (\t) - <TAB> `	` <= Here
```

<!-- markdownlint-enable no-hard-tabs -->

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-tab: 'error' -->

\u0020 - Space - <SP>   <= Here
```

#### With `{ skipCode: true }` Option

<!-- markdownlint-disable no-hard-tabs -->

`````md eslint-check
<!-- eslint md/no-tab: ['error', { skipCode: true }] -->

```md
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
```

````md
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
````

~~~txt
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
~~~

    \u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
`````

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ skipCode: ['md', 'txt'] }` Option

<!-- markdownlint-disable no-hard-tabs -->

````md eslint-check
<!-- eslint md/no-tab: ['error', { skipCode: ['md', 'txt'] }] -->

```md
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
```

```txt
\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
```
````

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ skipInlineCode: true }` Option

<!-- markdownlint-disable no-hard-tabs -->

```md eslint-check
<!-- eslint md/no-tab: ['error', { skipInlineCode: true }] -->

\u0009 - Horizontal Tab (\t) - <TAB> `	` <= Here
```

<!-- markdownlint-enable no-hard-tabs -->

## Options

```js
'md/no-tab': ['error', {
  skipCode: true,
  skipInlineCode: true,
  tabWidth: 4,
}]
```

### `skipCode`

> Type: `boolean | string[]` / Default: `true`

`true` allows tabs in all code blocks, while `string[]` allows tabs only in code blocks for the specified languages.

### `skipInlineCode`

> Type: `boolean` / Default: `true`

`true` allows tabs in all inline code.

### `tabWidth`

> Type: `number` / Default: `4`

Number of spaces to replace each tab with when applying an autofix.

::: warning Why is the default value `4`?

[The CommonMark specification](https://spec.commonmark.org/0.31.2/#tabs) states that "tabs behave as if they were replaced by spaces with a tab stop of 4 characters.".

:::

## Fix

This rule fixes the tab characters by replacing them with spaces. The number of spaces used for each tab is determined by the [`tabWidth`](#tabwidth) option.

## When Not To Use It

If you decide that you wish to use tabs for alignment or other purposes in your Markdown files, you might choose to disable this rule.

## Prior Art

- [`MD010` - Hard tabs](https://github.com/DavidAnson/markdownlint/blob/main/doc/md010.md#md010---hard-tabs)
- [`remark-lint-no-tabs`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-tabs#remark-lint-no-tabs)
