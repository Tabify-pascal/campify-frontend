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

export type VerifyEmailResponse = {
    message: string;
};

export function verifyEmail(token: string) {
    return api<VerifyEmailResponse>("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ token }),
    });
}

export type ResendVerificationResponse = {
    message: string;
};

export function resendVerification(email: string) {
    return api<ResendVerificationResponse>(
        "/auth/resend-verification",
        {
            method: "POST",
            body: JSON.stringify({ email }),
        },
    );
}