'use client';

import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockTour } from '../../tests/mocks/data';
import { ToursCollection } from './ToursCollection';

const mockRef = () => {};

const MOCK_PAGE_DATA = {
  data: Array(6).fill(mockTour),
  message: '',
  meta: { limit: 6, offset: 0, total: '6' },
};

const MOCK_TOURS_DATA = {
  pages: [MOCK_PAGE_DATA],
  pageParams: [0],
};

const meta: Meta<typeof ToursCollection> = {
  title: 'Shared/UI/ToursCollection',
  component: ToursCollection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    viewport: { defaultViewport: 'responsive' },
    docs: { layout: 'fullscreen' },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '1040px', margin: '0 auto' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToursCollection>;

export const Loaded: Story = {
  args: {
    data: MOCK_TOURS_DATA,
    error: null,
    isFetchingNextPage: false,
    ref: mockRef,
  },
};

export const LoadingNextPage: Story = {
  args: {
    data: MOCK_TOURS_DATA,
    error: null,
    isFetchingNextPage: true,
    ref: mockRef,
  },
};
