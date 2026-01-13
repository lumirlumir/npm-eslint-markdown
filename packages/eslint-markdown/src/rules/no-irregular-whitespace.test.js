/**
 * @fileoverview Test for `no-irregular-whitespace.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './no-irregular-whitespace.js';

// TODO

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
  valid: [
    // Basic
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },
    {
      name: 'irregular whitespace in code - 1',
      code: `
\`\`\`js
\f\v\u0085\ufeff\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u202f\u205f\u3000\u2028\u2029
\`\`\``,
    },
    {
      name: 'irregular whitespace in code - 2',
      code: `
\`\`\`js\u2028
console.log(\u200b'Hello World');
\`\`\``,
    },
    {
      name: 'irregular whitespace in inline code',
      code: `\`console.log(\u200b'Hello World')\`

\`console.log(\u202f'Hello World')\``,
    },

    // Options
    {
      name: '`allow`',
      code: '1\u00852\u00A0',
      options: [
        {
          allow: ['\u0085', '\u00A0'],
        },
      ],
    },
  ],

  invalid: [
    // Basic
    {
      name: 'irregular whitespace',
      code: `
1\f2\v3\u00854\ufeff5\u00a06\u16807\u180e8\u20009\u20010\u2002
1\u20032\u20043\u20054\u20065\u20076\u20087\u20098\u200a9\u200b0\u202f
1\u205f2\u30003\u20284\u2029`,
      errors: [
        {
          messageId: 'noIrregularWhitespace',
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 3,
          data: {
            irregularWhitespace: 'U+000C',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 5,
          data: {
            irregularWhitespace: 'U+000B',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 7,
          data: {
            irregularWhitespace: 'U+0085',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 2,
          column: 8,
          endLine: 2,
          endColumn: 9,
          data: {
            irregularWhitespace: 'U+FEFF',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 2,
          column: 10,
          endLine: 2,
          endColumn: 11,
          data: {
            irregularWhitespace: 'U+00A0',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 2,
          column: 12,
          endLine: 2,
          endColumn: 13,
          data: {
            irregularWhitespace: 'U+1680',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 2,
          column: 14,
          endLine: 2,
          endColumn: 15,
          data: {
            irregularWhitespace: 'U+180E',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 2,
          column: 16,
          endLine: 2,
          endColumn: 17,
          data: {
            irregularWhitespace: 'U+2000',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 2,
          column: 18,
          endLine: 2,
          endColumn: 19,
          data: {
            irregularWhitespace: 'U+2001',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 2,
          column: 20,
          endLine: 2,
          endColumn: 21,
          data: {
            irregularWhitespace: 'U+2002',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 2,
          endLine: 3,
          endColumn: 3,
          data: {
            irregularWhitespace: 'U+2003',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
          data: {
            irregularWhitespace: 'U+2004',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 6,
          endLine: 3,
          endColumn: 7,
          data: {
            irregularWhitespace: 'U+2005',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 8,
          endLine: 3,
          endColumn: 9,
          data: {
            irregularWhitespace: 'U+2006',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 10,
          endLine: 3,
          endColumn: 11,
          data: {
            irregularWhitespace: 'U+2007',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 12,
          endLine: 3,
          endColumn: 13,
          data: {
            irregularWhitespace: 'U+2008',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 14,
          endLine: 3,
          endColumn: 15,
          data: {
            irregularWhitespace: 'U+2009',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 16,
          endLine: 3,
          endColumn: 17,
          data: {
            irregularWhitespace: 'U+200A',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 18,
          endLine: 3,
          endColumn: 19,
          data: {
            irregularWhitespace: 'U+200B',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 20,
          endLine: 3,
          endColumn: 21,
          data: {
            irregularWhitespace: 'U+202F',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 4,
          column: 2,
          endLine: 4,
          endColumn: 3,
          data: {
            irregularWhitespace: 'U+205F',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 4,
          column: 4,
          endLine: 4,
          endColumn: 5,
          data: {
            irregularWhitespace: 'U+3000',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 4,
          column: 6,
          endLine: 4,
          endColumn: 7,
          data: {
            irregularWhitespace: 'U+2028',
          },
        },
        {
          messageId: 'noIrregularWhitespace',
          line: 4,
          column: 8,
          endLine: 4,
          endColumn: 9,
          data: {
            irregularWhitespace: 'U+2029',
          },
        },
      ],
    },
    {
      name: 'Irregular whitespace in inline code',
      code: '`\v`\v',
      errors: [
        {
          messageId: 'noIrregularWhitespace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: {
            irregularWhitespace: 'U+000B',
          },
        },
      ],
    },

    // Options
    {
      name: '`allow`',
      code: '1\u00852\u00A03\u1680',
      errors: [
        {
          messageId: 'noIrregularWhitespace',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: {
            irregularWhitespace: 'U+1680',
          },
        },
      ],
      options: [
        {
          allow: ['\u0085', '\u00A0'],
        },
      ],
    },
    {
      name: '`skipCode: false`',
      code: `
\`\`\`js
console.log(\u200b'Hello World');
\`\`\``,
      errors: [
        {
          messageId: 'noIrregularWhitespace',
          line: 3,
          column: 13,
          endLine: 3,
          endColumn: 14,
          data: {
            irregularWhitespace: 'U+200B',
          },
        },
      ],
      options: [
        {
          skipCode: false,
        },
      ],
    },
    {
      name: '`skipInlineCode: false`',
      code: "`console.log(\u200b'Hello World')`",
      errors: [
        {
          messageId: 'noIrregularWhitespace',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 15,
          data: {
            irregularWhitespace: 'U+200B',
          },
        },
      ],
      options: [
        {
          skipInlineCode: false,
        },
      ],
    },
  ],
});
