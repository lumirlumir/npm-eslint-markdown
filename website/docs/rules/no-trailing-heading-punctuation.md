<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows configured punctuation characters at the end of ATX, closed ATX, and Setext headings.

By default, the following punctuation characters are not allowed:

```txt
. , ; : ! 。 ， ； ： ！
```

Question marks (`?` and `？`) are allowed by default.
Valid HTML entities such as `&copy;` and GitHub emoji codes such as `:smile:` are not reported because their final punctuation characters are required by their syntax.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-trailing-heading-punctuation: 'error' -->

# ATX heading.

# Heading !

## Closed ATX heading! ##

Setext heading:
---------------
```

#### With `{ punctuation: '?' }` Option

```md eslint-check
<!-- eslint md/no-trailing-heading-punctuation: ['error', { punctuation: '?' }] -->

# Heading?
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-trailing-heading-punctuation: 'error' -->

# ATX heading

## Closed ATX heading ##

Setext heading
--------------

# Question?

# Copyright &copy;

# Heading :smile:
```

#### With `{ punctuation: '?' }` Option

```md eslint-check
<!-- eslint md/no-trailing-heading-punctuation: ['error', { punctuation: '?' }] -->

# Heading!
```

## Options

```js
'md/no-trailing-heading-punctuation': ['error', {
  punctuation: '.,;:!。，；：！',
}]
```

### `punctuation`

> Type: `string` / Default: `'.,;:!。，；：！'`

Specifies the characters that are not allowed at the end of headings.

The configured string replaces the default punctuation characters. An empty string (`''`) disables punctuation checking.

## Fix

This rule fixes trailing punctuation by removing it and any whitespace immediately before it.

For example, `# Heading !` is fixed to `# Heading`.

## When Not To Use It

If you intentionally use punctuation at the end of headings, you should disable this rule.

## Prior Art

- [`MD026` - Trailing punctuation in heading](https://github.com/DavidAnson/markdownlint/blob/main/doc/md026.md#md026---trailing-punctuation-in-heading)
- [`remark-lint-no-heading-punctuation`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-heading-punctuation#remark-lint-no-heading-punctuation)
