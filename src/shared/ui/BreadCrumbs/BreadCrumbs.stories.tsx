import type { Meta, StoryObj } from '@storybook/nextjs';

import { BreadCrumbs } from './BreadCrumbs';

const mockItemsBase = [
  { href: '/', title: 'Головна' },
  { href: '/catalog', title: 'Каталог турів' },
];

const meta: Meta<typeof BreadCrumbs> = {
  title: 'Shared/UI/BreadCrumbs',
  component: BreadCrumbs,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Компонент для відображення навігаційного ланцюжка. Останній елемент завжди неактивний (не посилання) і позначає оточну сторінку, на якій знаходиться користувач.',
      },
    },
  },

  argTypes: {
    items: {
      description: 'Масив об’єктів {title, href}. Довжина має бути не менше 1.',
      control: 'object',
    },
  },
};
export default meta;

type Story = StoryObj<typeof BreadCrumbs>;

export const Default: Story = {
  name: 'З двома елементами (Базовий)',
  args: {
    items: mockItemsBase,
  },
};

export const BreadCrumbsWith3Crumbs: Story = {
  name: 'З трьома елементами (Активний маршрут)',
  args: {
    items: [...mockItemsBase, { href: '/tour', title: 'Романтична Флоренція' }],
  },
};

export const SingleCrumb: Story = {
  name: 'Один елемент (Лише поточна сторінка)',
  args: {
    items: [{ href: '/profile', title: 'Мій Профіль' }],
  },
};

export const WithLongTitles: Story = {
  name: 'Довгі назви',
  args: {
    items: [
      { href: '/', title: 'Дуже довга назва початкової сторінки' },
      { href: '/tour', title: 'Тур по старовинних містах східної Європи' },
    ],
  },
};
