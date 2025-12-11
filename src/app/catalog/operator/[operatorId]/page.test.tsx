import { operatorApi } from '@/entities/operator';
import { fetchToursByOperator } from '@/entities/tour';

import page from './page';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('notFound');
  }),
}));

jest.mock('@/entities/operator', () => ({
  operatorApi: {
    getOperatorById: jest.fn(),
  },
}));

jest.mock('@/entities/tour', () => ({
  fetchToursByOperator: jest.fn(),
}));

describe('OperatorPage server component', () => {
  const mockOperator = { id: 1, name: 'Test Operator' };
  const mockTours = [{ id: 1, title: 'Tour 1' }];

  beforeEach(() => {
    jest.clearAllMocks();
    (operatorApi.getOperatorById as jest.Mock).mockResolvedValue(mockOperator);
    (fetchToursByOperator as jest.Mock).mockResolvedValue(mockTours);
  });

  it('calls API and returns OperatorPublicPage for valid operatorId', async () => {
    const params = { operatorId: '1' };
    const result = await page({ params: Promise.resolve(params) });

    expect(operatorApi.getOperatorById).toHaveBeenCalledWith(1);
    expect(fetchToursByOperator).toHaveBeenCalledWith({
      operatorId: 1,
      limit: 6,
      offset: 0,
    });

    expect(result.props.children.props.operator).toEqual(mockOperator);
    expect(result.props.children.props.initialTours).toEqual(mockTours);
  });

  it('calls notFound for invalid operatorId (non-numeric)', async () => {
    await expect(
      page({ params: Promise.resolve({ operatorId: 'abc' }) }),
    ).rejects.toThrow('notFound');

    expect(operatorApi.getOperatorById).not.toHaveBeenCalled();
    expect(fetchToursByOperator).not.toHaveBeenCalled();
  });

  it('calls notFound if operatorApi returns null', async () => {
    (operatorApi.getOperatorById as jest.Mock).mockResolvedValue(null);

    await expect(
      page({ params: Promise.resolve({ operatorId: '1' }) }),
    ).rejects.toThrow('notFound');

    expect(fetchToursByOperator).not.toHaveBeenCalled();
  });

  it('calls notFound on API error', async () => {
    (operatorApi.getOperatorById as jest.Mock).mockRejectedValue(
      new Error('API error'),
    );

    await expect(
      page({ params: Promise.resolve({ operatorId: '1' }) }),
    ).rejects.toThrow('notFound');

    expect(fetchToursByOperator).not.toHaveBeenCalled();
  });
});
