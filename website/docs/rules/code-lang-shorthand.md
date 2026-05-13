<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

The purpose of this rule is to enforce the use of shorthand language identifiers in code blocks. Some may want to use abbreviated language identifiers to keep the code blocks concise and consistent.

Using shorthand language identifiers offers several advantages: they improve readability by simplifying code, optimize file size, ensure consistency across code blocks, and make it easier for tools and automation systems to process language identifiers efficiently.

Please note that the code block language identifier detection logic is **case-insensitive**, so `JavaScript`, `javascript`, and `JAVASCRIPT` are all treated as the same language identifier.

You can find the full list of [language identifiers shorthand mapping](https://github.com/lumirlumir/npm-eslint-markdown/blob/main/packages/eslint-markdown/src/rules/code-lang-shorthand.js) in the source code.

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### Default

````md eslint-check
<!-- eslint md/code-lang-shorthand: 'error' -->

```javascript
console.log('Hello, world!');
```

```typescript
console.log('Hello, world!');
```

```TypeScript
console.log('Hello, world!');
```

```TYPESCRIPT
console.log('Hello, world!');
```

```markdown
Hello, world!
```
````

#### With `override: { example: 'ex' }` Option

````md eslint-check
<!-- eslint md/code-lang-shorthand: ['error', { override: { example: 'ex' } }] -->

```example
Welcome to the example language!
```

```Example
Welcome to the example language!
```

```EXAMPLE
Welcome to the example language!
```
````

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

````md eslint-check
<!-- eslint md/code-lang-shorthand: 'error' -->

    Indented code block

```
Fenced code block without lang
```

```js
console.log('Hello, world!');
```

```ts
console.log('Hello, world!');
```

```md
Hello, world!
```
````

#### With `allow: ['javascript', 'typescript']` Option

````md eslint-check
<!-- eslint md/code-lang-shorthand: ['error', { allow: ['javascript', 'typescript'] }] -->

```javascript
console.log('Hello, world!');
```

```typescript
console.log('Hello, world!');
```
````

## Options

```js
'md/code-lang-shorthand': ['error', {
  allow: [],
  override: {},
}]
```

### `allow`

> Type: `string[]` / Default: `[]`

An array of code block language identifiers to allow. Each value must be the full, unabridged language identifier.

The values in this array are **case-insensitive**, since each value is normalized to lowercase when compared with the code block's language identifier.

#### Allowing specific language identifiers

For example, to allow the `javascript` and `typescript` language identifiers:

```js
'md/code-lang-shorthand': ['error', {
  allow: ['javascript', 'typescript'],
}]
```

#### Allowing overridden language identifiers

For example, to allow an overridden `example` language identifier:

```js
'md/code-lang-shorthand': ['error', {
  allow: ['example'],
  override: {
    example: 'ex',
  },
}]
```

### `override`

> Type: `Record<string, string>` / Default: `{}`

An object where the **key** is the full, unabridged language identifier and the **value** is the abbreviated form. Both keys and values are treated case-insensitively and normalized to lowercase, so `override: { EXAMPLE: 'EX' }` is equivalent to `override: { example: 'ex' }` and will produce the abbreviation `ex`.

#### Adding a new abbreviation

For example, to shorten the `example` language identifier to `ex`:

```js
'md/code-lang-shorthand': ['error', {
  override: {
    example: 'ex',
  },
}]
```

#### Overriding an existing abbreviation

For example, to change the default abbreviation for `javascript` to `mjs`:

```js
'md/code-lang-shorthand': ['error', {
  override: {
    javascript: 'mjs',
  },
}]
```

## Fix

This rule converts unabridged code block language identifiers into their abbreviated forms.
