import { isAxiosError } from 'axios';

export class ApiError extends Error {
  statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export function handleApiError(err: unknown): never {
  if (isAxiosError(err)) {
    const msg = err.response?.data?.message;
    const status =
      err.response?.data?.statusCode ?? err.response?.status ?? undefined;
    const message =
      (Array.isArray(msg) ? msg.join(', ') : msg) ||
      err.message ||
      'Unknown error';
    throw new ApiError(message, status);
  }
  throw new ApiError('Unknown error');
}
