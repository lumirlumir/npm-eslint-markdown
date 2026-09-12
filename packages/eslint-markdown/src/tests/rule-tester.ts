/**
 * @fileoverview Markdown rule tester.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { RuleTester } from 'eslint';
import markdown, { type MarkdownRuleDefinitionTypeOptions } from '@eslint/markdown';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = MarkdownRuleDefinitionTypeOptions['RuleOptions'];
type MessageIds = MarkdownRuleDefinitionTypeOptions['MessageIds'];
type Tests = Parameters<RuleTester['run']>[2];

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

RuleTester.describe = describe;
RuleTester.it = it;

/**
 * Rule tester for CommonMark.
 */
const ruleTesterCommonmark = new RuleTester({
  plugins: {
    markdown,
  },
  language: 'markdown/commonmark',
});

/**
 * Rule tester for GFM.
 */
const ruleTesterGfm = new RuleTester({
  plugins: {
    markdown,
  },
  language: 'markdown/gfm',
});

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Markdown rule tester.
 * @param ruleName Rule name.
 * @param rule Rule module.
 * @param tests Tests.
 */
export default function ruleTester(
  ruleName: string,
  rule: RuleModule<RuleOptions, MessageIds>,
  tests: Tests,
) {
  const { meta } = rule;

  describe(ruleName, () => {
    describe('meta', () => {
      it('`meta` should exist', () => {
        assert.ok(meta);
      });

      it('`meta.type` should exist', () => {
        assert.ok(meta?.type);
      });

      it('`meta.languages` should list the supported Markdown language identifiers', () => {
        assert.ok(meta?.languages);
        assert.ok(meta.languages.length > 0);
        meta.languages.forEach(language => {
          assert.match(language, /^markdown\/(?:commonmark|gfm)$/);
        });
        assert.deepStrictEqual(
          meta.languages,
          meta.docs?.dialects.map(dialect => `markdown/${dialect.toLowerCase()}`),
        );
      });

      it('`meta.docs` should exist', () => {
        assert.ok(meta?.docs);
      });

      it('`meta.docs.description` should exist and follow the convention', () => {
        assert.ok(meta?.docs?.description);
        assert.match(meta?.docs?.description, /^(?:Enforce|Require|Disallow) .+[^. ]$/);
      });

      it("`meta.docs.dialects` should exist and be `'CommonMark'` or `'GFM'`", () => {
        assert.ok(meta?.docs?.dialects);
        assert.ok(meta.docs.dialects.length > 0);
        meta.docs.dialects.forEach(dialect => {
          assert.match(dialect, /^(?:CommonMark|GFM)$/);
        });
      });

      it('`meta.docs.url` should exist and end with the rule name', () => {
        assert.ok(meta?.docs?.url);
        assert.match(meta?.docs?.url, new RegExp(`${ruleName}$`));
      });

      it('`meta.messages` should exist', () => {
        assert.ok(meta?.messages);
      });

      it('`meta.messages.messageId` should exist and value should follow the convention', () => {
        // @ts-expect-error -- Required for testing.
        Object.values(meta.messages).forEach(message => {
          assert.ok(message);
          assert.match(message, /^[^a-z].*\.$/);
        });
      });

      it('should omit legacy `meta.language` and `meta.dialects` properties', () => {
        assert.notProperty(meta, 'language');
        assert.notProperty(meta, 'dialects');
      });
    });

    describe('rule', () => {
      if (meta?.languages.includes('markdown/commonmark')) {
        describe('commonmark', () => {
          ruleTesterCommonmark.run(ruleName, rule, tests);
        });
      }

      if (meta?.languages.includes('markdown/gfm')) {
        describe('gfm', () => {
          ruleTesterGfm.run(ruleName, rule, tests);
        });
      }
    });
  });
}
