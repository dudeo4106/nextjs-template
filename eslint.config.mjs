import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import parser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      '**/node_modules',
      '**/.next',
      './packages/product/tsconfig.json',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    languageOptions: {
      parser,
      parserOptions: {
        projectService: ['*.js'],
      },
    },
  },
  prettier,
];
