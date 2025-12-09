import { useEffect } from 'react';

import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TourBookingInfo } from '@/entities/tour/model/types';

import { useBookingStore } from '@/shared/store';

import { TourInfoBlock } from './TourInfoBlock';

const mockTourData = {
  tourId: 10,
  title: 'Романтична Флоренція',
  price: '78 567',
  countryAndCity: 'Флоренція, Італія',
  date: '01.10.25 — 07.10.25',
};

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
    title: mockTourData.title,
    price: mockTourData.price,
    countryAndCity: mockTourData.countryAndCity,
    date: mockTourData.date,
  },
  render: (args) => {
    const { openBookingModal } = useBookingStore();

    const typedArgs = args as TourBookingInfo;

    useEffect(() => {
      openBookingModal({
        tourId: mockTourData.tourId,
        title: typedArgs.title,
        price: typedArgs.price,
        countryAndCity: typedArgs.countryAndCity,
        date: typedArgs.date,
      });
    }, [openBookingModal]);

    return (
      <Box sx={{ maxWidth: 400 }}>
        <TourInfoBlock />
      </Box>
    );
  },
};
