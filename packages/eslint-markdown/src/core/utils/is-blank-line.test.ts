/**
 * @fileoverview Test for `is-blank-line.js`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import isBlankLine from './is-blank-line.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('is-blank-line', () => {
  describe('blank line', () => {
    it('should return `true` for an empty string', () => {
      assert.strictEqual(isBlankLine(''), true);
    });

    it('should return `true` for a string containing only a space', () => {
      assert.strictEqual(isBlankLine(' '), true);
    });

    it('should return `true` for a string containing only a tab', () => {
      assert.strictEqual(isBlankLine('\t'), true);
    });

    it('should return `true` for a string containing multiple tabs', () => {
      assert.strictEqual(isBlankLine('\t\t\t'), true);
    });

    it('should return `true` for a string containing mixed spaces and tabs - 1', () => {
      assert.strictEqual(isBlankLine(' \t '), true);
    });

    it('should return `true` for a string containing mixed spaces and tabs - 2', () => {
      assert.strictEqual(isBlankLine(' \t    \t \t  '), true);
    });

    it('should return `true` for a single blockquote marker', () => {
      assert.strictEqual(isBlankLine('>', 0), true);
    });

    it('should return `true` for a top-level blockquote marker with only trailing spaces', () => {
      assert.strictEqual(isBlankLine('>   ', 0), true);
    });

    it('should return `true` for nested blockquote markers with spaces between markers', () => {
      assert.strictEqual(isBlankLine(' >   > \t ', 1), true);
    });
  });

  describe('non-blank line', () => {
    it('should return `false` for a string containing a character', () => {
      assert.strictEqual(isBlankLine('a'), false);
    });

    it('should return `false` for a string containing whitespace before a character', () => {
      assert.strictEqual(isBlankLine(' \ta'), false);
    });

    it('should return `false` for a string containing whitespace after a character', () => {
      assert.strictEqual(isBlankLine('a\t '), false);
    });

    it('should return `false` for a newline character', () => {
      assert.strictEqual(isBlankLine('\n'), false);
    });

    it('should return `false` for a carriage return character', () => {
      assert.strictEqual(isBlankLine('\r'), false);
    });

    it('should return `false` for a form feed character', () => {
      assert.strictEqual(isBlankLine('\f'), false);
    });

    it('should return `false` for a non-breaking space', () => {
      assert.strictEqual(isBlankLine('\u00A0'), false);
    });

    it('should return `false` for a string containing text after a blockquote marker', () => {
      assert.strictEqual(isBlankLine('> a', 0), false);
    });

    it('should return `false` for a string containing text after a blockquote marker and another blockquote marker', () => {
      assert.strictEqual(isBlankLine('> a >', 0), false);
    });

    it('should return `false` when a nested blockquote marker remains after the given depth', () => {
      assert.strictEqual(isBlankLine('> \\>', 0), false);
    });
  });
});
