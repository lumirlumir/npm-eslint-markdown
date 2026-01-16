---
description: "Installation instructions for `eslint-markdown` npm package with support for local installs using npm, pnpm, yarn, and bun."
---

# Installation {#installation}

## Prerequisites

- Node.js: `^20.19.0 || ^22.13.0 || >=24.0.0`
- ESLint: `^9.31.0 || ^10.0.0-rc.0` & Flat Config Only
- Module Support: ECMAScript Modules (ESM) Only

::: tip NOTE

- In line with the [ESLint v10 prerequisites](https://github.com/eslint/eslint?tab=readme-ov-file#installation-and-usage), we support only Node.js versions `^20.19.0 || ^22.13.0 || >=24.0.0`.
- There is a type compatibility issue in older ESLint v9 versions, the minimum required ESLint version is `^9.31.0`.

:::

## Installation (`@latest`)

[![npm package eslint-markdown latest version](https://img.shields.io/npm/v/eslint-markdown?label=eslint-markdown@latest&color=6358d4&labelColor=333333&logo=npm)](https://www.npmjs.com/package/eslint-markdown)

> Latest stable release.

::: code-group

```sh [npm]
$ npm install -D eslint-markdown@latest eslint@latest
```

```sh [pnpm]
$ pnpm add -D eslint-markdown@latest eslint@latest
```

```sh [yarn]
$ yarn add --dev eslint-markdown@latest eslint@latest
```

```sh [bun]
$ bun add -d eslint-markdown@latest eslint@latest
```

:::

## Installation (`@next`)

[![npm package eslint-markdown next version](https://img.shields.io/npm/v/eslint-markdown/next?label=eslint-markdown@next&color=6358d4&labelColor=333333&logo=npm)](https://www.npmjs.com/package/eslint-markdown)

> Latest pre-release version. (e.g., `canary`, `alpha`, `beta`, and `rc`)

::: code-group

```sh [npm]
$ npm install -D eslint-markdown@next eslint@latest
```

```sh [pnpm]
$ pnpm add -D eslint-markdown@next eslint@latest
```

```sh [yarn]
$ yarn add --dev eslint-markdown@next eslint@latest
```

```sh [bun]
$ bun add -d eslint-markdown@next eslint@latest
```

:::
