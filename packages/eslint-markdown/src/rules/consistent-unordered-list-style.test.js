/**
 * @fileoverview Test for `consistent-unordered-list-style.js`.
 * @author hyoban
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './consistent-unordered-list-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
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
      name: '`consistent` style - all dashes',
      code: '- item 1\n- item 2\n- item 3',
    },
    {
      name: '`consistent` style - all asterisks',
      code: '* item 1\n* item 2\n* item 3',
    },
    {
      name: '`consistent` style - all plus signs',
      code: '+ item 1\n+ item 2\n+ item 3',
    },
    {
      name: '`consistent` style - nested lists',
      code: '- item 1\n  - nested 1\n  - nested 2\n- item 2',
    },
    {
      name: '`consistent` style - mixed ordered and unordered lists',
      code: '- item 1\n- item 2\n\n1. ordered 1\n2. ordered 2',
    },
    {
      name: '`consistent` style - task lists',
      code: '- [ ] task 1\n- [x] task 2\n- [ ] task 3',
      language: 'markdown/gfm',
    },
    {
      name: '`-` style',
      code: '- item 1\n- item 2\n- item 3',
      options: [{ style: '-' }],
    },
    {
      name: '`*` style',
      code: '* item 1\n* item 2\n* item 3',
      options: [{ style: '*' }],
    },
    {
      name: '`+` style',
      code: '+ item 1\n+ item 2\n+ item 3',
      options: [{ style: '+' }],
    },
    {
      name: '`sublist` style - `sublist` basically behaves like `consistent` at depth 0 - all dashes',
      code: '- item 1\n- item 2',
      options: [{ style: 'sublist' }],
    },
    {
      name: '`sublist` style - `sublist` basically behaves like `consistent` at depth 0 - all asterisks',
      code: '* item 1\n* item 2',
      options: [{ style: 'sublist' }],
    },
    {
      name: '`sublist` style - `sublist` basically behaves like `consistent` at depth 0 - all plus signs',
      code: '+ item 1\n+ item 2',
      options: [{ style: 'sublist' }],
    },
    {
      name: '`sublist` style - nested lists',
      code: '* item 1\n  + nested 1\n    - deeply nested\n* item 2',
      options: [{ style: 'sublist' }],
    },
    {
      name: '`sublist` style - depth cycles after 3',
      code: '* depth 0\n  + depth 1\n    - depth 2\n      * depth 3 (cycles back)',
      options: [{ style: 'sublist' }],
    },
    {
      name: 'Ordered lists should be ignored',
      code: '1. item 1\n2. item 2\n3. item 3',
    },
  ],

  invalid: [
    {
      name: '`consistent` style - mixed markers (dash first)',
      code: '- item 1\n* item 2\n+ item 3',
      output: '- item 1\n- item 2\n- item 3',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: '-' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: '-' },
        },
      ],
    },
    {
      name: '`consistent` style - mixed markers (asterisk first)',
      code: '* item 1\n- item 2\n+ item 3',
      output: '* item 1\n* item 2\n* item 3',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
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
      ],
    },
    {
      name: '`consistent` style - mixed markers (plus signs first)',
      code: '+ item 1\n- item 2\n* item 3',
      output: '+ item 1\n+ item 2\n+ item 3',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: '+' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: '+' },
        },
      ],
    },
    {
      name: '`consistent` style - nested list with inconsistent markers',
      code: '- item 1\n  * nested 1\n  - nested 2\n- item 2',
      output: '- item 1\n  - nested 1\n  - nested 2\n- item 2',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
          data: { style: '-' },
        },
      ],
    },
    {
      name: '`consistent` style - task list with inconsistent markers',
      code: '- [ ] task 1\n* [x] task 2\n+ [ ] task 3',
      output: '- [ ] task 1\n- [x] task 2\n- [ ] task 3',
      language: 'markdown/gfm',
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: '-' },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { style: '-' },
        },
      ],
    },
    {
      name: '`-` style - wrong markers',
      code: '* item 1\n+ item 2\n- item 3',
      output: '- item 1\n- item 2\n- item 3',
      options: [{ style: '-' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: '-' },
        },
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: '-' },
        },
      ],
    },
    {
      name: '`*` style - wrong markers',
      code: '- item 1\n+ item 2\n* item 3',
      output: '* item 1\n* item 2\n* item 3',
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
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: '*' },
        },
      ],
    },
    {
      name: '`+` style - wrong markers',
      code: '- item 1\n* item 2\n+ item 3',
      output: '+ item 1\n+ item 2\n+ item 3',
      options: [{ style: '+' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: '+' },
        },
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { style: '+' },
        },
      ],
    },
    {
      name: '`sublist` style - depth cycles after 3',
      code: '* depth 0\n  + depth 1\n    - depth 2\n      - depth 3 (cycles back)',
      output: '* depth 0\n  + depth 1\n    - depth 2\n      * depth 3 (cycles back)',
      options: [{ style: 'sublist' }],
      errors: [
        {
          messageId: 'style',
          line: 4,
          column: 7,
          endLine: 4,
          endColumn: 8,
          data: { style: '*' },
        },
      ],
    },
    {
      name: '`sublist` style - depth cycles after 3',
      code: '- depth 0\n  + depth 1\n    * depth 2\n      + depth 3 (cycles back)',
      output: '- depth 0\n  + depth 1\n    * depth 2\n      - depth 3 (cycles back)',
      options: [{ style: 'sublist' }],
      errors: [
        {
          messageId: 'style',
          line: 4,
          column: 7,
          endLine: 4,
          endColumn: 8,
          data: { style: '-' },
        },
      ],
    },
    {
      name: '`sublist` style - `markdownlint` example 1',
      code: `
* depth 0
  * depth 1
    * depth 2`,
      output: `
* depth 0
  - depth 1
    * depth 2`,
      options: [{ style: 'sublist' }],
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 4,
          data: { style: '-' },
        },
      ],
    },
    {
      name: '`sublist` style - `markdownlint` example 2',
      code: `
* depth 0
  * depth 1
    - depth 2`,
      output: `
* depth 0
  - depth 1
    + depth 2`,
      options: [{ style: 'sublist' }],
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 4,
          data: { style: '-' },
        },
        {
          messageId: 'style',
          line: 4,
          column: 5,
          endLine: 4,
          endColumn: 6,
          data: { style: '+' },
        },
      ],
    },
  ],
});
