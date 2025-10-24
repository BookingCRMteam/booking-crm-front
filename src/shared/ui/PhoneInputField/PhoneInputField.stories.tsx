import { Box } from '@mui/material';
import { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';

import { PhoneInputField } from './PhoneInputField';

type FormValues = {
  phone: string;
};

const meta: Meta<typeof PhoneInputField> = {
  title: 'UI/PhoneInputField',
  component: PhoneInputField,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Інпут для введення телефонного номеру в міжнародному форматі користувачем.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PhoneInputField>;

const Template = ({ defaultValue }: { defaultValue?: string }) => {
  const { control } = useForm<FormValues>({
    defaultValues: { phone: defaultValue ?? '' },
  });

  return (
    <Box sx={{ width: 400 }}>
      <PhoneInputField<FormValues> name="phone" control={control} />
    </Box>
  );
};

export const EmptyInput: Story = {
  render: () => <Template defaultValue="" />,
};

export const FilledInput: Story = {
  render: () => <Template defaultValue="+380501234567" />,
};
