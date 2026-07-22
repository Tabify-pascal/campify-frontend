import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useCurrentUser } from "../queries/useCurrentUser";

export default function ProtectedAdminRoute(){
    const location = useLocation();

    const {
        data: user,
        isLoading,
        isError,
    } = useCurrentUser();

    if (isLoading) {
        return (<p>Beheeromgeving laden... </p>)
    }

    if (isError || !user) {
        return (
            <Navigate
                to="/admin/login"
                replace
                state={{ from: { pathname: location.pathname,},}}
            />
        );
    }

    return <Outlet />;
}