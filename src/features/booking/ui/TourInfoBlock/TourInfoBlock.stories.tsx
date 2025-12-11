import { useEffect } from 'react';

import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TourBookingInfo } from '@/entities/tour/model/types';

import { useBookingStore } from '@/shared/store';
import { mockTourBookingInfo } from '@/shared/tests';

import { TourInfoBlock } from './TourInfoBlock';

const meta: Meta<typeof TourInfoBlock> = {
  title: 'Features/Booking/TourInfoBlock',
  component: TourInfoBlock,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: 'Дані туру, які бачить користувач при бронюванні.',
      },
    },
  },

  argTypes: {
    title: { control: 'text', description: 'Заголовок туру.' },
    countryAndCity: {
      control: 'text',
      description: 'Місто та країна через кому.',
    },
    date: {
      control: 'text',
      description: 'Відформатований рядок з датою туру.',
    },
    price: {
      control: 'text',
      description: 'Ціна, відформатована для відображення.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TourInfoBlock>;

export const DefaultView: Story = {
  args: {
    title: mockTourBookingInfo.title,
    price: mockTourBookingInfo.price,
    countryAndCity: mockTourBookingInfo.countryAndCity,
    date: mockTourBookingInfo.date,
  },
  render: (args) => {
    const { openBookingModal } = useBookingStore();

    const typedArgs = args as TourBookingInfo;

    useEffect(() => {
      openBookingModal({
        tourId: mockTourBookingInfo.tourId,
        title: typedArgs.title,
        price: typedArgs.price,
        countryAndCity: typedArgs.countryAndCity,
        date: typedArgs.date,
      });
    }, [
      openBookingModal,
      typedArgs.title,
      typedArgs.price,
      typedArgs.countryAndCity,
      typedArgs.date,
    ]);

    return (
      <Box sx={{ maxWidth: 400 }}>
        <TourInfoBlock />
      </Box>
    );
  },
};
