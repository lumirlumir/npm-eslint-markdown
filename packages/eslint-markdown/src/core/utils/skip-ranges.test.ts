/**
 * @fileoverview Test for `skip-ranges.ts`
 *
 * - The newline character (`\n`) is considered the last character of the current line.
 * - The newline character is always located at the end position (column) of the previous line,
 *   and new text starts at the first column (1) of the next line (line + 1).
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import SkipRanges from './skip-ranges.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('skip-ranges', () => {
  describe('push()', () => {
    it('should push a range to the list of skip ranges', () => {
      const skipRanges = new SkipRanges();

      skipRanges.push([0, 1]);
      skipRanges.push([2, 3]).push([4, 5]);
    });
  });

  describe('includes()', () => {
    describe('Code', () => {
      it('```js\nconst hello = "world";\n```', () => {
        const skipRanges = new SkipRanges();

        skipRanges.push([0, 32]);

        assert.strictEqual(skipRanges.includes(0), true);
        assert.strictEqual(skipRanges.includes(1), true);
        assert.strictEqual(skipRanges.includes(2), true);
        assert.strictEqual(skipRanges.includes(3), true);
        assert.strictEqual(skipRanges.includes(4), true);
        assert.strictEqual(skipRanges.includes(5), true);
        assert.strictEqual(skipRanges.includes(6), true);
        assert.strictEqual(skipRanges.includes(7), true);
        assert.strictEqual(skipRanges.includes(8), true);
        assert.strictEqual(skipRanges.includes(9), true);
        assert.strictEqual(skipRanges.includes(10), true);
        assert.strictEqual(skipRanges.includes(11), true);
        assert.strictEqual(skipRanges.includes(12), true);
        assert.strictEqual(skipRanges.includes(13), true);
        assert.strictEqual(skipRanges.includes(14), true);
        assert.strictEqual(skipRanges.includes(15), true);
        assert.strictEqual(skipRanges.includes(16), true);
        assert.strictEqual(skipRanges.includes(17), true);
        assert.strictEqual(skipRanges.includes(18), true);
        assert.strictEqual(skipRanges.includes(19), true);
        assert.strictEqual(skipRanges.includes(20), true);
        assert.strictEqual(skipRanges.includes(21), true);
        assert.strictEqual(skipRanges.includes(22), true);
        assert.strictEqual(skipRanges.includes(23), true);
        assert.strictEqual(skipRanges.includes(24), true);
        assert.strictEqual(skipRanges.includes(25), true);
        assert.strictEqual(skipRanges.includes(26), true);
        assert.strictEqual(skipRanges.includes(27), true);
        assert.strictEqual(skipRanges.includes(28), true);
        assert.strictEqual(skipRanges.includes(29), true);
        assert.strictEqual(skipRanges.includes(30), true);
        assert.strictEqual(skipRanges.includes(31), true);
        assert.strictEqual(skipRanges.includes(32), false);
        assert.strictEqual(skipRanges.includes(33), false);
      });
    });

    describe('InlineCode', () => {
      it('`hello`', () => {
        const skipRanges = new SkipRanges();

        skipRanges.push([0, 7]);

        assert.strictEqual(skipRanges.includes(0), true);
        assert.strictEqual(skipRanges.includes(1), true);
        assert.strictEqual(skipRanges.includes(2), true);
        assert.strictEqual(skipRanges.includes(3), true);
        assert.strictEqual(skipRanges.includes(4), true);
        assert.strictEqual(skipRanges.includes(5), true);
        assert.strictEqual(skipRanges.includes(6), true);
        assert.strictEqual(skipRanges.includes(7), false);
        assert.strictEqual(skipRanges.includes(8), false);
        assert.strictEqual(skipRanges.includes(9), false);
      });
    });

    describe('Strong', () => {
      it('**hello**', () => {
        const skipRanges = new SkipRanges();

        skipRanges.push([0, 9]);

        assert.strictEqual(skipRanges.includes(0), true);
        assert.strictEqual(skipRanges.includes(1), true);
        assert.strictEqual(skipRanges.includes(2), true);
        assert.strictEqual(skipRanges.includes(3), true);
        assert.strictEqual(skipRanges.includes(4), true);
        assert.strictEqual(skipRanges.includes(5), true);
        assert.strictEqual(skipRanges.includes(6), true);
        assert.strictEqual(skipRanges.includes(7), true);
        assert.strictEqual(skipRanges.includes(8), true);
        assert.strictEqual(skipRanges.includes(9), false);
        assert.strictEqual(skipRanges.includes(10), false);
      });
    });

    describe('Text', () => {
      it('hello\nworld', () => {
        const skipRanges = new SkipRanges();

        skipRanges.push([0, 11]);

        assert.strictEqual(skipRanges.includes(0), true);
        assert.strictEqual(skipRanges.includes(1), true);
        assert.strictEqual(skipRanges.includes(2), true);
        assert.strictEqual(skipRanges.includes(3), true);
        assert.strictEqual(skipRanges.includes(4), true);
        assert.strictEqual(skipRanges.includes(5), true);
        assert.strictEqual(skipRanges.includes(6), true);
        assert.strictEqual(skipRanges.includes(7), true);
        assert.strictEqual(skipRanges.includes(8), true);
        assert.strictEqual(skipRanges.includes(9), true);
        assert.strictEqual(skipRanges.includes(10), true);
        assert.strictEqual(skipRanges.includes(11), false);
        assert.strictEqual(skipRanges.includes(12), false);
      });
    });
  });
});
