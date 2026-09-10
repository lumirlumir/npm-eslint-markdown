<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows multiple consecutive spaces or tabs after the opening hash characters (`#`) of ATX headings.

By default, the rule checks the whitespace after the opening hash characters. Set `checkClosedHeadings` to `true` to also check the whitespace before the closing hash characters in closed ATX headings.

This rule does not enforce missing spaces. Use [`markdown/no-missing-atx-heading-space`](https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-atx-heading-space.md) to check missing spaces, and enable its `checkClosedHeadings` option to check closed ATX headings.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-multiple-atx-heading-space: 'error' -->

#  Heading 1

##   Heading 2

#  Closed ATX heading #
```

#### With `{ checkClosedHeadings: true }` Option

```md eslint-check
<!-- eslint md/no-multiple-atx-heading-space: ['error', { checkClosedHeadings: true }] -->

# Closed ATX heading  #

##  Closed ATX heading   ##
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-multiple-atx-heading-space: 'error' -->

# Heading 1

## Heading 2

# Closed ATX heading  #

## Closed ATX heading   ##

Setext heading
---------------
```

#### With `{ checkClosedHeadings: true }` Option

```md eslint-check
<!-- eslint md/no-multiple-atx-heading-space: ['error', { checkClosedHeadings: true }] -->

# Closed ATX heading #

## Closed ATX heading ##

Setext heading
---------------
```

## Options

```js
'md/no-multiple-atx-heading-space': ['error', {
  checkClosedHeadings: false,
}]
```

### `checkClosedHeadings`

> Type: `boolean` / Default: `false`

When `checkClosedHeadings` is set to `true`, this rule also checks for multiple consecutive spaces or tabs before the closing hash characters in closed ATX headings.

## Fix

This rule fixes multiple consecutive spaces or tabs by replacing them with a single space.

For example, `#  Heading 1` is fixed to `# Heading 1`. With `checkClosedHeadings` enabled, `##  Heading 2  ##` is fixed to `## Heading 2 ##`.

## When Not To Use It

If you intentionally use multiple spaces or tabs next to ATX heading markers, you should disable this rule.

## Prior Art

- [`MD019` - Multiple spaces after hash on atx style heading](https://github.com/DavidAnson/markdownlint/blob/main/doc/md019.md#md019---multiple-spaces-after-hash-on-atx-style-heading)
- [`MD021` - Multiple spaces inside hashes on closed atx style heading](https://github.com/DavidAnson/markdownlint/blob/main/doc/md021.md#md021---multiple-spaces-inside-hashes-on-closed-atx-style-heading)
