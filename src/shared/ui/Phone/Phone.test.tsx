import { render, screen } from '@testing-library/react';

import { Phone } from './Phone';

jest.mock('@phosphor-icons/react/dist/ssr/Phone', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PhoneIcon: (props: any) => <svg data-testid="phone-icon" {...props} />,
}));

describe('Phone Component', () => {
  const mockPhone = '+380981234567';

  test('should render without crashing and display the phone number', () => {
    render(<Phone phone={mockPhone} />);

    expect(screen.getByText(mockPhone)).toBeInTheDocument();
  });

  test('should display the correct phone number and use the expected HTML tag', () => {
    render(<Phone phone={mockPhone} />);

    const phoneElement = screen.getByText(mockPhone);
    expect(phoneElement).toBeInTheDocument();

    expect(phoneElement.tagName).toBe('P');
  });

  test('should render the PhoneIcon with correct size and weight props', () => {
    render(<Phone phone={mockPhone} />);

    const iconElement = screen.getByTestId('phone-icon');
    expect(iconElement).toBeInTheDocument();

    expect(iconElement).toHaveAttribute('size', '24');
    expect(iconElement).toHaveAttribute('weight', 'regular');
  });

  test('should apply the correct structural wrapper (e.g., flex container)', () => {
    const { container } = render(<Phone phone={mockPhone} />);

    const rootBox = container.firstChild as HTMLElement;

    expect(rootBox).toBeInTheDocument();

    expect(rootBox.children.length).toBe(2);
    expect(rootBox).toContainElement(screen.getByTestId('phone-icon'));
    expect(rootBox).toContainElement(screen.getByText(mockPhone));
  });
});
