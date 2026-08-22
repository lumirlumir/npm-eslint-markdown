/**
 * @fileoverview Test for `consistent-heading-style.ts`.
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './consistent-heading-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-heading-style', rule, {
  valid: [
    {
      name: 'Empty document',
      code: '',
    },
    {
      name: 'Document without headings',
      code: 'Paragraph\n\n---',
    },
    {
      name: '`consistent` style with one ATX heading',
      code: '# Heading',
    },
    {
      name: '`consistent` style with ATX headings at every level',
      code: `# H1

## H2

### H3

#### H4

##### H5

###### H6`,
    },
    {
      name: '`consistent` style with closed ATX headings',
      code: `# H1 #

## H2 ##

### H3 ###`,
    },
    {
      name: '`consistent` style with Setext headings',
      code: `H1
==

H2
--`,
    },
    {
      name: '`atx` style',
      code: `# H1

### H3

###### H6`,
      options: [{ style: 'atx' }],
    },
    {
      name: '`atx-closed` style',
      code: `# H1 #

### H3 ###

###### H6 ######`,
      options: [{ style: 'atx-closed' }],
    },
    {
      name: '`setext` style with H1 and H2',
      code: `H1
==

H2
--`,
      options: [{ style: 'setext' }],
    },
    {
      name: 'Setext heading content may start with a number sign',
      code: '#hashtag\n========',
      options: [{ style: 'setext' }],
    },
    {
      name: '`setext-with-atx` style',
      code: `H1
==

H2
--

### H3

###### H6`,
      options: [{ style: 'setext-with-atx' }],
    },
    {
      name: '`setext-with-atx-closed` style',
      code: `H1
==

H2
--

### H3 ###

###### H6 ######`,
      options: [{ style: 'setext-with-atx-closed' }],
    },
    {
      name: 'Closed ATX heading containing an escaped trailing hash',
      code: '## Heading \\# ##',
      options: [{ style: 'atx-closed' }],
    },
    {
      name: 'ATX heading containing an escaped trailing hash is not closed',
      code: '## Heading \\#',
      options: [{ style: 'atx' }],
    },
    {
      // `markdownlint` MD003 only checks ATX and Setext tokens, so HTML heading elements are ignored.
      // @see https://github.com/DavidAnson/markdownlint/blob/3f1f479322e863a53e56c94b01266b9785cd3bfd/lib/md003.mjs#L15
      name: 'HTML heading elements are outside the rule scope',
      code: '<h1>Heading</h1>\n\n<h2>Heading</h2>',
      options: [{ style: 'atx' }],
    },
    {
      name: 'Heading-like content in a fenced code block does not determine the consistent style',
      code: `\`\`\`md
# Not a heading
\`\`\`

Heading
=======`,
    },
  ],

  invalid: [
    {
      name: '`consistent` style uses the first ATX heading',
      code: `# Heading

## Heading ##

Heading
-------`,
      output: `# Heading

## Heading

## Heading`,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 14,
          data: { style: 'atx' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 6,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`consistent` style uses the first closed ATX heading',
      code: `# Heading #

## Heading

Heading
-------`,
      output: `# Heading #

## Heading ##

## Heading ##`,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 11,
          data: { style: 'atx-closed' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 6,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '`consistent` style uses the first Setext heading',
      code: `Heading
=======

## Heading

## Heading ##`,
      output: `Heading
=======

Heading
-------

Heading
-------`,
      errors: [
        {
          messageId: 'style',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 11,
          data: { style: 'setext' },
        },
        {
          messageId: 'style',
          line: 6,
          column: 1,
          endLine: 6,
          endColumn: 14,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`atx` style converts closed ATX and Setext headings',
      code: `# Heading #

## Heading

Heading
-------`,
      output: `# Heading

## Heading

## Heading`,
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'atx' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 6,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`atx-closed` style converts ATX and Setext headings',
      code: `# Heading #

## Heading

Heading
-------`,
      output: `# Heading #

## Heading ##

## Heading ##`,
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 11,
          data: { style: 'atx-closed' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 6,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '`setext` style converts ATX H1 and H2 headings',
      code: `# Heading

## Heading ##

Heading
-------`,
      output: `Heading
=======

Heading
-------

Heading
-------`,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { style: 'setext' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 14,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`setext` style reports an ATX H3 without changing its depth',
      code: '### H3',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 7,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`consistent` style uses the first Setext heading for an ATX H3',
      code: `H1
==

### H3`,
      output: null,
      options: [{ style: 'consistent' }],
      errors: [
        {
          messageId: 'style',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 7,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`setext-with-atx` rejects ATX H1/H2 and closed ATX H3+',
      code: `# H1

## H2

### H3 ###

#### H4`,
      output: `H1
==

H2
--

### H3

#### H4`,
      options: [{ style: 'setext-with-atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'setext' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 6,
          data: { style: 'setext' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 11,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`setext-with-atx-closed` rejects closed ATX H1/H2 and ATX H3+',
      code: `# H1 #

## H2 ##

### H3

#### H4 ####`,
      output: `H1
==

H2
--

### H3 ###

#### H4 ####`,
      options: [{ style: 'setext-with-atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 7,
          data: { style: 'setext' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 9,
          data: { style: 'setext' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 7,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: 'Heading content starting with a number sign is not an ATX heading on its own line',
      code: '# #hashtag',
      output: '#hashtag\n========',
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`setext` style converts a heading that follows a blank line',
      code: `Paragraph

# Heading`,
      output: `Paragraph

Heading
=======`,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 10,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`setext` style does not fix a heading without a preceding blank line',
      code: 'Paragraph\n# Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`setext` style does not fix a nested heading',
      code: '> # Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 12,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`atx` style does not fix a multiline Setext heading',
      code: 'First line\nsecond line\n-----------',
      output: null,
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 12,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`setext` style does not fix an empty ATX heading',
      code: '#',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`atx` style preserves inline Markdown',
      code: '## Heading *emphasis* ##',
      output: '## Heading *emphasis*',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 25,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`setext` style preserves CRLF line endings',
      code: '# H1\r\n\r\nParagraph',
      output: 'H1\r\n==\r\n\r\nParagraph',
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: 'Empty closed ATX heading can be converted to ATX',
      code: '# #',
      output: '#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`atx` style preserves mixed inline Markdown when converting a Setext heading',
      code: '**bold** `code` [link](https://example.com) &copy; <span>HTML</span> 😀\n================================================================================',
      output: '# **bold** `code` [link](https://example.com) &copy; <span>HTML</span> 😀',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 81,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`atx` style converts a Setext heading nested in a blockquote',
      code: '> Heading\n> -------',
      output: '> ## Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 2,
          endColumn: 10,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`atx` style removes a closing sequence surrounded by tabs',
      code: '##\tHeading\t##\t',
      output: '##\tHeading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 15,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`atx-closed` style converts an empty ATX heading',
      code: '##',
      output: '## ##',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '`atx` style escapes a trailing hash when converting a Setext heading',
      code: 'hashtag #\n===',
      output: '# hashtag \\#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 4,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`atx` style escapes a trailing hash when converting a Setext heading',
      code: 'Heading \\## hashtag #\n===',
      output: '# Heading \\## hashtag \\#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 4,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`atx-closed` style preserves a trailing hash when converting a Setext heading',
      code: 'hashtag #\n===',
      output: '# hashtag # #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 4,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '`setext` style does not fix heading content starting with an unordered list marker',
      code: '# - Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`setext` style does not fix heading content starting with a blockquote marker',
      code: '# > Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`setext` style does not fix heading content starting with an ordered list marker',
      code: '# 1. Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`setext` style converts marker-like content without separating whitespace',
      code: `# -Heading

# 1.Heading`,
      output: `-Heading
========

1.Heading
=========`,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'setext' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 12,
          data: { style: 'setext' },
        },
      ],
    },
  ],
});
