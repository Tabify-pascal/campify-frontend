import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/authApi";
import type { AuthUser } from "../types/AuthUser";

export function useCurrentUser(){
    return useQuery<AuthUser, Error>({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            const response = await getCurrentUser();
            return response.user;
        },
        retry: false,
    });
}