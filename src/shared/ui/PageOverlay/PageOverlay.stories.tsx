import { Box, CircularProgress, SxProps, Theme } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'UI/PageOverlay',
  component: CircularProgress,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Оверлей, який блокує сторінку під час редіректу або завантаження.',
      },
    },
  },
};

export default meta;

const overlayStyles: SxProps<Theme> = {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(2px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'all',
};

export const Default: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Box sx={overlayStyles}>
        <CircularProgress color="primary" />
      </Box>
    </div>
  ),
};
