import { renderWithTheme } from '@/shared/tests';

import { FaqAccordionList } from './FaqAccordionList';

jest.mock('@phosphor-icons/react', () => ({
  CaretUpIcon: () => <svg data-testid="caret-icon" />,
}));

const items = [
  { id: 1, title: 'Question One', description: 'Answer One' },
  { id: 2, title: 'Question Two', description: 'Answer Two' },
];

describe('FaqAccordionList', () => {
  it('renders all accordion items', () => {
    const { getByText } = renderWithTheme(
      <FaqAccordionList accordionItems={items} />,
    );
    expect(getByText('Question One')).toBeInTheDocument();
    expect(getByText('Question Two')).toBeInTheDocument();
  });

  it('renders icon in each accordion', () => {
    const { getAllByTestId } = renderWithTheme(
      <FaqAccordionList accordionItems={items} />,
    );
    expect(getAllByTestId('caret-icon')).toHaveLength(items.length);
  });

  it('expands and collapses accordion on click', async () => {
    const { getByText, queryByText, user } = renderWithTheme(
      <FaqAccordionList accordionItems={items} />,
    );

    const firstAccordion = getByText('Question One');
    await user.click(firstAccordion);

    expect(getByText('Answer One')).toBeVisible();

    await user.click(firstAccordion);
    expect(queryByText('Answer One')).not.toBeVisible();
  });

  it('expands only one accordion at a time', async () => {
    const { getByText, queryByText, user } = renderWithTheme(
      <FaqAccordionList accordionItems={items} />,
    );

    const firstAccordion = getByText('Question One');
    const secondAccordion = getByText('Question Two');

    await user.click(firstAccordion);
    expect(getByText('Answer One')).toBeVisible();

    await user.click(secondAccordion);
    expect(queryByText('Answer One')).not.toBeVisible();
    expect(getByText('Answer Two')).toBeVisible();
  });
});
