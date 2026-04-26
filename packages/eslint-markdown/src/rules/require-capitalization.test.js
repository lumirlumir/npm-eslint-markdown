/**
 * @fileoverview Test for `require-capitalization.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../core/rule-tester.js';
import rule from './require-capitalization.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('require-capitalization', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },

    // Options: Heading
    {
      name: 'Should not detect headings when `skipHeading` is `true`',
      code: '# hello world!',
      options: [{ skipHeading: true }],
    },

    {
      name: 'Heading: Empty',
      code: '## ',
      options: [{ skipHeading: false }],
    },
    {
      name: 'Heading: 1 level depth',
      code: '# Hello World!',
      options: [{ skipHeading: false }],
    },
    {
      name: 'Heading: 2 level depth - em',
      code: '# *Hello* World!',
      options: [{ skipHeading: false }],
    },
    {
      name: 'Heading: 2 level depth - strong',
      code: '# **Hello** World!',
      options: [{ skipHeading: false }],
    },
    {
      name: 'Heading: 3 level depth - em + strong - 1',
      code: '# ***Hello*** World!',
      options: [{ skipHeading: false }],
    },
    {
      name: 'Heading: 3 level depth - em + strong - 2',
      code: '# _**Hello**_ _World!_',
      options: [{ skipHeading: false }],
    },
    {
      name: 'Heading: A text node with leading spaces should not be detected - 1',
      code: '# `code` hello world!',
      options: [{ skipHeading: false }],
    },
    {
      name: 'Heading: A text node with leading spaces should not be detected - 2',
      code: '# ![alt](image.png) hello world!',
      options: [{ skipHeading: false }],
    },

    // Options: ListItem
    {
      name: 'Should not detect list items when `skipListItem` is `true`',
      code: '- hello world!',
      options: [{ skipListItem: true }],
    },

    {
      name: 'ListItem: Empty',
      code: '- ',
      options: [{ skipListItem: false }],
    },
    {
      name: 'ListItem: 1 level depth',
      code: '- Hello World!',
      options: [{ skipListItem: false }],
    },
    {
      name: 'ListItem: 2 level depth - em',
      code: '- *Hello* World!',
      options: [{ skipListItem: false }],
    },
    {
      name: 'ListItem: 2 level depth - strong',
      code: '- **Hello** World!',
      options: [{ skipListItem: false }],
    },
    {
      name: 'ListItem: 3 level depth - em + strong - 1',
      code: '- ***Hello*** World!',
      options: [{ skipListItem: false }],
    },
    {
      name: 'ListItem: 3 level depth - em + strong - 2',
      code: '- _**Hello**_ _World!_',
      options: [{ skipListItem: false }],
    },
    {
      name: 'ListItem: A text node with leading spaces should not be detected - 1',
      code: '- `code` hello world!',
      options: [{ skipListItem: false }],
    },
    {
      name: 'ListItem: A text node with leading spaces should not be detected - 2',
      code: '- ![alt](image.png) hello world!',
      options: [{ skipListItem: false }],
    },

    // Options: Paragraph
    {
      name: 'Paragraph: 1 level depth',
      code: 'Hello World!',
      options: [{ skipParagraph: false }],
    },
    {
      name: 'Paragraph: 2 level depth - em',
      code: '*Hello* World!',
      options: [{ skipParagraph: false }],
    },
    {
      name: 'Paragraph: 2 level depth - strong',
      code: '**Hello** World!',
      options: [{ skipParagraph: false }],
    },
    {
      name: 'Paragraph: 3 level depth - em + strong - 1',
      code: '***Hello*** World!',
      options: [{ skipParagraph: false }],
    },
    {
      name: 'Paragraph: 3 level depth - em + strong - 2',
      code: '_**Hello**_ World!',
      options: [{ skipParagraph: false }],
    },
    {
      name: 'Paragraph: A text node with leading spaces should not be detected - 1',
      code: '`code` hello world!',
      options: [{ skipParagraph: false }],
    },
    {
      name: 'Paragraph: A text node with leading spaces should not be detected - 2',
      code: '![alt](image.png) hello world!',
      options: [{ skipParagraph: false }],
    },
  ],

  invalid: [
    // Options: Heading
    {
      name: 'Heading: 1 level depth',
      code: '# hello world!',
      output: '# Hello world!',
      options: [{ skipHeading: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'Heading: 2 level depth - em',
      code: '# *hello* world!',
      output: '# *Hello* world!',
      options: [{ skipHeading: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'Heading: 2 level depth - strong',
      code: '# **hello** world!',
      output: '# **Hello** world!',
      options: [{ skipHeading: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'Heading: 3 level depth - em + strong - 1',
      code: '# ***hello*** world!',
      output: '# ***Hello*** world!',
      options: [{ skipHeading: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'Heading: 3 level depth - em + strong - 2',
      code: '# _**hello**_ world!',
      output: '# _**Hello**_ world!',
      options: [{ skipHeading: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { lowercase: 'h' },
        },
      ],
    },

    // Options: ListItem
    {
      name: 'ListItem: 1 level depth',
      code: '- hello world!',
      output: '- Hello world!',
      options: [{ skipListItem: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'ListItem: 2 level depth - em',
      code: '- *hello* world!',
      output: '- *Hello* world!',
      options: [{ skipListItem: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'ListItem: 2 level depth - strong',
      code: '- **hello** world!',
      output: '- **Hello** world!',
      options: [{ skipListItem: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 6,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'ListItem: 3 level depth - em + strong - 1',
      code: '- ***hello*** world!',
      output: '- ***Hello*** world!',
      options: [{ skipListItem: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'ListItem: 3 level depth - em + strong - 2',
      code: '- _**hello**_ world!',
      output: '- _**Hello**_ world!',
      options: [{ skipListItem: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: { lowercase: 'h' },
        },
      ],
    },

    // Options: Paragraph
    {
      name: 'Paragraph: 1 level depth',
      code: 'hello world!',
      output: 'Hello world!',
      options: [{ skipParagraph: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'Paragraph: 2 level depth - em',
      code: '*hello* world!',
      output: '*Hello* world!',
      options: [{ skipParagraph: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 3,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'Paragraph: 2 level depth - strong',
      code: '**hello** world!',
      output: '**Hello** world!',
      options: [{ skipParagraph: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'Paragraph: 3 level depth - em + strong - 1',
      code: '***hello*** world!',
      output: '***Hello*** world!',
      options: [{ skipParagraph: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { lowercase: 'h' },
        },
      ],
    },
    {
      name: 'Paragraph: 3 level depth - em + strong - 2',
      code: '_**hello**_ world!',
      output: '_**Hello**_ world!',
      options: [{ skipParagraph: false }],
      errors: [
        {
          messageId: 'requireCapitalization',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: { lowercase: 'h' },
        },
      ],
    },
  ],
});
