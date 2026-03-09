<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule is triggered when a Markdown file does not end with exactly one final newline.

For compatibility with common editor and platform behavior, a single final `LF` or `CRLF` line ending is accepted. When autofixing, the rule preserves the existing trailing line ending style when possible.

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Missing Final Newline

```md eslint-check
<!-- eslint md/single-trailing-newline: 'error' -->

# Heading
This file ends without a newline.
```

#### Multiple Final Newlines

````md eslint-check
<!-- eslint md/single-trailing-newline: 'error' -->

# Heading
This file ends with extra blank lines.

````

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Single Final LF Newline

```md eslint-check
<!-- eslint md/single-trailing-newline: 'error' -->

# Heading
This file ends with a single newline.
```

#### Single Final CRLF Newline

```md
# Heading\r
This file also ends with a single newline.\r
```

## Fix

This rule fixes files by appending a final newline when one is missing, or by collapsing multiple trailing newlines to a single trailing newline.

## When Not To Use It

If your project intentionally omits final newlines, or you prefer a different end-of-file formatting convention, you might choose to disable this rule.

## Prior Art

- [`MD047` - Files should end with a single newline character](https://github.com/DavidAnson/markdownlint/blob/main/doc/md047.md#md047---files-should-end-with-a-single-newline-character)
- [`eol-last`](https://eslint.org/docs/latest/rules/eol-last)
