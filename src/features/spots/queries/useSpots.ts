import { useQuery } from "@tanstack/react-query";
import { getSpots, type GetSpotsParams } from "../../../api/spotsApi";


export function useSpots(params?: GetSpotsParams) {
    return useQuery({
        queryKey: ["spots", params],
        queryFn: () => getSpots(params),
    });
}