import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DropdownField } from './DropdownField';

type Country = { id: number; name: string };

const countries: Country[] = [
  { id: 1, name: 'Японія' },
  { id: 2, name: 'Італія' },
  { id: 3, name: 'Іспанія' },
  { id: 4, name: 'Чехія' },
];

const meta: Meta<typeof DropdownField<Country>> = {
  title: 'Shared/UI/DropdownField',
  component: DropdownField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Універсальний дропдаун із можливістю вибору та пошуком.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Текст заголовка поля.' },
    placeholder: { control: 'text', description: 'Плейсхолдер поля.' },
    items: { control: 'object', description: 'Масив елементів дропдауна.' },
    disabled: { control: 'boolean', description: 'Чи можна вибрати значення.' },
    isLoading: { control: 'boolean', description: 'Стан завантаження списку.' },

    value: { control: false },
    onChange: { control: false },
    onBlur: { control: false },
    getItemLabel: { control: false },
    getItemId: { control: false },
    renderItem: { control: false },
    inputAdornment: { control: false },
    error: { control: false },
    helperText: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownField<Country>>;

export const Default: Story = {
  name: 'Базовий дропдаун',
  render: (args) => {
    const [value, setValue] = useState<Country | null>(null);
    return (
      <DropdownField
        {...args}
        value={value}
        onChange={setValue}
        getItemLabel={(item) => item.name}
        getItemId={(item) => item.name}
      />
    );
  },
  args: {
    label: 'Країна',
    placeholder: 'Пошук...',
    items: countries,
  },
};

export const WithValue: Story = {
  name: 'З вибраним значенням',
  render: (args) => {
    const [value, setValue] = useState<Country | null>(countries[1]);
    return (
      <DropdownField
        {...args}
        value={value}
        onChange={setValue}
        getItemLabel={(item) => item.name}
        getItemId={(item) => item.name}
      />
    );
  },
  args: {
    label: 'Країна',
    items: countries,
  },
};

export const Disabled: Story = {
  name: 'Неактивний стан',
  render: (args) => {
    const [value, setValue] = useState<Country | null>(countries[1]);
    return (
      <DropdownField
        {...args}
        value={value}
        onChange={setValue}
        getItemLabel={(item) => item.name}
        getItemId={(item) => item.name}
      />
    );
  },
  args: {
    label: 'Країна',
    items: countries,
    disabled: true,
  },
};
