/**
 * @fileoverview Get the style of a code block.
 * @see https://spec.commonmark.org/0.31.2/#fenced-code-blocks
 * @see https://spec.commonmark.org/0.31.2/#indented-code-blocks
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export type CodeStyle = (typeof CODE_STYLE)[number];

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const backtickChar = '`';
const tildeChar = '~';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const CODE_STYLE = ['indent', 'fence-backtick', 'fence-tilde'] as const;

/**
 * Get the style of a code block.
 * - NOTE: Only the first character is inspected, so a single character read from the start of a `Code` node is enough.
 * @param str Text starting at the beginning of a `Code` node.
 * @returns The code style.
 */
export default function getCodeStyle(str: string): CodeStyle {
  const firstChar = str[0];

  if (firstChar === backtickChar) {
    return 'fence-backtick';
  } else if (firstChar === tildeChar) {
    return 'fence-tilde';
  } else {
    return 'indent';
  }
}
