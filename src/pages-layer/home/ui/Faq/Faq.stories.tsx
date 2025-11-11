import type { Meta, StoryObj } from '@storybook/nextjs';

import { Faq } from './Faq';

const meta: Meta<typeof Faq> = {
  title: 'Pages/Home/Faq',
  component: Faq,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          Секція "FAQ" — блок із відповідями на поширені запитання користувачів.

          Містить:
          1. Заголовок (\`AccentHeading\`) із коротким описом у компоненті \`SectionTitle\`.
          2. Список акордеонів (\`FaqAccordionList\`), де кожен елемент відкриває розгорнуту відповідь.

          Особливості:
          • Розміщується як окремий розділ сторінки з білим фоном.
          • Підтримує інтерактивне розгортання/згортання запитань.
          • Використовує локальний стан для контролю відкритих елементів.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Faq>;

export const Default: Story = {};
