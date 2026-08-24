import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginAccount } from "../api/accountApi";
import { queryKeys } from "../../../queryKeys";

export function useAccountLogin(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginAccount,

        onSuccess: (response) => {
            queryClient.setQueryData(
                queryKeys.account.current,
                response
            );
        },
    });
}