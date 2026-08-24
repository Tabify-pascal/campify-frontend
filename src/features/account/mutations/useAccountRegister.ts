import { useMutation, useQueryClient } from "@tanstack/react-query";

import { registerAccount } from "../api/accountApi";
import { queryKeys } from "../../../queryKeys";

export function useAccountRegister() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerAccount,

        onSuccess: (response) => {
            queryClient.setQueryData(
                queryKeys.account.current,
                response
            );
        },
    });
}