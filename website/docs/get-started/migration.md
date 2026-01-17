# Migration Guide

This chapter provides guidance for migrating to [`eslint-markdown`](https://github.com/lumirlumir/npm-eslint-markdown) and [`@eslint/markdown`](https://github.com/eslint/markdown) from other Markdown linting tools like [`markdownlint`](https://github.com/DavidAnson/markdownlint), [`remark-lint`](https://github.com/remarkjs/remark-lint#readme), and [`textlint`](https://github.com/textlint/textlint#readme).

| Emoji              | Compatibility        |
| :----------------: | :------------------: |
| :white_check_mark: | Fully Compatible     |
| :warning:          | Partially Compatible |
| :x:                | Not Compatible       |

---

[[TOC]]

## Migrating from [`@eslint/markdown`](https://github.com/eslint/markdown#readme)

This plugin does not include any rules that overlap with ESLint's built-in Markdown rules provided by `@eslint/markdown`. As a result, `eslint-markdown` is completely disjoint from `@eslint/markdown`, and no migration is needed.

If the upstream `@eslint/markdown` project adopts any rules from this plugin, we will deprecate and remove the overlapping rules in this plugin.

You can use both `@eslint/markdown` and `eslint-markdown` together to get full support and additional features when migrating your Markdown linting setup, which is covered in the following section.

::: tip NOTE

You can find more information on using `@eslint/markdown` together with `eslint-markdown` in the [Configurations](configurations.md#with-eslint-built-in-markdown-support-eslint-markdown) chapter.

:::

## Migrating from [`markdownlint`](https://github.com/DavidAnson/markdownlint#readme)

If you are a user of [`markdownlint`](https://github.com/DavidAnson/markdownlint), [`markdownlint-cli`](https://github.com/igorshubovych/markdownlint-cli), or [`markdownlint-cli2`](https://github.com/DavidAnson/markdownlint-cli2), this section will guide you through migrating your existing configuration to `eslint-markdown` and `@eslint/markdown`.

<!-- TODO -->

::: warning :construction: This section is a work in progress :construction:

This section is currently under construction and will be updated soon.

:::

| `markdownlint` | `eslint-markdown` or `@eslint/markdown` |
| -------------- | --------------------------------------- |
| [`MD010` - Hard tabs](https://github.com/DavidAnson/markdownlint/blob/main/doc/md010.md#md010---hard-tabs) :white_check_mark: | [`md/no-tab`](../rules/no-tab.md) |
| [`MD049` - Emphasis style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md049.md#md049---emphasis-style) :white_check_mark: | [`md/consistent-emphasis-style`](../rules/consistent-emphasis-style.md) |

## Migrating from [`remark-lint`](https://github.com/remarkjs/remark-lint#readme)

If you are a user of [`remark-lint`](https://github.com/remarkjs/remark-lint#readme), this section will guide you through migrating your existing configuration to `eslint-markdown` and `@eslint/markdown`.

<!-- TODO -->

::: warning :construction: This section is a work in progress :construction:

This section is currently under construction and will be updated soon.

:::

| `remark-lint` | `eslint-markdown` or `@eslint/markdown` |
| ------------- | --------------------------------------- |
| [`remark-lint-emphasis-marker`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-emphasis-marker#remark-lint-emphasis-marker) :white_check_mark: | [`md/consistent-emphasis-style`](../rules/consistent-emphasis-style.md) |
| [`remark-lint-no-tabs`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-tabs#remark-lint-no-tabs) :white_check_mark: | [`md/no-tab`](../rules/no-tab.md) |
| [`remark-lint-strikethrough-marker`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-strikethrough-marker#remark-lint-strikethrough-marker) :white_check_mark: | [`md/consistent-delete-style`](../rules/consistent-delete-style.md) |

## Migrating from [`textlint`](https://github.com/textlint/textlint#readme)

If you are a user of [`textlint`](https://github.com/textlint/textlint#readme), this section will guide you through migrating your existing configuration to `eslint-markdown` and `@eslint/markdown`.

<!-- TODO -->

::: warning :construction: This section is a work in progress :construction:

This section is currently under construction and will be updated soon.

:::

| `textlint` | `eslint-markdown` or `@eslint/markdown` |
| :--------- | :-------------------------------------- |
| [`textlint-rule-allowed-uris`](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris#readme) :white_check_mark: | [`md/allow-image-url`](../rules/allow-image-url.md)<br>[`md/allow-link-url`](../rules/allow-link-url.md)<br>[`markdown/no-unused-definitions`](https://github.com/eslint/markdown/blob/main/docs/rules/no-unused-definitions.md#no-unused-definitions) |
| [`textlint-rule-no-zero-width-spaces`](https://github.com/textlint-rule/textlint-rule-no-zero-width-spaces) :white_check_mark: | [`md/no-irregular-whitespace`](../rules/no-irregular-whitespace.md) |
