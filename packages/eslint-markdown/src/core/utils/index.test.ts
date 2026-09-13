/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import {
  CODE_STYLE,
  escapeStringRegexp,
  getCodeStyle,
  getElementsByTagName,
  isBlankLine,
  normalizeRegexPattern,
  SkipRanges,
  testRegexStateless,
} from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`escapeStringRegexp` should be defined', () => {
      assert.isDefined(escapeStringRegexp);
      assert.strictEqual(typeof escapeStringRegexp, 'function');
    });

    it('`CODE_STYLE` should be defined', () => {
      assert.isDefined(CODE_STYLE);
      assert.isArray(CODE_STYLE);
    });

    it('`getCodeStyle` should be defined', () => {
      assert.isDefined(getCodeStyle);
      assert.strictEqual(typeof getCodeStyle, 'function');
    });

    it('`getElementsByTagName` should be defined', () => {
      assert.isDefined(getElementsByTagName);
      assert.strictEqual(typeof getElementsByTagName, 'function');
    });

    it('`isBlankLine` should be defined', () => {
      assert.isDefined(isBlankLine);
      assert.strictEqual(typeof isBlankLine, 'function');
    });

    it('`normalizeRegexPattern` should be defined', () => {
      assert.isDefined(normalizeRegexPattern);
      assert.strictEqual(typeof normalizeRegexPattern, 'function');
    });

    it('`SkipRanges` should be defined', () => {
      assert.isDefined(SkipRanges);
      assert.strictEqual(typeof SkipRanges, 'function');
    });

    it('`testRegexStateless` should be defined', () => {
      assert.isDefined(testRegexStateless);
      assert.strictEqual(typeof testRegexStateless, 'function');
    });
  });
});
