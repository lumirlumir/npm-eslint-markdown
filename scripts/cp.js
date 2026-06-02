/**
 * @fileoverview Script to copy files from src to dest.
 * Usage: `node path/to/cp.js src1 dest1 src2 dest2 src3 dest3 ...`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { cpSync } from 'node:fs';
import { resolve } from 'node:path';

// --------------------------------------------------------------------------------
// Copy Files
// --------------------------------------------------------------------------------

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i += 2) {
  cpSync(resolve(process.cwd(), args[i]), resolve(process.cwd(), args[i + 1]), {
    force: true,
  });
}
