import { api } from "../../../api/client";

import type { AuthResponse } from "../types/User";
import type { LoginFormData } from "../schemas/loginSchema";
import type { RegisterFormData } from "../schemas/registerSchema";

export function login(data: LoginFormData) {
    return api<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function register(data: RegisterFormData) {
    return api<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function logout() {
    return api<void>("/auth/logout", {
        method: "POST",
    });
}

export function getCurrentUser() {
    return api<AuthResponse>("/auth/me");
}