import type { StorybookConfig } from '@storybook/nextjs';

const config = {
  stories: ['../../../client/src/**/*.stories.@(ts|tsx)'],
  framework: '@storybook/nextjs',
} as const satisfies StorybookConfig;

export default config;
