<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a single, consistent style for unordered list markers in Markdown files. Consistent formatting makes it easier to understand a document, and mixing different unordered list styles can reduce readability.

An unordered list marker can be `-` (dash), `*` (asterisk), or `+` (plus). While Markdown allows any of these styles, this rule ensures that only one is used throughout the document.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: 'error' -->

- item 1
* item 2
+ item 3
```

#### With `{ style: '-' }` Option

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: ['error', { style: '-' }] -->

* item 1
+ item 2
```

#### With `{ style: '*' }` Option

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: ['error', { style: '*' }] -->

- item 1
+ item 2
```

#### With `{ style: '+' }` Option

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: ['error', { style: '+' }] -->

- item 1
* item 2
```

#### With `{ style: 'sublist' }` Option

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: ['error', { style: 'sublist' }] -->

- depth 0 item
  - depth 1 item
    * depth 2 item

+ depth 0 item
  + depth 1 item
    - depth 2 item
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: 'error' -->

- item 1
- item 2
- item 3
```

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: 'error' -->

* item 1
* item 2
* item 3
```

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: 'error' -->

+ item 1
+ item 2
+ item 3
```

#### With `{ style: '-' }` Option

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: ['error', { style: '-' }] -->

- item 1
- item 2
```

#### With `{ style: '*' }` Option

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: ['error', { style: '*' }] -->

* item 1
* item 2
```

#### With `{ style: '+' }` Option

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: ['error', { style: '+' }] -->

+ item 1
+ item 2
```

#### With `{ style: 'sublist' }` Option

```md eslint-check
<!-- eslint md/consistent-unordered-list-style: ['error', { style: 'sublist' }] -->

- depth 0 item
  + depth 1 item
    * depth 2 item

- depth 0 item
  + depth 1 item
    * depth 2 item
```

## Options

```js
'md/consistent-unordered-list-style': ['error', {
  style: 'consistent',
}]
```

### `style`

> Type: `'consistent' | 'sublist' | '-' | '*' | '+'` / Default: `'consistent'`

When `style` is set to `'consistent'`, the rule enforces that all unordered list markers in the document use the same style as the first one encountered.

When `style` is set to `'sublist'`, the rule enforces that all unordered list markers in sublists use a consistent symbol that differs from that of their parent list, depending on the nesting depth.

You can also specify a particular style by setting style to `'-'`, `'*'`, or `'+'`, which will enforce that all unordered list markers use the specified style.

## Fix

This rule fixes the unordered list markers by replacing them with the configured style.

## Prior Art

- [`MD004` - Unordered list style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md004.md#md004---unordered-list-style)
- [`remark-lint-unordered-list-marker-style`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-unordered-list-marker-style#remark-lint-unordered-list-marker-style)
