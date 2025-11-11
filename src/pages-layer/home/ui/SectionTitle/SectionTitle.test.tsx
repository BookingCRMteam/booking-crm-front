import { render, screen } from '@testing-library/react';

import { SectionTitle } from './SectionTitle';

describe('SectionTitle', () => {
  it('renders child content (title)', () => {
    render(
      <SectionTitle description="Test description">
        <h3>Test Title</h3>
      </SectionTitle>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(
      <SectionTitle description="This is a description">
        <h2>Heading</h2>
      </SectionTitle>,
    );

    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('renders description with correct variant', () => {
    render(
      <SectionTitle description="Styled text">
        <h2>Header</h2>
      </SectionTitle>,
    );

    const desc = screen.getByText('Styled text');
    expect(desc.tagName).toBe('P');
    expect(desc).toHaveClass('MuiTypography-bodyLarge');
  });

  it('keeps layout structure', () => {
    const { container } = render(
      <SectionTitle description="Desc">
        <h3>Child</h3>
      </SectionTitle>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({
      display: 'flex',
      justifyContent: 'space-between',
      gap: '24px',
    });
  });
});
