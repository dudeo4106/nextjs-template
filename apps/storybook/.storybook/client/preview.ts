import type { Preview } from '@storybook/nextjs';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
  },
} as const satisfies Preview;

export default preview;
