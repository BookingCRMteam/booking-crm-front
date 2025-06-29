const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export const httpClient = {
  get: async <T>(path: string, options?: RequestOptions): Promise<T> => {
    const url = new URL(`${API_BASE_URL}${path}`);
    if (options?.params) {
      Object.keys(options.params).forEach((key) =>
        url.searchParams.append(key, String(options.params![key])),
      );
    }

    const response = await fetch(url.toString(), {
      ...options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json() as Promise<T>;
    } else {
      return response.text() as Promise<T>;
    }
  },
};
