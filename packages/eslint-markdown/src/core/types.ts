/**
 * @fileoverview Define common types.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type {
  MarkdownRuleDefinition,
  MarkdownRuleDefinitionTypeOptions,
  MarkdownRuleVisitor,
} from '@eslint/markdown';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Keeps inferred context types nameable without exposing Markdown's internal types.
 *
 * NOTE: This type supports compatibility with ESLint v9 and v10.
 * Reevaluate whether it is still needed when ESLint v9 support is dropped.
 */
export type RuleContext<Options extends Partial<MarkdownRuleDefinitionTypeOptions>> =
  Omit<Parameters<MarkdownRuleDefinition<Options>['create']>[0], never>;

/**
 * Represents a rule module with specific rule options and message IDs.
 * @template RuleOptions The rule options.
 * @template MessageIds The message IDs.
 */
export interface RuleModule<
  RuleOptions extends MarkdownRuleDefinitionTypeOptions['RuleOptions'],
  MessageIds extends MarkdownRuleDefinitionTypeOptions['MessageIds'],
> extends Omit<
  MarkdownRuleDefinition<{
    RuleOptions: RuleOptions;
    MessageIds: MessageIds;
  }>,
  'meta'
> {
  meta: NonNullable<
    MarkdownRuleDefinition<{
      RuleOptions: RuleOptions;
      MessageIds: MessageIds;
      ExtRuleDocs: {
        /**
         * The Markdown dialects supported by this rule.
         */
        dialects: ('CommonMark' | 'GFM')[];
        /**
         * Indicates whether this rule is part of the stylistic configuration.
         */
        stylistic?: boolean;
      };
    }>['meta']
  > & {
    /**
     * The supported language identifiers, including for ESLint v9's metadata types.
     */
    languages: ('markdown/commonmark' | 'markdown/gfm')[];
  };

  create(
    context: RuleContext<{ RuleOptions: RuleOptions; MessageIds: MessageIds }>,
  ): MarkdownRuleVisitor;
}
