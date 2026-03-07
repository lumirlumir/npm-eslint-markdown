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
  describe('should return `true` for blank lines', () => {
    for (const line of ['', ' ', '\t', ' \t ', '\t\t\t']) {
      it(JSON.stringify(line), () => {
        strictEqual(isBlankLine(line), true);
      });
    }
  });

  describe('should return `false` for non-blank lines', () => {
    for (const line of ['a', ' \ta', 'a\t ', '\n', '\r', '\f', '\u00A0']) {
      it(JSON.stringify(line), () => {
        strictEqual(isBlankLine(line), false);
      });
    }
  });
});
