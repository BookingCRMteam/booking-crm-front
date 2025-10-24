import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { OperatorLink, OperatorLinkProps } from './OperatorLink';

const BASE_MOCK: OperatorLinkProps = {
  id: 1,
  name: 'Олена Петренко',
  photo: '/images/tourCard/operator.png',
  variant: 'page',
};

const meta: Meta<typeof OperatorLink> = {
  title: 'Shared/UI/OperatorLink',
  component: OperatorLink,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Посилання на сторінку туроператора. Відображає ім’я та аватар. Має два режими: `card` (для темного фону, менший розмір) та `page` (для світлого фону, більший розмір).',
      },
    },
  },

  argTypes: {
    id: {
      control: 'number',
      description:
        'ID туроператора для формування посилання `/catalog/operator/[id]`.',
    },
    name: { control: 'text', description: "Ім'я та прізвище туроператора." },
    photo: {
      control: 'text',
      description:
        'URL-адреса фото туроператора. Якщо null, відображається дефолтна заглушка.',
    },
    variant: {
      control: 'select',
      options: ['card', 'page'],
      description:
        'Визначає візуальний стиль та розмір компонента (для картки чи сторінки).',
      defaultValue: 'page',
    },
  },

  args: BASE_MOCK,

  decorators: [
    (Story) => (
      <Box sx={{ padding: '20px', maxWidth: 400 }}>
        <Story />
      </Box>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof OperatorLink>;

export const PageVariantDefault: Story = {
  name: 'Page Variant (Стандартний)',
  args: {
    ...BASE_MOCK,
    variant: 'page',
    photo: BASE_MOCK.photo,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Стандартний вигляд для використання на сторінках (світлий фон). Зверніть увагу на розмір аватара (36px).',
      },
    },
  },
};

export const PageVariantNoPhoto: Story = {
  name: 'Page Variant (Без фото)',
  args: {
    ...BASE_MOCK,
    variant: 'page',
    photo: null,
    name: 'Іван Коваль',
  },
  parameters: {
    docs: {
      description: {
        story: 'Page Variant без фото. Відображається дефолтна заглушка.',
      },
    },
  },
};

export const CardVariantDefault: Story = {
  name: 'Card Variant (Стандартний, темний фон)',
  args: {
    ...BASE_MOCK,
    variant: 'card',
    name: 'Сергій Олійник',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Варіант для використання на картках (темний фон, білий текст). Зверніть увагу на розмір аватара (32px).',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ padding: '20px', maxWidth: 400, bgcolor: '#000' }}>
        <Story />
      </Box>
    ),
  ],
};

export const CardVariantLongName: Story = {
  name: "Card Variant (Довге ім'я)",
  args: {
    ...BASE_MOCK,
    variant: 'card',
    photo: null,
    name: 'Степан Володимирович',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Тестування Card Variant з дуже довгим ім’ям. Перевірка коректного перенесення та обрізання тексту в обмеженому просторі.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ padding: '20px', maxWidth: 400, bgcolor: '#000' }}>
        <Story />
      </Box>
    ),
  ],
};
