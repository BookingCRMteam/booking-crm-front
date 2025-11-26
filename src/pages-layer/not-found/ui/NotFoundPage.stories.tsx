import type { Meta, StoryObj } from '@storybook/nextjs';

import { NotFoundPage } from './NotFoundPage';

const meta: Meta<typeof NotFoundPage> = {
  title: 'Pages/NotFoundPage (404)',
  component: NotFoundPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const Default: Story = {
  args: {},
};
