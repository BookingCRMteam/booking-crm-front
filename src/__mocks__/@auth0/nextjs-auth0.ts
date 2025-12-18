import type { GetServerSideProps, NextApiHandler } from 'next';

export const useUser = () => ({
  user: {
    sub: 'auth0|123',
    email: 'test@test.com',
    name: 'Test User',
  },
  error: null,
  isLoading: false,
});

export const getAccessToken = jest.fn();

export const withApiAuthRequired = (handler: NextApiHandler): NextApiHandler =>
  handler;

export const withPageAuthRequired = (
  handler: GetServerSideProps,
): GetServerSideProps => handler;
