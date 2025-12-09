import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { BreadCrumbs, BreadCrumbsItem } from './BreadCrumbs';

jest.mock('@mui/icons-material/ArrowForwardIosRounded', () => {
  return () => <div data-testid="separator-icon" />;
});

describe('BreadCrumbs', () => {
  const mockItems: BreadCrumbsItem[] = [
    { href: '/', title: 'Головна' },
    { href: '/catalog', title: 'Каталог' },
    { href: '/tour/florence', title: 'Романтична Флоренція' },
  ];
  test('should render all breadcrumb titles', () => {
    render(<BreadCrumbs items={mockItems} />);

    expect(screen.getByText('Головна')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Романтична Флоренція')).toBeInTheDocument();
  });

  test('should render all but the last item as MuiLink components', () => {
    render(<BreadCrumbs items={mockItems} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockItems.length - 1);

    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/catalog');

    const lastItemText = screen.getByText('Романтична Флоренція');
    expect(lastItemText.tagName).toBe('P');
  });

  test('should render the last item as non-clickable Typography', () => {
    render(<BreadCrumbs items={mockItems} />);

    const lastItemText = screen.getByText(mockItems[2].title);

    expect(lastItemText).not.toHaveAttribute('href');
    expect(lastItemText).toHaveClass('MuiTypography-root');
  });

  test('should render the correct number of separators', () => {
    render(<BreadCrumbs items={mockItems} />);

    const separators = screen.getAllByTestId('separator-icon');
    expect(separators).toHaveLength(mockItems.length - 1);
  });

  test('should handle only one item correctly (no links or separators)', () => {
    const singleItem: BreadCrumbsItem[] = [
      { href: '/profile', title: 'Мій Профіль' },
    ];
    render(<BreadCrumbs items={singleItem} />);

    expect(screen.getByText('Мій Профіль')).toBeInTheDocument();

    expect(screen.queryAllByRole('link')).toHaveLength(0);

    expect(screen.queryAllByTestId('separator-icon')).toHaveLength(0);
  });
  test('should return null when items is empty or undefined', () => {
    const { container, rerender } = render(<BreadCrumbs items={[]} />);

    expect(container.firstChild).toBeNull();

    rerender(<BreadCrumbs items={undefined as unknown as BreadCrumbsItem[]} />);
    expect(container.firstChild).toBeNull();
  });
});
