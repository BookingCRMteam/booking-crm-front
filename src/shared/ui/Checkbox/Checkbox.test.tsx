import { renderWithTheme } from '@/shared/tests';

import { CheckboxSmall } from './Checkbox';

describe('CheckboxSmall', () => {
  it('renders and triggers onChange when clicked', async () => {
    const handleChange = jest.fn();

    const { getByRole, user } = renderWithTheme(
      <CheckboxSmall onChange={handleChange} />,
    );

    const checkbox = getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows custom checked icon when checked', () => {
    const { getByRole } = renderWithTheme(<CheckboxSmall checked />);
    expect(getByRole('checkbox')).toBeChecked();
  });
});
