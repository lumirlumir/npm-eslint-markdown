/**
 * @fileoverview Test for `is-blank-line.js`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import { getFileName } from '../tests/index.js';
import isBlankLine from './is-blank-line.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe(getFileName(import.meta.url), () => {
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
  });
});
