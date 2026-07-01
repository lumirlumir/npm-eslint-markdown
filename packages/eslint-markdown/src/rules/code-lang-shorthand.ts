/**
 * @fileoverview Rule to enforce the use of shorthand for code block language identifiers.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { URL_RULE_DOCS } from '../core/constants.js';
import type { RuleModule } from '../core/types.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type RuleOptions = [{ allow: string[]; override: Record<string, string> }];
type MessageIds = 'codeLangShorthand';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Please note that the keys and values should be in lowercase.
 * @see https://shiki.style/languages#bundled-languages
 */
const langShorthandMap: Readonly<Record<string, string>> = Object.freeze({
  asciidoc: 'adoc',
  batch: 'bat',
  berry: 'be',
  bsl: '1c',
  cadence: 'cdc',
  clojure: 'clj',
  codeql: 'ql',
  coffeescript: 'coffee',
  'common-lisp': 'lisp',
  csharp: 'c#',
  cypher: 'cql',
  dockerfile: 'docker',
  'emacs-lisp': 'elisp',
  erlang: 'erl',
  fluent: 'ftl',
  'fortran-fixed-form': 'f',
  fsharp: 'f#',
  'glimmer-js': 'gjs',
  'glimmer-ts': 'gts',
  graphql: 'gql',
  handlebars: 'hbs',
  haskell: 'hs',
  properties: 'ini',
  javascript: 'js',
  jssm: 'fsl',
  julia: 'jl',
  kotlin: 'kt',
  kusto: 'kql',
  lean4: 'lean',
  makefile: 'make',
  markdown: 'md',
  mermaid: 'mmd',
  mipsasm: 'mips',
  narrat: 'nar',
  nextflow: 'nf',
  nushell: 'nu',
  'objective-c': 'objc',
  pot: 'po',
  potx: 'po',
  powershell: 'ps',
  protobuf: 'proto',
  jade: 'pug',
  python: 'py',
  perl6: 'raku',
  regexp: 'regex',
  ruby: 'rb',
  rust: 'rs',
  '1c-query': 'sdbl',
  shaderlab: 'shader',
  shellscript: 'sh',
  shell: 'sh',
  bash: 'sh',
  zsh: 'sh',
  shellsession: 'console',
  'closure-templates': 'soy',
  splunk: 'spl',
  stylus: 'styl',
  talonscript: 'talon',
  terraform: 'tf',
  text: 'txt',
  typescript: 'ts',
  typespec: 'tsp',
  typst: 'typ',
  vimscript: 'vim',
  vyper: 'vy',
  wikitext: 'wiki',
  mediawiki: 'wiki',
  wolfram: 'wl',
  yaml: 'yml',
});

/** @param str The language identifier to normalize. */
function normalize(str: string) {
  return str.toLowerCase();
}

// --------------------------------------------------------------------------------
// Rule Definition
// --------------------------------------------------------------------------------

const rule: RuleModule<RuleOptions, MessageIds> = {
  meta: {
    type: 'problem',

    docs: {
      description: 'Enforce the use of shorthand for code block language identifiers',
      url: URL_RULE_DOCS('code-lang-shorthand'),
      recommended: true,
      stylistic: false,
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              type: 'string',
            },
            uniqueItems: true,
          },
          override: {
            type: 'object',
            additionalProperties: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],

    defaultOptions: [
      {
        allow: [],
        override: {},
      },
    ],

    messages: {
      codeLangShorthand: '`{{ lang }}` should be shortened to `{{ langShorthand }}`.',
    },

    language: 'markdown',

    dialects: ['commonmark', 'gfm'],
  },

  create(context) {
    const { sourceCode } = context;
    const [{ allow, override }] = context.options;

    const normalizedAllow = new Set(allow.map(normalize));
    const normalizedOverride = Object.fromEntries(
      Object.entries(override).map(([key, value]) => [normalize(key), normalize(value)]), // Normalize keys and values.
    );

    const mergedLangShorthandMap = {
      ...langShorthandMap,
      ...normalizedOverride,
    };

    return {
      code(node) {
        // If it's 'Indented code block' or 'Fenced code block without lang', skip it.
        if (node.lang === null || node.lang === undefined) {
          return;
        }

        const normalizedLang = normalize(node.lang);

        // If the lang is in the allow list, skip it.
        if (normalizedAllow.has(normalizedLang)) {
          return;
        }

        const langShorthand = mergedLangShorthandMap[normalizedLang];

        // If there is no shorthand for the lang, skip it.
        if (langShorthand === undefined) {
          return;
        }

        const [nodeStartOffset] = sourceCode.getRange(node);
        const matchIndex = sourceCode.getText(node).indexOf(node.lang);

        const startOffset = nodeStartOffset + matchIndex;
        const endOffset = startOffset + node.lang.length;

        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(startOffset),
            end: sourceCode.getLocFromIndex(endOffset),
          },

          data: {
            lang: node.lang, // Original lang.
            langShorthand,
          },

          messageId: 'codeLangShorthand',

          fix(fixer) {
            return fixer.replaceTextRange([startOffset, endOffset], langShorthand);
          },
        });
      },
    };
  },
};

export default rule;
