<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Shell examples often add `$` before commands. This looks like a prompt but makes copied commands harder to run.

This rule reports `$` only when each non-blank line is a command or a continued line. It reports nothing if the block also has output or other text.

A command may start with spaces or tabs. It must then have `$` followed by at least one space or tab. Therefore, `$npm install` and a bare `$` do not match.

An odd number of backslashes at the end of a line continues the command. The next line is part of the command and has no prompt to report. A blank line ends the continuation.

The rule checks fenced and indented code blocks in every language. Set [`skipCode`](#skipcode) to exclude languages.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

````md eslint-check
<!-- eslint md/no-shell-dollar: 'error' -->

```sh
$ npm install
```

```sh
$ npm install
$ npm run build
```

```
$ ls
```

    $ ls

```sh
$ npm install \
    --save-dev eslint
```
````

#### With `{ skipCode: ['console'] }` Option

````md eslint-check
<!-- eslint md/no-shell-dollar: ['error', { skipCode: ['console'] }] -->

```sh
$ npm install
```
````

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

````md eslint-check
<!-- eslint md/no-shell-dollar: 'error' -->

```sh
npm install
npm run build
```

```sh
$ npm --version
10.9.2
```

```sh
$npm install
```

```sh
echo $PATH
```

```sh
$ npm install \
    --save-dev eslint
added 1 package
```
````

#### With `{ skipCode: ['console'] }` Option

````md eslint-check
<!-- eslint md/no-shell-dollar: ['error', { skipCode: ['console'] }] -->

```console
$ npm install
```
````

## Options

```js
'md/no-shell-dollar': ['error', {
  skipCode: [],
}]
```

### `skipCode`

> Type: `string[]` / Default: `[]`

Use this array to skip code blocks by language. Matching is case-sensitive: `sh` and `SH` differ.

For example, allow prompts in terminal sessions:

```js
'md/no-shell-dollar': ['error', {
  skipCode: ['console'],
}]
```

This option cannot skip indented code blocks or fenced code blocks without a language.

## Fix

This rule removes the dollar sign and the whitespace that follows it, leaving the indentation of the line untouched.

## Prior Art

### Differences from MD014

Unlike MD014, this rule recognizes commands continued with a backslash. It reports the `$` in this block. MD014 leaves the block unchanged because the second line has no prompt:

````md
```sh
$ npm install \
    --save-dev eslint
```
````

### References

- [`MD014` - Dollar signs used before commands without showing output](https://github.com/DavidAnson/markdownlint/blob/main/doc/md014.md#md014---dollar-signs-used-before-commands-without-showing-output)
- [`remark-lint-no-shell-dollars`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-shell-dollars#remark-lint-no-shell-dollars)
