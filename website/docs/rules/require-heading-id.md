<!-- markdownlint-disable-next-line no-inline-html first-line-h1 -->
<header v-html="$frontmatter.rule"></header>

## Rule Details

Some Markdown parsers or plugins, like [`@mdit/plugin-attrs`](https://mdit-plugins.github.io/attrs.html), [`markdown-it-attrs`](https://github.com/arve0/markdown-it-attrs), or [`remark-custom-header-id`](https://github.com/sindresorhus/remark-custom-header-id), support custom heading ID syntax, which can be used to add IDs to headings.

Heading IDs are helpful for linking to specific sections within a document and are supported by some websites and Markdown parsers through the `{#id}` syntax. These IDs not only provide improved accessibility, allowing screen readers to create a navigable table of contents, but also enhance SEO by helping search engines understand the structure of the document and deliver better search results.

When building websites with internationalization in mind, it's recommended to use English words for heading IDs. This is because certain languages may cause issues with URL encoding, leading to characters like `%20` or `%C3%A9` when IDs are encoded, which can make it difficult for people to recognize.

::: tip NOTE

This rule intentionally skips reporting on empty headings, such as `#`, `##`, or `# #`.

:::

## Examples

### :x: Incorrect

Examples of **incorrect** code for this rule:

#### Default (With `'always'` First Option)

```md eslint-check
<!-- eslint md/require-heading-id: 'error' -->

<!-- ATX Headings -->

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

<!-- ATX Closed Headings -->

# Heading 1 #

## Heading 2 ##

### Heading 3 ###

#### Heading 4 ####

##### Heading 5 #####

###### Heading 6 ######

<!-- Setext Headings -->

Heading 1
=========

Heading 1
Multiple Lines
=========

Heading 2
---------

Heading 2
Multiple Lines
---------

<!-- Other Invalid Heading ID Syntax -->

# Heading {#}

If a custom heading ID is empty, it won't be recognized as valid.

# Heading { #id}

If a custom heading ID has leading whitespace, it won't be recognized as valid.

# Heading *{#id}*

If a custom heading ID is wrapped in `emphasis`, it won't be recognized as valid.

# Heading **{#id}**

If a custom heading ID is wrapped in `strong`, it won't be recognized as valid.
```

#### With `'never'` First Option

```md eslint-check
<!-- eslint md/require-heading-id: ['error', 'never'] -->

<!-- ATX Headings -->

# Heading 1 {#heading-1}

## Heading 2 {#heading-2}

### Heading 3 {#heading-3}

#### Heading 4 {#heading-4}

##### Heading 5 {#heading-5}

###### Heading 6 {#heading-6}

<!-- ATX Closed Headings -->

# Heading 1 {#heading-1} #

## Heading 2 {#heading-2} ##

### Heading 3 {#heading-3} ###

#### Heading 4 {#heading-4} ####

##### Heading 5 {#heading-5} #####

###### Heading 6 {#heading-6} ######

<!-- Setext Headings -->

Heading 1 {#heading-1}
=========

Heading 1
Multiple Lines {#heading-1}
=========

Heading 2 {#heading-2}
---------

Heading 2
Multiple Lines {#heading-2}
---------
```

#### With `'never'` First Option and `{ leftDelimiter: '[', rightDelimiter: ']' }` Second Option

```md eslint-check
<!-- eslint md/require-heading-id: ['error', 'never', { leftDelimiter: '[', rightDelimiter: ']' }] -->

<!-- ATX Headings -->

# Heading 1 [#heading-1]

## Heading 2 [#heading-2]

### Heading 3 [#heading-3]

#### Heading 4 [#heading-4]

##### Heading 5 [#heading-5]

###### Heading 6 [#heading-6]

<!-- ATX Closed Headings -->

# Heading 1 [#heading-1] #

## Heading 2 [#heading-2] ##

### Heading 3 [#heading-3] ###

#### Heading 4 [#heading-4] ####

##### Heading 5 [#heading-5] #####

###### Heading 6 [#heading-6] ######

<!-- Setext Headings -->

Heading 1 [#heading-1]
=========

Heading 1
Multiple Lines [#heading-1]
=========

Heading 2 [#heading-2]
---------

Heading 2
Multiple Lines [#heading-2]
---------
```

### :white_check_mark: Correct

Examples of **correct** code for this rule:

#### Default (With `'always'` First Option)

```md eslint-check
<!-- eslint md/require-heading-id: 'error' -->

<!-- ATX Headings -->

# Heading 1 {#heading-1}

## Heading 2 {#heading-2}

### Heading 3 {#heading-3}

#### Heading 4 {#heading-4}

##### Heading 5 {#heading-5}

###### Heading 6 {#heading-6}

<!-- ATX Closed Headings -->

# Heading 1 {#heading-1} #

## Heading 2 {#heading-2} ##

### Heading 3 {#heading-3} ###

#### Heading 4 {#heading-4} ####

##### Heading 5 {#heading-5} #####

###### Heading 6 {#heading-6} ######

<!-- Setext Headings -->

Heading 1 {#heading-1}
=========

Heading 1
Multiple Lines {#heading-1}
=========

Heading 2 {#heading-2}
---------

Heading 2
Multiple Lines {#heading-2}
---------
```

#### With `'never'` First Option

```md eslint-check
<!-- eslint md/require-heading-id: ['error', 'never'] -->

<!-- ATX Headings -->

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

<!-- ATX Closed Headings -->

# Heading 1 #

## Heading 2 ##

### Heading 3 ###

#### Heading 4 ####

##### Heading 5 #####

###### Heading 6 ######

<!-- Setext Headings -->

Heading 1
=========

Heading 1
Multiple Lines
=========

Heading 2
---------

Heading 2
Multiple Lines
---------
```

## Options

```js
'md/require-heading-id': ['error',
  // First Option
  'always',
  // Second Option
  {
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowDepths: [],
  }
]
```

### First Option

#### `'always'` | `'never'`

> Type: `'always' | 'never'` / Default: `'always'`

`'always'` enforces the presence of heading IDs. `'never'` disallows heading IDs.

### Second Option

#### `leftDelimiter`

> Type: `string` / Default: `'{'`

The left delimiter to use for heading IDs.

#### `rightDelimiter`

> Type: `string` / Default: `'}'`

The right delimiter to use for heading IDs.

#### `allowDepths`

> Type: `Array<1 | 2 | 3 | 4 | 5 | 6>` / Default: `[]`

An array of heading depths to ignore. For example, `[1, 2]` would ignore level 1 and level 2 headings.

## Prior Art

- [`textlint-rule-require-header-id`](https://github.com/textlint-rule/textlint-rule-require-header-id)
