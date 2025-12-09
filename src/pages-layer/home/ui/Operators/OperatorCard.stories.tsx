import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { OperatorCard } from './OperatorCard';

const meta: Meta<typeof OperatorCard> = {
  title: 'Shared/Ui/OperatorCard',
  component: OperatorCard,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
Компонент **OperatorCard** відображає коротку інформацію про туроператора:
фото, ім’я, статус, опис та кількість актуальних турів.  
Має кнопку для переходу на сторінку оператора.

**Призначення:**
— Використовується в секції "Популярні оператори".  
— Показує людину, яка створює подорожі (гіда / організатора).

**Властивості:**
• \`photo\` — URL зображення оператора (якщо null — показує заглушку).  
• \`firstName\`, \`lastName\` — ім’я та прізвище оператора.  
• \`status\` — статус із системи (\`approved\`, \`rejected\`, \`pending\`, тощо).  
• \`description\` — короткий текст про оператора.  
• \`toursCount\` — кількість актуальних подорожей.  
• \`id\` — ідентифікатор оператора для формування посилання.  
        `,
      },
    },
  },

  argTypes: {
    photo: {
      control: 'text',
      description: 'URL фото оператора або null (показує заглушку).',
    },
    firstName: {
      control: 'text',
      description: "Ім'я оператора.",
    },
    lastName: {
      control: 'text',
      description: 'Прізвище оператора.',
    },
    status: {
      control: 'select',
      options: ['approved', 'rejected', 'pending'],
      description: 'Поточний статус оператора.',
    },
    description: {
      control: 'text',
      description: 'Короткий опис (3 рядки максимум).',
    },
    toursCount: {
      control: 'number',
      description: 'Кількість доступних турів.',
    },
    id: {
      control: 'number',
      description:
        'Ідентифікатор оператора (використовується для формування лінку).',
    },
  },

  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 360, padding: 2, bgcolor: '#fff' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof OperatorCard>;

export const Default: Story = {
  args: {
    id: 1,
    firstName: 'Іван',
    lastName: 'Петренко',
    photo: '/images/public_operator.jpg',
    status: 'approved',
    description: 'Досвідчений гід, який створює подорожі з душею.',
    toursCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовий приклад компонента з усіма заповненими полями.',
      },
    },
  },
};

export const NoPhoto: Story = {
  args: {
    ...Default.args,
    photo: null,
    firstName: 'Олена',
    lastName: 'Коваль',
  },
  parameters: {
    docs: {
      description: {
        story: 'Варіант без фото. Відображається дефолтна заглушка.',
      },
    },
  },
};

export const LongDescription: Story = {
  args: {
    ...Default.args,
    description:
      'Цей оператор відомий своєю увагою до деталей і створює унікальні маршрути, які дозволяють побачити країну з абсолютно нового ракурсу. Його подорожі завжди наповнені емоціями.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Перевірка обрізання довгого тексту та збереження візуальної структури картки.',
      },
    },
  },
};
