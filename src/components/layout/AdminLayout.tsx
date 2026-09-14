import { NavLink, Outlet, useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import Header from "./Header";

import { useLogout } from "../../features/auth/mutations/useLogout";
import { useCurrentUser } from "../../features/auth/queries/useCurrentUser";

import type { UserRole } from "../../features/auth/types/User";

import styles from "./AdminLayout.module.css";

type NavigationItem = {
    label: string;
    to: string;
    roles: UserRole[];
};

const navigationItems: NavigationItem[] = [
    {
        label: "Dashboard",
        to: "/admin",
        roles: ["ADMIN", "MANAGER"],
    },
    {
        label: "Campings",
        to: "/admin/campings",
        roles: ["ADMIN", "MANAGER"],
    },
    {
        label: "Campingplaatsen",
        to: "/admin/spots",
        roles: ["ADMIN", "MANAGER"],
    },
    {
        label: "Reserveringen",
        to: "/admin/reservations",
        roles: ["ADMIN", "MANAGER"],
    },
    {
        label: "Berichten",
        to: "/admin/messages",
        roles: ["ADMIN", "MANAGER"],
    },
    {
        label: "Nieuws",
        to: "/admin/news",
        roles: ["ADMIN"],
    },
    {
        label: "Veelgestelde vragen",
        to: "/admin/faqs",
        roles: ["ADMIN"],
    },
] as const;



export default function AdminLayout() {
    const navigate = useNavigate();

    const logoutMutation = useLogout();
    const { data: auth } = useCurrentUser();

    const user = auth?.user;

    function handleLogout() {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                navigate("/login", {
                    replace: true,
                });
            },
        });
    }

    function getNavLinkClass({
        isActive,
    }: {
        isActive: boolean;
    }) {
        return [
            styles.navLink,
            isActive ? styles.activeNavLink : "",
        ]
            .filter(Boolean)
            .join(" ");
    }

    return (
        <>
            <Header />

            <div className={styles.layout}>
                <aside className={styles.sidebar}>
                    <div className={styles.brand}>
                        <h1 className={styles.brandTitle}>
                            Campify
                        </h1>

                        <p className={styles.brandText}>
                            Beheeromgeving
                        </p>
                    </div>

                    <nav className={styles.navigation}>
                        {user &&
                            navigationItems
                                .filter((item) =>
                                    item.roles.includes(user.role)
                                )
                                .map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        end={item.to === "/admin"}
                                        className={getNavLinkClass}
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                    </nav>

                    <div className={styles.footer}>
                        <Button
                            as="button"
                            type="button"
                            className={styles.logoutButton}
                            onClick={handleLogout}
                            disabled={logoutMutation.isPending}
                        >
                            {logoutMutation.isPending
                                ? "Uitloggen..."
                                : "Uitloggen"}
                        </Button>
                    </div>
                </aside>

                <main className={styles.content}>
                    <div className={styles.contentInner}>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}