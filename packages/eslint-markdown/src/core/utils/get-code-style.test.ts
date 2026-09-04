/**
 * @fileoverview Test for `get-code-style.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import getCodeStyle from './get-code-style.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('get-code-style', () => {
  describe('fence-backtick', () => {
    it('should return `fence-backtick` for a single backtick', () => {
      assert.strictEqual(getCodeStyle('`'), 'fence-backtick');
    });

    it('should return `fence-backtick` for a backtick fence with a language', () => {
      assert.strictEqual(getCodeStyle('```sh\n$ ls\n```'), 'fence-backtick');
    });
  });

  describe('fence-tilde', () => {
    it('should return `fence-tilde` for a single tilde', () => {
      assert.strictEqual(getCodeStyle('~'), 'fence-tilde');
    });

    it('should return `fence-tilde` for a tilde fence with a language', () => {
      assert.strictEqual(getCodeStyle('~~~sh\n$ ls\n~~~'), 'fence-tilde');
    });
  });

  describe('indent', () => {
    it('should return `indent` for a space', () => {
      assert.strictEqual(getCodeStyle(' '), 'indent');
    });

    it('should return `indent` for an indented code block', () => {
      assert.strictEqual(getCodeStyle('    $ ls'), 'indent');
    });

    it('should return `indent` for an empty string', () => {
      assert.strictEqual(getCodeStyle(''), 'indent');
    });

    it('should return `indent` when a fence character is not the first character', () => {
      assert.strictEqual(getCodeStyle('sh```'), 'indent');
    });
  });
});
