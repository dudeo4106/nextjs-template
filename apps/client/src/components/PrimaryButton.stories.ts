import type { Meta, StoryObj } from '@storybook/nextjs';

import { PrimaryButton } from './PrimaryButton';

const meta: Meta<typeof PrimaryButton> = {
  title: 'Components/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['s', 'm'],
    },
    text: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PrimaryButton>;

export const Small: Story = {
  args: {
    size: 's',
    text: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
    text: 'Medium Button',
  },
};
