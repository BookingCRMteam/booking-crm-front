import { renderWithTheme } from '@/shared/tests';

import { InitialsAvatar } from './InitialsAvatar';

describe('InitialsAvatar', () => {
  test('renders default initial "U" when none passed', () => {
    const { getByText } = renderWithTheme(<InitialsAvatar />);
    expect(getByText('U')).toBeInTheDocument();
  });

  test('renders provided initial', () => {
    const { getByText } = renderWithTheme(<InitialsAvatar initial="T" />);
    expect(getByText('T')).toBeInTheDocument();
  });

  test('applies operator role background', () => {
    const { getByText } = renderWithTheme(
      <InitialsAvatar userRole="operator" />,
    );
    const element = getByText('U');
    expect(element).toHaveStyle({
      backgroundColor: '#59a8a2',
      color: '#000500',
    });
  });

  test('applies traveler role background (default)', () => {
    const { getByText } = renderWithTheme(<InitialsAvatar />);
    const element = getByText('U');
    expect(element).toHaveStyle({
      backgroundColor: '#ffddd2',
      color: '#000500',
    });
  });
});
