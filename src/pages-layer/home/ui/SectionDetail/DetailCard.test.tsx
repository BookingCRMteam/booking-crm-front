import { render, screen } from '@testing-library/react';

import { DetailCard } from './DetailCard';

describe('DetailCard', () => {
  const mockProps = {
    title: (
      <>
        Тільки <br /> авторські враження
      </>
    ),
    description: 'Test description for the card.',
    icon: <svg data-testid="mock-icon" />,
  };

  it('renders title, description, and icon', () => {
    render(<DetailCard {...mockProps} />);

    expect(screen.getByText(/Тільки/i)).toBeInTheDocument();
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
});
