import { renderWithTheme } from '@/shared/tests';

import { AdvantagesItem } from './AdvantagesItem';

jest.mock('@phosphor-icons/react', () => ({
  CheckFatIcon: () => <svg data-testid="check-icon" />,
}));

describe('AdvantagesItem', () => {
  it('renders title text', () => {
    const { getByText } = renderWithTheme(
      <AdvantagesItem
        title="Test Advantage"
        isSeparator={false}
        direction={null}
      />,
    );
    expect(getByText('Test Advantage')).toBeInTheDocument();
  });

  it('renders icon', () => {
    const { getByTestId } = renderWithTheme(
      <AdvantagesItem title="With Icon" isSeparator={false} direction={null} />,
    );
    expect(getByTestId('check-icon')).toBeInTheDocument();
  });

  it('applies right separator styles', () => {
    const { container } = renderWithTheme(
      <AdvantagesItem title="Right Border" isSeparator direction="right" />,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({
      borderRight: '2px solid #fff',
      paddingRight: '7px',
    });
  });

  it('applies left separator styles', () => {
    const { container } = renderWithTheme(
      <AdvantagesItem title="Left Border" isSeparator direction="left" />,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({
      borderLeft: '2px solid #fff',
      paddingLeft: '13px',
    });
  });

  it('does not apply border when isSeparator is false', () => {
    const { container } = renderWithTheme(
      <AdvantagesItem title="No Border" isSeparator={false} direction={null} />,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).not.toHaveStyle({ borderLeft: '2px solid #fff' });
    expect(box).not.toHaveStyle({ borderRight: '2px solid #fff' });
  });
});
