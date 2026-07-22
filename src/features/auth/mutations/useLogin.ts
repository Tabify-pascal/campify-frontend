import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/authApi";
import { type AuthUser, type AuthResponse } from "../types/AuthUser";
import type { LoginFormData } from "../schemas/loginSchema";

export function useLogin(){
    const queryClient = useQueryClient();

    return useMutation<AuthResponse, Error, LoginFormData>({
        mutationFn: login,
        onSuccess: ({ user }) => {
            queryClient.setQueryData<AuthUser>(
                ["auth", "me"],
                user
            );
        },
    });
}