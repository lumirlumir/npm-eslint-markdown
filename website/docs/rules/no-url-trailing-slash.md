<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule disallows trailing slashes in the [`pathname`](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname) portion of URLs within Markdown documents.

A URL is considered to have a trailing slash when its `pathname` ends with `/`, including cases where that `/` appears **immediately before** a query string (`?`) or fragment (`#`), for example: `https://example.com/?q=1` or `https://example.com/#section`.

Depending on your server, framework, and canonicalization settings, URLs with and without a trailing slash may be treated as different resources, which can lead to:

- Duplicate content and canonical URL ambiguity.
- Broken or inconsistent links when different variants are referenced.
- Inconsistent caching and routing behavior.

By enforcing consistent URL formatting without trailing slashes, this rule helps maintain clean and predictable link structures in documentation.

The rule examines all URL-bearing elements in a Markdown document:

- Standard Markdown link syntax: `[text](url "title")` or `<https://example.com>`
- Standard Markdown image syntax: `![alt text](url "title")`
- Standard Markdown definition syntax: `[ref]: url "title"`
- HTML link tags: `<a href="url">text</a>`
- HTML image tags: `<img src="url" />`

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

```md eslint-check
<!-- eslint md/no-url-trailing-slash: 'error' -->

[Link](https://example.com/)

[Link](https://example.com/path/to/resource/)

[Link](https://example.com/?query=string)

[Link](https://example.com/#fragment)

[Link](https://example.com/path/to/resource/?query=string#fragment)

<https://example.com/>

![Image](https://example.com/)

[Definition]: https://example.com/

<a href="https://example.com/">Link</a>

<img src="https://example.com/" />
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

```md eslint-check
<!-- eslint md/no-url-trailing-slash: 'error' -->

[Link](https://example.com)

[Link](https://example.com/path/to/resource)

[Link](https://example.com?query=string)

[Link](https://example.com#fragment)

[Link](https://example.com/path/to/resource?query=string#fragment)

<https://example.com>

![Image](https://example.com)

[Definition]: https://example.com

<a href="https://example.com">Link</a>

<img src="https://example.com" />
```

## Options

No options are available for this rule.

## Prior Art

- [`remark-lint-no-url-trailing-slash`](https://github.com/vhf/remark-lint-no-url-trailing-slash#readme)
- [`markdownlint-rule-no-trailing-slash-in-links`](https://github.com/xiaogaozi/markdownlint-rule-no-trailing-slash-in-links#readme)
