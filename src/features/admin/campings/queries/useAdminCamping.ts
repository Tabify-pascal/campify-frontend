import { useQuery } from "@tanstack/react-query";

import { getAdminCamping } from "../api/adminCampingApi";
import { queryKeys } from "../../../../queryKeys";

export function useAdminCamping(
    campingId: string | undefined
) {
    return useQuery({
        queryKey: queryKeys.admin.campings.detail(
            campingId ?? ""
        ),
        queryFn: () => {
            if (!campingId) {
                throw new Error("Camping ID is required");
            }

            return getAdminCamping(campingId);
        },
        enabled: !!campingId,
    });
}