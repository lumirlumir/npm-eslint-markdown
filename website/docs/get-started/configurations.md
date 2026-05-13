# Shared Configurations

[ESLint shareable configurations](https://eslint.org/docs/latest/extend/shareable-configs) exist to provide a comprehensive list of rules settings that you can start with. [`eslint-markdown`](https://github.com/lumirlumir/npm-eslint-markdown) includes built-in configurations you can extend from to pull in the recommended starting rules.

::: warning Stability of Configurations

With the exception of [`all`](#all), every configuration is considered "stable". Rule additions and removals are treated as ***breaking changes*** and will only be done in major version bumps.

:::

::: danger Active `0.x` Development Notice

`eslint-markdown` is currently in active `0.x` development, so minor releases may include [***Breaking Changes***](versioning.md#major-release-breaking-changes) until it reaches `1.0.0`.

:::

---

[[TOC]]

## Configuration File

Create an [`eslint.config.{js,mjs,cjs,ts,mts,cts}`](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file) configuration file in the root of your project, and populate it with the following:

::: tip When to use Extends vs Cascading

You can find more details about it in the [ESLint documentation](https://eslint.org/docs/latest/use/configure/configuration-files#when-to-use-extends-vs-cascading).

:::

### With ESLint Built-in Markdown Support [`@eslint/markdown`](https://github.com/eslint/markdown#readme)

This [`eslint-markdown`](https://github.com/lumirlumir/npm-eslint-markdown#readme) plugin does not include any rules that overlap with ESLint's built-in Markdown rules provided by [`@eslint/markdown`](https://github.com/eslint/markdown#readme).

So, we **highly recommend** using the `eslint-markdown` plugin alongside ESLint's built-in Markdown support, `@eslint/markdown`.

#### Extends Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import markdown from '@eslint/markdown';
import md from 'eslint-markdown'; // [!code ++]

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
      md, // [!code ++]
    },
    extends: [
      'markdown/recommended',
      'md/recommended', // [!code ++]
    ],
  },
  // ...
  // You can add more configurations here.
  // ...
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const markdown = require('@eslint/markdown');
const md = require('eslint-markdown'); // [!code ++]

module.exports = defineConfig([
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
      md, // [!code ++]
    },
    extends: [
      'markdown/recommended',
      'md/recommended', // [!code ++]
    ],
  },
  // ...
  // You can add more configurations here.
  // ...
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import markdown from '@eslint/markdown';
import md from 'eslint-markdown'; // [!code ++]

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
      md, // [!code ++]
    },
    extends: [
      'markdown/recommended',
      'md/recommended', // [!code ++]
    ],
  },
  // ...
  // You can add more configurations here.
  // ...
]);
```

:::

#### Cascading Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import markdown from '@eslint/markdown';
import md from 'eslint-markdown'; // [!code ++]

export default defineConfig([
  markdown.configs.recommended,
  md.configs.recommended, // [!code ++]
  // ...
  // You can add more configurations here.
  // ...
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const markdown = require('@eslint/markdown');
const md = require('eslint-markdown'); // [!code ++]

module.exports = defineConfig([
  markdown.configs.recommended,
  md.configs.recommended, // [!code ++]
  // ...
  // You can add more configurations here.
  // ...
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import markdown from '@eslint/markdown';
import md from 'eslint-markdown'; // [!code ++]

export default defineConfig([
  markdown.configs.recommended,
  md.configs.recommended, // [!code ++]
  // ...
  // You can add more configurations here.
  // ...
]);
```

:::

### Without ESLint Built-in Markdown Support

However, if you prefer not to use ESLint's built-in Markdown support, you can still use the `eslint-markdown` plugin on its own.

#### Extends Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown'; // [!code ++]

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md }, // [!code ++]
    extends: ['md/recommended'], // [!code ++]
  },
  // ...
  // You can add more configurations here.
  // ...
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const md = require('eslint-markdown'); // [!code ++]

module.exports = defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md }, // [!code ++]
    extends: ['md/recommended'], // [!code ++]
  },
  // ...
  // You can add more configurations here.
  // ...
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown'; // [!code ++]

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md }, // [!code ++]
    extends: ['md/recommended'], // [!code ++]
  },
  // ...
  // You can add more configurations here.
  // ...
]);
```

:::

#### Cascading Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown'; // [!code ++]

export default defineConfig([
  md.configs.recommended, // [!code ++]
  // ...
  // You can add more configurations here.
  // ...
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const md = require('eslint-markdown'); // [!code ++]

module.exports = defineConfig([
  md.configs.recommended, // [!code ++]
  // ...
  // You can add more configurations here.
  // ...
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown'; // [!code ++]

export default defineConfig([
  md.configs.recommended, // [!code ++]
  // ...
  // You can add more configurations here.
  // ...
]);
```

:::

## Configurations

### `recommended`

> See the [source code for the `recommended` configuration](https://github.com/lumirlumir/npm-eslint-markdown/blob/main/packages/eslint-markdown/src/configs/recommended.js) for the exact contents.

Recommended rules for documentation correctness that can be used without additional configuration. These rules typically report issues that represent bad practices and/or likely bugs.

::: tip NOTE

`recommended` configuration does not include any rules that overlap with [`stylistic`](#stylistic) configuration.

:::

#### Extends Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/recommended'],
    rules: {
      'md/no-double-space': 'off', // Example of overriding a rule.
    },
  },
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const md = require('eslint-markdown');

module.exports = defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/recommended'],
    rules: {
      'md/no-double-space': 'off', // Example of overriding a rule.
    },
  },
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/recommended'],
    rules: {
      'md/no-double-space': 'off', // Example of overriding a rule.
    },
  },
]);
```

:::

#### Cascading Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  md.configs.recommended,
  {
    rules: {
      'md/no-double-space': 'off', // Example of overriding a rule.
    },
  },
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const md = require('eslint-markdown');

module.exports = defineConfig([
  md.configs.recommended,
  {
    rules: {
      'md/no-double-space': 'off', // Example of overriding a rule.
    },
  },
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  md.configs.recommended,
  {
    rules: {
      'md/no-double-space': 'off', // Example of overriding a rule.
    },
  },
]);
```

:::

### `stylistic`

> See the [source code for the `stylistic` configuration](https://github.com/lumirlumir/npm-eslint-markdown/blob/main/packages/eslint-markdown/src/configs/stylistic.js) for the exact contents.

Rules considered best practices for modern Markdown documents that do not affect documentation rendering. These rules are generally opinionated and focus on enforcing consistent or simpler patterns.

::: tip NOTE

`stylistic` configuration does not include any rules that overlap with [`recommended`](#recommended) configuration.

:::

#### Extends Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/stylistic'],
    rules: {
      'md/consistent-strong-style': 'off', // Example of overriding a rule.
    },
  },
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const md = require('eslint-markdown');

module.exports = defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/stylistic'],
    rules: {
      'md/consistent-strong-style': 'off', // Example of overriding a rule.
    },
  },
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/stylistic'],
    rules: {
      'md/consistent-strong-style': 'off', // Example of overriding a rule.
    },
  },
]);
```

:::

#### Cascading Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  md.configs.stylistic,
  {
    rules: {
      'md/consistent-strong-style': 'off', // Example of overriding a rule.
    },
  },
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const md = require('eslint-markdown');

module.exports = defineConfig([
  md.configs.stylistic,
  {
    rules: {
      'md/consistent-strong-style': 'off', // Example of overriding a rule.
    },
  },
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  md.configs.stylistic,
  {
    rules: {
      'md/consistent-strong-style': 'off', // Example of overriding a rule.
    },
  },
]);
```

:::

### `base`

> See the [source code for the `base` configuration](https://github.com/lumirlumir/npm-eslint-markdown/blob/main/packages/eslint-markdown/src/configs/base.js) for the exact contents.

A minimal ruleset that defines only the required [language](https://github.com/eslint/markdown?tab=readme-ov-file#languages) and [language options](https://github.com/eslint/markdown?tab=readme-ov-file#language-options) needed to run `eslint-markdown`.

This configuration is useful if you want to build your own custom configuration from the ground up.

#### Extends Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/base'],
    rules: {
      // Example of overriding a rule.
      'md/no-double-space': 'error',
      'md/consistent-strong-style': 'error',
      'md/no-url-trailing-slash': 'warn',
    },
  },
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const md = require('eslint-markdown');

module.exports = defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/base'],
    rules: {
      // Example of overriding a rule.
      'md/no-double-space': 'error',
      'md/consistent-strong-style': 'error',
      'md/no-url-trailing-slash': 'warn',
    },
  },
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/base'],
    rules: {
      // Example of overriding a rule.
      'md/no-double-space': 'error',
      'md/consistent-strong-style': 'error',
      'md/no-url-trailing-slash': 'warn',
    },
  },
]);
```

:::

#### Cascading Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  md.configs.base,
  {
    rules: {
      // Example of overriding a rule.
      'md/no-double-space': 'error',
      'md/consistent-strong-style': 'error',
      'md/no-url-trailing-slash': 'warn',
    },
  },
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const md = require('eslint-markdown');

module.exports = defineConfig([
  md.configs.base,
  {
    rules: {
      // Example of overriding a rule.
      'md/no-double-space': 'error',
      'md/consistent-strong-style': 'error',
      'md/no-url-trailing-slash': 'warn',
    },
  },
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  md.configs.base,
  {
    rules: {
      // Example of overriding a rule.
      'md/no-double-space': 'error',
      'md/consistent-strong-style': 'error',
      'md/no-url-trailing-slash': 'warn',
    },
  },
]);
```

:::

### `all`

> See the [source code for the `all` configuration](https://github.com/lumirlumir/npm-eslint-markdown/blob/main/packages/eslint-markdown/src/configs/all.js) for the exact contents.

Enables all rules provided as a part of `eslint-markdown`. Note that many rules are not applicable in all codebases, or are meant to be configured.

::: danger DANGER

This configuration is not considered "stable" under Semantic Versioning (SemVer). Its enabled rules and/or their options may change outside of major version releases.

:::

::: warning WARNING

We generally do not recommend extending from `'md/all'`, as many of its rules may conflict with one another or require project-specific configuration.

:::

#### Extends Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/all'],
  },
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const md = require('eslint-markdown');

module.exports = defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/all'],
  },
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  {
    files: ['**/*.md'],
    plugins: { md },
    extends: ['md/all'],
  },
]);
```

:::

#### Cascading Style

::: code-group

```js [eslint.config.mjs]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  md.configs.all,
]);
```

```js [eslint.config.cjs]
const { defineConfig } = require('eslint/config');
const md = require('eslint-markdown');

module.exports = defineConfig([
  md.configs.all,
]);
```

```ts [eslint.config.ts]
import { defineConfig } from 'eslint/config';
import md from 'eslint-markdown';

export default defineConfig([
  md.configs.all,
]);
```

:::
