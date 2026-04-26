<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces the use of capital letters at the beginning of sentences in Markdown documents. Maintaining consistent capitalization improves document readability and professionalism.

The rule checks the first letter of text content in paragraphs and headings (depending on configuration) to ensure proper capitalization of sentences. When a sentence begins with a lowercase letter, the rule flags it as a violation and can automatically fix the issue by converting the first letter to uppercase.

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

```md
this sentence starts with a lowercase letter.

a paragraph with multiple sentences. only the first one is checked.
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

```md
This sentence starts with a capital letter.

A paragraph with multiple sentences. This one correctly starts with uppercase.

## this heading is not checked by default due to skipHeading option
```

## Options

```js
'md/require-capitalization': ['error', {
  skipHeading: true,
  skipListItem: true,
}]
```

### `skipHeading`

> Default: `true`

When set to `true`, headings are not checked for capitalization. This is useful for documentation styles that intentionally use lowercase headings or for code-like headings.

### `skipListItem`

> Default: `true`

When set to `true`, paragraphs in list items are not checked for capitalization. This is helpful for lists that might contain sentence fragments or code examples.

## When Not To Use It

You might want to disable this rule if:

- You're working with a documentation style guide that permits or requires lowercase at the beginning of sentences
- Your document contains many code examples or technical terms that conventionally start with lowercase
- You're writing in a language other than English or a language that doesn't follow the same capitalization rules

## Prior Art

- [`capitalized-comments`](https://eslint.org/docs/latest/rules/capitalized-comments)
