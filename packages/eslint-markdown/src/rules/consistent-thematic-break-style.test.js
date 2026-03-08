/**
 * @fileoverview Test for `consistent-thematic-break-style.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../core/rule-tester.js';
import rule from './consistent-thematic-break-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-thematic-break-style', rule, {
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
      name: '`consistent` style - 1',
      code: '---',
    },
    {
      name: '`consistent` style - 2',
      code: '---\n\n---\n\n---',
    },
  ],

  invalid: [
    {
      name: '`consistent` style - 1',
      code: '---\n\n***\n\n___\n\n---',
      output: '---\n\n---\n\n---\n\n---',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 4,
          data: { style: '---' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 4,
          data: { style: '---' },
        },
      ],
    },
    {
      name: '`consistent` style - 2',
      code: '***\n\n___\n\n---\n\n***',
      output: '***\n\n***\n\n***\n\n***',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 4,
          data: { style: '***' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 4,
          data: { style: '***' },
        },
      ],
    },
    {
      name: '`consistent` style - 3',
      code: '___\n\n---\n\n***\n\n___',
      output: '___\n\n___\n\n___\n\n___',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 4,
          data: { style: '___' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 4,
          data: { style: '___' },
        },
      ],
    },
    {
      name: '`consistent` style with indentation - 1',
      code: '---\n\n ***',
      output: '---\n\n ---',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 2,
          endLine: 3,
          endColumn: 5,
          data: { style: '---' },
        },
      ],
    },
    {
      name: '`consistent` style with indentation - 2',
      code: '---\n\n  ***',
      output: '---\n\n  ---',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 6,
          data: { style: '---' },
        },
      ],
    },
    {
      name: '`consistent` style with indentation - 3',
      code: '---\n\n   ***',
      output: '---\n\n   ---',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 7,
          data: { style: '---' },
        },
      ],
    },
    {
      name: '`-----` style - 1',
      code: '---\n\n***\n\n___',
      output: '-----\n\n-----\n\n-----',
      options: [{ style: '-----' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
          data: { style: '-----' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 4,
          data: { style: '-----' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 4,
          data: { style: '-----' },
        },
      ],
    },
    {
      name: '`* * *` style - 1',
      code: '---\n\n***\n\n___',
      output: '* * *\n\n* * *\n\n* * *',
      options: [{ style: '* * *' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
          data: { style: '* * *' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 4,
          data: { style: '* * *' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 4,
          data: { style: '* * *' },
        },
      ],
    },

    // Blockquote
    {
      name: 'Blockquote - `consistent` style',
      code: '---\n\n> ***\n\n> ___',
      output: '---\n\n> ---\n\n> ---',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 6,
          data: { style: '---' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 3,
          endLine: 5,
          endColumn: 6,
          data: { style: '---' },
        },
      ],
    },
  ],
});
