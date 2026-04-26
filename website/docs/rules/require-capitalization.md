<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces the use of capital letters at the beginning of sentences in Markdown documents. Maintaining consistent capitalization improves document readability and professionalism.

The rule checks the first text node in paragraphs, headings, blockquotes, footnote definitions, list items, and table cells (depending on configuration) to ensure proper capitalization. When the checked text begins with a lowercase letter, the rule flags it as a violation and can automatically fix the issue by converting that letter to uppercase.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/require-capitalization: 'error' -->

hello world!

# hello world!

> hello world!

[^note]: footnote text

- hello world!

| heading |
| ------- |
| cell    |
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/require-capitalization: 'error' -->

Hello world!

# Hello world!

> Hello world!

[^note]: Footnote text

- Hello world!

| Heading |
| ------- |
| Cell    |
```

#### With `{ skipHeading: true, skipListItem: true }` Option

```md eslint-check
<!-- eslint md/require-capitalization: ['error', { skipHeading: true, skipListItem: true }] -->

# hello world!

- hello world!
```

## Options

```js
'md/require-capitalization': ['error', {
  skipBlockquote: false,
  skipFootnoteDefinition: false,
  skipHeading: false,
  skipListItem: false,
  skipParagraph: false,
  skipTableCell: false,
}]
```

### `skipBlockquote`

> Type: `boolean` / Default: `false`

When set to `true`, paragraphs that are direct children of blockquotes are not checked for capitalization.

### `skipFootnoteDefinition`

> Type: `boolean` / Default: `false`

When set to `true`, GFM footnote definitions are not checked for capitalization.

### `skipHeading`

> Type: `boolean` / Default: `false`

When set to `true`, headings are not checked for capitalization. This is useful for documentation styles that intentionally use lowercase headings or for code-like headings.

### `skipListItem`

> Type: `boolean` / Default: `false`

When set to `true`, paragraphs in list items are not checked for capitalization. This is helpful for lists that might contain sentence fragments or code examples.

### `skipParagraph`

> Type: `boolean` / Default: `false`

When set to `true`, regular paragraphs are not checked for capitalization. This does not skip headings, blockquote paragraphs, footnote definitions, list item paragraphs, or table cells.

### `skipTableCell`

> Type: `boolean` / Default: `false`

When set to `true`, GFM table cells are not checked for capitalization.

## Fix

This rule fixes the reported lowercase letter by replacing it with its uppercase form.

## When Not To Use It

You might want to disable this rule if:

- You're working with a documentation style guide that permits or requires lowercase at the beginning of sentences.
- Your document contains many code examples or technical terms that conventionally start with lowercase.
- You're writing in a language other than English or a language that doesn't follow the same capitalization rules.

## Prior Art

- [`capitalized-comments`](https://eslint.org/docs/latest/rules/capitalized-comments)
