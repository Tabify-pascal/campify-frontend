import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../api/authApi";
import { queryKeys } from "../../../app/queryKeys";

export function useCurrentUser() {
    return useQuery({
        queryKey: queryKeys.auth.currentUser,
        queryFn: getCurrentUser,
        retry: false,
    });
}