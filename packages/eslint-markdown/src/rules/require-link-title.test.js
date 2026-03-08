/**
 * @fileoverview Test for `require-link-title.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { ruleTester } from '../core/rule-tester.js';
import rule from './require-link-title.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('require-link-title', rule, {
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
      name: 'Link node with title attribute - 1',
      code: '[](https://example.com "title")',
    },
    {
      name: 'Link node with title attribute - 2',
      code: "[](https://example.com 'title')",
    },
    {
      name: 'Link node with title attribute - 3',
      code: '[](https://example.com (title))',
    },
    {
      name: 'Link node with autolink - 1',
      code: '<https://example.com>',
    },
    {
      name: 'Link node with autolink - 2',
      code: 'https://example.com',
      language: 'markdown/gfm',
    },
    {
      // https://github.github.com/gfm/#example-625
      name: 'Link node with autolink - 3',
      code: 'www.google.com/search?q=Markup+(business)',
      language: 'markdown/gfm',
    },
    {
      name: 'LinkReference node with title attribute - 1',
      code: `
[text][link]

[link]: https://example.com "title"
`,
    },
    {
      name: 'LinkReference node with title attribute - 2',
      code: `
[text][link]

[link]: https://example.com 'title'
`,
    },
    {
      name: 'LinkReference node with title attribute - 3',
      code: `
[text][link]

[link]: https://example.com (title)
`,
    },
    {
      name: "LinkReference node with `'//'`",
      code: `
[text][//]

[//]: https://example.com
`,
    },
    {
      name: 'Html node with title attribute',
      code: '<a href="https://example.com" title="title">text</a>',
    },
    {
      name: 'Nested Html node with title attribute',
      code: `
<div>
  <a href="https://example.com" title="title">text</a>
</div>
`,
    },

    // Options
    {
      name: "LinkReference node with `'hi'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['hi'] }],
      code: `
[text][hi]

[hi]: https://example.com
`,
    },
    {
      name: "LinkReference node with `'HI'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['HI'] }],
      code: `
[text][hi]

[hi]: https://example.com
`,
    },
    {
      name: "LinkReference node with `'GRÜẞE'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['GRÜẞE'] }],
      code: `
[text][Grüsse]

[Grüsse]: https://example.com
`,
    },
  ],

  invalid: [
    {
      name: 'Link node without title attribute',
      code: '[](https://example.com)',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 24,
        },
      ],
    },
    {
      name: 'Link node with empty title attribute - 1',
      code: '[](https://example.com "")',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 27,
        },
      ],
    },
    {
      name: 'Link node with empty title attribute - 2',
      code: "[](https://example.com '')",
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 27,
        },
      ],
    },
    {
      name: 'Link node with empty title attribute - 3',
      code: '[](https://example.com ())',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 27,
        },
      ],
    },

    {
      name: 'LinkReference node without title attribute',
      code: `
[text][link]

[link]: https://example.com`,
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 28,
        },
      ],
    },
    {
      name: 'LinkReference node with empty title attribute - 1',
      code: `
[text][link]

[link]: https://example.com ""`,
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 31,
        },
      ],
    },
    {
      name: 'LinkReference node with empty title attribute - 2',
      code: `
[text][link]

[link]: https://example.com ''`,
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 31,
        },
      ],
    },
    {
      name: 'LinkReference node with empty title attribute - 3',
      code: `
[text][link]

[link]: https://example.com ()`,
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 31,
        },
      ],
    },

    {
      name: 'Html node without title attribute - 1',
      code: '<a href="https://example.com">text</a>',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 31,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 2',
      code: '<a\nhref="https://example.com">text</a>',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 28,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 3',
      code: '<a\n href="https://example.com">text</a>',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 29,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 4',
      code: '<a\n  href="https://example.com">text</a>',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 30,
        },
      ],
    },
    {
      name: 'Html node with empty title attribute - 1',
      code: '<a href="https://example.com" title>text</a>',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 37,
        },
      ],
    },
    {
      name: 'Html node with empty title attribute - 2',
      code: '<a href="https://example.com" title="">text</a>',
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 40,
        },
      ],
    },
    {
      name: 'Nested Html node without title attribute - 1',
      code: `
<div>
  <a href="https://example.com">text</a>
</div>`,
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 33,
        },
      ],
    },
    {
      name: 'Nested Html node without title attribute - 2',
      code: `
<div>
  <a href="https://example.com">text</a>
  <br>
  <a href="https://example.com">text</a>
</div>`,
      errors: [
        {
          messageId: 'requireLinkTitle',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 33,
        },
        {
          messageId: 'requireLinkTitle',
          line: 5,
          column: 3,
          endLine: 5,
          endColumn: 33,
        },
      ],
    },
  ],
});
