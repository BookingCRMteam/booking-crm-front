import Home from './page';
import { renderWithQueryClient } from '../shared/tests/renderWithQueryClient';

describe('Home page', () => {
  it('renders greeting message', () => {
    const { getByRole } = renderWithQueryClient(<Home />);
    const heading = getByRole('heading', {
      name: /hello booking crm team/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
