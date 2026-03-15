<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces a single, consistent style for inline code in Markdown files by disallowing extra spaces or tabs next to the opening and closing backticks.

An inline code is defined as text wrapped in backticks. While Markdown allows a single leading and trailing whitespace when needed, this rule ensures that there are no extra spaces or tabs next to the opening and closing backticks, which can reduce readability.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-inline-code-style: 'error' -->

` some text`

`some text `

`   some text   `
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/consistent-inline-code-style: 'error' -->

`some text`
```

A single leading and trailing space is allowed by the CommonMark specification and trimmed by the parser to support code spans that begin or end with a backtick:

```md eslint-check
<!-- eslint md/consistent-inline-code-style: 'error' -->

`` `backticks` ``

`` `backtick ``

`` backtick` ``
```

When single-space padding is present in the input, it will be preserved even if unnecessary:

```md eslint-check
<!-- eslint md/consistent-inline-code-style: 'error' -->

` code `
```

Code spans containing only spaces are allowed by the CommonMark specification and are also preserved:

```md eslint-check
<!-- eslint md/consistent-inline-code-style: 'error' -->

` `

`   `
```

## Options

No options are available for this rule.

## Fix

This rule fixes the inline code by removing extra spaces or tabs next to the opening and closing backticks.

## Prior Art

- [`MD038` - Spaces inside code span elements](https://github.com/DavidAnson/markdownlint/blob/main/doc/md038.md#md038---spaces-inside-code-span-elements)
