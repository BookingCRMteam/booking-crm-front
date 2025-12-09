import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UserInfo } from './UserInfo';

const meta: Meta<typeof UserInfo> = {
  title: 'Pages/CoupleProfile/UserInfo',
  component: UserInfo,
  tags: ['autodocs'],
  args: {
    firstPersonName: 'Іван',
    firstPersonSurname: 'Коваленко',
    secondPersonName: 'Марія',
    secondPersonSurname: 'Петренко',
    phone: '+380501234567',
  },
};

export default meta;
type Story = StoryObj<typeof UserInfo>;

export const Default: Story = {
  args: {},
};

export const SinglePerson: Story = {
  args: {
    firstPersonName: 'Олександр',
    firstPersonSurname: 'Кулик',
    secondPersonName: '',
    secondPersonSurname: '',
    phone: '+380 93 765 43 21',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Перевірка відображення, коли дані другого партнера порожні. Компонент повинен коректно відображати " та ".',
      },
    },
  },
};
