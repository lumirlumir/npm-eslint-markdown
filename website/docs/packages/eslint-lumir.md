---
description: "Package documentation for the `eslint-lumir` package."
---

# `eslint-lumir`

> TODO

`eslint-lumir` provides the foundation for ESLint tooling maintained by lumir. The initial package scaffold exposes metadata and is ready for additional ESLint functionality.

## Usage

The default export provides the package metadata. The same value is also available as a named export.

```js
import eslintLumir, { meta } from 'eslint-lumir';

eslintLumir.meta === meta;
```

## Exports

| Name      | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | Package object containing `meta`.                     |
| `meta`    | Object containing the package `name` and `version`.   |
