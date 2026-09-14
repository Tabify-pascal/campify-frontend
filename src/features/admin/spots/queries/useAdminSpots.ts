import { useQuery } from "@tanstack/react-query";

import { getAdminSpots } from "../api/adminSpotApi";
import { queryKeys } from "../../../../queryKeys";

export function useAdminSpots() {
    return useQuery({
        queryKey: queryKeys.admin.spots.all,
        queryFn: getAdminSpots,
    });
}