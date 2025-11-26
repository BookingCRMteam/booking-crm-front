import { APP_ROUTE } from '@/shared/constants';
import { renderWithTheme } from '@/shared/tests';

import { NotFoundPage } from './NotFoundPage';
import {
  NOT_FOUND_BUTTON_TEXT,
  NOT_FOUND_IMAGE_ALT,
  NOT_FOUND_IMAGE_PATH,
  NOT_FOUND_MESSAGE,
} from './constants';

describe('NotFoundPage', () => {
  it('should render the main 404 elements', () => {
    const { getByText, getByTestId, getByRole } = renderWithTheme(
      <NotFoundPage />,
    );

    expect(getByText(NOT_FOUND_MESSAGE)).toBeInTheDocument();

    const image = getByTestId('mock-next-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', NOT_FOUND_IMAGE_PATH);
    expect(image).toHaveAttribute('alt', NOT_FOUND_IMAGE_ALT);

    const button = getByRole('link', { name: NOT_FOUND_BUTTON_TEXT });
    expect(button).toBeInTheDocument();
  });

  it('should link the button to the home page', () => {
    const { getByRole } = renderWithTheme(<NotFoundPage />);

    const buttonLink = getByRole('link', { name: NOT_FOUND_BUTTON_TEXT });

    expect(buttonLink).toHaveAttribute('href', APP_ROUTE.HOME);
  });

  it('should apply correct role and semantic tag for message', () => {
    const { getByRole } = renderWithTheme(<NotFoundPage />);

    const title = getByRole('heading', { level: 1, name: NOT_FOUND_MESSAGE });
    expect(title).toBeInTheDocument();
  });
});
