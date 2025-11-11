import { renderWithTheme } from '@/shared/tests';

import { AccentHeading } from './AccentHeading';

describe('AccentHeading', () => {
  const parts = [
    { id: 1, text: 'Hello', accent: false },
    { id: 2, text: 'world', accent: true },
  ];

  it('renders all text parts', () => {
    const { getByText } = renderWithTheme(
      <AccentHeading variant="h1" parts={parts} />,
    );
    expect(getByText('Hello')).toBeInTheDocument();
    expect(getByText('world')).toBeInTheDocument();
  });

  it('applies accent color to accent parts for h1', () => {
    const { getByText } = renderWithTheme(
      <AccentHeading variant="h1" parts={parts} />,
    );
    const accentPart = getByText('world');
    expect(accentPart).toHaveStyle({
      color: 'var(--mui-palette-accent-2)',
    });
  });

  it('applies accent color to accent parts for h3', () => {
    const { getByText } = renderWithTheme(
      <AccentHeading variant="h3" parts={parts} />,
    );
    const accentPart = getByText('world');
    expect(accentPart).toHaveStyle({
      color: 'var(--mui-palette-accent-1)',
    });
  });

  it('respects maxWidth prop', () => {
    const { getByText } = renderWithTheme(
      <AccentHeading variant="h1" parts={parts} maxWidth="400px" />,
    );
    const root = getByText('Hello');
    expect(root.closest('h1')).toHaveStyle('max-width: 400px');
  });
});
