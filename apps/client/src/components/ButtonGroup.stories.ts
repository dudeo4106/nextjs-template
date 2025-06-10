import type { Meta, StoryObj } from '@storybook/nextjs';

import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {},
};
