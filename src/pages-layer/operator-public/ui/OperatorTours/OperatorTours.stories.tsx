'use client';

import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Tours } from '@/entities/tour/model/types';

import { mockTour } from '@/shared/tests';
import { StorybookProviderWrapper } from '@/shared/tests/StorybookProviderWrapper';

import { OperatorTours } from './OperatorTours';

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

const OPERATOR_ID = 123;

const meta: Meta<typeof OperatorTours> = {
  title: 'Pages/PublicOperator/OperatorTours',
  component: OperatorTours,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '1040px', margin: '0 auto', padding: 3 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OperatorTours>;

export const Loaded: Story = {
  name: 'LoadedTours',
  args: {
    operatorId: OPERATOR_ID,
    initialData: MOCK_PAGE_DATA,
  },
  decorators: [
    (Story) => (
      <StorybookProviderWrapper
        token={null}
        setQueryMocks={(client) => {
          client.setQueryData(['tours', 'operator', OPERATOR_ID], {
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
  name: 'EmptyOrErrorTours',
  args: {
    operatorId: OPERATOR_ID,
    initialData: MOCK_EMPTY_PAGE,
  },
  decorators: [
    (Story) => (
      <StorybookProviderWrapper
        token={null}
        setQueryMocks={(client) => {
          client.setQueryData(['tours', 'operator', OPERATOR_ID], {
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
