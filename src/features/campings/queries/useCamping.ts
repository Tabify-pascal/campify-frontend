import { useQuery } from "@tanstack/react-query";

import { getCamping } from "../api/campingsApi";
import { queryKeys } from "../../../queryKeys";

export function useCamping(
    campingId: string | undefined
) {
    return useQuery({
        queryKey: queryKeys.campings.detail(
            campingId ?? ""
        ),
        queryFn: () => {
            if (!campingId) {
                throw new Error("Camping ID is required");
            }

            return getCamping(campingId);
        },
        enabled: !!campingId,
    });
}