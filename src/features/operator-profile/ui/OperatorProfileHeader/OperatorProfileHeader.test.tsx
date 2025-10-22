import { render, screen } from '@testing-library/react';

import { OperatorProfileHeader } from './OperatorProfileHeader';

describe('OperatorProfileHeader Component', () => {
  const MOCK_CHILD_TEXT = 'Header Content';

  test('should render the children content correctly', () => {
    render(
      <OperatorProfileHeader>
        <div data-testid="test-child">{MOCK_CHILD_TEXT}</div>
      </OperatorProfileHeader>,
    );

    expect(screen.getByText(MOCK_CHILD_TEXT)).toBeInTheDocument();

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  test('should render the content inside the styled wrapper', () => {
    const { container } = render(
      <OperatorProfileHeader>
        <span>Child</span>
      </OperatorProfileHeader>,
    );

    const rootElement = container.firstChild as HTMLElement;

    expect(rootElement).toBeInTheDocument();
    expect(rootElement.children.length).toBe(1);
  });
});
