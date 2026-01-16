<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule is aimed at identifying and preventing the use of irregular dash characters in Markdown documents. Irregular dashes can cause issues with Markdown parsers, create inconsistencies in document formatting, and lead to potential rendering problems across different platforms.

In particular, when irregular dash characters are used in place of the standard ASCII hyphen-minus (`-`, `\u002D`), especially in syntactically meaningful contexts like **list items** or **horizontal rules**, they can lead to rendering errors or formatting inconsistencies.

The rule helps ensure that only standard ASCII hyphen-minus characters (`-`, `\u002D`) are used instead of their Unicode lookalikes, which improves document consistency and prevents potential parsing problems.

This rule disallows the following characters except where the options allow:

```txt
\u2010 - Hyphen - <HYPH>
\u2011 - Non-Breaking Hyphen - <NBHY>
\u2012 - Figure Dash - <FIGDASH>
\u2013 - En Dash - <ENDASH>
\u2014 - Em Dash - <EMDASH>
\u2015 - Horizontal Bar - <HYPHBAR>
\u2043 - Hyphen Bullet - <HYPHBUL>
\u2212 - Minus Sign - <MINUS>
\u23AF - Horizontal Line Extension - <HLINE>
\u2E3A - Two Em Dash - <2EMDASH>
\u2E3B - Three Em Dash - <3EMDASH>
\u30FC - Katakana-Hiragana Prolonged Sound Mark - <KHPROLSND>
\uFE58 - Small Em Dash - <SMEMDASH>
\uFE63 - Small Hyphen Minus - <SMHYPMINUS>
\uFF0D - Fullwidth Hyphen-Minus - <FWHYPHMNUS>
```

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-irregular-dash: 'error' -->

\u2010 - Hyphen - <HYPH> ‐ <= Here
\u2011 - Non-Breaking Hyphen - <NBHY> ‑ <= Here
\u2012 - Figure Dash - <FIGDASH> ‒ <= Here
\u2013 - En Dash - <ENDASH> – <= Here
\u2014 - Em Dash - <EMDASH> — <= Here
\u2015 - Horizontal Bar - <HYPHBAR> ― <= Here
\u2043 - Hyphen Bullet - <HYPHBUL> ⁃ <= Here
\u2212 - Minus Sign - <MINUS> − <= Here
\u23AF - Horizontal Line Extension - <HLINE> ⎯ <= Here
\u2E3A - Two Em Dash - <2EMDASH> ⸺ <= Here
\u2E3B - Three Em Dash - <3EMDASH> ⸻ <= Here
\u30FC - Katakana-Hiragana Prolonged Sound Mark - <KHPROLSND> ー <= Here
\uFE58 - Small Em Dash - <SMEMDASH> ﹘ <= Here
\uFE63 - Small Hyphen Minus - <SMHYPMINUS> ﹣ <= Here
\uFF0D - Fullwidth Hyphen-Minus - <FWHYPHMNUS> － <= Here
```

#### With `{ skipCode: false }` Option

`````md eslint-check
<!-- eslint md/no-irregular-dash: ['error', { skipCode: false }] -->

```md
\u2010 - Hyphen - <HYPH> ‐ <= Here
\u2011 - Non-Breaking Hyphen - <NBHY> ‑ <= Here
```

````md
\u2012 - Figure Dash - <FIGDASH> ‒ <= Here
\u2013 - En Dash - <ENDASH> – <= Here
````

~~~txt
\u2014 - Em Dash - <EMDASH> — <= Here
\u2015 - Horizontal Bar - <HYPHBAR> ― <= Here
~~~

    \u2043 - Hyphen Bullet - <HYPHBUL> ⁃ <= Here
    \u2212 - Minus Sign - <MINUS> − <= Here
`````

#### With `{ skipCode: ['js', 'ts'] }` Option

````md eslint-check
<!-- eslint md/no-irregular-dash: ['error', { skipCode: ['js', 'ts'] }] -->

```md
\u2010 - Hyphen - <HYPH> ‐ <= Here
\u2011 - Non-Breaking Hyphen - <NBHY> ‑ <= Here
```

```txt
\u2012 - Figure Dash - <FIGDASH> ‒ <= Here
\u2013 - En Dash - <ENDASH> – <= Here
```

    \u2043 - Hyphen Bullet - <HYPHBUL> ⁃ <= Here
    \u2212 - Minus Sign - <MINUS> − <= Here
````

#### With `{ skipInlineCode: false }` Option

```md eslint-check
<!-- eslint md/no-irregular-dash: ['error', { skipInlineCode: false }] -->

\u2010 - Hyphen - <HYPH> `‐` <= Here
\u2011 - Non-Breaking Hyphen - <NBHY> `‑` <= Here
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-irregular-dash: 'error' -->

\u002D - Hyphen Minus - <HYPHMNUS> - <= Here
```

#### With `{ allow: ['\u2013', '\u2014'] }` Option

```md eslint-check
<!-- eslint md/no-irregular-dash: ['error', { allow: ['\u2013', '\u2014'] }] -->

\u2013 - En Dash - <ENDASH> – <= Here
\u2014 - Em Dash - <EMDASH> — <= Here
```

#### With `{ skipCode: true }` Option

`````md eslint-check
<!-- eslint md/no-irregular-dash: ['error', { skipCode: true }] -->

```md
\u2010 - Hyphen - <HYPH> ‐ <= Here
\u2011 - Non-Breaking Hyphen - <NBHY> ‑ <= Here
```

````md
\u2012 - Figure Dash - <FIGDASH> ‒ <= Here
\u2013 - En Dash - <ENDASH> – <= Here
````

~~~txt
\u2014 - Em Dash - <EMDASH> — <= Here
\u2015 - Horizontal Bar - <HYPHBAR> ― <= Here
~~~

    \u2043 - Hyphen Bullet - <HYPHBUL> ⁃ <= Here
    \u2212 - Minus Sign - <MINUS> − <= Here
`````

#### With `{ skipCode: ['md', 'txt'] }` Option

````md eslint-check
<!-- eslint md/no-irregular-dash: ['error', { skipCode: ['md', 'txt'] }] -->

```md
\u2010 - Hyphen - <HYPH> ‐ <= Here
\u2011 - Non-Breaking Hyphen - <NBHY> ‑ <= Here
```

```txt
\u2012 - Figure Dash - <FIGDASH> ‒ <= Here
\u2013 - En Dash - <ENDASH> – <= Here
```
````

#### With `{ skipInlineCode: true }` Option

```md eslint-check
<!-- eslint md/no-irregular-dash: ['error', { skipInlineCode: true }] -->

\u2010 - Hyphen - <HYPH> `‐` <= Here
\u2011 - Non-Breaking Hyphen - <NBHY> `‑` <= Here
```

## Options

```js
'md/no-irregular-dash': ['error', {
  allow: [],
  skipCode: true,
  skipInlineCode: true,
}]
```

### `allow`

> Type: `string[]` / Default: `[]`

When specified, specific irregular dash characters are allowed if they match one of the characters in this array. This is useful for ignoring certain irregular dashes that are intentionally used in the document.

### `skipCode`

> Type: `boolean | string[]` / Default: `true`

`true` allows irregular dashes in all code blocks, while `string[]` allows irregular dashes only in code blocks for the specified languages.

### `skipInlineCode`

> Type: `boolean` / Default: `true`

`true` allows irregular dashes in all inline code.

## When Not To Use It

If you deliberately want to use typographically correct dash characters in your Markdown documents, such as em dashes for parenthetical statements or en dashes for ranges, you may want to disable this rule.
