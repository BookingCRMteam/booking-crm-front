import { render, screen } from '@testing-library/react';

import { OperatorPhilosophy } from './OperatorPhilosophy';

describe('OperatorPhilosophy Component', () => {
  const TEXT_PLACEHOLDER = 'Не заповнено';
  const MOCK_PHILOSOPHY = 'Моя філософія — це фокус на якості та довірі.';
  const MOCK_DESCRIPTION = 'Я досвідчений оператор з 5-річним стажем.';

  test('should display philosophy and description when data is provided', () => {
    render(
      <OperatorPhilosophy
        philosophy={MOCK_PHILOSOPHY}
        description={MOCK_DESCRIPTION}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Про себе' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Моя філософія' }),
    ).toBeInTheDocument();

    expect(screen.getByText(MOCK_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText(MOCK_PHILOSOPHY)).toBeInTheDocument();

    expect(screen.queryByText(TEXT_PLACEHOLDER)).not.toBeInTheDocument();
  });

  test('should display placeholder text when both philosophy and description are empty', () => {
    render(<OperatorPhilosophy philosophy="" description="" />);

    const placeholders = screen.getAllByText(TEXT_PLACEHOLDER);
    expect(placeholders).toHaveLength(2);
  });

  test('should display philosophy text and placeholder for missing description', () => {
    render(
      <OperatorPhilosophy philosophy={MOCK_PHILOSOPHY} description={''} />,
    );

    expect(screen.getByText(MOCK_PHILOSOPHY)).toBeInTheDocument();

    const placeholders = screen.getAllByText(TEXT_PLACEHOLDER);
    expect(placeholders).toHaveLength(1);
  });

  test('should display description text and placeholder for missing philosophy', () => {
    render(<OperatorPhilosophy philosophy="" description={MOCK_DESCRIPTION} />);

    expect(screen.getByText(MOCK_DESCRIPTION)).toBeInTheDocument();

    const placeholders = screen.getAllByText(TEXT_PLACEHOLDER);
    expect(placeholders).toHaveLength(1);
  });
});
