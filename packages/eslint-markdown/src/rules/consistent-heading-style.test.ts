/**
 * @fileoverview Test for `consistent-heading-style.ts`.
 * @author Ga eun Lee(tooth-is-silver)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './consistent-heading-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('consistent-heading-style', rule, {
  valid: [
    {
      name: 'Empty document',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },

    // option: `style: 'consistent'`
    {
      name: '`consistent` style - document without headings',
      code: 'Paragraph\n\n---',
    },
    {
      name: '`consistent` style - one ATX heading',
      code: '# Heading',
    },
    {
      name: '`consistent` style - ATX headings at every level',
      code: `# H1

## H2

### H3

#### H4

##### H5

###### H6`,
    },
    {
      name: '`consistent` style - closed ATX headings',
      code: `# H1 #

## H2 ##

### H3 ###`,
    },
    {
      name: '`consistent` style - Setext headings',
      code: `H1
==

H2
--`,
    },
    {
      name: '`consistent` style - heading-like content in a fenced code block does not determine the style',
      code: `\`\`\`md
# Not a heading
\`\`\`

Heading
=======`,
    },

    // option: `style: 'atx'`
    {
      name: '`atx` style',
      code: `# H1

### H3

###### H6`,
      options: [{ style: 'atx' }],
    },
    {
      name: '`atx` style - heading containing an escaped trailing hash is not closed - 1',
      code: '## Heading \\#',
      options: [{ style: 'atx' }],
    },
    {
      name: '`atx` style - heading containing an escaped trailing hash is not closed - 2',
      code: '## Heading \\\\#',
      options: [{ style: 'atx' }],
    },
    {
      name: '`atx` style - heading containing an escaped trailing hash is not closed - 3',
      code: '## Heading \\\\\\#',
      options: [{ style: 'atx' }],
    },
    {
      // `markdownlint` MD003 only checks ATX and Setext tokens, so HTML heading elements are ignored.
      // see: https://github.com/DavidAnson/markdownlint/blob/v0.41.1/lib/md003.mjs#L15
      name: '`atx` style - HTML heading elements are outside the rule scope',
      code: '<h1>Heading</h1>\n\n<h2>Heading</h2>',
      options: [{ style: 'atx' }],
    },

    // option: `style: 'atx-closed'`
    {
      name: '`atx-closed` style',
      code: `# H1 #

### H3 ###

###### H6 ######`,
      options: [{ style: 'atx-closed' }],
    },
    {
      name: '`atx-closed` style - heading with many trailing hashes',
      code: '## Heading ################',
      options: [{ style: 'atx-closed' }],
    },
    {
      name: '`atx-closed` style - heading containing an escaped trailing hash',
      code: '## Heading \\# ##',
      options: [{ style: 'atx-closed' }],
    },

    // option: `style: 'setext'`
    {
      name: '`setext` style - H1 and H2',
      code: `H1
==

H2
--`,
      options: [{ style: 'setext' }],
    },
    {
      name: '`setext` style - setext heading content may start with a hashtag',
      code: '#hashtag\n========',
      options: [{ style: 'setext' }],
    },
    {
      name: '`setext` style - setext heading content may start with a hashtag and contain trailing hashes - 1',
      code: '#hashtag##\n========',
      options: [{ style: 'setext' }],
    },
    {
      name: '`setext` style - setext heading content may start with a hashtag and contain trailing hashes - 2',
      code: '#hashtag ##\n========',
      options: [{ style: 'setext' }],
    },

    // option: `style: 'setext-with-atx'`
    {
      name: '`setext-with-atx` style',
      code: `H1
==

H2
--

### H3

###### H6`,
      options: [{ style: 'setext-with-atx' }],
    },

    // option: `style: 'setext-with-atx-closed'`
    {
      name: '`setext-with-atx-closed` style',
      code: `H1
==

H2
--

### H3 ###

###### H6 ######`,
      options: [{ style: 'setext-with-atx-closed' }],
    },
  ],

  invalid: [
    // Possible fix combinations
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - h1',
      code: '#',
      output: '# #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - h2',
      code: '##',
      output: '## ##',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - h3',
      code: '###',
      output: '### ###',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - h4',
      code: '####',
      output: '#### ####',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - h5',
      code: '#####',
      output: '##### #####',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 6,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - h6',
      code: '######',
      output: '###### ######',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 7,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - space after hash',
      code: '# ',
      output: '# #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - tab after hash',
      code: '#\t',
      output: '#\t#',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - mixed spaces and tabs after hash',
      code: '# \t ',
      output: '# \t #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - inside a blockquote',
      code: '> #',
      output: '> # #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 4,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - space after hash inside a blockquote',
      code: '> # ',
      output: '> # #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 5,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-1. If `atx` is empty, it can be converted to `atx-closed`. (🔧) - tab before a CRLF line ending',
      code: '#\t\r\nParagraph',
      output: '#\t#\r\nParagraph',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: 'atx-closed' },
        },
      ],
    },

    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - h1',
      code: '# Heading',
      output: '# Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - h2',
      code: '## Heading',
      output: '## Heading ##',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - h3',
      code: '### Heading',
      output: '### Heading ###',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - h4',
      code: '#### Heading',
      output: '#### Heading ####',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - h5',
      code: '##### Heading',
      output: '##### Heading #####',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - h6',
      code: '###### Heading',
      output: '###### Heading ######',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 15,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - space after content',
      code: '# Heading ',
      output: '# Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - tab after content',
      code: '# Heading\t',
      output: '# Heading\t#',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - mixed spaces and tabs after content',
      code: '# Heading \t ',
      output: '# Heading \t #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - strong emphasis without trailing whitespace',
      code: '# **Heading**',
      output: '# **Heading** #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - tab after strong emphasis',
      code: '# **Heading**\t',
      output: '# **Heading**\t#',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 15,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - escaped trailing hash',
      code: '# Heading \\#',
      output: '# Heading \\# #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - inside a blockquote',
      code: '> # Heading',
      output: '> # Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 12,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - space after content inside a blockquote',
      code: '> # Heading ',
      output: '> # Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 13,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '1-2. If `atx` is not empty, it can be converted to `atx-closed`. (🔧) - tab before a CRLF line ending',
      code: '# Heading\t\r\nParagraph',
      output: '# Heading\t#\r\nParagraph',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'atx-closed' },
        },
      ],
    },

    {
      name: '2-1. If `atx` is empty, it cannot be converted to `setext`. (❌) - h1',
      code: '#',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 2,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '2-1. If `atx` is empty, it cannot be converted to `setext`. (❌) - h2',
      code: '##',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '2-1. If `atx` is empty, it cannot be converted to `setext`. (❌) - h3',
      code: '###',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '2-1. If `atx` is empty, it cannot be converted to `setext`. (❌) - h4',
      code: '####',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '2-1. If `atx` is empty, it cannot be converted to `setext`. (❌) - h5',
      code: '#####',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 6,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '2-1. If `atx` is empty, it cannot be converted to `setext`. (❌) - h6',
      code: '######',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 7,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '2-1. If `atx` is empty, it cannot be converted to `setext`. (❌) - space after hash',
      code: '# ',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '2-1. If `atx` is empty, it cannot be converted to `setext`. (❌) - tab after hash',
      code: '#\t',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 3,
          data: { style: 'setext' },
        },
      ],
    },

    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - h1',
      code: '# Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - h2',
      code: '## Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n-------',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - space after content',
      code: '# Heading ',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - tab after content',
      code: '# Heading\t',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - mixed spaces and tabs after content',
      code: '# Heading \t ',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - strong emphasis',
      code: '# **Heading**',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: '**Heading**\n===========',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - tab after strong emphasis',
      code: '# **Heading**\t',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 15,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: '**Heading**\n===========',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - escaped trailing hash',
      code: '# Heading \\#',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading \\#\n==========',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - tab before a CRLF line ending',
      code: '# Heading\t\r\nParagraph',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n=======\r\nParagraph',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - extra space after opening hash',
      code: '#  Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - tab after opening hash',
      code: '#\tHeading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - tabs before and after content at depth 2',
      code: '##\tHeading\t',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n-------',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - after a blank line',
      code: 'Paragraph\n\n# Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 10,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Paragraph\n\nHeading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '2-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - without a preceding blank line',
      code: 'Paragraph\n# Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 10,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Paragraph\nHeading\n=======',
            },
          ],
        },
      ],
    },

    {
      name: '2-2-2. If its depth is greater than 2, it cannot be converted to `setext`. (❌) - h3',
      code: '### Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'setext' },
          suggestions: [],
        },
      ],
    },
    {
      name: '2-2-2. If its depth is greater than 2, it cannot be converted to `setext`. (❌) - h4',
      code: '#### Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'setext' },
          suggestions: [],
        },
      ],
    },
    {
      name: '2-2-2. If its depth is greater than 2, it cannot be converted to `setext`. (❌) - h5',
      code: '##### Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { style: 'setext' },
          suggestions: [],
        },
      ],
    },
    {
      name: '2-2-2. If its depth is greater than 2, it cannot be converted to `setext`. (❌) - h6',
      code: '###### Heading',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 15,
          data: { style: 'setext' },
          suggestions: [],
        },
      ],
    },

    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - h1',
      code: '# #',
      output: '#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - h2',
      code: '## ##',
      output: '##',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 6,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - h3',
      code: '### ###',
      output: '###',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - h4',
      code: '#### ####',
      output: '####',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - h5',
      code: '##### #####',
      output: '#####',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - h6',
      code: '###### ######',
      output: '######',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - extra space before closing hash',
      code: '#  #',
      output: '#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - tab before closing hash',
      code: '#\t#',
      output: '#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - mixed spaces and tabs before closing hash',
      code: '# \t #',
      output: '#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 6,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - inside a blockquote',
      code: '> # #',
      output: '> #',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 6,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - extra space before closing hash inside a blockquote',
      code: '> #  #',
      output: '> #',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 7,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - tab before a CRLF line ending',
      code: '# #\t\r\nParagraph',
      output: '#\r\nParagraph',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - space after closing hash',
      code: '# # ',
      output: '#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-1. If `atx-closed` is empty, it can be converted to `atx`. (🔧) - tab after closing hash',
      code: '# #\t',
      output: '#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'atx' },
        },
      ],
    },

    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - h1',
      code: '# Heading #',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - h2',
      code: '## Heading ##',
      output: '## Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - h3',
      code: '### Heading ###',
      output: '### Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 16,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - h4',
      code: '#### Heading ####',
      output: '#### Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 18,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - h5',
      code: '##### Heading #####',
      output: '##### Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 20,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - h6',
      code: '###### Heading ######',
      output: '###### Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 22,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - extra space after content',
      code: '# Heading  #',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - tab after content',
      code: '# Heading\t#',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - mixed spaces and tabs after content',
      code: '# Heading \t #',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - space after strong emphasis',
      code: '# **Heading** #',
      output: '# **Heading**',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 16,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - tab after strong emphasis',
      code: '# **Heading**\t#',
      output: '# **Heading**',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 16,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - escaped trailing hash',
      code: '# Heading \\# #',
      output: '# Heading \\#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 15,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - inside a blockquote',
      code: '> # Heading #',
      output: '> # Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 14,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - extra space after content inside a blockquote',
      code: '> # Heading  #',
      output: '> # Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 1,
          endColumn: 15,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - tab before a CRLF line ending',
      code: '# Heading #\t\r\nParagraph',
      output: '# Heading\r\nParagraph',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - space after closing hash',
      code: '# Heading # ',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '3-2. If `atx-closed` is not empty, it can be converted to `atx`. (🔧) - tab after closing hash',
      code: '# Heading #\t',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'atx' },
        },
      ],
    },

    {
      name: '4-1. If `atx-closed` is empty, it cannot be converted to `setext`. (❌) - h1',
      code: '# #',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '4-1. If `atx-closed` is empty, it cannot be converted to `setext`. (❌) - h2',
      code: '## ##',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 6,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '4-1. If `atx-closed` is empty, it cannot be converted to `setext`. (❌) - h3',
      code: '### ###',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '4-1. If `atx-closed` is empty, it cannot be converted to `setext`. (❌) - h4',
      code: '#### ####',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '4-1. If `atx-closed` is empty, it cannot be converted to `setext`. (❌) - h5',
      code: '##### #####',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '4-1. If `atx-closed` is empty, it cannot be converted to `setext`. (❌) - h6',
      code: '###### ######',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '4-1. If `atx-closed` is empty, it cannot be converted to `setext`. (❌) - extra space before closing hash',
      code: '#  #',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '4-1. If `atx-closed` is empty, it cannot be converted to `setext`. (❌) - tab before closing hash',
      code: '#\t#',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 4,
          data: { style: 'setext' },
        },
      ],
    },

    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - h1',
      code: '# Heading #',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - h2',
      code: '## Heading ##',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading\n-------',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - extra space before closing hash',
      code: '# Heading  #',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - tab before closing hash',
      code: '# Heading\t#',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - mixed spaces and tabs before closing hash',
      code: '# Heading \t #',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 14,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - strong emphasis',
      code: '# **Heading** #',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 16,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: '**Heading**\n===========',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - tab after strong emphasis',
      code: '# **Heading**\t#',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 16,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: '**Heading**\n===========',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - escaped trailing hash',
      code: '# Heading \\# #',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 15,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading \\#\n==========',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - tab before a CRLF line ending',
      code: '# Heading #\t\r\nParagraph',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading\n=======\r\nParagraph',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - space after closing hash',
      code: '# Heading # ',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - tab after closing hash',
      code: '# Heading #\t',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 13,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - tabs after opening and closing hashes at depth 2',
      code: '##\tHeading\t##\t',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 15,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading\n-------',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - after a blank line',
      code: 'Paragraph\n\n# Heading #',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 12,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Paragraph\n\nHeading\n=======',
            },
          ],
        },
      ],
    },
    {
      name: '4-2-1. If its depth is 1 or 2, conversion can be offered as a suggestion. (💡) - without a preceding blank line',
      code: 'Paragraph\n# Heading #',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 12,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Paragraph\nHeading\n=======',
            },
          ],
        },
      ],
    },

    {
      name: '4-2-2. If its depth is greater than 2, it cannot be converted to `setext`. (❌) - h3',
      code: '### Heading ###',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 16,
          data: { style: 'setext' },
          suggestions: [],
        },
      ],
    },
    {
      name: '4-2-2. If its depth is greater than 2, it cannot be converted to `setext`. (❌) - h4',
      code: '#### Heading ####',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 18,
          data: { style: 'setext' },
          suggestions: [],
        },
      ],
    },
    {
      name: '4-2-2. If its depth is greater than 2, it cannot be converted to `setext`. (❌) - h5',
      code: '##### Heading #####',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 20,
          data: { style: 'setext' },
          suggestions: [],
        },
      ],
    },
    {
      name: '4-2-2. If its depth is greater than 2, it cannot be converted to `setext`. (❌) - h6',
      code: '###### Heading ######',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 22,
          data: { style: 'setext' },
          suggestions: [],
        },
      ],
    },

    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - h1',
      code: 'Heading\n=======',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - h2',
      code: 'Heading\n-------',
      output: '## Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - space after content',
      code: 'Heading \n=======',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - tab after content',
      code: 'Heading\t\n=======',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - mixed spaces and tabs after content',
      code: 'Heading \t \n=======',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - strong emphasis',
      code: '**Heading**\n===========',
      output: '# **Heading**',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 12,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - tab after strong emphasis',
      code: '**Heading**\t\n===========',
      output: '# **Heading**',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 12,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - escaped trailing hash',
      code: 'Heading \\#\n==========',
      output: '# Heading \\#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 11,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - unescaped trailing hashes',
      code: 'Heading ##\n==========',
      output: '# Heading \\##',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 11,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - strong emphasis before trailing hashes',
      code: '**Heading** ##\n==============',
      output: '# **Heading** \\##',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 15,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - inside a blockquote',
      code: '> Heading\n> =======',
      output: '> # Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 2,
          endColumn: 10,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - tab after a blockquote marker',
      code: '>\tHeading\n> =======',
      output: '>\t# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 2,
          endColumn: 10,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - inside a list item',
      code: '- Heading\n  =======',
      output: '- # Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 2,
          endColumn: 10,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - tab before a CRLF line ending',
      code: 'Heading\t\r\n=======\r\nParagraph',
      output: '# Heading\r\nParagraph',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - spaces around the underline',
      code: 'Heading\n  ===  ',
      output: '# Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - mixed inline Markdown',
      code: '**bold** `code` [link](https://example.com) &copy; <span>HTML</span> 😀\n================================================================================',
      output: '# **bold** `code` [link](https://example.com) &copy; <span>HTML</span> 😀',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 81,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - one leading space',
      code: ' Heading\n=======',
      output: ' # Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - two leading spaces',
      code: '  Heading\n=======',
      output: '  # Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - three leading spaces at depth 2',
      code: '   Heading\n-------',
      output: '   ## Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 4,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - inside a blockquote at depth 2',
      code: '> Heading\n> -------',
      output: '> ## Heading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 2,
          endColumn: 10,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - unescaped trailing hash',
      code: 'hashtag #\n===',
      output: '# hashtag \\#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 4,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - escaped hashes before an unescaped trailing hash',
      code: 'Heading \\## hashtag #\n===',
      output: '# Heading \\## hashtag \\#',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 4,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '5-2-1. If it is single-line, it can be converted to `atx`. (🔧) - preserves a preceding link definition',
      code: '[id]: /url\n[Heading][id]\n=============',
      output: '[id]: /url\n# [Heading][id]',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 14,
          data: { style: 'atx' },
        },
      ],
    },

    {
      name: '5-2-2. If it is multiline, it cannot be converted to `atx`. (❌) - h2',
      code: 'First line\nsecond line\n-----------',
      output: null,
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 12,
          data: { style: 'atx' },
        },
      ],
    },

    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - h1',
      code: 'Heading\n=======',
      output: '# Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - h2',
      code: 'Heading\n-------',
      output: '## Heading ##',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - space after content',
      code: 'Heading \n=======',
      output: '# Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - tab after content',
      code: 'Heading\t\n=======',
      output: '# Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - mixed spaces and tabs after content',
      code: 'Heading \t \n=======',
      output: '# Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - strong emphasis',
      code: '**Heading**\n===========',
      output: '# **Heading** #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 12,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - tab after strong emphasis',
      code: '**Heading**\t\n===========',
      output: '# **Heading** #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 12,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - escaped trailing hash',
      code: 'Heading \\#\n==========',
      output: '# Heading \\# #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 11,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - unescaped trailing hashes',
      code: 'Heading ##\n==========',
      output: '# Heading ## #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 11,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - inside a blockquote',
      code: '> Heading\n> =======',
      output: '> # Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 2,
          endColumn: 10,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - tab after a blockquote marker',
      code: '>\tHeading\n> =======',
      output: '>\t# Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 2,
          endColumn: 10,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - inside a list item',
      code: '- Heading\n  =======',
      output: '- # Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 2,
          endColumn: 10,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - tab before a CRLF line ending',
      code: 'Heading\t\r\n=======\r\nParagraph',
      output: '# Heading #\r\nParagraph',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - spaces around the underline',
      code: 'Heading\n  ===  ',
      output: '# Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - mixed inline Markdown',
      code: '**bold** `code` [link](https://example.com) &copy; <span>HTML</span> 😀\n===',
      output:
        '# **bold** `code` [link](https://example.com) &copy; <span>HTML</span> 😀 #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 4,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - one leading space',
      code: ' Heading\n=======',
      output: ' # Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 2,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - two leading spaces',
      code: '  Heading\n=======',
      output: '  # Heading #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - three leading spaces at depth 2',
      code: '   Heading\n-------',
      output: '   ## Heading ##',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 4,
          endLine: 2,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '6-2-1. If it is single-line, it can be converted to `atx-closed`. (🔧) - preserves a preceding link definition',
      code: '[id]: /url\n[Heading][id]\n=============',
      output: '[id]: /url\n# [Heading][id] #',
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 14,
          data: { style: 'atx-closed' },
        },
      ],
    },

    {
      name: '6-2-2. If it is multiline, it cannot be converted to `atx-closed`. (❌) - h1',
      code: 'First line\nsecond line\n=======',
      output: null,
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 8,
          data: { style: 'atx-closed' },
          suggestions: [],
        },
      ],
    },
    {
      name: '6-2-2. If it is multiline, it cannot be converted to `atx-closed`. (❌) - h2',
      code: 'First line\nsecond line\n-------',
      output: null,
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 8,
          data: { style: 'atx-closed' },
          suggestions: [],
        },
      ],
    },
    {
      name: '6-2-2. If it is multiline, it cannot be converted to `atx-closed`. (❌) - strong emphasis spanning multiple lines',
      code: '**First\nsecond**\n=======',
      output: null,
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 8,
          data: { style: 'atx-closed' },
          suggestions: [],
        },
      ],
    },
    {
      name: '6-2-2. If it is multiline, it cannot be converted to `atx-closed`. (❌) - inline code spanning multiple lines',
      code: '`First\nsecond`\n-------',
      output: null,
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 8,
          data: { style: 'atx-closed' },
          suggestions: [],
        },
      ],
    },
    {
      name: '6-2-2. If it is multiline, it cannot be converted to `atx-closed`. (❌) - different inline nodes on separate lines',
      code: '**First**\n*second*\n=======',
      output: null,
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 8,
          data: { style: 'atx-closed' },
          suggestions: [],
        },
      ],
    },
    {
      name: '6-2-2. If it is multiline, it cannot be converted to `atx-closed`. (❌) - inside a blockquote',
      code: '> First\n> second\n> -------',
      output: null,
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 3,
          endColumn: 10,
          data: { style: 'atx-closed' },
          suggestions: [],
        },
      ],
    },
    {
      name: '6-2-2. If it is multiline, it cannot be converted to `atx-closed`. (❌) - inside a list item',
      code: '- First\n  second\n  -------',
      output: null,
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 3,
          endLine: 3,
          endColumn: 10,
          data: { style: 'atx-closed' },
          suggestions: [],
        },
      ],
    },
    {
      name: '6-2-2. If it is multiline, it cannot be converted to `atx-closed`. (❌) - tab and CRLF line endings',
      code: 'First line\t\r\nsecond line\r\n=======\r\nParagraph',
      output: null,
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 3,
          endColumn: 8,
          data: { style: 'atx-closed' },
          suggestions: [],
        },
      ],
    },

    // option: `style: 'consistent'`
    {
      name: '`consistent` style - uses the first ATX heading',
      code: `# Heading

## Heading ##

Heading
-------`,
      output: `# Heading

## Heading

## Heading`,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 14,
          data: { style: 'atx' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 6,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`consistent` style - uses the first closed ATX heading',
      code: `# Heading #

## Heading

Heading
-------`,
      output: `# Heading #

## Heading ##

## Heading ##`,
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 11,
          data: { style: 'atx-closed' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 6,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },
    {
      name: '`consistent` style - uses the first Setext heading',
      code: `Heading
=======

## Heading

## Heading ##`,
      output: null,
      errors: [
        {
          messageId: 'style',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 11,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n=======\n\nHeading\n-------\n\n## Heading ##',
            },
          ],
        },
        {
          messageId: 'style',
          line: 6,
          column: 1,
          endLine: 6,
          endColumn: 14,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'Heading\n=======\n\n## Heading\n\nHeading\n-------',
            },
          ],
        },
      ],
    },
    {
      name: '`consistent` style - uses the first Setext heading for an ATX H3',
      code: `H1
==

### H3`,
      output: null,
      options: [{ style: 'consistent' }],
      errors: [
        {
          messageId: 'style',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 7,
          data: { style: 'setext' },
        },
      ],
    },

    // option: `style: 'atx'`
    {
      name: '`atx` style - converts closed ATX and Setext headings',
      code: `# Heading #

## Heading

Heading
-------`,
      output: `# Heading

## Heading

## Heading`,
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 12,
          data: { style: 'atx' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 6,
          endColumn: 8,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`atx` style - preserves inline Markdown',
      code: '## Heading *emphasis* ##',
      output: '## Heading *emphasis*',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 25,
          data: { style: 'atx' },
        },
      ],
    },
    {
      name: '`atx` style - removes a closing sequence surrounded by tabs',
      code: '##\tHeading\t##\t',
      output: '##\tHeading',
      options: [{ style: 'atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 15,
          data: { style: 'atx' },
        },
      ],
    },

    // option: `style: 'atx-closed'`
    {
      name: '`atx-closed` style - converts ATX and Setext headings',
      code: `# Heading #

## Heading

Heading
-------`,
      output: `# Heading #

## Heading ##

## Heading ##`,
      options: [{ style: 'atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 11,
          data: { style: 'atx-closed' },
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 6,
          endColumn: 8,
          data: { style: 'atx-closed' },
        },
      ],
    },

    // option: `style: 'setext'`
    {
      name: '`setext` style - suggests converting ATX H1 and H2 headings',
      code: `# Heading

## Heading ##

Heading
-------`,
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 10,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'Heading\n=======\n\n## Heading ##\n\nHeading\n-------',
            },
          ],
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 14,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: '# Heading\n\nHeading\n-------\n\nHeading\n-------',
            },
          ],
        },
      ],
    },
    {
      name: '`setext` style - reports an ATX H3 without changing its depth',
      code: '### H3',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 7,
          data: { style: 'setext' },
        },
      ],
    },
    {
      name: '`setext` style - heading content starting with a number sign is not an ATX heading on its own line',
      code: '# #hashtag',
      output: null,
      options: [{ style: 'setext' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 11,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: '#hashtag\n========',
            },
          ],
        },
      ],
    },

    // option: `style: 'setext-with-atx'`
    {
      name: '`setext-with-atx` style - rejects ATX H1/H2 and closed ATX H3+',
      code: `# H1

## H2

### H3 ###

#### H4`,
      output: '# H1\n\n## H2\n\n### H3\n\n#### H4',
      options: [{ style: 'setext-with-atx' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 5,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: 'H1\n==\n\n## H2\n\n### H3 ###\n\n#### H4',
            },
          ],
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 6,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestAtxToSetext',
              output: '# H1\n\nH2\n--\n\n### H3 ###\n\n#### H4',
            },
          ],
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 11,
          data: { style: 'atx' },
        },
      ],
    },

    // option: `style: 'setext-with-atx-closed'`
    {
      name: '`setext-with-atx-closed` style - rejects closed ATX H1/H2 and ATX H3+',
      code: `# H1 #

## H2 ##

### H3

#### H4 ####`,
      output: '# H1 #\n\n## H2 ##\n\n### H3 ###\n\n#### H4 ####',
      options: [{ style: 'setext-with-atx-closed' }],
      errors: [
        {
          messageId: 'style',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 7,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: 'H1\n==\n\n## H2 ##\n\n### H3\n\n#### H4 ####',
            },
          ],
        },
        {
          messageId: 'style',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 9,
          data: { style: 'setext' },
          suggestions: [
            {
              messageId: 'suggestATXClosedToSetext',
              output: '# H1 #\n\nH2\n--\n\n### H3\n\n#### H4 ####',
            },
          ],
        },
        {
          messageId: 'style',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 7,
          data: { style: 'atx-closed' },
        },
      ],
    },
  ],
});
