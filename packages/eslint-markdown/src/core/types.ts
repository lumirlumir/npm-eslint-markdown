/**
 * @fileoverview Define common types.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type {
  MarkdownRuleDefinition,
  MarkdownRuleDefinitionTypeOptions,
} from '@eslint/markdown';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents a rule module with specific rule options and message IDs.
 * @template RuleOptions The rule options.
 * @template MessageIds The message IDs.
 */
export type RuleModule<
  RuleOptions extends MarkdownRuleDefinitionTypeOptions['RuleOptions'],
  MessageIds extends MarkdownRuleDefinitionTypeOptions['MessageIds'],
> = MarkdownRuleDefinition<{
  RuleOptions: RuleOptions;
  MessageIds: MessageIds;
  ExtRuleDocs: Partial<{
    /**
     * Indicates whether this rule is part of the stylistic configuration.
     */
    stylistic: boolean;
  }>;
}>;
