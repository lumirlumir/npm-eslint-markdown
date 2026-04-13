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
    {
      name: 'Empty string',
      code: '',
    },
    {
      name: 'Single punctuation marks',
      code: 'Hello! Are you there? Yes.',
    },
    {
      name: 'Mixed punctuation marks',
      code: 'Really?! Yes.',
    },
    {
      name: 'Repeated punctuation in inline code',
      code: '`Hello!!` and `Wait??`',
    },
    {
      name: 'Allowed exclamation marks',
      code: 'Hello!!',
      options: [
        {
          allow: ['!!'],
        },
      ],
    },
    {
      name: 'Allowed question marks and periods',
      code: 'Really?? Maybe...',
      options: [
        {
          allow: ['??', '..'],
        },
      ],
    },
  ],

  invalid: [
    {
      name: 'Double exclamation marks',
      code: 'Hello!!',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 8,
          data: {
            punctuation: '!!',
          },
        },
      ],
    },
    {
      name: 'Triple exclamation marks',
      code: 'Hello!!!',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 8,
          data: {
            punctuation: '!!',
          },
        },
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 9,
          data: {
            punctuation: '!!',
          },
        },
      ],
    },
    {
      name: 'Repeated punctuation on multiple lines',
      code: `Hello!!
Wait...
Really??`,
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 8,
          data: {
            punctuation: '!!',
          },
        },
        {
          messageId: 'noDoublePunctuation',
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 7,
          data: {
            punctuation: '..',
          },
        },
        {
          messageId: 'noDoublePunctuation',
          line: 2,
          column: 7,
          endLine: 2,
          endColumn: 8,
          data: {
            punctuation: '..',
          },
        },
        {
          messageId: 'noDoublePunctuation',
          line: 3,
          column: 8,
          endLine: 3,
          endColumn: 9,
          data: {
            punctuation: '??',
          },
        },
      ],
    },
    {
      name: 'Allow only exclamation marks',
      code: 'Hello!! Really??',
      options: [
        {
          allow: ['!!'],
        },
      ],
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 17,
          data: {
            punctuation: '??',
          },
        },
      ],
    },
  ],
});
