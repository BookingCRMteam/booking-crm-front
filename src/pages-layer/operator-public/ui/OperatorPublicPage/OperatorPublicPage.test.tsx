import { render, screen } from '@testing-library/react';

import { Tours } from '@/entities/tour';

import { mockOperatorById, mockTour } from '@/shared/tests';

import { OperatorHeader } from '../OperatorHeader/OperatorHeader';
import { OperatorPublicPage } from './OperatorPublicPage';

jest.mock('../OperatorHeader/OperatorHeader', () => ({
  OperatorHeader: jest.fn(() => <div data-testid="operator-header" />),
}));

jest.mock('../OperatorTours/OperatorTours', () => ({
  OperatorTours: jest.fn(() => <div data-testid="operator-tours" />),
}));

jest.mock('@/shared/ui', () => ({
  BreadCrumbs: jest.fn(() => <nav data-testid="breadcrumbs" />),
}));

const mockTours: Tours = {
  data: [mockTour],
  message: '',
  meta: {
    total: '1',
    limit: 6,
    offset: 0,
  },
};

describe('OperatorPublicPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders all main sections', () => {
    render(
      <OperatorPublicPage
        operator={mockOperatorById}
        initialTours={mockTours}
      />,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('operator-header')).toBeInTheDocument();
    expect(screen.getByTestId('operator-tours')).toBeInTheDocument();
  });

  test('passes correct props to OperatorHeader', () => {
    render(
      <OperatorPublicPage
        operator={mockOperatorById}
        initialTours={mockTours}
      />,
    );

    expect(OperatorHeader).toHaveBeenCalledTimes(1);
    expect((OperatorHeader as jest.Mock).mock.calls[0][0]).toEqual({
      operator: mockOperatorById,
    });
  });
});
