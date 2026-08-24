import { useQuery } from "@tanstack/react-query";

import { getCurrentAccount } from "../api/accountApi";
import { queryKeys } from "../../../queryKeys";

export function useCurrentAccount(){
    return useQuery({
        queryKey: queryKeys.account.current,
        queryFn: getCurrentAccount,
        retry: false,
    });
}