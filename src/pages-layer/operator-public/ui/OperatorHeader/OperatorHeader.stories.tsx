import type { Meta, StoryObj } from '@storybook/nextjs';

import { OperatorHeader } from './OperatorHeader';
import { mockOperator } from './data';

const meta: Meta<typeof OperatorHeader> = {
  title: 'PublicOperator/OperatorHeader',
  component: OperatorHeader,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof OperatorHeader>;

export const Default: Story = {
  args: { operator: mockOperator },
};
