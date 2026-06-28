/**
 * @fileoverview This file declares constants used throughout the `eslint-markdown` package.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import pkg from '../../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const PKG_NAME = pkg.name as 'eslint-markdown';
export const PKG_VERSION = pkg.version;
export const URL_RULE_DOCS = (ruleName = ''): string =>
  `${pkg.homepage}/docs/rules/${ruleName}`;
