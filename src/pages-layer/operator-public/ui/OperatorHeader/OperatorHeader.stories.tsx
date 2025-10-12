import type { Meta, StoryObj } from '@storybook/nextjs';

import { mockOperator } from '../../mocks/data';
import { OperatorHeader } from './OperatorHeader';

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
