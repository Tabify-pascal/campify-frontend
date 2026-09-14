import { Navigate, Outlet, useLocation } from "react-router-dom";

import LoadingState from "../../../components/ui/LoadingState/LoadingState";
import { useCurrentUser } from "../queries/useCurrentUser";
import { canAccessAdmin } from "../utils/roles";

export default function ProtectedAdminRoute() {
    const location = useLocation();

    const {
        data,
        isLoading,
    } = useCurrentUser();

    if (isLoading) {
        return <LoadingState message="Beheeromgeving laden..." />;
    }

    if (!data?.user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (!canAccessAdmin(data.user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}