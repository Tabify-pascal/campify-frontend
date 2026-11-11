/**
 * @file useLogout.ts
 * @author Pascal Thomasse Mol
 * @since 2026-07-20
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/authApi";

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            queryClient.clear();
        },
    });
}