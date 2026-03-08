/**
 * @fileoverview Test for `no-curly-quote.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ruleTester } from '../core/rule-tester.js';
import rule from './no-curly-quote.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-curly-quote', rule, {
  valid: [
    // Default
    '',
    ' ',
    '"',
    "'",

    // With options
    {
      name: 'Zero width string with all options disabled',
      code: '',
      options: [
        {
          checkLeftDoubleQuotationMark: false,
          checkRightDoubleQuotationMark: false,
          checkLeftSingleQuotationMark: false,
          checkRightSingleQuotationMark: false,
        },
      ],
    },
    {
      name: 'Empty string with all options disabled',
      code: ' ',
      options: [
        {
          checkLeftDoubleQuotationMark: false,
          checkRightDoubleQuotationMark: false,
          checkLeftSingleQuotationMark: false,
          checkRightSingleQuotationMark: false,
        },
      ],
    },
    {
      name: 'Quotes with all options disabled',
      code: '\u201C\u201D\u2018\u2019',
      options: [
        {
          checkLeftDoubleQuotationMark: false,
          checkRightDoubleQuotationMark: false,
          checkLeftSingleQuotationMark: false,
          checkRightSingleQuotationMark: false,
        },
      ],
    },
    {
      name: 'Disable left double quotation mark',
      code: '“',
      options: [
        {
          checkLeftDoubleQuotationMark: false,
        },
      ],
    },
    {
      name: 'Disable right double quotation mark',
      code: '”',
      options: [
        {
          checkRightDoubleQuotationMark: false,
        },
      ],
    },
    {
      name: 'Disable left single quotation mark',
      code: '‘',
      options: [
        {
          checkLeftSingleQuotationMark: false,
        },
      ],
    },
    {
      name: 'Disable right single quotation mark',
      code: '’',
      options: [
        {
          checkRightSingleQuotationMark: false,
        },
      ],
    },
  ],

  invalid: [
    {
      name: 'Left double quotation mark in raw text',
      code: '“',
      output: '"',
      errors: [
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Right double quotation mark in raw text',
      code: '”',
      output: '"',
      errors: [
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Left single quotation mark in raw text',
      code: '‘',
      output: "'",
      errors: [
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Right single quotation mark in raw text',
      code: '’',
      output: "'",
      errors: [
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Left double quotation mark in unicode escape',
      code: '\u201C foo',
      output: '" foo',
      errors: [
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Right double quotation mark in unicode escape',
      code: '\u201D foo',
      output: '" foo',
      errors: [
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Left single quotation mark in unicode escape',
      code: '\u2018 foo',
      output: "' foo",
      errors: [
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Right single quotation mark in unicode escape',
      code: '\u2019 foo',
      output: "' foo",
      errors: [
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
      ],
    },
    {
      name: 'Mixed curly quotes in raw text',
      code: `“foo” ‘bar’
  “  ”
‘  ’`,
      output: `"foo" 'bar'
  "  "
'  '`,
      errors: [
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
        },
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
        },
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 7,
          endLine: 1,
          endColumn: 8,
        },
        {
          messageId: 'noCurlyQuote',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
        },
        {
          messageId: 'noCurlyQuote',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
        },
        {
          messageId: 'noCurlyQuote',
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 7,
        },
        {
          messageId: 'noCurlyQuote',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
        },
        {
          messageId: 'noCurlyQuote',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
        },
      ],
    },
  ],
});
