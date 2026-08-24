import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logoutAccount } from "../api/accountApi";
import { queryKeys } from "../../../queryKeys";

export function useAccountLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutAccount,

        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: queryKeys.account.current,
            });

            queryClient.removeQueries({
                queryKey: queryKeys.account.reservations,
            });
        },
    });
}