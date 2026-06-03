/**
 * @fileoverview Test for `require-heading-id.js`.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './require-heading-id.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('require-heading-id', rule, {
  valid: [
    // Default
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty String',
      code: '  ',
    },

    // Default: ATX Headings
    {
      name: 'ATX: Correct h1 heading ID',
      code: '# Heading 1 {#heading-1}',
    },
    {
      name: 'ATX: Correct h2 heading ID',
      code: '## Heading 2 {#heading-2}',
    },
    {
      name: 'ATX: Correct h3 heading ID',
      code: '### Heading 3 {#heading-3}',
    },
    {
      name: 'ATX: Correct h4 heading ID',
      code: '#### Heading 4 {#heading-4}',
    },
    {
      name: 'ATX: Correct h5 heading ID',
      code: '##### Heading 5 {#heading-5}',
    },
    {
      name: 'ATX: Correct h6 heading ID',
      code: '###### Heading 6 {#heading-6}',
    },

    // Default: ATX Closed Headings
    {
      name: 'ATX Closed: Correct h1 heading ID',
      code: '# Heading 1 {#heading-1} #',
    },
    {
      name: 'ATX Closed: Correct h2 heading ID',
      code: '## Heading 2 {#heading-2} ##',
    },
    {
      name: 'ATX Closed: Correct h3 heading ID',
      code: '### Heading 3 {#heading-3} ###',
    },
    {
      name: 'ATX Closed: Correct h4 heading ID',
      code: '#### Heading 4 {#heading-4} ####',
    },
    {
      name: 'ATX Closed: Correct h5 heading ID',
      code: '##### Heading 5 {#heading-5} #####',
    },
    {
      name: 'ATX Closed: Correct h6 heading ID',
      code: '###### Heading 6 {#heading-6} ######',
    },

    // Default: Setext Headings
    {
      name: 'Setext: Correct h1 heading ID',
      code: 'Heading 1 {#heading-1}\n=========',
    },
    {
      name: 'Setext: Correct multiline h1 heading ID',
      code: 'Heading 1\nMultiple Lines {#heading-1}\n=========',
    },
    {
      name: 'Setext: Correct h2 heading ID',
      code: 'Heading 2 {#heading-2}\n---------',
    },
    {
      name: 'Setext: Correct multiline h2 heading ID',
      code: 'Heading 2\nMultiple Lines {#heading-2}\n---------',
    },

    // Default: Edge Cases
    {
      name: 'ATX: h1 heading ID and trailing spaces',
      code: '# Heading {#id}  ',
    },

    // `never` option: ATX Headings
    {
      name: 'ATX: No h1 heading ID',
      code: '# Heading 1',
      options: ['never'],
    },
    {
      name: 'ATX: No h2 heading ID',
      code: '## Heading 2',
      options: ['never'],
    },
    {
      name: 'ATX: No h3 heading ID',
      code: '### Heading 3',
      options: ['never'],
    },
    {
      name: 'ATX: No h4 heading ID',
      code: '#### Heading 4',
      options: ['never'],
    },
    {
      name: 'ATX: No h5 heading ID',
      code: '##### Heading 5',
      options: ['never'],
    },
    {
      name: 'ATX: No h6 heading ID',
      code: '###### Heading 6',
      options: ['never'],
    },

    // `never` option: ATX Closed Headings
    {
      name: 'ATX Closed: No h1 heading ID',
      code: '# Heading 1 #',
      options: ['never'],
    },
    {
      name: 'ATX Closed: No h2 heading ID',
      code: '## Heading 2 ##',
      options: ['never'],
    },
    {
      name: 'ATX Closed: No h3 heading ID',
      code: '### Heading 3 ###',
      options: ['never'],
    },
    {
      name: 'ATX Closed: No h4 heading ID',
      code: '#### Heading 4 ####',
      options: ['never'],
    },
    {
      name: 'ATX Closed: No h5 heading ID',
      code: '##### Heading 5 #####',
      options: ['never'],
    },
    {
      name: 'ATX Closed: No h6 heading ID',
      code: '###### Heading 6 ######',
      options: ['never'],
    },

    // `never` option: Setext Headings
    {
      name: 'Setext: No h1 heading ID',
      code: 'Heading 1\n=========',
      options: ['never'],
    },
    {
      name: 'Setext: No multiline h1 heading ID',
      code: 'Heading 1\nMultiple Lines\n=========',
      options: ['never'],
    },
    {
      name: 'Setext: No h2 heading ID',
      code: 'Heading 2\n---------',
      options: ['never'],
    },
    {
      name: 'Setext: No multiline h2 heading ID',
      code: 'Heading 2\nMultiple Lines\n---------',
      options: ['never'],
    },

    // `leftDelimiter` and `rightDelimiter` option
    {
      name: 'ATX: Custom Delimiters `[`, `]`',
      code: '# Heading [#id]',
      options: [
        'always',
        {
          leftDelimiter: '[',
          rightDelimiter: ']',
        },
      ],
    },
    {
      name: 'ATX: Custom Delimiters `|`, `|`',
      code: '# Heading |#id|',
      options: [
        'always',
        {
          leftDelimiter: '|',
          rightDelimiter: '|',
        },
      ],
    },

    // `allowDepths` option
    {
      name: 'ATX: Ignore h1 heading ID',
      code: '# Heading',
      options: [
        'always',
        {
          allowDepths: [1],
        },
      ],
    },
    {
      name: 'ATX: Ignore h1, h2, h3 heading ID',
      code: '# Heading 1\n\n## Heading 2\n\n### Heading 3',
      options: [
        'always',
        {
          allowDepths: [1, 2, 3],
        },
      ],
    },
  ],

  invalid: [
    // Default: ATX Headings
    {
      name: 'ATX: Missing h1 heading ID',
      code: '# Heading 1',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'ATX: Missing h2 heading ID',
      code: '## Heading 2',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      name: 'ATX: Missing h3 heading ID',
      code: '### Heading 3',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'ATX: Missing h4 heading ID',
      code: '#### Heading 4',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      name: 'ATX: Missing h5 heading ID',
      code: '##### Heading 5',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      name: 'ATX: Missing h6 heading ID',
      code: '###### Heading 6',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },

    // Default: Edge Cases
    {
      name: 'ATX: h1 heading ID with nothing',
      code: '# Heading {#}',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'ATX: h1 heading ID with leading space',
      code: '# Heading { #id}',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },

    // `never` option: ATX Headings
    {
      name: 'ATX: h1 heading ID exists',
      code: '# Heading {#id}',
      output: '# Heading ',
      errors: [
        {
          messageId: 'headingIdNever',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 16,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h2 heading ID exists',
      code: '## Heading {#id}',
      output: '## Heading ',
      errors: [
        {
          messageId: 'headingIdNever',
          line: 1,
          column: 12,
          endLine: 1,
          endColumn: 17,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h3 heading ID exists',
      code: '### Heading {#id}',
      output: '### Heading ',
      errors: [
        {
          messageId: 'headingIdNever',
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 18,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h4 heading ID exists',
      code: '#### Heading {#id}',
      output: '#### Heading ',
      errors: [
        {
          messageId: 'headingIdNever',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 19,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h5 heading ID exists',
      code: '##### Heading {#id}',
      output: '##### Heading ',
      errors: [
        {
          messageId: 'headingIdNever',
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 20,
        },
      ],
      options: ['never'],
    },
    {
      name: 'ATX: h6 heading ID exists',
      code: '###### Heading {#id}',
      output: '###### Heading ',
      errors: [
        {
          messageId: 'headingIdNever',
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 21,
        },
      ],
      options: ['never'],
    },
  ],
});
