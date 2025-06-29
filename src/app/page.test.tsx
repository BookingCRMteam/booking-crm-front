import { render } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('renders greeting message', () => {
    const { getByRole } = render(<Home />);
    const heading = getByRole('heading', {
      name: /hello booking crm team/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
