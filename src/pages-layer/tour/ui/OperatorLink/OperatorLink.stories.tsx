import type { Meta, StoryObj } from '@storybook/nextjs';

import { OperatorLink, OperatorLinkProps } from './OperatorLink';

const operatorMock: OperatorLinkProps = {
  id: 1,
  name: 'Олена Петренко',
  photo: '/images/tourCard/operator.png',
};

const meta: Meta<typeof OperatorLink> = {
  title: 'Pages/TourPage/OperatorLink',
  component: OperatorLink,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          "Посилання на сторінку туроператора. Відображає ім'я, прізвище та аватар. Використовує заглушку, якщо фото відсутнє.",
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
        'URL-адреса фото туроператора. Якщо null, відображається дефолтна заглушка `/images/tourCard/operator.png`.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof OperatorLink>;

export const WithPhoto: Story = {
  name: 'З фотографією',
  args: operatorMock,
  parameters: {
    docs: {
      description: {
        story: 'Стандартний вигляд посилання, коли фото туроператора доступне.',
      },
    },
  },
};

export const WithoutPhoto: Story = {
  name: 'Без фото (Заглушка)',
  args: {
    ...operatorMock,
    photo: null,
    name: 'Іван Коваль',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Перевірка стану, коли поле `photo` дорівнює null. Компонент має відображати заглушку.',
      },
    },
  },
};

export const LongName: Story = {
  name: "Довге ім'я",
  args: {
    ...operatorMock,
    name: 'Степан Володимирович Довгошиєнко-Затурканський',
    photo: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Тестування поведінки при відображенні дуже довгого імені (перевірка обрізання/перенесення).',
      },
    },
  },
};
