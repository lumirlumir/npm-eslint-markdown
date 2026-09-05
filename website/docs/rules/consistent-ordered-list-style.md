<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a consistent numbering style for ordered list item prefixes in Markdown files. Consistent numbering makes the structure of ordered lists easier to understand.

Ordered list items can use the same number for every item or increase sequentially. The less common style of starting with `0` is also supported.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: 'error' -->

1. First
3. Second
4. Third
```

#### With `{ style: 'one' }` Option

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: ['error', { style: 'one' }] -->

1. First
2. Second
3. Third
```

#### With `{ style: 'ordered' }` Option

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: ['error', { style: 'ordered' }] -->

1. First
1. Second
1. Third
```

#### With `{ style: 'zero' }` Option

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: ['error', { style: 'zero' }] -->

0. First
1. Second
2. Third
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: 'error' -->

1. First
1. Second
1. Third
```

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: 'error' -->

1. First
2. Second
3. Third
```

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: 'error' -->

0. First
1. Second
2. Third
```

#### With `{ style: 'one' }` Option

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: ['error', { style: 'one' }] -->

1. First
1. Second
1. Third
```

#### With `{ style: 'ordered' }` Option

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: ['error', { style: 'ordered' }] -->

1. First
2. Second
3. Third
```

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: ['error', { style: 'ordered' }] -->

0. First
1. Second
2. Third
```

#### With `{ style: 'zero' }` Option

```md eslint-check
<!-- eslint md/consistent-ordered-list-style: ['error', { style: 'zero' }] -->

0. First
0. Second
0. Third
```

## Options

```js
'md/consistent-ordered-list-style': ['error', {
  style: 'one_or_ordered',
}]
```

### `style`

> Type: `'one' | 'one_or_ordered' | 'ordered' | 'zero'` / Default: `'one_or_ordered'`

When `style` is set to `'one_or_ordered'`, the rule allows either the `'one'` or `'ordered'` style based on the first two list item prefixes.

You can also specify `'one'` to require every prefix to be `1`, `'ordered'` to require prefixes to increase sequentially, starting from `1` or from `0` when the list has two or more items, or `'zero'` to require every prefix to be `0`.

The `'ordered'` behavior follows the `markdownlint` rule `MD029`.

## Prior Art

- [`MD029` - Ordered list item prefix](https://github.com/DavidAnson/markdownlint/blob/main/doc/md029.md#md029---ordered-list-item-prefix)
