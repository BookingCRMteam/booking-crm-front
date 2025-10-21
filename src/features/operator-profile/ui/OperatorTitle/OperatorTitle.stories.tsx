import type { Meta, StoryObj } from '@storybook/nextjs';

import type { OperatorStatus } from '@/entities/operator';

import { mockOperator } from '@/jest/fixtures/operatorMocks';

import { OperatorTitle } from './OperatorTitle';

const BASE_MOCK_PROPS = {
  firstName: mockOperator.firstName,
  lastName: mockOperator.lastName,
  email: mockOperator.email,
  phone: mockOperator.phone,
  website: mockOperator.website,
  status: mockOperator.status as OperatorStatus,
  isEdit: false,
};

const meta: Meta<typeof OperatorTitle> = {
  title: 'Pages/Operator/OperatorTitle',
  component: OperatorTitle,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Відображає основну інформацію про туроператора (ім’я, контакти та статус). Компонент має два режими відображення: стандартний та "Edit", який змінює стилі шрифту.',
      },
    },
  },

  argTypes: {
    firstName: { control: 'text', description: "Ім'я оператора." },
    lastName: { control: 'text', description: 'Прізвище оператора.' },
    email: { control: 'text', description: 'Електронна пошта.' },
    phone: { control: 'text', description: 'Контактний номер телефону.' },
    website: {
      control: 'text',
      description: 'Вебсайт або посилання на профіль.',
    },
    status: {
      control: 'select',
      options: ['approved', 'pending', 'rejected'],
      description: 'Статус верифікації оператора.',
    },
    isEdit: {
      control: 'boolean',
      description: 'Вмикає режим редагування, що може змінити колір тексту.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof OperatorTitle>;

export const ViewModeApproved: Story = {
  name: 'Режим перегляду (Approved)',
  args: {
    ...BASE_MOCK_PROPS,
    status: 'approved',
    isEdit: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Стандартний стан відображення даних. Статус оператора "Approved".',
      },
    },
  },
};

export const ViewModePending: Story = {
  name: 'Режим перегляду (Pending)',
  args: {
    ...BASE_MOCK_PROPS,
    status: 'pending',
    firstName: 'Iryna',
    lastName: 'Kovalchuk',
    isEdit: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Стан, коли оператор перебуває на верифікації. Перевірка коректного відображення статусу.',
      },
    },
  },
};
export const ViewModeRejected: Story = {
  name: 'Режим перегляду (Rejected)',
  args: {
    ...BASE_MOCK_PROPS,
    status: 'rejected',
    firstName: 'Iryna',
    lastName: 'Kovalchuk',
    isEdit: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Стан, коли оператору відмовлено у верифікації. Перевірка коректного відображення статусу.',
      },
    },
  },
};

export const EditMode: Story = {
  name: 'Режим редагування (Edit Mode)',
  args: {
    ...BASE_MOCK_PROPS,
    status: 'approved',
    isEdit: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Відображення компонента у режимі редагування. Очікується зміна кольору тексту, що відповідає стилям редагування в загальній темі профілю.',
      },
    },
  },
};

export const MissingWebsite: Story = {
  name: 'Відсутній Вебсайт',
  args: {
    ...BASE_MOCK_PROPS,
    website: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Крайній випадок: вебсайт відсутній або переданий як порожній рядок. Поле має бути приховане або відображати порожнє значення (залежно від внутрішньої логіки).',
      },
    },
  },
};
