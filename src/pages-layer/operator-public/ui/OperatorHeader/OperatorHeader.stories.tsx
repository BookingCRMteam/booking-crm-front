import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockOperatorById } from '@/shared/tests';

import { OperatorHeader } from './OperatorHeader';

const meta: Meta<typeof OperatorHeader> = {
  title: 'Pages/PublicOperator/OperatorHeader',
  component: OperatorHeader,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof OperatorHeader>;

export const Default: Story = {
  args: { operator: mockOperatorById },
};

export const WithoutPhoto: Story = {
  args: {
    operator: {
      ...mockOperatorById,
      photo: null,
    },
  },
};

export const WithoutDescriptionAndPhilosophy: Story = {
  args: {
    operator: {
      ...mockOperatorById,
      description: '',
      philosophy: '',
    },
  },
};
