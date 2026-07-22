import { NavLink, Outlet, useNavigate} from "react-router-dom";

import Button from "../../../components/ui/Button";
import { useLogout } from "../mutations/useLogout";
import styles from "./AdminLayout.module.css";

export default function AdminLayout(){
    const navigate = useNavigate();
    const logoutMutation = useLogout();

    function handleLogout(){
        logoutMutation.mutate(undefined, {
            onSuccess:()=>{
                navigate("/admin/login", {
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
                    <NavLink
                        to="/admin"
                        end
                        className={getNavLinkClass}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/spots"
                        className={getNavLinkClass}
                    >
                        Campingplaatsen
                    </NavLink>

                    <NavLink
                        to="/admin/news"
                        className={getNavLinkClass}
                    >
                        Nieuws
                    </NavLink>

                    <NavLink
                        to="/admin/reservations"
                        className={getNavLinkClass}
                    >
                        Reserveringen
                    </NavLink>
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
    );
}