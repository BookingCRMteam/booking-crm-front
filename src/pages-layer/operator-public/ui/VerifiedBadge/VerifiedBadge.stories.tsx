import type { Meta, StoryObj } from '@storybook/nextjs';

import { VerifiedBadge } from './VerifiedBadge';

const meta: Meta<typeof VerifiedBadge> = {
  title: 'PublicOperator/VerifiedBadge',
  component: VerifiedBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof VerifiedBadge>;

export const Default: Story = {};
