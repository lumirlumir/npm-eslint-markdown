/**
 * @fileoverview Test for `no-emoji.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ruleTester } from '../core/tests/index.js';
import rule from './no-emoji.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-emoji', rule, {
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
      name: 'Text without emojis',
      code: 'Hello, world!',
    },
  ],

  invalid: [
    {
      // 😊's length is 2.
      name: 'Single-line emoji - 1',
      code: 'Hello, 😊!',
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      // 🙇‍♂️'s length is 5.
      name: 'Single-line emoji - 2',
      code: 'Hello, 🙇‍♂️!',
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      // 😊's length is 2, 🦄's length is 2.
      name: 'Multi-line emojis - 1',
      code: `Hi, 😊
🦄!`,
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
        },
        {
          messageId: 'noEmoji',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Multi-line emojis - 2',
      code: `Hi, 😊
  🦄!`,
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
        },
        {
          messageId: 'noEmoji',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
        },
      ],
    },
  ],
});
