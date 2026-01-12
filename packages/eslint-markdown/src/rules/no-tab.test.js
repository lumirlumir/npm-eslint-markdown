/**
 * @fileoverview Test for `no-tab.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './no-tab.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
  valid: [
    '',
    '  ',
    `
\`\`\`js
\t
\`\`\``,
    `
\`\`\`js\t
console.log(\t'Hello World');
\`\`\``,
    `\`console.log(\t'Hello World')\`

\`console.log(\t'Hello World')\``,
    {
      code: `\`\`\`md
Hello\tWorld
\`\`\``,
      options: [
        {
          skipCode: ['md'],
        },
      ],
    },
    {
      code: `\`\`\`md
Hello\tWorld
\`\`\`

\`\`\`txt
Hello\tWorld
\`\`\``,
      options: [
        {
          skipCode: ['md', 'txt'],
        },
      ],
    },
  ],

  invalid: [
    // Basic
    {
      code: '\t',
      output: '    ',
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      code: '1\t',
      output: '1    ',
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
      ],
    },
    {
      code: '`\t`\t',
      output: '`\t`    ',
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },

    // Options
    {
      code: `
\`\`\`js
console.log(\t'Hello World');
\`\`\``,
      output: `
\`\`\`js
console.log(    'Hello World');
\`\`\``,
      options: [
        {
          skipCode: false,
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 3,
          column: 13,
          endLine: 3,
          endColumn: 14,
        },
      ],
    },
    {
      code: `\`\`\`md
Hello\tWorld
\`\`\`

\`\`\`txt
Hello\tWorld
\`\`\`

    code block with\ttab`,
      output: `\`\`\`md
Hello    World
\`\`\`

\`\`\`txt
Hello    World
\`\`\`

    code block with    tab`,
      options: [
        {
          skipCode: ['js', 'ts'],
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 7,
        },
        {
          messageId: 'noTab',
          line: 6,
          column: 6,
          endLine: 6,
          endColumn: 7,
        },
        {
          messageId: 'noTab',
          line: 9,
          column: 20,
          endLine: 9,
          endColumn: 21,
        },
      ],
    },
    {
      code: "`console.log(\t'Hello World')`",
      output: "`console.log(    'Hello World')`",
      options: [
        {
          skipInlineCode: false,
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      code: '1`\t`2\t',
      output: '1` `2 ',
      options: [
        {
          skipInlineCode: false,
          tabWidth: 1,
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
        {
          messageId: 'noTab',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
        },
      ],
    },
    {
      code: '1`\t`2\t',
      output: '1`  `2  ',
      options: [
        {
          skipInlineCode: false,
          tabWidth: 2,
        },
      ],
      errors: [
        {
          messageId: 'noTab',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
        {
          messageId: 'noTab',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
        },
      ],
    },
  ],
});
