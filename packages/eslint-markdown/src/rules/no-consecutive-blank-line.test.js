/**
 * @fileoverview Test for `no-consecutive-blank-line.js`.
 * @author lumir(lumirlumir)
 * NOTE: All test cases have been verified against `markdownlint`.
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
      name: '',
      code: `




`,
      output: '',
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 2,
          column: 1,
          endLine: 3,
          endColumn: 1,
        },
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
          endLine: 5,
          endColumn: 1,
        },
        {
          messageId: 'noConsecutiveBlankLine',
          line: 5,
          column: 1,
          endLine: 6,
          endColumn: 1,
        },
        {
          messageId: 'noConsecutiveBlankLine',
          line: 6,
          column: 1,
          endLine: 7,
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
          endLine: 5,
          endColumn: 1,
        },
      ],
    },
    {
      name: 'Trailing consecutive blank lines with spaces and tabs are reported by default',
      code: `foo


  \t  `,
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
          endLine: 5,
          endColumn: 1,
        },
      ],
    },
    {
      name: '',
      code: `foo


  \t\t
  \t  `,
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
          endLine: 5,
          endColumn: 1,
        },
        {
          messageId: 'noConsecutiveBlankLine',
          line: 5,
          column: 1,
          endLine: 6,
          endColumn: 1,
        },
      ],
    },

    // `skipCode` option
    {
      name: '`skipCode: false` option checks consecutive blank lines in fenced code',
      code: `\`\`\`js
foo


bar
\`\`\``,
      output: `\`\`\`js
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
    {
      name: '`skipCode: ["md"]` option checks consecutive blank lines in unannotated fenced code',
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
    {
      name: '`skipCode: ["js", "ts"]` option checks consecutive blank lines in unmatched fenced code',
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

    // `max` option
    {
      name: '`max: 2` option reports the third consecutive blank line',
      code: `foo



bar`,
      output: `foo


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
    {
      name: '`max: 5` option reports the sixth consecutive blank line',
      code: `foo






bar`,
      output: `foo





bar`,
      options: [{ max: 5 }],
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 7,
          column: 1,
          endLine: 8,
          endColumn: 1,
        },
      ],
    },
  ],
});
