import type { Meta, StoryObj } from '@storybook/nextjs';

import { Footer } from '../Footer';

const meta: Meta<typeof Footer> = {
  title: 'Widgets/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
    Основний компонент футера (Footer).
    Відображається на всіх сторінках застосунку та має статичну структуру.
    
    Складається з трьох ключових, адаптивних колонок:

    1.  Брендинг та Контакти: Містить логотип (посилання на головну сторінку) та контактну електронну адресу для запитань.
    2.  Навігація: Містить основні навігаційні посилання по сайту (Каталог, Про нас, FAQ тощо) та службові посилання (Політика, Умови).
    3.  Заклик до Дії (CTA): Містить інформаційний блок для організаторів подорожей та кнопку-заклик "Стати партнером".
  `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};
