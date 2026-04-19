export default {
  '*': [
    'prettier --write --ignore-unknown',
    'editorconfig-checker -config .editorconfig-checker.json',
  ],
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,json,jsonc,json5,md}': 'eslint --fix',
  '*.md': 'markdownlint --fix',
};
