# Introduction

As of October 3, 2024, [ESLint officially supports linting Markdown](https://eslint.org/blog/2024/10/eslint-json-markdown-support/). The ESLint team stated that this is just the first step toward building a language-agnostic platform for source code linting.

This project aims to align with this trend by providing various rules to improve the quality of Markdown documents, with support for [**CommonMark**](https://commonmark.org/) and [**GitHub Flavored Markdown (GFM)**](https://github.github.com/gfm/).

Simply lint your Markdown files using the same tool you use for JavaScript, TypeScript, and other source code files.

## Goal

Our goal is to provide a set of ESLint rules that help you write better Markdown documents and make it easy to migrate from popular Markdown linters such as [`markdownlint`](https://github.com/DavidAnson/markdownlint#readme), [`remark-lint`](https://github.com/remarkjs/remark-lint#readme), and [`textlint`](https://github.com/textlint/textlint#readme). (You can find additional details in the [Migration Guide](migration.md).)

By combining this [`eslint-markdown`](https://github.com/lumirlumir/npm-eslint-markdown#readme) plugin with ESLint's built-in Markdown support [`@eslint/markdown`](https://github.com/eslint/markdown#readme), you can lint both your code and documentation with a single tool.

::: tip :unicorn:

I hope this plugin becomes a [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn#readme) for Markdown linting that everyone loves someday. :smile:

:::

## Limitations

This plugin does not include any rules that overlap with ESLint's built-in Markdown rules provided by [`@eslint/markdown`](https://github.com/eslint/markdown#readme). As a result, `eslint-markdown` is completely disjoint from `@eslint/markdown`.

If the upstream `@eslint/markdown` project adopts any rules from this plugin, we will deprecate and remove the overlapping rules in this plugin.
