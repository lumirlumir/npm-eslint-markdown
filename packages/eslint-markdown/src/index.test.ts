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
'md/consistent-emphasis-style' satisfies keyof typeof plugin.configs.all.rules; // Stylistic rule.
'md/no-curly-quote' satisfies keyof typeof plugin.configs.all.rules;
'md/no-double-space' satisfies keyof typeof plugin.configs.all.rules; // Recommended rule.
'md/no-emoji' satisfies keyof typeof plugin.configs.all.rules;

plugin.configs.base satisfies Linter.Config;
plugin.configs.base.name satisfies 'md/base';
plugin.configs.base.language satisfies 'markdown/gfm';
// @ts-expect-error -- `rules` should not exist in base config.
plugin.configs.base.rules;

plugin.configs.recommended satisfies Linter.Config;
plugin.configs.recommended.name satisfies 'md/recommended';
plugin.configs.recommended.language satisfies 'markdown/gfm';
plugin.configs.recommended.rules satisfies Linter.RulesRecord;
'md/no-double-space' satisfies keyof typeof plugin.configs.recommended.rules;

plugin.configs.stylistic satisfies Linter.Config;
plugin.configs.stylistic.name satisfies 'md/stylistic';
plugin.configs.stylistic.language satisfies 'markdown/gfm';
plugin.configs.stylistic.rules satisfies Linter.RulesRecord;
'md/consistent-delete-style' satisfies keyof typeof plugin.configs.stylistic.rules;
'md/consistent-emphasis-style' satisfies keyof typeof plugin.configs.stylistic.rules;
'md/consistent-strong-style' satisfies keyof typeof plugin.configs.stylistic.rules;
'md/consistent-thematic-break-style' satisfies keyof typeof plugin.configs.stylistic.rules;

// #endregion configs
// --------------------------------------------------------------------------------
