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

      it('`meta.docs` should exist', () => {
        assert.ok(meta?.docs);
      });

      it('`meta.docs.description` should exist and follow the convention', () => {
        assert.ok(meta?.docs?.description);
        assert.match(meta?.docs?.description, /^(?:Enforce|Require|Disallow) .+[^. ]$/);
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

      it("`meta.language` should exist and be `'markdown'`", () => {
        assert.ok(meta?.language);
        assert.match(meta?.language, /^markdown$/);
      });

      it("`meta.dialects` should exist and be `'commonmark'` or `'gfm'`", () => {
        assert.ok(meta?.dialects);
        assert.ok(meta?.dialects.length > 0);
        meta?.dialects.forEach(dialect => {
          assert.match(dialect, /^(?:commonmark|gfm)$/);
        });
      });
    });

    describe('rule', () => {
      if (meta?.dialects?.includes('commonmark')) {
        describe('commonmark', () => {
          ruleTesterCommonmark.run(ruleName, rule, tests);
        });
      }

      if (meta?.dialects?.includes('gfm')) {
        describe('gfm', () => {
          ruleTesterGfm.run(ruleName, rule, tests);
        });
      }
    });
  });
}
