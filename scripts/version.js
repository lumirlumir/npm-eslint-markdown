/**
 * @fileoverview Script to bump versions of packages in the monorepo.
 * Usage: `node path/to/version.js <semver> [preid]`
 */

/* eslint-disable no-console -- CLI */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { execSync } from 'node:child_process';
import { styleText } from 'node:util';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const semver = process.argv[2];
const preid = process.argv[3] ?? '';

/** @param {Buffer<ArrayBufferLike>} buffer @returns {Record<string, any>} */
function stringifyBuffer(buffer) {
  return JSON.parse(buffer.toString());
}

/** @param {string} text */
function bgCyan(text) {
  return styleText('bgCyan', text);
}

/** @param {string} text */
function cyan(text) {
  return styleText('cyan', text);
}

/** @param {string} text */
function green(text) {
  return styleText('green', text);
}

/** @param {string} text */
function magenta(text) {
  return styleText('magenta', text);
}

// --------------------------------------------------------------------------------
// Script: Bump workspace root and package versions
// --------------------------------------------------------------------------------

console.log(`
${bgCyan('Bump workspace root and package versions')}

> semver: ${cyan(semver)}
> preid: ${cyan(preid)}
`);

execSync(
  `npm version ${semver} --preid ${preid} -w packages --no-workspaces-update --include-workspace-root --no-git-tag-version`,
  {
    stdio: 'inherit',
  },
);

console.log(`
${green('Successfully bumped workspace root and package versions')}
`);

// --------------------------------------------------------------------------------
// Script: Bump transitive dependency and dev-dependency versions
// --------------------------------------------------------------------------------

console.log(`
${bgCyan('Bump transitive dependency and dev-dependency versions')}
`);

const packages = stringifyBuffer(execSync('npm pkg get -ws'));
const bumpedPackages = stringifyBuffer(execSync('npm pkg get -w packages'));

/** @type {Map<string, string>} */
const bumpedPackagesMap = new Map(
  Object.entries(bumpedPackages).map(([packageName, packageJson]) => [
    packageName,
    `^${packageJson.version}`,
  ]),
);

for (const [packageName, packageJson] of Object.entries(packages)) {
  console.log('Workspace:', magenta(packageName));

  // Step 1: Check dependencies.
  if (packageJson.dependencies) {
    for (const [depName, oldDepVersion] of Object.entries(packageJson.dependencies)) {
      if (!bumpedPackagesMap.has(depName)) continue;

      const newDepVersion = String(bumpedPackagesMap.get(depName));

      console.log(
        '> Bump transitive dependency:',
        cyan(depName),
        'from',
        cyan(oldDepVersion),
        'to',
        cyan(newDepVersion),
      );

      execSync(
        `npm pkg set dependencies.${depName}="${newDepVersion}" -w ${packageName}`,
      );
    }
  }

  // Step 2: Check dev-dependencies.
  if (packageJson.devDependencies) {
    for (const [depName, oldDepVersion] of Object.entries(packageJson.devDependencies)) {
      if (!bumpedPackagesMap.has(depName)) continue;

      const newDepVersion = String(bumpedPackagesMap.get(depName));

      console.log(
        '> Bump transitive dev-dependency:',
        cyan(depName),
        'from',
        cyan(oldDepVersion),
        'to',
        cyan(newDepVersion),
      );

      execSync(
        `npm pkg set devDependencies.${depName}="${newDepVersion}" -w ${packageName}`,
      );
    }
  }

  console.log(); // New line.
}

console.log(`
${green('Successfully bumped transitive dependency and dev-dependency versions')}
`);

// --------------------------------------------------------------------------------
// Script: Run `npm install` to update lockfile
// --------------------------------------------------------------------------------

console.log(`
${bgCyan('Run `npm install` to update lockfile')}
`);

execSync('npm install', { stdio: 'inherit' });

console.log(`
${green('Successfully ran `npm install` to update lockfile')}
`);
