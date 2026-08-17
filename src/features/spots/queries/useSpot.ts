import { useQuery } from "@tanstack/react-query";
import { getSpot } from "../api/spotsApi"; 
import { queryKeys } from "../../../queryKeys";

export function useSpot(spotId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.spots.detail(spotId!),
        queryFn: () => getSpot(spotId!),
        enabled: !!spotId,
    });
}