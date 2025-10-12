import React from 'react';

import { render, screen } from '@testing-library/react';

import { OperatorHeader } from '../OperatorHeader/OperatorHeader';
import { OperatorPublicPage } from './OperatorPublicPage';
import { mockOperator } from './data';

jest.mock('../OperatorHeader/OperatorHeader', () => ({
  OperatorHeader: jest.fn(() => <div data-testid="operator-header" />),
}));

describe('OperatorPublicPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders OperatorHeader with correct props', () => {
    render(<OperatorPublicPage operator={mockOperator} />);

    expect(OperatorHeader).toHaveBeenCalledTimes(1);

    expect(OperatorHeader).toHaveBeenCalledWith(
      expect.objectContaining({ operator: mockOperator }),
      {},
    );

    expect(screen.getByTestId('operator-header')).toBeInTheDocument();
  });
});
