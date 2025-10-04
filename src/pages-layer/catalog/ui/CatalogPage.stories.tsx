import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { mockTour } from '@/shared/ui/TourCard/data';

import { CatalogPagePure } from './CatalogPagePure';

const MOCK_PAGE_DATA = {
  data: Array(6).fill(mockTour),
  message: '',
  meta: { limit: 6, offset: 0, total: '6' },
};

const MOCK_CATALOG_DATA = {
  pages: [MOCK_PAGE_DATA],
  pageParams: [0],
};

const MOCK_EMPTY_DATA = {
  pages: [],
  pageParams: [],
};

const MOCK_ERROR = {
  message: 'Failed to fetch tours.',
  name: 'QueryError',
} as Error;

const meta: Meta<typeof CatalogPagePure> = {
  title: 'Pages/Catalog',
  component: CatalogPagePure,
  tags: ['autodocs'],

  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      layout: 'fullscreen',
    },
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

type Story = StoryObj<typeof CatalogPagePure>;

export const EmptyCatalog: Story = {
  args: {
    data: MOCK_EMPTY_DATA,
    error: null,
    isFetchingNextPage: false,
  },
};

export const LoadedCatalog: Story = {
  args: {
    data: MOCK_CATALOG_DATA,
    error: null,
    isFetchingNextPage: false,
    ref: undefined,
  },
};

export const LoadingNextPage: Story = {
  args: {
    data: MOCK_CATALOG_DATA,
    error: null,
    isFetchingNextPage: true,
    ref: undefined,
  },
};

export const ErrorState: Story = {
  args: {
    data: MOCK_CATALOG_DATA,
    error: MOCK_ERROR,
    isFetchingNextPage: false,
  },
};
