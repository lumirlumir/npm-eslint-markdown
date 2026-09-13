/**
 * @fileoverview Tests for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import eslintLumir, { meta } from './index.js';
import pkg from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('named `meta` export', () => {
    it('should expose the package name', () => {
      assert.strictEqual(meta.name, pkg.name);
    });

    it('should expose the package version', () => {
      assert.strictEqual(meta.version, pkg.version);
    });
  });

  describe('default export', () => {
    it('should expose the package metadata', () => {
      assert.strictEqual(eslintLumir.meta, meta);
    });
  });
});
