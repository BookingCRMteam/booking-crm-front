import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AvailabilityBadge } from './AvailabilityBadge';

const meta: Meta<typeof AvailabilityBadge> = {
  title: 'Pages/TourPage/AvailabilityBadge',
  component: AvailabilityBadge,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Бейдж для відображення кількості доступних місць. Колір фону залежить від наявності місць.',
      },
    },
  },

  argTypes: {
    availableSpots: {
      control: 'number',
      description:
        'Кількість доступних місць. Використовується для формування тексту бейджа.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof AvailabilityBadge>;

export const TwoAvailableSpots: Story = {
  name: '2 доступних місця (Base Case)',
  args: {
    availableSpots: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Базовий стан: є кілька вільних місць. Має відображатися кольором `accent[2]` (доступно).',
      },
    },
  },
};

export const ManyAvailableSpots: Story = {
  name: 'Багато доступних місць (99+)',
  args: {
    availableSpots: 99,
  },
};

export const FullyBooked: Story = {
  name: 'Всі місця заброньовані',
  args: {
    availableSpots: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Критичний стан: місць немає. Має відображатися кольором `accent[1]` (недоступно).',
      },
    },
  },
};
