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
| :------------- | :-------------------------------------- |
| [`MD004` - Unordered list style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md004.md#md004---unordered-list-style) :white_check_mark: | [`md/consistent-unordered-list-style`](../rules/consistent-unordered-list-style.md) |
| [`MD010` - Hard tabs](https://github.com/DavidAnson/markdownlint/blob/main/doc/md010.md#md010---hard-tabs) :white_check_mark: | [`md/no-tab`](../rules/no-tab.md) |
| [`MD035` - Horizontal rule style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md035.md#md035---horizontal-rule-style) :white_check_mark: | [`md/consistent-thematic-break-style`](../rules/consistent-thematic-break-style.md) |
| [`MD049` - Emphasis style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md049.md#md049---emphasis-style) :white_check_mark: | [`md/consistent-emphasis-style`](../rules/consistent-emphasis-style.md) |
| [`MD050` - Strong style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md050.md#md050---strong-style) :white_check_mark: | [`md/consistent-strong-style`](../rules/consistent-strong-style.md) |
| [`markdownlint-rule-no-trailing-slash-in-links`](https://github.com/xiaogaozi/markdownlint-rule-no-trailing-slash-in-links) :white_check_mark: | [`md/no-url-trailing-slash`](../rules/no-url-trailing-slash.md) |

## Migrating from [`remark-lint`](https://github.com/remarkjs/remark-lint#readme)

If you are a user of [`remark-lint`](https://github.com/remarkjs/remark-lint#readme), this section will guide you through migrating your existing configuration to `eslint-markdown` and `@eslint/markdown`.

<!-- TODO -->

::: warning :construction: This section is a work in progress :construction:

This section is currently under construction and will be updated soon.

:::

| `remark-lint` | `eslint-markdown` or `@eslint/markdown` |
| :------------ | :-------------------------------------- |
| [`remark-lint-emphasis-marker`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-emphasis-marker#remark-lint-emphasis-marker) :white_check_mark: | [`md/consistent-emphasis-style`](../rules/consistent-emphasis-style.md) |
| [`remark-lint-no-tabs`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-no-tabs#remark-lint-no-tabs) :white_check_mark: | [`md/no-tab`](../rules/no-tab.md) |
| [`remark-lint-no-url-trailing-slash`](https://github.com/vhf/remark-lint-no-url-trailing-slash) :white_check_mark: | [`md/no-url-trailing-slash`](../rules/no-url-trailing-slash.md) |
| [`remark-lint-rule-style`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-rule-style#remark-lint-rule-style) :white_check_mark: | [`md/consistent-thematic-break-style`](../rules/consistent-thematic-break-style.md) |
| [`remark-lint-strikethrough-marker`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-strikethrough-marker#remark-lint-strikethrough-marker) :white_check_mark: | [`md/consistent-delete-style`](../rules/consistent-delete-style.md) |
| [`remark-lint-strong-marker`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-strong-marker#remark-lint-strong-marker) :white_check_mark: | [`md/consistent-strong-style`](../rules/consistent-strong-style.md) |
| [`remark-lint-unordered-list-marker-style`](https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-unordered-list-marker-style#remark-lint-unordered-list-marker-style) :white_check_mark: | [`md/consistent-unordered-list-style`](../rules/consistent-unordered-list-style.md) |

## Migrating from [`textlint`](https://github.com/textlint/textlint#readme)

If you are a user of [`textlint`](https://github.com/textlint/textlint#readme), this section will guide you through migrating your existing configuration to `eslint-markdown` and `@eslint/markdown`.

<!-- TODO -->

::: warning :construction: This section is a work in progress :construction:

This section is currently under construction and will be updated soon.

:::

| `textlint` | `eslint-markdown` or `@eslint/markdown` |
| :--------- | :-------------------------------------- |
| [`textlint-rule-allowed-uris`](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris#readme) :white_check_mark: | [`md/allow-image-url`](../rules/allow-image-url.md)<br>[`md/allow-link-url`](../rules/allow-link-url.md)<br>[`markdown/no-unused-definitions`](https://github.com/eslint/markdown/blob/main/docs/rules/no-unused-definitions.md#no-unused-definitions) |
| [`textlint-rule-doubled-spaces`](https://github.com/iwamatsu0430/textlint-rule-doubled-spaces) :white_check_mark: | [`md/no-double-space`](../rules/no-double-space.md) |
| [`textlint-rule-no-curly-quotes`](https://github.com/aborazmeh/textlint-rule-no-curly-quotes#readme) :white_check_mark: | [`md/no-curly-quote`](../rules/no-curly-quote.md) |
| [`textlint-rule-no-invalid-control-character`](https://github.com/textlint-rule/textlint-rule-no-invalid-control-character) :warning: | [`md/no-control-character`](../rules/no-control-character.md) |
| [`textlint-rule-no-zero-width-spaces`](https://github.com/textlint-rule/textlint-rule-no-zero-width-spaces) :white_check_mark: | [`md/no-irregular-whitespace`](../rules/no-irregular-whitespace.md) |
