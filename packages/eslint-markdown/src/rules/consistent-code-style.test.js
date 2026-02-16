/**
 * @fileoverview Test for `consistent-code-style.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './consistent-code-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },
    {
      name: '`consistent` style - `indent`',
      code: `
    code block 1

---

    code block 2`,
    },
    {
      name: '`consistent` style - `fence-backtick`',
      code: `
\`\`\`
code block 1
\`\`\`

\`\`\`
code block 2
\`\`\``,
    },
    {
      name: '`consistent` style - `fence-tilde`',
      code: `
~~~
code block 1
~~~

~~~
code block 2
~~~`,
    },
    {
      name: '`indent` style',
      code: `
    code block 1`,
      options: [{ style: 'indent' }],
    },
    {
      name: '`fence-backtick` style',
      code: `
\`\`\`
code block 1
\`\`\``,
      options: [{ style: 'fence-backtick' }],
    },
    {
      name: '`fence-tilde` style',
      code: `
~~~
code block 1
~~~`,
      options: [{ style: 'fence-tilde' }],
    },
  ],

  invalid: [
    // `consistent` style
    {
      name: '`consistent` style - `indent` 1',
      code: `
    code block 1

\`\`\`
code block 2
\`\`\``,
      errors: [
        {
          messageId: 'style',
          line: 4,
          column: 1,
          endLine: 6,
          endColumn: 4,
          data: { style: 'indent' },
        },
      ],
    },
    {
      name: '`consistent` style - `indent` 2',
      code: `
    code block 1

~~~
code block 2
~~~`,
      errors: [
        {
          messageId: 'style',
          line: 4,
          column: 1,
          endLine: 6,
          endColumn: 4,
          data: { style: 'indent' },
        },
      ],
    },
    {
      name: '`consistent` style - `fence-backtick` 1',
      code: `
\`\`\`
code block 1
\`\`\`

    code block 2`,
      errors: [
        {
          messageId: 'style',
          line: 6,
          column: 1,
          endLine: 6,
          endColumn: 17,
          data: { style: 'fence-backtick' },
        },
      ],
    },
    {
      name: '`consistent` style - `fence-backtick` 2',
      code: `
\`\`\`
code block 1
\`\`\`

~~~
code block 2
~~~`,
      errors: [
        {
          messageId: 'style',
          line: 6,
          column: 1,
          endLine: 8,
          endColumn: 4,
          data: { style: 'fence-backtick' },
        },
      ],
    },
    {
      name: '`consistent` style - `fence-tilde` 1',
      code: `
~~~
code block 1
~~~

    code block 2`,
      errors: [
        {
          messageId: 'style',
          line: 6,
          column: 1,
          endLine: 6,
          endColumn: 17,
          data: { style: 'fence-tilde' },
        },
      ],
    },
    {
      name: '`consistent` style - `fence-tilde` 2',
      code: `
~~~
code block 1
~~~

\`\`\`
code block 2
\`\`\``,
      errors: [
        {
          messageId: 'style',
          line: 6,
          column: 1,
          endLine: 8,
          endColumn: 4,
          data: { style: 'fence-tilde' },
        },
      ],
    },

    // `indent` style
    {
      name: '`indent` style',
      code: `
\`\`\`
code block 1
\`\`\`

~~~
code block 2
~~~`,
      options: [{ style: 'indent' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 4,
          endColumn: 4,
          data: { style: 'indent' },
        },
        {
          messageId: 'style',
          line: 6,
          column: 1,
          endLine: 8,
          endColumn: 4,
          data: { style: 'indent' },
        },
      ],
    },

    // `fence-backtick` style
    {
      name: '`fence-backtick` style',
      code: `
    code block 1

~~~
code block 2
~~~`,
      options: [{ style: 'fence-backtick' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 17,
          data: { style: 'fence-backtick' },
        },
        {
          messageId: 'style',
          line: 4,
          column: 1,
          endLine: 6,
          endColumn: 4,
          data: { style: 'fence-backtick' },
        },
      ],
    },

    // `fence-tilde` style
    {
      name: '`fence-tilde` style',
      code: `
    code block 1

\`\`\`
code block 2
\`\`\``,
      options: [{ style: 'fence-tilde' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 17,
          data: { style: 'fence-tilde' },
        },
        {
          messageId: 'style',
          line: 4,
          column: 1,
          endLine: 6,
          endColumn: 4,
          data: { style: 'fence-tilde' },
        },
      ],
    },
  ],
});
