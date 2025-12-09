import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LocationDisplay } from './LocationDisplay';

const meta: Meta<typeof LocationDisplay> = {
  title: 'Shared/UI/LocationDisplay',
  component: LocationDisplay,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: 'Компонент для відображення локації туру з іконкою.',
      },
    },
  },

  argTypes: {
    location: {
      control: 'text',
      description: 'Відформатований рядок локації (країна, місто).',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LocationDisplay>;

export const DefaultLocation: Story = {
  name: 'Локація за замовчуванням',
  args: {
    location: 'Флоренція, Італія',
  },
};
