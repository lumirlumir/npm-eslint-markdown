/**
 * @fileoverview Test for `heading-id.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './require-heading-id.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
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
    {
      name: 'Correct h1 heading ID',
      code: '# Heading {#id}',
    },
    {
      name: 'Correct h2 heading ID',
      code: '## Heading {#id}',
    },
    {
      name: 'Correct h3 heading ID',
      code: '### Heading {#id}',
    },
    {
      name: 'Correct h4 heading ID',
      code: '#### Heading {#id}',
    },
    {
      name: 'Correct h5 heading ID',
      code: '##### Heading {#id}',
    },
    {
      name: 'Correct h6 heading ID',
      code: '###### Heading {#id}',
    },

    // Default: Edge Cases
    {
      name: 'h1 heading ID and trailing spaces',
      code: '# Heading {#id}  ',
    },

    // `never` option
    {
      name: 'No h1 heading ID',
      code: '# Heading',
      options: ['never'],
    },
    {
      name: 'No h2 heading ID',
      code: '## Heading',
      options: ['never'],
    },
    {
      name: 'No h3 heading ID',
      code: '### Heading',
      options: ['never'],
    },
    {
      name: 'No h4 heading ID',
      code: '#### Heading',
      options: ['never'],
    },
    {
      name: 'No h5 heading ID',
      code: '##### Heading',
      options: ['never'],
    },
    {
      name: 'No h6 heading ID',
      code: '###### Heading',
      options: ['never'],
    },

    // `leftDelimiter` and `rightDelimiter` option
    {
      name: 'Custom Delimiters `[`, `]`',
      code: '# Heading [#id]',
      options: [
        'always',
        {
          leftDelimiter: '\\[',
          rightDelimiter: '\\]',
        },
      ],
    },
    {
      name: 'Custom Delimiters `|`, `|`',
      code: '# Heading |#id|',
      options: [
        'always',
        {
          leftDelimiter: '\\|',
          rightDelimiter: '\\|',
        },
      ],
    },

    // `ignoreDepth` option
    {
      name: 'Ignore h1 heading ID',
      code: '# Heading',
      options: [
        'always',
        {
          ignoreDepth: [1],
        },
      ],
    },
    {
      name: 'Ignore h1, h2, h3 heading ID',
      code: '# Heading 1\n\n## Heading 2\n\n### Heading 3',
      options: [
        'always',
        {
          ignoreDepth: [1, 2, 3],
        },
      ],
    },
  ],

  invalid: [
    // Default
    {
      name: 'Missing h1 heading ID',
      code: '# Heading',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      name: 'Missing h2 heading ID',
      code: '## Heading',
      errors: [
        {
          messageId: 'headingIdAlways',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 11,
        },
      ],
    },
    {
      name: 'Missing h3 heading ID',
      code: '### Heading',
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
      name: 'Missing h4 heading ID',
      code: '#### Heading',
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
      name: 'Missing h5 heading ID',
      code: '##### Heading',
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
      name: 'Missing h6 heading ID',
      code: '###### Heading',
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

    // Default: Edge Cases
    {
      name: 'h1 heading ID with nothing',
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
      name: 'h1 heading ID with leading space',
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

    // Never option
    {
      name: 'h1 heading ID exists',
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
      name: 'h2 heading ID exists',
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
      name: 'h3 heading ID exists',
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
      name: 'h4 heading ID exists',
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
      name: 'h5 heading ID exists',
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
      name: 'h6 heading ID exists',
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
