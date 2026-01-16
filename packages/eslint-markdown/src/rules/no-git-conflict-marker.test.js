/**
 * @fileoverview Test for `no-git-conflict-marker.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './no-git-conflict-marker.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester(getFileName(import.meta.url), rule, {
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
      name: 'Three spaces in front of `<`',
      code: '   <<<<<<<',
    },
    {
      name: 'Three spaces in front of `=`',
      code: '   =======',
    },
    {
      name: 'Three spaces in front of `>`',
      code: '   >>>>>>>',
    },
    {
      name: '`<` repeats 6 times',
      code: '<<<<<<',
    },
    {
      name: '`=` repeats 6 times',
      code: '======',
    },
    {
      name: '`>` repeats 6 times',
      code: '>>>>>>',
    },
    {
      name: '`<` repeats 8 times',
      code: '<<<<<<<<',
    },
    {
      name: '`=` repeats 8 times',
      code: '========',
    },
    {
      name: '`>` repeats 8 times',
      code: '>>>>>>>>',
    },
    {
      name: 'LS(U+2028) should not be recognized as a line terminator',
      code: '\u2028<<<<<<< HEAD\u2028Hello\u2028=======\u2028World\u2028>>>>>>> ab18d2f0f5151ab0c927a12eb0a64f8170762eff',
    },
    {
      name: 'PS(U+2029) should not be recognized as a line terminator',
      code: '\u2029<<<<<<< HEAD\u2029Hello\u2029=======\u2029World\u2029>>>>>>> ab18d2f0f5151ab0c927a12eb0a64f8170762eff',
    },

    // Options
    {
      name: '`skipCode: true` option: code block should be skipped (`>`)',
      code: `\`\`\`md
>>>>>>> ab18d2f0f5151ab0c927a12eb0a64f8170762eff
\`\`\``,
    },
    {
      name: '`skipCode: true` option: code block should be skipped (`=`)',
      code: `\`\`\`md
=======
\`\`\``,
    },
    {
      name: '`skipCode: true` option: code block should be skipped (`<`)',
      code: `\`\`\`md
<<<<<<< HEAD
\`\`\``,
    },
    {
      name: "`skipCode: ['md']` option: code block with language 'md' should be skipped",
      code: `\`\`\`md
<<<<<<< HEAD
\`\`\``,
      options: [
        {
          skipCode: ['md'],
        },
      ],
    },
    {
      name: "`skipCode: ['txt']` option: code block with language 'txt' should be skipped",
      code: `\`\`\`txt
<<<<<<< HEAD
\`\`\``,
      options: [
        {
          skipCode: ['txt'],
        },
      ],
    },
  ],

  invalid: [
    // Basic
    {
      name: '`<` repeats 7 times',
      code: '<<<<<<<',
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: {
            gitConflictMarker: '<<<<<<<',
          },
        },
      ],
    },
    {
      name: '`=` repeats 7 times',
      code: '=======',
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: {
            gitConflictMarker: '=======',
          },
        },
      ],
    },
    {
      name: '`>` repeats 7 times',
      code: '>>>>>>>',
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: {
            gitConflictMarker: '>>>>>>>',
          },
        },
      ],
    },
    {
      name: 'Real world example (CRLF)',
      code: '<<<<<<< HEAD\r\nHello\r\n=======\r\nWorld\r\n>>>>>>> ab18d2f0f5151ab0c927a12eb0a64f8170762eff',
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: {
            gitConflictMarker: '<<<<<<<',
          },
        },
        {
          messageId: 'noGitConflictMarker',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 8,
          data: {
            gitConflictMarker: '=======',
          },
        },
        {
          messageId: 'noGitConflictMarker',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 8,
          data: {
            gitConflictMarker: '>>>>>>>',
          },
        },
      ],
    },
    {
      name: 'Real world example (CR)',
      code: '<<<<<<< HEAD\rHello\r=======\rWorld\r>>>>>>> ab18d2f0f5151ab0c927a12eb0a64f8170762eff',
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: {
            gitConflictMarker: '<<<<<<<',
          },
        },
        {
          messageId: 'noGitConflictMarker',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 8,
          data: {
            gitConflictMarker: '=======',
          },
        },
        {
          messageId: 'noGitConflictMarker',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 8,
          data: {
            gitConflictMarker: '>>>>>>>',
          },
        },
      ],
    },
    {
      name: 'Real world example (LF)',
      code: '<<<<<<< HEAD\nHello\n=======\nWorld\n>>>>>>> ab18d2f0f5151ab0c927a12eb0a64f8170762eff',
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
          data: {
            gitConflictMarker: '<<<<<<<',
          },
        },
        {
          messageId: 'noGitConflictMarker',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 8,
          data: {
            gitConflictMarker: '=======',
          },
        },
        {
          messageId: 'noGitConflictMarker',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 8,
          data: {
            gitConflictMarker: '>>>>>>>',
          },
        },
      ],
    },
    {
      name: 'Git conflict marker in code',
      code: '```txt\n>>>>>>>\n```\n>>>>>>>',
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 8,
          data: {
            gitConflictMarker: '>>>>>>>',
          },
        },
      ],
    },

    // Options
    {
      name: '`skipCode: false` option: code block should not be skipped (`>`)',
      code: `\`\`\`md
>>>>>>> ab18d2f0f5151ab0c927a12eb0a64f8170762eff
\`\`\``,
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: {
            gitConflictMarker: '>>>>>>>',
          },
        },
      ],
      options: [
        {
          skipCode: false,
        },
      ],
    },
    {
      name: '`skipCode: false` option: code block should not be skipped (`=`)',
      code: `\`\`\`md
=======
\`\`\``,
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: {
            gitConflictMarker: '=======',
          },
        },
      ],
      options: [
        {
          skipCode: false,
        },
      ],
    },
    {
      name: '`skipCode: false` option: code block should not be skipped (`<`)',
      code: `\`\`\`md
<<<<<<< HEAD
\`\`\``,
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: {
            gitConflictMarker: '<<<<<<<',
          },
        },
      ],
      options: [
        {
          skipCode: false,
        },
      ],
    },
    {
      name: "`skipCode: ['js', 'ts']` option: code block with language `md` should not be skipped (`<`)",
      code: `\`\`\`md
<<<<<<< HEAD
\`\`\``,
      errors: [
        {
          messageId: 'noGitConflictMarker',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 8,
          data: {
            gitConflictMarker: '<<<<<<<',
          },
        },
      ],
      options: [
        {
          skipCode: ['js', 'ts'],
        },
      ],
    },
  ],
});
