/**
 * @file useAdminSpots.ts
 * @author Pascal Thomasse Mol
 * @since 2026-09-14
 */

import { useQuery } from "@tanstack/react-query";

import { getAdminSpots } from "../api/adminSpotApi";
import { queryKeys } from "../../../../app/queryKeys";

export function useAdminSpots() {
    return useQuery({
        queryKey: queryKeys.admin.spots.all,
        queryFn: getAdminSpots,
    });
}