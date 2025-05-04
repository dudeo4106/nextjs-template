import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // NOTE: import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

// @see: https://nextjs.org/docs/app/api-reference/config/eslint#specifying-a-root-directory-within-a-monorepo
const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/typescript', 'prettier'],
    settings: {
      next: {
        rootDir: 'packages/app/',
      },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: '../../tsconfig.json',
    },
  }),
];

export default eslintConfig;
