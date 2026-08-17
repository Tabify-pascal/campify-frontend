import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardStats } from "../api/adminDashboard";
import { queryKeys } from "../../../../queryKeys";

export function useAdminDashboardStats(){
    return useQuery({
        queryKey: queryKeys.admin.dashboard,
        queryFn: getAdminDashboardStats,
    });
}