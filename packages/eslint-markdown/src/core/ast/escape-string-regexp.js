/**
 * @fileoverview Utility to escape `RegExp` special characters.
 * @see https://github.com/sindresorhus/escape-string-regexp/tree/v5.0.0
 */

/*
 * MIT License
 *
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Escape `RegExp` special characters.
 *
 * You can also use this to escape a string that is inserted into the middle of a regex, for example, into a character class.
 *
 * @param {string} string A string to escape.
 * @returns {string} An escaped string.
 * @example
 * ```js
 * import escapeStringRegexp from 'path/to/escape-string-regexp.js';
 *
 * const escapedString = escapeStringRegexp('How much $ for a 🦄?');
 * //=> 'How much \\$ for a 🦄\\?'
 *
 * new RegExp(escapedString);
 * ```
 */
export default function escapeRegExp(string) {
  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it's always valid, and a `\xnn` escape
  // when the simpler form would be disallowed by Unicode patterns' stricter grammar.
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}
