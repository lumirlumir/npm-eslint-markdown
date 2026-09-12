/**
 * @fileoverview Utility to normalize a pattern option into a `RegExp`.
 * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v73.0.0/rules/filename-case.js#L276-L282
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Normalizes a pattern option into a `RegExp`.
 * String patterns are compiled with the `u` flag.
 * @param pattern `RegExp` or string pattern to normalize.
 * @returns The normalized `RegExp`.
 */
export function normalizeRegexPattern(pattern: RegExp | string): RegExp {
  return typeof pattern === 'string' ? new RegExp(pattern, 'u') : pattern;
}
