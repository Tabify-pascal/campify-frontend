import { useQuery } from "@tanstack/react-query";
import { getSpots, type GetSpotsParams } from "../api/spotsApi";

import { queryKeys } from "../../../queryKeys";

export function useSpots(params?: GetSpotsParams) {
    return useQuery({
        queryKey: queryKeys.spots.list(params),
        queryFn: () => getSpots(params),
    });
}