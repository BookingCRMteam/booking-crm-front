import type { Meta, StoryObj } from '@storybook/nextjs';

import { OperatorPublicPage } from './OperatorPublicPage';
import { mockOperator } from './data';

const meta: Meta<typeof OperatorPublicPage> = {
  title: 'Pages/OperatorPublicPage',
  component: OperatorPublicPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof OperatorPublicPage>;

export const Default: Story = {
  args: {
    operator: mockOperator,
  },
};

export const NoPhoto: Story = {
  args: {
    operator: {
      ...mockOperator,
      photo: null,
    },
  },
};

export const NoDescription: Story = {
  args: {
    operator: {
      ...mockOperator,
      description: null,
    },
  },
};

export const NoPhilosophy: Story = {
  args: {
    operator: {
      ...mockOperator,
      philosophy: null,
    },
  },
};

export const MinimalData: Story = {
  args: {
    operator: {
      ...mockOperator,
      photo: null,
      description: null,
      philosophy: null,
    },
  },
};
