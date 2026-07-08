/**
 * @fileoverview Test for `allow-heading.js`.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './allow-heading.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('allow-heading', rule, {
  valid: [
    // Default
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty String',
      code: '  ',
    },
    {
      name: 'ATX: Headings should not be reported by default',
      code: `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
`,
    },
    {
      name: 'ATX Closed: Headings should not be reported by default',
      code: `
# Heading 1 #
## Heading 2 ##
### Heading 3 ###
#### Heading 4 ####
##### Heading 5 #####
###### Heading 6 ######
`,
    },
    {
      name: 'Setext: Headings should not be reported by default',
      code: `
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
`,
    },

    // Options
    {
      name: 'ATX: Headings should not be reported when they are allowed',
      code: `
# Hello
# World

## Hello
## World

### Hello
### World

#### Hello
#### World

##### Hello
##### World

###### Hello
###### World
`,
      options: [
        {
          h1: { allow: [/^# (?:Hello|World)$/u] },
          h2: { allow: [/^## (?:Hello|World)$/u] },
          h3: { allow: [/^### (?:Hello|World)$/u] },
          h4: { allow: [/^#### (?:Hello|World)$/u] },
          h5: { allow: [/^##### (?:Hello|World)$/u] },
          h6: { allow: [/^###### (?:Hello|World)$/u] },
        },
      ],
    },
    {
      name: 'ATX Closed: Headings should not be reported when they are allowed',
      code: `
# Hello #
# World #

## Hello ##
## World ##

### Hello ###
### World ###

#### Hello ####
#### World ####

##### Hello #####
##### World #####

###### Hello ######
###### World ######
`,
      options: [
        {
          h1: { allow: [/^# (?:Hello|World) #$/u] },
          h2: { allow: [/^## (?:Hello|World) ##$/u] },
          h3: { allow: [/^### (?:Hello|World) ###$/u] },
          h4: { allow: [/^#### (?:Hello|World) ####$/u] },
          h5: { allow: [/^##### (?:Hello|World) #####$/u] },
          h6: { allow: [/^###### (?:Hello|World) ######$/u] },
        },
      ],
    },
    {
      name: 'Setext: Headings should not be reported when they are allowed',
      code: `
Hello
=====

Hello
Multiple Lines
=====

World
-----

World
Multiple Lines
-----
`,
      options: [
        {
          h1: { allow: [/^Hello(?:\nMultiple Lines)?\n=+$/u] },
          h2: { allow: [/^World(?:\nMultiple Lines)?\n-+$/u] },
        },
      ],
    },
    {
      name: 'ATX: Headings should not be reported when they are not disallowed',
      code: `
# Hello
## World
`,
      options: [
        {
          h1: { disallow: [/Foo/u] },
          h2: { disallow: [/Foo/u] },
        },
      ],
    },
    {
      name: 'ATX: Headings should not be reported when they are allowed and not disallowed',
      code: '# Hello',
      options: [
        {
          h1: {
            allow: [/^# Hello$/u],
            disallow: [/^# World$/u],
          },
        },
      ],
    },
  ],

  invalid: [
    // Basic: allow heading
    {
      name: 'ATX: H1 heading should be reported when it is not allowed',
      code: '# Hello',
      options: [
        {
          h1: { allow: [/^# World$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: { depth: '1', heading: '# Hello', allow: '`/^# World$/u`' },
        },
      ],
    },
    {
      name: 'ATX: H2 heading should be reported when it is not allowed',
      code: '## Hello',
      options: [
        {
          h2: { allow: [/^## World$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 9,
          data: { depth: '2', heading: '## Hello', allow: '`/^## World$/u`' },
        },
      ],
    },
    {
      name: 'ATX: H3 heading should be reported when it is not allowed',
      code: '### Hello',
      options: [
        {
          h3: { allow: [/^### World$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { depth: '3', heading: '### Hello', allow: '`/^### World$/u`' },
        },
      ],
    },
    {
      name: 'ATX: H4 heading should be reported when it is not allowed',
      code: '#### Hello',
      options: [
        {
          h4: { allow: [/^#### World$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { depth: '4', heading: '#### Hello', allow: '`/^#### World$/u`' },
        },
      ],
    },
    {
      name: 'ATX: H5 heading should be reported when it is not allowed',
      code: '##### Hello',
      options: [
        {
          h5: { allow: [/^##### World$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { depth: '5', heading: '##### Hello', allow: '`/^##### World$/u`' },
        },
      ],
    },
    {
      name: 'ATX: H6 heading should be reported when it is not allowed',
      code: '###### Hello',
      options: [
        {
          h6: { allow: [/^###### World$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { depth: '6', heading: '###### Hello', allow: '`/^###### World$/u`' },
        },
      ],
    },

    {
      name: 'ATX Closed: H1 heading should be reported when it is not allowed',
      code: '# Hello #',
      options: [
        {
          h1: { allow: [/^# World #$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { depth: '1', heading: '# Hello #', allow: '`/^# World #$/u`' },
        },
      ],
    },
    {
      name: 'ATX Closed: H2 heading should be reported when it is not allowed',
      code: '## Hello ##',
      options: [
        {
          h2: { allow: [/^## World ##$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { depth: '2', heading: '## Hello ##', allow: '`/^## World ##$/u`' },
        },
      ],
    },
    {
      name: 'ATX Closed: H3 heading should be reported when it is not allowed',
      code: '### Hello ###',
      options: [
        {
          h3: { allow: [/^### World ###$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { depth: '3', heading: '### Hello ###', allow: '`/^### World ###$/u`' },
        },
      ],
    },
    {
      name: 'ATX Closed: H4 heading should be reported when it is not allowed',
      code: '#### Hello ####',
      options: [
        {
          h4: { allow: [/^#### World ####$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 16,
          data: {
            depth: '4',
            heading: '#### Hello ####',
            allow: '`/^#### World ####$/u`',
          },
        },
      ],
    },
    {
      name: 'ATX Closed: H5 heading should be reported when it is not allowed',
      code: '##### Hello #####',
      options: [
        {
          h5: { allow: [/^##### World #####$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 18,
          data: {
            depth: '5',
            heading: '##### Hello #####',
            allow: '`/^##### World #####$/u`',
          },
        },
      ],
    },
    {
      name: 'ATX Closed: H6 heading should be reported when it is not allowed',
      code: '###### Hello ######',
      options: [
        {
          h6: { allow: [/^###### World ######$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 20,
          data: {
            depth: '6',
            heading: '###### Hello ######',
            allow: '`/^###### World ######$/u`',
          },
        },
      ],
    },

    {
      name: 'Setext: H1 heading should be reported when it is not allowed',
      code: 'Heading 1\n=========',
      options: [
        {
          h1: { allow: [/^World\n=+$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: {
            depth: '1',
            heading: 'Heading 1\n=========',
            allow: '`/^World\\n=+$/u`',
          },
        },
      ],
    },
    {
      name: 'Setext: Multiline h1 heading should be reported when it is not allowed',
      code: 'Heading 1\nMultiple Lines\n=========',
      options: [
        {
          h1: { allow: [/^World\nMultiple Lines\n=+$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 10,
          data: {
            depth: '1',
            heading: 'Heading 1\nMultiple Lines\n=========',
            allow: '`/^World\\nMultiple Lines\\n=+$/u`',
          },
        },
      ],
    },
    {
      name: 'Setext: H2 heading should be reported when it is not allowed',
      code: 'Heading 2\n---------',
      options: [
        {
          h2: { allow: [/^World\n-+$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: {
            depth: '2',
            heading: 'Heading 2\n---------',
            allow: '`/^World\\n-+$/u`',
          },
        },
      ],
    },
    {
      name: 'Setext: Multiline h2 heading should be reported when it is not allowed',
      code: 'Heading 2\nMultiple Lines\n---------',
      options: [
        {
          h2: { allow: [/^World\nMultiple Lines\n-+$/u] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 10,
          data: {
            depth: '2',
            heading: 'Heading 2\nMultiple Lines\n---------',
            allow: '`/^World\\nMultiple Lines\\n-+$/u`',
          },
        },
      ],
    },

    // Basic: disallow heading
    {
      name: 'ATX: Heading should be reported when it is disallowed',
      code: '# Hello',
      options: [
        {
          h1: { disallow: [/^# Hello$/u] },
        },
      ],
      errors: [
        {
          messageId: 'disallowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: { depth: '1', heading: '# Hello', disallow: '`/^# Hello$/u`' },
        },
      ],
    },
    {
      name: 'ATX Closed: Heading should be reported when it is disallowed',
      code: '# Hello #',
      options: [
        {
          h1: { disallow: [/^# Hello #$/u] },
        },
      ],
      errors: [
        {
          messageId: 'disallowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { depth: '1', heading: '# Hello #', disallow: '`/^# Hello #$/u`' },
        },
      ],
    },
    {
      name: 'Setext: Heading should be reported when it is disallowed',
      code: 'Hello\n=====',
      options: [
        {
          h1: { disallow: [/^Hello\n=+$/u] },
        },
      ],
      errors: [
        {
          messageId: 'disallowHeading',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 6,
          data: { depth: '1', heading: 'Hello\n=====', disallow: '`/^Hello\\n=+$/u`' },
        },
      ],
    },

    // Basic: allow and disallow heading
    {
      name: 'Heading should be reported when it is not allowed and is disallowed',
      code: '# Hello',
      options: [
        {
          h1: {
            allow: [/^# World$/u],
            disallow: [/^# Hello$/u],
          },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: { depth: '1', heading: '# Hello', allow: '`/^# World$/u`' },
        },
        {
          messageId: 'disallowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: { depth: '1', heading: '# Hello', disallow: '`/^# Hello$/u`' },
        },
      ],
    },

    // Edge cases
    {
      name: 'Headings should be reported when empty allow array is given',
      code: '# Hello\n## World',
      options: [
        {
          h1: { allow: [] },
          h2: { allow: [] },
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: { depth: '1', heading: '# Hello', allow: '' },
        },
        {
          messageId: 'allowHeading',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 9,
          data: { depth: '2', heading: '## World', allow: '' },
        },
      ],
    },
  ],
});
