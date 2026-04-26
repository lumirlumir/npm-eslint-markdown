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

    // Options: Blockquote
    {
      name: 'Should not detect blockquotes when `skipBlockquote` is `true`',
      code: '> hello world!',
      options: [{ skipBlockquote: true }],
    },

    {
      name: 'Blockquote: Empty',
      code: '> ',
      options: [{ skipBlockquote: false }],
    },
    {
      name: 'Blockquote: 1 level depth',
      code: '> Hello World!',
      options: [{ skipBlockquote: false }],
    },
    {
      name: 'Blockquote: 2 level depth - em',
      code: '> *Hello* World!',
      options: [{ skipBlockquote: false }],
    },
    {
      name: 'Blockquote: 2 level depth - strong',
      code: '> **Hello** World!',
      options: [{ skipBlockquote: false }],
    },
    {
      name: 'Blockquote: 3 level depth - em + strong - 1',
      code: '> ***Hello*** World!',
      options: [{ skipBlockquote: false }],
    },
    {
      name: 'Blockquote: 3 level depth - em + strong - 2',
      code: '> _**Hello**_ _World!_',
      options: [{ skipBlockquote: false }],
    },
    {
      name: 'Blockquote: A text node with leading spaces should not be detected - 1',
      code: '> `code` hello world!',
      options: [{ skipBlockquote: false }],
    },
    {
      name: 'Blockquote: A text node with leading spaces should not be detected - 2',
      code: '> ![alt](image.png) hello world!',
      options: [{ skipBlockquote: false }],
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
      name: 'Should not detect paragraphs when `skipParagraph` is `true`',
      code: 'hello world!',
      options: [{ skipParagraph: true }],
    },

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

    // Options: TableCell
    {
      name: 'Should not detect table cells when `skipTableCell` is `true`',
      code: '| hello world! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: true }],
    },

    {
      name: 'TableCell: Empty',
      code: '| |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
    },
    {
      name: 'TableCell: 1 level depth',
      code: '| Hello World! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
    },
    {
      name: 'TableCell: 2 level depth - em',
      code: '| *Hello* World! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
    },
    {
      name: 'TableCell: 2 level depth - strong',
      code: '| **Hello** World! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
    },
    {
      name: 'TableCell: 3 level depth - em + strong - 1',
      code: '| ***Hello*** World! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
    },
    {
      name: 'TableCell: 3 level depth - em + strong - 2',
      code: '| _**Hello**_ _World!_ |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
    },
    {
      name: 'TableCell: A text node with leading spaces should not be detected - 1',
      code: '| `code` hello world! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
    },
    {
      name: 'TableCell: A text node with leading spaces should not be detected - 2',
      code: '| ![alt](image.png) hello world! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
    },
  ],

  invalid: [
    // Options: Blockquote
    {
      name: 'Blockquote: 1 level depth',
      code: '> hello world!',
      output: '> Hello world!',
      options: [{ skipBlockquote: false }],
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
      name: 'Blockquote: 2 level depth - em',
      code: '> *hello* world!',
      output: '> *Hello* world!',
      options: [{ skipBlockquote: false }],
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
      name: 'Blockquote: 2 level depth - strong',
      code: '> **hello** world!',
      output: '> **Hello** world!',
      options: [{ skipBlockquote: false }],
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
      name: 'Blockquote: 3 level depth - em + strong - 1',
      code: '> ***hello*** world!',
      output: '> ***Hello*** world!',
      options: [{ skipBlockquote: false }],
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
      name: 'Blockquote: 3 level depth - em + strong - 2',
      code: '> _**hello**_ world!',
      output: '> _**Hello**_ world!',
      options: [{ skipBlockquote: false }],
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

    // Options: TableCell
    {
      name: 'TableCell: 1 level depth',
      code: '| hello world! |\n| - |',
      output: '| Hello world! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
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
      name: 'TableCell: 2 level depth - em',
      code: '| *hello* world! |\n| - |',
      output: '| *Hello* world! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
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
      name: 'TableCell: 2 level depth - strong',
      code: '| **hello** world! |\n| - |',
      output: '| **Hello** world! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
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
      name: 'TableCell: 3 level depth - em + strong - 1',
      code: '| ***hello*** world! |\n| - |',
      output: '| ***Hello*** world! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
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
      name: 'TableCell: 3 level depth - em + strong - 2',
      code: '| _**hello**_ world! |\n| - |',
      output: '| _**Hello**_ world! |\n| - |',
      language: 'markdown/gfm',
      options: [{ skipTableCell: false }],
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
  ],
});
