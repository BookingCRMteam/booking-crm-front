import type { Meta, StoryObj } from '@storybook/nextjs';

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
    isAvailable: {
      control: 'boolean',
      description:
        'Визначає, чи є доступні місця (`true` для > 0). Впливає на колір фону.',
    },
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
    isAvailable: true,
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
    isAvailable: true,
  },
};

export const FullyBooked: Story = {
  name: 'Всі місця заброньовані',
  args: {
    availableSpots: 0,
    isAvailable: false,
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

export const OneSpotLeft: Story = {
  name: 'Одне місце залишилося (Edge Case)',
  args: {
    availableSpots: 1,
    isAvailable: true,
  },
  parameters: {
    docs: {
      story:
        'Перевірка відмінювання слова "місце" (чи коректно відображається однина, якщо це передбачено локалізацією).',
    },
  },
};
