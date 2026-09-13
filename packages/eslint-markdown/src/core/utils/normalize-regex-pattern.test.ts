/**
 * @fileoverview Test for `normalize-regex-pattern.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { normalizeRegexPattern } from './normalize-regex-pattern.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('normalize-regex-pattern', () => {
  it('should compile a string pattern with the `u` flag', () => {
    const regex = normalizeRegexPattern('example\\.com');

    assert.strictEqual(regex.source, 'example\\.com');
    assert.strictEqual(regex.flags, 'u');
  });

  it('should return a `RegExp` as is', () => {
    const regex = /example\.com/u;

    assert.strictEqual(normalizeRegexPattern(regex), regex);
  });

  it('should throw on an invalid string pattern', () => {
    assert.throws(() => normalizeRegexPattern('('), SyntaxError);
  });
});
