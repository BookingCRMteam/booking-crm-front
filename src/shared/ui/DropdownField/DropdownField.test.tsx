import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DropdownField } from './DropdownField';

type City = { id: number; name: string };

const items: City[] = [
  { id: 1, name: 'Київ' },
  { id: 2, name: 'Львів' },
  { id: 3, name: 'Одеса' },
];

describe('DropdownField', () => {
  beforeAll(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('opens dropdown and selects an item', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={handleChange}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    const input = screen.getByLabelText('Місто');

    await user.click(input);

    const listbox = await screen.findByRole('listbox');
    expect(listbox).toBeInTheDocument();

    await user.click(screen.getByText('Львів'));

    expect(handleChange).toHaveBeenCalledWith({ id: 2, name: 'Львів' });
  });

  it('filters items by search', async () => {
    const user = userEvent.setup();

    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={() => {}}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    await user.click(screen.getByLabelText('Місто'));

    const searchInput = await screen.findByPlaceholderText('Пошук...');
    await user.type(searchInput, 'Льв');

    expect(screen.getByText('Львів')).toBeInTheDocument();
    expect(screen.queryByText('Київ')).not.toBeInTheDocument();
  });

  it('shows loader when isLoading=true', async () => {
    const user = userEvent.setup();

    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={() => {}}
        isLoading
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    await user.click(screen.getByLabelText('Місто'));

    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
  });

  it('renders selected value', () => {
    render(
      <DropdownField<City>
        items={items}
        value={items[1]}
        onChange={() => {}}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    expect(screen.getByDisplayValue('Львів')).toBeInTheDocument();
  });

  it('closes on outside click', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <DropdownField<City>
          items={items}
          value={null}
          onChange={() => {}}
          getItemId={(i) => i.id}
          getItemLabel={(i) => i.name}
          label="Місто"
        />
        <button data-testid="outside">Зовні</button>
      </div>,
    );

    await user.click(screen.getByLabelText('Місто'));
    await screen.findByRole('listbox');

    await user.click(screen.getByTestId('outside'));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape press', async () => {
    const user = userEvent.setup();

    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={() => {}}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    const input = screen.getByLabelText('Місто');
    await user.click(input);

    await screen.findByRole('listbox');

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={() => {}}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    const input = screen.getByLabelText('Місто');
    await user.click(input);

    await screen.findByRole('listbox');

    const first = screen.getByText('Київ').closest('[data-index="0"]');
    expect(first).toHaveClass('Mui-selected');

    await user.keyboard('{ArrowDown}');
    const second = screen.getByText('Львів').closest('[data-index="1"]');
    expect(second).toHaveClass('Mui-selected');

    await user.keyboard('{ArrowDown}');
    const third = screen.getByText('Одеса').closest('[data-index="2"]');
    expect(third).toHaveClass('Mui-selected');
  });

  it('selects item with Enter', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={handleChange}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    await user.click(screen.getByLabelText('Місто'));

    await screen.findByRole('listbox');

    await user.keyboard('{Enter}');

    expect(handleChange).toHaveBeenCalledWith({ id: 1, name: 'Київ' });
  });

  it('opens dropdown on Enter or ArrowDown when closed', async () => {
    const user = userEvent.setup();
    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={() => {}}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    const input = screen.getByLabelText('Місто');
    input.focus();
    await user.keyboard('{Enter}');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{ArrowDown}');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
  });

  it('supports ArrowUp navigation', async () => {
    const user = userEvent.setup();
    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={() => {}}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    const input = screen.getByLabelText('Місто');
    await user.click(input);

    await screen.findByRole('listbox');

    await user.keyboard('{ArrowUp}');
    const last = screen.getByText('Одеса').closest('[data-index="2"]');
    expect(last).toHaveClass('Mui-selected');
  });

  it('selects highlighted item with Enter after ArrowDown/ArrowUp', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={handleChange}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    const input = screen.getByLabelText('Місто');
    await user.click(input);
    await screen.findByRole('listbox');

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(handleChange).toHaveBeenCalledWith({ id: 2, name: 'Львів' });
  });

  it('calls onBlur when Escape closes the dropdown', async () => {
    const user = userEvent.setup();
    const handleBlur = jest.fn();

    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={() => {}}
        onBlur={handleBlur}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    const input = screen.getByLabelText('Місто');
    await user.click(input);
    await screen.findByRole('listbox');

    await user.keyboard('{Escape}');
    expect(handleBlur).toHaveBeenCalled();
  });

  it('shows "Не знайдено" when no results', async () => {
    const user = userEvent.setup();

    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={() => {}}
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    await user.click(screen.getByLabelText('Місто'));
    await user.type(screen.getByPlaceholderText('Пошук...'), 'zzz');

    expect(screen.getByText('Не знайдено')).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();

    render(
      <DropdownField<City>
        items={items}
        value={null}
        onChange={() => {}}
        disabled
        getItemId={(i) => i.id}
        getItemLabel={(i) => i.name}
        label="Місто"
      />,
    );

    await user.click(screen.getByLabelText('Місто'));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('calls onBlur when dropdown closes', async () => {
    const user = userEvent.setup();
    const handleBlur = jest.fn();

    render(
      <>
        <DropdownField<City>
          items={items}
          value={null}
          onChange={() => {}}
          onBlur={handleBlur}
          getItemId={(i) => i.id}
          getItemLabel={(i) => i.name}
          label="Місто"
        />
        <button data-testid="outside">click</button>
      </>,
    );

    await user.click(screen.getByLabelText('Місто'));
    await user.click(screen.getByTestId('outside'));

    expect(handleBlur).toHaveBeenCalled();
  });
});
