<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Consecutive punctuation in prose is usually a typo. It often slips through review because the sentence is still readable at a glance, but it makes Markdown sources look noisy and inconsistent. This rule helps catch those accidental punctuation pairs in text.

It reports cases where exactly two of the following punctuation marks appear in a row:

```txt
! , . : ; ?
```

For example, `!!`, `?!`, `..`, `::`, `??`, and `;:` are reported, whereas `...`, `!!!`, `?!?`, and `,.;` are not.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-double-punctuation: 'error' -->

This usually means a typo!.
Did you mean this?!
Maybe this..
Wait,. what about this?
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-double-punctuation: 'error' -->

This is fine.
Is this correct?
Wait...
Amazing!!!
```

#### With `{ allow: ['!!', '?!'] }` Option

```md eslint-check
<!-- eslint md/no-double-punctuation: ['error', { allow: ['!!', '?!'] }] -->

Really!!
Are you sure?!
```

## Options

```js
'md/no-double-punctuation': ['error', {
  allow: [],
}]
```

### `allow`

> Type: `string[]` / Default: `[]`

When `allow` is specified, the listed two-character punctuation patterns are ignored by this rule. This is useful when punctuation such as `!!` or `?!` is intentionally used for tone or emphasis instead of being treated as a typo.

## Fix

This rule provides a fix when two punctuation marks are the same by replacing the pair with a single punctuation mark. For example, `!!` is fixed to `!`, and `..` is fixed to `.`.

## Suggestion

This rule provides suggestions when the two punctuation marks are different. You can replace the pair with either the left punctuation mark or the right punctuation mark. For example, `?!` can be replaced with `?` or `!`.

## Prior Art

- [`remark-lint-no-repeat-punctuation`](https://github.com/laysent/remark-lint-plugins/tree/HEAD/packages/remark-lint-no-repeat-punctuation#remark-lint-no-repeat-punctuation)
