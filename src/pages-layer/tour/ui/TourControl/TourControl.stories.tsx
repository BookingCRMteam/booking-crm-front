import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { useBookingStore } from '@/shared/store';
import { StorybookProviderWrapper } from '@/shared/tests/StorybookProviderWrapper';

import TourControl from './TourControl';

const mockUser = {
  name: 'username',
};

const mockOperator = {
  id: 101,
  name: 'Олена Петренко',
  photo: '/images/tourCard/operator.png',
};

const baseArgs = {
  tourId: 10,
  title: 'Романтична Флоренція',
  price: '78 567',
  countryAndCity: 'Флоренція, Італія',
  date: '01.10.25 — 07.10.25',
  operator: mockOperator,
  availableSpots: 2,
};

const meta: Meta<typeof TourControl> = {
  title: 'Pages/TourPage/TourControl',
  component: TourControl,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Головний контрольний блок для сторінки туру. Інтегрує ціну, дати, туроператора, інформацію про доступність та кнопку бронювання.',
      },
    },
  },

  argTypes: {
    title: { control: 'text', description: 'Заголовок туру.' },
    price: {
      control: 'text',
      description: 'Ціна, відформатована для відображення.',
    },
    countryAndCity: {
      control: 'text',
      description: 'Країна та місто через кому.',
    },
    date: { control: 'text', description: 'Відформатований діапазон дат.' },
    availableSpots: {
      control: 'number',
      description: 'Кількість вільних місць.',
    },
  },
  decorators: [
    (Story) => {
      useBookingStore.getState().reset();

      return (
        <StorybookProviderWrapper
          token={null}
          setQueryMocks={(qc) => qc.setQueryData(['user', 'me'], mockUser)}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '419px',
              margin: '0 auto',
            }}
          >
            <Story />
          </Box>
        </StorybookProviderWrapper>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof TourControl>;

export const AvailableTour: Story = {
  name: 'Тур доступний (2 місця)',
  args: baseArgs,
  parameters: {
    docs: {
      description: {
        story:
          'Стандартний стан. Кнопка "Забронювати" активна, бейдж відображає кількість місць.',
      },
    },
  },
};

export const FullyBookedTour: Story = {
  name: 'Тур повністю заброньовано (0 місць)',
  args: {
    ...baseArgs,
    availableSpots: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Критичний стан. Кнопка "Забронювати" має бути деактивована (`disabled`), бейдж має відображати "Всі місця заброньовано".',
      },
    },
  },
};

export const TourWithLongTitle: Story = {
  name: 'Довгий заголовок',
  args: {
    ...baseArgs,
    title:
      'Ексклюзивний тур по старовинних містах східної Європи: Від Києва до Праги та назад',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Перевірка, як верстка обробляє дуже довгий заголовок туру (перевірка переносу рядків у `<h1>`).',
      },
    },
  },
};

export const ManyAvailableSpots: Story = {
  name: 'Дуже багато місць (999)',
  args: {
    ...baseArgs,
    availableSpots: 999,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Перевірка, як верстка обробляє дуже велику кількість вільних місць.',
      },
    },
  },
};
