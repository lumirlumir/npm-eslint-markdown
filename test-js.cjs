/* eslint-disable -- Test */

const { readFileSync } = require('node:fs');
const { gfmFromMarkdown } = require('mdast-util-gfm');
const { gfm } = require('micromark-extension-gfm');
const { fromMarkdown } = require('mdast-util-from-markdown');

const markdown = readFileSync('./website/docs/get-started/configurations.md', 'utf8');

console.time('from-markdown');

fromMarkdown(markdown, {
  extensions: [gfm()],
  mdastExtensions: [gfmFromMarkdown()],
});

console.timeEnd('from-markdown');
