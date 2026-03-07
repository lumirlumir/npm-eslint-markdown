<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a consistent style for inline code by disallowing extra spaces or tabs immediately inside backticks.

A single leading and trailing space is allowed by the CommonMark specification (for example, `` `backticks` `` can be written as ```` `` `backticks` `` ````).

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

```md eslint-check
<!-- eslint md/consistent-inline-code-style: 'error' -->

` some text`

`some text `

`   some text   `

`\tsome text\t`
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

```md eslint-check
<!-- eslint md/consistent-inline-code-style: 'error' -->

`some text`

` code `

`` `backticks` ``
```

## Fix

This rule can automatically remove extra spaces and tabs next to the opening and closing backticks.

## Prior Art

- [`MD038` - Spaces inside code span elements](https://github.com/DavidAnson/markdownlint/blob/main/doc/md038.md#md038---spaces-inside-code-span-elements)
