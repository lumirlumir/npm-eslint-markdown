/**
 * @fileoverview Test for `no-double-punctuation.js`.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.ts';
import rule from './no-double-punctuation.ts';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-double-punctuation', rule, {
  valid: [
    '',
    '  ',
    '!',
    ',',
    '.',
    ':',
    ';',
    '?',
    '!!!',
    ',,,',
    '...',
    ':::',
    ';;;',
    '???',
    'Foo! Bar? Baz.',
    'Foo... Bar!!! Baz!!?',
    'Foo?!? Bar,.; Baz;:!',
    '`Foo!!` and `Bar??`', // `InlineCode` is ignored.
    '```md\nFoo!!\nBar??\n```', // `Code` is ignored.

    // `allow` option
    {
      code: 'Foo!!',
      options: [
        {
          allow: ['!!'],
        },
      ],
    },
    {
      code: 'Foo?! Bar..',
      options: [
        {
          allow: ['?!', '..'],
        },
      ],
    },
    {
      code: 'Typo,.',
      options: [
        {
          allow: [',.'],
        },
      ],
    },
  ],

  invalid: [
    {
      code: '!!',
      output: '!',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: '!!',
          },
          suggestions: undefined,
        },
      ],
    },
    {
      code: ',,',
      output: ',',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: ',,',
          },
          suggestions: undefined,
        },
      ],
    },
    {
      code: '..',
      output: '.',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: '..',
          },
          suggestions: undefined,
        },
      ],
    },
    {
      code: '::',
      output: ':',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: '::',
          },
          suggestions: undefined,
        },
      ],
    },
    {
      code: ';;',
      output: ';',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: ';;',
          },
          suggestions: undefined,
        },
      ],
    },
    {
      code: '??',
      output: '?',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: {
            punctuation: '??',
          },
          suggestions: undefined,
        },
      ],
    },
    {
      code: 'Foo!!',
      output: 'Foo!',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
          data: {
            punctuation: '!!',
          },
          suggestions: undefined,
        },
      ],
    },
    {
      code: 'Foo?!',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
          data: {
            punctuation: '?!',
          },
          suggestions: [
            {
              output: 'Foo?',
              messageId: 'suggestReplaceWithLeft',
              data: {
                punctuation: '?!',
                leftPunctuation: '?',
              },
            },
            {
              output: 'Foo!',
              messageId: 'suggestReplaceWithRight',
              data: {
                punctuation: '?!',
                rightPunctuation: '!',
              },
            },
          ],
        },
      ],
    },
    {
      code: `# Heading!!

> Quote::

- Item??`,
      output: `# Heading!

> Quote:

- Item?`,
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: '!!',
          },
          suggestions: undefined,
        },
        {
          messageId: 'noDoublePunctuation',
          line: 3,
          column: 8,
          endLine: 3,
          endColumn: 10,
          data: {
            punctuation: '::',
          },
          suggestions: undefined,
        },
        {
          messageId: 'noDoublePunctuation',
          line: 5,
          column: 7,
          endLine: 5,
          endColumn: 9,
          data: {
            punctuation: '??',
          },
          suggestions: undefined,
        },
      ],
    },
    {
      code: '**Strong!!** and *Emphasis??* and [Link::](https://example.com)',
      output: '**Strong!** and *Emphasis?* and [Link:](https://example.com)',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 9,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '!!',
          },
          suggestions: undefined,
        },
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 27,
          endLine: 1,
          endColumn: 29,
          data: {
            punctuation: '??',
          },
          suggestions: undefined,
        },
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 40,
          endLine: 1,
          endColumn: 42,
          data: {
            punctuation: '::',
          },
          suggestions: undefined,
        },
      ],
    },
    {
      code: 'Foo!! `code??` Bar?!',
      output: 'Foo! `code??` Bar?!',
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
          data: {
            punctuation: '!!',
          },
          suggestions: undefined,
        },
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 19,
          endLine: 1,
          endColumn: 21,
          data: {
            punctuation: '?!',
          },
          suggestions: [
            {
              output: 'Foo!! `code??` Bar?',
              messageId: 'suggestReplaceWithLeft',
              data: {
                punctuation: '?!',
                leftPunctuation: '?',
              },
            },
            {
              output: 'Foo!! `code??` Bar!',
              messageId: 'suggestReplaceWithRight',
              data: {
                punctuation: '?!',
                rightPunctuation: '!',
              },
            },
          ],
        },
      ],
    },
    {
      code: `Foo!!
Bar..
Baz;:`,
      output: `Foo!
Bar.
Baz;:`,
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 6,
          data: {
            punctuation: '!!',
          },
          suggestions: undefined,
        },
        {
          messageId: 'noDoublePunctuation',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 6,
          data: {
            punctuation: '..',
          },
          suggestions: undefined,
        },
        {
          messageId: 'noDoublePunctuation',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 6,
          data: {
            punctuation: ';:',
          },
          suggestions: [
            {
              output: `Foo!!
Bar..
Baz;`,
              messageId: 'suggestReplaceWithLeft',
              data: {
                punctuation: ';:',
                leftPunctuation: ';',
              },
            },
            {
              output: `Foo!!
Bar..
Baz:`,
              messageId: 'suggestReplaceWithRight',
              data: {
                punctuation: ';:',
                rightPunctuation: ':',
              },
            },
          ],
        },
      ],
    },

    // `allow` option
    {
      code: 'Foo!! Bar?!',
      options: [
        {
          allow: ['!!'],
        },
      ],
      errors: [
        {
          messageId: 'noDoublePunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: '?!',
          },
          suggestions: [
            {
              output: 'Foo!! Bar?',
              messageId: 'suggestReplaceWithLeft',
              data: {
                punctuation: '?!',
                leftPunctuation: '?',
              },
            },
            {
              output: 'Foo!! Bar!',
              messageId: 'suggestReplaceWithRight',
              data: {
                punctuation: '?!',
                rightPunctuation: '!',
              },
            },
          ],
        },
      ],
    },
  ],
});
