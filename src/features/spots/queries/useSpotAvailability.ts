import { useQuery } from "@tanstack/react-query";
import { getSpotavailability } from "../../../api/spotsApi";

export function useSpotAvailability(
    spotId: string | undefined,
    startDate: string,
    endDate: string
) {
    return useQuery({
        queryKey: ["spots", spotId, "availability", startDate, endDate],
        queryFn: () => getSpotavailability(spotId!, startDate, endDate),
        enabled: !!spotId && !!startDate && !!endDate, 
    });
}