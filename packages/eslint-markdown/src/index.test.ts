/**
 * @fileoverview Type test for `index.js`.
 */

/* eslint-disable -- Type test */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import plugin from 'eslint-markdown';
import type { ESLint, Linter } from 'eslint';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region plugin

plugin satisfies ESLint.Plugin;

// #endregion plugin
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region meta

plugin.meta.name satisfies 'eslint-markdown';
plugin.meta.version satisfies string;

// #endregion meta
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region rules

type RuleName = keyof typeof plugin.rules;

'allow-image-url' satisfies RuleName;
'allow-link-url' satisfies RuleName;
'code-lang-shorthand' satisfies RuleName;
'consistent-code-style' satisfies RuleName;
'consistent-delete-style' satisfies RuleName;
'consistent-emphasis-style' satisfies RuleName;
'consistent-strong-style' satisfies RuleName;
'consistent-thematic-break-style' satisfies RuleName;
'consistent-unordered-list-style' satisfies RuleName;
'no-control-character' satisfies RuleName;
'no-curly-quote' satisfies RuleName;
'no-double-punctuation' satisfies RuleName;
'no-double-space' satisfies RuleName;
'no-emoji' satisfies RuleName;
'no-git-conflict-marker' satisfies RuleName;
'no-irregular-dash' satisfies RuleName;
'no-irregular-whitespace' satisfies RuleName;
'no-tab' satisfies RuleName;
'no-url-trailing-slash' satisfies RuleName;
'require-image-title' satisfies RuleName;
'require-link-title' satisfies RuleName;

// #endregion rules
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region configs

plugin.configs.all satisfies Linter.Config;
plugin.configs.all.name satisfies 'md/all';
plugin.configs.all.language satisfies 'markdown/gfm';
plugin.configs.all.rules satisfies Linter.RulesRecord;

type AllConfigRuleName = keyof typeof plugin.configs.all.rules;

'md/allow-image-url' satisfies AllConfigRuleName;
'md/allow-link-url' satisfies AllConfigRuleName;
'md/code-lang-shorthand' satisfies AllConfigRuleName;
'md/consistent-code-style' satisfies AllConfigRuleName;
'md/consistent-delete-style' satisfies AllConfigRuleName;
'md/consistent-emphasis-style' satisfies AllConfigRuleName;
'md/consistent-strong-style' satisfies AllConfigRuleName;
'md/consistent-thematic-break-style' satisfies AllConfigRuleName;
'md/consistent-unordered-list-style' satisfies AllConfigRuleName;
'md/no-control-character' satisfies AllConfigRuleName;
'md/no-curly-quote' satisfies AllConfigRuleName;
'md/no-double-punctuation' satisfies AllConfigRuleName;
'md/no-double-space' satisfies AllConfigRuleName;
'md/no-emoji' satisfies AllConfigRuleName;
'md/no-git-conflict-marker' satisfies AllConfigRuleName;
'md/no-irregular-dash' satisfies AllConfigRuleName;
'md/no-irregular-whitespace' satisfies AllConfigRuleName;
'md/no-tab' satisfies AllConfigRuleName;
'md/no-url-trailing-slash' satisfies AllConfigRuleName;
'md/require-image-title' satisfies AllConfigRuleName;
'md/require-link-title' satisfies AllConfigRuleName;

plugin.configs.base satisfies Linter.Config;
plugin.configs.base.name satisfies 'md/base';
plugin.configs.base.language satisfies 'markdown/gfm';
// @ts-expect-error -- `rules` should not exist in base config.
plugin.configs.base.rules;

plugin.configs.recommended satisfies Linter.Config;
plugin.configs.recommended.name satisfies 'md/recommended';
plugin.configs.recommended.language satisfies 'markdown/gfm';
plugin.configs.recommended.rules satisfies Linter.RulesRecord;

type RecommendedConfigRuleName = keyof typeof plugin.configs.recommended.rules;

'md/code-lang-shorthand' satisfies RecommendedConfigRuleName;
'md/no-control-character' satisfies RecommendedConfigRuleName;
'md/no-curly-quote' satisfies RecommendedConfigRuleName;
'md/no-double-space' satisfies RecommendedConfigRuleName;
'md/no-git-conflict-marker' satisfies RecommendedConfigRuleName;
'md/no-irregular-dash' satisfies RecommendedConfigRuleName;
'md/no-irregular-whitespace' satisfies RecommendedConfigRuleName;

plugin.configs.stylistic satisfies Linter.Config;
plugin.configs.stylistic.name satisfies 'md/stylistic';
plugin.configs.stylistic.language satisfies 'markdown/gfm';
plugin.configs.stylistic.rules satisfies Linter.RulesRecord;

type StylisticConfigRuleName = keyof typeof plugin.configs.stylistic.rules;

'md/consistent-code-style' satisfies StylisticConfigRuleName;
'md/consistent-delete-style' satisfies StylisticConfigRuleName;
'md/consistent-emphasis-style' satisfies StylisticConfigRuleName;
'md/consistent-strong-style' satisfies StylisticConfigRuleName;
'md/consistent-thematic-break-style' satisfies StylisticConfigRuleName;
'md/consistent-unordered-list-style' satisfies StylisticConfigRuleName;
'md/no-tab' satisfies StylisticConfigRuleName;

// #endregion configs
// --------------------------------------------------------------------------------
