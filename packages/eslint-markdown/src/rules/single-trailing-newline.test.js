/**
 * @fileoverview Test for `single-trailing-newline.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../core/rule-tester.js';
import rule from './single-trailing-newline.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('single-trailing-newline', rule, {
  valid: [
    {
      name: 'Empty file',
      code: '',
    },
    {
      name: 'File with a single LF newline',
      code: '# Heading\n',
    },
    {
      name: 'File with a single CRLF newline',
      code: '# Heading\r\n',
    },
    {
      name: 'File with internal blank lines and one trailing newline',
      code: '# Heading\n\nBody\n',
    },
  ],

  invalid: [
    {
      name: 'File without a trailing newline',
      code: '# Heading',
      output: '# Heading\n',
      errors: [
        {
          messageId: 'singleTrailingNewline',
        },
      ],
    },
    {
      name: 'File with CRLF line endings but without a trailing newline',
      code: '# Heading\r\nBody',
      output: '# Heading\r\nBody\r\n',
      errors: [
        {
          messageId: 'singleTrailingNewline',
        },
      ],
    },
    {
      name: 'File with multiple trailing LF newlines',
      code: '# Heading\n\n',
      output: '# Heading\n',
      errors: [
        {
          messageId: 'singleTrailingNewline',
        },
      ],
    },
    {
      name: 'File with multiple trailing CRLF newlines',
      code: '# Heading\r\n\r\n',
      output: '# Heading\r\n',
      errors: [
        {
          messageId: 'singleTrailingNewline',
        },
      ],
    },
  ],
});
