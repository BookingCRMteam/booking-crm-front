import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { OperatorPhilosophy } from './OperatorPhilosophy';

const TEXT_PLACEHOLDER = 'Не заповнено';

const MOCK_PHILOSOPHY =
  'Я вірю, що подорож — це про емоції та відчуття. Тому створюю маршрути так, щоб вони залишали не тільки спогади про місця, а й тепло в серці — від келиха вина серед тосканських пагорбів до вечері під звуки фаду в Лісабоні.';
const MOCK_DESCRIPTION =
  'Я закохалася в Італію ще десять років тому і з того часу перетворила цю любов на справу свого життя. Мої подорожі — це не «тури», а атмосферні історії, де кожна деталь створює особливий настрій.';

const meta: Meta<typeof OperatorPhilosophy> = {
  title: 'Pages/Operator/OperatorPhilosophy',
  component: OperatorPhilosophy,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Компонент відображає розширену інформацію про туроператора: опис "Про себе" та "Моя філософія". Якщо поля не заповнені, відображається заповнювач ("Не заповнено").',
      },
    },
  },

  argTypes: {
    philosophy: {
      control: 'text',
      description: 'Текст філософії оператора.',
    },
    description: {
      control: 'text',
      description: 'Текст опису оператора ("Про себе").',
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '100%', maxWidth: 686 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof OperatorPhilosophy>;

export const FilledData: Story = {
  name: 'Повністю заповнені дані',
  args: {
    philosophy: MOCK_PHILOSOPHY,
    description: MOCK_DESCRIPTION,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Стандартний стан. Обидва текстові поля заповнені та відображаються коректно.',
      },
    },
  },
};

export const MissingData: Story = {
  name: 'Дані відсутні (Placeholder)',
  args: {
    philosophy: undefined,
    description: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: `Крайній випадок: обидва поля відсутні (null/undefined). Має відображатися заповнювач: "${TEXT_PLACEHOLDER}".`,
      },
    },
  },
};

export const PartiallyFilledPhilosophyOnly: Story = {
  name: 'Частково заповнені (Лише філософія)',
  args: {
    philosophy: MOCK_PHILOSOPHY,
    description: '',
  },
  parameters: {
    docs: {
      description: {
        story: `Поле "Про себе" порожнє (відображається заповнювач), а поле "Моя філософія" заповнене.`,
      },
    },
  },
};

export const PartiallyFilledDescriptionOnly: Story = {
  name: 'Частково заповнені (Лише опис)',
  args: {
    philosophy: '   ',
    description: MOCK_DESCRIPTION,
  },
  parameters: {
    docs: {
      description: {
        story: `Поле "Моя філософія" містить лише пробіли (має відобразити заповнювач після .trim()), а "Про себе" заповнене.`,
      },
    },
  },
};
