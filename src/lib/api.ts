type ApiResult<T> = {
  data?: T;
  error?: string;
};

async function parseJson<T>(response: Response): Promise<ApiResult<T>> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    return { error: payload?.error || payload?.message || 'Request failed' };
  }

  return { data: payload as T };
}

export const api = {
  async get<T>(url: string): Promise<ApiResult<T>> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return parseJson<T>(response);
  },

  async post<T, B = unknown>(url: string, body: B): Promise<ApiResult<T>> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return parseJson<T>(response);
  }
};
