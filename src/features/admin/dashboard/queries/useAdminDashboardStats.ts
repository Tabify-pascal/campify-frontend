import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardStats } from "../../../../api/adminDashboard";

export function useAdminDashboardStats(){
    return useQuery({
        queryKey: ["admin", "dashboard"],
        queryFn: getAdminDashboardStats,
    });
}