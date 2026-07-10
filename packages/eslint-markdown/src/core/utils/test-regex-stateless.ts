/**
 * @fileoverview Utility to test a regular expression without mutating its state.
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const statefulRegexFlagRegex = /[gy]/u;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Tests a regex without mutating the state stored in its `lastIndex`.
 * @param regex Regex to test.
 * @param text Text to test.
 * @returns Whether the regex matches the text.
 */
export default function testRegexStateless(regex: RegExp, text: string) {
  return statefulRegexFlagRegex.test(regex.flags)
    ? new RegExp(regex).test(text)
    : regex.test(text);
}
