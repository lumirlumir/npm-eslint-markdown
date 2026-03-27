/**
 * @fileoverview Test for `allow-link-url.js`.
 * @author 루밀LuMir(lumirlumir)
 * @see https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/blob/main/src/textlint-rule-allowed-uris.test.js
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../core/rule-tester.js';
import rule from './allow-link-url.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('allow-link-url', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty String',
      code: '  ',
    },

    // Link
    {
      name: 'With no options',
      code: '[](https://example.com)',
    },
    {
      name: '`allowUrls` option - 1',
      code: '[Text](https://example.com)',
      options: [
        {
          allowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowUrls` option - 2',
      code: '[Text](https://example.com)\n<https://foo.com>',
      options: [
        {
          allowUrls: [/example.com/, /foo.com/],
        },
      ],
    },
    {
      name: '`allowUrls` option should handle global (`g`) RegExp',
      code: '[Text](https://example.com)',
      options: [
        {
          allowUrls: [/example/g],
        },
      ],
    },
    {
      name: '`allowUrls` option should handle sticky (`y`) RegExp',
      code: '[Text](https://example.com)',
      options: [
        {
          allowUrls: [/example/y],
        },
      ],
    },
    {
      name: '`allowUrls` option should handle global (`g`) and sticky (`y`) RegExp',
      code: '[Text](https://example.com)',
      options: [
        {
          allowUrls: [/example/gy],
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '[Text](https://example.com)',
      options: [
        {
          disallowUrls: [/foo.com/],
        },
      ],
    },
    {
      name: '`disallowUrls` option - 2',
      code: '[Text](https://example.com)\n<https://bar.com>',
      options: [
        {
          disallowUrls: [/foo.com/, /baz.com/],
        },
      ],
    },
    {
      name: '`allowUrls` and `disallowUrls` options',
      code: '[Text](https://example.com)',
      options: [
        {
          allowUrls: [/example.com/],
          disallowUrls: [/foo.com/],
        },
      ],
    },

    // Definition
    {
      name: 'Lone definition should not be checked',
      code: '[reference]: https://example.com',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`//` definition should not be checked',
      code: '[Text][//]\n\n[//]: https://example.com',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowUrls` option - 1',
      code: '[Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          allowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowUrls` option - 2',
      code: `
[Text][reference1]

[reference1]: https://example.com

[Text][reference2]

[reference2]: https://foo.com`,
      options: [
        {
          allowUrls: [/example.com/, /foo.com/],
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '[Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          disallowUrls: [/foo.com/],
        },
      ],
    },
    {
      name: '`disallowUrls` option - 2',
      code: `
[Text][reference1]

[reference1]: https://example.com

[Text][reference2]

[reference2]: https://bar.com`,
      options: [
        {
          disallowUrls: [/foo.com/, /baz.com/],
        },
      ],
    },
    {
      name: '`allowUrls` and `disallowUrls` options',
      code: '[Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          allowUrls: [/example.com/],
          disallowUrls: [/foo.com/],
        },
      ],
    },
    {
      name: '`allowDefinitions` option - 1',
      code: '[Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          allowDefinitions: ['reference'],
          disallowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowDefinitions` option - 2',
      code: '[Text][hi]\n\n[hi]: https://example.com',
      options: [
        {
          allowDefinitions: ['hi'],
          disallowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowDefinitions` option - 3',
      code: '[Text][hi]\n\n[hi]: https://example.com',
      options: [
        {
          allowDefinitions: ['HI'],
          disallowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowDefinitions` option - 4',
      code: '[Text][Grüsse]\n\n[Grüsse]: https://example.com',
      options: [
        {
          allowDefinitions: ['GRÜẞE'],
          disallowUrls: [/example.com/],
        },
      ],
    },

    // HTML
    {
      name: '`allowUrls` option - 1',
      code: '<a href="https://example.com">text</a>',
      options: [
        {
          allowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '<a href="https://example.com">text</a>',
      options: [
        {
          disallowUrls: [/foo.com/],
        },
      ],
    },
  ],

  invalid: [
    // Link
    {
      name: '`allowUrls` option - 1',
      code: '[Text](https://example.com)',
      options: [
        {
          allowUrls: [/foo.com/],
        },
      ],
      errors: [
        {
          messageId: 'allowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/foo.com/`',
          },
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 28,
        },
      ],
    },
    {
      name: '`allowUrls` option - 2',
      code: '<https://example.com>',
      options: [
        {
          allowUrls: [/foo.com/],
        },
      ],
      errors: [
        {
          messageId: 'allowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/foo.com/`',
          },
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 22,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '[Text](https://example.com)',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 28,
        },
      ],
    },
    {
      name: '`disallowUrls` option should handle global (`g`) RegExp',
      code: '[Text](https://example.com)',
      options: [
        {
          disallowUrls: [/example/g],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example/g`',
          },
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 28,
        },
      ],
    },
    {
      name: '`disallowUrls` option should handle sticky (`y`) RegExp',
      code: '[Text](https://example.com)',
      options: [
        {
          disallowUrls: [/example/y],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example/y`',
          },
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 28,
        },
      ],
    },
    {
      name: '`disallowUrls` option should handle global (`g`) and sticky (`y`) RegExp',
      code: '[Text](https://example.com)',
      options: [
        {
          disallowUrls: [/example/gy],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example/gy`',
          },
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 28,
        },
      ],
    },

    // Definition
    {
      name: '`allowUrls` option - 1',
      code: '[Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          allowUrls: [/foo.com/],
        },
      ],
      errors: [
        {
          messageId: 'allowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/foo.com/`',
          },
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 33,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '[Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 3,
          column: 1,
          endLine: 3,
          endColumn: 33,
        },
      ],
    },

    // HTML
    {
      name: '`allowUrls` option - 1',
      code: '<a href="https://example.com">text</a>',
      options: [
        {
          allowUrls: [/foo.com/],
        },
      ],
      errors: [
        {
          messageId: 'allowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/foo.com/`',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 30,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '<a href="https://example.com">text</a>',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 1,
          column: 4,
          endLine: 1,
          endColumn: 30,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 2',
      code: '<a\nhref="https://example.com">text</a>',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 27,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 3',
      code: '<a\n href="https://example.com">text</a>',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 28,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 4',
      code: '<a\n  href="https://example.com">text</a>',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 29,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 5',
      code: `
<div>
  <a href="https://example.com">text</a>
</div>`,
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 3,
          column: 6,
          endLine: 3,
          endColumn: 32,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 6',
      code: `
<div>
  <a href="https://example.com">text</a>
  <br>
  <a href="https://example.com">text</a>
</div>`,
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 3,
          column: 6,
          endLine: 3,
          endColumn: 32,
        },
        {
          messageId: 'disallowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 5,
          column: 6,
          endLine: 5,
          endColumn: 32,
        },
      ],
    },

    // Edge cases
    {
      name: '`allowUrls` with empty array should report all URLs',
      code: `
[Text](https://example.com)

<https://foo.com>

<a href="https://bar.com">text</a>

[Text][reference]

[reference]: https://baz.com`,
      options: [
        {
          allowUrls: [],
        },
      ],
      errors: [
        {
          messageId: 'allowLinkUrl',
          data: {
            url: 'https://example.com',
            patterns: '',
          },
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 28,
        },
        {
          messageId: 'allowLinkUrl',
          data: {
            url: 'https://foo.com',
            patterns: '',
          },
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 18,
        },
        {
          messageId: 'allowLinkUrl',
          data: {
            url: 'https://bar.com',
            patterns: '',
          },
          line: 6,
          column: 4,
          endLine: 6,
          endColumn: 26,
        },
        {
          messageId: 'allowLinkUrl',
          data: {
            url: 'https://baz.com',
            patterns: '',
          },
          line: 10,
          column: 1,
          endLine: 10,
          endColumn: 29,
        },
      ],
    },
  ],
});
