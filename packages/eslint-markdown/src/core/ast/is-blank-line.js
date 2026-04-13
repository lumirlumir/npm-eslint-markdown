/**
 * @fileoverview Check if a line is blank.
 * @see https://spec.commonmark.org/0.31.2/#blank-line
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const whitespaceChars = new Set([' ', '\t']);
const blockquoteChar = '>';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Check if a line is blank.
 * - NOTE: The `blockquoteDepth` parameter is zero-based: `0` means one blockquote marker, `1` means two, and so on.
 * @param {string} str Line string.
 * @param {number} [blockquoteDepth] The depth of blockquotes. Default is `-1`.
 * @returns {boolean} `true` if the line is blank. `false` otherwise.
 */
export default function isBlankLine(str, blockquoteDepth = -1) {
  // `.length` is cached for performance.
  const strLength = str.length;
  let remainingBlockquotes = blockquoteDepth + 1;

  for (let i = 0; i < strLength; i++) {
    const char = str[i];

    if (!whitespaceChars.has(char)) {
      if (remainingBlockquotes > 0 && char === blockquoteChar) {
        remainingBlockquotes--;
        continue;
      }

      return false;
    }
  }

  return true;
}
