import { ImgHTMLAttributes } from 'react';

import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

import { useBookingModal } from '@/features/booking/lib/useBookingModal';

import { renderWithProviders } from '@/shared/tests';

import TourControl from './TourControl';

jest.mock('@/features/booking/lib/useBookinghModal');

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: ImgHTMLAttributes<HTMLImageElement> & {
      src: string | { src: string };
    },
  ) => {
    const src = typeof props.src === 'object' ? props.src.src : props.src;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} src={src} />;
  },
}));

jest.mock('@/entities/user', () => ({
  useUserQuery: () => ({ data: null }),
}));

jest.mock('@phosphor-icons/react', () => ({
  CalendarDotsIcon: () => <svg data-testid="calendar-icon" />,
  MapPinLineIcon: () => <svg data-testid="map-icon" />,
}));

describe('TourControl', () => {
  const baseProps = {
    tourId: 11,
    title: 'Неймовірний тур у Карпати',
    price: '10000',
    countryAndCity: 'Україна, Львів',
    date: '12.12.2025',
    availableSpots: 2,
    operator: {
      id: 1,
      name: 'TravelPro',
      photo: '/photo.png',
    },
  };

  beforeEach(() => {
    (useBookingModal as jest.Mock).mockReturnValue({
      isModalOpen: false,
      handleOpen: jest.fn(),
      handleAuth: jest.fn(),
      handleClose: jest.fn(),
    });
  });

  it('should render main tour information correctly', () => {
    const { getByRole, getByText } = renderWithProviders(
      <TourControl {...baseProps} />,
    );

    expect(
      getByRole('heading', { name: /Неймовірний тур у Карпати/i }),
    ).toBeInTheDocument();
    expect(getByText('Україна, Львів')).toBeInTheDocument();
    expect(getByText('12.12.2025')).toBeInTheDocument();
    expect(getByText('10000')).toHaveTextContent('10000');
    expect(getByText('TravelPro')).toHaveTextContent('TravelPro');
    expect(getByRole('link')).toHaveAttribute(
      'href',
      `/catalog/operator/${baseProps.operator.id}`,
    );
    expect(getByRole('img')).toHaveAttribute('src', baseProps.operator.photo);
  });

  it('should display fallback operator photo when photo is missing', () => {
    const { getByRole } = renderWithProviders(
      <TourControl
        {...baseProps}
        operator={{ id: 1, name: 'Operator without photo', photo: null }}
      />,
    );

    expect(getByRole('img')).toHaveAttribute(
      'src',
      '/images/tourCard/operator.png',
    );
  });

  it('should show availability badge and enable booking button when spots are available', () => {
    const { getByRole, getByText } = renderWithProviders(
      <TourControl {...baseProps} />,
    );
    const expectedText = `Залишилось\n${baseProps.availableSpots} вільних місця`;
    const badge = getByText(expectedText.split('\n').join(' '));

    expect(badge).toBeInTheDocument();
    expect(getByRole('button', { name: 'Забронювати' })).toBeEnabled();
  });

  it('should show "all spots booked" message and disable booking button when tour is full', () => {
    const { getByRole, getByText } = renderWithProviders(
      <TourControl {...baseProps} availableSpots={0} />,
    );
    const expectedText = 'Всі місця\nзаброньовано';
    const badge = getByText(expectedText.split('\n').join(' '));

    expect(badge).toBeInTheDocument();
    expect(getByRole('button', { name: 'Забронювати' })).toBeDisabled();
  });

  it('should call handleOpen from useBookingAuthModal when booking button is clicked', async () => {
    const handleOpenMock = jest.fn();
    (useBookingModal as jest.Mock).mockReturnValue({
      isModalOpen: false,
      handleOpen: handleOpenMock,
      handleAuth: jest.fn(),
      handleClose: jest.fn(),
    });

    const { getByText, user } = renderWithProviders(
      <TourControl {...baseProps} />,
    );

    const button = getByText('Забронювати');
    await user.click(button);

    await waitFor(() => {
      expect(handleOpenMock).toHaveBeenCalled();
    });
  });
});
