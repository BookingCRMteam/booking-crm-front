import { ImgHTMLAttributes, ReactNode } from 'react';

import { ThemeProvider } from '@mui/material';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { theme } from '@/shared/theme';

import { ImagesInput } from './ImagesInput';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: ImgHTMLAttributes<HTMLImageElement> & {
      src: string | { src: string };
    },
  ) => {
    const src = typeof props.src === 'object' ? props.src.src : props.src;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} data-testid="image-preview" />;
  },
}));

const mockOnChange = jest.fn();
const mockOnDeleteFlagChange = jest.fn();

jest.mock('react-hook-form', () => ({
  __esModule: true,
  ...jest.requireActual('react-hook-form'),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Controller: ({ render, name }: any) =>
    render({
      field: {
        onChange: mockOnChange,
        name: name,
        value: undefined,
      },
      fieldState: {
        error: undefined,
      },
    }),
}));

const mockCreateObjectURL = jest.fn(() => 'mock-object-url');
const mockRevokeObjectURL = jest.fn();

Object.defineProperty(global.URL, 'createObjectURL', {
  value: mockCreateObjectURL,
});
Object.defineProperty(global.URL, 'revokeObjectURL', {
  value: mockRevokeObjectURL,
});

const renderWithTheme = (ui: ReactNode) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockControl = {} as any;

const mockFile = new File(['hello'], 'profile.png', { type: 'image/png' });

describe('ImagesInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders upload button when initialPreviewUrl is not provided', () => {
    renderWithTheme(
      <ImagesInput
        control={mockControl}
        onDeleteFlagChange={mockOnDeleteFlagChange}
      />,
    );
    expect(screen.getByText('Завантажити фото')).toBeInTheDocument();
    expect(screen.queryByTestId('image-preview')).not.toBeInTheDocument();
  });

  it('renders image preview and delete button when initialPreviewUrl is provided', () => {
    const initialUrl = 'http://test.com/initial.jpg';
    renderWithTheme(
      <ImagesInput
        control={mockControl}
        initialPreviewUrl={initialUrl}
        onDeleteFlagChange={mockOnDeleteFlagChange}
      />,
    );

    const image = screen.getByTestId('image-preview');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', initialUrl);

    expect(
      screen.getByRole('button', { name: 'delete photo' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Завантажити фото')).not.toBeInTheDocument();
  });

  it('handles file upload correctly and updates form/state', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ImagesInput
        control={mockControl}
        onDeleteFlagChange={mockOnDeleteFlagChange}
      />,
    );

    const fileInput = screen.getByTestId('file-input');

    await user.upload(fileInput, mockFile);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(mockFile);
      expect(mockOnDeleteFlagChange).toHaveBeenCalledWith(false);
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockFile);

      const image = screen.getByTestId('image-preview');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'mock-object-url');
    });
  });

  it('handles photo deletion correctly', async () => {
    const user = userEvent.setup();
    const initialUrl = 'http://test.com/initial.jpg';

    renderWithTheme(
      <ImagesInput
        control={mockControl}
        initialPreviewUrl={initialUrl}
        onDeleteFlagChange={mockOnDeleteFlagChange}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: 'delete photo' });

    await user.click(deleteButton);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(undefined);

      expect(mockOnDeleteFlagChange).toHaveBeenCalledWith(true);

      expect(screen.getByText('Завантажити фото')).toBeInTheDocument();
      expect(screen.queryByTestId('image-preview')).not.toBeInTheDocument();
    });
  });
});
