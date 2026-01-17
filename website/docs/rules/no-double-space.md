<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Markdown treats double or multiple consecutive spaces within a sentence as a single space.

Double spaces within a sentence are usually typos and can be hard to spot. This rule helps keep your content clean and consistent.

> [!NOTE]
>
> It only checks for **double or multiple consecutive** spaces *within sentences*. Since **leading** and **trailing** spaces have special meanings in Markdown, it does not check those. **Leading** spaces are used to create code blocks or indentation, while **trailing** spaces are used to create line breaks.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-double-space: 'error' -->

foo  bar  baz
```

#### With `{ checkMultipleSpace: true }` Option

```md eslint-check
<!-- eslint md/no-double-space: ['error', { checkMultipleSpace: true }] -->

foo  bar  baz
foo   bar   baz
foo    bar    baz    qux
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-double-space: 'error' -->

foo bar baz qux

foo   bar    baz     qux
  foo bar
    foo bar

foo bar  <!-- trailing double space⁡ -->

foo bar    <!-- trailing multiple space⁡ -->
```

#### With `{ checkMultipleSpace: true }` Option

```md eslint-check
<!-- eslint md/no-double-space: ['error', { checkMultipleSpace: true }] -->

foo bar baz qux

foo bar baz qux
  foo bar
    foo bar

foo bar  <!-- trailing double space⁡ -->

foo bar    <!-- trailing multiple space⁡ -->
```

## Options

```js
'md/no-double-space': ['error', {
  checkMultipleSpace: false,
}]
```

### `checkMultipleSpace`

> Type: `boolean` / Default: `false`

When `checkMultipleSpace` is set to `true`, this rule will also check for multiple consecutive spaces (more than two) within a sentence.

## Fix

This rule fixes the double or multiple consecutive spaces by replacing them with a single space.

## Prior Art

- [`textlint-rule-doubled-spaces`](https://github.com/iwamatsu0430/textlint-rule-doubled-spaces#readme)
