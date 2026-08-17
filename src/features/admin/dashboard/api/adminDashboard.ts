import { adminApi } from "../../../../api/adminClient";
import type { AdminDashboardStats } from "../types/AdminDashboardStats";

export function getAdminDashboardStats(){
    return adminApi<AdminDashboardStats>("/admin/dashboard");
}