import { useQuery } from "@tanstack/react-query";
import { getSpot } from "../../../api/spotsApi";

export function useSpot(spotId: string | undefined) {
    return useQuery({
        queryKey: ["spots", spotId],
        queryFn: () => getSpot(spotId!),
        enabled: !!spotId,
    });
}