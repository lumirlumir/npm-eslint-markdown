/**
 * @fileoverview Test for `consistent-delete-style.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ruleTester } from '../core/rule-tester.js';
import rule from './consistent-delete-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-delete-style', rule, {
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
      code: '~hi~',
    },
    {
      name: '`consistent` style - 2',
      code: '~hi~\n\n~hi~\n\n~hi~',
    },
    {
      name: '`consistent` style - 3',
      code: '~~hi~~\n\n~~hi~~\n\n~~hi~~',
    },
    {
      name: '`consistent` style - 4',
      code: '__~hi~__\n\n~__hi__~\n\n**~hi~**',
    },
    {
      name: '`consistent` style - 5',
      code: '~~_hi_~~\n\n_~~hi~~_\n\n__~~hi~~__',
    },
    {
      name: '`~` style - 1',
      code: '~hi~\n\n~hi~\n\n~hi~',
      options: [{ style: '~' }],
    },
    {
      name: '`~~` style - 1',
      code: '~~hi~~\n\n~~hi~~\n\n~~hi~~',
      options: [{ style: '~~' }],
    },
  ],

  invalid: [
    {
      name: '`consistent` style - 1',
      code: '~hi~\n\n~~hi~~\n\n~hi~\n\n~~_hi_~~',
      output: '~hi~\n\n~hi~\n\n~hi~\n\n~_hi_~',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
          data: { style: '~' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
          data: { style: '~' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 1,
          endLine: 7,
          endColumn: 3,
          data: { style: '~' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 7,
          endLine: 7,
          endColumn: 9,
          data: { style: '~' },
        },
      ],
    },
    {
      name: '`consistent` style - 2',
      code: '~~hi~~\n\n~hi~\n\n~~hi~~\n\n__~hi~__',
      output: '~~hi~~\n\n~~hi~~\n\n~~hi~~\n\n__~~hi~~__',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: '~~' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
          data: { style: '~~' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 3,
          endLine: 7,
          endColumn: 4,
          data: { style: '~~' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 6,
          endLine: 7,
          endColumn: 7,
          data: { style: '~~' },
        },
      ],
    },
    {
      name: '`~` style - 1',
      code: '~~hi~~\n\n~~hi~~',
      output: '~hi~\n\n~hi~',
      options: [{ style: '~' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: '~' },
        },
        {
          messageId: 'style',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
          data: { style: '~' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
          data: { style: '~' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
          data: { style: '~' },
        },
      ],
    },
    {
      name: '`~~` style - 1',
      code: '~hi~\n\n~hi~',
      output: '~~hi~~\n\n~~hi~~',
      options: [{ style: '~~' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: '~~' },
        },
        {
          messageId: 'style',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { style: '~~' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: '~~' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
          data: { style: '~~' },
        },
      ],
    },
  ],
});
