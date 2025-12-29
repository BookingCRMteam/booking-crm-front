import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import 'dayjs/locale/uk';

import { mockTour } from '@/shared/tests';
import { StorybookProviderWrapper } from '@/shared/tests/StorybookProviderWrapper';

import { TourForm } from './TourForm';

const meta: Meta<typeof TourForm> = {
  title: 'Features/Tour/TourForm',
  component: TourForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Форма створення та редагування туру.

Компонент використовується оператором для:
- створення нового туру
- редагування вже існуючого туру

Форма побудована на **React Hook Form + Zod**, підтримує валідацію,
роботу з датами, фотографіями, країнами та містами.

У режимі редагування частина полів може бути заблокована,
якщо тур вже має бронювання.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <StorybookProviderWrapper token={null}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
          <Story />
        </LocalizationProvider>
      </StorybookProviderWrapper>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TourForm>;

export const CreateTour: Story = {
  args: {
    operatorId: 18,
  },
  parameters: {
    docs: {
      description: {
        story: `
Форма створення туру.

У цьому режимі:
- усі поля обов'язкові для заповнення, є відповідні підказки
- міста підвантажуються відповідно до країни, без обраної країни поле вибору міста не доступне
- не можна створити тур минулою датою
        `,
      },
    },
  },
};

export const EditTour: Story = {
  args: {
    operatorId: 18,
    tourId: 74,
  },
  parameters: {
    docs: {
      description: {
        story: `
Форма редагування туру.

У цьому режимі:
- при відсутності наявних бронювань всі поля доступні для редагування
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <StorybookProviderWrapper
        token={null}
        setQueryMocks={(client) => {
          client.setQueryData(['tour', 74], mockTour);
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
          <Story />
        </LocalizationProvider>
      </StorybookProviderWrapper>
    ),
  ],
};

export const BookedEditTourForm: Story = {
  args: {
    operatorId: 18,
    tourId: 74,
  },
  parameters: {
    docs: {
      description: {
        story: `
Форма редагування туру з наявними бронюваннями.

У цьому режимі:
- деякі поля (назва туру, дати, країна, місто) заблоковані
- доступне лише редагування дозволених полів (опис, ціна, кількість місць, фотографії)
- кількість місць доступна для редагування лише у сторону збільшення

Показує як форма виглядає та реагує на вже існуючі бронювання.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <StorybookProviderWrapper
        token={null}
        setQueryMocks={(client) => {
          client.setQueryData(['tour', 74], {
            ...mockTour,
            bookedSpots: 2,
          });
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
          <Story />
        </LocalizationProvider>
      </StorybookProviderWrapper>
    ),
  ],
};
