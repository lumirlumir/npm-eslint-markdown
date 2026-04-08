/**
 * @fileoverview Test for `is-blank-line.js`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import isBlankLine from './is-blank-line.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('is-blank-line', () => {
  describe('blank line', () => {
    it('should return `true` for an empty string', () => {
      strictEqual(isBlankLine(''), true);
    });

    it('should return `true` for a string containing only a space', () => {
      strictEqual(isBlankLine(' '), true);
    });

    it('should return `true` for a string containing only a tab', () => {
      strictEqual(isBlankLine('\t'), true);
    });

    it('should return `true` for a string containing multiple tabs', () => {
      strictEqual(isBlankLine('\t\t\t'), true);
    });

    it('should return `true` for a string containing mixed spaces and tabs - 1', () => {
      strictEqual(isBlankLine(' \t '), true);
    });

    it('should return `true` for a string containing mixed spaces and tabs - 2', () => {
      strictEqual(isBlankLine(' \t    \t \t  '), true);
    });

    it('should return `true` for a single blockquote marker', () => {
      strictEqual(isBlankLine('>', 0), true);
    });

    it('should return `true` for a top-level blockquote marker with only trailing spaces', () => {
      strictEqual(isBlankLine('>   ', 0), true);
    });

    it('should return `true` for nested blockquote markers with spaces between markers', () => {
      strictEqual(isBlankLine(' >   > \t ', 1), true);
    });
  });

  describe('non-blank line', () => {
    it('should return `false` for a string containing a character', () => {
      strictEqual(isBlankLine('a'), false);
    });

    it('should return `false` for a string containing whitespace before a character', () => {
      strictEqual(isBlankLine(' \ta'), false);
    });

    it('should return `false` for a string containing whitespace after a character', () => {
      strictEqual(isBlankLine('a\t '), false);
    });

    it('should return `false` for a newline character', () => {
      strictEqual(isBlankLine('\n'), false);
    });

    it('should return `false` for a carriage return character', () => {
      strictEqual(isBlankLine('\r'), false);
    });

    it('should return `false` for a form feed character', () => {
      strictEqual(isBlankLine('\f'), false);
    });

    it('should return `false` for a non-breaking space', () => {
      strictEqual(isBlankLine('\u00A0'), false);
    });

    it('should return `false` for a string containing text after a blockquote marker', () => {
      strictEqual(isBlankLine('> a', 0), false);
    });

    it('should return `false` for a string containing text after a blockquote marker and another blockquote marker', () => {
      strictEqual(isBlankLine('> a >', 0), false);
    });

    it('should return `false` when a nested blockquote marker remains after the given depth', () => {
      strictEqual(isBlankLine('> >', 0), false);
    });
  });
});
