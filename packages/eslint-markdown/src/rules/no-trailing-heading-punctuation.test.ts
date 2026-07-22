/**
 * @fileoverview Test for `no-trailing-heading-punctuation.ts`
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-trailing-heading-punctuation.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-trailing-heading-punctuation', rule, {
  valid: [
    // Default: ATX Headings
    {
      name: 'ATX: Heading without trailing punctuation',
      code: '# Heading',
    },
    {
      name: 'ATX: Heading ending with an allowed question mark',
      code: '# Heading?',
    },
    // Default: ATX Closed Headings
    {
      name: 'ATX Closed: Heading without trailing punctuation',
      code: '## Heading ##',
    },
    // Default: Empty Headings
    {
      name: 'Empty document',
      code: '',
    },
    {
      name: 'ATX: Empty heading',
      code: '#',
    },
    {
      name: 'ATX Closed: Empty heading',
      code: '## ##',
    },
    // Default: Setext Headings
    {
      name: 'Setext: Heading without trailing punctuation',
      code: 'Heading\n-------',
    },
    // Default: Full-Width Punctuation
    {
      name: 'ATX: Heading ending with an allowed full-width question mark',
      code: '# Heading？',
    },
    // Default: Consecutive Punctuation
    {
      name: 'ATX: Consecutive punctuation ending with an allowed question mark',
      code: '# Heading!?',
    },
    // Default: Mixed Punctuation
    {
      name: 'ATX: Heading ending with allowed mixed punctuation',
      code: '# Heading?!?',
    },
    // Default: Whitespace Before Punctuation
    {
      name: 'ATX: Non-trailing punctuation should not be reported',
      code: '# Heading ! More',
    },
    // `punctuation` option
    {
      name: 'ATX: Heading ending with punctuation excluded from the option',
      code: '# Heading!',
      options: [{ punctuation: '.,;:?]' }],
    },
    // Empty `punctuation` option
    {
      name: 'ATX: Headings should not be reported when punctuation is empty',
      code: '# Heading.\n# Heading,\n# Heading;\n# Heading:\n# Heading!\n# Heading?',
      options: [{ punctuation: '' }],
    },
    // HTML Entities
    {
      name: 'ATX: Heading ending with an HTML entity',
      code: '# Copyright &copy;',
    },
    // HTML Entities
    {
      name: 'ATX: Heading ending with a numeric HTML entity',
      code: '# Copyright &#169;',
    },
    // HTML Entities
    {
      name: 'ATX: Heading ending with a hexadecimal HTML entity',
      code: '# Copyright &#x000A9;',
    },
    // HTML Entities in ATX Closed Headings
    {
      name: 'ATX Closed: Heading ending with an HTML entity',
      code: '## Copyright &#169; ##',
    },
    // HTML Entities in Setext Headings
    {
      name: 'Setext: Heading ending with an HTML entity',
      code: 'Copyright &copy;\n---------------------',
    },
    // Gemoji
    {
      name: 'ATX: Heading ending with a gemoji',
      code: '# Heading :smile:',
    },
    // HTML Entity Variants
    {
      name: 'ATX: Heading ending with an uppercase named entity',
      code: '# Copyright &COPY;',
    },
    {
      name: 'ATX: Heading ending with an uppercase hexadecimal entity',
      code: '# Copyright &#X000A9;',
    },
    // HTML Entities without Leading Spaces
    {
      name: 'ATX: Heading ending with an adjacent HTML entity',
      code: '## Copyright 2002&copy;',
    },
    // HTML Entities within Headings
    {
      name: 'ATX: Heading containing a non-trailing HTML entity',
      code: '# Copyright &copy; 2000',
    },
  ],

  invalid: [
    // Default: ATX Headings
    {
      name: 'ATX: Heading with trailing period',
      code: '# Heading.',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '.',
          },
        },
      ],
    },
    {
      name: 'ATX: Heading with trailing exclamation mark',
      code: '# Heading!',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '!',
          },
        },
      ],
    },

    // `punctuation` option
    {
      name: 'ATX: Heading with configured trailing question mark',
      code: '# Heading?',
      output: '# Heading',
      options: [{ punctuation: '.,;:?]' }],
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '?',
          },
        },
      ],
    },
    // Default: ATX Closed Headings
    {
      name: 'ATX Closed: Heading with trailing exclamation mark',
      code: '## Heading! ##',
      output: '## Heading ##',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    // Default: Setext Headings
    {
      name: 'Setext: Heading with trailing exclamation mark',
      code: 'Heading!\n-------',
      output: 'Heading\n-------',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 9,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    // Default: Full-Width Punctuation
    {
      name: 'ATX: Heading with trailing full-width period',
      code: '# Heading。',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: '。',
          },
        },
      ],
    },
    // Default: Full-Width Punctuation
    {
      name: 'ATX: Headings with prohibited full-width punctuation',
      code: '# Heading，\n# Heading；\n# Heading：\n# Heading！',
      output: '# Heading\n# Heading\n# Heading\n# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: { punctuation: '，' },
        },
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 2,
          column: 10,
          endLine: 2,
          endColumn: 11,
          data: { punctuation: '；' },
        },
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 3,
          column: 10,
          endLine: 3,
          endColumn: 11,
          data: { punctuation: '：' },
        },
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 4,
          column: 10,
          endLine: 4,
          endColumn: 11,
          data: { punctuation: '！' },
        },
      ],
    },
    // Default: Consecutive Punctuation
    {
      name: 'ATX: Heading with consecutive trailing punctuation',
      code: '# Heading!!!',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 13,
          data: {
            punctuation: '!!!',
          },
        },
      ],
    },
    // Default: Mixed Punctuation
    {
      name: 'ATX: Heading ending with prohibited mixed punctuation',
      code: '# Heading?!',
      output: '# Heading?',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: '!',
          },
        },
      ],
    },
    // Default: Whitespace Before Punctuation
    {
      name: 'ATX: Whitespace before trailing punctuation should be removed',
      code: '# Heading !',
      output: '# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 12,
          data: {
            punctuation: ' !',
          },
        },
      ],
    },
    // `punctuation` option
    {
      name: 'ATX: Heading ending with punctuation included in the option',
      code: '# Heading]',
      output: '# Heading',
      options: [{ punctuation: '.,;:?]' }],
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: {
            punctuation: ']',
          },
        },
      ],
    },
    // HTML Entities
    {
      name: 'ATX: Heading ending with a non-entity semicolon',
      code: '# Copyright copy;',
      output: '# Copyright copy',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 18,
          data: { punctuation: ';' },
        },
      ],
    },
    // HTML Entities
    {
      name: 'ATX: Heading ending with an invalid numeric entity',
      code: '# Copyright #169;',
      output: '# Copyright #169',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 17,
          endLine: 1,
          endColumn: 18,
          data: { punctuation: ';' },
        },
      ],
    },
    // HTML Entities
    {
      name: 'ATX: Heading ending with an invalid hexadecimal entity',
      code: '# Copyright #x000A9;',
      output: '# Copyright #x000A9',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 20,
          endLine: 1,
          endColumn: 21,
          data: { punctuation: ';' },
        },
      ],
    },
    // HTML Entities in ATX Closed Headings
    {
      name: 'ATX Closed: Heading ending with an invalid numeric entity',
      code: '## Copyright #169; ##',
      output: '## Copyright #169 ##',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 18,
          endLine: 1,
          endColumn: 19,
          data: { punctuation: ';' },
        },
      ],
    },
    // HTML Entities in Setext Headings
    {
      name: 'Setext: Heading ending with a non-entity semicolon',
      code: 'Copyright copy;\n---------------------',
      output: 'Copyright copy\n---------------------',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 16,
          data: { punctuation: ';' },
        },
      ],
    },
    // Gemoji
    {
      name: 'ATX: Heading ending with a non-gemoji colon',
      code: '# Heading smile:',
      output: '# Heading smile',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 16,
          endLine: 1,
          endColumn: 17,
          data: { punctuation: ':' },
        },
      ],
    },
    // HTML Entities without Leading Spaces
    {
      name: 'ATX: Heading ending with adjacent non-entity text',
      code: '## Copyright 2002copy;',
      output: '## Copyright 2002copy',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 22,
          endLine: 1,
          endColumn: 23,
          data: { punctuation: ';' },
        },
      ],
    },
    // HTML Entities within Headings
    {
      name: 'ATX: Heading containing an entity with trailing punctuation',
      code: '# Copyright &copy; 2000;',
      output: '# Copyright &copy; 2000',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 24,
          endLine: 1,
          endColumn: 25,
          data: { punctuation: ';' },
        },
      ],
    },
    // Default: ASCII Punctuation
    {
      name: 'ATX: Headings with prohibited ASCII punctuation',
      code: '# Heading,\n# Heading;\n# Heading:',
      output: '# Heading\n# Heading\n# Heading',
      errors: [
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 11,
          data: { punctuation: ',' },
        },
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 2,
          column: 10,
          endLine: 2,
          endColumn: 11,
          data: { punctuation: ';' },
        },
        {
          messageId: 'noTrailingHeadingPunctuation',
          line: 3,
          column: 10,
          endLine: 3,
          endColumn: 11,
          data: { punctuation: ':' },
        },
      ],
    },
  ],
});
