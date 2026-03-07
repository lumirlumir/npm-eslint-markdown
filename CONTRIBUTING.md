# Contributing

This repository uses [`npm workspaces`](https://docs.npmjs.com/cli/using-npm/workspaces) to maintain a **monorepo**.

## Directory Structure

All packages are located in the `packages` directory, and the documentation can be found in the `website` directory.

## Installation

1. Fork it.

1. Clone it to your local directory. ([Git](https://git-scm.com/downloads) is required.)

    ```sh
    git clone https://github.com/lumirlumir/npm-eslint-markdown.git
    ```

1. Move to the `npm-eslint-markdown` directory.

    ```sh
    cd npm-eslint-markdown
    ```

1. Install npm packages. ([Node.js](https://nodejs.org/en) is required.)

    ```sh
    npm install
    ```

1. Edit codes.

1. Create `my-branch` branch.

    ```sh
    git switch -c my-branch
    ```

1. Commit your changes. (`husky` and `lint-staged` will lint your changed files!)

    ```sh
    git commit -am "<type>[scope]: <description>"
    ```

1. Push them to your remote branch.

1. Submit a pull request.🙇‍♂️

## Helpful Websites

- [ESLint Code Explorer](https://explorer.eslint.org)
- [`parse5` AST Explorer](https://astexplorer.net/#/1CHlCXc4n4)
- [CommonMark Spec](https://spec.commonmark.org/0.31.2/)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)
- [`markdownlint` Rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#rules)
- [`remark-lint` Rules](https://github.com/remarkjs/remark-lint?tab=readme-ov-file#rules)
