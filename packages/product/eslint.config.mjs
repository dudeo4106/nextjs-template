import { FlatCompat } from '@eslint/eslintrc';
import rootEslintConfig from '../../eslint.config.mjs';

const compat = new FlatCompat({
  // NOTE: import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

// @see: https://nextjs.org/docs/app/api-reference/config/eslint#specifying-a-root-directory-within-a-monorepo
const eslintConfig = [
  ...rootEslintConfig, // extends root eslint config
  ...compat.config({
    extends: ['next', 'prettier'],
    settings: {
      next: {
        rootDir: './',
      },
    },
  }),
];

export default eslintConfig;
