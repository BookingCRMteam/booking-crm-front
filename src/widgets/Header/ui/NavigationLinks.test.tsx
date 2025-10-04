import { usePathname } from 'next/navigation';

import { render, screen } from '@testing-library/react';

import { NAVIGATION_LINKS } from '../navigation-links';
import { NavigationLinks } from './NavigationLinks';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.Mock;

describe('NavigationLinks', () => {
  beforeEach(() => {
    mockUsePathname.mockClear();
  });

  const catalogLink = NAVIGATION_LINKS[0];

  it('should apply active variant style when path matches link href', () => {
    mockUsePathname.mockReturnValue(catalogLink.href);

    render(<NavigationLinks />);
    const activeLink = screen.getByRole('link', { name: catalogLink.name });

    expect(activeLink).toHaveClass('MuiTypography-navLinkActive');
  });

  it('should NOT apply active variant style when path does not match link href', () => {
    mockUsePathname.mockReturnValue('/some-other-path');

    render(<NavigationLinks />);

    const catalogLinkElement = screen.getByRole('link', {
      name: catalogLink.name,
    });
    expect(catalogLinkElement).not.toHaveClass('MuiTypography-navLinkActive');
  });
});
