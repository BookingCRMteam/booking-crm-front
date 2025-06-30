import Home from './page';
import { renderWithProviders } from '../shared/tests/renderWithProviders';

describe('Home page', () => {
  it('renders greeting message', () => {
    const { getByRole } = renderWithProviders(<Home />);
    const heading = getByRole('heading', {
      name: /hello booking crm team/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
