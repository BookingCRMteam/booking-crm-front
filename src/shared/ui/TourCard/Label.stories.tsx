import type { Meta, StoryObj } from '@storybook/nextjs';

import Label from './Label';

const meta: Meta<typeof Label> = {
  title: 'TourCard/Label',
  component: Label,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Label>;

export const LowCount_2Spots: Story = {
  args: {
    count: 2,
  },
};

export const NormalCount_12Spots: Story = {
  args: {
    count: 12,
  },
};

export const HighCount_50Spots: Story = {
  args: {
    count: 50,
  },
};

export const ZeroSpots_BookedOut: Story = {
  args: {
    count: 0,
  },
};
