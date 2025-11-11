import type { Meta, StoryObj } from '@storybook/nextjs';

import { PriceDisplay } from './PriceDisplay';

const meta: Meta<typeof PriceDisplay> = {
  title: 'Shared/UI/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Компонент для форматованого відображення ціни туру, включаючи символ гривні та примітку "(за двох)".',
      },
    },
  },

  argTypes: {
    price: {
      control: 'text',
      description: 'Відформатований рядок ціни (наприклад, "78 567").',
    },
  },
};
export default meta;

type Story = StoryObj<typeof PriceDisplay>;

export const StandardPrice: Story = {
  name: 'Стандартна ціна',
  args: {
    price: '14 999',
  },
};

export const LargePrice: Story = {
  name: 'Велика ціна',
  args: {
    price: '999 999',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Перевірка, як компонент виглядає з великими значеннями ціни (перевірка на перенос/обрізання).',
      },
    },
  },
};

export const SmallPrice: Story = {
  name: 'Маленька ціна',
  args: {
    price: '500',
  },
};
