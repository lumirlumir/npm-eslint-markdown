<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a single, consistent style for headings in Markdown files. Consistent formatting makes it easier to understand a document, and mixing different heading styles can reduce readability.

A heading can use ATX syntax (`## Heading`), closed ATX syntax (`## Heading ##`), or Setext syntax (an underline of `=` or `-` characters). By default, this rule enforces that all headings use the same style as the first one encountered.

Setext headings support only levels 1 and 2. The `setext-with-atx` and `setext-with-atx-closed` styles combine Setext headings at levels 1 and 2 with ATX or closed ATX headings at levels 3 through 6.

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

When `style` is set to `'consistent'`, the rule enforces that all headings in the document use the same style as the first one encountered.

You can also specify a particular style by setting `style` to one of the following values:

- `'atx'`: Require ATX headings at every level, such as `## Heading`.
- `'atx-closed'`: Require closed ATX headings at every level, such as `## Heading ##`.
- `'setext'`: Require Setext headings at levels 1 and 2. Headings at levels 3 through 6 are reported because Setext does not support those levels.
- `'setext-with-atx'`: Require Setext headings at levels 1 and 2, and ATX headings at levels 3 through 6.
- `'setext-with-atx-closed'`: Require Setext headings at levels 1 and 2, and closed ATX headings at levels 3 through 6.

## Fix

This rule fixes the headings by converting them to the configured style when possible.

## Suggestion

This rule provides suggestions for converting ATX and closed ATX headings to Setext headings when possible. Review each suggestion before applying it, as the conversion may change how the Markdown is interpreted.

## Prior Art

- [`MD003` - Heading style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md003.md#md003---heading-style)
- [`remark-lint-heading-style`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-heading-style#remark-lint-heading-style)
