import { renderWithTheme } from '@/shared/tests';
import { theme } from '@/shared/theme';

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
      backgroundColor: theme.palette.light[400],
      color: theme.palette.common.black,
    });
  });

  test('applies traveler role background (default)', () => {
    const { getByText } = renderWithTheme(<InitialsAvatar />);
    const element = getByText('U');
    expect(element).toHaveStyle({
      backgroundColor: theme.palette.accent[2],
      color: theme.palette.common.black,
    });
  });
});
