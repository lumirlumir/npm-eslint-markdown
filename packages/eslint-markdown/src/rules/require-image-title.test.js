/**
 * @fileoverview Test for `require-image-title.js`.
 * @author 루밀LuMir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../core/rule-tester.js';
import rule from './require-image-title.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('require-image-title', rule, {
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
      name: 'Image node with title attribute - 1',
      code: '![](https://example.com/image.jpg "title")',
    },
    {
      name: 'Image node with title attribute - 2',
      code: "![](https://example.com/image.jpg 'title')",
    },
    {
      name: 'Image node with title attribute - 3',
      code: '![](https://example.com/image.jpg (title))',
    },
    {
      name: 'ImageReference node with title attribute - 1',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg "title"
`,
    },
    {
      name: 'ImageReference node with title attribute - 2',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg 'title'
`,
    },
    {
      name: 'ImageReference node with title attribute - 3',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg (title)
`,
    },
    {
      name: "ImageReference node with `'//'`",
      code: `
![alt text][//]

[//]: https://example.com/image.jpg
`,
    },
    {
      name: 'Html node with title attribute',
      code: '<img src="https://example.com/image.jpg" title="title">',
    },
    {
      name: 'Nested Html node with title attribute',
      code: `
<div>
  <img src="https://example.com/image.jpg" title="title">
</div>
`,
    },

    // Options
    {
      name: "ImageReference node with `'hi'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['hi'] }],
      code: `
![alt text][hi]

[hi]: https://example.com/image.jpg
`,
    },
    {
      name: "ImageReference node with `'HI'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['HI'] }],
      code: `
![alt text][hi]

[hi]: https://example.com/image.jpg
`,
    },
    {
      name: "ImageReference node with `'GRÜẞE'` `allowDefinitions` option",
      options: [{ allowDefinitions: ['GRÜẞE'] }],
      code: `
![alt text][Grüsse]

[Grüsse]: https://example.com/image.jpg
`,
    },
  ],

  invalid: [
    {
      name: 'Image node without title attribute',
      code: '![](https://example.com/image.jpg)',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 35,
        },
      ],
    },
    {
      name: 'Image node with empty title attribute - 1',
      code: '![](https://example.com/image.jpg "")',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 38,
        },
      ],
    },
    {
      name: 'Image node with empty title attribute - 2',
      code: "![](https://example.com/image.jpg '')",
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 38,
        },
      ],
    },
    {
      name: 'Image node with empty title attribute - 3',
      code: '![](https://example.com/image.jpg ())',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 38,
        },
      ],
    },

    {
      name: 'ImageReference node without title attribute',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 39,
        },
      ],
    },
    {
      name: 'ImageReference node with empty title attribute - 1',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg ""`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'ImageReference node with empty title attribute - 2',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg ''`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'ImageReference node with empty title attribute - 3',
      code: `
![alt text][image]

[image]: https://example.com/image.jpg ()`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 4,
          column: 1,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },

    {
      name: 'Html node without title attribute - 1',
      code: '<img src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 42,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 2',
      code: '<img\nsrc="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 37,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 3',
      code: '<img\n src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 38,
        },
      ],
    },
    {
      name: 'Html node without title attribute - 4',
      code: '<img\n  src="https://example.com/image.jpg">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 2,
          endColumn: 39,
        },
      ],
    },
    {
      name: 'Html node with empty title attribute - 1',
      code: '<img src="https://example.com/image.jpg" title>',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 48,
        },
      ],
    },
    {
      name: 'Html node with empty title attribute - 2',
      code: '<img src="https://example.com/image.jpg" title="">',
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 51,
        },
      ],
    },
    {
      name: 'Nested Html node without title attribute - 1',
      code: `
<div>
  <img src="https://example.com/image.jpg">
</div>`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 44,
        },
      ],
    },
    {
      name: 'Nested Html node without title attribute - 2',
      code: `
<div>
  <img src="https://example.com/image.jpg">
  <br>
  <img src="https://example.com/image.jpg">
</div>`,
      errors: [
        {
          messageId: 'requireImageTitle',
          line: 3,
          column: 3,
          endLine: 3,
          endColumn: 44,
        },
        {
          messageId: 'requireImageTitle',
          line: 5,
          column: 3,
          endLine: 5,
          endColumn: 44,
        },
      ],
    },
  ],
});
