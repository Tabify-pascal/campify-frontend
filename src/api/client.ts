type ApiOptions = RequestInit;

const API_URL = import.meta.env.VITE_API_URL;

export async function api<T>(
  endpoint: string,
  options?: ApiOptions
): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(!isFormData && {
        "Content-Type": "application/json",
      }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}