/**
 * @fileoverview Type tests for `index.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import eslintLumir, { meta } from 'eslint-lumir';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

meta.name satisfies 'eslint-lumir';
meta.version satisfies string;
eslintLumir.meta satisfies typeof meta;
