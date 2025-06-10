import eslint from '@eslint/js';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/node_modules', '**/.next', '**/dist'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    languageOptions: {
      parser,
      parserOptions: {
        projectService: ['*.js'],
      },
    },
  },
  prettier,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
];
