import { useQuery } from "@tanstack/react-query";

import { getAdminCampings } from "../api/adminCampingApi";
import { queryKeys } from "../../../../queryKeys";

export function useAdminCampings() {
    return useQuery({
        queryKey: queryKeys.admin.campings.all,
        queryFn: getAdminCampings,
    });
}