/**
 * @fileoverview Test for `allow-image-url.js`.
 * @author 루밀LuMir(lumirlumir)
 * @see https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/blob/main/src/textlint-rule-allowed-uris.test.js
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../core/rule-tester.js';
import rule from './allow-image-url.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('allow-image-url', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty String',
      code: '  ',
    },

    // Image
    {
      name: 'With no options',
      code: '![](https://example.com)',
    },
    {
      name: '`allowUrls` option - 1',
      code: '![Text](https://example.com)',
      options: [
        {
          allowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowUrls` option - 2',
      code: '![Text](https://example.com)',
      options: [
        {
          allowUrls: [/example.com/, /foo.com/],
        },
      ],
    },
    {
      name: '`allowUrls` option should allow multiple images with a sticky RegExp',
      code: '![Text](https://example.com)\n![Text](https://example.com)',
      options: [
        {
          allowUrls: [/https:\/\/example\.com/y],
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '![Text](https://example.com)',
      options: [
        {
          disallowUrls: [/foo.com/],
        },
      ],
    },
    {
      name: '`disallowUrls` option - 2',
      code: '![Text](https://example.com)',
      options: [
        {
          disallowUrls: [/foo.com/, /baz.com/],
        },
      ],
    },
    {
      name: '`allowUrls` and `disallowUrls` options',
      code: '![Text](https://example.com)',
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
      code: '![Text][//]\n\n[//]: https://example.com',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowUrls` option - 1',
      code: '![Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          allowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowUrls` option - 2',
      code: `
![Text][reference1]

[reference1]: https://example.com

![Text][reference2]

[reference2]: https://foo.com`,
      options: [
        {
          allowUrls: [/example.com/, /foo.com/],
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '![Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          disallowUrls: [/foo.com/],
        },
      ],
    },
    {
      name: '`disallowUrls` option - 2',
      code: `
![Text][reference1]

[reference1]: https://example.com

![Text][reference2]

[reference2]: https://bar.com`,
      options: [
        {
          disallowUrls: [/foo.com/, /baz.com/],
        },
      ],
    },
    {
      name: '`allowUrls` and `disallowUrls` options',
      code: '![Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          allowUrls: [/example.com/],
          disallowUrls: [/foo.com/],
        },
      ],
    },
    {
      name: '`allowDefinitions` option - 1',
      code: '![Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          allowDefinitions: ['reference'],
          disallowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowDefinitions` option - 2',
      code: '![Text][hi]\n\n[hi]: https://example.com',
      options: [
        {
          allowDefinitions: ['hi'],
          disallowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowDefinitions` option - 3',
      code: '![Text][hi]\n\n[hi]: https://example.com',
      options: [
        {
          allowDefinitions: ['HI'],
          disallowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`allowDefinitions` option - 4',
      code: '![Text][Grüsse]\n\n[Grüsse]: https://example.com',
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
      code: '<img src="https://example.com" alt="Alt text">',
      options: [
        {
          allowUrls: [/example.com/],
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '<img src="https://example.com" alt="Alt text">',
      options: [
        {
          disallowUrls: [/foo.com/],
        },
      ],
    },
  ],

  invalid: [
    // Image
    {
      name: '`allowUrls` option - 1',
      code: '![Text](https://example.com)',
      options: [
        {
          allowUrls: [/foo.com/],
        },
      ],
      errors: [
        {
          messageId: 'allowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/foo.com/`',
          },
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 29,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '![Text](https://example.com)',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 29,
        },
      ],
    },
    {
      name: '`disallowUrls` option should report multiple images with a sticky RegExp',
      code: '![Text](https://example.com)\n![Text](https://example.com)',
      options: [
        {
          disallowUrls: [/https:\/\/example\.com/y],
        },
      ],
      errors: [
        {
          messageId: 'disallowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/https:\\/\\/example\\.com/y`',
          },
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 29,
        },
        {
          messageId: 'disallowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/https:\\/\\/example\\.com/y`',
          },
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 29,
        },
      ],
    },

    // Definition
    {
      name: '`allowUrls` option - 1',
      code: '![Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          allowUrls: [/foo.com/],
        },
      ],
      errors: [
        {
          messageId: 'allowImageUrl',
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
      code: '![Text][reference]\n\n[reference]: https://example.com',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowImageUrl',
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
      code: '<img src="https://example.com" alt="Alt text">',
      options: [
        {
          allowUrls: [/foo.com/],
        },
      ],
      errors: [
        {
          messageId: 'allowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/foo.com/`',
          },
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 31,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 1',
      code: '<img src="https://example.com" alt="Alt text">',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 1,
          column: 6,
          endLine: 1,
          endColumn: 31,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 2',
      code: '<img\nsrc="https://example.com" alt="Alt text">',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 26,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 3',
      code: '<img\n src="https://example.com" alt="Alt text">',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 2,
          column: 2,
          endLine: 2,
          endColumn: 27,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 4',
      code: '<img\n  src="https://example.com" alt="Alt text">',
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 28,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 5',
      code: `
<div>
  <img src="https://example.com" alt="Alt text">
</div>`,
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 3,
          column: 8,
          endLine: 3,
          endColumn: 33,
        },
      ],
    },
    {
      name: '`disallowUrls` option - 6',
      code: `
<div>
  <img src="https://example.com" alt="Alt text">
  <br>
  <img src="https://example.com" alt="Alt text">
</div>`,
      options: [
        {
          disallowUrls: [/example.com/],
        },
      ],
      errors: [
        {
          messageId: 'disallowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 3,
          column: 8,
          endLine: 3,
          endColumn: 33,
        },
        {
          messageId: 'disallowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '`/example.com/`',
          },
          line: 5,
          column: 8,
          endLine: 5,
          endColumn: 33,
        },
      ],
    },

    // Edge cases
    {
      name: '`allowUrls` with empty array should report all URLs',
      code: `
![Text](https://example.com)

<img src="https://foo.com" alt="Alt text">

![Text][reference]

[reference]: https://bar.com`,
      options: [
        {
          allowUrls: [],
        },
      ],
      errors: [
        {
          messageId: 'allowImageUrl',
          data: {
            url: 'https://example.com',
            patterns: '',
          },
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 29,
        },
        {
          messageId: 'allowImageUrl',
          data: {
            url: 'https://foo.com',
            patterns: '',
          },
          line: 4,
          column: 6,
          endLine: 4,
          endColumn: 27,
        },
        {
          messageId: 'allowImageUrl',
          data: {
            url: 'https://bar.com',
            patterns: '',
          },
          line: 8,
          column: 1,
          endLine: 8,
          endColumn: 29,
        },
      ],
    },
  ],
});
