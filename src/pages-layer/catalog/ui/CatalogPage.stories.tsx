'use client';

import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Tours } from '@/entities/tour/model/types';

import { StorybookProviderWrapper } from '@/shared/tests/StorybookProviderWrapper';
import { mockTour } from '@/shared/ui/TourCard/data';

import { CatalogPage } from './CatalogPage';

const MOCK_PAGE_DATA: Tours = {
  data: Array(6).fill(mockTour),
  message: '',
  meta: { limit: 6, offset: 0, total: '6' },
};

const MOCK_EMPTY_PAGE: Tours = {
  data: [],
  message: '',
  meta: { limit: 6, offset: 0, total: '0' },
};

const meta: Meta<typeof CatalogPage> = {
  title: 'Pages/CatalogPage/CatalogPage',
  component: CatalogPage,
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '1040px', margin: '0 auto', padding: 3 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CatalogPage>;

export const Loaded: Story = {
  args: { initialData: MOCK_PAGE_DATA },
  decorators: [
    (Story) => (
      <StorybookProviderWrapper
        token={null}
        setQueryMocks={(client) => {
          client.setQueryData(['tours', 'catalog'], {
            pages: [
              {
                data: MOCK_PAGE_DATA.data,
                message: '',
                meta: MOCK_PAGE_DATA.meta,
              },
            ],
            pageParams: [0],
          });
        }}
      >
        <Story />
      </StorybookProviderWrapper>
    ),
  ],
};

export const EmptyOrError: Story = {
  args: { initialData: MOCK_EMPTY_PAGE },
  decorators: [
    (Story) => (
      <StorybookProviderWrapper
        token={null}
        setQueryMocks={(client) => {
          client.setQueryData(['tours', 'catalog'], {
            pages: [{ data: [], message: '', meta: MOCK_EMPTY_PAGE.meta }],
            pageParams: [0],
          });
        }}
      >
        <Story />
      </StorybookProviderWrapper>
    ),
  ],
};
