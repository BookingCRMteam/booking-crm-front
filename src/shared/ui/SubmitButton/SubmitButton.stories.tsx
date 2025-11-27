import type { Meta, StoryObj } from '@storybook/nextjs';

import { SubmitButton } from './SubmitButton';

const meta: Meta<typeof SubmitButton> = {
  title: 'Shared/Ui/SubmitButton',
  component: SubmitButton,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    isSuccess: { control: 'boolean' },
    disabled: { control: 'boolean' },
    color: { control: 'select', options: ['primary', 'secondary', 'error'] },
  },
  args: {
    textIdle: 'Подати заявку',
    textLoading: 'Подаємо',
    textSuccess: 'Успішно',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

export const Idle: Story = {
  args: {
    isLoading: false,
    isSuccess: false,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    isSuccess: false,
  },
};

export const Success: Story = {
  args: {
    isLoading: false,
    isSuccess: true,
  },
};

export const IdleDisabled: Story = {
  args: {
    isLoading: false,
    isSuccess: false,
    disabled: true,
  },
};
