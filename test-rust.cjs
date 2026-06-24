/* eslint-disable -- Test */

const { readFileSync } = require('node:fs');
const { fromMarkdown } = require('./build/release/npm_eslint_markdown.node');

const markdown = readFileSync('./website/docs/get-started/configurations.md', 'utf8');

console.time('from-markdown');

JSON.parse(fromMarkdown(markdown));

console.timeEnd('from-markdown');
