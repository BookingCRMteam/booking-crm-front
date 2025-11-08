import type { Meta, StoryObj } from '@storybook/nextjs';

import { mockOperator } from '../../mocks/data';
import { OperatorHeader } from './OperatorHeader';

const meta: Meta<typeof OperatorHeader> = {
  title: 'Pages/PublicOperator/OperatorHeader',
  component: OperatorHeader,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof OperatorHeader>;

export const Default: Story = {
  args: { operator: mockOperator },
};

export const WithoutPhoto: Story = {
  args: {
    operator: {
      ...mockOperator,
      photo: null,
    },
  },
};

export const WithoutDescriptionAndPhilosophy: Story = {
  args: {
    operator: {
      ...mockOperator,
      description: '',
      philosophy: '',
    },
  },
};
