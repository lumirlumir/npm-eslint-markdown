/**
 * @fileoverview Test for `no-bold-paragraph.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ruleTester } from '../core/rule-tester.js';
import rule from './no-bold-paragraph.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const noBoldParagraph = 'noBoldParagraph';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-bold-paragraph', rule, {
  valid: [
    // Basic
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },
    {
      name: 'Paragraph without bolded text',
      code: '#Book\n\nFirst Chapter\n\nContent\n\nSecond Chapter\n\nContent',
    },
    {
      name: 'Paragraph with bolded text and other text',
      code: '**Hello** World.\n\nHello **World**.',
    },
    {
      name: 'Paragraph with bolded text and other multiline text',
      code: '**Hello**\nWorld.\n\nHello\n**World**.',
    },
    {
      name: 'Bold with whitespace inside',
      code: '** Not fully bolded paragraph **',
    },
    {
      name: 'Multiple bold elements comprising entire paragraph',
      code: '**First part** **second part**',
    },

    // ListItem
    {
      name: 'Bold text in list item',
      code: '- **List item**\n- __List item__',
    },
  ],

  invalid: [
    // Basic
    {
      name: 'Paragraph with fully bolded text',
      code: '#Book\n\n**First Chapter**\n\nContent\n\n__Second Chapter__\n\nContent',
      errors: [
        {
          messageId: noBoldParagraph,
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 18,
        },
        {
          messageId: noBoldParagraph,
          line: 7,
          column: 1,
          endLine: 7,
          endColumn: 19,
        },
      ],
    },
    {
      name: 'Paragraph with fully bolded single character',
      code: '**X**',
      errors: [
        {
          messageId: noBoldParagraph,
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },

    // Blockquote
    {
      name: 'Bold text in blockquote',
      code: '> **Blockquote**',
      errors: [
        {
          messageId: noBoldParagraph,
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },
  ],
});
