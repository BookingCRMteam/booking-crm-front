import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import type { TourPhoto } from '@/entities/tour/model/types';

import { TourGallery } from './TourGallery';

const BASE_MOCK_PHOTOS: TourPhoto[] = [
  {
    id: 1,
    url: '/images/tourCard/tour.png',
    description: 'Вид на Говерлу',
    tourId: 0,
    isMain: false,
  },
  {
    id: 2,
    url: '/images/tourCard/tour.png',
    description: 'Сучасний готель у Буковелі',
    tourId: 0,
    isMain: false,
  },
  {
    id: 3,
    url: '/images/tourCard/tour.png',
    description: 'Озеро Синевир в тумані',
    tourId: 0,
    isMain: false,
  },
  {
    id: 4,
    url: '/images/tourCard/tour.png',
    description: 'Водоспад у Яремче',
    tourId: 0,
    isMain: false,
  },
  {
    id: 5,
    url: '/images/tourCard/tour.png',
    description: 'Парк у Трускавці',
    tourId: 0,
    isMain: false,
  },
];

const meta: Meta<typeof TourGallery> = {
  title: 'Pages/TourPage/TourGallery',
  component: TourGallery,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Головний компонент галереї, що відображає основне зображення та вертикальний набір прев’ю (мініатюр). Використовує Embla Carousel для синхронізації скролу.',
      },
    },
  },

  argTypes: {
    photos: {
      control: 'object',
      description: 'Масив об’єктів `TourPhoto` для відображення у слайдері.',
    },
  },

  decorators: [
    (Story) => {
      return (
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            height: '500px',
            margin: '0 auto',
            padding: '24px',
            border: '1px solid #e0e0e0',
          }}
        >
          <Story />
        </Box>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof TourGallery>;

export const DefaultCarousel: Story = {
  name: 'Стандартна галерея (5 фото)',
  args: {
    photos: BASE_MOCK_PHOTOS,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Стандартний стан. Карусель активна, відображаються кнопки навігації. Перевірка синхронізації Main та Thumbs.',
      },
    },
  },
};

export const ManyPhotosForScroll: Story = {
  name: 'Багато фото (вертикальний скрол прев’ю)',
  args: {
    photos: [
      ...BASE_MOCK_PHOTOS,
      {
        id: 6,
        url: '/images/tourCard/tour.png',
        description: 'Поле з вівцями',
        tourId: 0,
        isMain: false,
      },
      {
        id: 7,
        url: '/images/tourCard/tour.png',
        description: 'Гірський потік',
        tourId: 0,
        isMain: false,
      },
      {
        id: 8,
        url: '/images/tourCard/tour.png',
        description: 'Зимовий пейзаж',
        tourId: 0,
        isMain: false,
      },
      {
        id: 9,
        url: '/images/tourCard/tour.png',
        description: 'Колиба',
        tourId: 0,
        isMain: false,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Перевірка верстки при великій кількості фото. Має бути забезпечена можливість вертикальної прокрутки прев’ю-зображень.',
      },
    },
  },
};

export const SinglePhotoNotActive: Story = {
  name: 'Одне фото (Карусель неактивна)',
  args: {
    photos: [BASE_MOCK_PHOTOS[0]],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Крайній випадок, коли передано лише одне фото. Кнопки навігації мають бути приховані, а Embla не повинен ініціалізувати скрол-логіку.',
      },
    },
  },
};
