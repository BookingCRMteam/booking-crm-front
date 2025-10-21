import Image from 'next/image';

import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { mockOperator } from '@/jest/fixtures/operatorMocks';

import { OperatorPhilosophy } from '../OperatorPhilosophy/OperatorPhilosophy';
import { OperatorProfileHeader } from '../OperatorProfileHeader/OperatorProfileHeader';
import { OperatorTitle } from '../OperatorTitle/OperatorTitle';
import { OperatorProfileInfo } from './OperatorProfileInfo';

const MOCK_PHOTO_URL = '/images/public_operator.jpg';
const MOCK_PHOTO_URL_EMPTY = '/images/operator_placeholder.png';
const MOCK_PHILOSOPHY =
  'Я вірю, що подорож — це про емоції та відчуття. Тому створюю маршрути так, щоб вони залишали не тільки спогади про місця, а й тепло в серці — від келиха вина серед тосканських пагорбів до вечері під звуки фаду в Лісабоні.';
const MOCK_DESCRIPTION =
  'Я закохалася в Італію ще десять років тому і з того часу перетворила цю любов на справу свого життя. Мої подорожі — це не «тури», а атмосферні історії, де кожна деталь створює особливий настрій.';

const meta: Meta<typeof OperatorProfileInfo> = {
  title: 'Pages/Operator/OperatorProfileInfo',
  component: OperatorProfileInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Контейнер, що відображає всю інформацію про оператора у режимі перегляду. Включає хедер, титульну інформацію, філософію та кнопку "Редагувати", яка викликає функцію `onEdit`.',
      },
    },
  },

  argTypes: {
    onEdit: {
      action: 'onEditClicked',
      description:
        'Колбек, який викликається при натисканні на кнопку "Редагувати".',
    },
    children: {
      control: undefined,
      description: 'Дочірні елементи (Header, Philosophy, Description).',
    },
  },

  args: {
    onEdit: () => console.log('Edit button clicked'),
  },

  decorators: [
    (Story) => (
      <Box sx={{ width: 684 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof OperatorProfileInfo>;

export const DefaultViewMode: Story = {
  name: 'Стандартний режим перегляду',
  render: (args) => (
    <OperatorProfileInfo {...args}>
      <OperatorProfileHeader>
        <Image
          src={MOCK_PHOTO_URL}
          alt={`${mockOperator.firstName} ${mockOperator.lastName}`}
          width={180}
          height={180}
        />
        <OperatorTitle {...mockOperator} />
      </OperatorProfileHeader>
      <OperatorPhilosophy
        description={MOCK_DESCRIPTION}
        philosophy={MOCK_PHILOSOPHY}
      />
    </OperatorProfileInfo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Стандартне відображення профілю оператора з усіма заповненими даними. Перевіряє коректне позиціонування дочірніх компонентів та наявність кнопки "Редагувати".',
      },
    },
  },
};

export const MissingOptionalData: Story = {
  name: 'Відсутні опціональні дані',
  render: (args) => (
    <OperatorProfileInfo {...args}>
      <OperatorProfileHeader>
        <Image
          src={MOCK_PHOTO_URL_EMPTY}
          alt={`${mockOperator.firstName} ${mockOperator.lastName}`}
          width={180}
          height={180}
        />
        <OperatorTitle {...mockOperator} />
      </OperatorProfileHeader>
      <OperatorPhilosophy description="" philosophy="" />
    </OperatorProfileInfo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Перевірка верстки при відсутності опціональних полів (website, phone, description, philosophy). Усі дочірні компоненти мають коректно відображати плейсхолдери або приховувати елементи.',
      },
    },
  },
};
