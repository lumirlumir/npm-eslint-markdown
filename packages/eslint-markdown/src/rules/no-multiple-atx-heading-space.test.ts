/**
 * @fileoverview Tests for `no-multiple-atx-heading-space` rule.
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-multiple-atx-heading-space.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-multiple-atx-heading-space', rule, {
  valid: [
    {
      name: 'Empty document',
      code: '',
    },
    {
      name: 'ATX headings with one space after the opening sequence',
      code: `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
`,
    },
    {
      name: 'Closed ATX headings with one space inside each sequence',
      code: `
# Heading 1 #
## Heading 2 ##
### Heading 3 ###
`,
    },
    {
      name: 'should not report multiple spaces within ATX heading content',
      code: '# Heading  with  multiple  spaces',
    },
    {
      name: 'should not report trailing spaces after an ATX closing sequence',
      code: '## Heading ##  ',
    },
    {
      name: 'should not check spaces before an ATX closing sequence by default',
      code: '## Heading   ##',
    },
    {
      name: 'should allow one space before an ATX closing sequence when checked',
      code: '## Heading ##',
      options: [{ checkClosedHeading: true }],
    },
    {
      name: 'Closed ATX heading with one tab before the closing sequence',
      code: '# Heading\t#',
      options: [{ checkClosedHeading: true }],
    },
    {
      name: 'should allow one tab after an ATX opening sequence',
      code: '#\tHeading',
    },
    {
      name: 'should not treat an escaped trailing hash as an ATX closing sequence',
      code: '# Heading  \\#',
      options: [{ checkClosedHeading: true }],
    },
    {
      name: 'ATX heading containing inline Markdown',
      code: '# **bold** `code` [link](https://example.com)',
    },
    {
      name: 'should not report multiple spaces in Setext headings',
      code: `
Heading  1
=========

Heading  2
---------
`,
    },
    {
      name: 'should not report multiple spaces in paragraphs',
      code: 'Paragraph  with  multiple  spaces.',
    },
  ],
  invalid: [
    {
      name: 'ATX heading with two spaces after the opening sequence',
      code: '#  Heading',
      output: '# Heading',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'ATX heading with multiple spaces after the opening sequence',
      code: '###    Heading',
      output: '### Heading',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Closed ATX heading with multiple spaces after the opening sequence',
      code: '##   Heading ##',
      output: '## Heading ##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'should report multiple spaces before an ATX closing sequence when checked',
      code: '## Heading   ##',
      output: '## Heading ##',
      options: [{ checkClosedHeading: true }],
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 11,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'should report multiple spaces on both sides of a closed ATX heading when checked',
      code: '##   Heading   ##',
      output: '## Heading ##',
      options: [{ checkClosedHeading: true }],
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 6,
        },
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 13,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      name: 'Empty closed ATX heading with multiple spaces',
      code: '##  ##',
      output: '## ##',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'ATX heading with inline Markdown after multiple spaces',
      code: '#   **bold** `code` [link](https://example.com)',
      output: '# **bold** `code` [link](https://example.com)',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'ATX heading with multiple tabs after the opening sequence',
      code: '#\t\tHeading',
      output: '# Heading',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'ATX heading with mixed spaces and tabs after the opening sequence',
      code: '# \t\t Heading',
      output: '# Heading',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 6,
        },
      ],
    },
    {
      name: 'Closed ATX heading with multiple tabs before the closing sequence',
      code: '# Heading\t\t#',
      output: '# Heading #',
      options: [{ checkClosedHeading: true }],
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: 'Closed ATX heading with mixed spaces and tabs before the closing sequence',
      code: '# Heading \t #',
      output: '# Heading #',
      options: [{ checkClosedHeading: true }],
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      name: 'Closed ATX heading with trailing spaces after the closing sequence',
      code: '# Heading   ##  ',
      output: '# Heading ##  ',
      options: [{ checkClosedHeading: true }],
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 10,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      name: 'ATX heading with a hash in its content',
      code: '#  Heading # hashtag',
      output: '# Heading # hashtag',
      options: [{ checkClosedHeading: true }],
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 2,
          endLine: 1,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'ATX heading with CRLF line endings',
      code: 'Paragraph.\r\n\r\n#  Heading\r\n',
      output: 'Paragraph.\r\n\r\n# Heading\r\n',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 3,
          column: 2,
          endLine: 3,
          endColumn: 4,
        },
      ],
    },
    {
      name: 'ATX headings nested in block containers',
      code: `
> #  Blockquote heading

- ##   List heading ##
`,
      output: `
> # Blockquote heading

- ## List heading ##
`,
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 6,
        },
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 4,
          column: 5,
          endLine: 4,
          endColumn: 8,
        },
      ],
    },
    {
      name: 'Multiple invalid ATX headings',
      code: `
#  Heading 1
## Heading 2  ##
`,
      output: `
# Heading 1
## Heading 2 ##
`,
      options: [{ checkClosedHeading: true }],
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 4,
        },
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 3,
          column: 13,
          endLine: 3,
          endColumn: 15,
        },
      ],
    },
    {
      name: 'Empty ATX heading with multiple spaces',
      code: '##  ',
      output: '## ',
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Empty closed ATX heading with multiple spaces when closed headings are checked',
      code: '##  ##',
      output: '## ##',
      options: [{ checkClosedHeading: true }],
      errors: [
        {
          messageId: 'noMultipleAtxHeadingSpace',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 5,
        },
      ],
    },
  ],
});
