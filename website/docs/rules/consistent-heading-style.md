<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a consistent heading style in Markdown files.

Markdown supports ATX headings, closed ATX headings, and Setext headings. While all three styles are valid, mixing them can reduce readability. This rule either follows the style of the first heading in the document or enforces a configured style.

Setext headings can represent only level 1 and level 2 headings. The `setext-with-atx` and `setext-with-atx-closed` styles use Setext for levels 1 and 2 and an ATX style for levels 3 through 6.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-heading-style: 'error' -->

# ATX heading

## Closed ATX heading ##

Setext heading
--------------
```

#### With `{ style: 'atx' }` Option

```md eslint-check
<!-- eslint md/consistent-heading-style: ['error', { style: 'atx' }] -->

# Closed ATX heading #

Setext heading
--------------
```

#### With `{ style: 'atx-closed' }` Option

```md eslint-check
<!-- eslint md/consistent-heading-style: ['error', { style: 'atx-closed' }] -->

# ATX heading

Setext heading
--------------
```

#### With `{ style: 'setext' }` Option

```md eslint-check
<!-- eslint md/consistent-heading-style: ['error', { style: 'setext' }] -->

# ATX heading

### Level 3 heading
```

#### With `{ style: 'setext-with-atx' }` Option

```md eslint-check
<!-- eslint md/consistent-heading-style: ['error', { style: 'setext-with-atx' }] -->

# Level 1 heading

### Closed level 3 heading ###
```

#### With `{ style: 'setext-with-atx-closed' }` Option

```md eslint-check
<!-- eslint md/consistent-heading-style: ['error', { style: 'setext-with-atx-closed' }] -->

# Level 1 heading #

### Level 3 heading
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-heading-style: 'error' -->

# Level 1 heading

## Level 2 heading

### Level 3 heading
```

```md eslint-check
<!-- eslint md/consistent-heading-style: 'error' -->

# Level 1 heading #

## Level 2 heading ##

### Level 3 heading ###
```

```md eslint-check
<!-- eslint md/consistent-heading-style: 'error' -->

Level 1 heading
===============

Level 2 heading
---------------
```

#### With `{ style: 'atx' }` Option

```md eslint-check
<!-- eslint md/consistent-heading-style: ['error', { style: 'atx' }] -->

# Level 1 heading

### Level 3 heading
```

#### With `{ style: 'atx-closed' }` Option

```md eslint-check
<!-- eslint md/consistent-heading-style: ['error', { style: 'atx-closed' }] -->

# Level 1 heading #

### Level 3 heading ###
```

#### With `{ style: 'setext' }` Option

```md eslint-check
<!-- eslint md/consistent-heading-style: ['error', { style: 'setext' }] -->

Level 1 heading
===============

Level 2 heading
---------------
```

#### With `{ style: 'setext-with-atx' }` Option

```md eslint-check
<!-- eslint md/consistent-heading-style: ['error', { style: 'setext-with-atx' }] -->

Level 1 heading
===============

Level 2 heading
---------------

### Level 3 heading
```

#### With `{ style: 'setext-with-atx-closed' }` Option

```md eslint-check
<!-- eslint md/consistent-heading-style: ['error', { style: 'setext-with-atx-closed' }] -->

Level 1 heading
===============

Level 2 heading
---------------

### Level 3 heading ###
```

## Options

```js
'md/consistent-heading-style': ['error', {
  style: 'consistent',
}]
```

### `style`

> Type: `'consistent' | 'atx' | 'atx-closed' | 'setext' | 'setext-with-atx' | 'setext-with-atx-closed'` / Default: `'consistent'`

When `style` is set to `'consistent'`, the rule enforces that all headings use the same style as the first heading in the document.

The other values enforce the following styles:

- `'atx'`: ATX headings at every level, such as `## Heading`.
- `'atx-closed'`: closed ATX headings at every level, such as `## Heading ##`.
- `'setext'`: Setext headings at every supported level. Level 3 through 6 headings are reported because Setext cannot represent them.
- `'setext-with-atx'`: Setext headings at levels 1 and 2, and ATX headings at levels 3 through 6.
- `'setext-with-atx-closed'`: Setext headings at levels 1 and 2, and closed ATX headings at levels 3 through 6.

## Fix

This rule fixes headings by converting them to the configured style when the conversion preserves their Markdown structure.

Some reported headings are not fixed. This includes level 3 through 6 headings when using the `setext` style, empty headings or nested ATX headings that would need to become Setext, and multiline Setext headings that would need to become ATX.

## Prior Art

- [`MD003` - Heading style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md003.md#md003---heading-style)
- [`remark-lint-heading-style`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-heading-style#remark-lint-heading-style)
