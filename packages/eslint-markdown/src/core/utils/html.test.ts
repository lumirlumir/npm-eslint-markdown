/**
 * @fileoverview Test for `html.js`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import getElementsByTagName from './html.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const html = '<p>hello world</p>';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('html', () => {
  it('should parse tag name case-insensitively', () => {
    const elements = getElementsByTagName(html, 'P');

    assert.strictEqual(elements.length, 1);
    assert.strictEqual(elements[0].tagName, 'p');
  });

  it('should have `sourceCodeLocation` property', () => {
    const elements = getElementsByTagName(html, 'p');

    assert.ok(elements[0].sourceCodeLocation);
  });
});
