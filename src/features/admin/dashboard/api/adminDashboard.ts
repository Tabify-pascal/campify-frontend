import { adminApi } from "../../../../api/adminClient";
import type { AdminDashboardStats } from "../pages/types/AdminDashboardStats";

export function getAdminDashboardStats(){
    return adminApi<AdminDashboardStats>("/admin/dashboard");
}