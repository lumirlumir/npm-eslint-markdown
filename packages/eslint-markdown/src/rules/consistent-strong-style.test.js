/**
 * @fileoverview Test for `consistent-strong-style.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ruleTester } from '../core/rule-tester.js';
import rule from './consistent-strong-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-strong-style', rule, {
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
      code: '**hi**',
    },
    {
      name: '`consistent` style - 2',
      code: '**hi**\n\n**hi**\n\n**hi**',
    },
    {
      name: '`consistent` style - 3',
      code: '__hi__\n\n__hi__\n\n__hi__',
    },
    {
      name: '`consistent` style - 4',
      code: '__*hi*__\n\n*__hi__*\n\n___hi___',
    },
    {
      name: '`consistent` style - 5',
      code: '**_hi_**\n\n_**hi**_\n\n***hi***',
    },
    {
      name: '`*` style - 1',
      code: '**hi**\n\n**hi**\n\n**hi**',
      options: [{ style: '*' }],
    },
    {
      name: '`_` style - 1',
      code: '__hi__\n\n__hi__\n\n__hi__',
      options: [{ style: '_' }],
    },
  ],

  invalid: [
    {
      name: '`consistent` style - 1',
      code: '**hi**\n\n__hi__\n\n**hi**\n\n__*hi*__',
      output: '**hi**\n\n**hi**\n\n**hi**\n\n***hi***',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
          data: { style: '**' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
          data: { style: '**' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 1,
          endLine: 7,
          endColumn: 3,
          data: { style: '**' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 7,
          endLine: 7,
          endColumn: 9,
          data: { style: '**' },
        },
      ],
    },
    {
      name: '`consistent` style - 2',
      code: '__hi__\n\n**hi**\n\n__hi__\n\n**_hi_**',
      output: '__hi__\n\n__hi__\n\n__hi__\n\n___hi___',
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
          data: { style: '__' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
          data: { style: '__' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 1,
          endLine: 7,
          endColumn: 3,
          data: { style: '__' },
        },
        {
          messageId: 'style',
          line: 7,
          column: 7,
          endLine: 7,
          endColumn: 9,
          data: { style: '__' },
        },
      ],
    },
    {
      name: '`*` style - 1',
      code: '__hi__\n\n__hi__',
      output: '**hi**\n\n**hi**',
      options: [{ style: '*' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: '**' },
        },
        {
          messageId: 'style',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
          data: { style: '**' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
          data: { style: '**' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
          data: { style: '**' },
        },
      ],
    },
    {
      name: '`_` style - 1',
      code: '**hi**\n\n**hi**',
      output: '__hi__\n\n__hi__',
      options: [{ style: '_' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: '__' },
        },
        {
          messageId: 'style',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
          data: { style: '__' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
          data: { style: '__' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 7,
          data: { style: '__' },
        },
      ],
    },
  ],
});
