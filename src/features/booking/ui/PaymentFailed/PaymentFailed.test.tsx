import { render, screen } from '@testing-library/react';

import { PaymentFailed } from './PaymentFailed';

describe('PaymentFailed', () => {
  it('renders all messages and retry button', async () => {
    render(<PaymentFailed bookingId={1} />);

    expect(await screen.findByText(/Оплата не пройшла/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Схоже, щось пішло не так під час платежу/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Не хвилюйтеся — ваш тур нікуди не зник/i),
    ).toBeInTheDocument();

    const retryButton = await screen.findByTestId('retry-button');
    expect(retryButton).toBeInTheDocument();
  });
});
