/**
 * @fileoverview Test for `consistent-inline-code-style.js`.
 * @author 루밀LuMir(lumirlumir)
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
    '`some text`',
    '`` `backticks` ``',
    '`` backtick` ``',
    '` code `',
    '` `',
    '`   `',
  ],

  invalid: [
    {
      code: '` some text`',
      output: '`some text`',
      errors: [{ messageId: 'style' }],
    },
    {
      code: '`some text `',
      output: '`some text`',
      errors: [{ messageId: 'style' }],
    },
    {
      code: '`   some text   `',
      output: '`some text`',
      errors: [{ messageId: 'style' }],
    },
    {
      code: '`\tsome text\t`',
      output: '`some text`',
      errors: [{ messageId: 'style' }],
    },
    {
      code: '` \tsome text\t `',
      output: '`some text`',
      errors: [{ messageId: 'style' }],
    },
  ],
});
