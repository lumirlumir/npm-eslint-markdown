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
    {
      name: 'Empty document has no blank lines',
      code: '',
    },
    {
      name: 'Single blank line between paragraphs is allowed by default',
      code: `foo

bar`,
    },
    {
      name: 'Single blank line containing spaces and tabs is allowed by default',
      code: 'foo\n \t \nbar',
    },
    {
      name: '`max` option allows two consecutive blank lines',
      code: `foo


bar`,
      options: [{ max: 2 }],
    },
    {
      name: 'Inline code without consecutive blank lines is allowed',
      code: '`foo`',
    },
  ],

  invalid: [
    {
      name: 'Two blank lines between paragraphs are reported by default',
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
    /*
    {
      name: 'Leading consecutive blank lines are reported by default',
      code: `

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
      errors: [
        {
          messageId: 'noConsecutiveBlankLine',
          line: 3,
          column: 1,
          endLine: 5,
          endColumn: 1,
        },
      ],
    },
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
