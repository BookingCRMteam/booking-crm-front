import { renderWithTheme } from '@/shared/tests';

import { StepCard } from './StepCard';
import { STEPS_CARD_CONTENT_WRAPPER_TEST_ID } from './constants';

describe('StepCard', () => {
  const baseProps = {
    id: 1,
    number: 1,
    title: <>Тестовий заголовок</>,
    description: 'Опис кроку',
  };

  it('renders title, number and description', () => {
    const { getByText } = renderWithTheme(
      <StepCard {...baseProps} selected={false} />,
    );
    expect(getByText('Тестовий заголовок')).toBeInTheDocument();
    expect(getByText('Опис кроку')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
  });
  it('render select card', () => {
    const { getByRole, getByText, getByTestId } = renderWithTheme(
      <StepCard {...baseProps} selected={true} />,
    );
    const card = getByRole('button');
    const cardNumber = getByText(baseProps.number);
    const contentWrapper = getByTestId(STEPS_CARD_CONTENT_WRAPPER_TEST_ID);

    expect(card).toBeInTheDocument();
    expect(cardNumber).toBeInTheDocument();
    expect(contentWrapper).toBeInTheDocument();

    expect(card).toHaveAttribute('aria-pressed', 'true');
    expect(card).toHaveStyle({
      width: '507px',
      gap: '8px',
    });
    expect(cardNumber).toHaveStyle({
      minWidth: '64px',
      height: '53px',
      color: 'rgb(0, 122, 120)',
    });
    expect(contentWrapper).toHaveStyle({
      opacity: 1,
      transform: 'scaleX(1)',
    });
  });
  it('render no select card', () => {
    const { getByRole, getByText, getByTestId } = renderWithTheme(
      <StepCard {...baseProps} selected={false} />,
    );
    const card = getByRole('button');
    const cardNumber = getByText(baseProps.number);
    const contentWrapper = getByTestId(STEPS_CARD_CONTENT_WRAPPER_TEST_ID);

    expect(card).toBeInTheDocument();
    expect(cardNumber).toBeInTheDocument();
    expect(contentWrapper).toBeInTheDocument();

    expect(card).toHaveAttribute('aria-pressed', 'false');
    expect(card).toHaveStyle({
      width: '80px',
      gap: '0px',
    });
    expect(cardNumber).toHaveStyle({
      minWidth: '40px',
      height: 'auto',
      color: 'rgb(0, 5, 0)',
    });
    expect(contentWrapper).toHaveStyle({
      opacity: 0,
      transform: 'scaleX(0)',
    });
  });
});
