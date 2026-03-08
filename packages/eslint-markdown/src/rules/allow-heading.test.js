/**
 * @fileoverview Test for `allow-heading.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ruleTester } from '../core/tests/index.js';
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
      name: 'Headings should not be reported when false is given',
      code: `
# Hello
## World
### Hello World
#### Hello World
##### Hello World
###### Hello World
`,
      options: [
        {
          h1: false,
          h2: false,
          h3: false,
          h4: false,
          h5: false,
          h6: false,
        },
      ],
    },

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
          h1: ['Hello', 'World'],
          h2: ['Hello', 'World'],
          h3: ['Hello', 'World'],
          h4: ['Hello', 'World'],
          h5: ['Hello', 'World'],
          h6: ['Hello', 'World'],
        },
      ],
    },
  ],

  invalid: [
    // Basic: allow heading
    {
      name: 'Headings should be reported when they are not allowed - h1',
      code: '# Hello',
      options: [
        {
          h1: ['World'],
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: { heading: 'Hello', allow: '`World`' },
        },
      ],
    },
    {
      name: 'Headings should be reported when they are not allowed - h2',
      code: '## Hello',
      options: [
        {
          h2: ['World'],
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 9,
          data: { heading: 'Hello', allow: '`World`' },
        },
      ],
    },
    {
      name: 'Headings should be reported when they are not allowed - h3',
      code: '### Hello',
      options: [
        {
          h3: ['World'],
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { heading: 'Hello', allow: '`World`' },
        },
      ],
    },
    {
      name: 'Headings should be reported when they are not allowed - h4',
      code: '#### Hello',
      options: [
        {
          h4: ['World'],
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { heading: 'Hello', allow: '`World`' },
        },
      ],
    },
    {
      name: 'Headings should be reported when they are not allowed - h5',
      code: '##### Hello',
      options: [
        {
          h5: ['World'],
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { heading: 'Hello', allow: '`World`' },
        },
      ],
    },
    {
      name: 'Headings should be reported when they are not allowed - h6',
      code: '###### Hello',
      options: [
        {
          h6: ['World'],
        },
      ],
      errors: [
        {
          messageId: 'allowHeading',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { heading: 'Hello', allow: '`World`' },
        },
      ],
    },

    // Basic: allow heading depth
    {
      name: 'Specific depth headings should be reported entirely when empty array option is given - h1',
      code: '# Hello\n# World',
      options: [
        {
          h1: [],
        },
      ],
      errors: [
        {
          messageId: 'allowHeadingDepth',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: { depth: 1 },
        },
        {
          messageId: 'allowHeadingDepth',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { depth: 1 },
        },
      ],
    },
    {
      name: 'Specific depth headings should be reported entirely when empty array option is given - h2',
      code: '## Hello\n## World',
      options: [
        {
          h2: [],
        },
      ],
      errors: [
        {
          messageId: 'allowHeadingDepth',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 9,
          data: { depth: 2 },
        },
        {
          messageId: 'allowHeadingDepth',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 9,
          data: { depth: 2 },
        },
      ],
    },
    {
      name: 'Specific depth headings should be reported entirely when empty array option is given - h3',
      code: '### Hello\n### World',
      options: [
        {
          h3: [],
        },
      ],
      errors: [
        {
          messageId: 'allowHeadingDepth',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { depth: 3 },
        },
        {
          messageId: 'allowHeadingDepth',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { depth: 3 },
        },
      ],
    },
    {
      name: 'Specific depth headings should be reported entirely when empty array option is given - h4',
      code: '#### Hello\n#### World',
      options: [
        {
          h4: [],
        },
      ],
      errors: [
        {
          messageId: 'allowHeadingDepth',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { depth: 4 },
        },
        {
          messageId: 'allowHeadingDepth',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 11,
          data: { depth: 4 },
        },
      ],
    },
    {
      name: 'Specific depth headings should be reported entirely when empty array option is given - h5',
      code: '##### Hello\n##### World',
      options: [
        {
          h5: [],
        },
      ],
      errors: [
        {
          messageId: 'allowHeadingDepth',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { depth: 5 },
        },
        {
          messageId: 'allowHeadingDepth',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 12,
          data: { depth: 5 },
        },
      ],
    },
    {
      name: 'Specific depth headings should be reported entirely when empty array option is given - h6',
      code: '###### Hello\n###### World',
      options: [
        {
          h6: [],
        },
      ],
      errors: [
        {
          messageId: 'allowHeadingDepth',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { depth: 6 },
        },
        {
          messageId: 'allowHeadingDepth',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 13,
          data: { depth: 6 },
        },
      ],
    },
  ],
});
