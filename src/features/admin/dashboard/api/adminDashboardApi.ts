/**
 * @file adminDashboardApi.ts
 * @author Pascal Thomasse Mol
 * @since 2026-08-14
 */

import { adminApi } from "../../../../api/adminClient";
import type { AdminDashboardStats } from "../types/AdminDashboardStats";

export function getAdminDashboardStats(){
    return adminApi<AdminDashboardStats>("/admin/dashboard");
}