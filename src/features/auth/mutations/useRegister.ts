/**
 * @file useRegister.ts
 * @author Pascal Thomasse Mol
 * @since 2026-08-24
 */

import { useMutation } from "@tanstack/react-query";

import { register } from "../api/authApi";

export function useRegister() {
    return useMutation({
        mutationFn: register,
    });
}