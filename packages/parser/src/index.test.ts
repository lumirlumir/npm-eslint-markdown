/**
 * @fileoverview Tests for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import parser, { meta, parse } from './index.js';
import pkg from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('named export', () => {
    describe('meta', () => {
      it('should have a `name` property', () => {
        assert.strictEqual(typeof meta.name, 'string');
        assert.strictEqual(meta.name, pkg.name);
      });

      it('should have a `version` property', () => {
        assert.strictEqual(typeof meta.version, 'string');
        assert.strictEqual(meta.version, pkg.version);
      });
    });

    describe('parse', () => {
      it('should be a function', () => {
        assert.strictEqual(typeof parse, 'function');
      });

      it('should parse Markdown as CommonMark by default', () => {
        const ast = parse('~hi~');

        assert(ast.type === 'root');
        assert.strictEqual(ast.children.length, 1);

        const paragraph = ast.children[0];

        assert(paragraph.type === 'paragraph');
        assert.strictEqual(paragraph.children.length, 1);

        const text = paragraph.children[0];

        assert(text.type === 'text');
        assert.strictEqual(text.value, '~hi~');
      });

      it("should parse Markdown as CommonMark when `mode` is set to `'commonmark'`", () => {
        const ast = parse('~hi~', { mode: 'commonmark' });

        assert(ast.type === 'root');
        assert.strictEqual(ast.children.length, 1);

        const paragraph = ast.children[0];

        assert(paragraph.type === 'paragraph');
        assert.strictEqual(paragraph.children.length, 1);

        const text = paragraph.children[0];

        assert(text.type === 'text');
        assert.strictEqual(text.value, '~hi~');
      });

      it("should parse Markdown as GFM when `mode` is set to `'gfm'`", () => {
        const ast = parse('~hi~', { mode: 'gfm' });

        assert(ast.type === 'root');
        assert.strictEqual(ast.children.length, 1);

        const paragraph = ast.children[0];

        assert(paragraph.type === 'paragraph');
        assert.strictEqual(paragraph.children.length, 1);

        const del = paragraph.children[0];

        assert(del.type === 'delete');
        assert.strictEqual(del.children.length, 1);

        const text = del.children[0];

        assert(text.type === 'text');
        assert.strictEqual(text.value, 'hi');
      });

      it('should not parse frontmatter when `frontmatter` is set to `false`', () => {
        const ast = parse('---\ntitle: Example\n---\n\n# Hello', {
          frontmatter: false,
        });

        assert(ast.type === 'root');

        const firstChild = ast.children[0];

        assert(firstChild.type === 'thematicBreak');
      });

      it("should parse YAML frontmatter when `frontmatter` is set to `'yaml'`", () => {
        const ast = parse('---\ntitle: Example\n---\n\n# Hello', {
          frontmatter: 'yaml',
        });

        assert(ast.type === 'root');

        const frontmatter = ast.children[0];

        assert(frontmatter.type === 'yaml');
        assert.strictEqual(frontmatter.value, 'title: Example');
      });

      it("should parse TOML frontmatter when `frontmatter` is set to `'toml'`", () => {
        const ast = parse('+++\ntitle = "Example"\n+++\n\n# Hello', {
          frontmatter: 'toml',
        });

        assert(ast.type === 'root');

        const frontmatter = ast.children[0];

        assert(frontmatter.type === 'toml');
        assert.strictEqual(frontmatter.value, 'title = "Example"');
      });

      it("should parse JSON frontmatter when `frontmatter` is set to `'json'`", () => {
        const ast = parse('---\n{"title": "Example"}\n---\n\n# Hello', {
          frontmatter: 'json',
        });

        assert(ast.type === 'root');

        const frontmatter = ast.children[0];

        assert(frontmatter.type === 'json');
        assert.strictEqual(frontmatter.value, '{"title": "Example"}');
      });

      it("should not parse TOML frontmatter when `frontmatter` is set to `'yaml'`", () => {
        const ast = parse('+++\ntitle = "Example"\n+++', {
          frontmatter: 'yaml',
        });

        assert(ast.type === 'root');

        const firstChild = ast.children[0];

        assert(firstChild.type === 'paragraph');
      });

      it("should not parse YAML frontmatter when `frontmatter` is set to `'toml'`", () => {
        const ast = parse('---\ntitle: Example\n---', {
          frontmatter: 'toml',
        });

        assert(ast.type === 'root');

        const firstChild = ast.children[0];

        assert(firstChild.type === 'thematicBreak');
      });

      it("should not parse TOML frontmatter when `frontmatter` is set to `'json'`", () => {
        const ast = parse('+++\ntitle = "Example"\n+++', {
          frontmatter: 'json',
        });

        assert(ast.type === 'root');

        const firstChild = ast.children[0];

        assert(firstChild.type === 'paragraph');
      });

      it("should parse an empty document when `frontmatter` is set to `'json'`", () => {
        const ast = parse('', { frontmatter: 'json' });

        assert(ast.type === 'root');
        assert.strictEqual(ast.children.length, 0);
      });

      it('should parse inline and block math when `math` is set to `true`', () => {
        const ast = parse('Inline $x$ and block:\n\n$$\ny = 2\n$$', { math: true });

        assert(ast.type === 'root');

        const paragraph = ast.children[0];

        assert(paragraph.type === 'paragraph');
        assert.strictEqual(paragraph.children.length, 3);

        const inlineMath = paragraph.children[1];

        assert(inlineMath.type === 'inlineMath');
        assert.strictEqual(inlineMath.value, 'x');

        const math = ast.children[1];

        assert(math.type === 'math');
        assert.strictEqual(math.value, 'y = 2');
      });
    });
  });

  describe('default export', () => {
    it('should have a `meta` property', () => {
      assert.strictEqual(typeof parser.meta, 'object');

      assert.strictEqual(typeof parser.meta.name, 'string');
      assert.strictEqual(parser.meta.name, pkg.name);

      assert.strictEqual(typeof parser.meta.version, 'string');
      assert.strictEqual(parser.meta.version, pkg.version);
    });

    it('should have a `parse` property', () => {
      assert.strictEqual(typeof parser.parse, 'function');
    });
  });
});
