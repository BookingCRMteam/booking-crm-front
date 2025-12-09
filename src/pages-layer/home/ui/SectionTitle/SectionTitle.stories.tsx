import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AccentHeading } from '../AccentHeading/AccentHeading';
import { SectionTitle } from './SectionTitle';

const meta: Meta<typeof SectionTitle> = {
  title: 'Shared/UI/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
Компонент **SectionTitle** використовується для відображення заголовка секції з коротким описом.

### Призначення:
- Формує єдину структуру для розміщення заголовку та опису.
- Застосовується в секціях із текстовими блоками (FAQ, Hero, Highlights тощо).

### Властивості:
| Назва | Тип | Опис |
|--------|------|------|
| **children** | \`ReactNode\` | Дочірній елемент (зазвичай компонент \`AccentHeading\`). |
| **description** | \`string\` | Короткий текстовий опис, що пояснює зміст секції. |
        `,
      },
    },
  },

  argTypes: {
    description: {
      control: 'text',
      description:
        'Короткий текстовий опис секції. Відображається праворуч або під заголовком.',
      defaultValue:
        'Це короткий опис секції, який пояснює її зміст і контекст.',
    },
    children: {
      control: false,
      description:
        'Дочірній елемент. Найчастіше використовується компонент AccentHeading.',
    },
  },

  decorators: [
    (Story) => (
      <Box sx={{ padding: '40px', bgcolor: '#f9f9f9' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
  name: 'Default (Короткий опис)',
  args: {
    description: 'Це короткий опис секції, який пояснює її зміст.',
  },
  render: (args) => (
    <SectionTitle {...args}>
      <AccentHeading
        variant="h3"
        parts={[
          { id: 1, text: 'Приклади ' },
          { id: 2, text: 'використання', accent: true },
        ]}
      />
    </SectionTitle>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Базовий приклад компонента із коротким описом. Застосовується для стандартних секцій сторінки.',
      },
    },
  },
};

export const LongDescription: Story = {
  name: 'LongDescription (Довший опис)',
  args: {
    description:
      'Довший опис, який розповідає більше деталей про контент секції. Його можна використовувати для сторінок із текстовими поясненнями, щоб краще передати зміст розділу.',
  },
  render: (args) => (
    <SectionTitle {...args}>
      <AccentHeading
        variant="h3"
        parts={[
          { id: 1, text: 'Розширений ' },
          { id: 2, text: 'заголовок', accent: true },
        ]}
      />
    </SectionTitle>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Варіант із довшим текстом, який зручний для більш детальних описів у секціях контенту.',
      },
    },
  },
};
