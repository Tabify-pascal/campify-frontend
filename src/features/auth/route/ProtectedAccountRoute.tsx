import { Navigate, Outlet, useLocation } from "react-router-dom";

import LoadingState from "../../../components/ui/LoadingState/LoadingState";
import { useCurrentUser } from "../queries/useCurrentUser";

export default function ProtectedAccountRoute() {
    const location = useLocation();

    const {
        data,
        isLoading,
    } = useCurrentUser();

    if (isLoading) {
        return <LoadingState message="Account laden..." />;
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

    if (data.user.role !== "CUSTOMER") {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
}