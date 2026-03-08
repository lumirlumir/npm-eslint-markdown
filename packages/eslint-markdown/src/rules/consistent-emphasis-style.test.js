/**
 * @fileoverview Test for `consistent-emphasis-style.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ruleTester } from '../core/tests/index.js';
import rule from './consistent-emphasis-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-emphasis-style', rule, {
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
      code: '*hi*',
    },
    {
      name: '`consistent` style - 2',
      code: '*hi*\n\n*hi*\n\n*hi*',
    },
    {
      name: '`consistent` style - 3',
      code: '_hi_\n\n_hi_\n\n_hi_',
    },
    {
      name: '`consistent` style - 4',
      code: '__*hi*__\n\n*__hi__*\n\n***hi***',
    },
    {
      name: '`consistent` style - 5',
      code: '**_hi_**\n\n_**hi**_\n\n___hi___',
    },
    {
      name: '`*` style - 1',
      code: '*hi*\n\n*hi*\n\n*hi*',
      options: [{ style: '*' }],
    },
    {
      name: '`_` style - 1',
      code: '_hi_\n\n_hi_\n\n_hi_',
      options: [{ style: '_' }],
    },
  ],

  invalid: [
    {
      name: '`consistent` style - 1',
      code: '*hi*\n\n_hi_\n\n*hi*\n\n**_hi_**',
      output: '*hi*\n\n*hi*\n\n*hi*\n\n***hi***',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: '*' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
          data: { style: '*' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 3,
          endLine: 7,
          endColumn: 4,
          data: { style: '*' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 6,
          endLine: 7,
          endColumn: 7,
          data: { style: '*' },
        },
      ],
    },
    {
      name: '`consistent` style - 2',
      code: '_hi_\n\n*hi*\n\n_hi_\n\n__*hi*__',
      output: '_hi_\n\n_hi_\n\n_hi_\n\n___hi___',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: '_' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
          data: { style: '_' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 3,
          endLine: 7,
          endColumn: 4,
          data: { style: '_' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 6,
          endLine: 7,
          endColumn: 7,
          data: { style: '_' },
        },
      ],
    },
    {
      name: '`*` style - 1',
      code: '_hi_\n\n_hi_',
      output: '*hi*\n\n*hi*',
      options: [{ style: '*' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: '*' },
        },
        {
          messageId: 'style',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { style: '*' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: '*' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
          data: { style: '*' },
        },
      ],
    },
    {
      name: '`_` style - 1',
      code: '*hi*\n\n*hi*',
      output: '_hi_\n\n_hi_',
      options: [{ style: '_' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: '_' },
        },
        {
          messageId: 'style',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { style: '_' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: '_' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
          data: { style: '_' },
        },
      ],
    },
  ],
});
