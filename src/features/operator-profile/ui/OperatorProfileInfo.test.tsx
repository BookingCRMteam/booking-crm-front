import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { OperatorProfileInfo } from './OperatorProfileInfo';

describe('OperatorProfileInfo Component', () => {
  const MOCK_CHILD_TEXT = 'Profile Details';
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    mockOnEdit.mockClear();
  });

  test('should render children content and the edit button', () => {
    render(
      <OperatorProfileInfo onEdit={mockOnEdit}>
        <p>{MOCK_CHILD_TEXT}</p>
      </OperatorProfileInfo>,
    );

    expect(screen.getByText(MOCK_CHILD_TEXT)).toBeInTheDocument();

    const editButton = screen.getByRole('button', { name: /Редагувати/i });
    expect(editButton).toBeInTheDocument();
    expect(screen.getByTestId('edit-button')).toBeInTheDocument();
  });

  test('should call the onEdit function when the "Редагувати" button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <OperatorProfileInfo onEdit={mockOnEdit}>
        <p>Child</p>
      </OperatorProfileInfo>,
    );

    const editButton = screen.getByTestId('edit-button');

    await user.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });
});
