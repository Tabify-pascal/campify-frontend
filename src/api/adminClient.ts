import { api } from "./client";

const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY;

export function adminApi<T>(
    endpoint: string,
    options?: RequestInit
) {
    return api<T>(endpoint, {
        ...options,
        headers: {
            Authorization: `Bearer ${ADMIN_API_KEY}`,
            ...options?.headers,
        },
    });
}