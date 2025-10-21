import { createRef } from 'react';

import '@testing-library/jest-dom';

import { TourPhoto } from '@/entities/tour/model/types';

import { renderWithTheme } from '@/shared/tests';

import { TourGallery } from './TourGallery';

const mockScrollPrev = jest.fn();
const mockScrollNext = jest.fn();
const mockOnThumbClick = jest.fn();
const mockUseTourGallery = jest.fn();

jest.mock('./useTourGallery', () => ({
  useTourGallery: () => mockUseTourGallery(),
}));

const MOCK_PHOTOS: TourPhoto[] = [
  { id: 1, url: '/img1.jpg', description: 'Photo 1', isMain: true, tourId: 1 },
  { id: 2, url: '/img2.jpg', description: 'Photo 2', isMain: false, tourId: 1 },
  { id: 3, url: '/img3.jpg', description: 'Photo 3', isMain: false, tourId: 1 },
];

describe('TourGallery', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseTourGallery.mockReturnValue({
      emblaMainRef: createRef(),
      emblaThumbsRef: createRef(),
      selectedIndex: 0,
      scrollPrev: mockScrollPrev,
      scrollNext: mockScrollNext,
      onThumbClick: mockOnThumbClick,
    });
  });

  it('рендерить всі фотографії в основній галереї', () => {
    const { getAllByTestId } = renderWithTheme(
      <TourGallery photos={MOCK_PHOTOS} />,
    );
    const images = getAllByTestId('mock-next-image');

    expect(images.length).toBe(6);

    expect(images[3]).toHaveAttribute('src', '/img1.jpg');
    expect(images[3]).toHaveAttribute('alt', 'Photo 1');
  });

  it('рендерить кнопки навігації, якщо фотографій більше однієї', () => {
    const { getByRole } = renderWithTheme(<TourGallery photos={MOCK_PHOTOS} />);

    expect(
      getByRole('button', { name: /Previous image/i }),
    ).toBeInTheDocument();
    expect(getByRole('button', { name: /Next image/i })).toBeInTheDocument();
  });

  it('НЕ рендерить кнопки навігації, якщо фотографії немає або вона одна', () => {
    const { queryByRole } = renderWithTheme(
      <TourGallery photos={[MOCK_PHOTOS[0]]} />,
    );

    expect(
      queryByRole('button', { name: /Previous image/i }),
    ).not.toBeInTheDocument();
    expect(
      queryByRole('button', { name: /Next image/i }),
    ).not.toBeInTheDocument();
  });

  it('правильно рендерить всі превю кнопки', () => {
    const { getByRole } = renderWithTheme(<TourGallery photos={MOCK_PHOTOS} />);

    MOCK_PHOTOS.map((photo) => {
      expect(
        getByRole('button', { name: `Preview image: ${photo.description}` }),
      ).toBeInTheDocument();
    });
  });

  it('правильно позначає вибраний превю за selectedIndex', () => {
    mockUseTourGallery.mockReturnValue({
      ...mockUseTourGallery(),
      selectedIndex: 1,
    });
    const { getByRole } = renderWithTheme(<TourGallery photos={MOCK_PHOTOS} />);

    expect(
      getByRole('button', {
        name: `Preview image: ${MOCK_PHOTOS[1].description}`,
      }),
    ).toHaveAttribute('aria-selected', 'true');
    expect(
      getByRole('button', {
        name: `Preview image: ${MOCK_PHOTOS[2].description}`,
      }),
    ).toHaveAttribute('aria-selected', 'false');
    expect(
      getByRole('button', {
        name: `Preview image: ${MOCK_PHOTOS[0].description}`,
      }),
    ).toHaveAttribute('aria-selected', 'false');
  });
});
