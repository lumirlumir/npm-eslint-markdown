<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Irregular whitespace can cause issues with Markdown renderers and also makes Markdown documents harder to debug in a similar nature to mixed tabs and spaces.

Various whitespace characters can be introduced accidentally, for example, when copying text or using keyboard shortcuts; on macOS, pressing Alt + Space inserts a non-breaking space. AI-generated Markdown documents also often contain irregular whitespace characters.

A simple fix for this problem could be to rewrite the offending line from scratch. This might also be a problem introduced by the text editor: if rewriting the line does not fix it, try using a different editor.

In Markdown, irregular whitespace may cause:

- Headings not to be recognized (e.g., a non-breaking space between `#` and the heading text).
- Lists or task lists to fail to parse due to non-standard spaces before `-`, `*`, `+`, or digits.
- Code fences or indented code blocks to break because indentation uses irregular spaces instead of normal spaces or tabs.
- Links and images to break when zero-width or non-breaking spaces are embedded in URLs or reference labels.
- Table alignment to render incorrectly when pipes `|` are surrounded by irregular whitespace.
- Front matter delimiters (`---`) or HTML blocks to be misparsed if invisible characters are mixed into delimiter lines.
- Line Separator (U+2028) and Paragraph Separator (U+2029): Since many Markdown parsers expect `\r\n`, `\r`, or `\n`, these characters may not be recognized as line breaks, causing merged paragraphs, broken lists, or unclosed code fences.

This rule aims to catch irregular whitespace other than normal tabs and spaces, and disallows the following characters except where permitted by the options:

```txt
\u000B - Line Tabulation (\v) - <VT>
\u000C - Form Feed (\f) - <FF>
\u0085 - Next Line - <NEL>
\u00A0 - No-Break Space - <NBSP>
\u1680 - Ogham Space Mark - <OGSP>
\u180E - Mongolian Vowel Separator - <MVS>
\u2000 - En Quad - <NQSP>
\u2001 - Em Quad - <MQSP>
\u2002 - En Space - <ENSP>
\u2003 - Em Space - <EMSP>
\u2004 - Three-Per-Em - <THPMSP> - <3/MSP>
\u2005 - Four-Per-Em - <FPMSP> - <4/MSP>
\u2006 - Six-Per-Em - <SPMSP> - <6/MSP>
\u2007 - Figure Space - <FSP>
\u2008 - Punctuation Space - <PUNCSP>
\u2009 - Thin Space - <THSP>
\u200A - Hair Space - <HSP>
\u200B - Zero Width Space - <ZWSP>
\u2028 - Line Separator - <LS> - <LSEP>
\u2029 - Paragraph Separator - <PS> - <PSEP>
\u202F - Narrow No-Break Space - <NNBSP>
\u205F - Medium Mathematical Space - <MMSP>
\u3000 - Ideographic Space - <IDSP>
\uFEFF - Zero Width No-Break Space - <BOM>
```

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-irregular-whitespace: 'error' -->

\u000B - Line Tabulation (\v) - <VT>  <= Here
\u0085 - Next Line - <NEL>  <= Here
\u1680 - Ogham Space Mark - <OGSP>   <= Here
\u2000 - En Quad - <NQSP>   <= Here
\u2001 - Em Quad - <MQSP>   <= Here
\u2002 - En Space - <ENSP>   <= Here
\u2003 - Em Space - <EMSP>   <= Here
\u2004 - Three-Per-Em - <THPMSP> - <3/MSP>   <= Here
\u2005 - Four-Per-Em - <FPMSP> - <4/MSP>  <= Here
\u2006 - Six-Per-Em - <SPMSP> - <6/MSP>   <= Here
\u2007 - Figure Space - <FSP>   <= Here
\u2008 - Punctuation Space - <PUNCSP>   <= Here
\u2009 - Thin Space - <THSP>   <= Here
\u200A - Hair Space - <HSP>   <= Here
\u2028 - Line Separator - <LS> - <LSEP>   <= Here
\u2029 - Paragraph Separator - <PS> - <PSEP>   <= Here
\u202F - Narrow No-Break Space - <NNBSP>   <= Here
\u205F - Medium Mathematical Space - <MMSP>   <= Here
\u3000 - Ideographic Space - <IDSP> 　 <= Here
```

#### With `{ skipCode: false }` Option

`````md eslint-check
<!-- eslint md/no-irregular-whitespace: ['error', { skipCode: false }] -->

```md
\u000B - Line Tabulation (\v) - <VT>  <= Here
\u0085 - Next Line - <NEL>  <= Here
```

````md
\u1680 - Ogham Space Mark - <OGSP>   <= Here
\u2000 - En Quad - <NQSP>   <= Here
````

~~~txt
\u2001 - Em Quad - <MQSP>   <= Here
\u2002 - En Space - <ENSP>   <= Here
~~~

    \u2003 - Em Space - <EMSP>   <= Here
    \u2004 - Three-Per-Em - <THPMSP> - <3/MSP>   <= Here
`````

<!-- TODO -->

#### With `{ skipInlineCode: false }` Option

```md eslint-check
<!-- eslint md/no-irregular-whitespace: ['error', { skipInlineCode: false }] -->

\u000B - Line Tabulation (\v) - <VT> `` <= Here
\u0085 - Next Line - <NEL> `` <= Here
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

<!-- markdownlint-disable no-hard-tabs -->

```md eslint-check
<!-- eslint md/no-irregular-whitespace: 'error' -->

\u0009 - Horizontal Tab (\t) - <TAB> 	 <= Here
\u0020 - Space - <SP>   <= Here
```

<!-- markdownlint-enable no-hard-tabs -->

#### With `{ allow: ['\u1680', '\u2000'] }` Option

```md eslint-check
<!-- eslint md/no-irregular-whitespace: ['error', { allow: ['\u1680', '\u2000'] }] -->

\u1680 - Ogham Space Mark - <OGSP>   <= Here
\u2000 - En Quad - <NQSP>   <= Here
```

#### With `{ skipCode: true }` Option

`````md eslint-check
<!-- eslint md/no-irregular-whitespace: ['error', { skipCode: true }] -->

```md
\u000B - Line Tabulation (\v) - <VT>  <= Here
\u0085 - Next Line - <NEL>  <= Here
```

````md
\u1680 - Ogham Space Mark - <OGSP>   <= Here
\u2000 - En Quad - <NQSP>   <= Here
````

~~~txt
\u2001 - Em Quad - <MQSP>   <= Here
\u2002 - En Space - <ENSP>   <= Here
~~~

    \u2003 - Em Space - <EMSP>   <= Here
    \u2004 - Three-Per-Em - <THPMSP> - <3/MSP>   <= Here
`````

#### With `{ skipInlineCode: true }` Option

```md eslint-check
<!-- eslint md/no-irregular-whitespace: ['error', { skipInlineCode: true }] -->

\u000B - Line Tabulation (\v) - <VT> `` <= Here
\u0085 - Next Line - <NEL> `` <= Here
```

## Options

```js
'md/no-irregular-whitespace': ['error', {
  allow: [],
  skipCode: true,
  skipInlineCode: true,
}]
```

### `allow`

> Type: `string[]` / Default: `[]`

When specified, specific irregular whitespaces are allowed if they match one of the characters in this array. This is useful for ignoring certain irregular whitespaces that are intentionally used in the document.

### `skipCode`

> Type: `boolean` / Default: `true`

`true` allows irregular whitespaces in all code blocks.

### `skipInlineCode`

> Type: `boolean` / Default: `true`

`true` allows irregular whitespaces in all inline code.

## When Not To Use It

If you decide that you wish to use whitespace other than tabs and spaces outside of strings in your document.

## Prior Art

- [`no-irregular-whitespace`](https://eslint.org/docs/latest/rules/no-irregular-whitespace)
- [`textlint-rule-no-zero-width-spaces`](https://github.com/textlint-rule/textlint-rule-no-zero-width-spaces)
