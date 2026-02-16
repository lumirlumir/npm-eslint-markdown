<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a single, consistent style for code blocks in Markdown files. Consistent formatting makes it easier to understand a document, and mixing different code block styles can reduce readability.

A code block is defined as either an indented code block (4 spaces or 1 tab), a fenced code block with backticks (`` ``` ``), or a fenced code block with tildes (`~~~`). While Markdown allows any of these styles, this rule ensures that only one is used throughout the document.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

````md eslint-check
<!-- eslint md/consistent-code-style: 'error' -->

    code block 1

```
code block 2
```

~~~
code block 3
~~~
````

````md eslint-check
<!-- eslint md/consistent-code-style: 'error' -->

```
code block 1
```

    code block 2

~~~
code block 3
~~~
````

````md eslint-check
<!-- eslint md/consistent-code-style: 'error' -->

~~~
code block 1
~~~

    code block 2

```
code block 3
```
````

#### With `{ style: 'indent' }` Option

````md eslint-check
<!-- eslint md/consistent-code-style: ['error', { style: 'indent' }] -->

```
code block 1
```

~~~
code block 2
~~~
````

#### With `{ style: 'fence-backtick' }` Option

````md eslint-check
<!-- eslint md/consistent-code-style: ['error', { style: 'fence-backtick' }] -->

    code block 1

~~~
code block 2
~~~
````

#### With `{ style: 'fence-tilde' }` Option

````md eslint-check
<!-- eslint md/consistent-code-style: ['error', { style: 'fence-tilde' }] -->

    code block 1

```
code block 2
```
````

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-code-style: 'error' -->

    code block 1

    code block 2
```

````md eslint-check
<!-- eslint md/consistent-code-style: 'error' -->

```
code block 1
```

```
code block 2
```
````

````md eslint-check
<!-- eslint md/consistent-code-style: 'error' -->

~~~
code block 1
~~~

~~~
code block 2
~~~
````

#### With `{ style: 'indent' }` Option

```md eslint-check
<!-- eslint md/consistent-code-style: ['error', { style: 'indent' }] -->

    code block 1
```

#### With `{ style: 'fence-backtick' }` Option

````md eslint-check
<!-- eslint md/consistent-code-style: ['error', { style: 'fence-backtick' }] -->

```
code block 1
```
````

#### With `{ style: 'fence-tilde' }` Option

````md eslint-check
<!-- eslint md/consistent-code-style: ['error', { style: 'fence-tilde' }] -->

~~~
code block 1
~~~
````

## Options

```js
'md/consistent-code-style': ['error', {
  style: 'consistent',
}]
```

### `style`

> Type: `'consistent' | 'indent' | 'fence-backtick' | 'fence-tilde'` / Default: `'consistent'`

When `style` is set to `'consistent'`, the rule enforces that all code blocks in the document use the same style as the first one encountered.

You can also specify a particular style by setting style to `'indent'`, `'fence-backtick'`, or `'fence-tilde'`, which will enforce that all code blocks use the specified style.

## Prior Art

- [`MD046` - Code block style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md046.md#md046---code-block-style)
- [`MD048` - Code fence style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md048.md#md048---code-fence-style)
- [`remark-lint-code-block-style`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-code-block-style#remark-lint-code-block-style)
- [`remark-lint-fenced-code-marker`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-fenced-code-marker#remark-lint-fenced-code-marker)
