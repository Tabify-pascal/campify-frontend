/**
 * @file useResendVerification.ts
 * @author Pascal Thomasse Mol
 * @since 2026-11-09
 */

import { useMutation } from "@tanstack/react-query";

import { resendVerification } from "../api/authApi";

export function useResendVerification() {
    return useMutation({
        mutationFn: resendVerification,
    });
}