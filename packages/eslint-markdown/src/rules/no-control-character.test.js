/**
 * @fileoverview Test for `no-control-character.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getFileName, ruleTester } from '../core/tests/index.js';
import rule from './no-control-character.js';

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
      name: 'control character in code - 1',
      code: `
\`\`\`js
\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u000b\u000c\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f\u007f\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008a\u008b\u008c\u008d\u008e\u008f\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009a\u009b\u009c\u009d\u009e\u009f\u202c\u202d\u202e
\`\`\``,
    },
    {
      name: 'control character in code - 2',
      code: `
\`\`\`js\u0000
console.log(\u0003'Hello World');
\`\`\``,
    },
    {
      name: 'control character in inline code',
      code: `\`console.log(\u0004'Hello World')\`

\`console.log(\u0005'Hello World')\``,
    },

    // Options
    {
      name: '`allow`',
      code: `1\u00002\u0001`,
      options: [
        {
          allow: ['\u0000', '\u0001'],
        },
      ],
    },
    {
      name: "`skipCode: ['md']`",
      code: `\`\`\`md
\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u000b\u000c\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f\u007f\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008a\u008b\u008c\u008d\u008e\u008f\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009a\u009b\u009c\u009d\u009e\u009f\u202c\u202d\u202e
\`\`\``,
      options: [
        {
          skipCode: ['md'],
        },
      ],
    },
    {
      name: "`skipCode: ['txt']`",
      code: `\`\`\`txt
\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u000b\u000c\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f\u007f\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008a\u008b\u008c\u008d\u008e\u008f\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009a\u009b\u009c\u009d\u009e\u009f\u202c\u202d\u202e
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
      name: 'control character',
      code: `
1\u00002\u00013\u00024\u00035\u00046\u00057\u00068\u00079\u00080\u000b
1\u000c2\u000e3\u000f4\u00105\u00116\u00127\u00138\u00149\u00150\u0016
1\u00172\u00183\u00194\u001a5\u001b6\u001c7\u001d8\u001e9\u001f0\u007f
1\u00802\u00813\u00824\u00835\u00846\u00857\u00868\u00879\u00880\u0089
1\u008a2\u008b3\u008c4\u008d5\u008e6\u008f7\u00908\u00919\u00920\u0093
1\u00942\u00953\u00964\u00975\u00986\u00997\u009a8\u009b9\u009c0\u009d
1\u009e2\u009f3\u202c4\u202d5\u202e`,
      errors: [
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 3,
          data: {
            controlCharacter: 'U+0000',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 5,
          data: {
            controlCharacter: 'U+0001',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 6,
          endLine: 2,
          endColumn: 7,
          data: {
            controlCharacter: 'U+0002',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 8,
          endLine: 2,
          endColumn: 9,
          data: {
            controlCharacter: 'U+0003',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 10,
          endLine: 2,
          endColumn: 11,
          data: {
            controlCharacter: 'U+0004',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 12,
          endLine: 2,
          endColumn: 13,
          data: {
            controlCharacter: 'U+0005',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 14,
          endLine: 2,
          endColumn: 15,
          data: {
            controlCharacter: 'U+0006',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 16,
          endLine: 2,
          endColumn: 17,
          data: {
            controlCharacter: 'U+0007',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 18,
          endLine: 2,
          endColumn: 19,
          data: {
            controlCharacter: 'U+0008',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 20,
          endLine: 2,
          endColumn: 21,
          data: {
            controlCharacter: 'U+000B',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 2,
          endLine: 3,
          endColumn: 3,
          data: {
            controlCharacter: 'U+000C',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 4,
          endLine: 3,
          endColumn: 5,
          data: {
            controlCharacter: 'U+000E',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 6,
          endLine: 3,
          endColumn: 7,
          data: {
            controlCharacter: 'U+000F',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 8,
          endLine: 3,
          endColumn: 9,
          data: {
            controlCharacter: 'U+0010',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 10,
          endLine: 3,
          endColumn: 11,
          data: {
            controlCharacter: 'U+0011',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 12,
          endLine: 3,
          endColumn: 13,
          data: {
            controlCharacter: 'U+0012',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 14,
          endLine: 3,
          endColumn: 15,
          data: {
            controlCharacter: 'U+0013',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 16,
          endLine: 3,
          endColumn: 17,
          data: {
            controlCharacter: 'U+0014',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 18,
          endLine: 3,
          endColumn: 19,
          data: {
            controlCharacter: 'U+0015',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 20,
          endLine: 3,
          endColumn: 21,
          data: {
            controlCharacter: 'U+0016',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 4,
          column: 2,
          endLine: 4,
          endColumn: 3,
          data: {
            controlCharacter: 'U+0017',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 4,
          column: 4,
          endLine: 4,
          endColumn: 5,
          data: {
            controlCharacter: 'U+0018',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 4,
          column: 6,
          endLine: 4,
          endColumn: 7,
          data: {
            controlCharacter: 'U+0019',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 4,
          column: 8,
          endLine: 4,
          endColumn: 9,
          data: {
            controlCharacter: 'U+001A',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 4,
          column: 10,
          endLine: 4,
          endColumn: 11,
          data: {
            controlCharacter: 'U+001B',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 4,
          column: 12,
          endLine: 4,
          endColumn: 13,
          data: {
            controlCharacter: 'U+001C',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 4,
          column: 14,
          endLine: 4,
          endColumn: 15,
          data: {
            controlCharacter: 'U+001D',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 4,
          column: 16,
          endLine: 4,
          endColumn: 17,
          data: {
            controlCharacter: 'U+001E',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 4,
          column: 18,
          endLine: 4,
          endColumn: 19,
          data: {
            controlCharacter: 'U+001F',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 4,
          column: 20,
          endLine: 4,
          endColumn: 21,
          data: {
            controlCharacter: 'U+007F',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 2,
          endLine: 5,
          endColumn: 3,
          data: {
            controlCharacter: 'U+0080',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 4,
          endLine: 5,
          endColumn: 5,
          data: {
            controlCharacter: 'U+0081',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 6,
          endLine: 5,
          endColumn: 7,
          data: {
            controlCharacter: 'U+0082',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 8,
          endLine: 5,
          endColumn: 9,
          data: {
            controlCharacter: 'U+0083',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 10,
          endLine: 5,
          endColumn: 11,
          data: {
            controlCharacter: 'U+0084',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 12,
          endLine: 5,
          endColumn: 13,
          data: {
            controlCharacter: 'U+0085',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 14,
          endLine: 5,
          endColumn: 15,
          data: {
            controlCharacter: 'U+0086',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 16,
          endLine: 5,
          endColumn: 17,
          data: {
            controlCharacter: 'U+0087',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 18,
          endLine: 5,
          endColumn: 19,
          data: {
            controlCharacter: 'U+0088',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 20,
          endLine: 5,
          endColumn: 21,
          data: {
            controlCharacter: 'U+0089',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 6,
          column: 2,
          endLine: 6,
          endColumn: 3,
          data: {
            controlCharacter: 'U+008A',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 6,
          column: 4,
          endLine: 6,
          endColumn: 5,
          data: {
            controlCharacter: 'U+008B',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 6,
          column: 6,
          endLine: 6,
          endColumn: 7,
          data: {
            controlCharacter: 'U+008C',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 6,
          column: 8,
          endLine: 6,
          endColumn: 9,
          data: {
            controlCharacter: 'U+008D',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 6,
          column: 10,
          endLine: 6,
          endColumn: 11,
          data: {
            controlCharacter: 'U+008E',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 6,
          column: 12,
          endLine: 6,
          endColumn: 13,
          data: {
            controlCharacter: 'U+008F',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 6,
          column: 14,
          endLine: 6,
          endColumn: 15,
          data: {
            controlCharacter: 'U+0090',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 6,
          column: 16,
          endLine: 6,
          endColumn: 17,
          data: {
            controlCharacter: 'U+0091',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 6,
          column: 18,
          endLine: 6,
          endColumn: 19,
          data: {
            controlCharacter: 'U+0092',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 6,
          column: 20,
          endLine: 6,
          endColumn: 21,
          data: {
            controlCharacter: 'U+0093',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 7,
          column: 2,
          endLine: 7,
          endColumn: 3,
          data: {
            controlCharacter: 'U+0094',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 7,
          column: 4,
          endLine: 7,
          endColumn: 5,
          data: {
            controlCharacter: 'U+0095',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 7,
          column: 6,
          endLine: 7,
          endColumn: 7,
          data: {
            controlCharacter: 'U+0096',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 7,
          column: 8,
          endLine: 7,
          endColumn: 9,
          data: {
            controlCharacter: 'U+0097',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 7,
          column: 10,
          endLine: 7,
          endColumn: 11,
          data: {
            controlCharacter: 'U+0098',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 7,
          column: 12,
          endLine: 7,
          endColumn: 13,
          data: {
            controlCharacter: 'U+0099',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 7,
          column: 14,
          endLine: 7,
          endColumn: 15,
          data: {
            controlCharacter: 'U+009A',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 7,
          column: 16,
          endLine: 7,
          endColumn: 17,
          data: {
            controlCharacter: 'U+009B',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 7,
          column: 18,
          endLine: 7,
          endColumn: 19,
          data: {
            controlCharacter: 'U+009C',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 7,
          column: 20,
          endLine: 7,
          endColumn: 21,
          data: {
            controlCharacter: 'U+009D',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 8,
          column: 2,
          endLine: 8,
          endColumn: 3,
          data: {
            controlCharacter: 'U+009E',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 8,
          column: 4,
          endLine: 8,
          endColumn: 5,
          data: {
            controlCharacter: 'U+009F',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 8,
          column: 6,
          endLine: 8,
          endColumn: 7,
          data: {
            controlCharacter: 'U+202C',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 8,
          column: 8,
          endLine: 8,
          endColumn: 9,
          data: {
            controlCharacter: 'U+202D',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 8,
          column: 10,
          endLine: 8,
          endColumn: 11,
          data: {
            controlCharacter: 'U+202E',
          },
        },
      ],
    },
    {
      name: 'Control character in inline code',
      code: '`\u0000`\u0000',
      errors: [
        {
          messageId: 'noControlCharacter',
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 5,
          data: {
            controlCharacter: 'U+0000',
          },
        },
      ],
    },

    // Options
    {
      name: '`allow`',
      code: `1\u00002\u00013\u0002`,
      errors: [
        {
          messageId: 'noControlCharacter',
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 7,
          data: {
            controlCharacter: 'U+0002',
          },
        },
      ],
      options: [
        {
          allow: ['\u0000', '\u0001'],
        },
      ],
    },
    {
      name: '`skipCode: false`',
      code: `
\`\`\`js
console.log(\u0005'Hello World');
\`\`\``,
      errors: [
        {
          messageId: 'noControlCharacter',
          line: 3,
          column: 13,
          endLine: 3,
          endColumn: 14,
          data: {
            controlCharacter: 'U+0005',
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
      name: "`skipCode: ['js', 'ts']`",
      code: `\`\`\`md
Foo\u0002Bar
\`\`\`

    code block with\u0003ETX`,
      errors: [
        {
          messageId: 'noControlCharacter',
          line: 2,
          column: 4,
          endLine: 2,
          endColumn: 5,
          data: {
            controlCharacter: 'U+0002',
          },
        },
        {
          messageId: 'noControlCharacter',
          line: 5,
          column: 20,
          endLine: 5,
          endColumn: 21,
          data: {
            controlCharacter: 'U+0003',
          },
        },
      ],
      options: [
        {
          skipCode: ['js', 'ts'],
        },
      ],
    },
    {
      name: '`skipInlineCode: false`',
      code: "`console.log(\u0006'Hello World')`",
      errors: [
        {
          messageId: 'noControlCharacter',
          line: 1,
          column: 14,
          endLine: 1,
          endColumn: 15,
          data: {
            controlCharacter: 'U+0006',
          },
        },
      ],
      options: [
        {
          skipInlineCode: false,
        },
      ],
    },
  ],
});
