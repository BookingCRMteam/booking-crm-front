import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import HeaderPure from './HeaderPure';

const meta: Meta<typeof HeaderPure> = {
  title: 'Widgets/Header',
  component: HeaderPure,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HeaderPure>;

export const Unauthorized: Story = {
  args: {},
};

export const AuthorizedPair: Story = {
  args: {
    userRole: 'traveler',
    firstPersonName: 'Traveler',
  },
};

export const AuthorizedOperatorPending: Story = {
  args: {
    userRole: 'operator',
    firstPersonName: 'Operator',
    operatorStatus: 'pending',
  },
};

export const AuthorizedOperatorApproved: Story = {
  args: {
    userRole: 'operator',
    firstPersonName: 'Operator',
    operatorStatus: 'approved',
  },
};

export const AuthorizedOperatorRejected: Story = {
  args: {
    userRole: 'operator',
    firstPersonName: 'Operator',
    operatorStatus: 'rejected',
  },
};
