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
      name: 'Headings should not be reported by default',
      code: `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
`,
    },

    // Options
    {
      name: 'Headings should not be reported when they are allowed',
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
      name: 'Headings should not be reported when they are not disallowed',
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
      name: 'Headings should not be reported when they are allowed and not disallowed',
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
      name: 'ATX: h1 heading should be reported when it is not allowed',
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
      name: 'ATX: h2 heading should be reported when it is not allowed',
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
      name: 'ATX: h3 heading should be reported when it is not allowed',
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
      name: 'ATX: h4 heading should be reported when it is not allowed',
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
      name: 'ATX: h5 heading should be reported when it is not allowed',
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
      name: 'ATX: h6 heading should be reported when it is not allowed',
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

    // Basic: disallow heading
    {
      name: 'Heading should be reported when it is disallowed',
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
