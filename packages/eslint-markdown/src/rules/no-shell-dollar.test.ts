/**
 * @fileoverview Test for `no-shell-dollar.ts`.
 * @author Marry(uncoolclub)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-shell-dollar.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-shell-dollar', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },
    {
      name: 'Fenced code block without a dollar sign',
      code: '```sh\nnpm install\n```',
    },
    {
      name: 'Fenced code block showing output',
      code: '```sh\n$ npm --version\n10.9.2\n```',
    },
    {
      name: 'Fenced code block showing output for the last command only',
      code: '```sh\n$ npm install\n$ npm --version\n10.9.2\n```',
    },
    {
      name: 'Dollar sign without a following space',
      code: '```sh\n$npm install\n```',
    },
    {
      name: 'Dollar sign without a command',
      code: '```sh\n$\n```',
    },
    {
      name: 'Dollar sign in the middle of a command',
      code: '```sh\necho $PATH\n```',
    },
    {
      name: 'Empty fenced code block',
      code: '```sh\n```',
    },
    {
      name: 'Fenced code block containing blank lines only',
      code: '```sh\n\n\n```',
    },
    {
      name: 'Carriage return line endings showing output',
      code: '```sh\r$ npm --version\r10.9.2\r```',
    },
    {
      // NOTE: CommonMark treats only spaces and tabs as blank, so the line below is content, not a blank line.
      name: 'Line containing only a no-break space',
      code: '```sh\n$ npm install\n\u00a0\n```',
    },
    {
      name: 'Line containing only a line tabulation',
      code: '```sh\n$ npm install\n\v\n```',
    },
    {
      name: 'Line containing only a form feed',
      code: '```sh\n$ npm install\n\f\n```',
    },
    {
      name: 'Indented code block showing output',
      code: '    $ ls\n    file.txt',
    },
    {
      name: 'Blockquote showing output',
      code: '> ```sh\n> $ ls\n> file.txt\n> ```',
    },
    {
      name: 'Inline code',
      code: '`$ npm install`',
    },
    {
      name: 'Paragraph',
      code: '$ npm install',
    },
    {
      name: 'Continued command followed by output',
      code: '```sh\n$ npm install \\\n    --save-dev eslint\nadded 1 package\n```',
    },
    {
      name: 'Blank line ending a continued command followed by output',
      code: '```sh\n$ printf foo \\\n\noutput\n```',
    },
    {
      name: 'Backslash followed by spaces before output',
      code: '```sh\n$ printf foo \\   \noutput\n```',
    },
    {
      name: 'Escaped trailing backslash followed by output',
      code: '```sh\n$ echo \\\\\n\\\n```',
    },
    {
      name: 'Shell secondary prompt',
      code: '```sh\n$ for f in *; do\n> echo $f\n> done\n```',
    },

    // Options
    {
      name: '`skipCode` option skipping the language of the code block',
      code: '```sh\n$ npm install\n```',
      options: [{ skipCode: ['sh'] }],
    },
    {
      name: '`skipCode` option skipping one of multiple languages',
      code: '```sh\n$ npm install\n```\n\n```console\n$ ls\n```',
      options: [{ skipCode: ['sh', 'console'] }],
    },
  ],

  invalid: [
    {
      name: 'Fenced code block with a single command',
      code: '```sh\n$ npm install\n```',
      output: '```sh\nnpm install\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Fenced code block with multiple commands',
      code: '```sh\n$ npm install\n$ npm run build\n```',
      output: '```sh\nnpm install\nnpm run build\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
        {
          messageId: 'noShellDollar',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Fenced code block without a language',
      code: '```\n$ ls\n```',
      output: '```\nls\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Fenced code block with a `meta` looking like a command',
      code: '```sh $ ls\n$ ls\n```',
      output: '```sh $ ls\nls\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Command indented inside a fenced code block',
      code: '```sh\n  $ ls\n```',
      output: '```sh\n  ls\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Command with multiple spaces after the dollar sign',
      code: '```sh\n$   ls\n```',
      output: '```sh\nls\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Command with a tab after the dollar sign',
      code: '```sh\n$\tls\n```',
      output: '```sh\nls\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Commands separated by a blank line',
      code: '```sh\n$ npm install\n\n$ npm run build\n```',
      output: '```sh\nnpm install\n\nnpm run build\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
        {
          messageId: 'noShellDollar',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Indented code block',
      code: '    $ ls',
      output: '    ls',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
        },
      ],
    },
    {
      name: 'Fenced code block inside a blockquote',
      code: '> ```sh\n> $ ls\n> ```',
      output: '> ```sh\n> ls\n> ```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
        },
      ],
    },
    {
      name: 'Fenced code block inside a list item',
      code: '- ```sh\n  $ ls\n  ```',
      output: '- ```sh\n  ls\n  ```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
        },
      ],
    },
    {
      // NOTE: Unlike `markdownlint` and `remark-lint`, `eslint-markdown` recognizes the
      // backslash-newline pair as a line continuation, which better reflects the rule's intent.
      name: 'Command continued with a backslash',
      code: '```sh\n$ npm install \\\n    --save-dev eslint\n```',
      output: '```sh\nnpm install \\\n    --save-dev eslint\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Carriage return line endings',
      code: '```sh\r$ npm install\r$ npm run build\r```',
      output: '```sh\rnpm install\rnpm run build\r```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
        {
          messageId: 'noShellDollar',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Carriage return and line feed line endings',
      code: '```sh\r\n$ npm install\r\n$ npm run build\r\n```',
      output: '```sh\r\nnpm install\r\nnpm run build\r\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
        {
          messageId: 'noShellDollar',
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Command continued with a backslash across carriage return and line feed line endings',
      code: '```sh\r\n$ npm install \\\r\n    --save-dev eslint\r\n```',
      output: '```sh\r\nnpm install \\\r\n    --save-dev eslint\r\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      // NOTE: Unlike `markdownlint` and `remark-lint`, `eslint-markdown` recognizes the
      // backslash-newline pair as a line continuation, which better reflects the rule's intent.
      name: 'Command continued across multiple lines',
      code: '```sh\n$ docker run \\\n  --rm \\\n  alpine\n$ echo done\n```',
      output: '```sh\ndocker run \\\n  --rm \\\n  alpine\necho done\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
        {
          messageId: 'noShellDollar',
          line: 5,
          column: 1,
          endLine: 5,
          endColumn: 3,
        },
      ],
    },
    {
      // NOTE: Unlike `markdownlint` and `remark-lint`, `eslint-markdown` recognizes the
      // backslash-newline pair as a line continuation, which better reflects the rule's intent.
      name: 'Command repeated after the same text appears on a continuation line',
      code: '```sh\n$ echo \\\n$ echo hi\n$ echo hi\n```',
      output: '```sh\necho \\\n$ echo hi\necho hi\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
        {
          messageId: 'noShellDollar',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Multiple fenced code blocks where only one shows output',
      code: '```sh\n$ ls\n```\n\n```sh\n$ ls\nfile.txt\n```',
      output: '```sh\nls\n```\n\n```sh\n$ ls\nfile.txt\n```',
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },

    // Options
    {
      name: '`skipCode` option not covering the language of the code block',
      code: '```sh\n$ npm install\n```',
      output: '```sh\nnpm install\n```',
      options: [{ skipCode: ['console'] }],
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: '`skipCode` option not covering a code block without a language',
      code: '```\n$ ls\n```',
      output: '```\nls\n```',
      options: [{ skipCode: ['sh'] }],
      errors: [
        {
          messageId: 'noShellDollar',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
  ],
});
