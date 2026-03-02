type ApiResult<T> = {
  data?: T;
  error?: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {})
      },
      ...init
    });

    if (!response.ok) {
      const message = await response.text();
      return { error: message || `Request failed with status ${response.status}` };
    }

    const data = (await response.json()) as T;
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Request failed' };
  }
}

export const api = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, { ...init, method: 'GET' })
};
