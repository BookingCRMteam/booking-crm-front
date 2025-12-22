import { render, screen } from '@testing-library/react';

import { mockPaidBooking } from '@/shared/tests';

import { PaymentSuccess } from './PaymentSuccess';

jest.mock('@/shared/ui', () => ({
  LocationDisplay: jest.fn(({ location }) => (
    <div data-testid="location">{location}</div>
  )),
  DateDisplay: jest.fn(({ date }) => <div data-testid="date">{date}</div>),
  PriceDisplay: jest.fn(({ price }) => <div data-testid="price">{price}</div>),
}));

describe('PaymentSuccess', () => {
  it('renders all main elements correctly', () => {
    render(<PaymentSuccess data={mockPaidBooking} />);

    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    expect(screen.getByText(/Бронювання підтверджено/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Олена Петренко та Олег Петренко/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/\+380 50 111 22 33/i)).toBeInTheDocument();

    expect(screen.getByTestId('location')).toHaveTextContent(
      'Австрія, Зальцбург',
    );
    expect(screen.getByTestId('date')).toHaveTextContent('01.01.26 — 07.01.26');
    expect(screen.getByTestId('price')).toHaveTextContent('20000');

    expect(
      screen.getByText(
        /Лист з підтвердженням бронювання надіслано за адресою/i,
      ),
    ).toBeInTheDocument();
  });
});
