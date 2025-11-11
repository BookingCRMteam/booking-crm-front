import { renderWithTheme } from '@/shared/tests';

import { StepsSection } from './StepsSection';
import {
  STEPS_SECTION_BUTTON_TEXT,
  STEPS_SECTION_ID,
  STEPS_SECTION_TITLE,
} from './constants';

jest.mock('../AccentHeading/AccentHeading', () => ({
  AccentHeading: jest.fn(() => <div data-testid="accent-heading" />),
}));
jest.mock('./Steps', () => ({
  Steps: jest.fn(() => <div data-testid="steps" />),
}));

describe('StepsSection', () => {
  it('renders title, button and nested components', () => {
    const { getByText, getByRole, getByTestId } = renderWithTheme(
      <StepsSection />,
    );

    expect(getByText(STEPS_SECTION_TITLE)).toBeInTheDocument();
    expect(
      getByRole('link', { name: STEPS_SECTION_BUTTON_TEXT }),
    ).toBeInTheDocument();
    expect(getByTestId('accent-heading')).toBeInTheDocument();
    expect(getByTestId('steps')).toBeInTheDocument();
  });

  it('has correct section id', () => {
    const { container } = renderWithTheme(<StepsSection />);
    const section = container.querySelector(`#${STEPS_SECTION_ID}`);
    expect(section).toBeInTheDocument();
  });
});
