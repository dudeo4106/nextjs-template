import path from 'node:path';
import type { StorybookConfig } from '@storybook/nextjs';

const config = {
  stories: ['../../../client/src/**/*.stories.@(ts|tsx)'],
  framework: '@storybook/nextjs',
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@components': path.resolve(__dirname, '../../../client/src/components'),
    };
    return config;
  },
} as const satisfies StorybookConfig;

export default config;
