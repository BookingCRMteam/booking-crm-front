import { Box, styled } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { CloseButton } from './CloseButton';

const meta: Meta<typeof CloseButton> = {
  title: 'UI/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: 'Кнопка закриття модального вікна.',
      },
    },
  },

  argTypes: {
    top: { control: 'number', description: 'Відстань від верхнього краю' },
    right: { control: 'number', description: 'Відстань від правого краю' },
    onClick: { action: 'clicked', description: 'Обробник кліку' },
  },
};

export default meta;

type Story = StoryObj<typeof CloseButton>;

const Container = styled(Box)({
  position: 'relative',
  width: '300px',
  height: '200px',
  border: '1px solid #ccc',
});

export const Default: Story = {
  args: {
    top: 8,
    right: 8,
  },
  render: (args) => (
    <Container>
      <CloseButton {...args} />
    </Container>
  ),
};
