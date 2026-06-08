/**
 * @fileoverview Test for `no-consecutive-blank-line.js`.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-consecutive-blank-line.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-consecutive-blank-line', rule, {
  valid: [
    '',
    '  ',
    'foo',
    // Basic
    `foo

bar`,
    `foo
\t \t
bar`,

    // `max` option
    {
      code: `foo

bar`,
      options: [{ max: 1 }],
    },
    {
      code: `foo


bar`,
      options: [{ max: 2 }],
    },

    // `skipCode` option
    {
      code: `\`\`\`


\`\`\``,
      options: [{ skipCode: true }],
    },
    {
      code: `\`\`\`md
foo


bar
\`\`\``,
      options: [{ skipCode: ['md'] }],
    },
    {
      code: `\`\`\`md
foo


bar
\`\`\`

\`\`\`txt
baz


qux
\`\`\``,
      options: [{ skipCode: ['md', 'txt'] }],
    },
  ],

  invalid: [
    // Basic
    {
      name: 'Consecutive blank lines are reported by default',
      code: `foo


bar`,
      output: `foo

bar`,
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 3,
          column: 1,
          endLine: 4,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'Leading consecutive blank lines are reported by default',
      code: `

foo`,
      output: `
foo`,
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 2,
          column: 1,
          endLine: 3,
          endColumn: 1,
        },
      ],
    },
    /*
    {
      name: 'Trailing consecutive blank lines are reported by default',
      code: `foo


`,
      output: `foo
`,
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 3,
          column: 1,
          endLine: 4,
          endColumn: 1,
        },
        {
          messageId: 'noConsecutiveBlankLine',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 1,
        },
      ],
    },
    */

    // `skipCode` option
    {
      code: `\`\`\`md
foo


bar
\`\`\``,
      output: `\`\`\`md
foo

bar
\`\`\``,
      options: [{ skipCode: ['js', 'ts'] }],
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 4,
          column: 1,
          endLine: 5,
          endColumn: 1,
        },
      ],
    },
    {
      code: `\`\`\`
foo


bar
\`\`\``,
      output: `\`\`\`
foo

bar
\`\`\``,
      options: [{ skipCode: ['md'] }],
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 4,
          column: 1,
          endLine: 5,
          endColumn: 1,
        },
      ],
    },

    /*
    {
      name: '`max: 0` option reports the blank line between paragraphs',
      code: `foo

bar`,
      options: [{ max: 0 }],
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 2,
          column: 1,
          endLine: 3,
          endColumn: 1,
        },
      ],
    },
    {
      name: '`max: 2` option reports the third consecutive blank line',
      code: `foo



bar`,
      options: [{ max: 2 }],
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 4,
          column: 1,
          endLine: 5,
          endColumn: 1,
        },
      ],
    },
    */
    /*
    {
      name: '`skipCode: false` option checks consecutive blank lines in fenced code',
      code: `\`\`\`js
foo


bar
\`\`\``,
      options: [{ skipCode: false }],
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 4,
          column: 1,
          endLine: 5,
          endColumn: 1,
        },
      ],
    },
    */
  ],
});
