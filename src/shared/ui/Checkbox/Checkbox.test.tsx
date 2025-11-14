import { renderWithTheme } from '@/shared/tests';

import { CheckboxSmall } from './Checkbox';

describe('CheckboxSmall', () => {
  it('renders and triggers onChange when clicked', async () => {
    const handleChange = jest.fn();

    const { getByRole, user } = renderWithTheme(
      <CheckboxSmall onChange={handleChange} />,
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows custom checked icon when checked', () => {
    const { getByRole } = renderWithTheme(<CheckboxSmall checked />);
    expect(getByRole('checkbox')).toBeChecked();
  });
});
