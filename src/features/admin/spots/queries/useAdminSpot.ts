import { useQuery } from "@tanstack/react-query";

import { getAdminSpot } from "../api/adminSpotApi";
import { queryKeys } from "../../../../queryKeys";

export function useAdminSpot(
    spotId: string | undefined
) {
    return useQuery({
        queryKey: queryKeys.admin.spots.detail(
            spotId ?? ""
        ),
        queryFn: () => {
            if (!spotId) {
                throw new Error("Spot ID is required");
            }

            return getAdminSpot(spotId);
        },
        enabled: !!spotId,
    });
}