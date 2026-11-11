import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "../api/authApi";
import { queryKeys } from "../../../app/queryKeys";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,

        onSuccess: (response) => {
            queryClient.setQueryData(
                queryKeys.auth.currentUser,
                response
            );
        },
    });
}