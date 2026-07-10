/**
 * @fileoverview Test for `test-regex-stateless.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import testRegexStateless from './test-regex-stateless.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('test-regex-stateless', () => {
  it('should test a regex without a stateful flag', () => {
    assert.strictEqual(testRegexStateless(/allowed/u, 'allowed'), true);
    assert.strictEqual(testRegexStateless(/allowed/u, 'denied'), false);
  });

  it('should test a global regex without mutating its `lastIndex`', () => {
    const regex = /allowed/gu;

    regex.lastIndex = 4;

    assert.strictEqual(testRegexStateless(regex, 'allowed'), true);
    assert.strictEqual(regex.lastIndex, 4);
  });

  it('should test a sticky regex without mutating its `lastIndex`', () => {
    const regex = /allowed/uy;

    regex.lastIndex = 4;

    assert.strictEqual(testRegexStateless(regex, 'allowed'), true);
    assert.strictEqual(regex.lastIndex, 4);
  });
});
