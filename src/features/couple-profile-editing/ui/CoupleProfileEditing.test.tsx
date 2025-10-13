import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CoupleProfileEditing } from './CoupleProfileEditing';

jest.mock('./CoupleProfileView', () => ({
  CoupleProfileView: ({ onEdit }: { onEdit: () => void }) => (
    <div data-testid="mock-view">
      Mock View
      <button onClick={onEdit} data-testid="mock-edit-button">
        Редагувати
      </button>
    </div>
  ),
}));

jest.mock('./CoupleProfileForm', () => ({
  CoupleProfileForm: ({ onCancel }: { onCancel: () => void }) => (
    <div data-testid="mock-form">
      Mock Form
      <button onClick={onCancel} data-testid="mock-cancel-button">
        Скасувати
      </button>
    </div>
  ),
}));

describe('CoupleProfileEditing', () => {
  it('starts in view mode, rendering CoupleProfileView', () => {
    render(<CoupleProfileEditing />);

    expect(screen.getByText('Інформація про нас')).toBeInTheDocument();
    expect(screen.getByTestId('mock-view')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-form')).not.toBeInTheDocument();
  });

  it('switches to edit mode after clicking "Edit" button in View', async () => {
    render(<CoupleProfileEditing />);
    const editButton = screen.getByTestId('mock-edit-button');
    await userEvent.click(editButton);

    expect(screen.getByTestId('mock-form')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-view')).not.toBeInTheDocument();
  });

  it('returns to view mode after clicking "Cancel" button in Form', async () => {
    render(<CoupleProfileEditing />);
    await userEvent.click(screen.getByTestId('mock-edit-button'));
    expect(screen.getByTestId('mock-form')).toBeInTheDocument();

    const cancelButton = screen.getByTestId('mock-cancel-button');
    await userEvent.click(cancelButton);

    expect(screen.getByTestId('mock-view')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-form')).not.toBeInTheDocument();
  });

  it('passes correct props to child components', () => {
    render(<CoupleProfileEditing />);
    expect(screen.getByTestId('mock-edit-button')).toBeInTheDocument();
  });
});
