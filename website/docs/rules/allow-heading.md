<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

This rule enforces that headings match predefined allowed or disallowed patterns. It allows you to restrict headings at different levels (`h1`-`h6`) to specific sets of regular expressions, ensuring consistency in document structure and terminology across your Markdown files.

The rule examines each heading in the document and checks its Markdown source text, such as `# Introduction` or `## Overview`, against the configured patterns for that heading level.

This is particularly useful for:

- Enforcing standardized section names in documentation.
- Ensuring consistent document structure across a project.
- Maintaining uniform terminology in collaborative writing environments.
- Creating templates where specific headings must follow a predefined pattern.

::: info

This rule doesn't report any errors by default. You must configure it with the allowed or disallowed heading patterns you want to enforce.

:::

## Examples

### :x: Incorrect {#incorrect}

Examples of **incorrect** code for this rule:

#### With `{ h1: { allow: [/^# Introduction$/] }, h2: { allow: [/^## (?:Overview|Installation)$/] } }` Option

```md eslint-check
<!-- eslint md/allow-heading: ["error", { h1: { allow: [/^# Introduction$/] }, h2: { allow: [/^## (?:Overview|Installation)$/] } }] -->

# Introduction

# Invalid Heading

## Overview

## Installation

## Features

### Feature 1
```

#### With `{ h3: { allow: [] } }` Option

If you want to disallow all `h3` headings, you can set the `h3.allow` option to an empty array. This will report any `h3` heading as an error.

```md eslint-check
<!-- eslint md/allow-heading: ["error", { h3: { allow: [] } }] -->

# Introduction

## Overview

## Installation

## Features

### Feature 1

### Feature 2

### Feature 3
```

### :white_check_mark: Correct {#correct}

Examples of **correct** code for this rule:

#### Default

This rule doesn't report any errors by default. You must configure it with the allowed or disallowed heading patterns you want to enforce.

```md eslint-check
<!-- eslint md/allow-heading: "error" -->

# Introduction

## Overview

## Installation
```

#### With `{ h1: { allow: [/^# Introduction$/] }, h2: { allow: [/^## (?:Overview|Installation)$/] } }` Option

```md eslint-check
<!-- eslint md/allow-heading: ["error", { h1: { allow: [/^# Introduction$/] }, h2: { allow: [/^## (?:Overview|Installation)$/] } }] -->

# Introduction

## Overview

## Installation
```

#### With `{ h1: { disallow: [/^# Draft$/] } }` Option

```md eslint-check
<!-- eslint md/allow-heading: ["error", { h1: { disallow: [/^# Draft$/] } }] -->

# H1 Heading

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading
```

## Options

```js
'md/allow-heading': ['error', {
  h1: { allow: [/.*/u], disallow: [] },
  h2: { allow: [/.*/u], disallow: [] },
  h3: { allow: [/.*/u], disallow: [] },
  h4: { allow: [/.*/u], disallow: [] },
  h5: { allow: [/.*/u], disallow: [] },
  h6: { allow: [/.*/u], disallow: [] },
}]
```

Each heading level can be configured with:

- `allow`: Allowed heading patterns. Only headings matching at least one pattern are allowed.
- `disallow`: Disallowed heading patterns. Headings matching any pattern are reported.

The patterns are tested against the Markdown source text for the entire heading node. For example, `## Overview` matches an `h2` ATX heading with the text `Overview`.

### `h1`

> Default: `{ allow: [/.*/u], disallow: [] }`

The allowed and disallowed patterns for `h1` headings.

### `h2`

> Default: `{ allow: [/.*/u], disallow: [] }`

The allowed and disallowed patterns for `h2` headings.

### `h3`

> Default: `{ allow: [/.*/u], disallow: [] }`

The allowed and disallowed patterns for `h3` headings.

### `h4`

> Default: `{ allow: [/.*/u], disallow: [] }`

The allowed and disallowed patterns for `h4` headings.

### `h5`

> Default: `{ allow: [/.*/u], disallow: [] }`

The allowed and disallowed patterns for `h5` headings.

### `h6`

> Default: `{ allow: [/.*/u], disallow: [] }`

The allowed and disallowed patterns for `h6` headings.

## When Not To Use It

You should disable this rule if:

- You want to maintain flexibility in your document headings.
- Your documents have dynamic or generated content in headings.
- You're writing exploratory or draft content where enforcing heading structure would be too restrictive.
- You have different heading requirements for different types of documents.
