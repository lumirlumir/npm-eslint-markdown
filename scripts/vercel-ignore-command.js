/**
 * @fileoverview Script to tell Vercel whether to skip a build.
 */

/* eslint-disable no-console -- CLI */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const author = process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN;
const branch = process.env.VERCEL_GIT_COMMIT_REF;

// --------------------------------------------------------------------------------
// Script
// --------------------------------------------------------------------------------

// If the PR is created by `dependabot[bot]` and the branch is not `main`, ignore the build.
if (author === 'dependabot[bot]' && branch !== 'main') {
  console.log(
    `🛑 Ignoring build for dependabot[bot] PR (author: ${author}, branch: ${branch})`,
  );
  process.exit(0); // Return `0` to skip the build.
}

// Proceed with the build in other cases.
console.log(`✅ Proceeding with the build (author: ${author}, branch: ${branch})`);
process.exit(1); // Return `1` to proceed with the build.
