import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import { Faq } from './Faq';
import { ACCORDION_ITEMS, FAQ_DESCRIPTION, FAQ_TITLE_PARTS } from './constants';

type AccentPart = { text: string; accent?: boolean; id: number };
jest.mock('../AccentHeading/AccentHeading', () => ({
  AccentHeading: ({ parts }: { parts: AccentPart[] }) => (
    <h1 data-testid="accent-heading">
      {parts.map((p: AccentPart) => p.text).join('')}
    </h1>
  ),
}));

jest.mock('../SectionTitle/SectionTitle', () => ({
  SectionTitle: ({
    children,
    description,
  }: {
    children: ReactNode;
    description: string;
  }) => (
    <div>
      <p data-testid="section-description">{description}</p>
      {children}
    </div>
  ),
}));

type AccordionItem = {
  id: number;
  title: string;
  description: string;
};

jest.mock('./FaqAccordionList', () => ({
  FaqAccordionList: ({
    accordionItems,
  }: {
    accordionItems: AccordionItem[];
  }) => (
    <div data-testid="accordion-list">
      {accordionItems.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  ),
}));

describe('Faq', () => {
  it('renders section title and description', () => {
    render(<Faq />);
    expect(screen.getByTestId('section-description')).toHaveTextContent(
      FAQ_DESCRIPTION,
    );
  });

  it('renders accent heading', () => {
    render(<Faq />);
    expect(screen.getByTestId('accent-heading')).toHaveTextContent(
      FAQ_TITLE_PARTS.map((p) => p.text).join(''),
    );
  });

  it('renders accordion list with correct items', () => {
    render(<Faq />);
    ACCORDION_ITEMS.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
