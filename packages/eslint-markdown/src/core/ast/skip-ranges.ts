/**
 * @fileoverview Class to manage skip ranges.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { AST } from 'eslint';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type SourceRange = AST.Range;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Class to manage skip ranges.
 */
export default class SkipRanges {
  // ------------------------------------------------------------------------------
  // Private Property
  // ------------------------------------------------------------------------------

  #skipRanges = new Set<SourceRange>();

  // ------------------------------------------------------------------------------
  // Public Method
  // ------------------------------------------------------------------------------

  /**
   * Push a `range` to the set of skip ranges. (Method chaining supported.)
   * @param range Source range to skip.
   */
  push(range: SourceRange): this {
    this.#skipRanges.add(range);

    return this;
  }

  /**
   * Check whether the `offset` is included in any skip ranges.
   * @param offset Offset to check.
   */
  includes(offset: number): boolean {
    return [...this.#skipRanges].some(
      skipRange => skipRange[0] <= offset && offset < skipRange[1], // Since `skipRange[1]` is an open interval, we use `<`.
    );
  }
}
