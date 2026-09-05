/**
 * @fileoverview Entry file for the `eslint-lumir` package.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import pkg from '../package.json' with { type: 'json' };

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

/**
 * Metadata describing the package.
 */
export const meta = {
  /**
   * The name of the package.
   */
  name: 'eslint-lumir',

  /**
   * The version of the package.
   */
  version: pkg.version,
} as const;

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default {
  meta,
};
