import type { UserRole } from "../types/User";

export function canAccessAdmin(role: UserRole) {
    return role === "ADMIN" || role === "MANAGER";
}

export function isAdmin(role: UserRole) {
    return role === "ADMIN";
}