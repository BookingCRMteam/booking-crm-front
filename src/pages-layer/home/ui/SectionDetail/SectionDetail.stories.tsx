import type { Meta, StoryObj } from '@storybook/nextjs';

import { SectionDetail } from './SectionDetail';

const meta: Meta<typeof SectionDetail> = {
  title: 'Pages/Home/SectionDetail',
  component: SectionDetail,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
          Секція "Переваги та Деталі.
          Цей компонент призначений для демонстрації ключових переваг або особливостей сервісу.
          
          Структура:
          1.  Заголовок: Компонент \`SectionTitle\` з акцентованим заголовком.
          2.  Картки переваг: Три картки (\`DetailCard\`) з іконками та описом, розміщені в адаптивній сітці (3 колонки на десктопі).
          3.  Кнопка CTA: Велика кнопка "До каталогу", що закликає до дії, веде на сторінку каталогу.          
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SectionDetail>;

export const Default: Story = {
  args: {},
};
