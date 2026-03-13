/**
 * @fileoverview Test for `consistent-inline-code-style.js`.
 * @author 루밀LuMir(lumirlumir)
 * Note: All test cases have been verified against `markdownlint`'s MD038 rule.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../core/rule-tester.js';
import rule from './consistent-inline-code-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-inline-code-style', rule, {
  valid: [
    '',
    '  ',
    '``', // This is not a `inlineCode`, but a `text`.
    '```', // This is not a `inlineCode`, but a start of a `code`.
    '` ` `', // This is `inlineCode` and `text`.
    '` `',
    '`   `',
    '`some text`',
    '` some text `',
    '`code`',
    '` code `',
    // '`` `code``',
    // '``code` ``',
    '`` `code` ``',
    '`` `backticks` ``',
    '`` backtick` ``',
    '`` ` ``',
  ],

  invalid: [
    // Space
    {
      code: '`  code`',
      output: '`code`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      code: '`code  `',
      output: '`code`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      code: '` some text`',
      output: '`some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
      ],
    },
    {
      code: 'hi ` some text`',
      output: 'hi `some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      code: '`some text `',
      output: '`some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      code: 'hi `some text `',
      output: 'hi `some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      code: '`  some text `',
      output: '` some text `',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      code: '`   some text `',
      output: '` some text `',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      code: '` some text  `',
      output: '` some text `',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      code: '` some text   `',
      output: '` some text `',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      code: '`  some text  `',
      output: '`some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 4,
        },
        {
          messageId: 'style',
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      code: '`   some text  `',
      output: '`some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 5,
        },
        {
          messageId: 'style',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      code: '`  some text   `',
      output: '`some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 4,
        },
        {
          messageId: 'style',
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      code: '`   some text   `',
      output: '`some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 5,
        },
        {
          messageId: 'style',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },
    {
      code: '``  `some text` ``',
      output: '`` `some text` ``',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      code: '`` `some text`  ``',
      output: '`` `some text` ``',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      code: '``  `some text`  ``',
      output: '`` `some text` ``',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
        },
        {
          messageId: 'style',
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },
    {
      code: '``   `some text`   ``',
      output: '`` `some text` ``',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
        },
        {
          messageId: 'style',
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 19,
        },
      ],
    },

    // Tab
    {
      code: '`\tsome text\t`',
      output: '`some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
        },
        {
          messageId: 'style',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },

    // Space & Tab
    {
      code: '` \tsome text\t `',
      output: '`some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 4,
        },
        {
          messageId: 'style',
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
  ],
});
