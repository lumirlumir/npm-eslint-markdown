/**
 * @fileoverview Test for `html.js`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { ok, strictEqual } from 'node:assert';
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

    strictEqual(elements.length, 1);
    strictEqual(elements[0].tagName, 'p');
  });

  it('should have `sourceCodeLocation` property', () => {
    const elements = getElementsByTagName(html, 'p');

    ok(elements[0].sourceCodeLocation);
  });
});
