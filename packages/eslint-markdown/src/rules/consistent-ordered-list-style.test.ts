/**
 * @fileoverview Test for `consistent-ordered-list-style.ts`.
 * @author Ga eun Lee
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './consistent-ordered-list-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-ordered-list-style', rule, {
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
      name: '`one_or_ordered` style - single item',
      code: '1. First',
    },
    {
      name: '`one_or_ordered` style - all prefixes are `1`',
      code: `1. First
1. Second
1. Third`,
    },
    {
      name: '`one_or_ordered` style - prefixes increase from `1`',
      code: `1. First
2. Second
3. Third`,
    },
    {
      name: '`one_or_ordered` style - prefixes increase from `0`',
      code: `0. First
1. Second
2. Third`,
    },
    {
      name: '`one` style - single item',
      code: '1. First',
      options: [{ style: 'one' }],
    },
    {
      name: '`one` style - all prefixes are `1`',
      code: `1. First
1. Second
1. Third`,
      options: [{ style: 'one' }],
    },
    {
      name: '`ordered` style - single item',
      code: '1. First',
      options: [{ style: 'ordered' }],
    },
    {
      name: '`ordered` style - prefixes increase from `1`',
      code: `1. First
2. Second
3. Third`,
      options: [{ style: 'ordered' }],
    },
    {
      name: '`ordered` style - prefixes increase from `0`',
      code: `0. First
1. Second
2. Third`,
      options: [{ style: 'ordered' }],
    },
    {
      name: '`zero` style - single item',
      code: '0. First',
      options: [{ style: 'zero' }],
    },
    {
      name: '`zero` style - all prefixes are `0`',
      code: `0. First
0. Second
0. Third`,
      options: [{ style: 'zero' }],
    },
    {
      name: 'Parenthesis delimiters',
      code: `1) First
1) Second
1) Third`,
    },
    {
      name: 'Prefixes with leading zeros',
      code: `00. First
01. Second
02. Third`,
    },
    {
      name: 'Nested ordered lists use independent prefix sequences',
      code: `1. Outer first
    1. Nested first
    2. Nested second
1. Outer second`,
    },
    {
      name: 'Ordered list in a blockquote',
      code: `> 1. First
> 1. Second`,
    },
    {
      name: 'Separate ordered lists use independent prefix sequences',
      code: `1. First
2. Second

Paragraph

1. First
1. Second`,
    },
    {
      name: 'Unordered lists are ignored',
      code: `- First
- Second

1. First
1. Second`,
    },
  ],

  invalid: [
    {
      name: '`one_or_ordered` style - single item does not start with `1`',
      code: '2. First',
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { expected: 1, actual: 2 },
        },
      ],
    },
    {
      name: '`one_or_ordered` style - infers `one` from the second prefix',
      code: `2. First
1. Second`,
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { expected: 1, actual: 2 },
        },
      ],
    },
    {
      name: '`one_or_ordered` style - infers `ordered` from a zero prefix',
      code: `0. First
0. Second
0. Third`,
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 1, actual: 0 },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 2, actual: 0 },
        },
      ],
    },
    {
      name: '`one_or_ordered` style - prefixes do not increase sequentially',
      code: `1. First
3. Second
4. Third`,
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 2, actual: 3 },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 3, actual: 4 },
        },
      ],
    },
    {
      name: '`one_or_ordered` style - prefixes do not remain `1`',
      code: `1. First
1. Second
2. Third`,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 1, actual: 2 },
        },
      ],
    },
    {
      name: '`one` style - single item does not start with `1`',
      code: '2. First',
      options: [{ style: 'one' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { expected: 1, actual: 2 },
        },
      ],
    },
    {
      name: '`one` style - prefixes are not all `1`',
      code: `1. First
2. Second
3. Third`,
      options: [{ style: 'one' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 1, actual: 2 },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 1, actual: 3 },
        },
      ],
    },
    {
      name: '`ordered` style - single item does not start with `1`',
      code: '0. First',
      options: [{ style: 'ordered' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { expected: 1, actual: 0 },
        },
      ],
    },
    {
      name: '`ordered` style - prefixes do not increase',
      code: `1. First
1. Second
1. Third`,
      options: [{ style: 'ordered' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 2, actual: 1 },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 3, actual: 1 },
        },
      ],
    },
    {
      name: '`zero` style - single item does not start with `0`',
      code: '1. First',
      options: [{ style: 'zero' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { expected: 0, actual: 1 },
        },
      ],
    },
    {
      name: '`zero` style - prefixes are not all `0`',
      code: `0. First
1. Second
2. Third`,
      options: [{ style: 'zero' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 2,
          data: { expected: 0, actual: 1 },
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 2,
          data: { expected: 0, actual: 2 },
        },
      ],
    },
    {
      name: 'Nested ordered lists report their own prefix sequence',
      code: `1. Outer first
    1. Nested first
    3. Nested second
1. Outer second`,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 5,
          endLine: 3,
          endColumn: 6,
          data: { expected: 2, actual: 3 },
        },
      ],
    },
    {
      name: 'Ordered lists in blockquotes report the prefix location',
      code: `> 1. First
> 3. Second`,
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 4,
          data: { expected: 2, actual: 3 },
        },
      ],
    },
    {
      name: 'Multi-digit prefixes report the entire number',
      code: `1. First
10. Second`,
      options: [{ style: 'one' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
          data: { expected: 1, actual: 10 },
        },
      ],
    },
  ],
});
