import { renderWithTheme } from '@/shared/tests';

import { ErrorPage } from './ErrorPage';
import {
  ERROR_BUTTON_TEXT,
  ERROR_IMAGE_ALT,
  ERROR_IMAGE_PATH,
  ERROR_SUBTITLE_DESCRIPTION,
  ERROR_SUBTITLE_MESSAGE,
  ERROR_TITLE_MESSAGE,
} from './constants';

describe('ErrorPage UI Component', () => {
  const mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnReset.mockClear();
  });

  it('should render all static text content correctly', () => {
    const { getByRole, getByText } = renderWithTheme(
      <ErrorPage onReset={mockOnReset} />,
    );

    expect(
      getByRole('heading', { level: 1, name: ERROR_TITLE_MESSAGE }),
    ).toBeInTheDocument();

    expect(
      getByRole('heading', { level: 3, name: ERROR_SUBTITLE_MESSAGE }),
    ).toBeInTheDocument();

    ERROR_SUBTITLE_DESCRIPTION.forEach((item) => {
      expect(getByText(item.text)).toBeInTheDocument();
    });
  });

  it('should render the illustration image with correct attributes', () => {
    const { getByTestId } = renderWithTheme(
      <ErrorPage onReset={mockOnReset} />,
    );

    const image = getByTestId('mock-next-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', ERROR_IMAGE_PATH);
    expect(image).toHaveAttribute('alt', ERROR_IMAGE_ALT);
  });

  it('should call the onReset function when the button is clicked', async () => {
    const { getByRole, user } = renderWithTheme(
      <ErrorPage onReset={mockOnReset} />,
    );

    const reloadButton = getByRole('button', { name: ERROR_BUTTON_TEXT });

    await user.click(reloadButton);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});
