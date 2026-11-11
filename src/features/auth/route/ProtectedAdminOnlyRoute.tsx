/**
 * @file ProtectedAdminOnlyRoute.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-09-14
 */

import { Navigate, Outlet } from "react-router-dom";

import LoadingState from "../../../components/ui/LoadingState/LoadingState";
import { useCurrentUser } from "../queries/useCurrentUser";

export default function ProtectedAdminOnlyRoute() {
    const {
        data,
        isLoading,
    } = useCurrentUser();

    if (isLoading) {
        return <LoadingState />;
    }

    if (!data?.user) {
        return <Navigate to="/login" replace />;
    }

    if (data.user.role !== "ADMIN") {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
}