import { screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests';

import TourDescription from './TourDescription';

describe('TourDescription Component', () => {
  const mockDescription =
    'This is a beautiful tour across the mountains with professional guides.';

  it('should render the provided description text', () => {
    renderWithTheme(<TourDescription description={mockDescription} />);

    expect(screen.getByText(mockDescription)).toBeInTheDocument();
  });

  it('should render as a paragraph component', () => {
    renderWithTheme(<TourDescription description={mockDescription} />);

    const textElement = screen.getByText(mockDescription);
    expect(textElement.tagName).toBe('P');
  });

  it('should be empty if an empty string is provided', () => {
    const { container } = renderWithTheme(<TourDescription description="" />);

    const pTag = container.querySelector('p');
    expect(pTag).toBeEmptyDOMElement();
  });
});
