import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

import { useCurrentUser } from "../../../features/auth/queries/useCurrentUser";

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

    const to =
        user?.role === "ADMIN"
            ? "/admin"
            : user?.role === "CUSTOMER"
                ? "/account/reservations"
                : "/login";

    const label =
        user?.role === "ADMIN"
            ? "Beheer"
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