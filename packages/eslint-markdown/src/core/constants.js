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

/** @type {'eslint-markdown'} */
export const PKG_NAME = /** @type {'eslint-markdown'} */ (pkg.name);
/** @satisfies {string} */
export const PKG_VERSION = pkg.version;
/** Get the URL for the rule documentation based on the rule name. @param {string} [ruleName] */
export const URL_RULE_DOCS = (ruleName = '') => `${pkg.homepage}/docs/rules/${ruleName}`;
