/**
 * @fileoverview Test for `consistent-inline-code-style.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './consistent-inline-code-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
  valid: ['', '  ', '`some text`', '`` `backticks` ``', '` code `'],

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
