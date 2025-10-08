import { ImgHTMLAttributes } from 'react';

import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

import { useBookingAuthModal } from '@/features/booking/lib/useBookingAuthModal';

import { renderWithProviders } from '@/shared/tests';

import TourControl from './TourControl';

jest.mock('@/features/booking/lib/useBookingAuthModal');

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

jest.mock('@/shared/icons', () => ({
  CalendarIcon: () => <svg data-testid="calendar-icon" />,
  MapPinIcon: () => <svg data-testid="map-icon" />,
}));

jest.mock('../AvailabilityBadge/AvailabilityBadge', () => ({
  AvailabilityBadge: ({ isAvailable }: { isAvailable: boolean }) => (
    <div data-testid="availability-badge">
      {isAvailable ? 'Доступно' : 'Немає місць'}
    </div>
  ),
}));

describe('TourControl', () => {
  const baseProps = {
    title: 'Неймовірний тур у Карпати',
    price: '10000',
    countryAndCity: 'Україна, Львів',
    date: '12.12.2025',
    availableSpots: 3,
    operator: {
      id: 1,
      name: 'TravelPro',
      photo: '/photo.png',
    },
  };

  beforeEach(() => {
    (useBookingAuthModal as jest.Mock).mockReturnValue({
      isModalOpen: false,
      handleOpen: jest.fn(),
      handleAuth: jest.fn(),
      handleClose: jest.fn(),
    });
  });

  it('рендерить основну інформацію', () => {
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

  it('показує резервне фото туроператора, якщо він його немає', () => {
    const { getByRole } = renderWithProviders(
      <TourControl
        {...baseProps}
        operator={{ id: 1, name: 'оператор без фото', photo: null }}
      />,
    );

    expect(getByRole('img')).toHaveAttribute(
      'src',
      '/images/tourCard/operator.png',
    );
  });

  it('показує бейдж доступності, якщо є місця', () => {
    const { getByRole, getByTestId } = renderWithProviders(
      <TourControl {...baseProps} />,
    );

    expect(getByTestId('availability-badge')).toHaveTextContent('Доступно');
    expect(getByRole('button', { name: 'Забронювати' })).toBeEnabled();
  });

  it('показує "Немає місць", якщо тур недоступний', () => {
    const { getByRole, getByTestId } = renderWithProviders(
      <TourControl {...baseProps} availableSpots={0} />,
    );

    expect(getByTestId('availability-badge')).toHaveTextContent('Немає місць');
    expect(getByRole('button', { name: 'Забронювати' })).toBeDisabled();
  });

  it('натискання кнопки викликає handleOpen з useBookingAuthModal', async () => {
    const handleOpenMock = jest.fn();
    (useBookingAuthModal as jest.Mock).mockReturnValue({
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
