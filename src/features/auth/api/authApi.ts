import { api } from "../../../api/client";

import type { LoginFormData } from "../schemas/loginSchema";
import type { AuthResponse, AuthUser } from "../types/AuthUser";

export function login(data: LoginFormData): Promise<AuthResponse>{
    return api<{ user: AuthUser }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function logout(): Promise<void>{
    return api<void>("/auth/logout", {
        method: "POST",
    });
}

export function getCurrentUser(): Promise<AuthResponse>{
    return api<{ user: AuthUser }>("/auth/me");
}