import { adminApi } from "./adminClient";
import type { AdminDashboardStats } from "../features/admin/dashboard/pages/types/AdminDashboardStats";

export function getAdminDashboardStats(){
    return adminApi<AdminDashboardStats>("/admin/dashboard");
}