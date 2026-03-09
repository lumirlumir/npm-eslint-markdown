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
    '` `',
    '`   `',
    '`some text`',
    '` some text `',
    '` code `',
    '`` `backticks` ``',
    '`` backtick` ``',
  ],

  invalid: [
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
    /*
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
    */ // TODO
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
    /*
    {
      code: '`\tsome text\t`',
      output: '`some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      code: '` \tsome text\t `',
      output: '`some text`',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    */
  ],
});
