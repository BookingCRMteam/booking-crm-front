import { Meta, StoryObj } from '@storybook/nextjs';

import { DateDisplay } from './DateDisplay';

const meta: Meta<typeof DateDisplay> = {
  title: 'Shared/UI/DateDisplay',
  component: DateDisplay,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: 'Компонент для відображення дат туру з іконкою.',
      },
    },
  },

  argTypes: {
    date: {
      control: 'text',
      description:
        'Відформатований рядок дат (наприклад, 01.10.25 — 07.10.25).',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DateDisplay>;

export const DefaultDate: Story = {
  name: 'Дати туру за замовчуванням',
  args: {
    date: '01.10.25 — 07.10.25',
  },
};
