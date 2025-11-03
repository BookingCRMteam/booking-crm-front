import { fireEvent, render, screen } from '@testing-library/react';

import { CloseButton } from './CloseButton';

describe('CloseButton', () => {
  it('renders the button with CloseIcon', () => {
    render(<CloseButton onClick={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<CloseButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies default top and right styles', () => {
    render(<CloseButton onClick={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      position: 'absolute',
      top: '8px',
      right: '8px',
    });
  });

  it('applies custom top and right props', () => {
    render(<CloseButton onClick={jest.fn()} top={20} right={25} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ top: '20px', right: '25px' });
  });
});
