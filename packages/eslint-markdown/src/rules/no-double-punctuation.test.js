/**
 * @fileoverview Test for `no-double-punctuation.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../core/rule-tester.js';
import rule from './no-double-punctuation.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-double-punctuation', rule, {
  valid: [
    '',
    '  ',
    '!',
    ',',
    '.',
    ':',
    ';',
    '?',
    '!!!',
    ',,,',
    '...',
    ':::',
    ';;;',
    '???',
    'Foo! Bar? Baz.',
    'Foo... Bar!!! Baz!!?',
    '`Foo!!` and `Bar??`', // `InlineCode` is ignored.
    `\`\`\`md
Foo!!
Bar??
\`\`\``, // `Code` is ignored.

    // `allow` option
    {
      code: 'Foo!!',
      options: [
        {
          allow: ['!!'],
        },
      ],
    },
    {
      code: 'Foo?! Bar..',
      options: [
        {
          allow: ['?!', '..'],
        },
      ],
    },
  ],

  invalid: [
    {
      code: '!!',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: '!!',
          },
        },
      ],
    },
    {
      code: ',,',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: ',,',
          },
        },
      ],
    },
    {
      code: '..',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: '..',
          },
        },
      ],
    },
    {
      code: '::',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: '::',
          },
        },
      ],
    },
    {
      code: ';;',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: ';;',
          },
        },
      ],
    },
    {
      code: '??',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: '??',
          },
        },
      ],
    },
    {
      code: 'Foo!!',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
          data: {
            punctuation: '!!',
          },
        },
      ],
    },
    {
      code: 'Foo?!',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
          data: {
            punctuation: '?!',
          },
        },
      ],
    },
    {
      code: `Foo!!
Bar..
Baz;:`,
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
          data: {
            punctuation: '!!',
          },
        },
        {
          messageId: 'noDoublePunctuation',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 6,
          data: {
            punctuation: '..',
          },
        },
        {
          messageId: 'noDoublePunctuation',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 6,
          data: {
            punctuation: ';:',
          },
        },
      ],
    },
    {
      code: 'Foo!! Bar?!',
      options: [
        {
          allow: ['!!'],
        },
      ],
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: '?!',
          },
        },
      ],
    },
  ],
});
