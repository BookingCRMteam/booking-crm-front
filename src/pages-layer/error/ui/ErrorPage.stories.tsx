import type { Meta, StoryObj } from '@storybook/nextjs';

import { ErrorPage } from './ErrorPage';

const meta: Meta<typeof ErrorPage> = {
  title: 'Pages/ErrorPage (Global Error UI)',
  component: ErrorPage,
  tags: ['autodocs'],
  argTypes: {
    onReset: { action: 'onReset called' },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const ShortErrorDescription: Story = {
  args: {},
};
