/**
 * @file useAdminDashboardStats.ts
 * @author Pascal Thomasse Mol
 * @since 2026-08-12
 */

import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardStats } from "../api/adminDashboardApi";
import { queryKeys } from "../../../../app/queryKeys";

export function useAdminDashboardStats(){
    return useQuery({
        queryKey: queryKeys.admin.dashboard,
        queryFn: getAdminDashboardStats,
    });
}