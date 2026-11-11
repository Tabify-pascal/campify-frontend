/**
 * @file useAdminCampings.ts
 * @author Pascal Thomasse Mol
 * @since 2026-09-09
 */

import { useQuery } from "@tanstack/react-query";

import { getAdminCampings } from "../api/adminCampingApi";
import { queryKeys } from "../../../../app/queryKeys";

export function useAdminCampings() {
    return useQuery({
        queryKey: queryKeys.admin.campings.all,
        queryFn: getAdminCampings,
    });
}