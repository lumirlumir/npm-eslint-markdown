/**
 * @fileoverview Markdown rule tester.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it } from 'vitest';
import { match, ok } from 'node:assert';
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

export default function ruleTester(
  ruleName: string,
  rule: RuleModule<RuleOptions, MessageIds>,
  tests: Tests,
) {
  const { meta } = rule;

  describe(ruleName, () => {
    describe('meta', () => {
      it('`meta` should exist', () => {
        ok(meta);
      });

      it('`meta.type` should exist', () => {
        ok(meta?.type);
      });

      it('`meta.docs` should exist', () => {
        ok(meta?.docs);
      });

      it('`meta.docs.description` should exist and follow the convention', () => {
        ok(meta?.docs?.description);
        match(meta?.docs?.description, /^(?:Enforce|Require|Disallow) .+[^. ]$/);
      });

      it('`meta.docs.url` should exist and end with the rule name', () => {
        ok(meta?.docs?.url);
        match(meta?.docs?.url, new RegExp(`${ruleName}$`));
      });

      it('`meta.messages` should exist', () => {
        ok(meta?.messages);
      });

      it('`meta.messages.messageId` should exist and value should follow the convention', () => {
        // @ts-expect-error -- Required for testing.
        Object.values(meta.messages).forEach(message => {
          ok(message);
          match(message, /^[^a-z].*\.$/);
        });
      });

      it("`meta.language` should exist and be `'markdown'`", () => {
        ok(meta?.language);
        match(meta?.language, /^markdown$/);
      });

      it("`meta.dialects` should exist and be `'commonmark'` or `'gfm'`", () => {
        ok(meta?.dialects);
        ok(meta?.dialects.length > 0);
        meta?.dialects.forEach(dialect => {
          match(dialect, /^(?:commonmark|gfm)$/);
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
