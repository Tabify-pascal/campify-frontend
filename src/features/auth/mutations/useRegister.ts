import { useMutation, useQueryClient } from "@tanstack/react-query";

import { register } from "../api/authApi";
import { queryKeys } from "../../../queryKeys";

export function useRegister() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,

        onSuccess: (response) => {
            queryClient.setQueryData(
                queryKeys.auth.currentUser,
                response
            );
        },
    });
}