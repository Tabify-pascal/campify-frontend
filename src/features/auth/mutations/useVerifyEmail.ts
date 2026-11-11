/**
 * @file useVerifyEmail.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-09
 */

import { useMutation } from "@tanstack/react-query";

import { verifyEmail } from "../api/authApi";

export function useVerifyEmail() {
    return useMutation({
        mutationFn: verifyEmail,
    });
}