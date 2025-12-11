import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PaymentFailed } from './PaymentFailed';

describe('PaymentFailed', () => {
  it('renders all messages and retry button', async () => {
    render(<PaymentFailed />);

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

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    const onRetryMock = jest.fn();

    render(<PaymentFailed onRetry={onRetryMock} />);

    const retryButton = await screen.findByTestId('retry-button');
    await user.click(retryButton);

    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });
});
