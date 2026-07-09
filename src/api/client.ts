type ApiOptions = RequestInit;

const API_URL = "http://localhost:3000/api";

export async function api<T>(
    endpoint: string,
    options?: ApiOptions
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
}
