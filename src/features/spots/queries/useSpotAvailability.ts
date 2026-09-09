import { useQuery } from "@tanstack/react-query";
import { getSpotAvailability } from "../api/spotsApi";
import { queryKeys } from "../../../queryKeys";

export function useSpotAvailability(
    spotId: string | undefined,
    startDate: string,
    endDate: string
) {
    return useQuery({
        queryKey: queryKeys.spots.availability(spotId, startDate, endDate),
        queryFn: () => getSpotAvailability(spotId!, startDate, endDate),
        enabled: !!spotId && !!startDate && !!endDate, 
    });
}