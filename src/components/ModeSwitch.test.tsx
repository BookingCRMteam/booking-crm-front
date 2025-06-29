import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModeSwitch from './ModeSwitch';
import {
  ThemeProvider,
  createTheme,
  useColorScheme as originalUseColorScheme,
} from '@mui/material/styles';

type MockSupportedColorScheme = 'light' | 'dark' | 'system';

interface MockColorSchemeContextValue {
  mode: MockSupportedColorScheme | null;
  setMode: jest.Mock<void, [MockSupportedColorScheme | null]>;
  allColorSchemes: MockSupportedColorScheme[];
  systemMode?: MockSupportedColorScheme;
  lightColorScheme?: MockSupportedColorScheme;
  darkColorScheme?: MockSupportedColorScheme;
  colorScheme: MockSupportedColorScheme | null;
  setColorScheme: jest.Mock<void, [MockSupportedColorScheme | null]>;
}

jest.mock('@mui/material/styles', () => ({
  ...jest.requireActual('@mui/material/styles'),
  useColorScheme: jest.fn(),
}));

const mockedUseColorScheme = jest.mocked(
  originalUseColorScheme,
) as unknown as jest.Mock<MockColorSchemeContextValue>;

const renderWithTheme = (ui: React.ReactNode) => {
  const theme = createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: { colorSchemeSelector: 'class' },
  });
  return render(
    <ThemeProvider theme={theme} defaultMode="system">
      {ui}
    </ThemeProvider>,
  );
};

describe('ModeSwitch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders theme selector with options', async () => {
    const mockValue: MockColorSchemeContextValue = {
      mode: 'light',
      setMode: jest.fn<void, [MockSupportedColorScheme | null]>(),
      allColorSchemes: ['light', 'dark', 'system'],
      systemMode: 'light',
      lightColorScheme: 'light',
      darkColorScheme: 'dark',
      colorScheme: 'light',
      setColorScheme: jest.fn<void, [MockSupportedColorScheme | null]>(),
    };
    mockedUseColorScheme.mockReturnValue(mockValue);

    const user = userEvent.setup();
    const { getByLabelText, findByRole } = renderWithTheme(<ModeSwitch />);

    const select = getByLabelText(/theme/i);
    expect(select).toBeInTheDocument();

    await user.click(select);

    const listbox = await findByRole('listbox');
    const options = within(listbox);
    expect(options.getByText('System')).toBeInTheDocument();
    expect(options.getByText('Light')).toBeInTheDocument();
    expect(options.getByText('Dark')).toBeInTheDocument();
  });

  it('can change theme', async () => {
    const setModeMock = jest.fn<void, [MockSupportedColorScheme | null]>();
    const mockValue: MockColorSchemeContextValue = {
      mode: 'light',
      setMode: setModeMock,
      allColorSchemes: ['light', 'dark', 'system'],
      systemMode: 'light',
      lightColorScheme: 'light',
      darkColorScheme: 'dark',
      colorScheme: 'light',
      setColorScheme: jest.fn<void, [MockSupportedColorScheme | null]>(),
    };
    mockedUseColorScheme.mockReturnValue(mockValue);

    const user = userEvent.setup();
    const { getByLabelText, findByRole } = renderWithTheme(<ModeSwitch />);

    const select = getByLabelText(/theme/i);
    await user.click(select);

    const listbox = await findByRole('listbox');
    const darkOption = within(listbox).getByText('Dark');

    await user.click(darkOption);

    expect(setModeMock).toHaveBeenCalledWith('dark');
  });

  it('returns null when mode is not set', () => {
    const mockValue: MockColorSchemeContextValue = {
      mode: null,
      setMode: jest.fn<void, [MockSupportedColorScheme | null]>(),
      allColorSchemes: ['light', 'dark', 'system'],
      systemMode: undefined,
      lightColorScheme: undefined,
      darkColorScheme: undefined,
      colorScheme: null,
      setColorScheme: jest.fn<void, [MockSupportedColorScheme | null]>(),
    };
    mockedUseColorScheme.mockReturnValue(mockValue);

    const { container } = renderWithTheme(<ModeSwitch />);
    expect(container.firstChild).toBeNull();
  });
});
