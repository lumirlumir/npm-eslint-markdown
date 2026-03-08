/**
 * @fileoverview Test for `code-lang-shorthand.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ruleTester } from '../core/rule-tester.js';
import rule from './code-lang-shorthand.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('code-lang-shorthand', rule, {
  valid: [
    // Basic
    {
      name: 'Indented code block',
      code: `    Indented code block`,
    },
    {
      name: 'Fenced code block without lang - 1',
      code: `\`\`\`
Fenced code block without lang
\`\`\``,
    },
    {
      name: 'Fenced code block without lang - 2',
      code: `\`\`\`
const foo = 'bar';
\`\`\``,
    },
    {
      name: 'Unknown lang identifier',
      code: `\`\`\`unknownlang
Some code here.
\`\`\``,
    },
    {
      name: 'Shorthand lang identifier - 1',
      code: `\`\`\`js
const foo = 'bar';
\`\`\``,
    },
    {
      name: 'Shorthand lang identifier - 2',
      code: `\`\`\`ts
const foo = 'bar';
\`\`\``,
    },
    {
      name: 'Shorthand lang identifier - 3',
      code: `\`\`\`md
Hello, world!
\`\`\``,
    },

    // Options - allow
    {
      name: 'Allow lang identifier - 1',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      options: [
        {
          allow: ['javascript'],
        },
      ],
    },
    {
      name: 'Allow lang identifier - 2',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      options: [
        {
          allow: ['JavaScript'],
        },
      ],
    },
    {
      name: 'Allow lang identifier - 3',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      options: [
        {
          allow: ['JAVASCRIPT'],
        },
      ],
    },
    {
      name: 'Allow lang identifier - 4',
      code: `\`\`\`JAVASCRIPT
const foo = 'bar';
\`\`\``,
      options: [
        {
          allow: ['JAVASCRIPT'],
        },
      ],
    },
    {
      name: 'Allow lang identifiers',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\`

\`\`\`typescript
const foo = 'bar';
\`\`\``,
      options: [
        {
          allow: ['javascript', 'typescript'],
        },
      ],
    },

    // Options - allow, override
    {
      name: 'Allow and override lang identifiers - 1',
      code: `\`\`\`abcdefg
1234567890
\`\`\``,
      options: [
        {
          allow: ['abcdefg'],
          override: {
            abcdefg: 'abc',
          },
        },
      ],
    },
    {
      name: 'Allow and override lang identifiers - 2',
      code: `\`\`\`example
1234567890
\`\`\``,
      options: [
        {
          allow: ['example'],
          override: {
            example: 'ex',
          },
        },
      ],
    },
    {
      name: 'Allow and override lang identifiers - 3',
      code: `\`\`\`abcdefg
1234567890
\`\`\`

\`\`\`example
1234567890
\`\`\``,
      options: [
        {
          allow: ['abcdefg', 'example'],
          override: {
            abcdefg: 'abc',
            example: 'ex',
          },
        },
      ],
    },
  ],

  invalid: [
    // Basic
    {
      name: 'Non-shorthand lang identifier (javascript) - 1',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`js
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'Non-shorthand lang identifier (javascript) - 2',
      code: `\`\`\` javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\` js
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      name: 'Non-shorthand lang identifier (javascript) - 3',
      code: `\`\`\`  javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`  js
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      name: 'Non-shorthand lang identifier (javascript) - 4',
      code: "```  javascript  \nconst foo = 'bar';\n```",
      output: "```  js  \nconst foo = 'bar';\n```",
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 16,
        },
      ],
    },
    {
      name: 'Non-shorthand lang identifier (shell)',
      code: `\`\`\`shell
echo "Hello, World!"
\`\`\``,
      output: `\`\`\`sh
echo "Hello, World!"
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'shell',
            langShorthand: 'sh',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 9,
        },
      ],
    },

    // Case-insensitive
    {
      name: 'Case-insensitive non-shorthand lang identifier (TypeScript)',
      code: `\`\`\`TypeScript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`ts
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'TypeScript',
            langShorthand: 'ts',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'Case-insensitive non-shorthand lang identifier (TYPESCRIPT)',
      code: `\`\`\`TYPESCRIPT
const foo = 'bar';
\`\`\``,
      output: `\`\`\`ts
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'TYPESCRIPT',
            langShorthand: 'ts',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },
    {
      name: 'Case-insensitive non-shorthand lang identifier (AsciiDoc)',
      code: `\`\`\`AsciiDoc
Hello, World!
\`\`\``,
      output: `\`\`\`adoc
Hello, World!
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'AsciiDoc',
            langShorthand: 'adoc',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },

    // Code block with backticks and tilde
    {
      name: 'Code block with 4 backticks',
      code: `\`\`\`\`javascript
const foo = 'bar';
\`\`\`\``,
      output: `\`\`\`\`js
const foo = 'bar';
\`\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      name: 'Code block with 3 tildes',
      code: `~~~javascript
const foo = 'bar';
~~~`,
      output: `~~~js
const foo = 'bar';
~~~`,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'js',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
    },

    // Options - override
    {
      name: 'Adding a new abbreviation - 1',
      code: `\`\`\`example
example
\`\`\``,
      output: `\`\`\`ex
example
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'example',
            langShorthand: 'ex',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 11,
        },
      ],
      options: [
        {
          override: {
            example: 'ex',
          },
        },
      ],
    },
    {
      name: 'Adding a new abbreviation - 2',
      code: `\`\`\`Example
example
\`\`\``,
      output: `\`\`\`ex
example
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'Example',
            langShorthand: 'ex',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 11,
        },
      ],
      options: [
        {
          override: {
            example: 'ex',
          },
        },
      ],
    },
    {
      name: 'Adding a new abbreviation - 3',
      code: `\`\`\`EXAMPLE
example
\`\`\``,
      output: `\`\`\`ex
example
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'EXAMPLE',
            langShorthand: 'ex',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 11,
        },
      ],
      options: [
        {
          override: {
            example: 'ex',
          },
        },
      ],
    },
    {
      name: 'Adding a new abbreviation - 4',
      code: `\`\`\`abcdefg
1234567890
\`\`\``,
      output: `\`\`\`abc
1234567890
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'abcdefg',
            langShorthand: 'abc',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 11,
        },
      ],
      options: [
        {
          override: {
            abcdefg: 'abc',
          },
        },
      ],
    },
    {
      name: 'Adding a new abbreviation - 5',
      code: `\`\`\`example
example
\`\`\`

\`\`\`abcdefg
1234567890
\`\`\``,
      output: `\`\`\`ex
example
\`\`\`

\`\`\`abc
1234567890
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'example',
            langShorthand: 'ex',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 11,
        },
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'abcdefg',
            langShorthand: 'abc',
          },
          line: 5,
          column: 4,
          endLine: 5,
          endColumn: 11,
        },
      ],
      options: [
        {
          override: {
            example: 'ex',
            abcdefg: 'abc',
          },
        },
      ],
    },
    {
      name: 'Adding a new abbreviation - 6',
      code: `\`\`\`example
example
\`\`\``,
      output: `\`\`\`ex
example
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'example',
            langShorthand: 'ex',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 11,
        },
      ],
      options: [
        {
          override: {
            EXAMPLE: 'EX',
          },
        },
      ],
    },

    {
      name: 'Overriding an existing abbreviation - 1',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`mjs
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'mjs',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
      options: [
        {
          override: {
            javascript: 'mjs',
          },
        },
      ],
    },
    {
      name: 'Overriding an existing abbreviation - 2',
      code: `\`\`\`javascript
const foo = 'bar';
\`\`\``,
      output: `\`\`\`abc
const foo = 'bar';
\`\`\``,
      errors: [
        {
          messageId: 'codeLangShorthand',
          data: {
            lang: 'javascript',
            langShorthand: 'abc',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 14,
        },
      ],
      options: [
        {
          override: {
            javascript: 'abc',
          },
        },
      ],
    },
  ],
});
