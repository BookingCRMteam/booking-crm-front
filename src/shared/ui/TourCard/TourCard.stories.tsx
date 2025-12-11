import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import operatorPhoto from '../../../../public/images/tourCard/operator.png';
import tourPhoto from '../../../../public/images/tourCard/tour.png';
import { mockCardProps } from '../../tests/mocks/data';
import { TourCard } from './TourCard';

const meta: Meta<typeof TourCard> = {
  title: 'Shared/UI/TourCard/TourCard',
  component: TourCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TourCard>;

const BASE_PROPS = {
  ...mockCardProps,
  photos: [{ ...mockCardProps.photos[0], url: tourPhoto.src }],
  operator: { ...mockCardProps.operator, photo: operatorPhoto.src },
};

export const StandardState: Story = {
  args: {
    ...BASE_PROPS,
  },
};

export const SpotsAvailable_LowCount: Story = {
  args: {
    ...BASE_PROPS,
    availableSpots: 2,
    title: '2 вільних місця',
  },
};

export const SpotsAvailable_None: Story = {
  args: {
    ...BASE_PROPS,
    availableSpots: 0,
    title: 'Тур без місць',
  },
};

export const Title_Overflow: Story = {
  args: {
    ...BASE_PROPS,
    title: 'Романтична Флоренція + Ранок у Тоскані',
  },
};

export const Operator_Name_Overflow: Story = {
  args: {
    ...BASE_PROPS,
    operator: {
      ...BASE_PROPS.operator,
      name: 'Костянтин Войцехович',
    },
  },
};

export const Country_LongName: Story = {
  args: {
    ...BASE_PROPS,
    countryName: 'Велика Британія',
    title: 'Тур у країну з довгою назвою',
  },
};

export const AllContent_Overflow: Story = {
  args: {
    ...BASE_PROPS,
    title: 'Романтична Флоренція + Ранок у Тоскані',
    operator: {
      ...BASE_PROPS.operator,
      name: 'Костянтин Войцехович',
    },
    countryName: 'Велика Британія',
  },
};
