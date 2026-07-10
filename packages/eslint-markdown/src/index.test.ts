/**
 * @fileoverview Test for `index.ts`.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';

import { defineConfig } from 'eslint/config';
import { Linter } from 'eslint/universal';
import markdown from '@eslint/markdown';

import md from './index.js';
import packageJson from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('package.json', () => {
    it('should have `sideEffects: false`', () => {
      assert.strictEqual(packageJson.sideEffects, false);
    });
  });

  describe('Basic', () => {
    it('should have correct meta information', () => {
      assert.strictEqual(md.meta.name, 'eslint-markdown');
      assert.strictEqual(typeof md.meta.version, 'string');
    });

    it('should have rules', () => {
      assert.ok(md.rules);
      assert.strictEqual(typeof md.rules, 'object');
      assert.strictEqual(Object.keys(md.rules).length > 0, true);
    });

    it('should have configs', () => {
      assert.ok(md.configs);
      assert.ok(md.configs.all);
      assert.ok(md.configs.base);
      assert.ok(md.configs.recommended);
      assert.ok(md.configs.stylistic);
      assert.strictEqual(typeof md.configs, 'object');
      assert.strictEqual(Object.keys(md.configs).length > 0, true);
    });
  });

  describe('Config rules should use `md/` prefix', () => {
    it('`all` configuration', () => {
      for (const allConfigRuleName of Object.keys(md.configs.all.rules)) {
        assert.strictEqual(allConfigRuleName.startsWith('md/'), true);
      }
    });

    it('`recommended` configuration', () => {
      for (const recommendedConfigRuleName of Object.keys(md.configs.recommended.rules)) {
        assert.strictEqual(recommendedConfigRuleName.startsWith('md/'), true);
      }
    });

    it('`stylistic` configuration', () => {
      for (const stylisticConfigRuleName of Object.keys(md.configs.stylistic.rules)) {
        assert.strictEqual(stylisticConfigRuleName.startsWith('md/'), true);
      }
    });
  });

  describe('Extends style configuration should work correctly', () => {
    it('`all` configuration', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            md,
          },
          extends: ['md/all'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('12  34', extendsStyleConfig, {
        filename: 'test.md',
      });

      assert.strictEqual(extendsStyleConfigResult.length, 1);
      assert.strictEqual(extendsStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(extendsStyleConfigResult[0].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[0].line, 1);
      assert.strictEqual(extendsStyleConfigResult[0].column, 3);
      assert.strictEqual(extendsStyleConfigResult[0].endLine, 1);
      assert.strictEqual(extendsStyleConfigResult[0].endColumn, 5);
    });

    it('`all` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            markdown,
            md,
          },
          extends: ['markdown/recommended', 'md/all'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify(
        '12  34\n\n[foo]: bar',
        extendsStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(extendsStyleConfigResult.length, 2);
      assert.strictEqual(extendsStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(extendsStyleConfigResult[0].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[0].line, 1);
      assert.strictEqual(extendsStyleConfigResult[0].column, 3);
      assert.strictEqual(extendsStyleConfigResult[0].endLine, 1);
      assert.strictEqual(extendsStyleConfigResult[0].endColumn, 5);
      assert.strictEqual(
        extendsStyleConfigResult[1].ruleId,
        'markdown/no-unused-definitions',
      );
      assert.strictEqual(extendsStyleConfigResult[1].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[1].line, 3);
      assert.strictEqual(extendsStyleConfigResult[1].column, 1);
      assert.strictEqual(extendsStyleConfigResult[1].endLine, 3);
      assert.strictEqual(extendsStyleConfigResult[1].endColumn, 11);
    });

    it('`base` configuration', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            md,
          },
          extends: ['md/base'],
          rules: {
            'md/no-double-space': 'error',
          },
        },
      ]);
      const extendsStyleConfigResult = linter.verify('12  34', extendsStyleConfig, {
        filename: 'test.md',
      });

      assert.strictEqual(extendsStyleConfigResult.length, 1);
      assert.strictEqual(extendsStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(extendsStyleConfigResult[0].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[0].line, 1);
      assert.strictEqual(extendsStyleConfigResult[0].column, 3);
      assert.strictEqual(extendsStyleConfigResult[0].endLine, 1);
      assert.strictEqual(extendsStyleConfigResult[0].endColumn, 5);
    });

    it('`base` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            markdown,
            md,
          },
          extends: ['markdown/recommended', 'md/base'],
          rules: {
            'md/no-double-space': 'error',
          },
        },
      ]);
      const extendsStyleConfigResult = linter.verify(
        '12  34\n\n[foo]: bar',
        extendsStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(extendsStyleConfigResult.length, 2);
      assert.strictEqual(extendsStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(extendsStyleConfigResult[0].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[0].line, 1);
      assert.strictEqual(extendsStyleConfigResult[0].column, 3);
      assert.strictEqual(extendsStyleConfigResult[0].endLine, 1);
      assert.strictEqual(extendsStyleConfigResult[0].endColumn, 5);
      assert.strictEqual(
        extendsStyleConfigResult[1].ruleId,
        'markdown/no-unused-definitions',
      );
      assert.strictEqual(extendsStyleConfigResult[1].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[1].line, 3);
      assert.strictEqual(extendsStyleConfigResult[1].column, 1);
      assert.strictEqual(extendsStyleConfigResult[1].endLine, 3);
      assert.strictEqual(extendsStyleConfigResult[1].endColumn, 11);
    });

    it('`recommended` configuration', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            md,
          },
          extends: ['md/recommended'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('12  34', extendsStyleConfig, {
        filename: 'test.md',
      });

      assert.strictEqual(extendsStyleConfigResult.length, 1);
      assert.strictEqual(extendsStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(extendsStyleConfigResult[0].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[0].line, 1);
      assert.strictEqual(extendsStyleConfigResult[0].column, 3);
      assert.strictEqual(extendsStyleConfigResult[0].endLine, 1);
      assert.strictEqual(extendsStyleConfigResult[0].endColumn, 5);
    });

    it('`recommended` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            markdown,
            md,
          },
          extends: ['markdown/recommended', 'md/recommended'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify(
        '12  34\n\n[foo]: bar',
        extendsStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(extendsStyleConfigResult.length, 2);
      assert.strictEqual(extendsStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(extendsStyleConfigResult[0].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[0].line, 1);
      assert.strictEqual(extendsStyleConfigResult[0].column, 3);
      assert.strictEqual(extendsStyleConfigResult[0].endLine, 1);
      assert.strictEqual(extendsStyleConfigResult[0].endColumn, 5);
      assert.strictEqual(
        extendsStyleConfigResult[1].ruleId,
        'markdown/no-unused-definitions',
      );
      assert.strictEqual(extendsStyleConfigResult[1].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[1].line, 3);
      assert.strictEqual(extendsStyleConfigResult[1].column, 1);
      assert.strictEqual(extendsStyleConfigResult[1].endLine, 3);
      assert.strictEqual(extendsStyleConfigResult[1].endColumn, 11);
    });

    it('`stylistic` configuration', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            md,
          },
          extends: ['md/stylistic'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify('---\n\n___', extendsStyleConfig, {
        filename: 'test.md',
      });

      assert.strictEqual(extendsStyleConfigResult.length, 1);
      assert.strictEqual(
        extendsStyleConfigResult[0].ruleId,
        'md/consistent-thematic-break-style',
      );
      assert.strictEqual(extendsStyleConfigResult[0].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[0].line, 3);
      assert.strictEqual(extendsStyleConfigResult[0].column, 1);
      assert.strictEqual(extendsStyleConfigResult[0].endLine, 3);
      assert.strictEqual(extendsStyleConfigResult[0].endColumn, 4);
    });

    it('`stylistic` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            markdown,
            md,
          },
          extends: ['markdown/recommended', 'md/stylistic'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify(
        '---\n\n___\n\n[foo]: bar',
        extendsStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(extendsStyleConfigResult.length, 2);
      assert.strictEqual(
        extendsStyleConfigResult[0].ruleId,
        'md/consistent-thematic-break-style',
      );
      assert.strictEqual(extendsStyleConfigResult[0].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[0].line, 3);
      assert.strictEqual(extendsStyleConfigResult[0].column, 1);
      assert.strictEqual(extendsStyleConfigResult[0].endLine, 3);
      assert.strictEqual(extendsStyleConfigResult[0].endColumn, 4);
      assert.strictEqual(
        extendsStyleConfigResult[1].ruleId,
        'markdown/no-unused-definitions',
      );
      assert.strictEqual(extendsStyleConfigResult[1].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[1].line, 5);
      assert.strictEqual(extendsStyleConfigResult[1].column, 1);
      assert.strictEqual(extendsStyleConfigResult[1].endLine, 5);
      assert.strictEqual(extendsStyleConfigResult[1].endColumn, 11);
    });

    it('Mixed configuration', () => {
      const linter = new Linter();
      const extendsStyleConfig = defineConfig([
        {
          files: ['**/*.md'],
          plugins: {
            markdown,
            md,
          },
          extends: ['markdown/recommended', 'md/recommended', 'md/stylistic'],
        },
      ]);
      const extendsStyleConfigResult = linter.verify(
        '12  34\n\n---\n\n___\n\n[foo]: bar',
        extendsStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(extendsStyleConfigResult.length, 3);
      assert.strictEqual(extendsStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(extendsStyleConfigResult[0].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[0].line, 1);
      assert.strictEqual(extendsStyleConfigResult[0].column, 3);
      assert.strictEqual(extendsStyleConfigResult[0].endLine, 1);
      assert.strictEqual(extendsStyleConfigResult[0].endColumn, 5);
      assert.strictEqual(
        extendsStyleConfigResult[1].ruleId,
        'md/consistent-thematic-break-style',
      );
      assert.strictEqual(extendsStyleConfigResult[1].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[1].line, 5);
      assert.strictEqual(extendsStyleConfigResult[1].column, 1);
      assert.strictEqual(extendsStyleConfigResult[1].endLine, 5);
      assert.strictEqual(extendsStyleConfigResult[1].endColumn, 4);
      assert.strictEqual(
        extendsStyleConfigResult[2].ruleId,
        'markdown/no-unused-definitions',
      );
      assert.strictEqual(extendsStyleConfigResult[2].severity, 2);
      assert.strictEqual(extendsStyleConfigResult[2].line, 7);
      assert.strictEqual(extendsStyleConfigResult[2].column, 1);
      assert.strictEqual(extendsStyleConfigResult[2].endLine, 7);
      assert.strictEqual(extendsStyleConfigResult[2].endColumn, 11);
    });
  });

  describe('Cascading style configuration should work correctly', () => {
    it('`all` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([md.configs.all]);
      const cascadingStyleConfigResult = linter.verify('12  34', cascadingStyleConfig, {
        filename: 'test.md',
      });

      assert.strictEqual(cascadingStyleConfigResult.length, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(cascadingStyleConfigResult[0].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].line, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].column, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
    });

    it('`all` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        markdown.configs.recommended,
        md.configs.all,
      ]);
      const cascadingStyleConfigResult = linter.verify(
        '12  34\n\n[foo]: bar',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(cascadingStyleConfigResult.length, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(cascadingStyleConfigResult[0].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].line, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].column, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
      assert.strictEqual(
        cascadingStyleConfigResult[1].ruleId,
        'markdown/no-unused-definitions',
      );
      assert.strictEqual(cascadingStyleConfigResult[1].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[1].line, 3);
      assert.strictEqual(cascadingStyleConfigResult[1].column, 1);
      assert.strictEqual(cascadingStyleConfigResult[1].endLine, 3);
      assert.strictEqual(cascadingStyleConfigResult[1].endColumn, 11);
    });

    it('`base` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        md.configs.base,
        { rules: { 'md/no-double-space': 'error' } },
      ]);
      const cascadingStyleConfigResult = linter.verify('12  34', cascadingStyleConfig, {
        filename: 'test.md',
      });

      assert.strictEqual(cascadingStyleConfigResult.length, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(cascadingStyleConfigResult[0].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].line, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].column, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
    });

    it('`base` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        markdown.configs.recommended,
        md.configs.base,
        { rules: { 'md/no-double-space': 'error' } },
      ]);
      const cascadingStyleConfigResult = linter.verify(
        '12  34\n\n[foo]: bar',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(cascadingStyleConfigResult.length, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(cascadingStyleConfigResult[0].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].line, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].column, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
      assert.strictEqual(
        cascadingStyleConfigResult[1].ruleId,
        'markdown/no-unused-definitions',
      );
      assert.strictEqual(cascadingStyleConfigResult[1].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[1].line, 3);
      assert.strictEqual(cascadingStyleConfigResult[1].column, 1);
      assert.strictEqual(cascadingStyleConfigResult[1].endLine, 3);
      assert.strictEqual(cascadingStyleConfigResult[1].endColumn, 11);
    });

    it('`recommended` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([md.configs.recommended]);
      const cascadingStyleConfigResult = linter.verify('12  34', cascadingStyleConfig, {
        filename: 'test.md',
      });

      assert.strictEqual(cascadingStyleConfigResult.length, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(cascadingStyleConfigResult[0].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].line, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].column, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
    });

    it('`recommended` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        markdown.configs.recommended,
        md.configs.recommended,
      ]);
      const cascadingStyleConfigResult = linter.verify(
        '12  34\n\n[foo]: bar',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(cascadingStyleConfigResult.length, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(cascadingStyleConfigResult[0].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].line, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].column, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
      assert.strictEqual(
        cascadingStyleConfigResult[1].ruleId,
        'markdown/no-unused-definitions',
      );
      assert.strictEqual(cascadingStyleConfigResult[1].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[1].line, 3);
      assert.strictEqual(cascadingStyleConfigResult[1].column, 1);
      assert.strictEqual(cascadingStyleConfigResult[1].endLine, 3);
      assert.strictEqual(cascadingStyleConfigResult[1].endColumn, 11);
    });

    it('`stylistic` configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([md.configs.stylistic]);
      const cascadingStyleConfigResult = linter.verify(
        '---\n\n___',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(cascadingStyleConfigResult.length, 1);
      assert.strictEqual(
        cascadingStyleConfigResult[0].ruleId,
        'md/consistent-thematic-break-style',
      );
      assert.strictEqual(cascadingStyleConfigResult[0].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].line, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].column, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].endLine, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].endColumn, 4);
    });

    it('`stylistic` configuration with `@eslint/markdown` plugin', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        markdown.configs.recommended,
        md.configs.stylistic,
      ]);
      const cascadingStyleConfigResult = linter.verify(
        '---\n\n___\n\n[foo]: bar',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(cascadingStyleConfigResult.length, 2);
      assert.strictEqual(
        cascadingStyleConfigResult[0].ruleId,
        'md/consistent-thematic-break-style',
      );
      assert.strictEqual(cascadingStyleConfigResult[0].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].line, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].column, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].endLine, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].endColumn, 4);
      assert.strictEqual(
        cascadingStyleConfigResult[1].ruleId,
        'markdown/no-unused-definitions',
      );
      assert.strictEqual(cascadingStyleConfigResult[1].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[1].line, 5);
      assert.strictEqual(cascadingStyleConfigResult[1].column, 1);
      assert.strictEqual(cascadingStyleConfigResult[1].endLine, 5);
      assert.strictEqual(cascadingStyleConfigResult[1].endColumn, 11);
    });

    it('Mixed configuration', () => {
      const linter = new Linter();
      const cascadingStyleConfig = defineConfig([
        markdown.configs.recommended,
        md.configs.recommended,
        md.configs.stylistic,
      ]);
      const cascadingStyleConfigResult = linter.verify(
        '12  34\n\n---\n\n___\n\n[foo]: bar',
        cascadingStyleConfig,
        {
          filename: 'test.md',
        },
      );

      assert.strictEqual(cascadingStyleConfigResult.length, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].ruleId, 'md/no-double-space');
      assert.strictEqual(cascadingStyleConfigResult[0].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[0].line, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].column, 3);
      assert.strictEqual(cascadingStyleConfigResult[0].endLine, 1);
      assert.strictEqual(cascadingStyleConfigResult[0].endColumn, 5);
      assert.strictEqual(
        cascadingStyleConfigResult[1].ruleId,
        'md/consistent-thematic-break-style',
      );
      assert.strictEqual(cascadingStyleConfigResult[1].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[1].line, 5);
      assert.strictEqual(cascadingStyleConfigResult[1].column, 1);
      assert.strictEqual(cascadingStyleConfigResult[1].endLine, 5);
      assert.strictEqual(cascadingStyleConfigResult[1].endColumn, 4);
      assert.strictEqual(
        cascadingStyleConfigResult[2].ruleId,
        'markdown/no-unused-definitions',
      );
      assert.strictEqual(cascadingStyleConfigResult[2].severity, 2);
      assert.strictEqual(cascadingStyleConfigResult[2].line, 7);
      assert.strictEqual(cascadingStyleConfigResult[2].column, 1);
      assert.strictEqual(cascadingStyleConfigResult[2].endLine, 7);
      assert.strictEqual(cascadingStyleConfigResult[2].endColumn, 11);
    });
  });
});
