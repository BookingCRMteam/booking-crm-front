import type { Meta, StoryObj } from '@storybook/nextjs';

import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Pages/Home/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
      Секція "Hero" — головний банер сторінки з ключовим повідомленням бренду.

      Містить:
      1. Заголовок (\`AccentHeading\`) з акцентним словом.
      2. Короткий опис пропозиції.
      3. Кнопку переходу до каталогу турів.
      4. Блок переваг (\`AdvantagesItem\`), що підкреслюють надійність сервісу.

      Особливості:
      • Повноекранне тло з адаптивною версткою.
      • Легка візуальна структура, фокус на CTA.
    `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {};
