import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AccentHeading } from './AccentHeading';

const meta: Meta<typeof AccentHeading> = {
  title: 'Shared/UI/AccentHeading',
  component: AccentHeading,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: `
Компонент **AccentHeading** використовується для побудови заголовків із можливістю акцентування окремих слів кольором.

### Призначення:
- Формує динамічні заголовки із частинами різного стилю.
- Підтримує два варіанти: \`h1\` та \`h3\`.

### Властивості:
| Назва | Тип | Опис |
|--------|------|------|
| **variant** | \`'h1' | 'h3'\` | Розмір і стиль заголовку. |
| **parts** | \`{ id: number; text: string; accent?: boolean }[]\` | Масив частин тексту, де \`accent\` визначає кольоровий акцент. |
| **maxWidth** | \`string\` | Максимальна ширина текстового блоку. За замовчуванням \`330px\`. |
        `,
      },
    },
  },

  argTypes: {
    variant: {
      control: 'radio',
      options: ['h1', 'h3'],
      description: 'Розмір і стиль заголовку.',
    },
    parts: {
      control: 'object',
      description:
        'Масив частин тексту, де властивість accent визначає кольорове виділення.',
    },
    maxWidth: {
      control: 'text',
      description: 'Максимальна ширина текстового контейнера.',
      defaultValue: '330px',
    },
  },

  decorators: [
    (Story) => (
      <Box sx={{ padding: '40px', bgcolor: '#f5f5f5' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AccentHeading>;

export const Default: Story = {
  name: 'Default (Великий заголовок)',
  args: {
    variant: 'h1',
    parts: [
      { id: 1, text: 'Подорожі, створені для ' },
      { id: 2, text: 'вашої історії ', accent: true },
      { id: 3, text: 'кохання' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Великий заголовок (h1) із виділеним кольором акцентом. Застосовується у головних секціях сторінок.',
      },
    },
  },
};

export const SmallerHeading: Story = {
  name: 'SmallerHeading (Менший заголовок)',
  args: {
    variant: 'h3',
    parts: [
      { id: 1, text: 'Ваш ' },
      { id: 2, text: 'спокій ', accent: true },
      { id: 3, text: '— наш пріоритет' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Менший варіант заголовку (h3), який часто використовується у внутрішніх секціях, наприклад у FAQ або картках.',
      },
    },
  },
};
