/**
 * @file AccountButton.tsx
 * @author Pascal Thomasse Mol
 * @since 2026-08-28
 */

import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

import { useCurrentUser } from "../../../features/auth/queries/useCurrentUser";
import { canAccessAdmin } from "../../../features/auth/utils/roles";
import styles from "./AccountButton.module.css";

export default function AccountButton() {
    const {
        data,
        isLoading,
    } = useCurrentUser();

    if (isLoading) {
        return null;
    }

    const user = data?.user;

    const canAccessDashboard = user
        ? canAccessAdmin(user.role)
        : false;

    const to = canAccessDashboard
        ? "/admin"
        : user?.role === "CUSTOMER"
            ? "/account/reservations"
            : "/login";

    const label = canAccessDashboard
        ? "Dashboard"
        : user?.role === "CUSTOMER"
            ? "Mijn account"
            : "Inloggen";

    return (
        <Link
            to={to}
            className={styles.button}
            aria-label={label}
            title={label}
        >
            <CircleUserRound size={22} />
            <span>{label}</span>
        </Link>
    );
}