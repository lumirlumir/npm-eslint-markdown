<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows more than a configured number of consecutive blank lines in Markdown files. Except in a code block, blank lines serve no purpose and do not affect the rendering of content. Consistent blank line usage makes documents easier to scan and avoids accidental large gaps between sections, paragraphs, and list content.

For this rule, a blank line is a line that contains no characters, or contains only spaces and tabs. By default, the rule allows one consecutive blank line and ignores consecutive blank lines inside code blocks.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-consecutive-blank-line: 'error' -->

foo


bar
```

#### With `{ max: 2 }` Option

```md eslint-check
<!-- eslint md/no-consecutive-blank-line: ['error', { max: 2 }] -->

foo



bar
```

#### With `{ skipCode: false }` Option

````md eslint-check
<!-- eslint md/no-consecutive-blank-line: ['error', { skipCode: false }] -->

```js
foo


bar
```
````

#### With `{ skipCode: ['js', 'ts'] }` Option

````md eslint-check
<!-- eslint md/no-consecutive-blank-line: ['error', { skipCode: ['js', 'ts'] }] -->

```md
foo


bar
```

```
foo


bar
```
````

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

```md eslint-check
<!-- eslint md/no-consecutive-blank-line: 'error' -->

foo

bar
```

````md eslint-check
<!-- eslint md/no-consecutive-blank-line: 'error' -->

```js
foo


bar
```
````

#### With `{ max: 2 }` Option

```md eslint-check
<!-- eslint md/no-consecutive-blank-line: ['error', { max: 2 }] -->

foo


bar
```

#### With `{ skipCode: true }` Option

````md eslint-check
<!-- eslint md/no-consecutive-blank-line: ['error', { skipCode: true }] -->

```md
foo


bar
```

```
foo


bar
```
````

#### With `{ skipCode: ['md', 'txt'] }` Option

````md eslint-check
<!-- eslint md/no-consecutive-blank-line: ['error', { skipCode: ['md', 'txt'] }] -->

```md
foo


bar
```

```txt
baz


qux
```
````

## Options

```js
'md/no-consecutive-blank-line': ['error', {
  max: 1,
  skipCode: true,
}]
```

### `max`

> Type: `number` / Default: `1`

Set the maximum number of consecutive blank lines to allow.

This value must be an integer greater than or equal to `1`.

### `skipCode`

> Type: `boolean | string[]` / Default: `true`

`true` allows consecutive blank lines in all code blocks, while `string[]` allows consecutive blank lines only in code blocks for the specified languages.

## Fix

This rule fixes consecutive blank lines by removing blank lines beyond the configured `max` value.

## Further Reading

- [CommonMark Spec: Blank Line](https://spec.commonmark.org/0.31.2/#blank-line)

## Prior Art

- [`MD012` - Multiple consecutive blank lines](https://github.com/DavidAnson/markdownlint/blob/main/doc/md012.md#md012---multiple-consecutive-blank-lines)
- [`remark-lint-no-consecutive-blank-lines`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-consecutive-blank-lines#remark-lint-no-consecutive-blank-lines)
