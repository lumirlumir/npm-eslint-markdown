<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

The purpose of this rule is to keep authoring sources restricted to plain ASCII quotes (`"` and `'`) while still allowing a downstream rendering layer (e.g. a Markdown processor with a typographic / "smart quotes" feature such as the Typographer extension of [Goldmark](https://github.com/yuin/goldmark#readme) or [SmartyPants](https://daringfireball.net/projects/smartypants/)) to convert them into curly (typographic) quotes for presentation if desired.

Curly quotes (`“` `\u201C`, `”` `\u201D`, `‘` `\u2018`, `’` `\u2019`) are frequently and unintentionally introduced through copy-and-paste from word processors (Word, Google Docs, Pages) or rich-text/WYSIWYG editors, as well as AI-generated text (e.g. large language model outputs) which often emits curly quotes by default.

In source form-especially with non-monospaced fonts-these characters can be visually subtle, making it harder to notice accidental inconsistencies and increasing the risk of errors in code examples, configuration snippets, or markup fragments.

By applying this rule, you can prevent unintended curly quotes and keep your code clean and consistent.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-curly-quote: 'error' -->

“foo bar”
‘foo bar’
“foo ‘bar baz’ qux”
```

#### With `{ checkLeftDoubleQuotationMark: false }` Option

```md eslint-check
<!-- eslint md/no-curly-quote: ['error', { checkLeftDoubleQuotationMark: false }] -->

“foo bar”
‘foo bar’
“foo ‘bar baz’ qux”
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-curly-quote: 'error' -->

"foo bar"
'foo bar'
"foo 'bar baz' qux"
```

## Options

```js
'md/no-curly-quote': ['error', {
  checkLeftDoubleQuotationMark: true,
  checkRightDoubleQuotationMark: true,
  checkLeftSingleQuotationMark: true,
  checkRightSingleQuotationMark: true,
}]
```

### `checkLeftDoubleQuotationMark`

> Type: `boolean` / Default: `true`

When `checkLeftDoubleQuotationMark` is set to `false`, this rule will not check for the left double quotation mark (`“`).

### `checkRightDoubleQuotationMark`

> Type: `boolean` / Default: `true`

When `checkRightDoubleQuotationMark` is set to `false`, this rule will not check for the right double quotation mark (`”`).

### `checkLeftSingleQuotationMark`

> Type: `boolean` / Default: `true`

When `checkLeftSingleQuotationMark` is set to `false`, this rule will not check for the left single quotation mark (`‘`).

### `checkRightSingleQuotationMark`

> Type: `boolean` / Default: `true`

When `checkRightSingleQuotationMark` is set to `false`, this rule will not check for the right single quotation mark (`’`).

## Fix

This rule fixes the curly quotes by replacing them with straight quotes.

## Prior Art

- [`textlint-rule-no-curly-quotes`](https://github.com/aborazmeh/textlint-rule-no-curly-quotes#readme)
