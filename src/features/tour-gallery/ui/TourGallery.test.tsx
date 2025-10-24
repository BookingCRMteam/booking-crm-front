import { createRef } from 'react';

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

const MOCK_PHOTOS_SIX: TourPhoto[] = [
  { id: 1, url: '/img1.jpg', description: 'Photo 1', isMain: true, tourId: 1 },
  { id: 2, url: '/img2.jpg', description: 'Photo 2', isMain: false, tourId: 1 },
  { id: 3, url: '/img3.jpg', description: 'Photo 3', isMain: false, tourId: 1 },
  { id: 4, url: '/img4.jpg', description: 'Photo 4', isMain: false, tourId: 1 },
  { id: 5, url: '/img5.jpg', description: 'Photo 5', isMain: false, tourId: 1 },
  { id: 6, url: '/img6.jpg', description: 'Photo 6', isMain: false, tourId: 1 },
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

  it('should render all photos in the main gallery', () => {
    const { getAllByTestId } = renderWithTheme(
      <TourGallery photos={MOCK_PHOTOS} />,
    );
    const images = getAllByTestId('mock-next-image');
    expect(images.length).toBe(MOCK_PHOTOS.length * 2);

    const photo1Instances = images.filter(
      (el) => el.getAttribute('alt') === 'Photo 1',
    );
    expect(photo1Instances[0]).toHaveAttribute('src', '/img1.jpg');
  });

  it('should render all preview buttons correctly', () => {
    const { getByRole } = renderWithTheme(<TourGallery photos={MOCK_PHOTOS} />);

    MOCK_PHOTOS.forEach((photo) => {
      expect(
        getByRole('button', { name: `Preview image: ${photo.description}` }),
      ).toBeInTheDocument();
    });
  });

  it('should render navigation buttons when there are more than 5 photos', () => {
    const { getByRole } = renderWithTheme(
      <TourGallery photos={MOCK_PHOTOS_SIX} />,
    );

    expect(
      getByRole('button', { name: /Previous image/i }),
    ).toBeInTheDocument();
    expect(getByRole('button', { name: /Next image/i })).toBeInTheDocument();
  });

  it('should NOT render navigation buttons when there are 5 or fewer photos', () => {
    const { queryByRole } = renderWithTheme(
      <TourGallery photos={MOCK_PHOTOS} />,
    );

    expect(
      queryByRole('button', { name: /Previous image/i }),
    ).not.toBeInTheDocument();
    expect(
      queryByRole('button', { name: /Next image/i }),
    ).not.toBeInTheDocument();
  });

  it('should correctly mark the selected thumbnail based on selectedIndex', () => {
    mockUseTourGallery.mockReturnValue({
      emblaMainRef: createRef(),
      emblaThumbsRef: createRef(),
      selectedIndex: 1,
      scrollPrev: mockScrollPrev,
      scrollNext: mockScrollNext,
      onThumbClick: mockOnThumbClick,
    });

    const { getByRole } = renderWithTheme(<TourGallery photos={MOCK_PHOTOS} />);

    expect(
      getByRole('button', {
        name: `Preview image: ${MOCK_PHOTOS[0].description}`,
      }),
    ).toHaveAttribute('aria-selected', 'false');

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
  });

  it('should call the correct scroll handler when navigation buttons are clicked', async () => {
    const { getByRole, user } = renderWithTheme(
      <TourGallery photos={MOCK_PHOTOS_SIX} />,
    );

    await user.click(getByRole('button', { name: /Previous image/i }));
    expect(mockScrollPrev).toHaveBeenCalledTimes(1);

    await user.click(getByRole('button', { name: /Next image/i }));
    expect(mockScrollNext).toHaveBeenCalledTimes(1);
  });

  it('should call onThumbClick when a thumbnail is clicked', async () => {
    const { getByRole, user } = renderWithTheme(
      <TourGallery photos={MOCK_PHOTOS} />,
    );

    const secondThumb = getByRole('button', {
      name: `Preview image: ${MOCK_PHOTOS[1].description}`,
    });

    await user.click(secondThumb);

    expect(mockOnThumbClick).toHaveBeenCalledWith(1);
  });
});
