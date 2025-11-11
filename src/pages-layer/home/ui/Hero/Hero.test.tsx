import { render, screen } from '@testing-library/react';

import { Hero } from './Hero';
import {
  ADVANTAGES_ITEMS,
  HERO_BUTTON_TEXT,
  HERO_DESCRIPTION,
} from './constants';

type AccentPart = { text: string; accent?: boolean; id: number };
jest.mock('../AccentHeading/AccentHeading', () => ({
  AccentHeading: ({ parts }: { parts: AccentPart[] }) => (
    <h1 data-testid="accent-heading">
      {parts.map((p: AccentPart) => p.text).join('')}
    </h1>
  ),
}));

jest.mock('./AdvantagesItem', () => ({
  AdvantagesItem: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe('Hero', () => {
  it('renders description', () => {
    render(<Hero />);
    expect(screen.getByText(HERO_DESCRIPTION)).toBeInTheDocument();
  });

  it('renders button with correct text and link', () => {
    render(<Hero />);
    const button = screen.getByRole('link', { name: HERO_BUTTON_TEXT });
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/catalog');
  });

  it('renders all advantages items', () => {
    render(<Hero />);
    ADVANTAGES_ITEMS.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
